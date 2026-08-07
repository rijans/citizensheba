// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.citizensheba.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [react(), sitemap()],
  build: {
    // Eliminate render-blocking stylesheet request (PageSpeed / Lighthouse).
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
    // Prebundle Lucide so Home Instant Directory hydrate does not 504 on a stale
    // `node_modules/.vite` cache (skeleton sticks on “Loading services…”).
    optimizeDeps: {
      include: ['lucide-react'],
    },
  },
});