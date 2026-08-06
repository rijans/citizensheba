# Name Aliases — design

> **Status:** implemented (ADR-0006). Kept as the design snapshot.

CitizenSheba Services often have multiple citizen-facing names (EN/BN), informal labels, and occasional government renames. Instant Directory should match those strings without changing the curated **Display Name** or stable Service Slug.

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Storage | Dedicated optional `aliases` field — **not** `tags` |
| Shape | Typed objects: `{ name, lang?, kind? }` (approach 1 — minimal typed) |
| Citizen UI | Search indexes all aliases; Service Page shows a quiet line for **`kind: former` only** |
| Slugs | Keep forever when names change; aliases absorb old labels (no redirects in this task) |
| First ship | Schema + wiring + small seed set (~5 Services) |

## Data model

```yaml
aliases:
  - name: Aspire to Innovate
    lang: en
    kind: alt
  - name: MRP
    lang: en
    kind: alt
```

| Field | Required | Values |
|-------|----------|--------|
| `name` | yes | Non-empty string (EN or BN) |
| `lang` | no | `en` \| `bn` |
| `kind` | no (editors should set) | `former` \| `informal` \| `alt` |

- Omit `aliases` or use `[]` when none.
- **Display Name** remains `title` (+ `title_bn` for BN half of Mixed UI).
- **`tags`** stay free-form search keywords; no mass migration in v1. When seeding, avoid pointless duplicate of the exact same string in both when practical.
- Domains / Outbound URLs stay literal.

### Kind semantics

| kind | Search | Service Page |
|------|--------|--------------|
| `former` | yes | Yes — muted “Formerly …” line |
| `alt` | yes | no |
| `informal` | yes | no |

## Instant Directory

- Include every alias `name` in the searchable index (`buildSearchIndex` → `SearchableService`).
- Score in the **same band as tags** (below title / title_bn; above category / domain). Case-insensitive via existing `norm()`.
- Service cards continue to show Display Name only.

## Service Page

- Placement: after H1, before description.
- If one or more `kind: former`: one muted line, e.g. `Formerly {name1}, {name2}`.
- BN names: wrap with `lang="bn"`.
- No line when only `alt` / `informal` exist.
- Breadcrumb, Document Title, Meta Description: unchanged (no aliases in SERP v1).

## Seed (first ship)

| Service id | Proposed aliases | Page “Formerly”? |
|------------|------------------|------------------|
| `a2i` | Aspire to Innovate (`alt`/`en`) | no |
| `epassport` | MRP (`alt`/`en`); Machine Readable Passport (`alt`/`en`) | no |
| `ldtax` | khajna (`informal`/`en`); খাজনা (`informal`/`bn`); Dakhila (`alt`/`en`) | no |
| `bdris` | birth registration (`alt`/`en`); death registration (`alt`/`en`) | no |
| `surokkha` | vaccine certificate (`alt`/`en`); COVID vaccine (`informal`/`en`) | no |

No real `former` in the first seed unless product adds one. UI for “Formerly …” is still implemented; verify with a temporary content fixture in review or the first real former later.

## Docs & ADR

- `CONTEXT.md` — promote **Name Alias** from planned to defined.
- `docs/guides/display-names.md` — replace “future” section with shipped rules + pointer to kinds.
- New **ADR-0006** — aliases field, search vs page rules, stable slugs (keep 0005 for Display Name casing only).
- `docs/agent/INDEX.md` + `docs/README.md` — route keywords.
- Optional trap: stuffing citizen-facing alternate names only into `tags` and skipping `aliases`.

## Tests

- Content schema accepts optional typed `aliases`.
- Search scores / matches an alias `name`.
- Existing content integrity tests remain green.
- Optional: render check that `former` produces the muted line (component/page test or manual `npm run dev`).

## Out of scope (this task)

- Redirects / slug renames
- Aliases in Document Title or Meta Description
- “Also known as” for `alt` on the Service Page
- Mass tag → alias migration
- Typed `show_on_page` flag (page visibility is kind-driven)

## Success criteria

1. Querying a seeded alias (e.g. “MRP”, “khajna”, “Aspire to Innovate”) returns the right Service in Instant Directory.
2. Services without `former` aliases look unchanged on the Service Page.
3. Agents have a single SSOT (ADR-0006 + display-names guide) for adding aliases later.
