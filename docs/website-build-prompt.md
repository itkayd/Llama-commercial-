# Build the Llama Commercial website

You are building the production website for **Llama Commercial**, a commercial cleaning company based in Hackney, London. Work in the GitHub repository `itkayd/llama-commercial`.

Read this whole brief before writing code. It is the single source of truth for brand identity, colours, typography, copy, behaviour and technical setup. Where the old prototype in `website/index.html` disagrees with this brief, **follow this brief**. Where the brief is silent, choose the calmest, simplest option and list that decision in your pull request.

---

## Contents

1. The business
2. Golden rules (read these twice)
3. Brand identity: name, logo, colour, type, icons, imagery, layout, components
4. Copywriting guide
5. Tech stack and project structure
6. Site config
7. Header and footer
8. Sitemap and meta tags
9. Page-by-page copy
10. Contact page behaviour
11. Price estimate tool
12. Privacy notice and 404
13. SEO and structured data
14. Accessibility
15. Performance
16. Deployment
17. Testing and acceptance
18. Do not
19. Deliverable

---

## 1. The business

Llama Commercial cleans commercial buildings across Greater London:

- offices and business units
- schools and education centres
- churches and places of worship
- shops and retail
- gyms and sports facilities
- factories and warehouses
- communal areas in residential and mixed-use blocks
- car parks
- hotels and venues (public areas)

Services: regular office and contract cleaning, communal area cleaning, school cleaning, church cleaning, shop/business unit/factory cleaning, sports facility cleaning, carpet and upholstery cleaning, rug cleaning, floor scrubbing, floor stripping and sealing, floor polishing, deep cleaning, car park cleaning.

How a contract starts: a free site visit, then a written specification and a fixed price.

The founder goes by **Diesel**. The company is new: there are no reviews, no client list, no accreditations and no history to show yet, and the site must not pretend otherwise.

**The website's one job:** get a facilities manager, office manager, school business manager, church administrator or property manager to **call, email or request a call back**.

**Who reads it:** busy people responsible for a building. They want to know three things fast: do you clean my kind of building, do you cover my area, how do I reach you.

---

## 2. Golden rules

### 2.1 No promises, no guarantees, no offers

The brand is calm and makes **no service promises**. Do not write, imply or design for any of these:

- guarantees of any kind (on-time, re-clean, money-back, satisfaction, price-beat)
- discounts, percentages off, "first clean free", "limited time", countdowns
- response-time promises ("we reply within one working day", "call back within an hour", "same-day reply", "quote within 48 hours")
- staffing promises ("the same cleaner every visit", "a dedicated team", "same team each visit")
- check-ins, site audits, monthly walk-rounds, account reviews
- photos, before-and-after pictures, photo reports, visit reports, log sheets, apps, live tracking
- "no lock-in" or contract-length promises
- superlatives: best, leading, number one, unbeatable, premium, world-class, award-winning, trusted by

The only offer the site may mention is this fact, stated plainly and never as a headline: **"Site visits and written quotes are free."**

### 2.2 Never invent facts

No testimonials, reviews, star ratings, client logos, case studies, accreditation badges (BICSc, CHAS, SafeContractor, ISO and so on), years in business, number of clients, staff counts or statistics. Use only the claims in this brief.

Claims you **may** make (they are true and required for how the business runs):
- right-to-work and reference checks for all staff
- DBS checks to the level a site needs
- training in safe chemical handling (COSHH), colour-coded cleaning and floor machines
- public liability and employers' liability insurance, certificates available on request
- professional equipment, lower-impact products where they do the job properly
- cleaning in and outside business hours, including early mornings, evenings and weekends
- every contract starts with a site visit and a written specification

### 2.3 Other rules

1. **`internal/` must never be deployed, linked or copied into the site.** It holds the negotiation desk with costs and margins.
2. **UK English** (organisation, colour, specialise, enquiry). Prices in £, floor area in sq ft, dates like 13 November 2026, times like 6:00pm.
3. **All contact and company details come from `src/config.ts`** (section 6). Nothing hard-coded anywhere else.
4. **WCAG 2.2 AA**, fast, no client-side framework, perfect at 360px wide.
5. **Use the copy in section 9 exactly.** New copy must follow section 4.

---

## 3. Brand identity

### 3.1 Name and idea

| | |
| --- | --- |
| Brand name | **Llama Commercial** (always both words in titles and the footer; "Llama" alone is fine in running copy after first mention) |
| Legal name | Llama Commercial Ltd |
| Tagline | *No drama. Just Llama.* |
| Descriptor | Commercial cleaning · London |
| Brand idea | Llamas are calm, steady and hard-working. A clean should feel the same to the people who run the building: done properly, without fuss. |
| Personality | Calm · plain-spoken · steady · quietly confident · a little warmth through the llama, never jokey |
| Not | Loud, salesy, cute, cartoonish, corporate jargon |

### 3.2 Logo

**The mark** is an original llama in profile facing right, with two banana-shaped ears, a small eye, and a woven saffron band around its neck. It sits inside a highland-green tile with 22% rounded corners. The neck runs off the bottom of the tile.

**The wordmark** is "Llama" in Fraunces 600 above "COMMERCIAL" in Manrope 700, uppercase, letter-spaced 0.3em, in slate.

**Files** (already in the repo, outlined artwork, no fonts needed):

| File in `brand/logos/` | Use |
| --- | --- |
| `llama-commercial-logo-green.svg` | Default. Light backgrounds |
| `llama-commercial-logo-green-descriptor.svg` | With "COMMERCIAL CLEANING · LONDON" |
| `llama-commercial-logo-white.svg` | On highland or dark backgrounds (no tile; band stays saffron) |
| `llama-commercial-logo-white-descriptor.svg` | Same, with descriptor |
| `llama-commercial-stacked-green.svg` / `-white.svg` | Square spaces |
| `llama-commercial-icon.svg` | The tile alone: favicon, header, app icon |
| `llama-commercial-social-avatar.svg` | Social and OG use, crops to a circle |

**Header implementation:** inline the icon SVG (below) at 44 × 44px, then set the wordmark as live HTML text so it stays crisp: "Llama" Fraunces 600 26px `--ink`, "COMMERCIAL" Manrope 700 10.5px, letter-spacing 0.3em, `--ink-muted`, 4px gap.

