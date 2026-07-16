import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

import {
  INDEXNOW_KEY,
  INDEXNOW_KEY_FILE,
  SITE_URL,
} from "./indexnow-config.mjs";

const LAST_SIGNIFICANT_UPDATE = "2026-07-16";
const VIDEO_FILE = "summafit-app-preview.mp4";
const VIDEO_POSTER_FILE = "summafit-app-preview-poster.jpg";
const VIDEO_URL = `${SITE_URL}/${VIDEO_FILE}`;
const VIDEO_POSTER_URL = `${SITE_URL}/${VIDEO_POSTER_FILE}`;
const VIDEO_ID = `${VIDEO_URL}#video`;
const VIDEO_UPLOAD_DATE = "2026-07-09T01:44:14+02:00";
const VIDEO_DURATION = "PT37.667S";
const LOCALES = ["en", "es", "fr", "de", "it"];
const HREFLANG_VALUES = [...LOCALES, "x-default"];
const SECTIONS = ["", "policy", "support"];
const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST_DIR = resolve(PROJECT_ROOT, process.argv[2] ?? "dist");

const failures = [];
const titles = new Map();
const descriptions = new Map();
let checks = 0;

const check = (condition, message) => {
  checks += 1;
  if (!condition) failures.push(message);
};

const decodeEntities = (value) =>
  value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");

