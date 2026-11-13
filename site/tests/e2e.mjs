// Browser checks for the built site (section 17.3).
// Usage: npm run build && npm run test:e2e   (starts `astro preview` itself)
// Set SCREENSHOTS=<dir> to also save light and dark screenshots of key pages.
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';

// Playwright is not a site dependency; use the copy installed on the machine or CI runner.
const { chromium } = createRequire(import.meta.url)('playwright');

const PORT = 4329;
const BASE = `http://localhost:${PORT}`;
const pages = [
  '/',
  '/about/',
  '/services/',
  '/services/regular-office-cleaning/',
  '/services/floor-stripping-and-sealing/',
  '/services/car-park-cleaning/',
  '/areas/',
  '/contact/',
  '/quote/',
  '/privacy/',
  '/404.html',
];
const viewports = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'small', width: 360, height: 740 },
];

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error(`  ✗ ${msg}`);
};
const pass = (msg) => console.log(`  ✓ ${msg}`);
const expect = (cond, msg) => (cond ? pass(msg) : fail(msg));

const server = spawn('npx', ['astro', 'preview', '--port', String(PORT)], { stdio: 'pipe' });
await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error('preview server did not start')), 30000);
  server.stdout.on('data', (d) => {
    if (String(d).includes(String(PORT))) {
      clearTimeout(timer);
      resolve();
    }
  });
});

const browser = await chromium.launch();
try {
  // 1. Every page at every width: no console errors, no horizontal scroll.
  for (const vp of viewports) {
    console.log(`\nPages at ${vp.width} × ${vp.height}`);
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    for (const path of pages) {
      const page = await context.newPage();
      const errors = [];
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      page.on('pageerror', (e) => errors.push(String(e)));
      const res = await page.goto(BASE + path, { waitUntil: 'networkidle' });
      const status = res?.status() ?? 0;
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(errors.length === 0 && overflow <= 0 && (status === 200 || path === '/404.html'), `${path} (status ${status}, overflow ${overflow}px${errors.length ? ', errors: ' + errors.join(' | ') : ''})`);
      await page.close();
    }
    await context.close();
  }

  // 2. Mobile menu.
  console.log('\nMobile menu');
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(BASE + '/');
    const btn = page.locator('.menu-btn');
    const nav = page.locator('#site-nav');
    expect(await btn.isVisible(), 'menu button visible');
    expect(!(await nav.isVisible()), 'menu starts closed');
    await btn.click();
    expect((await btn.getAttribute('aria-expanded')) === 'true' && (await nav.isVisible()), 'menu opens');
    expect((await btn.innerText()).trim() === 'Close', 'button says Close');
    expect(await page.locator('#site-nav .nav-phone').isVisible(), 'phone shown in menu panel');
    await page.keyboard.press('Escape');
    expect((await btn.getAttribute('aria-expanded')) === 'false' && !(await nav.isVisible()), 'Esc closes the menu');
    expect(await btn.evaluate((el) => el === document.activeElement), 'focus returns to the button');
    await btn.click();
    await page.locator('#site-nav a', { hasText: 'Areas covered' }).click();
    await page.waitForURL('**/areas/');
    expect(page.url().endsWith('/areas/'), 'menu link navigates');
    expect((await page.locator('.nav-link[aria-current="page"]').innerText()).trim() === 'Areas covered', 'current page marked');
    await page.close();
  }

  // 3. Contact form: both errors, then the mailto fallback.
  console.log('\nContact form');
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(BASE + '/contact/');
    let mailto = '';
    await page.route('mailto:*', (route) => route.abort());
    page.on('request', (r) => r.url().startsWith('mailto:') && (mailto = r.url()));
    const error = page.locator('#callback-error');
    await page.click('button[type="submit"]');
    expect((await error.innerText()) === 'Please add your name.', 'name error');
    expect(await page.locator('#name').evaluate((el) => el === document.activeElement), 'focus moves to name');
    await page.fill('#name', 'Sam Taylor');
    await page.fill('#contact', '0700');
    await page.click('button[type="submit"]');
    expect((await error.innerText()) === 'Please add a phone number or an email address so we can reach you.', 'contact error');
    expect(await page.locator('#contact').evaluate((el) => el === document.activeElement), 'focus moves to contact');
    await page.fill('#contact', 'sam@example.org');
    await page.click('button[type="submit"]');
    const done = page.locator('.callback-done');
    await done.waitFor();
    const text = await done.innerText();
    expect(text.startsWith('Your email app should open with your request ready. Press send to get it to us.'), 'fallback message');
    expect(!/sent/i.test(text.replace('Press send', '')), 'fallback never says sent');
    expect(mailto === '' || mailto.includes('subject=Call%20back%20request'), 'mailto subject');
    await page.close();

    // Honeypot: filled means nothing happens.
    const bot = await browser.newPage();
    await bot.goto(BASE + '/contact/');
    await bot.fill('#name', 'Bot');
    await bot.fill('#contact', 'bot@example.org');
    await bot.locator('#company_website').fill('http://spam.example', { force: true });
    await bot.click('button[type="submit"]');
    expect(await bot.locator('.callback-form').isVisible(), 'honeypot submissions are ignored');
    await bot.close();
  }

  // 4. Price estimate.
  console.log('\nPrice estimate');
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(BASE + '/quote/');
    const price = page.locator('#result-price');
    const per = page.locator('#result-per');
    expect((await price.innerText()) === '£595' && (await per.innerText()).trim() === '/month', `defaults show £595 /month (got ${await price.innerText()}${await per.innerText()})`);
    await page.check('input[name="kind"][value="deep"]', { force: true });
    await page.fill('#sqft', '500');
    await page.fill('#washrooms', '1');
    await page.fill('#kitchens', '0');
    expect((await price.innerText()) === '£149', `500 sq ft deep clean shows £149 (got ${await price.innerText()})`);
    expect(!(await page.locator('#visits-field').isVisible()), 'visits hidden for deep clean');
    await page.fill('#sqft', '3000');
    await page.fill('#washrooms', '3');
    await page.fill('#kitchens', '2');
    expect((await price.innerText()) === '£455', 'deep(3000, 3, 2) shows £455');
    await page.fill('#sqft', '-40');
    expect((await price.innerText()) === '£149', 'negative area counts as 0');
    await page.close();
  }

  // 5. Screenshots.
  if (process.env.SCREENSHOTS) {
    const dir = process.env.SCREENSHOTS;
    mkdirSync(dir, { recursive: true });
    const shots = [
      ['home', '/'],
      ['service', '/services/floor-stripping-and-sealing/'],
      ['contact', '/contact/'],
      ['quote', '/quote/'],
      ['about', '/about/'],
      ['services', '/services/'],
      ['areas', '/areas/'],
    ];
    for (const scheme of ['light', 'dark']) {
      for (const vp of viewports.slice(0, 2)) {
        const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, colorScheme: scheme, deviceScaleFactor: 1 });
        const page = await context.newPage();
        for (const [name, path] of shots) {
          await page.goto(BASE + path, { waitUntil: 'networkidle' });
          await page.screenshot({ path: `${dir}/${name}-${vp.name}-${scheme}.png`, fullPage: true });
        }
        await context.close();
      }
    }
    console.log(`\nScreenshots saved to ${dir}`);
  }
} finally {
  await browser.close();
  server.kill();
}

console.log(failures ? `\n${failures} check(s) failed` : '\nAll browser checks passed');
process.exit(failures ? 1 : 0);