```html
<svg viewBox="0 0 100 100" width="44" height="44" aria-hidden="true">
  <clipPath id="llama-tile"><rect width="100" height="100" rx="22"/></clipPath>
  <rect width="100" height="100" rx="22" fill="#173D36"/>
  <g clip-path="url(#llama-tile)" transform="translate(9 0)">
    <path d="M37.2 30.5C35 23 35.6 15.5 38.6 10.5C41.2 15 42.4 22.5 41.8 30Z" fill="#fff"/>
    <path d="M43.6 29.2C42.4 21.5 44 14 47.6 9.6C49.8 14.4 50.2 22 48.4 29.2Z" fill="#fff"/>
    <path d="M32 100L32 44C32 33.5 37 28 45.5 28L61 28C67.5 28 71.5 32 71.5 37.5C71.5 43 67.5 46 62 46L52 46C49.6 46 48 47.8 48 50.2L48 100Z" fill="#fff"/>
    <circle cx="55.5" cy="35.5" r="2.4" fill="#173D36"/>
    <path d="M62 41.5L66.5 41.5" stroke="#173D36" stroke-width="1.6" stroke-linecap="round"/>
    <rect x="32" y="66" width="16" height="9" fill="#E3A13A"/>
    <path d="M32.8 70.5L34.9 68.2L37.4 72.8L40 68.2L42.6 72.8L45.1 68.2L47.2 70.5" fill="none" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/>
  </g>
</svg>
```

**Rules**
- Clear space on every side: at least the width of the llama's neck (16% of the tile width).
- Minimum size: tile 24px on screen; full lockup 120px wide.
- Green logo on light backgrounds, white logo on highland or dark. Never the green logo on a busy background.
- Never recolour the saffron band, stretch, rotate, outline, add shadows or effects, place the llama outside its tile in the green version, or redraw it.

**Favicons:** generate `favicon.svg` plus 16, 32, 180 (apple-touch-icon) and 512px PNGs from `llama-commercial-icon.svg`. Theme colour `#173D36`.

**Open Graph image** (1200 × 630, `public/brand/og.png`): highland background, white logo top-left, "Commercial cleaning across London." in Fraunces 600 white, tagline in Fraunces 500 italic saffron.

### 3.3 Colour

**Ratio:** roughly 60% page/card neutrals, 30% highland, 10% saffron and everything else. Saffron is a spice, not a sauce.

| Token | Name | Hex | RGB | Print ref | Role |
| --- | --- | --- | --- | --- | --- |
| `--highland` | Highland | `#173D36` | 23, 61, 54 | ≈ Pantone 3435 C | The brand colour. Logo tile, primary buttons, dark bands, result panels, footer accents |
| `--saffron` | Saffron | `#E3A13A` | 227, 161, 58 | ≈ Pantone 7409 C | The llama's band. Bullets, small marks, the tagline on highland, focus rings. **Never text or thin lines on light backgrounds** (2.1:1) |
| `--saffron-ink` | Saffron ink | `#8A5A12` | 138, 90, 18 | – | Saffron for text on light: the tagline, small accent labels |
| `--page` | Page | `#F5F6F2` | 245, 246, 242 | – | Page background. Cool off-white with a green lean, never cream |
| `--card` | Card | `#FFFFFF` | 255, 255, 255 | – | Cards, header, forms, white bands |
| `--sage` | Sage | `#E8EDE6` | 232, 237, 230 | – | Quiet bands, panels, active nav pill |
| `--ink` | Ink | `#152320` | 21, 35, 32 | – | All headings and body text |
| `--ink-muted` | Slate | `#56625D` | 86, 98, 93 | – | Secondary text, eyebrows, captions |
| `--on-brand` | White | `#FFFFFF` | 255, 255, 255 | – | Text and the llama on highland |
| `--on-brand-muted` | Mist | `#B9CCC3` | 185, 204, 195 | – | Secondary text on highland |
| `--line` | Line | `#D5DCD3` | 213, 220, 211 | – | Hairlines, card borders, input borders |

**Dark mode** (`@media (prefers-color-scheme: dark)`, no toggle):

| Token | Dark value |
| --- | --- |
| `--highland` | `#1E4840` |
| `--saffron` | `#E3A13A` |
| `--saffron-ink` | `#E9B460` |
| `--page` | `#0F1A18` |
| `--card` | `#15231F` |
| `--sage` | `#1A2B26` |
| `--ink` | `#EEF2EE` |
| `--ink-muted` | `#A6B5AE` |
| `--on-brand` | `#F5F6F2` |
| `--on-brand-muted` | `#B9CCC3` |
| `--line` | `#2A3B36` |

In dark mode, line icons use `--on-brand-muted` instead of `--highland`. Always set `body { background: var(--page); color: var(--ink); }`.

**Checked contrast:** ink on page 15:1 · slate on page 5.6:1 · slate on sage 5.3:1 · white on highland 11:1 · mist on highland 6:1 · saffron on highland 5.4:1 · saffron-ink on page 5.4:1. Keep these pairs; don't introduce others without checking 4.5:1 (3:1 for 24px+ text and icons).

