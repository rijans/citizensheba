# Developer traps — CitizenSheba

> Scan titles every relevant task; open the body when the topic matches. Add new traps when a painful mistake recurs. Full ModPilot trap lists do **not** apply here.

## Index

| # | Title |
|---|--------|
| 1 | Cloudflare adapter on a static site |
| 2 | `_headers` block-comment syntax |
| 3 | Reintroducing `meta_title` / `meta_description` |
| 4 | Flipping visible H1 to match SERP BN→EN |
| 5 | Emoji-first Service cards |
| 6 | Chip hover clipped by `overflow-x` |
| 7 | Accent colors edited in category YAML |
| 8 | Catalog creep (banks / MFS as Official) |
| 9 | Doorway / thin spam Service Pages |
| 10 | Committing foreign session WIP |
| 11 | Broken category / related content refs |
| 12 | Mirroring broken official Display Name casing |
| 13 | Alternate names only in `tags` (skip `aliases`) |
| 14 | New Service without EN+BN Name Aliases |

---

## 1. Cloudflare adapter on a static site

### Pitfall

Running `astro add cloudflare` (or switching to SSR adapter mode) for a site that is **`output: "static"`** and served as Workers **assets** from `./dist`. Adds complexity and breaks the documented deploy path.

### Rule

Keep plain SSG + `wrangler.jsonc` assets → `dist`. See ADR-0001. Do not add `@astrojs/cloudflare` unless product explicitly moves off static.

---

## 2. `_headers` block-comment syntax

### Pitfall

Using `/* */` comments in Cloudflare `_headers`. Deploy/header parsing fails or headers are ignored.

### Rule

Use `#` comments only in `_headers`.

---

## 3. Reintroducing `meta_title` / `meta_description`

### Pitfall

Adding per-page meta override fields “for control.” Duplicates SERP copy, drifts from `title_bn` / `description_bn`, and fights ADR-0003.

### Rule

Compose via `documentTitle()` / `metaDescription()` from content + site BN/EN constants. No `meta_*` fields.

---

## 4. Flipping visible H1 to match SERP BN→EN

### Pitfall

Changing on-page H1 to Bengali-first because Document Title is BN→EN. Breaks Mixed UI / EN-first scan habit locked in ADR-0003.

### Rule

SERP tags ≠ H1 order. Keep visible H1 English-first with BN span where already used.

---

## 5. Emoji-first Service cards

### Pitfall

Decorating every card with emoji for “friendliness.” Undercuts civic trust; duplicates Category Icon system (ADR-0004).

### Rule

Lucide Category Icons + soft code-mapped accents only. No emoji wallpaper as the default.

---

## 6. Chip hover clipped by `overflow-x`

### Pitfall

`overflow-x: auto` on `.directory-chips` creates a scrollport that also clips vertical overflow. Hover `translateY` or thick borders get cut off (top/bottom).

### Rule

Do not lift chips with transform inside that row. Pad the scrollport vertically if borders need room.

---

## 7. Accent colors edited in category YAML

### Pitfall

Putting `accent_color` in content YAML. Editors drift the palette; design system fragments.

### Rule

Accents live in `src/lib/categoryVisuals.ts` keyed by category id (ADR-0004).

---

## 8. Catalog creep (banks / MFS as Official)

### Pitfall

Listing private banks, MFS apps, or commercial SaaS as Official Services to “fill the directory.”

### Rule

v1 Official = gov / utilities / half-gov peers only. See `CONTEXT.md` / `AGENTS.md` catalog do-nots.

---

## 9. Doorway / thin spam Service Pages

### Pitfall

Mass-generating near-empty pages that only exist to rank and bounce to third parties without honest hop UX.

### Rule

Service Pages stay thin **SEO hops** with clear Non-Official stance and primary Outbound CTA — not doorway spam. Short `description` fields stay card/SERP-sized; longer EN+BN Markdown lives in required `body` / `body_bn` (ADR-0008), not in `description`. Render **BN body first, then EN**. Body copy describes the government Service only — put “we don’t process applications here” in FAQ/chrome, not in `body` / `body_bn`. Show **official link last verified** with a human-readable date. Audience, FAQ, and Related section headings are EN+BN on one line; audience/FAQ values use required `audience_bn` and `q_bn`/`a_bn` stacked BN then EN (ADR-0009).

---

## 10. Committing foreign session WIP

### Pitfall

`git add -A` while another agent/chat left dirty files; shipping unrelated WIP or clobbering parallel work.

### Rule

See `docs/guides/agent-workflow.md` § Parallel sessions. Explicit paths only; ask about foreign dirt.

---

## 11. Broken category / related content refs

### Pitfall

Service `category` or `related` ids that do not exist — builds may still partially work until a page throws, or related grids go empty wrongly.

### Rule

Run / keep green `tests/unit/content-integrity.test.ts`. Fix refs in content, do not weaken the test.

---

## 12. Mirroring broken official Display Name casing

### Pitfall

Copying homepage typography (`a2i`, mixed `E-` / `e-`) into Service `title` / FAQ because “that’s what the official site says,” while leaving domains alone would have been enough.

### Rule

Curate **Display Name** per ADR-0005, `CONTEXT.md`, and the living table in `docs/guides/display-names.md`. Domains/URLs stay literal (`a2i.gov.bd`). Clear fixes (A2I, e-Namjari) apply without asking; stylized or disputed brands stop-and-ask — then update both the Service content and the display-names table.

---

## 13. Alternate names only in `tags` (skip `aliases`)

### Pitfall

Putting citizen-facing synonyms / former names only in `tags`, so Instant Directory may match but there is no typed `kind`, no “Formerly …” line, and editors cannot tell keywords from Name Aliases.

### Rule

Use **required** `aliases: [{ name, lang, kind }]` per ADR-0006 (≥2, both `en` and `bn`). Keep `tags` for free-form keywords. Search indexes both. Enforced by content schema + `content-integrity.test.ts`.

---

## 14. New Service without EN+BN Name Aliases

### Pitfall

Adding a Service with only `title` / `title_bn` / `tags`, so Instant Directory misses common citizen queries (romanizations, former names, related terms).

### Rule

Every new Service ships with `aliases` (≥2) covering **both** `lang: en` and `lang: bn`, each with `kind`. Include useful romanizations in aliases. See `docs/guides/display-names.md`. `npm run ci` fails without them.
