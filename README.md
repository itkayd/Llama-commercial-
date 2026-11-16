# Llama Commercial

Website, brand kit and business tools for **Llama Commercial**, a commercial cleaning company in London.
*No drama. Just Llama.*

## What's in here

| Folder | What it is | Deployed? |
| --- | --- | --- |
| `site/` | The public website, built with Astro: five plain pages (Home, About Us, Services, Areas Covered, Contact Us) and a 404 | Yes, `site/dist` |
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
npm test             # each page renders its h1, header, collar and footer; tel:/mailto: match config (after build)
npm run check:dist   # link check, banned-copy scan, internal/ leak check
npm run test:e2e     # browser checks: 6 pages x 4 sizes x light/dark (needs Playwright installed)
npm run images       # regenerate favicons, app icons and og.png (needs Playwright installed)
```

The build itself fails if anything from `internal/` ends up in `site/dist/`.

Every phone number and email address comes from **`site/src/config.ts`** (`SITE.phone`, `SITE.email`). `tel:` links are built from `SITE.phone` (spaces removed, leading 0 swapped for +44). Change it there and every page updates.

## Going live

Open `site/src/config.ts` and check each value in `SITE`:

| Setting | Now | Change to |
| --- | --- | --- |
| `phone` | `07000 000000` (placeholder) | Your business number, written like `07123 456789` |
| `email` | `hello@llamacommercial.co.uk` | Your real inbox |
| `url` | `https://llamacommercial.co.uk` | Confirm the domain is registered. If it changes, also update `site` in `site/astro.config.mjs` and the sitemap line in `site/public/robots.txt` |

Old addresses (`/quote`, `/privacy`, `/services/…` detail pages) redirect to the home page: `site/public/_redirects` on Netlify, `site/vercel.json` on Vercel. Unknown addresses show the "Lost llama" 404 page.

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

Every push to `main` redeploys automatically on Netlify and Vercel. Pull requests run CI (`.github/workflows/ci.yml`): type check, build, page tests, link check, copy scan and the `internal/` leak check.

## Rebuild the brand files

```bash
cd brand/source
npm install                 # fonts used by the exports
python3 makelogo.py         # logos -> brand/logos/   (needs: pip install fonttools cairosvg)
python3 artboards/gen.py    # regenerates the design artboards from the brand settings
node export.js              # print PDFs and social PNGs -> brand/out/  (needs Playwright)
```

## Brand at a glance

- **Navy** `#1F395E`, the main colour (close to Pantone 534 C)
- **Saffron** `#E3A13A`, the llama's neck band and small accents only (close to Pantone 7409 C)
- **Page** `#F5F7FA` · **Frost** `#E8EDF4` · **Ink** `#131B27` · **Slate** `#556070`
- Fonts: Fraunces (headlines), Manrope (text), IBM Plex Mono (labels), all free on Google Fonts
- Voice: calm, plain, specific. No offers in headlines, no exclamation marks.

Full rules: [`docs/brand-guidelines.md`](docs/brand-guidelines.md).
