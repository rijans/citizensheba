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

| `election-commission` | **Election Commission** | Institutional name; ECS in aliases |
| `chattogram-wasa` | **Chattogram WASA** | City + WASA acronym (not Chittagong in Display Name) |
| `dmtcl` | **DMTCL** | Acronym; SERP expands Dhaka Metro |
| `brtc` | **BRTC** | Acronym ALL CAPS |
| `bwdb` | **BWDB** | Acronym; SERP expands |
| `teletalk` | **Teletalk** | Product brand casing |
| `enothi` | **e-Nothi** | House lowercase `e-` |
| `lged` | **LGED** | Acronym ALL CAPS |
| `dpp` | **DPP** | Acronym ALL CAPS |
| `mofa` | **MoFA** | Ministry short form |
| `mohfw` | **MoHFW** | Health ministry short form |
| `dncc` | **DNCC** | Acronym ALL CAPS |
| `dscc` | **DSCC** | Acronym ALL CAPS |
| `ccc` | **CCC** | Acronym; BN চসিক |
| `khulna-wasa` | **Khulna WASA** | City + WASA |
| `pwd` | **PWD** | Acronym ALL CAPS |
| `rhd` | **RHD** | Acronym; BN সড়ক ও জনপথ |
| `mha` | **MoHA** | Home Affairs short form |
| `mof` | **MoF** | Finance ministry short form |
| `pmo` | **PMO** | Acronym ALL CAPS |

| `mopa` | **MoPA** | Public Administration short form |
| `cabinet` | **Cabinet Division** | Institutional name |
| `plancomm` | **Planning Commission** | Institutional name |
| `planning` | **Planning Division** | Division under MoP; MoP in aliases |
| `nbr` | **NBR** | Acronym ALL CAPS |
| `lgd` | **LGD** | Acronym; Local Government Division |
| `moa` | **MoA** | Agriculture ministry short form |
| `bsti` | **BSTI** | Acronym ALL CAPS |
| `bgb` | **BGB** | Acronym ALL CAPS |
| `acc` | **ACC** | Acronym; BN দুদক |
| `ird` | **IRD** | Acronym ALL CAPS |
| `bangabhaban` | **Bangabhaban** | House spelling (not Bangabhavan in title) |
| `ansar` | **Ansar & VDP** | Force short Display Name |
| `gcc` | **GCC** | Acronym; BN গসিক |
| `mole` | **MoLE** | Labour ministry short form |
| `mofl` | **MoFL** | Fisheries & Livestock short form |
| `sparrso` | **SPARRSO** | Acronym ALL CAPS |
| `infocom` | **Information Commission** | Full commission name |
| `barishal-cc` | **Barishal City Corporation** | City spelling Barishal (not Barisal in title) |
| `ncc` | **NCC** | Acronym; Narayanganj City Corp |

| `moc` | **MoC** | Commerce ministry short form |
| `moi` | **MoI** | Industries ministry short form |
| `mowr` | **MoWR** | Water Resources short form |
| `moef` | **MoEFCC** | Environment / climate short form |
| `cag` | **CAG** | Acronym ALL CAPS |
| `dnc` | **DNC** | Acronym ALL CAPS |
| `moys` | **MoYS** | Youth & Sports short form |
| `prison` | **Bangladesh Jail** | Prisons directorate Display Name |
| `most` | **MoST** | Science & Technology short form |
| `dpe` | **DPE** | Acronym ALL CAPS |

| `bsec` | **BSEC** | Acronym ALL CAPS |
| `cga` | **CGA** | Acronym ALL CAPS |
| `mochta` | **MoCHTA** | CHT Affairs short form |
| `mocat` | **MoCAT** | Civil Aviation & Tourism short form |
| `molwa` | **MoLWA** | Liberation War Affairs short form |
| `erd` | **ERD** | Acronym ALL CAPS |
| `power-division` | **Power Division** | Institutional name |
| `shed` | **SHED** | Acronym ALL CAPS |
| `doe` | **DoE** | Department short form (capital E) |
| `bpsc` | **BPSC** | Acronym ALL CAPS |

