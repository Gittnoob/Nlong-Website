# AI Guidelines: Venoa B2B Portal

## Brand Direction
- Brand name: `Venoa`
- Positioning: premium Asian frozen foods supplier for US wholesale and distribution partners
- Tone: confident, modern, operationally credible
- Design principle: `B2C aesthetics for B2B conversion`

## Core Brand Tokens
- `--color-ink: #24110f`
- `--color-deep: #cc1100`
- `--color-forest: #cc1100`
- `--color-mint: #f2efeb`
- `--color-cream: #f2efeb`
- `--color-gold: #f5b33b`
- `--color-coral: #cc1100`
- `--color-slate: #6d625f`

## Typography
- Headings, header, and titles: `"Signika", "Avenir Next", "Segoe UI", sans-serif`
- Body: `"Poppins", "Helvetica Neue", "Arial", sans-serif`
- Use uppercase sparingly for labels, metrics, and navigation accents.

## Component Naming
- Layout primitives: `.shell`, `.section`, `.section-head`, `.eyebrow`
- Buttons: `.btn`, `.btn-primary`, `.btn-secondary`
- Cards: `.brand-card`, `.product-card`, `.service-card`, `.contact-card`
- Shared blocks: `.metric-band`, `.trust-ticker`, `.quote-banner`, `.timeline`

## HTML Rules
- Keep shared mounting points consistent:
  - `<div data-site-nav></div>`
  - `<div data-lead-modal></div>`
  - `<div data-site-footer></div>`
- Every modal trigger must use `data-open-modal`.
- Product filters must use `data-filter`.

## JavaScript Rules
- Shared UI behavior belongs in `/js/components.js`.
- Product filtering belongs in `/js/filters.js`.
- Use lightweight DOM APIs only. No frameworks.
- Keep constants near the top of each file and avoid hidden globals.

## Directory Structure
```text
/assets
  /images
  /icons
  /logos
/css
  global.css
/js
  components.js
  filters.js
index.html
products.html
services.html
about.html
contact.html
AI-GUIDELINES.md
```

## Content Guidance
- Lead with scale, safety, and speed-to-market.
- Balance emotional visuals with hard proof points.
- Keep B2B CTAs explicit: `Request Sample`, `Get Custom Quote`, `Talk to Sales`.
