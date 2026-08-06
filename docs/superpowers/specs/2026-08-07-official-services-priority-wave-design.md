# Official Services priority wave — design

> **Status:** implemented on `feat/official-services-priority-wave` (priority wave shipped). Living backlog: [`docs/ops/service-catalog-backlog.md`](../../ops/service-catalog-backlog.md). Glossary: **Catalog Backlog** in `CONTEXT.md`.

Expand the CitizenSheba catalog with a **small, curated priority wave** of Official Services — full hop quality — plus a git-tracked backlog so agents and humans can see what is shipped vs remaining. Not a National Portal mirror; not a scraper.

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Wave goal | Priority / high-demand Official portals (gap-first), not completeness |
| Wave size | ~8–12 new Services this wave |
| Selection | Gap-first (missing high-demand portals over deepening dense Categories) |
| Tracking | Git markdown **Catalog Backlog** at `docs/ops/service-catalog-backlog.md` |
| Categories | Add as needed: **`utilities`**, **`migration`**; **`justice`** only if e-Court ships |
| Granularity | **One Service = one Outbound portal**; this wave ships top gaps; siblings stay `candidate` |
| Name lock | Hybrid: musts 1–5 locked; research slots for 6–7 + fill to 8–12 |
| Sources | NP + curated gap list for discovery; A2I cross-check only; **nagorikseba out of seed scope** |
| Research | Manual only (no scraper / crawler in this wave) |
| Ship gate | Full hop (integrity-complete) + light human PR skim |
| Delivery | Single content PR (backlog + Categories + Services); split only if unwieldy |
| ADR | None required — no irreversible rule change vs existing Official / hop / Category Icon ADRs |

## Goal and non-goals

**In scope**

- Create and maintain the Catalog Backlog.
- Add Categories `utilities` and `migration` (and `justice` iff research ships e-Court).
- Ship ~8–12 full Service Markdown hops following [`docs/guides/service-page.md`](../../guides/service-page.md).
- Wire Lucide icons + accents in code (`categoryIcons.ts`, `categoryVisuals.ts`) per ADR-0004.
- Update INDEX / CONTEXT / ops map; Display Names table when new brands need house style.

**Out of scope**

- Scrapers or scheduled harvest.
- Seeding from nagorikseba.com (mixed private / commercial / school listings).
- Thin ships (URL-only / missing aliases, body, FAQ).
- Private banks, MFS products, commercial SaaS as Official.
- Hub Services with multiple Outbounds in one page.
- Full how-to Guides.
- Mirroring all National Portal service rows.

## Catalog Backlog

**Path:** `docs/ops/service-catalog-backlog.md`  
**Role:** Working SSOT for candidates vs shipped. Not a second content collection — published Services remain `src/content/services/*.md`.

### Columns

| Column | Purpose |
|--------|---------|
| Working name | Human label |
| Proposed `id` / `slug` | e.g. `desco` / `bd-desco` |
| Proposed Category | `utilities`, `migration`, … |
| Outbound URL | Candidate official URL |
| Status | see below |
| Source note | `gap-list`, `np`, `a2i-cross-check`, … |
| Notes | duplicate, skip reason, verify issues |

### Statuses

`candidate` → `drafting` → `ready` → `shipped` | `skip`

- **`shipped`:** matching Service Markdown merged (or included in the shipping PR).
- **`skip`:** requires a reason (non-Official, duplicate, dead URL, thin / unfit for hop).

### Initial seed (implementation)

1. Section or rows for the **current ~20** catalog Services as `shipped`.
2. Musts 1–5 as `candidate` / `drafting`.
3. Research priorities (e-Court, Fire Service) + utility siblings as `candidate`.
4. Empty capacity for research-filled slots up to the wave cap.

Update the row whenever status changes. No automated sync from NP.

## Categories

| id | When | Icon direction (pick one Lucide key in impl) | First Services |
|----|------|-----------------------------------------------|----------------|
| `utilities` | This wave | e.g. `zap` or `droplets` | DESCO, Dhaka WASA, Titas Gas |
| `migration` | This wave | e.g. `plane` or `globe` | BMET, Immigration/visa |
| `justice` | Only if e-Court ships | e.g. `scale` | e-Court (research) |