const normalizeText = (value) =>
  decodeEntities(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const parseAttributes = (tag) => {
  const attributes = {};
  const source = tag.replace(/^<\/?[a-z][\w:-]*/i, "").replace(/\/?>\s*$/, "");
  const attributePattern =
    /([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

  for (const match of source.matchAll(attributePattern)) {
    const [, rawName, doubleQuoted, singleQuoted, unquoted] = match;
    const rawValue = doubleQuoted ?? singleQuoted ?? unquoted ?? "";
    attributes[rawName.toLowerCase()] = decodeEntities(rawValue);
  }

  return attributes;
};

const findTags = (source, tagName) =>
  [...source.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))].map(
    ([tag]) => ({ tag, attributes: parseAttributes(tag) }),
  );

const hasRel = (attributes, expected) =>
  (attributes.rel ?? "")
    .toLowerCase()
    .split(/\s+/)
    .includes(expected.toLowerCase());

const routePath = (locale, section) =>
  `/${locale}/${section ? `${section}/` : ""}`;

const absoluteUrl = (locale, section) =>
  `${SITE_URL}${routePath(locale, section)}`;

const pageFile = (locale, section) =>
  `${locale}/${section ? `${section}/` : ""}index.html`;

const readRequired = async (relativePath) => {
  try {
    return await readFile(resolve(DIST_DIR, relativePath), "utf8");
  } catch (error) {
    check(
      false,
      `${relativePath}: file is missing or unreadable (${error.code ?? error.message})`,
    );
    return null;
  }
};

const rememberUnique = (registry, value, label, field) => {
  const key = value.toLocaleLowerCase("und");
  const previous = registry.get(key);
  if (previous) {
    check(
      false,
      `${label}: duplicate ${field}; it is also used by ${previous}`,
    );
  } else {
    registry.set(key, label);
    check(true, `${label}: unique ${field}`);
  }
};

const expectedAlternates = (section) =>
  new Map(
    HREFLANG_VALUES.map((language) => [
      language,
      absoluteUrl(language === "x-default" ? "en" : language, section),
    ]),
  );

const validateAlternates = (linkTags, section, label) => {
  const expected = expectedAlternates(section);
  const alternates = linkTags.filter(
    ({ attributes }) => hasRel(attributes, "alternate") && attributes.hreflang,
  );

  for (const [language, href] of expected) {
    const matches = alternates.filter(
      ({ attributes }) => attributes.hreflang.toLowerCase() === language,
    );
    check(
      matches.length === 1,
      `${label}: expected one hreflang=${language} link, found ${matches.length}`,
    );
    if (matches.length === 1) {
      check(
        matches[0].attributes.href === href,
        `${label}: hreflang=${language} must point to ${href}`,
      );
    }
  }

  const unexpected = alternates
    .map(({ attributes }) => attributes.hreflang.toLowerCase())
    .filter((language) => !expected.has(language));
  check(
    unexpected.length === 0,
    `${label}: unexpected hreflang values: ${unexpected.join(", ")}`,
  );
};

const validateJsonLd = (html, label, locale) => {
  const jsonLdBlocks = [];
  const scriptPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;

  for (const [, rawAttributes, body] of html.matchAll(scriptPattern)) {
    const attributes = parseAttributes(`<script ${rawAttributes}>`);
    if ((attributes.type ?? "").toLowerCase() !== "application/ld+json")
      continue;

    try {
      jsonLdBlocks.push(JSON.parse(body.trim()));
    } catch (error) {
      check(false, `${label}: invalid JSON-LD (${error.message})`);
    }
  }

  check(jsonLdBlocks.length > 0, `${label}: missing valid application/ld+json`);
  if (jsonLdBlocks.length === 0) return;

  check(
    jsonLdBlocks.some((block) => block?.["@context"] === "https://schema.org"),
    `${label}: JSON-LD must use https://schema.org`,
  );

  const entities = jsonLdBlocks.flatMap((block) =>
    Array.isArray(block?.["@graph"]) ? block["@graph"] : [block],
  );
  for (const type of ["MobileApplication", "VideoObject", "WebPage"]) {
    check(
      entities.some((entity) => {
        const entityTypes = Array.isArray(entity?.["@type"])
          ? entity["@type"]
          : [entity?.["@type"]];
        return entityTypes.includes(type);
      }),
      `${label}: JSON-LD is missing ${type}`,
    );
  }

  const visibleText = normalizeText(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " "),
  );

  const app = entities.find((entity) => {
    const types = Array.isArray(entity?.["@type"])
      ? entity["@type"]
      : [entity?.["@type"]];
    return types.includes("MobileApplication");
  });
  if (app) {
    const description = normalizeText(app.description ?? "");
    const featureList = Array.isArray(app.featureList) ? app.featureList : [];

    check(
      app.url === absoluteUrl(locale, ""),
      `${label}: MobileApplication URL must match the localized canonical`,
    );
    check(
      app.operatingSystem === "iOS 26.0 or later",
      `${label}: MobileApplication must declare the verified iOS requirement`,
    );
    check(
      Array.isArray(app.inLanguage) &&
        app.inLanguage.length === LOCALES.length &&
        LOCALES.every((language) => app.inLanguage.includes(language)),
      `${label}: MobileApplication languages must match the five languages verified in the app source`,
    );
    check(
      !("softwareRequirements" in app),
      `${label}: MobileApplication must not misuse softwareRequirements`,
    );
    check(
      !("applicationSubCategory" in app),
      `${label}: MobileApplication must not use an untranslated subcategory`,
    );
    check(
      description.length > 0 && visibleText.includes(description),
      `${label}: MobileApplication description must be visible in the hero`,
    );
    check(
      featureList.length > 0 &&
        featureList.every((feature) =>
          visibleText.includes(normalizeText(String(feature))),
        ),
      `${label}: every MobileApplication feature must be visible in the hero`,
    );
    check(
      app.subjectOf?.["@id"] === VIDEO_ID,
      `${label}: MobileApplication must reference the real preview video`,
    );
  }

  const video = entities.find((entity) => {
    const types = Array.isArray(entity?.["@type"])
      ? entity["@type"]
      : [entity?.["@type"]];
    return types.includes("VideoObject");
  });
  if (video) {
    const name = normalizeText(video.name ?? "");
    const description = normalizeText(video.description ?? "");

    check(video["@id"] === VIDEO_ID, `${label}: VideoObject @id is incorrect`);
    check(
      name.length > 0 && visibleText.includes(name),
      `${label}: VideoObject name must be visible in the hero`,
    );
    check(
      description.length > 0 && visibleText.includes(description),
      `${label}: VideoObject description must be visible in the hero`,
    );
    check(
      video.thumbnailUrl === VIDEO_POSTER_URL,
      `${label}: VideoObject must use the real stable poster`,
    );
    check(
      video.contentUrl === VIDEO_URL,
      `${label}: VideoObject must point to the real MP4 bytes`,
    );
    check(
      video.uploadDate === VIDEO_UPLOAD_DATE,
      `${label}: VideoObject uploadDate must match the first verified publication`,
    );
    check(
      video.duration === VIDEO_DURATION,
      `${label}: VideoObject duration must match the probed MP4 duration`,
    );
    check(
      video.inLanguage === "en",
      `${label}: VideoObject language must match the English UI in the video`,
    );
    check(
      video.about?.["@id"] === `${SITE_URL}/#summafit-app`,
      `${label}: VideoObject must identify SummaFit as its subject`,
    );
    for (const unsupportedClaim of [
      "aggregateRating",
      "interactionStatistic",
      "review",
    ]) {
      check(
        !(unsupportedClaim in video),
        `${label}: VideoObject must not invent ${unsupportedClaim}`,
      );
    }
  }

  const webpage = entities.find((entity) => {
    const types = Array.isArray(entity?.["@type"])
      ? entity["@type"]
      : [entity?.["@type"]];
    return types.includes("WebPage");
  });
  if (webpage) {
    check(
      webpage.video?.["@id"] === VIDEO_ID,
      `${label}: WebPage must reference VideoObject as secondary video`,
    );
    check(
      webpage.mainEntity?.["@id"] === `${SITE_URL}/#summafit-app`,
      `${label}: the app, not the complementary video, must remain mainEntity`,
    );
  }
};

