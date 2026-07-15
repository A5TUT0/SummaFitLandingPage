import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://summa.fit',
  integrations: [react(), sitemap()],
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
