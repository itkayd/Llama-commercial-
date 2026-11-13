// Post-build checks over dist/ (sections 16 and 17). Fails with exit code 1 on any problem.
//  1. Nothing from ../internal/ and no "Negotiation Desk" in dist/.
//  2. Copy scan: banned words never appear in visible text.
//  3. Link check: every internal href/src resolves to a built file (and #fragments exist).
//  4. No phone number or email hard-coded in src/ outside src/config.ts.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const internal = join(root, '..', 'internal');
const problems = [];

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const files = walk(dist);
const htmlFiles = files.filter((f) => f.endsWith('.html'));

// 1. internal/
const internalNames = existsSync(internal) ? readdirSync(internal) : [];
for (const f of files) {
  if (internalNames.includes(basename(f))) problems.push(`internal file copied into dist: ${relative(dist, f)}`);
  if (/\.(html|css|js|xml|txt|json|svg|webmanifest)$/.test(f)) {
    const text = readFileSync(f, 'utf8');
    if (/negotiation desk/i.test(text)) problems.push(`"Negotiation Desk" found in ${relative(dist, f)}`);
    if (/internal\//.test(text) && !f.endsWith('.js')) problems.push(`reference to internal/ in ${relative(dist, f)}`);
  }
}

// 2. Copy scan
const banned = [
  'guarantee', 'promise', 'same team', 'same cleaner', 'check-in', 'photo', 'within one working day', '% off',
  'free clean', 'best', '!', 'Airbnb', 'tenancy', 'Proven', 'Duck', 'Owl',
  'sparkling', 'spotless', 'pristine', 'immaculate', 'world-class', 'leading', 'premium', 'unbeatable', 'hassle-free',
  'peace of mind', 'look no further', 'one-stop shop', 'cutting-edge', 'passionate', '24/7',
];
const visibleText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<!doctype[^>]*>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ');
const attrText = (html) => [...html.matchAll(/\s(?:alt|title|aria-label|content|placeholder)="([^"]*)"/g)].map((m) => m[1]).join(' ');
for (const f of htmlFiles) {
  const html = readFileSync(f, 'utf8');
  const text = `${visibleText(html)} ${attrText(html)}`.toLowerCase();
  for (const word of banned) {
    if (text.includes(word.toLowerCase())) problems.push(`banned copy "${word}" in ${relative(dist, f)}`);
  }
}

// 3. Link check
const ids = new Map(htmlFiles.map((f) => [f, new Set([...readFileSync(f, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]));
const resolve = (path) => {
  const clean = decodeURIComponent(path.split('?')[0]);
  const p = join(dist, clean);
  if (clean.endsWith('/')) return existsSync(join(p, 'index.html')) ? join(p, 'index.html') : null;
  return existsSync(p) && statSync(p).isFile() ? p : null;
};
for (const f of htmlFiles) {
  const html = readFileSync(f, 'utf8');
  for (const [, attr, url] of html.matchAll(/\s(href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:)/.test(url)) continue;
    const [path, hash] = url.split('#');
    const target = path === '' ? f : path.startsWith('/') ? resolve(path) : resolve('/' + relative(dist, join(f, '..', path)));
    if (!target) {
      problems.push(`broken ${attr} "${url}" in ${relative(dist, f)}`);
    } else if (hash && target.endsWith('.html') && !ids.get(target)?.has(hash)) {
      problems.push(`missing #${hash} for "${url}" in ${relative(dist, f)}`);
    } else if (path.startsWith('/') && !path.includes('.') && !path.endsWith('/')) {
      problems.push(`link without trailing slash "${url}" in ${relative(dist, f)}`);
    }
  }
}

// 4. Contact details only in src/config.ts
for (const f of walk(join(root, 'src'))) {
  if (f.endsWith('config.ts')) continue;
  const text = readFileSync(f, 'utf8');
  if (/07000|\+44\s?7|@llamacommercial\.co\.uk/.test(text)) problems.push(`contact detail hard-coded in ${relative(root, f)}`);
}

if (problems.length) {
  console.error(problems.map((p) => `✗ ${p}`).join('\n'));
  console.error(`\n${problems.length} problem(s) found in dist/`);
  process.exit(1);
}
console.log(`✓ dist/ checks passed (${htmlFiles.length} pages, ${files.length} files)`);
