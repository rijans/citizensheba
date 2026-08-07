# Service capability capsules — design

> **Status:** implemented. Living hop SSOT: [`docs/guides/service-page.md`](../../guides/service-page.md). Glossary: `CONTEXT.md` → **Service Capability**. ADR: [0011](../../adr/0011-service-capability-capsules.md).

Hop pages need a scannable “what you can do” signal without yellow highlights inside the short description, tag clouds, or competing with the Outbound CTA. Citizens (EN and BN) should see 2–4 curated tasks as soft capsules between the description and the primary CTA.

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Pattern | Soft **capability capsules** (not inline highlights, not raw `tags`) |
| Bilingual | **B** — each capsule: EN on top, BN under (`lang="bn"`) |
| Field | Optional `capabilities: [{ en, bn }, …]` |
| Count | When present: **2–4** items; omit field if nothing solid |
| Placement | After short description, **before** Outbound CTA |
| Surfaces | **Service Page hop only** — not Instant Directory / Category cards |
| Accent | Brand soft surface + muted gray EN / subtler gray BN (not Category blue / not green BN) |
| Seeding v1 | **All** Services get 2–4 curated tasks from existing description/body honesty |
| Search | Capsules are display-only in v1 (aliases/tags already cover search) |
| Docs | `service-page.md`, `CONTEXT.md`, `new-service.md`, INDEX; short ADR-0011 |

## Schema

```yaml
capabilities:
  - en: Voter registration
    bn: ভোটার নিবন্ধন
  - en: NID correction
    bn: এনআইডি সংশোধন
  - en: Download NID copy
    bn: এনআইডি কপি ডাউনলোড
```

Zod (sketch):

```ts
capabilities: z
  .array(z.object({ en: z.string().min(1), bn: z.string().min(1) }))
  .min(2)
  .max(4)
  .optional(),
```

Integrity (optional soft rule): if `capabilities` present, each `en`/`bn` non-empty and length capped (~40 chars EN / ~48 BN) so wraps stay tidy — enforce in schema `.max()` if useful.

## Page order (delta)

| # | Block | Notes |
|---|--------|--------|
| 5 | Short description | Unchanged prose |
| **5b** | **Capability capsules** | New; hide row when field omitted |
| 6 | Outbound CTA | Primary action stays below |

## Visual

- Row: flex wrap, gap ~0.5rem, margin under description / above CTA
- Capsule: `surface-muted` fill + light border; radius ~0.75rem; padding compact
- Typography: EN ~0.8125–0.875rem medium **ink-muted**; BN slightly smaller, `lang="bn"`, **ink-subtle** gray (quieter than EN; not green/blue)
- No Lucide inside capsules; no border/shadow that rivals the green CTA button
- Mobile: wrap naturally; do not force horizontal scroll

## Editorial rules

- Tasks citizens can **do on the official portal** (or clearly related portal outcomes) — not site chrome, not “search on CitizenSheba”
- Prefer verb/noun phrases: “Book appointment”, not “Appointment system portal”
- Do **not** duplicate Display Name; do **not** paste Name Aliases wholesale
- Do **not** auto-extract from `description` at runtime
- Keep description as clean SERP/card prose (no forced keyword stuffing to match capsules)

## Seed approach

For each Service Markdown: derive 2–4 capabilities from `description` / `body` / known portal scope. Prefer concrete tasks already claimed in content. Skip marketing fluff.

Example (NID) — locked sample:

| en | bn |
|----|-----|
| Voter registration | ভোটার নিবন্ধন |
| NID correction | এনআইডি সংশোধন |
| Download NID copy | এনআইডি কপি ডাউনলোড |

## Implementation sketch

1. Schema + content seed (all services)
2. `[slug].astro`: render list when `capabilities?.length`
3. CSS: `.service-page__capabilities` / `__capability` under Category accent on title-row parent or article style
4. Docs + ADR-0011 + `new-service.md` checklist line
5. `npm run ci`

## Rejected

- Inline `<mark>` / bold-keyword soup in `description`
- Runtime NLP / splitting description into pills
- Using `tags` or `aliases` as the capsule source
- Showing capabilities on Home/Category cards (v1)
- EN-only capsules (choice A) or EN-only with BN elsewhere (choice C)

## Open for implement (non-blocking)

- Exact max string lengths in Zod
- Whether integrity test requires capabilities on every Service after full seed (recommend: **yes** once catalog is seeded — or keep optional forever and only seed; prefer **optional forever** so thin stubs can ship without capsules)
