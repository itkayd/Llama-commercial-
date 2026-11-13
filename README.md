# Llama Commercial

Website, brand kit and business tools for **Llama Commercial**, a commercial cleaning company in London.
*No drama. Just Llama.*

## What's in here

| Folder | What it is | Deployed? |
| --- | --- | --- |
| `website/` | The public website: Home, About us, Services, Areas covered, Contact us (one `index.html`) | Yes |
| `website/quote/` | Price estimate tool for clients (regular and deep cleans) | Yes, at `/quote` |
| `internal/` | Negotiation desk with your costs, margins and lowest prices | **Never.** Open it on your own device only |
| `brand/logos/` | Every logo as SVG (print, web) and PNG (Word, Canva, social) | – |
| `brand/print/` | Business card and A5 flyer PDFs with 3mm bleed, uniform spec | – |
| `brand/social/` | Square and story ads, LinkedIn banner, visit report template | – |
| `brand/templates/` | Letterhead, quote and invoice (A4 PDF), email signature | – |
| `brand/tokens.json` | Colours, fonts, spacing and radii | – |
| `brand/source/` | Scripts that rebuild the logos and all exports | – |
| `docs/` | Brand guidelines and the starter kit (equipment, costs, set-up checklist) | – |

## Before going live

Open `website/index.html` and `website/quote/index.html` and change:

- `PHONE` and `EMAIL` near the bottom of `website/index.html` (they fill in every page)
- the phone number in `website/quote/index.html` (search for `07000 000000`)
- `[COMPANY NUMBER]` and `[REGISTERED ADDRESS]` in the footer
- `FORM_ENDPOINT`: make a free form at [formspree.io](https://formspree.io) and paste its address here, so call-back requests arrive in your inbox. Left empty, the button opens the visitor's email app instead.

## Deploy the website

The site is plain HTML: no build step, nothing to install. Each option below publishes only the `website/` folder.

**Netlify (easiest)**
1. Sign in at netlify.com with GitHub and choose *Add new site → Import an existing project*.
2. Pick this repo. Netlify reads `netlify.toml` and publishes `website/`.
3. Add your domain under *Domain management*.

**Vercel**
1. Sign in at vercel.com with GitHub, *Add New → Project*, pick this repo.
2. Framework preset: *Other*. `vercel.json` sets the output folder to `website/`.

**GitHub Pages**
Needs a public repo, or a paid GitHub plan for a private one. Then go to *Settings → Pages → Source: GitHub Actions* and run *Deploy website to GitHub Pages* from the Actions tab.

Every push to `main` redeploys automatically on Netlify and Vercel.

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
