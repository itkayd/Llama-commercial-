// Browser checks (section 10.4). Usage: npm run build && npm run test:e2e
// Set SCREENSHOTS=<dir> to save every page at every size, light and dark.
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';

// Playwright is not a site dependency; use the copy installed on the machine.
const { chromium } = createRequire(import.meta.url)('playwright');

const PORT = 4329;
const BASE = `http://localhost:${PORT}`;
const pages = [
  ['home', '/'],
  ['about', '/about/'],
  ['services', '/services/'],
  ['areas', '/areas/'],
  ['contact', '/contact/'],
  ['404', '/404.html'],
];
const viewports = [
  ['1280', 1280, 900],
  ['768', 768, 1024],
  ['390', 390, 844],
  ['320', 320, 700],
];

let failures = 0;
const expect = (cond, msg) => {
  if (cond) return;
  failures++;
  console.error(`  ✗ ${msg}`);
};

const server = spawn('npx', ['astro', 'preview', '--port', String(PORT)], { stdio: 'pipe' });
await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error('preview server did not start')), 30000);
  server.stdout.on('data', (d) => String(d).includes(String(PORT)) && (clearTimeout(timer), resolve()));
});

const browser = await chromium.launch();
let checked = 0;
try {
  for (const scheme of ['light', 'dark']) {
    for (const [vname, width, height] of viewports) {
      const context = await browser.newContext({ viewport: { width, height }, colorScheme: scheme });
      for (const [name, path] of pages) {
        const page = await context.newPage();
        const errors = [];
        page.on('console', (m) => m.type() === 'error' && !/404/.test(m.text()) && errors.push(m.text()));
        page.on('pageerror', (e) => errors.push(String(e)));
        await page.goto(BASE + path, { waitUntil: 'networkidle' });
        const tag = `${path} @ ${width} ${scheme}`;

        const r = await page.evaluate(() => {
          const box = (el) => el && el.getBoundingClientRect();
          const band = box(document.querySelector('.title-band'));
          const collar = box(document.querySelector('.collar'));
          const span = document.querySelector('#site-nav a[aria-current="page"] span');
          let zig = null;
          if (span && span.getBoundingClientRect().width > 0) {
            const range = document.createRange();
            range.selectNodeContents(span);
            const after = getComputedStyle(span, '::after');
            zig = { text: range.getBoundingClientRect().width, after: parseFloat(after.width), span: span.getBoundingClientRect().width };
          }
          const footerBands = [...document.querySelectorAll('footer, footer *')].filter((el) => {
            const s = getComputedStyle(el);
            return /svg/.test(s.backgroundImage) || /svg/.test(getComputedStyle(el, '::before').backgroundImage) || /svg/.test(getComputedStyle(el, '::after').backgroundImage);
          }).length;
          const visible = (el) => el && getComputedStyle(el).display !== 'none' && el.getBoundingClientRect().width > 0;
          const row = ['.site-header .logo', '.call-btn', '.menu-btn'].map((s) => document.querySelector(s)).filter(visible).map((el) => box(el));
          const sameRow = row.length < 2 || row.every((b) => Math.abs(b.top + b.height / 2 - (row[0].top + row[0].height / 2)) < 12);
          return {
            overflow: document.documentElement.scrollWidth - window.innerWidth,
            h1: document.querySelectorAll('h1').length,
            collarGap: Math.abs(collar.top - band.bottom),
            collarH: collar.height,
            zig,
            footerBands,
            rowCount: row.length,
            sameRow,
            headerPhone: visible(document.querySelector('.site-header .phone')),
          };
        });
        checked++;
        expect(errors.length === 0, `${tag}: console errors ${errors.join(' | ')}`);
        expect(r.overflow <= 0, `${tag}: scrolls sideways by ${r.overflow}px`);
        expect(r.h1 === 1, `${tag}: ${r.h1} h1 elements`);
        expect(r.collarGap < 0.5 && Math.round(r.collarH) === 22, `${tag}: collar gap ${r.collarGap}, height ${r.collarH}`);
        expect(r.footerBands === 0, `${tag}: band found in footer`);
        if (r.zig) expect(Math.abs(r.zig.after - r.zig.text) < 1, `${tag}: active zigzag ${r.zig.after}px vs text ${r.zig.text}px`);
        if (width < 820) {
          expect(r.rowCount === 3 && r.sameRow, `${tag}: header not on one row (${r.rowCount} items)`);
          expect(!r.headerPhone, `${tag}: header phone should be hidden`);
        } else {
          expect(r.headerPhone, `${tag}: header phone should show`);
        }

        if (process.env.SCREENSHOTS) {
          mkdirSync(process.env.SCREENSHOTS, { recursive: true });
          await page.screenshot({ path: `${process.env.SCREENSHOTS}/${name}-${vname}-${scheme}.png`, fullPage: true });
        }
        await page.close();
      }
      await context.close();
    }
  }
  console.log(`Checked ${checked} page renders (${pages.length} pages × ${viewports.length} sizes × light/dark).`);

  // Mobile menu
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(BASE + '/services/');
  const btn = page.locator('.menu-btn');
  const nav = page.locator('#site-nav');
  expect(!(await nav.isVisible()), 'menu starts closed');
  await btn.click();
  expect((await btn.getAttribute('aria-expanded')) === 'true' && (await nav.isVisible()), 'Menu opens the list');
  const zig = await page.evaluate(() => {
    const span = document.querySelector('#site-nav a[aria-current="page"] span');
    const range = document.createRange();
    range.selectNodeContents(span);
    return { after: parseFloat(getComputedStyle(span, '::after').width), text: range.getBoundingClientRect().width, nav: document.querySelector('#site-nav').getBoundingClientRect().width };
  });
  expect(Math.abs(zig.after - zig.text) < 1 && zig.after < zig.nav / 2, `open menu: zigzag ${zig.after}px matches text ${zig.text}px, not full width ${zig.nav}px`);
  if (process.env.SCREENSHOTS) await page.screenshot({ path: `${process.env.SCREENSHOTS}/menu-open-390-light.png` });
  await page.keyboard.press('Escape');
  expect(!(await nav.isVisible()) && (await btn.evaluate((el) => el === document.activeElement)), 'Esc closes the menu and returns focus');
  await btn.click();
  await page.locator('#site-nav a', { hasText: 'Areas Covered' }).click();
  await page.waitForURL('**/areas/');
  expect(page.url().endsWith('/areas/'), 'menu link navigates');
  expect(!(await page.locator('#site-nav').isVisible()), 'menu is closed on the new page');
  expect((await page.locator('.call-btn').getAttribute('aria-label')) === 'Call us', 'call button labelled');
  await page.close();
} finally {
  await browser.close();
  server.kill();
}

console.log(failures ? `\n${failures} check(s) failed` : 'All browser checks passed');
process.exit(failures ? 1 : 0);
