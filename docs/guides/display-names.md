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
| `printing` | **Department of Printing and Publications** | Prefer full name; `dpp.gov.bd` is printing/gazettes — not public prosecutions |
| `mofa` | **MoFA** | Ministry short form |
| `mohfw` | **MoHFW** | Health ministry short form |
| `dncc` | **DNCC** | Acronym ALL CAPS |
| `dscc` | **DSCC** | Acronym ALL CAPS |
| `ccc` | **CCC** | Acronym; BN চসিক |
| `cda` | **CDA** | Chattogram Development Authority |
| `cocc` | **COCC** | Cumilla City Corporation |
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
| `kcc` | **KCC** | Khulna City Corporation |
| `kda` | **KDA** | Khulna Development Authority |
| `mole` | **MoLE** | Labour ministry short form |
| `mofl` | **MoFL** | Fisheries & Livestock short form |
| `sparrso` | **SPARRSO** | Acronym ALL CAPS |
| `infocom` | **Information Commission** | Full commission name |
| `barishal-cc` | **Barishal City Corporation** | City spelling Barishal (not Barisal in title) |
| `ncc` | **NCC** | Acronym; Narayanganj City Corp |
| `rajuk` | **RAJUK** | Acronym ALL CAPS; capital development authority |
| `rajshahi-cc` | **Rajshahi City Corporation** | Full name; RCC in aliases / serp |
| `rpcc` | **RPCC** | Rangpur City Corporation |
| `mymensingh-cc` | **Mymensingh City Corporation** | Full name; avoid bare MCC vs medical college |

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
| `petrobangla` | **Petrobangla** | Product/corp brand casing |
| `sgcl` | **SGCL** | Acronym ALL CAPS |
| `gtcl` | **GTCL** | Gas Transmission Company |
| `kgdcl` | **KGDCL** | Karnaphuli Gas Distribution |
| `bpc` | **BPC** | Bangladesh Petroleum Corporation |
| `nwpgcl` | **NWPGCL** | North-West Power Generation |
| `jamuna-oil` | **Jamuna Oil** | Company short name |
| `rpcl` | **RPCL** | Rural Power Company |
| `bgfcl` | **BGFCL** | Bangladesh Gas Fields |
| `bpatc` | **BPATC** | Public Administration Training Centre |

| `icb` | **ICB** | Investment Corporation of Bangladesh |
| `mra` | **MRA** | Microcredit Regulatory Authority |
| `idra` | **IDRA** | Insurance Development and Regulatory Authority |
| `sbc` | **SBC** | Sadharan Bima Corporation |
| `ansar-vdp-bank` | **Ansar-VDP Development Bank** | Specialized state bank |
| `comc` | **Cumilla Medical College** | Public MC; Comilla in aliases |
| `rub` | **Rabindra University Bangladesh** | Full institutional name |
| `uftb` | **UFTB** | University of Frontier Technology; former BDU in aliases |
| `nins` | **NINS** | Neurosciences institute |
| `nidch` | **NIDCH** | Chest diseases institute |
| `tourism-board` | **Bangladesh Tourism Board** | National tourism promotion |
| `parjatan` | **Bangladesh Parjatan Corporation** | State tourism SOE |
| `parjatan-hotels` | **Parjatan Hotels** | Official booking host `hotels.gov.bd` |
| `beautiful-bangladesh` | **Beautiful Bangladesh** | Tourism branding portal |
| `btb-registration` | **BTB Registration** | Operator registration |
| `dss-bhata` | **DSS Bhata** | Social allowance MIS (vata); not civil pension |
| `cafopfm` | **CAFO Pension** | Civil pension & fund management |
| `ibas` | **iBAS++** | Integrated Budget and Accounting System |
| `sust` | **SUST** | Shahjalal University of Science and Technology |
| `krishi-bank` | **Bangladesh Krishi Bank** | Specialized state agricultural bank; BKB in aliases |
| `shsmc` | **Shaheed Suhrawardy Medical College** | Public MC; ShSMC in aliases |
| `szmc` | **Shaheed Ziaur Rahman Medical College** | Bogura public MC |
| `padma-oil` | **Padma Oil** | Petroleum marketing SOE |
| `bhbfc` | **BHBFC** | House Building Finance Corporation |
| `jbc` | **Jiban Bima Corporation** | State life insurer |
| `nimh` | **National Institute of Mental Health** | Specialty institute |
| `nikdu` | **NIKDU** | Kidney diseases & urology |
| `djmc` | **Dinajpur Medical College** | Public MC |
| `khulna-mc` | **Khulna Medical College** | Public MC |
| `dife` | **DIFE** | Factory inspection |
| `dncrp` | **DNCRP** | Consumer rights |
| `pabna-mc` | **Pabna Medical College** | Public MC |
| `jashore-mc` | **Jashore Medical College** | Public MC; Jessore alias |
| `habiganj-mc` | **Habiganj Medical College** | Public MC |
| `netrokona-mc` | **Netrokona Medical College** | Public MC |
| `afmc` | **AFMC** | Armed Forces Medical College |
| `nhtti` | **NHTTI** | Hotel & tourism training |
| `bangladesh-museum` | **Bangladesh National Museum** | National museum |
| `rda` | **RDA Bogura** | Rural Development Academy — not Rajshahi DA |
| `mora` | **MoRA** | Ministry of Religious Affairs |
| `moca` | **MoCA** | Ministry of Cultural Affairs |
| `mohpw` | **MoHPW** | Housing & Public Works |
| `mop` | **MoP** | Ministry of Planning |
| `dfp` | **DFP** | Films & Publications |
| `mass-communication` | **Mass Communication** | Mass Communication directorate |
| `fdc` | **FDC** | Film Development Corporation |
| `pib` | **PIB** | Press Institute Bangladesh |
| `press-council` | **Press Council** | Bangladesh Press Council |
| `dam` | **DAM** | Agricultural Marketing |
| `badc` | **BADC** | Agricultural Development Corporation |
| `bmda` | **BMDA** | Barind Multipurpose Development Authority |
| `milk-vita` | **Milk Vita** | Dairy cooperative union |
| `bsb` | **BSB** | Silk Development Board (not seed) |
| `hortex` | **Hortex** | Horticulture export foundation |
| `bifpcl` | **BIFPCL** | Bangladesh-India Friendship Power Company |
| `nipsom` | **NIPSOM** | Preventive & social medicine institute |
| `baera` | **BAERA** | Atomic energy regulator |
| `bnmc` | **BNMC** | Nursing & Midwifery Council |
| `dwa` | **DWA** | Department of Women Affairs |
| `jms` | **JMS** | Jatiya Mahila Sangstha |
| `dyd` | **DYD** | Department of Youth Development |
| `mofood` | **MoFood** | Food ministry short form |
| `dgfood` | **DG Food** | Directorate short form |
| `fisheries` | **DoF** | Department of Fisheries short form |
| `dlrs` | **DLRS** | Acronym ALL CAPS |

