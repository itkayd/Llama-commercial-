// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Fails the build if anything from ../internal/ (the negotiation desk) ends up in dist/. */
const noInternal = () => ({
  name: 'no-internal',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const dist = fileURLToPath(dir);
      const internal = fileURLToPath(new URL('../internal/', import.meta.url));
      const names = new Set(existsSync(internal) ? readdirSync(internal) : []);
      const walk = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? walk(join(d, n)) : [join(d, n)]));
      for (const file of walk(dist)) {
        const name = file.split('/').pop() ?? '';
        if (names.has(name)) throw new Error(`internal/ file found in dist: ${file}`);
        if (/\.(html|js|css|xml|txt|json)$/.test(name) && /negotiation desk/i.test(readFileSync(file, 'utf8'))) {
          throw new Error(`"Negotiation Desk" found in dist: ${file}`);
        }
      }
    },
  },
});

export default defineConfig({
  site: 'https://llamacommercial.co.uk',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap(), noInternal()],
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
});
