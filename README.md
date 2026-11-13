# Llama Commercial

Website, brand kit and business tools for **Llama Commercial**, a commercial cleaning company in London.
*No drama. Just Llama.*

## What's in here

| Folder | What it is | Deployed? |
| --- | --- | --- |
| `site/` | The public website, built with Astro: Home, About us, Services (13 service pages), Areas covered, Contact us, Privacy notice | Yes, `site/dist` |
| `site/reference/` | The old one-file prototype, kept for reference only (not built) | No |
| `internal/` | Negotiation desk with your costs, margins and lowest prices | **Never.** Open it on your own device only. CI fails if anything from it reaches the build |
| `brand/logos/` | Every logo as SVG (print, web) and PNG (Word, Canva, social) | – |
| `brand/print/` | Business card and A5 flyer PDFs with 3mm bleed, uniform spec | – |
| `brand/social/` | Square and story ads, LinkedIn banner | – |
| `brand/templates/` | Letterhead, quote and invoice (A4 PDF), email signature, site specification template | – |
| `brand/tokens.json` | Colours, fonts, spacing and radii (the site's `tokens.css` is generated from it) | – |
| `brand/source/` | Scripts that rebuild the logos and all exports | – |
| `docs/` | Brand guidelines, the starter kit, and `website-build-prompt.md` (the brief the site was built from) | – |

## Work on the website

```bash
cd site
npm install
npm run dev          # http://localhost:4321
npm run check        # astro check
npm run build        # static site -> site/dist
npm run check:dist   # link check, copy scan, internal/ leak check
npm run test:e2e     # browser checks at desktop and mobile widths (needs Playwright installed)
npm run tokens       # regenerate src/styles/tokens.css after changing brand/tokens.json
npm run images       # regenerate favicons and og.png (needs Playwright installed)
```

Every phone number, email address and company detail lives in **`site/src/config.ts`**. Change it there and every page updates.

## Going live

Open `site/src/config.ts` and replace each `TODO`:

| Setting | Now | Change to |
| --- | --- | --- |
| `domain` | `https://llamacommercial.co.uk` | Confirm the domain is registered. If it changes, also update `site` in `site/astro.config.mjs` and the sitemap line in `site/public/robots.txt` |
| `phoneDisplay` | placeholder number | Your business number, written like `07123 456789` |
| `phoneE164` | placeholder number | The same number in international form, like `+447123456789` |
| `email` | `hello@llamacommercial.co.uk` | Your real inbox |
| `hours` | `Monday to Saturday, 8am to 7pm` | Your real hours. If they change, also update `openingHoursSchema` (`Mo-Sa 08:00-19:00`) beside it |
| `companyNumber` | `[COMPANY NUMBER]` | From Companies House |
| `registeredOffice` | `[REGISTERED ADDRESS]` | Your registered office. Once it is real, the address is added to the search-engine data automatically |

**Call-back form (`PUBLIC_FORM_ENDPOINT`).** Make a free form at [formspree.io](https://formspree.io) (or similar) and copy its endpoint URL, then set it as an environment variable called `PUBLIC_FORM_ENDPOINT` on your host and redeploy:

- **Netlify:** Site configuration → Environment variables → Add a variable.
- **Vercel:** Project → Settings → Environment Variables.
- **GitHub Pages:** Settings → Secrets and variables → Actions → Variables.

Until it is set, the call-back button opens the visitor's email app with the request filled in, and the page tells them to press send.

## Deploy the website

**Netlify (easiest)**
1. Sign in at netlify.com with GitHub and choose *Add new site → Import an existing project*.
2. Pick this repo. Netlify reads `netlify.toml`: it builds `site/` and publishes `site/dist`.
3. Add your domain under *Domain management*.

**Vercel**
1. Sign in at vercel.com with GitHub, *Add New → Project*, pick this repo.
2. Set *Root Directory* to `site`. Vercel detects Astro and reads `site/vercel.json` for the security and cache headers.

**GitHub Pages**
Needs a public repo, or a paid GitHub plan for a private one. Go to *Settings → Pages → Source: GitHub Actions* and run *Deploy website to GitHub Pages* from the Actions tab.

Every push to `main` redeploys automatically on Netlify and Vercel. Pull requests run CI (`.github/workflows/ci.yml`): type check, build, link check, copy scan and the `internal/` leak check.

## Rebuild the brand files

```bash
cd brand/source
npm install                 # fonts used by the exports
python3 makelogo.py         # logos -> brand/logos/   (needs: pip install fonttools cairosvg)
python3 artboards/gen.py    # regenerates the design artboards from the brand settings
node export.js              # print PDFs and social PNGs -> brand/out/  (needs Playwright)
```

## Brand at a glance

- **Highland** `#173D36`, the main colour (close to Pantone 3435 C)
- **Saffron** `#E3A13A`, the llama's neck band and small accents only (close to Pantone 7409 C)
- **Page** `#F5F6F2` · **Sage** `#E8EDE6` · **Ink** `#152320` · **Slate** `#56625D`
- Fonts: Fraunces (headlines), Manrope (text), IBM Plex Mono (labels), all free on Google Fonts
- Voice: calm, plain, specific. No offers in headlines, no exclamation marks.

Full rules: [`docs/brand-guidelines.md`](docs/brand-guidelines.md).
