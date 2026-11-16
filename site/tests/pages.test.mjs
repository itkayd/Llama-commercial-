// Checks the built site (run after `npm run build`): npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));

// Read the contact details from the config source, so the test fails if a page drifts from it.
const config = readFileSync(fileURLToPath(new URL('../src/config.ts', import.meta.url)), 'utf8');
const phone = config.match(/phone:\s*'([^']+)'/)[1];
const email = config.match(/email:\s*'([^']+)'/)[1];
const tel = `tel:${phone.replace(/\s+/g, '').replace(/^0/, '+44')}`;
const mailto = `mailto:${email}`;

const pages = {
  'index.html': { h1: 'No drama. Just Llama.', title: 'Llama Commercial', nav: 'Home' },
  'about/index.html': { h1: 'About Us', title: 'About Us · Llama Commercial', nav: 'About Us' },
  'services/index.html': { h1: 'Services', title: 'Services · Llama Commercial', nav: 'Services' },
  'areas/index.html': { h1: 'Areas Covered', title: 'Areas Covered · Llama Commercial', nav: 'Areas Covered' },
  'contact/index.html': { h1: 'Contact Us', title: 'Contact Us · Llama Commercial', nav: 'Contact Us' },
  '404.html': { h1: 'Lost llama', title: 'Lost llama · Llama Commercial', nav: null },
};

const read = (file) => readFileSync(join(dist, file), 'utf8');
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

for (const [file, { h1, title, nav }] of Object.entries(pages)) {
  test(`${file}: h1, title, header, collar and footer`, () => {
    const html = read(file);
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1].trim());
    assert.deepEqual(h1s, [h1], 'exactly one h1 with the right text');
    assert.match(html, new RegExp(`<title>${esc(title)}</title>`));
    assert.match(html, /<meta name="description" content="[^"]+"/);
    assert.match(html, /<header class="site-header/, 'header');
    assert.match(html, /<\/h1><\/div> <\/div> <div class="collar" aria-hidden="true">|class="title-band"[\s\S]*?<\/div>\s*<\/div>\s*<div class="collar"/, 'collar directly after the title band');
    assert.match(html, /<footer class="site-footer/, 'footer');
    const footer = html.slice(html.indexOf('<footer'));
    assert.doesNotMatch(footer, /collar|zigzag/, 'no band in the footer');
    const current = [...html.matchAll(/aria-current="page"[^>]*>\s*<span[^>]*>([^<]+)<\/span>/g)].map((m) => m[1].trim());
    assert.deepEqual(current, nav ? [nav] : [], 'active menu link');
  });
}

test('tel: and mailto: links match the config', () => {
  for (const file of Object.keys(pages)) {
    const html = read(file);
    const tels = [...html.matchAll(/href="(tel:[^"]+)"/g)].map((m) => m[1]);
    const mails = [...html.matchAll(/href="(mailto:[^"]+)"/g)].map((m) => m[1]);
    assert.ok(tels.length >= 3, `${file}: header phone, call button and footer phone`);
    assert.ok(tels.every((t) => t === tel), `${file}: every tel: link is ${tel}`);
    assert.ok(mails.length >= 1 && mails.every((m) => m === mailto), `${file}: every mailto: link is ${mailto}`);
    assert.ok(html.includes(`>${phone}<`) || html.includes(`>${phone}</a>`), `${file}: phone shown as text`);
  }
});

test('only the five pages and the 404 are built', () => {
  const walk = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? walk(join(d, n)) : [join(d, n)]));
  const built = walk(dist)
    .filter((f) => f.endsWith('.html'))
    .map((f) => f.slice(dist.length))
    .sort();
  assert.deepEqual(built, Object.keys(pages).sort());
});

test('no forms, quote links or extra buttons', () => {
  for (const file of Object.keys(pages)) {
    const html = read(file);
    assert.doesNotMatch(html, /<form|request a quote|arrange a site visit|\/quote/i, file);
    const buttons = [...html.matchAll(/<button[^>]*class="([^"]*)"/g)].map((m) => m[1]);
    assert.deepEqual(buttons, ['menu-btn'], `${file}: the only <button> is the Menu toggle`);
  }
});
