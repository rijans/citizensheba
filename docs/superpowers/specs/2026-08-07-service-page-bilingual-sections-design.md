# Service Page bilingual sections (audience, FAQ, related)

**Date:** 2026-08-07  
**Status:** Approved and implemented  
**Current SSOT for page structure:** [`docs/guides/service-page.md`](../../guides/service-page.md) (prefer over this snapshot when they disagree)
**Product:** CitizenSheba Service Pages

## Problem

Service Page sections **Who is this for**, **FAQ**, and **Related services** are English-only for headings and values, while the page H1 and body already mix EN/BN. Citizens who read Bangla first need parity without a separate locale tree.

## Decisions (locked)

| Topic | Choice |
| --- | --- |
| Heading layout | Like H1: English + Bengali on one line |
| Value layout | Stacked: Bengali first, then English (same idea as `body_bn` → `body`) |
| Data model | Parallel fields (mirrors `title_bn` / `description_bn` / `body_bn`) |
| Section heading BN | Shared UI constants (not duplicated in each service file) |
| Related services | Bilingual section heading only; cards already show `title` + `title_bn` |

## Schema

Required on every Service:

- `audience_bn: string`
- Each FAQ item: existing `q` / `a`, plus required `q_bn` / `a_bn`

Zod updates in `src/content.config.ts`. Integrity tests enforce non-empty BN twins for audience and every FAQ item.

## UI constants (headings)

| EN | BN |
| --- | --- |
| Who is this for | এই সেবা কাদের জন্য |
| FAQ | প্রশ্নোত্তর |
| Related services | সংশ্লিষ্ট সেবা |

Render pattern: `{en} <span lang="bn">{bn}</span>`.

## Rendering

1. **Audience:** BN paragraph (`lang="bn"`) then EN paragraph.
2. **FAQ:** `h3` = `q` + `q_bn` (one line); answers = `a_bn` then `a`.
3. **Related services:** bilingual `h2`; card grid unchanged.
4. **Verified / Report / CTA / short description under H1:** out of scope for this change.

Light CSS utility (e.g. `.bilingual-stack`) for spacing between stacked BN/EN value blocks — no new cards.

## Content rules

- BN mirrors meaning of EN; not necessarily literal translation.
- Non-Official / “no account on CitizenSheba” stance stays in FAQ (EN + BN).
- Display Name casing follows ADR-0005 in English FAQ/audience copy.
- Common FAQ patterns may share consistent BN phrasing across services when EN wording matches.

## Docs & ADR

- This spec file.
- ADR-0009: parallel `audience_bn` + FAQ `q_bn`/`a_bn`; heading constants; BN-first value stacks.
- Update `CONTEXT.md` (Service Page v1), `AGENTS.md`, `docs/agent/INDEX.md`; Trap #9 if needed for bilingual section expectations.

## Tests & CI

- Content integrity: `audience_bn` present; each FAQ has `q_bn` and `a_bn`.
- No Instant Directory search index change (audience/FAQ not indexed today).
- `npm run ci` must pass after all 20 services are updated.

## Out of scope

- Bilingual short `description` under the H1 (still EN-only on page unless a later change).
- Nested `{ en, bn }` objects for audience/FAQ.
- Per-service overrides of section heading strings.
- Bilingual card `description` on related Services.

## Implementation order

1. Schema + integrity tests  
2. UI (`[slug].astro`, `ServiceFaq.astro`, CSS, shared heading constants)  
3. BN copy for all 20 services  
4. Docs / ADR-0009  
5. `npm run ci`