Fire Service (if research ships) → existing **`safety`**.

Do not merge empty new Categories without their first Services (same PR). Accents live in `src/lib/categoryVisuals.ts` (code map, not YAML).

## Wave content

### Musts (locked; confirm live Outbound in impl)

| Working name | Proposed id | Category | Notes |
|--------------|-------------|----------|-------|
| DESCO | `desco` | utilities | Electricity bill / self-care |
| Dhaka WASA | `dhaka-wasa` | utilities | Confirm current citizen URL |
| Titas Gas | `titas-gas` | utilities | Gas utility portal |
| BMET | `bmet` | migration | Emigration / migrant-worker portal |
| Immigration / visa | `immigration` (finalize after Display Name) | migration | Official immigration/visa portal |

### Research-first slots

1. Judiciary / e-Court → may create `justice`.
2. Fire Service & Civil Defence → `safety`.

Remaining count to **8–12** comes from backlog candidates (e.g. other utility peers) under the same gate — still one portal per Service.

### Content quality (every new Service)

Follow existing rules — no new hop shape:

- Public slug `bd-…`; Display Name casing (ADR-0005); required EN+BN Name Aliases (ADR-0006).
- Short `description` / `description_bn`; Markdown `body` / `body_bn`; `audience` / `audience_bn`.
- FAQ 1–5 items, service-useful (no hop-disclaimer FAQ — Trap #9 / service-page guide).
- `url`, `official_domain`, `last_verified`, `status`, `category`, optional `serp_title*`.
- `related` where natural.

Fail closed: dead or ambiguous URL → remain `candidate` or `skip`; do not invent hub pages.

## Workflow

1. Create/update Catalog Backlog (shipped + musts + research + siblings).
2. Manually confirm each Outbound; set `last_verified`; move status `drafting` → `ready`.
3. Add Category YAML + icon/accent maps in the **same** change as first Services for that Category.
4. Write full Service Markdown; wire related; mark backlog `shipped`.
5. `npm run ci`; spot-check Instant Directory chips + one hop per new Category via `npm run dev`.
6. Human PR skim; merge.

**Packaging:** one content PR preferred (Approach 1). Split only if the diff becomes hard to review.

## Sources

| Source | Role |
|--------|------|
| Curated gap list | Primary for musts / high-demand misses |
| bangladesh.gov.bd NP services | Discovery well; filter Official + hop-fit |
| a2i.gov.bd | Cross-check / ecosystem hints; already a Service |
| nagorikseba.com | **Out of seed scope** (non-Official mix) |

## Testing and docs

- Rely on existing `content-integrity` + search unit tests; no scraper tests.
- Link Health CI continues for Outbounds after ship.
- Docs: this spec; living backlog; `CONTEXT.md` (**Catalog Backlog**); `docs/agent/INDEX.md` keywords; `docs/README.md` ops row; `display-names.md` when brands need house style.
- No new ADR unless Category Icon / Official catalog rules change (not expected).

## Alternatives considered

| Approach | Why not (for this wave) |
|----------|-------------------------|
| Mirror NP / large ingest | Thin hops, duplicates, fights Official-only + editorial cost |
| Thin-then-enrich ships | Integrity tests and hop SSOT forbid incomplete Services |
| Hub “utility bills” Service | Breaks one-Outbound-CTA model |
| Equal crawl of nagorikseba | Catalog pollution (private/schools/commercial) |
| Ongoing crawler / harvest script | Premature; NP is noisy/JS-heavy; hop quality is editorial |
| Scaffold Categories in a separate empty PR | Empty chips / Category Pages until follow-up |
| One Service per PR | Too slow for an 8–12 wave; related links awkward mid-stream |

## Success criteria

- Catalog Backlog exists and reflects shipped vs remaining for this wave.
- ~8–12 new Official Services live with full hop fields and passing `npm run ci`.
- `utilities` and `migration` appear in Instant Directory with at least one Service each (and `justice` only if used).
- Musts 1–5 shipped or explicitly `skip` with reason on the backlog.
- No nagorikseba-sourced or non-Official rows marked `shipped`.