**Cleaning colour code** (only in the colour-code panel, always with the colour's name beside the swatch):

| Token | Hex | Area |
| --- | --- | --- |
| `--code-red` | `#C6463B` | Toilets, urinals and washroom floors |
| `--code-blue` | `#3C6FB6` | General areas: offices, halls, corridors |
| `--code-green` | `#3E8A55` | Kitchens, food and bar areas |
| `--code-yellow` | `#E0B323` | Clinical areas and washroom sinks |

**Status colours** (form errors only): error text `#B3261E` light / `#F2B8B5` dark.

### 3.4 Typography

Self-host with `@fontsource/fraunces`, `@fontsource/manrope`, `@fontsource/ibm-plex-mono` (Latin subset, `font-display: swap`). Preload Fraunces 600 and Manrope 400.

| Role | Font | Size / line height | Other |
| --- | --- | --- | --- |
| H1 | Fraunces 600 | clamp(38px, 6vw, 64px) / 1.1 | `text-wrap: balance`, letter-spacing −0.005em |
| H2 | Fraunces 600 | clamp(28px, 3.6vw, 40px) / 1.15 | |
| H3 | Fraunces 600 | 21px / 1.25 | Card and step titles |
| Tagline | Fraunces 500 italic | 22px / 1.3 | `--saffron-ink` on light, `--saffron` on highland |
| Lede | Manrope 400 | 19px / 1.6 | `--ink-muted`, max 62ch |
| Body | Manrope 400 | 17px / 1.6 | max 65ch |
| Small | Manrope 400 | 14–15px / 1.5 | |
| Bold labels | Manrope 700 | 15–16px | |
| Eyebrow | Manrope 700 | 13px | Uppercase, letter-spacing 0.16em, `--ink-muted` |
| Mono label | IBM Plex Mono 500 | 12px | Uppercase, letter-spacing 0.1em. Specification card, step numbers, frequencies, postcode chips |
| Button | Manrope 700 | 15.5px | |

Fallbacks: Fraunces → Georgia, "Times New Roman", serif · Manrope → "Segoe UI", system-ui, Arial, sans-serif · Plex Mono → ui-monospace, Consolas, monospace.

Rules: sentence case for every heading and button. One H1 per page. Never set body copy in Fraunces. Use `font-variant-numeric: tabular-nums` for prices and phone numbers.

### 3.5 Icons

Simple line icons on a 24 × 24 grid, 1.6px stroke, round caps and joins, no fill, colour `--highland` (dark mode `--on-brand-muted`), shown at 30px. All `aria-hidden="true"`. Use these paths:

| Icon | SVG content |
| --- | --- |
| Office | `<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10.5 21v-3h3v3"/>` |
| School | `<path d="M3 9l9-5 9 5-9 5-9-5z"/><path d="M7 11.3V16c0 1.4 2.3 2.8 5 2.8s5-1.4 5-2.8v-4.7"/><path d="M21 9v5"/>` |
| Church | `<path d="M12 2.5v4M10 4.5h4"/><path d="M7 21V11.5l5-4.5 5 4.5V21"/><path d="M4 21h16"/><path d="M10.5 21v-3.5a1.5 1.5 0 013 0V21"/>` |
| Shop | `<path d="M4 8l1.8-4h12.4L20 8"/><path d="M4 8h16v1.2a2.7 2.7 0 01-5.3 0 2.7 2.7 0 01-5.4 0A2.7 2.7 0 014 9.2V8z"/><path d="M5.5 12v9h13v-9"/><path d="M10 21v-5h4v5"/>` |
| Gym | `<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9.5v5M20.5 9.5v5M6.5 12h11"/>` |
| Factory | `<path d="M2.5 21h19"/><path d="M3.5 21V11l5.5 3.3V11l5.5 3.3V7h3l1 14"/><path d="M7 18h2M12 18h2"/>` |
| Communal areas | `<path d="M3 20.5h4.5v-4h4v-4h4v-4H20"/><path d="M3 20.5V4"/>` |
| Car park | `<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M10 16.5v-9h3.2a2.7 2.7 0 010 5.4H10"/>` |
| Phone | `<path d="M5 3.5h3.2l1.6 4.2-2.1 1.4a11 11 0 006.2 6.2l1.4-2.1 4.2 1.6V18a2.5 2.5 0 01-2.5 2.5A15.5 15.5 0 012.5 6 2.5 2.5 0 015 3.5z"/>` |
| Email | `<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>` |

No emoji anywhere. Bullets are 7 × 7px saffron squares with 2px radius.

### 3.6 Imagery

There are no photos yet. **Do not use stock photos or AI-generated images.** Visual interest comes from:
- the example cleaning specification card on the home page,
- the building-type icons,
- highland bands with the white logo,
- generous white space.

Build a `PhotoStrip` component that renders nothing until real photos are added to `src/content/photos/`. When photos arrive later: real team and real sites only, natural light, people working, no posed smiles, no rubber-glove clichés, no sparkles or lens flares.

### 3.7 Layout and components

- Max content width 1120px, centred. Side gutter `max(20px, env(safe-area-inset-left/right))`.
- Spacing scale: 4, 8, 16, 24, 40, 64px. Section vertical padding `clamp(56px, 8vw, 96px)`.
- Use grid/flex with `gap`, not margins between siblings. Left-align text. Don't centre whole sections.
- Alternate section backgrounds to separate content: `--page`, `--card`, `--sage`, and one `--highland` CTA band per page at most.
- Radius: 6px inputs and chips · 14px cards and panels · 22px large tiles · 999px buttons.

**Buttons (pills)**
- Primary: `--highland` background, white text, 12px × 20px padding. Hover: brightness(1.12). Active: brightness(0.95).
- Ghost: transparent, `--ink` text, 1.5px inset `--line` border. Hover: border `--ink`.
- On highland: white background, `--highland` text.
- Focus (every interactive element): 3px solid `--saffron` outline, 3px offset.
- Minimum touch target 44 × 44px.

**Cards:** `--card` background, 1px `--line` border, 14px radius, 22–26px padding, no shadows. Only the example specification card has a soft shadow (`0 18px 40px -24px rgba(21,35,32,.35)`).

**Inputs:** 17px Manrope, `--page` background, 1.5px `--line` border, 10px radius, 13px × 14px padding. Focus: border `--highland` plus 3px highland ring at 22% opacity. Labels above inputs in Manrope 700 14.5px.

**Lists of facts:** hairline rules (`--line`) between rows instead of boxes.

**Chips** (postcodes): `--card`, 1px `--line` border, 10px radius, mono postcode then the area name. "Closest" chips get a highland border.

---

## 4. Copywriting guide

### 4.1 Voice

- **Plain.** Short sentences. Everyday words. Say what we clean and how.
- **Specific.** "Machine scrub monthly, strip and reseal twice a year." Not "comprehensive floor care solutions".
- **Calm.** No exclamation marks, no all-caps sentences, no urgency.
- **Honest.** Describe the service. Don't promise outcomes, times or staffing (section 2.1).
- **Warm, lightly.** The llama is the warmth. One pun per page at most.

### 4.2 Approved lines

| Line | Where |
| --- | --- |
| *No drama. Just Llama.* | Tagline: hero, About, contact, footer |
| Commercial cleaning across London. | The plain headline |
| *Llama clean that for you.* | Only in an ad-style spot, if anywhere |
| *Llama handle it.* | Same |

### 4.3 Words

| Use | Avoid |
| --- | --- |
| clean, cleaning, cleaners | sanitation solutions, hygiene partners |
| building, site, premises | facility portfolio |
| written specification, written quote | bespoke package, tailored solution |
| site visit | free consultation, audit |
| we clean / we can clean | we guarantee, we promise, we always |
| insured, vetted, trained | fully accredited, certified (unless true later) |
| before you open, after you close, evenings, weekends | 24/7, around the clock |
| call us, email us, request a call back | get in touch today, don't miss out |

Banned outright: sparkling, spotless, pristine, immaculate, world-class, best, leading, premium, unbeatable, hassle-free, peace of mind, look no further, one-stop shop, cutting-edge, passionate.

### 4.4 Punctuation and style

- Sentence case everywhere. Oxford comma optional; be consistent (this brief omits it).
- Use "and" instead of "&" in running text; "&" is fine in card titles (e.g. "Offices & business units").
- No em-dash asides, no "not X, but Y" constructions, no rhetorical questions as headings, no scare quotes.
- Numbers: numerals for all quantities ("2 washrooms", "5 visits a week"), £ with no decimals unless pence matter.
- Phone numbers formatted `07000 000000`.

### 4.5 Microcopy

| Element | Text |
| --- | --- |
| Primary CTA | Arrange a site visit |
| Header CTA | Request a quote |
| Secondary CTA | See our services · What's included |
| Call link | Call {phone} |
| Form button | Request a call back |
| Sending state | Sending… |
| Error: no name | Please add your name. |
| Error: no contact | Please add a phone number or an email address so we can reach you. |
| Error: send failed | Sorry, that didn't go through. Please call us on {phone}. |
| Success (form service) | Thanks, {first name}. We'll be in touch. |
| Fallback (no form service) | Your email app should open with your request ready. Press send to get it to us. If nothing opened, call us on {phone} or email {email}. |
| Copy button | Copy number → Copied |
| Menu button | Menu / Close |
| Skip link | Skip to content |

---

## 5. Tech stack and project structure

- **Astro (latest stable 5.x), static output.** No React, Vue, Svelte or Tailwind. Plain CSS with custom properties. Vanilla JS only for the mobile menu, contact form, copy button and price estimate.
- Create the site in `site/`. Move the old prototype to `site/reference/prototype.html` (not built). Remove the old `website/` folder once `site/` builds and the deploy configs point at it.
- Copy needed logos from `brand/logos/` into `site/public/brand/`.
- Generate `src/styles/tokens.css` from `brand/tokens.json` (values in section 3.3–3.7).

```
site/
  astro.config.mjs          # site: 'https://llamacommercial.co.uk', output: 'static', trailingSlash: 'always'
  package.json
  src/
    config.ts               # section 6
    data/sectors.ts         # 8 building types (9.1)
    data/services.ts        # 13 services (9.4)
    data/areas.ts           # postcode areas (9.6)
    lib/pricing.ts          # estimate maths (11) + pricing.test.ts
    layouts/Base.astro      # head, meta, JSON-LD, header, footer, skip link
    components/             # Header, Footer, Button, Eyebrow, SectorCard, ServiceCard, ServiceList,
                            # Steps, Facts, ColourCode, SpecCard, CtaBand, ContactWays, CallbackForm,
                            # Breadcrumbs, PostcodeChips, PhotoStrip
    pages/
      index.astro
      about.astro
      services/index.astro
      services/[slug].astro
      areas.astro
      contact.astro
      quote.astro
      privacy.astro
      404.astro
    styles/tokens.css
    styles/global.css
  public/
    brand/                  # logos, favicons, og.png
    robots.txt
```

Add `@astrojs/sitemap`.

---

## 6. Site config

`src/config.ts` is the only place contact and company details live:

```ts
export const site = {
  name: 'Llama Commercial',
  legalName: 'Llama Commercial Ltd',
  tagline: 'No drama. Just Llama.',
  descriptor: 'Commercial cleaning · London',
  domain: 'https://llamacommercial.co.uk',      // TODO: confirm domain is registered
  phoneDisplay: '07000 000000',                  // TODO: real number
  phoneE164: '+447000000000',                    // TODO
  email: 'hello@llamacommercial.co.uk',          // TODO
  hours: 'Monday to Saturday, 8am to 7pm',       // TODO: confirm
  baseArea: 'Hackney, London',
  companyNumber: '[COMPANY NUMBER]',             // TODO
  registeredOffice: '[REGISTERED ADDRESS]',      // TODO
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT ?? '', // Formspree (or similar) URL, set in host env vars
};
```

Phone numbers always appear as visible text **and** a `tel:` link. The email always appears as visible text **and** a `mailto:` link.

---

## 7. Header and footer

**Header** (sticky at `top: env(safe-area-inset-top)`, `--card` background, 1px `--line` bottom border, 14px vertical padding)
- Left: logo → `/`
- Nav: Home · About us · Services · Areas covered · Contact us (15.5px Manrope 500, pill hover in `--sage`, current page `aria-current="page"` with `--sage` pill and 700 weight)
- Right: phone number (Manrope 700, tabular numbers, `tel:` link) and primary pill **Request a quote** → `/contact/`
- Under 960px: nav collapses behind a **Menu** button (`aria-expanded`, `aria-controls`), opening a full-width panel under the header. Header CTA hides. Under 520px the header phone hides (it appears in the menu panel).

**Footer** (`--card`, 1px top border)
- Column 1: logo and "Commercial cleaning across London. Based in Hackney."
- Company: About us · Areas covered · Contact us · Privacy notice
- Services: Contract cleaning (→ regular-office-cleaning) · Floors and carpets (→ /services/#floors) · Deep cleaning · Car parks
- Contact: {phone} · {email} · {hours}
- Tagline in Fraunces 500 italic, `--saffron-ink`
- Legal line (13px, `--ink-muted`): "© {current year} Llama Commercial Ltd · Registered in England and Wales · Company no. {companyNumber} · Registered office: {registeredOffice}"

---

## 8. Sitemap and meta tags

Every page: unique `<title>`, meta description (max 155 characters), canonical URL, Open Graph (`og:title`, `og:description`, `og:image` = og.png, `og:type`, `og:url`, `og:locale` en_GB) and `twitter:card` summary_large_image.

| URL | Title | Meta description |
| --- | --- | --- |
| `/` | Commercial Cleaning in London · Llama Commercial | Commercial cleaning across London for offices, schools, churches, shops, gyms, factories, communal areas and car parks. Site visits and quotes are free. |
| `/about/` | About Us · Llama Commercial | A Hackney-based commercial cleaning company working across Greater London, with vetted, trained and insured staff. |
| `/services/` | Commercial Cleaning Services · Llama Commercial | Contract and deep cleaning, carpets, upholstery and rugs, floor scrubbing, stripping, sealing and polishing, and car park cleaning in London. |
| `/areas/` | Areas We Cover in London · Llama Commercial | Commercial cleaning in East London, the City, North London and across Greater London. Based in Hackney. |
| `/contact/` | Contact Us · Llama Commercial | Call, email or request a call back from Llama Commercial. Site visits and written quotes for commercial buildings in London are free. |
| `/quote/` | Cleaning Price Estimate · Llama Commercial | A guide price for regular or one-off commercial cleaning in London. Enter your floor area, washrooms, kitchens and visits per week. |
| `/privacy/` | Privacy Notice · Llama Commercial | How Llama Commercial uses the details you send us. |
| 404 | Page not found · Llama Commercial | – |

Service pages: title "{H1} in London · Llama Commercial", description from the table in 9.4.

---

## 9. Page-by-page copy

Use this copy exactly. `{phone}`, `{email}`, `{hours}` come from config.

### 9.1 Home `/`

**Hero** (`--page`; two columns on desktop, stacked under 860px; size to content, not 100vh)
- Eyebrow: COMMERCIAL CLEANING · LONDON
- H1: Commercial cleaning across London.
- Lede: Offices, schools, churches, shops, gyms, factories, communal areas and car parks. Cleaned to a written specification, before you open or after you close.
- Tagline: *No drama. Just Llama.*
- Buttons: **Arrange a site visit** (primary → `/contact/`) · **See our services** (ghost → `/services/`)
- Line below: Or call **{phone}**
- Right column, the **example specification card**:
  - Highland header bar: "Cleaning specification" (Fraunces 600 19px, white) and mono label "EXAMPLE" (mist)
  - Definition rows (mono label left, Manrope value right, hairlines):
    - SITE: Community hall and offices, Hackney E8
    - VISITS: Mon, Wed, Fri at 6:00pm
    - AREAS: ● Hall & offices (blue) · ● Kitchen (green) · ● Toilets (red)
    - FLOORS: Machine scrub monthly, strip and reseal twice a year
  - Sage footer: Every site gets a written specification like this before we start.

**Who we clean for** (`--card` band)
- Eyebrow: WHO WE CLEAN FOR
- H2: Every kind of commercial building.
- Lede: We clean during or outside your opening hours, whatever suits the building and the people in it.
- 8 cards, 4 / 2 / 1 columns (≥960 / ≥460 / below), icon + H3 + one line:

| Icon | Title | Line |
| --- | --- | --- |
| Office | Offices & business units | Daily or weekly cleans for desks, kitchens, meeting rooms and washrooms. |
| School | Schools & education centres | Term-time cleaning and deep cleans in the holidays, by DBS-checked staff. |
| Church | Churches & places of worship | Weekly cleans around services, plus halls cleaned after events. |
| Shop | Shops & retail | Shop floors, glass, tills and stockrooms, cleaned before opening or after close. |
| Gym | Gyms & sports facilities | Changing rooms, showers, studios, mats and sports hall floors. |
| Factory | Factories & warehouses | Welfare areas, canteens, offices and floor scrubbing, worked around your shifts. |
| Communal areas | Communal areas | Entrances, stairwells, lifts, corridors and bin stores in residential and mixed-use blocks. |
| Car park | Car parks | Litter picking, sweeping, pressure washing, stairwells and lift lobbies. |

**What we do** (`--sage` band)
- Eyebrow: WHAT WE DO
- H2: One team for regular cleaning, floors and specialist work.
- Three columns, H3 with a 2px highland underline, saffron-square bullets, each item links to its service page:
  - **Everyday cleaning:** Regular office and contract cleaning · Communal area cleaning · School and education centre cleaning · Shop, business unit and factory cleaning · Sports facility cleaning
  - **Floors & carpets:** Carpet and upholstery cleaning · Rug cleaning · Floor scrubbing · Floor stripping and sealing · Floor polishing
  - **Deep & outdoor:** Deep cleaning · Car park cleaning · Washroom and kitchen deep cleans · Holiday and shutdown cleans · One-off cleans after works or events (the last three link to deep cleaning)
- Ghost button: **What each service includes** → `/services/`

**How it works** (`--card` band; three numbered steps, mono "STEP 1" labels, 2px `--ink` top border; 3 / 1 columns)
1. **Site visit.** We walk the building with you and note every area, floor type and access detail.
2. **Written quote.** You receive a written specification and a fixed price per visit or per month.
3. **Cleaning starts.** We clean on the days and at the times set out in your specification.

**How we work** (`--page`; two columns, stacked under 860px)
- Eyebrow: HOW WE WORK
- H2: Staff, insurance and products.
- Fact rows (bold label 150px column, slate text, hairlines):
  - **Vetted staff:** Right-to-work and reference checks for everyone, and DBS checks to the level your site needs.
  - **Insured:** Public liability and employers' liability insurance. Certificates available on request.
  - **Trained:** Safe chemical handling (COSHH), colour-coded cleaning and safe use of floor machines.
  - **Products:** Professional equipment, with lower-impact products used wherever they do the job properly.
  - **Hours:** Early mornings, evenings and weekends, so cleaning fits around your building.
- Side panel (card) **Colour-coded cleaning**: "Cloths, mops and buckets are colour-coded by area so nothing moves from a toilet to a kitchen. We follow the standard UK colour code." Then four rows (44 × 30px swatch + bold colour + area): Red · Toilets, urinals and washroom floors / Blue · General areas: offices, halls, corridors / Green · Kitchens, food and bar areas / Yellow · Clinical areas and washroom sinks.

**CTA band** (`--highland`)
- H2 (white): Tell us about your building.
- Text (mist): Site visits and written quotes are free, with no obligation.
- White pill: **Arrange a site visit** → `/contact/`

### 9.2 About `/about/`

- Eyebrow: ABOUT US
- H1: A London cleaning company built around the building.
- Body:
  1. Llama Commercial cleans offices, schools, churches, shops, gyms, factories, communal areas and car parks across London. We're based in Hackney and work across Greater London.
  2. Every contract starts with a site visit and a written specification, so you and our team know exactly what gets cleaned, how often and to what standard.
  3. Everyone who joins us goes through right-to-work and reference checks, and DBS checks where a site needs them. They're trained in safe chemical handling, colour-coded cleaning and the machines they use.
  4. We use professional equipment and choose lower-impact products wherever they do the job properly. We work in and outside business hours, including early mornings, evenings and weekends.
  5. We hold public liability and employers' liability insurance, and we're happy to send certificates before we start.
- Side card **We cover** (two columns): Offices · Business units · Schools & colleges · Education centres · Churches & halls · Shops · Gyms & leisure · Hotels & venues · Factories · Warehouses · Communal areas · Car parks
- Highland card **The name**: Llamas are calm, steady and hard-working. That's how we want a clean to feel for the people who run the building. Then the tagline in saffron italic.
- CTA band as on the home page.

### 9.3 Services `/services/`

- Eyebrow: SERVICES
- H1: Commercial cleaning services.
- Lede: Daily office cleans, carpets, hard floors, deep cleans and car parks. Every job is priced from a site visit.
- Three groups with an eyebrow-style title and `id`s `everyday`, `floors`, `deep`. Each group is a grid of service cards (2 / 1 columns): H3, "Good for" line (slate), frequency (mono, `--saffron-ink`), link **What's included** → service page.
- CTA row: **Arrange a site visit** · Or call **{phone}**

### 9.4 Service pages `/services/{slug}/`

One template, data from `src/data/services.ts`.

Layout: breadcrumbs (Home › Services › {H1}) · eyebrow (the group name) · H1 · intro (lede) · two columns: **What's included** (bulleted) and a side card with **Good for** and **How often** (mono) · "How it works" (the shared three steps) · CTA band · **Related services** (three cards).

| Slug | Group | H1 | Intro | What's included | Good for | How often | Related | Meta description |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `regular-office-cleaning` | Everyday cleaning | Regular office and contract cleaning | A regular clean to a written specification, on the days and times that suit your building. | Desks, surfaces and touchpoints wiped and sanitised · Kitchens and breakout areas cleaned · Washrooms cleaned and consumables refilled · Bins emptied and recycling separated · Carpets vacuumed and hard floors mopped | Offices, business units, studios and clinics | Daily · several times a week · weekly | deep-cleaning, carpet-and-upholstery-cleaning, floor-scrubbing | Regular office and contract cleaning across London: desks, kitchens, washrooms, bins and floors, to a written specification. |
| `communal-area-cleaning` | Everyday cleaning | Communal area cleaning | Shared spaces kept clean for residents, tenants and visitors. | Entrances, door glass and letterbox areas · Stairwells, handrails, corridors and lifts · Bin stores cleaned and kept clear | Residential blocks, mixed-use buildings and shared office entrances | Weekly · fortnightly | car-park-cleaning, floor-scrubbing, deep-cleaning | Communal area cleaning in London: entrances, stairwells, lifts, corridors and bin stores for residential and mixed-use blocks. |
| `school-cleaning` | Everyday cleaning | School and education centre cleaning | Term-time cleaning, with deep cleans in the holidays. | Classrooms, halls, corridors and offices · Toilets and changing rooms cleaned to the colour code · Deep cleans in the summer, Easter and Christmas holidays · DBS checks to the level the school requires | Primary and secondary schools, nurseries, colleges, tuition and training centres | Term-time daily · holiday deep cleans | deep-cleaning, floor-stripping-and-sealing, sports-facility-cleaning | School and education centre cleaning in London: classrooms, halls, toilets and holiday deep cleans by DBS-checked staff. |
| `church-cleaning` | Everyday cleaning | Church and place of worship cleaning | Careful, regular cleaning timed around your services and events. | Worship spaces, halls, kitchens and toilets · Care around old timber, stone and fittings · Halls cleaned after hires and events · Cleaning timed around services | Churches, mosques, temples, gurdwaras, synagogues and their halls | Weekly · before and after events | rug-cleaning, floor-polishing, carpet-and-upholstery-cleaning | Cleaning for churches and places of worship in London: worship spaces, halls, kitchens and toilets, timed around services. |
| `retail-and-factory-cleaning` | Everyday cleaning | Shop, business unit and factory cleaning | Cleaning that works around your trading hours and shifts. | Shop floors, glass, fitting rooms and tills · Welfare areas, canteens and offices · High-level dusting and floor scrubbing · Site inductions and permits followed | High-street shops, trade counters, workshops, factories and warehouses | Daily · weekly · around shifts | floor-scrubbing, deep-cleaning, car-park-cleaning | Shop, business unit and factory cleaning in London, worked around your trading hours and shifts. |
| `sports-facility-cleaning` | Everyday cleaning | Sports facility cleaning | Changing rooms and training spaces cleaned between sessions. | Changing rooms, showers and toilets · Equipment, mats and benches disinfected · Studio and sports hall floors · Reception and spectator areas | Gyms, leisure centres, studios, clubs and sports halls | Daily · between sessions | floor-scrubbing, deep-cleaning, floor-polishing | Gym and sports facility cleaning in London: changing rooms, showers, equipment, mats and sports hall floors. |
| `carpet-and-upholstery-cleaning` | Floors & carpets | Carpet and upholstery cleaning | Deep cleaning for carpets, chairs and fabric screens. | Hot-water extraction for a deep clean · Low-moisture cleaning when the room is needed back quickly · Spot and stain treatment · Office chairs, sofas and fabric screens | Office carpets, pubs, halls, chairs, sofas and fabric partitions | Every 6 to 12 months · after spills | rug-cleaning, regular-office-cleaning, deep-cleaning | Commercial carpet and upholstery cleaning in London: hot-water extraction, low-moisture cleaning and stain treatment. |
| `rug-cleaning` | Floors & carpets | Rug cleaning | Gentle on-site cleaning for rugs and runners. | Colour and fibre tested before cleaning · Gentle on-site cleaning and drying · Fringes and edges finished by hand | Reception rugs, church rugs and runners | One-off · seasonal | carpet-and-upholstery-cleaning, church-cleaning, deep-cleaning | On-site rug cleaning in London for reception rugs, church rugs and runners, with colour and fibre tested first. |
| `floor-scrubbing` | Floors & carpets | Floor scrubbing | Machine scrubbing to lift ground-in dirt from hard floors. | Rotary or scrubber-dryer machine clean · Edges and corners done by hand · Wet floor signs in place while the floor dries | Vinyl, safety flooring, linoleum, sealed stone and terrazzo | Monthly · quarterly | floor-stripping-and-sealing, floor-polishing, regular-office-cleaning | Machine floor scrubbing in London for vinyl, safety flooring, linoleum, stone and terrazzo. |
| `floor-stripping-and-sealing` | Floors & carpets | Floor stripping and sealing | Old, scuffed polish removed and fresh protection laid down. | Old polish stripped down to the floor · Floor rinsed and neutralised · Fresh coats of seal or polish applied · Work done out of hours so the floor can cure | Vinyl, linoleum, safety flooring and sealed wood in schools, halls and corridors | Once or twice a year | floor-scrubbing, floor-polishing, school-cleaning | Floor stripping and sealing in London: old polish removed and fresh coats of seal applied, out of hours. |
| `floor-polishing` | Floors & carpets | Floor polishing | Buffing to bring back the shine between full treatments. | High-speed buffing of sealed floors · Scuff and heel-mark removal · A brighter finish between strip-and-seal visits | Corridors, receptions, halls and shop floors | Monthly · as needed | floor-stripping-and-sealing, floor-scrubbing, church-cleaning | Floor polishing and buffing in London for corridors, receptions, halls and shop floors. |
| `deep-cleaning` | Deep & outdoor | Deep cleaning | A top-to-bottom clean for any building that needs more than the regular clean. | High and low dusting, behind and under furniture · Kitchens degreased and appliances cleaned inside · Washrooms descaled · Skirting, doors, frames and switches | Any commercial building, before or after works, events or a move | Quarterly · one-off · after works | regular-office-cleaning, carpet-and-upholstery-cleaning, floor-scrubbing | Commercial deep cleaning in London: high and low dusting, kitchens, washrooms, skirting and doors. |
| `car-park-cleaning` | Deep & outdoor | Car park cleaning | Cleaner car parks for staff, residents and visitors. | Litter picking and sweeping · Pressure washing of decks, ramps and stairwells · Oil and tyre-mark treatment · Lift lobbies, pay stations and signage | Multi-storey, underground and surface car parks | Weekly litter picks · periodic washing | communal-area-cleaning, retail-and-factory-cleaning, deep-cleaning | Car park cleaning in London: litter picking, sweeping, pressure washing, oil stains, stairwells and lift lobbies. |

### 9.5 Contact `/contact/`

Keep it as simple as possible: **call, email, or leave two details.** Nothing else on the page.

- Eyebrow: CONTACT US
- H1: Talk to us about your building.
- Lede: Call or email us. Or leave your name and number and we'll call you back.
- **Two large cards** side by side (stacked under 640px). Each whole card is a link with a hover border in `--highland`:
  - Phone icon · label "Call us" (Manrope 700, slate) · `{phone}` (Fraunces 600, clamp(22px, 3vw, 28px)) · `{hours}` (slate, 14.5px) → `tel:`
  - Email icon · label "Email us" · `{email}` (Manrope 700, clamp(17px, 2vw, 20px), wraps cleanly on small screens) · "Tell us about the building and what you need." → `mailto:`
- **Call-back card** titled "Or we'll call you" (H2 24px) with exactly **two fields** side by side (stacked under 560px):
  1. **Your name** (`id="name"`, `autocomplete="name"`)
  2. **Phone number or email** (`id="contact"`, `autocomplete="tel"`)
  - Primary button: **Request a call back**
  - Fine print (13.5px slate): We only use your details to get back to you. [Privacy notice](/privacy/)
- Tagline below the cards in Fraunces italic.
- No map, no address block, no dropdowns, no message box, no checkboxes.

### 9.6 Areas covered `/areas/`

- Eyebrow: AREAS COVERED
- H1: Greater London postcodes we cover.
- Lede: We're based in Hackney. East London, the City and North London are closest to us, and we cover the rest of Greater London too.
- **Closest to us** (highlighted chips): E · East London / EC · City of London / N · North London / IG · Ilford
- **Also covered**: WC · West Central / NW · North West / W · West London / SE · South East / SW · South West / RM · Romford / EN · Enfield / BR · Bromley / CR · Croydon / SM · Sutton
- **Boroughs closest to us** (plain inline list): Hackney, Tower Hamlets, Newham, Islington, Haringey, Waltham Forest, Redbridge, Camden, City of London.
- Text: Not sure if we cover you? Send us the postcode and we'll let you know.
- Button: **Contact us** → `/contact/`

### 9.7 Price estimate `/quote/` (see section 11)

- Eyebrow: PRICE ESTIMATE
- H1: Estimate your cleaning cost.
- Lede: For offices, schools, churches, shops, gyms, factories and communal areas across London. Enter the building and see a guide price.

### 9.8 Privacy `/privacy/` and 404: see section 12.

---

## 10. Contact page behaviour

- Validate on submit only:
  - name must not be empty → "Please add your name."
  - contact must look like an email (`/@.+\./`) or contain at least 10 digits → "Please add a phone number or an email address so we can reach you."
  - Show one error line under the fields (`aria-live="polite"`), move focus to the field.
- Hidden honeypot input `company_website` (visually hidden, `tabindex="-1"`, `autocomplete="off"`). If filled, silently do nothing.
- **If `PUBLIC_FORM_ENDPOINT` is set:** disable the button and show "Sending…", `POST` JSON `{ name, contact, source: 'Call back request', page: location.pathname }` with `Accept: application/json`. Only on a 2xx response replace the form with "Thanks, {first name}. We'll be in touch." On any failure, re-enable the button and show "Sorry, that didn't go through. Please call us on {phone}."
- **If it isn't set:** open `mailto:{email}?subject=Call back request&body=Please call me back.%0A%0AName: …%0APhone or email: …`, then replace the form with the fallback text from 4.5. Never say the request was sent.
- No cookies, no tracking, no third-party scripts.

---

## 11. Price estimate tool

Put the maths in `src/lib/pricing.ts` and test it. Keep these numbers exactly:

```ts
export const RATE = 22;          // £ per cleaner hour
export const SQFT_PER_HR = 2000; // sq ft cleaned per hour
export const WEEKS = 4.33;       // weeks per month

export function regular(sqft: number, washrooms: number, kitchens: number, visits: number) {
  const hours = Math.max(1, sqft / SQFT_PER_HR + washrooms * 0.15 + kitchens * 0.2);
  const perVisit = hours * RATE;
  const monthly = perVisit * visits * WEEKS;
  return { hours, perVisit, monthly, perSqft: sqft > 0 ? monthly / sqft : 0 };
}

export function deep(sqft: number, washrooms: number, kitchens: number) {
  return Math.max(149, sqft * 0.12 + washrooms * 15 + kitchens * 25);
}
```

**Inputs:** Type of building (select, informational only: Office or business unit / School or education centre / Church or place of worship / Shop / Gym or sports facility / Factory or warehouse (welfare and office areas) / Communal areas) · Floor area to clean (sq ft) as a number field plus a 200–10,000 slider, default 1,500, hint "Not sure? A 10-desk office is roughly 1,000 to 1,500 sq ft." · Type of clean (segmented: Regular contract / One-off deep clean) · Visits per week (segmented: 1, 2, 3, 5, 7; default 5; hidden for deep clean) · Toilets and washrooms (default 2) · Kitchens and break areas (default 1).
Clamp: floor area 0–50,000, washrooms 0–50, kitchens 0–20; empty, negative or non-numeric input counts as 0.

**Result panel** (`--highland`, white text, `aria-live="polite"`):
- Regular: label "ESTIMATED MONTHLY PRICE", price in Fraunces (rounded to £) with "/month", rows: Time per visit (1 decimal) · Price per visit · Visits ({n} a week) · Works out at (£{x.xx} per sq ft a month)
- Deep: label "ONE-OFF DEEP CLEAN", price, rows: Floor area · Washrooms · Kitchens
- Note: A guide price. We confirm the final price in writing after a site visit.

**Below:**
- Card "Floors, carpets and car parks": Carpet and upholstery cleaning, floor scrubbing, stripping, sealing and polishing, and car park cleaning depend on the floor and its condition, so we price them after a site visit.
- Call card: "Talk to us about your building" · "Site visits and written quotes are free." · {phone} with **Copy number** (clipboard, with select-text fallback) and **Call** buttons · chips: Insured · Vetted staff · Written specification · tagline.

No guarantees, no price-beat line, no residential options.

**Vitest cases** (must pass):

| Input | Expected |
| --- | --- |
| regular(1500, 2, 1, 5) | hours 1.25, perVisit 27.50, monthly ≈ 595.38 (shows £595) |
| regular(200, 0, 0, 1) | hours 1 (minimum), perVisit 22, monthly ≈ 95.26 (shows £95) |
| deep(500, 1, 0) | 149 (minimum applies) |
| deep(3000, 3, 2) | 455 |

---

## 12. Privacy notice and 404

**`/privacy/`** (plain English, H2 per section):
- **Who we are:** Llama Commercial Ltd, {registeredOffice}. Contact: {email}.
- **What we collect:** the name and phone number or email you give in the call-back form, and anything you send us by email or phone.
- **Why:** to reply to you and arrange a site visit or quote. Lawful basis: legitimate interests, or taking steps at your request before a contract.
- **Who sees it:** our team, and our form provider if we use one to receive call-back requests. We don't sell or share your details for marketing.
- **How long:** we delete enquiries after 12 months if no contract follows. Client records are kept as long as the law requires.
- **Your rights:** you can ask to see, correct or delete your details, or object to how we use them, by emailing {email}. You can complain to the Information Commissioner's Office at ico.org.uk.
- **Cookies:** this website does not use cookies or tracking.

**404:** H1 "We couldn't find that page." · "It may have moved." · buttons **Go to the home page** and **Contact us**.

---

## 13. SEO and structured data

- Semantic HTML, one H1, logical heading order, descriptive link text (never "click here").
- JSON-LD in `Base.astro`: `LocalBusiness` with `name`, `url`, `telephone`, `email`, `logo`, `image` (og.png), `openingHours` "Mo-Sa 08:00-19:00", `areaServed` (Greater London plus each postcode area), `slogan` (tagline), and `makesOffer` listing each service as an `Offer` of a `Service`. Add `address` only when the registered office in config is real (skip it while it's a placeholder).
- `BreadcrumbList` JSON-LD on service pages.
- `robots.txt` allows all and points at `/sitemap-index.xml`.
- No `aggregateRating`, reviews or FAQ schema stuffed with marketing.

---

## 14. Accessibility

- WCAG 2.2 AA throughout; the contrast pairs in 3.3.
- Skip link to `#main`. Visible focus on everything (3px saffron outline, 3px offset).
- Touch targets ≥ 44 × 44px.
- Real `<label for>` on every field; errors announced via `aria-live`.
- Menu button with `aria-expanded`/`aria-controls`; Esc closes the menu; focus returns to the button.
- Respect `prefers-reduced-motion` (no smooth scroll, no transitions).
- Decorative icons `aria-hidden`; colour swatches always paired with the colour's name.
- `lang="en-GB"` on `<html>`.

---

## 15. Performance

- No client-side framework. JS under 10 KB per page.
- Self-hosted, subset fonts; preload the two main weights.
- SVG for every logo and icon. No images over 100 KB.
- Mobile Lighthouse: Performance, Accessibility, Best Practices and SEO all ≥ 95. Report the scores in the PR.

---

## 16. Deployment

- `netlify.toml`: `base = "site"`, `command = "npm run build"`, `publish = "dist"`. Headers: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `X-Frame-Options: DENY`. Long cache (`max-age=31536000, immutable`) for `/_astro/*` and fonts.
- `vercel.json`: configure for Astro in `site/`, or document setting Root Directory to `site` in the Vercel dashboard.
- `.github/workflows/pages.yml`: build `site/`, upload `site/dist`, manual trigger only.
- New `.github/workflows/ci.yml` on pull requests: install, `astro check`, Vitest, build, a link check over `dist/`, and a step that **fails if any file from `internal/` or the string "Negotiation Desk" appears in `dist/`**.
- README: a "Going live" section listing every TODO in `src/config.ts` and how to set `PUBLIC_FORM_ENDPOINT` (Netlify: Site configuration → Environment variables).

---

## 17. Testing and acceptance

The work is done when all of these pass:

1. `npm run build` with no warnings; `astro check` clean.
2. Vitest pricing cases in section 11.
3. Playwright at 1280 × 900 and 390 × 844, for every page:
   - no console errors, no horizontal scroll;
   - the mobile menu opens, closes with Esc, and links work;
   - contact form shows both validation errors and the fallback message;
   - the estimate shows **£595 /month** for the defaults and **£149** for a 500 sq ft deep clean with 1 washroom and 0 kitchens.
4. Dark mode legible on every page.
5. Copy scan of the built HTML: none of these appear in visible text: `guarantee`, `promise`, `same team`, `same cleaner`, `check-in`, `photo`, `within one working day`, `% off`, `free clean`, `best`, `!`, `Airbnb`, `tenancy`, `Proven`, `Duck`, `Owl`.
6. `dist/` contains nothing from `internal/`.
7. Every phone number and email on the site comes from `src/config.ts` (search the source for `07000` outside config: zero results).

---

## 18. Do not

- Add any promise or guarantee from section 2.1.
- Add testimonials, reviews, ratings, badges, client logos, counters or statistics.
- Add pop-ups, chat widgets, cookie banners, newsletter sign-ups, autoplay media, carousels or parallax.
- Use stock photos, AI images or emoji.
- Add residential services (end of tenancy, Airbnb, domestic cleaning).
- Use Tailwind, a UI kit or a client-side framework.
- Hard-code contact details outside `src/config.ts`.
- Link to, copy or deploy anything in `internal/`.

---

## 19. Deliverable

1. Create a branch `website-v1`. Commit in logical steps (scaffold, tokens and layout, pages, contact, estimate, SEO, deploy config, tests).
2. Open a pull request titled **Llama Commercial website v1** containing:
   - screenshots of Home, one service page, Contact and Price estimate at desktop and mobile widths, light and dark;
   - Lighthouse scores;
   - every TODO left in `src/config.ts`;
   - any decision you made that this brief didn't cover.
