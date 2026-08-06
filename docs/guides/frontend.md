# Frontend guide (CitizenSheba)

> Civic Directory UI — Mobile-First, hop-first. Visual decisions: ADR-0004. Tokens: `src/styles/global.css`.

## Principles

- **One job per surface:** Home = Instant Directory; Service Page = SEO hop + Outbound CTA; Category = filtered list.
- **Shared Service card** everywhere (`ServiceCard` / `ServiceCardLink`) — do not invent a second card UI.
- **Category Icon + soft accent** (Lucide + `categoryVisuals.ts`). No emoji-first cards (ADR-0004).
- **Mixed UI:** EN-first visible H1; SERP Document Title / Meta Description stay BN→EN (ADR-0003).
- **Plain language** in UI copy — no internal jargon (`SSOT`, `ADR`, `meta_*`) in citizen-facing strings.

## Layout & Mobile-First

- Design phone-first: sticky search/chips must not push the directory below the fold.
- Chips: horizontal scroll OK; do **not** use `translateY` hover lifts inside `overflow-x` scrollports (Trap #6).
- Touch targets: chips ~2.375rem height; search field ~3.25rem.
- Prefer CSS variables from `:root` / `[data-theme="dark"]` over one-off hex in components.

## Components

| Use | Path |
|-----|------|
| Instant Directory island | `InstantDirectory.tsx` (`client:load` on Home only) |
| Static cards | `ServiceCardLink.astro` (Category + related) — SSR Lucide, no extra island |
| Icons | `CategoryIcon.tsx` + `categoryIcons.ts` |
| Accents | `categoryVisuals.ts` (code map by category id) |

## Typography & tokens

- Display: Bricolage Grotesque; body/BN: Hind Siliguri (see `global.css`).
- Body base stays **16px** (industry default). Hero/header largely unchanged.
- **Directory / card scale (modest, post-NID compare):** card title `1.0625rem`, BN `0.875rem`, description `0.9375rem`, domain `0.8125rem`; Category Icon well `2.5rem` / glyph ~20px; chips `0.875rem` with ~`1.375rem` icon wells.
- Prefer existing classes in `global.css` over ad-hoc pixel sizes in JSX.
- Dark theme: keep contrast; accent soft tints must remain readable on `--surface`.

## Content → UI

- Cards show: icon, title, `title_bn`, description, **official domain**, status when not ACTIVE.
- Never reintroduce `meta_title` / `meta_description` content fields.
- New categories need `icon` (lucide key) + entry in `CATEGORY_ACCENTS` if a dedicated hue is desired.

## Related

- ADR-0003, ADR-0004, `docs/guides/performance.md`, `docs/specs/TRAPS.md` (#3–#7), `CONTEXT.md` § Instant Directory / Category Icon / Mobile-First
