# Service Page content regions — design

**Date:** 2026-08-08  
**Status:** Implemented (merged to `main`)  
**Surfaces:** Service hop below Outbound CTA (`/services/bd-*`)  
**SSOT after ship:** [`docs/guides/service-page.md`](../../guides/service-page.md) (update on implement); ADRs 0008/0009 stay BN→EN content order

## Problem

QA and editorial review: the hop’s mid-page content (BN body, EN body, Who is this for, FAQ) reads as one undifferentiated wall. Users feel “lost” or bored; the area feels raw compared to the structured header/CTA and the Related card grid.

## Goals

- Clear **section separation** and a light **guided path** (About → Who → FAQ → Related).
- Keep **all bilingual content visible** in the HTML (no language toggle; SEO hop intact).
- Make **About** feel like the main article; Who / FAQ feel like **supporting** types.
- Stay **hop-thin** — no doorway essay UI, no dashboard of equal cards (Trap #9).

## Non-goals (v1)

- Accordion FAQ *per question* (whole Who / FAQ sections may use one open-by-default `<details>` each)
- Language toggle, side-by-side BN|EN columns
- In-page jump TOC or numbered wizard steps
- Rewriting service Markdown length/copy
- Changing Related card layout
- Temporary Astro “preview design” routes (companion mockups used for decision)

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Overall | Separated regions + clearer path; content stays visible |
| Language | Labeled panes: **বাংলা** then **English**, hairline between; both in DOM |
| Navigation chrome | No jump links / step numbers — H2s + visual weight only |
| About | New H2; **primary** white/surface panel; **`<details open>`** + chevron (same pattern as Who/FAQ) |
| Who / FAQ | **Quiet support** strips (`surface-muted`, tighter) — not equal to About; **`<details open>`** + chevron (collapse optional; open by default) |
| Verified date | On Outbound CTA domain row (with domain + Copy), not inside About |
| Related | Unchanged heading + card grid (no outer panel) |
| Visual standard | “Quiet bilingual wells” + primary-vs-support hierarchy |

### Rejected alternatives

- Twin nested language wells (taller, busier)
- Accent rail + section icons (competes with CTA / Category accents)
- Soft equal panels for About/Who/FAQ (fails “About is main”)
- About boxed only / Who+FAQ fully unboxed (supports risk feeling raw again)
- Same panel chrome with only type-scale difference (weaker type signal)

## Information architecture (below CTA)

1. **About (primary)** — `body_bn` → `body`  
2. **Who is this for (support)** — `audience_bn` → `audience`  
3. **FAQ (support)** — existing `faq[]`; Q EN+BN one line; answers labeled BN→EN  
4. **Related** — existing related cards  

Above CTA unchanged except verified date sits on the Outbound CTA domain row (domain + Copy + verified).

## Visual design

### About (primary)

- H2: EN **About this service** + BN **এই সেবা সম্পর্কে** (add to `servicePageCopy.ts`).
- Panel: `--surface` on page `--bg`, light `--border`, soft radius, light shadow (article, not Directory-card heavy).
- Inside: `.lang-label` **বাংলা** → prose Markdown → hairline → **English** → prose Markdown. Label size is the same on About, Who, and FAQ (support/FAQ `p` rules must not enlarge `.lang-label` — Trap #15).
- Chevron disclose open by default (parity with Who/FAQ).

### Who / FAQ (support)

- Separate strips: `--surface-muted`, subtler border than About (same token family, lower weight), less padding, slightly smaller prose.
- Same language-label + hairline pattern for audience and FAQ **answers**.
- FAQ: one support strip around the whole FAQ block; light dividers between items; always open.

### Related

- No support/primary panel wrapper.

### Theme

- Dark: primary uses `--surface`; supports use `--surface-muted`; labels use `--ink-subtle`; preserve `lang="bn"`.

## Implementation sketch

| Area | Change |
|------|--------|
| `src/lib/servicePageCopy.ts` | Add `about: { en, bn }` |
| `src/pages/services/[slug].astro` | Wrap body in About primary region; audience in support strip |
| `src/components/service/OutboundCta.astro` | Domain row: domain + Copy + verified date |
| `src/components/service/ServiceFaq.astro` | Support strip + labeled answer panes |
| `src/styles/global.css` | Primary panel, support strip, lang-label, bilingual hairline; dark tokens |
| `docs/guides/service-page.md` | Section order, About H2, primary vs support, labeled panes |
| ADR-0008 / 0009 | No fork unless labeled panes are treated as irreversible bilingual law — prefer guide update; note in ADR only if needed |

Shared CSS pattern (e.g. `.bilingual-pane` / `.lang-label`) — no new React island.

## A11y

- Language cues are **text labels**, not color alone.
- Real `h2` / `h3`; `lang="bn"` on BN blocks.
- Contrast: labels on muted surfaces must meet existing subtle-ink guidance.

## Testing / acceptance

- Spot-check a long hop (e.g. e-Passport) and a short hop in light + dark.
- About reads as main article; Who/FAQ clearly secondary; Related unchanged.
- Both languages remain in page source without interaction.
- `npm run ci`.

## Doc updates on ship

1. `docs/guides/service-page.md` (first)  
2. Slim `CONTEXT.md` § Service Page if glossary needs “content regions”  
3. `docs/agent/INDEX.md` only if new keywords  
4. Optional ADR amendment if bilingual *presentation* rules harden beyond 0009  

## Open for plan (not blocking design)

- Exact class names and whether a tiny Astro partial is worth it vs inline markup.
- Shadow strength / padding tokens — tune in CSS against live hop, not this spec.
