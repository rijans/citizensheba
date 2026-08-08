# Elaborated Service Slugs (SEO) — Design

**Status:** Approved for implementation planning  
**Date:** 2026-08-08  
**Product:** CitizenSheba Official Service hops  
**Follow-up ADR (implementation):** ADR-0014 (Service Slug elaboration + legacy 301s)

## Problem

Most Service public paths are short acronym forms (`/services/bd-rab`, `/services/bd-dpdc`, `/services/bd-du`). They are stable and scannable for editors, but weak for SEO and for humans reading the URL. We want an **elaborated** pattern when the slug is opaque, without renaming internal content ids or over-engineering redirects.

## Goals

- Maximize SEO leverage on Service hop URLs via English expansion after the acronym token.
- Keep internal `id` / filenames / `related: [id]` stable.
- Preserve old short URLs with permanent **301** redirects (static, not a Worker).
- Give agents a hard rule (ADR + Trap + checklist) so new Services do not ship bare acronym slugs when expansion is possible.

## Non-goals

- Bangla slugs or parallel `/bn` trees (v1 still English slugs — `CONTEXT.md`).
- Renaming Category slugs.
- Changing Display Names, SERP titles, or BN orthography in this wave (except citing slug examples).
- Cloudflare Worker / middleware URL rewriting (rejected — conflicts with static SSG posture, ADR-0001 / Trap #1).
- Expanding slugs that are already human-readable English.

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Scope | **Opaque / acronym only** — expand weak slugs; skip already-readable ones |
| Formula | `bd-{acronym-or-short-token}-{official-english-expansion}` |
| Content `id` | **Stable short id** (`rab`, `rab.md`); only `slug:` changes |
| Redirects | Permanent **301** via `public/_redirects` (slash + non-slash) |
| Expansion length | Full official English name, light cleanup; soft whole-slug **~60–80** chars |
| Rollout | **One ship wave**: policy docs + all opaque renames + redirect map together |
| Implementation shape | Content `slug` + flat `_redirects` (Approach 1) |

## Slug formula

```
bd-{token}-{expansion}
```

Examples:

| id | Old slug | New slug |
|----|----------|----------|
| `rab` | `bd-rab` | `bd-rab-rapid-action-battalion` |
| `dpdc` | `bd-dpdc` | `bd-dpdc-dhaka-power-distribution-company` |
| `du` | `bd-du` | `bd-du-university-of-dhaka` |

Rules:

1. **Token** — lowercase acronym or existing short token (`rab`, `dpdc`, `a2i`, `mygov`). Matches how citizens type the brand.
2. **Expansion** — kebab-case **official English** full name (prefer the same expansion used in `serp_title` / EN aliases when curated). ASCII only.
3. **Light cleanup** — drop legal fluff that adds no search meaning (`limited`, `ltd`, `plc`, bare `the`) when safe.
4. **Soft length** — prefer whole slug roughly 60–80 characters; if longer, use the shortest unambiguous official short name still after the token.
5. **Skip** — do not expand when the slug is already human-readable English beyond a naked acronym, e.g. `bd-beautiful-bangladesh`, `bd-chattogram-wasa`, `bd-police-staff-college`, `bd-dhaka-wasa`, `bd-xi-admission`, `bd-bangladesh-post`.
6. **Disputed brands** — stop-and-ask for stylized expansion wording (same spirit as Display Name ADR-0005); slug token stays lowercase ASCII.
7. **Stability** — do not churn expansions for minor government wording tweaks. If a rare forced rename is needed, add a new 301 from the previous public slug and keep older redirects.

## Redirects (safe, not over-engineered)

Cloudflare static assets already honor `public/_redirects` (site already 301s `/sitemap.xml` → `/sitemap-index.xml`).

For each renamed Service, emit **both**:

```
/services/bd-rab    /services/bd-rab-rapid-action-battalion/    301
/services/bd-rab/   /services/bd-rab-rapid-action-battalion/    301
```

- Target always includes trailing slash (matches `servicePath()`).
- Keep entries **indefinitely** (bookmarks, external links, SEO consolidation).
- No runtime app router; no Durable Objects; no Workers redirect layer.

Canonical tags, sitemap, Instant Directory / Category cards, and in-page links use **only** the new slug via `servicePath(slug)`.

## Architecture

```text
Content id (stable)     Public slug (SEO)           Legacy short URL
rab.md  id: rab    →    slug: bd-rab-…-battalion  ←  _redirects 301 from bd-rab
        related: [rab]
        urls.servicePath(slug) → /services/bd-rab-…-battalion/
```

| Piece | Role |
|-------|------|
| `src/content/services/*.md` `slug` | Public path SSOT |
| Content `id` / filename | Stable internal key |
| `src/lib/urls.ts` | `/services/{slug}/` helper + existing `bd-…` regex (still valid) |
| `public/_redirects` | Old short paths → new expanded paths (301) |
| Sitemap / JSON-LD / cards | Current slug only |
| Integrity tests | Opaque-without-expansion guard + duplicate slug guard |
| ADR-0014 + Trap #19 + guides | Agent SSOT |

## Migration (one wave)

1. Classify each Service: **expand** (opaque) vs **skip** (already readable). Heuristic assist + human spot-check of edge cases.
2. For expand set: write new `slug:` from official English expansion; leave `id` / filename / `related` unchanged.
3. Generate paired `_redirects` lines old → new for every changed slug.
4. Update guide/backlog/doc examples that hard-code old public paths.
5. Ship policy docs (ADR-0014, Trap #19, `CONTEXT` Service Slug, `new-service` checklist, `AGENTS.md`, agent INDEX) in the same wave as content + redirects.
6. `npm run ci`; spot-check a few old URLs 301 to new; confirm sitemap lists only new paths.

## Testing / integrity

- **Duplicate slug** — fail CI if two Services share a `slug`.
- **Opaque without expansion** — fail if a Service matches the opaque heuristic (e.g. `bd-` + ≤2 short tokens, mostly acronym-like) **and** is not on an explicit skip allowlist for already-readable exceptions.
- **Redirect coverage** — migration review: every old slug that changed must appear as a `_redirects` source; optional test that redirect targets equal some Service’s current slug.
- **Search / cards** — no special slug search required; titles/aliases remain primary. Existing slug regex in `urls.ts` / schema unchanged in spirit (still `^bd-[a-z0-9]+(?:-[a-z0-9]+)*$`).

## Documentation deliverables (implementation)

| Doc | Change |
|-----|--------|
| `docs/adr/0014-elaborated-service-slugs.md` | Decision record |
| `docs/specs/TRAPS.md` | Trap #19 — bare acronym Service slugs |
| `CONTEXT.md` | Revise **Service Slug** glossary |
| `docs/guides/new-service.md` | Checklist: elaborate when opaque |
| `AGENTS.md` + `docs/agent/INDEX.md` | Point agents at ADR/trap |
| This spec | Design SSOT for the wave |

## Rejected alternatives

| Idea | Why not |
|------|---------|
| Expand every Service including already-readable slugs | Redundant URLs, extra redirects, little SEO gain |
| Expansion-only paths (`bd-rapid-action-battalion`) | Weaker acronym matching in the URL |
| Rename content `id` / filenames to the long form | Breaks `related[]`, backlog, git history; SEO does not care about id |
| Worker/middleware rewrite keeping short file slugs | Over-engineering; fights static SSG |
| Temporary 302 then drop redirects | Loses bookmarks and SEO equity |
| Dual `slug_legacy[]` in content schema | `_redirects` is sufficient history for a one-time rename |

## Success criteria

- Opaque Services use elaborated public slugs; readable ones unchanged.
- Old short Service URLs return **301** to the new path.
- Sitemap and on-site links never emit old short slugs after ship.
- Agents have ADR + Trap + checklist so new opaque hops cannot silently ship as `bd-{acr}` only.
- CI guards against regression (opaque bare slugs / duplicates).
