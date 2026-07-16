import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const indexablePagePattern = /^\/(?:en|es|fr)\/(?:policy\/|support\/)?$/;

export default defineConfig({
  site: 'https://summa.fit',
  integrations: [
    react(),
    sitemap({
      filter: (page) => indexablePagePattern.test(new URL(page).pathname),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          es: 'es',
          fr: 'fr',
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
    locales: ['en', 'es', 'fr'],
    defaultLocale: 'en',
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
      noExternal: ['lucide-astro'],
    },
  },
});