| `parliament` | **Jatiya Sangsad** | Institutional BN-first Display Name |
| `moinfo` | **MoInfo** | Information & Broadcasting (not Industries MoI) |
| `pid` | **PID** | Acronym ALL CAPS |
| `mor` | **MoR** | Railways ministry short form |
| `sreda` | **SREDA** | Acronym ALL CAPS |
| `sgcl` | **SGCL** | Acronym ALL CAPS |
| `petrobangla` | **Petrobangla** | Product/corp brand casing |
| `mofood` | **MoFood** | Food ministry short form |
| `dgfood` | **DG Food** | Directorate short form |
| `fisheries` | **DoF** | Department of Fisheries short form |
| `dlrs` | **DLRS** | Acronym ALL CAPS |

| `ekpay` | **ekPay** | camelCase product brand (payment gateway) |
| `breb` | **BREB** | Acronym ALL CAPS |
| `rjsc` | **RJSC** | Acronym ALL CAPS |
| `btcl` | **myBTCL** | camelCase BTCL customer portal |
| `bida` | **BIDA** | Acronym ALL CAPS |
| `hajj` | **Bangladesh Hajj** | Clear pilgrimage portal name |
| `bangladesh-post` | **Bangladesh Post** | Institutional short name |
| `caab` | **CAAB** | Acronym ALL CAPS |
| `wzpdcl` | **WZPDCL** | Acronym ALL CAPS |
| `national-university` | **National University** | Full institutional name |
| `wewb` | **WEWB** | Acronym ALL CAPS |
| `customs` | **Bangladesh Customs** | Clear official short name |

| `bou` | **Bangladesh Open University** | Full name; alias BOU |
| `probashi` | **Probashi Kalyan** | Ministry short Display Name |
| `bangladesh-bank` | **Bangladesh Bank** | Institutional name |
| `bpdb` | **BPDB** | Acronym ALL CAPS |
| `btrc` | **BTRC** | Acronym ALL CAPS |
| `ugc` | **UGC** | Acronym ALL CAPS |
| `dshe` | **DSHE** | Acronym; BN মাউশি in title_bn |
| `dgda` | **DGDA** | Acronym ALL CAPS |
| `eprocure` | **e-GP** | House lowercase `e-` product name |
| `biwtc` | **BIWTC** | Acronym ALL CAPS |
| `biwta` | **BIWTA** | Acronym ALL CAPS |
| `biman` | **Biman Bangladesh Airlines** | Carrier full short form |
| `dip` | **DIP** | Acronym ALL CAPS |
| `nctb` | **NCTB** | Acronym ALL CAPS |
| `bfsa` | **BFSA** | Acronym ALL CAPS |
| `rab` | **RAB** | Acronym ALL CAPS |
| `iedcr` | **IEDCR** | Acronym ALL CAPS |

| `vat` | **VAT Online** | NBR VAT product |
| `bcc` | **BCC** | Acronym ALL CAPS |
| `doict` | **DoICT** | Camel department short form |
| `moedu` | **Ministry of Education** | Full ministry name |
| `mopme` | **MoPME** | Acronym |
| `tmed` | **TMED** | Acronym |
| `du` | **University of Dhaka** | Full university name |
| `buet` | **BUET** | Acronym ALL CAPS |
| `dgfp` | **DGFP** | Acronym ALL CAPS |
| `epb` | **EPB** | Acronym ALL CAPS |
| `bscic` | **BSCIC** | Acronym ALL CAPS |
| `pgcb` | **PGCB** | Acronym ALL CAPS |
| `berc` | **BERC** | Acronym ALL CAPS |
| `bmd` | **BMD** | Acronym ALL CAPS |
| `ffwc` | **FFWC** | Acronym ALL CAPS |
| `modmr` | **MoDMR** | Acronym |
| `rthd` | **RTHD** | Acronym |
| `dss` | **DSS** | Acronym ALL CAPS |
| `mowca` | **MoWCA** | Acronym |
| `supremecourt` | **Supreme Court** | Institutional name |
| `lawjusticediv` | **Law and Justice Division** | Full division name |
| `coastguard` | **Bangladesh Coast Guard** | Full force name |
| `dae` | **DAE** | Acronym ALL CAPS |
| `banbeis` | **BANBEIS** | Acronym ALL CAPS |

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
