import {
  INDEXNOW_ENDPOINT,
  INDEXNOW_KEY,
  INDEXNOW_KEY_LOCATION,
  INDEXNOW_SITEMAP_URL,
  SITE_URL,
} from "./indexnow-config.mjs";

const allowedArguments = new Set(["--dry-run"]);
const argumentsList = process.argv.slice(2);
const unexpectedArguments = argumentsList.filter(
  (argument) => !allowedArguments.has(argument),
);

if (unexpectedArguments.length > 0) {
  throw new Error(`Unknown argument(s): ${unexpectedArguments.join(", ")}`);
}

const dryRun = argumentsList.includes("--dry-run");
const expectedHost = new URL(SITE_URL).hostname;
const requestTimeoutMs = 20_000;

if (!/^[A-Za-z0-9-]{8,128}$/.test(INDEXNOW_KEY)) {
  throw new Error("The configured IndexNow key is invalid.");
}

const fetchWithTimeout = (url, options = {}) =>
  fetch(url, {
    ...options,
    redirect: "manual",
    signal: AbortSignal.timeout(requestTimeoutMs),
    headers: {
      "User-Agent": "SummaFit-IndexNow/1.0 (+https://summa.fit/)",
      ...options.headers,
    },
  });

const decodeXmlText = (value) =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");

const sitemapResponse = await fetchWithTimeout(INDEXNOW_SITEMAP_URL, {
  headers: { Accept: "application/xml, text/xml;q=0.9" },
});

if (sitemapResponse.status !== 200) {
  throw new Error(
    `The live sitemap returned HTTP ${sitemapResponse.status}; submission stopped.`,
  );
}

const sitemapContentType = sitemapResponse.headers.get("content-type") ?? "";
if (!/\b(?:application|text)\/xml\b/i.test(sitemapContentType)) {
  throw new Error(
    `The live sitemap has an unexpected Content-Type: ${sitemapContentType || "missing"}.`,
  );
}

const sitemapXml = await sitemapResponse.text();
const discoveredUrls = [
  ...sitemapXml.matchAll(/<loc\b[^>]*>([\s\S]*?)<\/loc>/gi),
].map(([, value]) => decodeXmlText(value.trim()));
const urlList = [...new Set(discoveredUrls)];

if (urlList.length === 0 || urlList.length > 10_000) {
  throw new Error(
    `The live sitemap produced ${urlList.length} unique URLs; expected between 1 and 10,000.`,
  );
}

if (urlList.length !== discoveredUrls.length) {
  throw new Error("The live sitemap contains duplicate <loc> URLs.");
}

for (const value of urlList) {
  const url = new URL(value);
  if (
    url.origin !== SITE_URL ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    throw new Error(`Refusing to submit a non-canonical URL: ${value}`);
  }
}

const pageChecks = [];
const pageCheckConcurrency = 10;

for (let index = 0; index < urlList.length; index += pageCheckConcurrency) {
  const batch = urlList.slice(index, index + pageCheckConcurrency);
  const results = await Promise.all(
    batch.map(async (url) => {
      const response = await fetchWithTimeout(url, {
        headers: { Accept: "text/html" },
      });
      const contentType = response.headers.get("content-type") ?? "";
      await response.body?.cancel();
      return { contentType, status: response.status, url };
    }),
  );
  pageChecks.push(...results);
}

const unavailablePages = pageChecks.filter(
  ({ contentType, status }) =>
    status !== 200 || !/^text\/html\b/i.test(contentType),
);

if (unavailablePages.length > 0) {
  throw new Error(
    `Submission stopped because canonical URLs are unavailable: ${unavailablePages
      .map(
        ({ contentType, status, url }) =>
          `${status} ${contentType || "missing Content-Type"} ${url}`,
      )
      .join(", ")}`,
  );
}

const keyResponse = await fetchWithTimeout(INDEXNOW_KEY_LOCATION, {
  headers: { Accept: "text/plain" },
});
const publishedKey = await keyResponse.text();
const keyContentType = keyResponse.headers.get("content-type") ?? "";

if (
  keyResponse.status !== 200 ||
  !/^text\/plain\b/i.test(keyContentType) ||
  publishedKey.trim() !== INDEXNOW_KEY
) {
  throw new Error(
    `The public IndexNow key could not be verified (HTTP ${keyResponse.status}); submission stopped.`,
  );
}

if (dryRun) {
  console.log(
    `IndexNow live check passed for ${urlList.length} canonical URLs. No notification was sent.`,
  );
  process.exit(0);
}

const submissionResponse = await fetchWithTimeout(INDEXNOW_ENDPOINT, {
  method: "POST",
  headers: {
    Accept: "application/json, text/plain;q=0.9",
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify({
    host: expectedHost,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList,
  }),
});

if (![200, 202].includes(submissionResponse.status)) {
  const responseBody = (await submissionResponse.text())
    .replaceAll(INDEXNOW_KEY, "[redacted]")
    .trim()
    .slice(0, 500);
  const retryAfter = submissionResponse.headers.get("retry-after");
  throw new Error(
    `IndexNow rejected the submission with HTTP ${submissionResponse.status}${
      responseBody ? `: ${responseBody}` : ""
    }${retryAfter ? ` (Retry-After: ${retryAfter})` : ""}`,
  );
}

console.log(
  `IndexNow accepted ${urlList.length} canonical URLs (HTTP ${submissionResponse.status}).`,
);
