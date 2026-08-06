# Display Names & Name Aliases (CitizenSheba)

> Glossary: `CONTEXT.md` → **Display Name**, **Name Alias**, **Search Variant**. Decisions: [ADR-0005](../adr/0005-display-name-casing.md), [ADR-0006](../adr/0006-name-aliases.md), [ADR-0007](../adr/0007-bilingual-directory-search.md). Traps: [#12](../specs/TRAPS.md)–[#14](../specs/TRAPS.md).

When you decide a tricky brand with the product owner, **update the Display Name table below** and the Service’s `title` / English body in the same change. The Service markdown remains runtime SSOT.

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

| `desco` | **DESCO** | Acronym ALL CAPS |
| `dpdc` | **DPDC** | Acronym ALL CAPS |
| `nesco` | **NESCO** | Acronym ALL CAPS |
| `bmet` | **BMET Online Clearance** | Acronym + product clarity |
| `dhaka-wasa` | **Dhaka WASA** | WASA acronym |
| `ecourt` | **e-Court** | House lowercase `e-` |
| `bangladesh-visa` | **Bangladesh Online Visa (MRV)** | Expand MRV for clarity |
| `titas-gas` | **Titas Gas** | Company short name |
| `fire-service` | **Fire Service & Civil Defence** | Full directorate short form |

Add a row whenever a new Service needs a non-obvious casing decision.

## Name Aliases — **required** on every Service

```yaml
aliases:
  - name: Aspire to Innovate
    lang: en
    kind: alt
  - name: এটুআই
    lang: bn
    kind: alt
```

| Field | Required | Values |
|-------|----------|--------|
| `name` | yes | EN or BN string (incl. romanizations) |
| `lang` | yes | `en` \| `bn` |
| `kind` | yes | `former` \| `informal` \| `alt` |

**Minimum for every Service (new or existing):** ≥2 aliases, **at least one `en` and one `bn`**. Enforced by Zod schema + `tests/unit/content-integrity.test.ts` (`npm run ci`).

| kind | Instant Directory | Service Page |
|------|-------------------|--------------|
| `former` | matched | muted “Formerly …” under H1 |
| `alt` | matched | hidden |
| `informal` | matched | hidden |

### Agent checklist — adding a Service

1. Curate Display Name (`title`) per house rules; update this guide’s table if non-obvious.
2. If the Display Name is too short or opaque in Google results (acronyms like A2I, myGov), set **`serp_title` / `serp_title_bn`** expansions for Document Title (ADR-0003). H1 stays short.
3. Fill `aliases` with EN + BN (+ romanizations citizens type).
4. Do **not** rely on `tags` alone for alternate names.
5. Run `npm run ci` before calling the task done.

### Search Variants (global only)

Spelling twins in `src/lib/search.ts` (`SEARCH_VARIANT_GROUPS`) — e.g. licence/license. Service-specific terms (`khajna`, `porcha`) stay in **aliases**.

## Related

- `CONTEXT.md` — Display Name, Name Alias, Search Variant
- [ADR-0005](../adr/0005-display-name-casing.md), [ADR-0006](../adr/0006-name-aliases.md), [ADR-0007](../adr/0007-bilingual-directory-search.md)
- Traps [#12](../specs/TRAPS.md)–[#14](../specs/TRAPS.md)
- `src/content/services/*.md`, `src/content.config.ts`, `src/lib/search.ts`
- `docs/guides/agent-workflow.md`
