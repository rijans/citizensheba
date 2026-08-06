# CitizenSheba brand logo (header + favicon + PWA)

**Date:** 2026-08-07  
**Status:** Approved and implemented  
**Source asset:** user-provided circular emblem (Bangladesh map on red field, “CITIZEN SHEBA” / “.COM” ring)

## Problem

The site still uses a generic green-dot header mark and placeholder favicon/PWA icons. The product now has an official circular emblem that should be the visible brand across chrome and install surfaces.

## Decisions (locked)

| Topic | Choice |
| --- | --- |
| Scope | Full brand kit: header + favicon + PWA 192/512 |
| Header layout | Emblem **plus** existing English `.com` wordmark + Bangla (`সিটিজেনসেবা`) |
| Image prep | Crop black square → **transparent circular** master |
| Architecture ADR | Not required — asset/UI swap; document in frontend guide + INDEX |

## Assets

| Path | Role |
| --- | --- |
| `public/brand/citizensheba-logo.png` | Transparent circular master for header |
| `public/favicon.ico` (+ PNG favicon if useful) | Browser tab |
| `public/icons/icon-192.png` | PWA |
| `public/icons/icon-512.png` | PWA (`any` + `maskable` — center emblem with safe padding) |

Source upload lives in the Cursor assets folder; copy/process into `public/`. Retire primary use of old green `favicon.svg` (remove or stop linking from `BaseLayout`).

## Header UI

`Header.astro`: replace `.site-brand__mark` / green-dot with:

```html
<img class="site-brand__logo" src="/brand/citizensheba-logo.png" alt="" width="40" height="40" decoding="async" />
```

Keep `site-brand__text` (CitizenSheba + `.com` + BN). `aria-label` remains `CitizenSheba.com home`. CSS: ~2.25–2.5rem circular logo, `object-fit: contain`, no old gradient mark styles.

## Favicon / PWA / layout

- Update `BaseLayout.astro` favicon `<link>`s to the new ICO/PNG.
- Overwrite icon PNGs referenced by `public/manifest.webmanifest` (paths unchanged).

## Docs

- Note brand paths + header pattern in `docs/guides/frontend.md`.
- INDEX keyword row for logo / brand / favicon → frontend guide + `public/brand/`.
- No new ADR; no OG image in this change.

## Out of scope

- Open Graph / Twitter preview images
- Replacing Instant Directory Category Icons
- Changing `SITE_NAME` / SERP title brand string

## Implementation order

1. Process image → transparent master + favicon + 192/512  
2. Header + CSS  
3. BaseLayout favicon links  
4. Docs / INDEX  
5. Visual check light + dark header; `npm run ci`
