// Each of the five pages builds and renders exactly one h1 with its heading.
// Run after `npm run build`: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const pages = {
  'index.html': { h1: 'No drama. Just Llama.', title: 'Llama Commercial' },
  'about/index.html': { h1: 'About Us', title: 'About Us · Llama Commercial' },
  'services/index.html': { h1: 'Services', title: 'Services · Llama Commercial' },
  'areas/index.html': { h1: 'Areas Covered', title: 'Areas Covered · Llama Commercial' },
  'contact/index.html': { h1: 'Contact Us', title: 'Contact Us · Llama Commercial' },
};

for (const [file, { h1, title }] of Object.entries(pages)) {
  test(`${file} renders its h1 and title`, () => {
    const html = readFileSync(join(dist, file), 'utf8');
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1].trim());
    assert.deepEqual(h1s, [h1]);
    assert.match(html, new RegExp(`<title>${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</title>`));
    assert.match(html, /<meta name="description" content="[^"]+"/);
  });
}

test('only the five pages are built', () => {
  const walk = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? walk(join(d, n)) : [join(d, n)]));
  const built = walk(dist)
    .filter((f) => f.endsWith('.html'))
    .map((f) => f.slice(dist.length))
    .sort();
  assert.deepEqual(built, Object.keys(pages).sort());
});

test('no form, quote or button anywhere', () => {
  for (const file of Object.keys(pages)) {
    const html = readFileSync(join(dist, file), 'utf8');
    assert.doesNotMatch(html, /<form|request a quote|\/quote/i, file);
    assert.doesNotMatch(html.replace(/<button[^>]*class="menu-btn"[\s\S]*?<\/button>/, ''), /<button/i, file);
  }
});
