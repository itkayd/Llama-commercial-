// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://llamacommercial.co.uk',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
});
