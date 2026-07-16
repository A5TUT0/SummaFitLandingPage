import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

const indexablePagePattern = /^\/(?:en|es|fr|de|it)\/(?:policy\/|support\/)?$/;
const lastSignificantUpdate = new Date("2026-07-16T00:00:00.000Z");

export default defineConfig({
  site: "https://summa.fit",
  integrations: [
    react(),
    sitemap({
      filter: (page) => indexablePagePattern.test(new URL(page).pathname),
      // Keep this date tied to real content/metadata changes. Google only
      // uses lastmod when it remains consistently accurate.
      lastmod: lastSignificantUpdate,
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          es: "es",
          fr: "fr",
          de: "de",
          it: "it",
        },
      },
      namespaces: {
        news: false,
        xhtml: true,
        image: false,
        video: false,
      },
    }),
  ],
  i18n: {
    locales: ["en", "es", "fr", "de", "it"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
      // Keep the hand-authored zero-delay fallback page. Cloudflare handles
      // the production redirect at the edge via public/_redirects.
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["lucide-astro"],
    },
  },
});
