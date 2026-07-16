import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SITE_URL = "https://summa.fit";
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

const validateJsonLd = (html, label) => {
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
  for (const type of ["MobileApplication", "WebPage"]) {
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
    validateJsonLd(html, label);
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

const validateUrlSet = (xml, label, { validateHreflang = false } = {}) => {
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
  if (direct !== null)
    validateUrlSet(direct, "sitemap.xml", { validateHreflang: true });

  const generated = await readRequired("sitemap-0.xml");
  if (generated !== null) validateUrlSet(generated, "sitemap-0.xml");

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