| `cpa` | **CPA** | Acronym; Chittagong Port Authority |
| `mpa` | **MPA** | Acronym; Mongla Port Authority |
| `highway-police` | **Highway Police** | Unit Display Name |
| `tourist-police` | **Tourist Police** | Unit Display Name |
| `bforest` | **Forest Department** | Institutional short name |
| `dls` | **DLS** | Acronym ALL CAPS |
| `bari` | **BARI** | Acronym ALL CAPS |
| `tcb` | **TCB** | Acronym ALL CAPS |
| `msw` | **MoSW** | Social Welfare short form |
| `dgnm` | **DGNM** | Acronym ALL CAPS |

| `mod` | **MoD** | Defence ministry short form |
| `army` | **Bangladesh Army** | Force Display Name |
| `navy` | **Bangladesh Navy** | Force Display Name |
| `baf` | **Bangladesh Air Force** | Force Display Name |
| `rpgcl` | **RPGCL** | Acronym ALL CAPS |
| `sonali` | **Sonali Bank** | State bank brand |
| `janata` | **Janata Bank** | State bank brand |
| `bcic` | **BCIC** | Acronym ALL CAPS |
| `idcol` | **IDCOL** | Acronym ALL CAPS |
| `pkb` | **PKB** | Probashi Kallyan Bank |
| `ru` | **University of Rajshahi** | Full institutional name; RU in aliases |
| `cu` | **University of Chittagong** | Full institutional name; CU in aliases |
| `kuet` | **KUET** | Acronym ALL CAPS |
| `cuet` | **CUET** | Acronym ALL CAPS |
| `bsmmu` | **BSMMU** | Acronym ALL CAPS |
| `bau` | **BAU** | Acronym ALL CAPS |
| `brri` | **BRRI** | Acronym ALL CAPS |
| `imed` | **IMED** | Acronym ALL CAPS |
| `pgcl` | **PGCL** | Acronym; not PGCB |
| `agrani` | **Agrani Bank** | State bank brand |

