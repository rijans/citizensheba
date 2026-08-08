# New Service checklist (CitizenSheba)

> **Start here when adding an Official Service.** This is the maintenance checklist — not a second policy SSOT. Deep rules stay in the linked guides/ADRs. Router: [`docs/agent/INDEX.md`](../agent/INDEX.md).

**Do not:** invent a second card UI, doorway spam, private banks/MFS as Official, or skip EN+BN aliases / ranks. Industry / trade associations (e.g. BASIS) → **Partner listing** ([ADR-0013](../adr/0013-partner-listing.md)), not this Official checklist — and do not ship Partner hops until the Partner ship wave.

## Before you write content

1. Confirm it is an **Official Service** (gov / utility / half-gov) with **one Outbound URL** — [`AGENTS.md`](../../AGENTS.md), Catalog Backlog [`docs/ops/service-catalog-backlog.md`](../ops/service-catalog-backlog.md), discovery method [`docs/ops/official-portal-discovery.md`](../ops/official-portal-discovery.md). Associations are not Official.
2. Pick Category (`src/content/categories/*.yaml`). New Category → Lucide `icon` + accent in `categoryVisuals.ts` ([`frontend.md`](frontend.md), ADR-0004).
3. Lock **Display Name** casing ([`display-names.md`](display-names.md), ADR-0005). Ask if stylized/disputed.
4. **Verify BN brand/loan orthography** for English-derived names (Trap #18): র + য-ফলা loans need ZWJ (`র‍্যাব`, not `র্যাব`). Check the official site’s Bangla spelling before writing `title_bn` / BN aliases / `body_bn`.
5. Prefer public slug `bd-…` (English kebab).
6. **Service Slug:** If the name is an opaque acronym, use elaborated form `bd-{token}-{official-english-expansion}` (ADR-0014, Trap #19). Keep content `id` short. Skip elaboration when the slug is already human-readable.

## Ship the Markdown hop

Create `src/content/services/<id>.md` following [`service-page.md`](service-page.md) + `src/content.config.ts`:

| Must have | Notes |
|-----------|--------|
| `title` / `title_bn` | Card + H1 Display Names |
| `description` / `description_bn` | Short; cards + Meta Description. EN `description` ≥ **90** chars (ADR-0012; 2-line card clamp) |
| `body` / `body_bn` | Hop Markdown (min length); BN then EN on page |
| `audience` / `audience_bn` | Who it’s for |
| `faq[]` | 1–5 bilingual; **service-useful** only — no “is this official?” / CitizenSheba account FAQ |
| `aliases` | ≥2, cover **en** and **bn** (ADR-0006); romanizations in aliases |
| `url`, `official_domain`, `last_verified`, `category`, `status` | Outbound + Link Health |
| `directory_global_rank`, `directory_category_rank` | Required ints — lower = higher ([`directory-ranking.md`](directory-ranking.md)). New long-tail → high defaults (`500+` / `100+`) until curated |
| `icon` | **Strongly preferred** Lucide key ([`service-icons.md`](service-icons.md)). Add key to `categoryIcons.ts` if missing. Omit → Category glyph fallback |
| `capabilities` | **Preferred** 2–4 hop tasks `{ en, bn }` (ADR-0011). Soft capsules before Outbound CTA; omit if nothing solid yet |
| `related` | Optional peer ids; else same-category fallback via `relatedIdsFor` in `serviceProjection.ts` (limit 4) |
| `serp_title*` | Optional when Display Name is opaque for SERP (e.g. A2I) |

Wire **related** links on peers when it helps discovery. Update backlog status if you used the Catalog Backlog. Card DTOs / domain / related fallback: [`code-structure.md`](code-structure.md) § Service projection — do not re-implement in the page.

## Cards & Instant Directory (no extra UI work)

Shared card (`ServiceCard` / `ServiceCardLink`) already shows:

icon · EN title · BN title (brand green, same size) · description · domain · status if not ACTIVE

Rules: [`frontend.md`](frontend.md). Do **not** fork card markup for one Service. Chips stay Category-only.

Browse order / Load more / pager: ADR-0010 + [`directory-ranking.md`](directory-ranking.md). Search: ADR-0007.

## Service Page chrome (already built)

Hop layout, Outbound CTA (“Open official site” + domain **Copy** + toast), bilingual sections: [`service-page.md`](service-page.md). You only ship content fields; do not redesign the hop per Service.

## After content

1. Update living tables if needed: Display Names, Service Icons, directory Top ranks.
2. `npm run ci` (integrity + build).
3. Spot-check Home card + `/services/bd-…` in the browser ([`local-dev.md`](../ops/local-dev.md)).
4. Finalization: [`agent-workflow.md`](agent-workflow.md) checklist; deploy only when asked.

## Quick links

| Concern | SSOT |
|---------|------|
| Hop structure / FAQ policy | [`service-page.md`](service-page.md) |
| Cards / typography / Mobile-First | [`frontend.md`](frontend.md) |
| Icons | [`service-icons.md`](service-icons.md) |
| Ranks | [`directory-ranking.md`](directory-ranking.md) |
| Names / aliases | [`display-names.md`](display-names.md) |
| Domain language | [`CONTEXT.md`](../../CONTEXT.md) |
| Traps | [`TRAPS.md`](../specs/TRAPS.md) (#8–#9, #11–#14) |
