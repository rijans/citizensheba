# Display Names & name aliases (CitizenSheba)

> **Owner guide** for curated English casing and (future) alternate names. Glossary: `CONTEXT.md` → **Display Name**. Decision: [ADR-0005](../adr/0005-display-name-casing.md). Trap: [#12](../specs/TRAPS.md).

When you decide a tricky brand with the product owner, **update this table** and the Service’s `title` / English body in the same change. The Service markdown remains runtime SSOT; this file is the human/agent cheat sheet so casing does not regress.

## House rules (summary)

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

Add a row whenever a new Service needs a non-obvious casing decision. Rows that simply follow the house rules for new acronyms are optional but useful.

## Future: Name Aliases (schema chosen; not shipped)

Bangladesh government portals often use **multiple English/Bengali names** for one Service, and **rename** programmes over time. Citizens search with any of those strings.

**Decision:** dedicated content field(s) for Name Aliases — do **not** overload `tags`. `tags` stay free-form search keywords; aliases are curated alternate / former / informal names mapped to the canonical Service (Display Name unchanged).

**Still open:** exact field shape (deferred — not flat vs EN/BN vs typed objects yet), whether former names appear on the Service Page, slug policy when an official name changes, and Instant Directory scoring details.

**Timing:** implement in a **later dedicated task** — not this Display Name casing pass.

Until shipped, optional helpful search strings may still go in `tags` only — do not invent a parallel alias schema in content yet.

## Related

- `CONTEXT.md` — Display Name
- [ADR-0005](../adr/0005-display-name-casing.md)
- [Trap #12](../specs/TRAPS.md)
- `src/content/services/*.md`
- `docs/guides/agent-workflow.md` (stop-and-ask for disputed brands)
