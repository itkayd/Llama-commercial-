// Browser checks for the five pages. Usage: npm run build && npm run test:e2e
// Set SCREENSHOTS=<dir> to also save each page at 1280×900 and 390×844, light and dark.
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';

// Playwright is not a site dependency; use the copy installed on the machine.
const { chromium } = createRequire(import.meta.url)('playwright');

const PORT = 4329;
const BASE = `http://localhost:${PORT}`;
const pages = [
  ['home', '/', 'No drama. Just Llama.', 'Home'],
  ['about', '/about/', 'About Us', 'About Us'],
  ['services', '/services/', 'Services', 'Services'],
  ['areas', '/areas/', 'Areas Covered', 'Areas Covered'],
  ['contact', '/contact/', 'Contact Us', 'Contact Us'],
];
const viewports = [
  ['desktop', 1280, 900],
  ['mobile', 390, 844],
];

let failures = 0;
const expect = (cond, msg) => {
  if (cond) console.log(`  ✓ ${msg}`);
  else {
    failures++;
    console.error(`  ✗ ${msg}`);
  }
};

const server = spawn('npx', ['astro', 'preview', '--port', String(PORT)], { stdio: 'pipe' });
await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error('preview server did not start')), 30000);
  server.stdout.on('data', (d) => String(d).includes(String(PORT)) && (clearTimeout(timer), resolve()));
});

const browser = await chromium.launch();
try {
  for (const scheme of ['light', 'dark']) {
    for (const [vname, width, height] of viewports) {
      console.log(`\n${vname} ${width}×${height}, ${scheme}`);
      const context = await browser.newContext({ viewport: { width, height }, colorScheme: scheme });
      for (const [name, path, h1, navLabel] of pages) {
        const page = await context.newPage();
        const errors = [];
        page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
        page.on('pageerror', (e) => errors.push(String(e)));
        await page.goto(BASE + path, { waitUntil: 'networkidle' });
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        const h1s = await page.locator('h1').allInnerTexts();
        const current = await page.locator('#site-nav a[aria-current="page"]').allInnerTexts();
        expect(
          errors.length === 0 && overflow <= 0 && h1s.length === 1 && h1s[0].trim() === h1 && current.map((t) => t.trim()).join() === navLabel,
          `${path}: h1 "${h1s.join('|')}", current "${current.join('|')}", overflow ${overflow}px${errors.length ? ', errors: ' + errors.join(' | ') : ''}`,
        );
        if (process.env.SCREENSHOTS) {
          mkdirSync(process.env.SCREENSHOTS, { recursive: true });
          await page.screenshot({ path: `${process.env.SCREENSHOTS}/${name}-${vname}-${scheme}.png`, fullPage: true });
        }
        await page.close();
      }
      await context.close();
    }
  }

  console.log('\nMobile menu');
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(BASE + '/');
  const btn = page.locator('.menu-btn');
  const nav = page.locator('#site-nav');
  const phone = page.locator('.site-header .phone');
  expect(await btn.isVisible(), 'Menu button visible under 820px');
  expect(!(await nav.isVisible()), 'menu starts closed');
  expect(await phone.isVisible(), 'phone number visible under the logo');
  await btn.click();
  expect((await btn.getAttribute('aria-expanded')) === 'true' && (await nav.isVisible()), 'menu opens');
  expect((await btn.innerText()).trim() === 'Close', 'button reads Close');
  await page.keyboard.press('Escape');
  expect(!(await nav.isVisible()) && (await btn.evaluate((el) => el === document.activeElement)), 'Esc closes and returns focus');
  await btn.click();
  await page.locator('#site-nav a', { hasText: 'Areas Covered' }).click();
  await page.waitForURL('**/areas/');
  expect(page.url().endsWith('/areas/'), 'menu link navigates');
  await page.close();
} finally {
  await browser.close();
  server.kill();
}

console.log(failures ? `\n${failures} check(s) failed` : '\nAll browser checks passed');
process.exit(failures ? 1 : 0);
