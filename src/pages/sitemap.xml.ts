import type { APIRoute } from "astro";

import {
  SUPPORTED_LOCALES,
  localizedPath,
  type Locale,
} from "../lib/i18n";

const SITE_URL = "https://summa.fit";
const INDEXABLE_SECTIONS = ["", "policy", "support"] as const;
const LAST_SIGNIFICANT_UPDATE = "2026-07-16";

const absoluteUrl = (locale: Locale, section: string) =>
  `${SITE_URL}${localizedPath(locale, section)}`;

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const renderAlternates = (section: string) => {
  const localizedAlternates = SUPPORTED_LOCALES.map(
    (locale) =>
      `<xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(absoluteUrl(locale, section))}" />`,
  );
  const defaultAlternate = `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absoluteUrl("en", section))}" />`;

  return [...localizedAlternates, defaultAlternate].join("");
};

const urls = INDEXABLE_SECTIONS.flatMap((section) =>
  SUPPORTED_LOCALES.map(
    (locale) =>
      `<url><loc>${escapeXml(absoluteUrl(locale, section))}</loc><lastmod>${LAST_SIGNIFICANT_UPDATE}</lastmod>${renderAlternates(section)}</url>`,
  ),
).join("");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>\n`;

export const GET: APIRoute = () =>
  new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