| `settlement` | **Settlement Office** | Land settlement Display Name |
| `nilg` | **NILG** | Acronym ALL CAPS |
| `coop` | **Department of Cooperatives** | Institutional name |
| `rdcd` | **RDCD** | Acronym ALL CAPS |
| `motj` | **MoTJ** | Textiles & Jute short form |
| `bjmc` | **BJMC** | Acronym ALL CAPS |
| `hcu` | **HCU** | Acronym ALL CAPS |
| `emrd` | **EMRD** | Acronym ALL CAPS |
| `sid` | **SID** | Acronym ALL CAPS |
| `bepza` | **BEPZA** | Acronym ALL CAPS |
| `duet` | **DUET** | Acronym ALL CAPS |
| `sau` | **SAU** | Acronym; Sher-e-Bangla Agricultural Uni |
| `ku` | **Khulna University** | Full name; KU in aliases |
| `jnu` | **Jagannath University** | Full institutional name |
| `iu` | **Islamic University** | Public uni Kushtia |
| `hstu` | **HSTU** | Acronym ALL CAPS |
| `egcb` | **EGCB** | Acronym ALL CAPS |
| `apscl` | **APSCL** | Acronym ALL CAPS |
| `cpgcbl` | **CPGCBL** | Acronym ALL CAPS |
| `bksp` | **BKSP** | Acronym ALL CAPS |

| `bfri` | **BFRI** | Forest Research Institute (not fisheries FRI) |
| `fri` | **FRI** | Fisheries Research Institute |
| `bjri` | **BJRI** | Acronym ALL CAPS |
| `bsri` | **BSRI** | Acronym ALL CAPS |
| `cid` | **CID** | Acronym ALL CAPS |
| `emis` | **EMIS** | Acronym ALL CAPS |
| `btv` | **BTV** | Acronym ALL CAPS |
| `betar` | **Bangladesh Betar** | State radio Display Name |
| `bss` | **BSS** | Acronym ALL CAPS |
| `nhrc` | **NHRC** | Acronym ALL CAPS |
| `pstu` | **PSTU** | Acronym ALL CAPS |
| `mbstu` | **MBSTU** | Acronym ALL CAPS |
| `butex` | **BUTEX** | Acronym ALL CAPS |
| `gau` | **GAU** | Gazipur Agricultural Uni; BSMRAU is `former` |
| `cou` | **Comilla University** | Full institutional name; COU in aliases |
| `just` | **JUST** | Acronym ALL CAPS |
| `ruet` | **RUET** | Acronym ALL CAPS |
| `bup` | **BUP** | Acronym ALL CAPS |
| `mist` | **MIST** | Acronym ALL CAPS |
| `nstu` | **NSTU** | Acronym ALL CAPS |

| `fima` | **FIMA** | Acronym ALL CAPS |
| `basic-bank` | **BASIC Bank** | State bank brand; BASIC stays ALL CAPS |
| `rakub` | **RAKUB** | Acronym ALL CAPS |
| `ppa` | **PPA** | Payra Port Authority |
| `bsc` | **BSC** | Shipping Corporation; not BSTI/BSCIC |
| `baec` | **BAEC** | Acronym ALL CAPS |
| `bitac` | **BITAC** | Acronym ALL CAPS |
| `bbs` | **BBS** | Acronym ALL CAPS |
| `ntrca` | **NTRCA** | Acronym ALL CAPS |
| `bangla-academy` | **Bangla Academy** | Institutional Display Name |
| `shilpakala` | **Shilpakala Academy** | Short institutional name |
| `archaeology` | **Department of Archaeology** | Directorate Display Name |
| `bu` | **University of Barishal** | Full name; BU in aliases |
| `legislativediv` | **Legislative Division** | Short division name |
| `pbi` | **PBI** | Acronym ALL CAPS |
| `mos` | **MoS** | Shipping ministry short form |
| `textiles` | **Department of Textiles** | Not telecom DoT |
| `dmc` | **Dhaka Medical College** | Full institutional name |
| `rmc` | **Rajshahi Medical College** | Full institutional name |
| `somc` | **SOMC** | Sylhet MAG Osmani Medical College |

| `ssmc` | **SSMC** | Sir Salimullah Medical College |
| `fmc` | **Faridpur Medical College** | Full institutional name |
| `mymensingh-mc` | **Mymensingh Medical College** | Full name; avoid bare MMC clash |
| `bcps` | **BCPS** | Acronym ALL CAPS |
| `bmrc` | **BMRC** | Acronym ALL CAPS |
| `police-staff-college` | **Police Staff College** | Not BPSC |
| `barc` | **BARC** | Agricultural Research Council; not BARI |
| `bina` | **BINA** | Acronym ALL CAPS |
| `srdi` | **SRDI** | Acronym ALL CAPS |
| `blri` | **BLRI** | Acronym ALL CAPS |
| `warpo` | **WARPO** | Acronym ALL CAPS |
| `bfdc` | **BFDC** | Acronym ALL CAPS |
| `bteb` | **BTEB** | Acronym ALL CAPS |
| `bmeb` | **BMEB** | Acronym ALL CAPS |
| `dhaka-board` | **Dhaka Education Board** | Institutional board name |
| `ictd` | **ICTD** | ICT Division short form |
| `ais` | **AIS** | Agriculture Information Service |
| `sca` | **SCA** | Seed Certification Agency |
| `fid` | **FID** | Financial Institutions Division |
| `dos` | **DoS** | Department of Shipping short form |

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
