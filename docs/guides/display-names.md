# Display Names & Name Aliases (CitizenSheba)

> Glossary: `CONTEXT.md` → **Display Name**, **Name Alias**. Decisions: [ADR-0005](../adr/0005-display-name-casing.md) (casing), [ADR-0006](../adr/0006-name-aliases.md) (aliases). Trap: [#12](../specs/TRAPS.md). Design: [`docs/superpowers/specs/2026-08-07-name-aliases-design.md`](../superpowers/specs/2026-08-07-name-aliases-design.md).

When you decide a tricky brand with the product owner, **update the Display Name table below** and the Service’s `title` / English body in the same change. The Service markdown remains runtime SSOT; this file is the human/agent cheat sheet.

## Display Name house rules

| Rule | Examples |
|------|----------|
| ALL CAPS letter/digit government acronyms | A2I, BRTA, DGHS, BDRIS, NID, NBR |
| Lowercase `e-` electronic-service prefix | e-Passport, e-Namjari, e-Return, e-Porcha, e-TIN, e-Ticket |
| Preserve known camelCase product brands | myGov |
| Domains / URLs stay literal | `a2i.gov.bd`, `mygov.bd` |
| Clear cases → apply; stylized / disputed → ask | See ADR-0005 |

## Known Display Names

| Content id | Display Name | Notes |
|------------|--------------|--------|
| `a2i` | **A2I** | Official sites often show `a2i`; we use ALL CAPS acronym |
| `mygov` | **myGov** | CamelCase product brand — do not “fix” to MyGov / MYGOV |
| `namjari` | **e-Namjari (Mutation)** | Align with other `e-` services (was `E-Namjari`) |
| `epassport` | **e-Passport Portal** | House `e-` |
| `ereturn` | **e-Return (Online Tax Submission)** | House `e-` |
| `eporcha` | **e-Porcha (Khatian & Mouza Map)** | House `e-` |
| `etin` | **NBR e-TIN Registration** | Acronym NBR + `e-TIN` |
| `brta` | **BRTA Service Portal (BSP)** | Acronyms ALL CAPS |
| `dghs` | **DGHS** | Acronym |
| `bdris` | **Birth & Death Registration (BDRIS)** | Acronym in paren |
| `nid` | **NID Services** | Acronym |
| `ldtax` | **Land Development Tax (LD Tax)** | Keep “LD Tax” as used |

Add a row whenever a new Service needs a non-obvious casing decision.

## Name Aliases (shipped)

Optional typed field on Service content:

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
| `name` | yes | EN or BN string |
| `lang` | no | `en` \| `bn` |
| `kind` | no (set it) | `former` \| `informal` \| `alt` |

| kind | Instant Directory | Service Page |
|------|-------------------|--------------|
| `former` | matched | muted “Formerly …” under H1 |
| `alt` | matched | hidden |
| `informal` | matched | hidden |

- Do **not** put citizen-facing alternate names only in `tags` — use `aliases`.
- `tags` remain free-form keywords.
- Slugs stay stable when government renames; add a `former` alias for the old label.
- SERP Document Title / Meta Description do not include aliases in v1.

### Seeded examples (first ship)

| id | aliases |
|----|---------|
| `a2i` | Aspire to Innovate (`alt`) |
| `epassport` | MRP, Machine Readable Passport (`alt`) |
| `ldtax` | khajna, খাজনা (`informal`); Dakhila (`alt`) |
| `bdris` | birth registration, death registration (`alt`) |
| `surokkha` | vaccine certificate (`alt`); COVID vaccine (`informal`) |

## Related

- `CONTEXT.md` — Display Name, Name Alias
- [ADR-0005](../adr/0005-display-name-casing.md), [ADR-0006](../adr/0006-name-aliases.md)
- [Trap #12](../specs/TRAPS.md)
- `src/content/services/*.md`, `src/content.config.ts`, `src/lib/search.ts`
- `docs/guides/agent-workflow.md` (stop-and-ask for disputed brands)
