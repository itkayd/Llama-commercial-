// Generates favicons and the Open Graph image from the brand logos.
// Run with `npm run images` (needs Playwright with Chromium), then commit public/.
import { createRequire } from 'node:module';
// Playwright is not a dependency of the site; use the copy installed on the machine.
const { chromium } = createRequire(import.meta.url)('playwright');
import { readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const iconSvg = readFileSync(here('../../brand/logos/llama-commercial-icon.svg'), 'utf8');
const whiteLogo = readFileSync(here('../../brand/logos/llama-commercial-logo-white.svg'), 'utf8');
const font = (pkg, file) =>
  `data:font/woff2;base64,${readFileSync(here(`../node_modules/@fontsource/${pkg}/files/${file}`)).toString('base64')}`;

copyFileSync(here('../../brand/logos/llama-commercial-icon.svg'), here('../public/favicon.svg'));

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });

// Favicons. 16 and 32 keep the rounded tile on transparency; the touch icon is square (iOS rounds it).
const sizes = [
  { size: 16, out: '../public/favicon-16.png', square: false },
  { size: 32, out: '../public/favicon-32.png', square: false },
  { size: 180, out: '../public/apple-touch-icon.png', square: true },
  { size: 512, out: '../public/brand/llama-commercial-icon-512.png', square: false },
  { size: 192, out: '../public/brand/llama-commercial-icon-192.png', square: false },
];
for (const { size, out, square } of sizes) {
  await page.setViewportSize({ width: size, height: size });
  const svg = square ? iconSvg.replace(/rx="22"/g, 'rx="0"') : iconSvg;
  await page.setContent(
    `<style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`,
  );
  await page.screenshot({ path: here(out), omitBackground: !square });
}

// Open Graph image, 1200 × 630.
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(`<!doctype html><html><head><style>
@font-face{font-family:Fraunces;font-weight:600;src:url(${font('fraunces', 'fraunces-latin-600-normal.woff2')})}
@font-face{font-family:Fraunces;font-weight:500;font-style:italic;src:url(${font('fraunces', 'fraunces-latin-500-italic.woff2')})}
html,body{margin:0}
body{width:1200px;height:630px;background:#173D36;color:#fff;box-sizing:border-box;padding:72px 84px;display:flex;flex-direction:column;justify-content:space-between;font-family:Fraunces,Georgia,serif}
.logo svg{width:340px;height:auto;display:block}
h1{font-weight:600;font-size:76px;line-height:1.08;margin:0;max-width:900px;letter-spacing:-0.005em}
p{font-style:italic;font-weight:500;font-size:40px;color:#E3A13A;margin:28px 0 0}
</style></head><body>
<div class="logo">${whiteLogo}</div>
<div><h1>Commercial cleaning across London.</h1><p>No drama. Just Llama.</p></div>
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
      theme_color: '#173D36',
      background_color: '#F5F6F2',
      display: 'browser',
    },
    null,
    2,
  ) + '\n',
);
console.log('Wrote favicons, og.png and site.webmanifest');