const validatePage = async (locale, section) => {
  const relativePath = pageFile(locale, section);
  const label = `/${routePath(locale, section).replace(/^\//, "")}`;
  const html = await readRequired(relativePath);
  if (html === null) return;

  const htmlTag = findTags(html, "html")[0];
  check(
    htmlTag?.attributes.lang === locale,
    `${label}: <html lang> must be ${locale}`,
  );

  const linkTags = findTags(html, "link");
  const canonicalLinks = linkTags.filter(({ attributes }) =>
    hasRel(attributes, "canonical"),
  );
  check(
    canonicalLinks.length === 1,
    `${label}: expected exactly one canonical link, found ${canonicalLinks.length}`,
  );
  if (canonicalLinks.length === 1) {
    check(
      canonicalLinks[0].attributes.href === absoluteUrl(locale, section),
      `${label}: canonical must be ${absoluteUrl(locale, section)}`,
    );
  }

  validateAlternates(linkTags, section, label);

  const titleMatches = [
    ...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi),
  ];
  check(
    titleMatches.length === 1,
    `${label}: expected exactly one <title>, found ${titleMatches.length}`,
  );
  if (titleMatches.length === 1) {
    const title = normalizeText(titleMatches[0][1]);
    check(title.length > 0, `${label}: title must not be empty`);
    if (title) rememberUnique(titles, title, label, "title");
  }

  const metaTags = findTags(html, "meta");
  const descriptionTags = metaTags.filter(
    ({ attributes }) => (attributes.name ?? "").toLowerCase() === "description",
  );
  check(
    descriptionTags.length === 1,
    `${label}: expected exactly one meta description, found ${descriptionTags.length}`,
  );
  if (descriptionTags.length === 1) {
    const description = normalizeText(
      descriptionTags[0].attributes.content ?? "",
    );
    check(
      description.length > 0,
      `${label}: meta description must not be empty`,
    );
    if (description)
      rememberUnique(descriptions, description, label, "meta description");
  }

  const robotsTags = metaTags.filter(
    ({ attributes }) => (attributes.name ?? "").toLowerCase() === "robots",
  );
  check(
    robotsTags.length === 1,
    `${label}: expected exactly one robots meta tag, found ${robotsTags.length}`,
  );
  if (robotsTags.length === 1) {
    const directives = (robotsTags[0].attributes.content ?? "")
      .toLowerCase()
      .split(",")
      .map((value) => value.trim());
    check(
      directives.includes("index"),
      `${label}: robots meta must include index`,
    );
    check(
      !directives.includes("noindex"),
      `${label}: robots meta must not include noindex`,
    );
    for (const previewDirective of [
      "max-image-preview:large",
      "max-snippet:-1",
      "max-video-preview:-1",
    ]) {
      check(
        directives.includes(previewDirective),
        `${label}: robots meta must include ${previewDirective}`,
      );
    }
  }

  const h1Matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  check(
    h1Matches.length === 1,
    `${label}: expected exactly one H1, found ${h1Matches.length}`,
  );
  if (h1Matches.length === 1) {
    check(
      normalizeText(h1Matches[0][1]).length > 0,
      `${label}: H1 must not be empty`,
    );
  }

  if (section === "") {
    validateJsonLd(html, label, locale);

    const videoTags = findTags(html, "video");
    check(
      videoTags.length === 1,
      `${label}: expected exactly one hero video, found ${videoTags.length}`,
    );
    if (videoTags.length === 1) {
      check(
        videoTags[0].attributes.poster === `/${VIDEO_POSTER_FILE}`,
        `${label}: hero video must use the real poster`,
      );
      check(
        videoTags[0].attributes.width === "408" &&
          videoTags[0].attributes.height === "888",
        `${label}: hero video dimensions must match the source`,
      );
    }

    const sourceTags = findTags(html, "source");
    const videoSources = sourceTags.filter(
      ({ attributes }) => attributes.src === `/${VIDEO_FILE}`,
    );
    check(
      videoSources.length === 1 &&
        videoSources[0].attributes.type === "video/mp4",
      `${label}: hero must expose one typed MP4 source`,
    );

    const posterPreloads = linkTags.filter(
      ({ attributes }) =>
        hasRel(attributes, "preload") &&
        attributes.as === "image" &&
        attributes.href === `/${VIDEO_POSTER_FILE}` &&
        attributes.fetchpriority === "high",
    );
    check(
      posterPreloads.length === 1,
      `${label}: hero poster must be preloaded exactly once`,
    );

    const expectedVideoMeta = new Map([
      ["og:video", VIDEO_URL],
      ["og:video:secure_url", VIDEO_URL],
      ["og:video:type", "video/mp4"],
      ["og:video:width", "408"],
      ["og:video:height", "888"],
      ["og:video:image", VIDEO_POSTER_URL],
    ]);
    for (const [property, expectedContent] of expectedVideoMeta) {
      const matches = metaTags.filter(
        ({ attributes }) => attributes.property === property,
      );
      check(
        matches.length === 1 &&
          matches[0].attributes.content === expectedContent,
        `${label}: ${property} must describe the real hero video`,
      );
    }

    check(
      /<section\b[^>]*class=["'][^"']*\bhero\b[^"']*["']/i.test(html),
      `${label}: landing must render the hero`,
    );
    check(
      !/<header\b/i.test(html),
      `${label}: landing must not render a header`,
    );
    check(
      !/<footer\b/i.test(html),
      `${label}: landing must not render a footer`,
    );
    check(
      !/id=["'](?:features|how-it-works|faq|final-cta-title)["']/i.test(html),
      `${label}: landing must not render removed content sections`,
    );
  }
};

const extractLocs = (xml) =>
  [...xml.matchAll(/<loc\b[^>]*>([\s\S]*?)<\/loc>/gi)].map(([, value]) =>
    normalizeText(value),
  );

const validateXmlEnvelope = (xml, rootElement, label) => {
  check(
    /^\s*<\?xml\s+version=["']1\.0["']/i.test(xml),
    `${label}: missing XML declaration`,
  );
  check(
    new RegExp(`<${rootElement}\\b`, "i").test(xml),
    `${label}: missing <${rootElement}> root`,
  );
  check(
    new RegExp(`</${rootElement}>\\s*$`, "i").test(xml),
    `${label}: missing closing </${rootElement}>`,
  );
  check(
    /xmlns=["']http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9["']/i.test(
      xml,
    ),
    `${label}: missing sitemap XML namespace`,
  );
  check(
    !/<(?:!doctype\s+)?html\b/i.test(xml),
    `${label}: contains HTML instead of sitemap XML`,
  );
};

const validateUrlSet = (
  xml,
  label,
  { validateHreflang = false, validateLastmod = false } = {},
) => {
  validateXmlEnvelope(xml, "urlset", label);
  const blocks = [...xml.matchAll(/<url\b[^>]*>([\s\S]*?)<\/url>/gi)].map(
    ([, body]) => body,
  );
  check(
    blocks.length === 15,
    `${label}: expected 15 <url> entries, found ${blocks.length}`,
  );

  const locs = blocks.flatMap((block, index) => {
    const values = extractLocs(block);
    check(
      values.length === 1,
      `${label}: URL entry ${index + 1} must contain exactly one <loc>`,
    );
    return values.slice(0, 1);
  });
  const expectedUrls = SECTIONS.flatMap((section) =>
    LOCALES.map((locale) => absoluteUrl(locale, section)),
  );
  const actualSet = new Set(locs);
  check(
    actualSet.size === locs.length,
    `${label}: contains duplicate <loc> URLs`,
  );
  check(
    expectedUrls.every((url) => actualSet.has(url)) &&
      locs.every((url) => expectedUrls.includes(url)),
    `${label}: <loc> URLs do not match the 15 canonical localized pages`,
  );

  if (validateLastmod) {
    for (const [index, block] of blocks.entries()) {
      const values = [
        ...block.matchAll(/<lastmod\b[^>]*>([\s\S]*?)<\/lastmod>/gi),
      ].map(([, value]) => normalizeText(value));
      check(
        values.length === 1,
        `${label}: URL entry ${index + 1} must contain exactly one <lastmod>`,
      );
      if (values.length === 1) {
        check(
          values[0].startsWith(LAST_SIGNIFICANT_UPDATE),
          `${label}: URL entry ${index + 1} lastmod must reflect ${LAST_SIGNIFICANT_UPDATE}`,
        );
      }
    }
  }

  if (!validateHreflang) return;

  for (const block of blocks) {
    const [loc] = extractLocs(block);
    if (!loc) continue;
    const route = new URL(loc).pathname.split("/").filter(Boolean);
    const section = route[1] ?? "";
    const alternateTags = findTags(block, "xhtml:link");
    validateAlternates(alternateTags, section, `${label}: ${loc}`);
  }
};

const validateSitemaps = async () => {
  const direct = await readRequired("sitemap.xml");
  if (direct !== null) {
    validateUrlSet(direct, "sitemap.xml", {
      validateHreflang: true,
      validateLastmod: true,
    });
    check(
      !/<video:video\b/i.test(direct),
      "sitemap.xml: complementary product demo must not be declared as a watch-page video",
    );
  }

  const generated = await readRequired("sitemap-0.xml");
  if (generated !== null) {
    validateUrlSet(generated, "sitemap-0.xml", { validateLastmod: true });
    check(
      !/<video:video\b/i.test(generated),
      "sitemap-0.xml: complementary product demo must not be declared as a watch-page video",
    );
  }

  const index = await readRequired("sitemap-index.xml");
  if (index !== null) {
    validateXmlEnvelope(index, "sitemapindex", "sitemap-index.xml");
    const locs = extractLocs(index);
    check(
      locs.length === 1,
      `sitemap-index.xml: expected one sitemap entry, found ${locs.length}`,
    );
    if (locs.length === 1) {
      check(
        locs[0] === `${SITE_URL}/sitemap-0.xml`,
        `sitemap-index.xml: sitemap location must be ${SITE_URL}/sitemap-0.xml`,
      );
    }
  }
};

const validateVideoAssets = async () => {
  try {
    const poster = await readFile(resolve(DIST_DIR, VIDEO_POSTER_FILE));
    const metadata = await sharp(poster).metadata();
    check(metadata.format === "jpeg", `${VIDEO_POSTER_FILE}: must be JPEG`);
    check(
      metadata.width === 408 && metadata.height === 888,
      `${VIDEO_POSTER_FILE}: dimensions must be 408x888`,
    );
    check(
      metadata.isProgressive === true,
      `${VIDEO_POSTER_FILE}: JPEG must be progressive`,
    );
    check(
      poster.byteLength <= 100_000,
      `${VIDEO_POSTER_FILE}: must stay at or below 100 KB`,
    );
  } catch (error) {
    check(
      false,
      `${VIDEO_POSTER_FILE}: missing or invalid (${error.message})`,
    );
  }

  try {
    const video = await readFile(resolve(DIST_DIR, VIDEO_FILE));
    check(video.byteLength > 0, `${VIDEO_FILE}: must not be empty`);
    check(
      video.byteLength <= 5_000_000,
      `${VIDEO_FILE}: must stay at or below 5 MB`,
    );
  } catch (error) {
    check(false, `${VIDEO_FILE}: missing or unreadable (${error.message})`);
  }
};

const validateIndexNowKey = async () => {
  check(
    /^[A-Za-z0-9-]{8,128}$/.test(INDEXNOW_KEY),
    "IndexNow: key must satisfy the official 8-128 character format",
  );

  const keyFile = await readRequired(INDEXNOW_KEY_FILE);
  if (keyFile !== null) {
    check(
      keyFile.trim() === INDEXNOW_KEY,
      `IndexNow: ${INDEXNOW_KEY_FILE} must contain the configured key`,
    );
  }
};

const parseRobotsGroups = (source) => {
  const groups = [];
  let current = { agents: [], allows: [], disallows: [] };

  const flush = () => {
    if (current.agents.length > 0) groups.push(current);
    current = { agents: [], allows: [], disallows: [] };
  };

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.replace(/\s+#.*$/, "").trim();
    if (!line) {
      flush();
      continue;
    }

    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const field = line.slice(0, separator).trim().toLowerCase();
    const value = line.slice(separator + 1).trim();

    if (field === "user-agent") {
      if (current.allows.length > 0 || current.disallows.length > 0) flush();
      current.agents.push(value.toLowerCase());
    } else if (field === "allow") {
      current.allows.push(value);
    } else if (field === "disallow") {
      current.disallows.push(value);
    }
  }
  flush();
  return groups;
};

const validateRobots = async () => {
  const robots = await readRequired("robots.txt");
  if (robots === null) return;

  const requiredAgents = [
    "Googlebot",
    "Bingbot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "Claude-SearchBot",
    "Claude-User",
    "PerplexityBot",
    "Perplexity-User",
    "Applebot",
    "GPTBot",
    "ClaudeBot",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
    "*",
  ];
  const groups = parseRobotsGroups(robots);

  for (const agent of requiredAgents) {
    const group = groups.find(({ agents }) =>
      agents.includes(agent.toLowerCase()),
    );
    check(Boolean(group), `robots.txt: missing User-agent: ${agent}`);
    if (group) {
      check(
        group.allows.includes("/"),
        `robots.txt: ${agent} must include Allow: /`,
      );
      check(
        !group.disallows.includes("/"),
        `robots.txt: ${agent} must not include Disallow: /`,
      );
    }
  }

  const sitemapLines = robots
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+#.*$/, "").trim())
    .filter((line) => /^sitemap\s*:/i.test(line));
  check(
    sitemapLines.length === 1,
    `robots.txt: expected one Sitemap directive, found ${sitemapLines.length}`,
  );
  if (sitemapLines.length === 1) {
    check(
      sitemapLines[0].replace(/^sitemap\s*:\s*/i, "") ===
        `${SITE_URL}/sitemap.xml`,
      `robots.txt: Sitemap must point to ${SITE_URL}/sitemap.xml`,
    );
  }
};

const validate404 = async () => {
  const html = await readRequired("404.html");
  if (html === null) return;

  const robotsTags = findTags(html, "meta").filter(
    ({ attributes }) => (attributes.name ?? "").toLowerCase() === "robots",
  );
  check(
    robotsTags.length === 1,
    `404.html: expected exactly one robots meta tag, found ${robotsTags.length}`,
  );
  if (robotsTags.length === 1) {
    const directives = (robotsTags[0].attributes.content ?? "")
      .toLowerCase()
      .split(",")
      .map((value) => value.trim());
    check(
      directives.includes("noindex"),
      "404.html: robots meta must include noindex",
    );
  }
};

for (const locale of LOCALES) {
  for (const section of SECTIONS) {
    await validatePage(locale, section);
  }
}

await validateSitemaps();
await validateVideoAssets();
await validateIndexNowKey();
await validateRobots();
await validate404();

if (failures.length > 0) {
  console.error(
    `SEO validation failed with ${failures.length} issue${failures.length === 1 ? "" : "s"}:`,
  );
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `SEO validation passed: ${checks} checks across 15 localized pages.`,
  );
}
