// Generates the favicons, app icons and Open Graph image from the logo in the brief.
// Run with `npm run images` (needs Playwright with Chromium), then commit public/.
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Playwright is not a dependency of the site; use the copy installed on the machine.
const { chromium } = createRequire(import.meta.url)('playwright');
const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const NAVY = '#1F3A5F';

const mark = (tile, body, face, id, rx = 22) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
<clipPath id="${id}"><rect width="100" height="100" rx="${rx}"/></clipPath>
<rect width="100" height="100" rx="${rx}" fill="${tile}"/>
<g clip-path="url(#${id})" transform="translate(9 0)">
<path d="M37.2 30.5C35 23 35.6 15.5 38.6 10.5C41.2 15 42.4 22.5 41.8 30Z" fill="${body}"/>
<path d="M43.6 29.2C42.4 21.5 44 14 47.6 9.6C49.8 14.4 50.2 22 48.4 29.2Z" fill="${body}"/>
<path d="M32 100L32 44C32 33.5 37 28 45.5 28L61 28C67.5 28 71.5 32 71.5 37.5C71.5 43 67.5 46 62 46L52 46C49.6 46 48 47.8 48 50.2L48 100Z" fill="${body}"/>
<circle cx="55.5" cy="35.5" r="2.4" fill="${face}"/>
<path d="M62 41.5L66.5 41.5" stroke="${face}" stroke-width="1.6" stroke-linecap="round"/>
<rect x="32" y="66" width="16" height="9" fill="#E3A13A"/>
<path d="M32.8 70.5L34.9 68.2L37.4 72.8L40 68.2L42.6 72.8L45.1 68.2L47.2 70.5" fill="none" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/>
</g></svg>`;

const navyTile = mark(NAVY, '#fff', NAVY, 't');
writeFileSync(here('../public/favicon.svg'), navyTile + '\n');

const fontData = (pkg, file) =>
  `data:font/woff2;base64,${readFileSync(here(`../node_modules/${pkg}/files/${file}`)).toString('base64')}`;

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });

for (const [size, out, square] of [
  [32, '../public/favicon-32.png', false],
  [180, '../public/apple-touch-icon.png', true],
  [192, '../public/brand/llama-commercial-icon-192.png', false],
  [512, '../public/brand/llama-commercial-icon-512.png', false],
]) {
  await page.setViewportSize({ width: size, height: size });
  const svg = square ? mark(NAVY, '#fff', NAVY, 't', 0) : navyTile;
  await page.setContent(`<style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`);
  await page.screenshot({ path: here(out), omitBackground: !square });
}

// Open Graph image: navy, white tile logo, tagline in Fraunces, saffron collar along the bottom.
const collar = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='26' viewBox='0 0 28 26'%3E%3Cpath d='M-1 7.5L0 7 14 19 28 7 29 7.5' fill='none' stroke='%23fff' stroke-width='2.4' stroke-linejoin='round'/%3E%3C/svg%3E")`;
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(`<!doctype html><html><head><style>
@font-face{font-family:Fraunces;font-weight:100 900;src:url(${fontData('@fontsource-variable/fraunces', 'fraunces-latin-opsz-normal.woff2')})}
@font-face{font-family:Manrope;font-weight:700;src:url(${fontData('@fontsource/manrope', 'manrope-latin-700-normal.woff2')})}
html,body{margin:0}
body{width:1200px;height:630px;background:${NAVY};color:#fff;position:relative;box-sizing:border-box;padding:84px 90px}
.logo{display:flex;align-items:center;gap:24px}
.logo svg{width:110px;height:110px}
.name{font-family:Fraunces;font-weight:600;font-size:60px;line-height:1}
.sub{font-family:Manrope;font-weight:700;font-size:21px;letter-spacing:.26em;color:#B8C6D9;margin-top:8px}
h1{font-family:Fraunces;font-weight:600;font-size:92px;line-height:1.05;margin:96px 0 0;letter-spacing:-.005em}
.collar{position:absolute;left:0;right:0;bottom:0;height:44px;background:#E3A13A ${collar} left center/48px 44px repeat-x}
</style></head><body>
<div class="logo">${mark('#fff', NAVY, '#fff', 'w')}<div><div class="name">Llama</div><div class="sub">COMMERCIAL</div></div></div>
<h1>No drama. Just Llama.</h1>
<div class="collar"></div>
</body></html>`);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: here('../public/brand/og.png') });
await browser.close();

writeFileSync(
  here('../public/site.webmanifest'),
  JSON.stringify(
    {
      name: 'Llama Commercial',
      short_name: 'Llama',
      icons: [
        { src: '/brand/llama-commercial-icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/brand/llama-commercial-icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      theme_color: NAVY,
      background_color: '#FFFFFF',
      display: 'browser',
    },
    null,
    2,
  ) + '\n',
);
console.log('Wrote favicon.svg, favicon-32.png, apple-touch-icon.png, app icons, og.png and site.webmanifest');
