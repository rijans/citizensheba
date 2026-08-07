# Service catalog backlog

> **Catalog Backlog** (glossary: `CONTEXT.md`). Working list of Official Service candidates vs shipped hops.  
> **Design:** [`docs/superpowers/specs/2026-08-07-official-services-priority-wave-design.md`](../superpowers/specs/2026-08-07-official-services-priority-wave-design.md).  
> **Published Services:** `src/content/services/*.md` — this file is not a content collection.

**Partner listing (not Official):** Industry / trade associations (e.g. BASIS, FBCCI, BGMEA-class) are **Partner candidates** under [ADR-0013](../adr/0013-partner-listing.md) — do **not** add them as Official `candidate` rows here. No separate Partner backlog file until a Partner ship wave. Instant Directory stays Official-only.

**Statuses:** `candidate` → `drafting` → `ready` → `shipped` | `skip` (`skip` needs a reason).

## Verification 2026-08-07

Outbound check: `curl -sS -o /dev/null -w '%{http_code}' -L --max-time 25` from dev environment (strict TLS verify).

| Service | Candidate URL | HTTP | Chosen outbound URL | Notes |
|---------|---------------|------|---------------------|-------|
| DESCO | `https://www.desco.org.bd/` | 000 (DNS) | `https://ocsms.desco.org.bd/home` | Alternate official customer system; **200** |
| Dhaka WASA | `https://consumer-portal.dhakawasa.org/` | 000 | `https://consumer-portal.dhakawasa.org/` | TLS handshake fail (`dh key too small`); keep portal URL — manual/browser check before ship |
| Titas Gas | `https://titasgas.gov.bd/` | 000 | `https://titasgas.gov.bd/` | TLS verify fail (incomplete chain); HTTP→308→HTTPS same issue |
| DPDC | `https://dpdc.org.bd/public/service/ebill` | **200** | same | e-bill hop confirmed |
| NESCO | `https://customer.nesco.gov.bd/` | **200** | same | Customer portal confirmed |
| BMET OC | `https://oc.bmet.gov.bd/` | 000 | `https://oc.bmet.gov.bd/` | HTTPS TLS verify fail; plain HTTP returns **404** — manual check before ship |
| Bangladesh visa (MRV) | `https://visa.gov.bd/` | 000 | `https://visa.gov.bd/` | Connection reset by peer; no working alternate found in this run |
| Fire Service | `https://fireservice.gov.bd/` | 000 | `https://fireservice.gov.bd/` | TLS verify fail (incomplete chain) |
| e-Court | `https://ecourt.gov.bd/` | **200** | same | Judiciary portal confirmed |

## Already shipped (catalog today)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| A2I | a2i / bd-a2i | central | https://a2i.gov.bd/ | shipped | catalog | |
| Birth & Death Registration (BDRIS) | bdris / bd-bdris | identity | https://bdris.gov.bd/ | shipped | catalog | |
| BRTA Service Portal (BSP) | brta / bd-brta | transport | https://bsp.brta.gov.bd/ | shipped | catalog | |
| DGHS | dghs / bd-dghs | health | https://dghs.gov.bd/ | shipped | catalog | |
| e-Porcha (Khatian & Mouza Map) | eporcha / bd-eporcha | land | https://eporcha.gov.bd/ | shipped | catalog | Keep official hop even if NXDOMAIN/flaky; change only if confirmed successor |
| Education Board Results | edu-results / bd-edu-results | education | https://www.educationboardresults.gov.bd/ | shipped | catalog | HTTPS |
| e-Passport Portal | epassport / bd-epassport | identity | https://www.epassport.gov.bd/ | shipped | catalog | |
| XI Class Admission | xi-admission / bd-xi-admission | education | http://www.xiclassadmission.gov.bd/ | shipped | catalog | Keep until confirmed successor official URL |
| e-Return (Online Tax Submission) | ereturn / bd-ereturn | tax | https://etaxnbr.gov.bd/ | shipped | catalog | |
| NBR e-TIN Registration | etin / bd-etin | tax | https://secure.incometax.gov.bd/ | shipped | catalog | |
| Ministry of Land Portal | land-portal / bd-land-portal | land | https://www.land.gov.bd/ | shipped | catalog | |
| Land Development Tax (LD Tax) | ldtax / bd-ldtax | land | https://ldtax.gov.bd/ | shipped | catalog | |
| myGov | mygov / bd-mygov | central | https://www.mygov.bd/ | shipped | catalog | |
| e-Namjari (Mutation) | namjari / bd-namjari | land | https://mutation.land.gov.bd/ | shipped | catalog | |
| Bangladesh National Portal | national-portal / bd-national-portal | central | https://bangladesh.gov.bd/ | shipped | catalog | |
| NID Services | nid / bd-nid | identity | https://services.nidw.gov.bd/nid-pub/ | shipped | catalog | |
| Bangladesh Police | police / bd-police | safety | https://www.police.gov.bd/ | shipped | catalog | |
| Bangladesh Railway e-Ticket | railway / bd-railway | transport | https://eticket.railway.gov.bd/ | shipped | catalog | |
| Surokkha | surokkha / bd-surokkha | health | https://surokkha.gov.bd/ | shipped | catalog | |
| Teachers' Portal | teachers-portal / bd-teachers-portal | education | https://www.teachers.gov.bd/ | shipped | catalog | |

## Priority wave — musts

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| DESCO | desco / bd-desco | utilities | `https://ocsms.desco.org.bd/home` | shipped | gap-list | Must; verified 200 (primary `www.desco.org.bd` DNS fail) |
| Dhaka WASA | dhaka-wasa / bd-dhaka-wasa | utilities | `https://consumer-portal.dhakawasa.org/` | shipped | gap-list | Must; curl TLS fail — confirm in browser |
| Titas Gas | titas-gas / bd-titas-gas | utilities | `https://titasgas.gov.bd/` | shipped | gap-list | Must; curl TLS chain fail — confirm in browser |
| BMET Online Clearance | bmet / bd-bmet | migration | `https://oc.bmet.gov.bd/` | shipped | gap-list | Keep official OC hop; destination TLS is on BMET — change only if confirmed successor |
| Bangladesh Online Visa (MRV) | bangladesh-visa / bd-bangladesh-visa | migration | `https://visa.gov.bd/` | shipped | gap-list | Must; connection reset from verifier |

## Research-first / fill slots

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| DPDC | dpdc / bd-dpdc | utilities | `https://dpdc.org.bd/public/service/ebill` | shipped | gap-list | Verified **200** |
| NESCO | nesco / bd-nesco | utilities | `https://customer.nesco.gov.bd/` | shipped | gap-list | Verified **200** |
| e-Court / judiciary | ecourt / bd-ecourt | justice (if ships) | `https://ecourt.gov.bd/` | shipped | gap-list | Verified **200** |
| Fire Service & Civil Defence | fire-service / bd-fire-service | safety | `https://fireservice.gov.bd/` | shipped | gap-list | curl TLS fail — confirm in browser |


## Priority wave 2 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| ekPay | ekpay / bd-ekpay | central | https://ekpay.gov.bd/ | shipped | gap-list | Verified 200 |
| BREB | breb / bd-breb | utilities | https://reb.gov.bd/ | shipped | gap-list | Verified 200 |
| RJSC | rjsc / bd-rjsc | central | https://roc.gov.bd/ | shipped | gap-list | Verified 200 |
| myBTCL | btcl / bd-btcl | utilities | https://mybtcl.btcl.gov.bd/ | shipped | gap-list | Verified 200 |
| BIDA | bida / bd-bida | central | https://investbangladesh.gov.bd/ | shipped | gap-list | Verified 200 (OSS 403) |
| Bangladesh Hajj | hajj / bd-hajj | migration | https://hajj.gov.bd/ | shipped | gap-list | Verified 200 |
| Bangladesh Post | bangladesh-post / bd-bangladesh-post | central | https://bangladeshpost.gov.bd/ | shipped | gap-list | Verified 200 |
| CAAB | caab / bd-caab | transport | https://caab.gov.bd/ | shipped | gap-list | Verified 200 |
| WZPDCL | wzpdcl / bd-wzpdcl | utilities | https://wzpdcl.org.bd/ | shipped | gap-list | Verified 200 |
| National University | national-university / bd-national-university | education | https://www.nu.ac.bd/ | shipped | gap-list | Verified 200 |
| WEWB | wewb / bd-wewb | migration | https://wewb.gov.bd/ | shipped | gap-list | Verified 200 |
| Bangladesh Customs | customs / bd-customs | tax | https://customs.gov.bd/ | shipped | gap-list | Verified 200 |


## Priority wave 3 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| Bangladesh Open University | bou / bd-bou | education | https://www.bou.ac.bd/ | shipped | gap-list | Verified 200 |
| Probashi Kalyan | probashi / bd-probashi | migration | https://probashi.gov.bd/ | shipped | gap-list | Verified 200 |
| Bangladesh Bank | bangladesh-bank / bd-bangladesh-bank | tax | https://www.bb.org.bd/ | shipped | gap-list | Verified 200 |
| BPDB | bpdb / bd-bpdb | utilities | https://www.bpdb.gov.bd/ | shipped | gap-list | Verified 200 |
| BTRC | btrc / bd-btrc | utilities | https://btrc.gov.bd/ | shipped | gap-list | Verified 200 |
| UGC | ugc / bd-ugc | education | https://www.ugc.gov.bd/ | shipped | gap-list | Verified 200 |
| DSHE | dshe / bd-dshe | education | https://dshe.gov.bd/ | shipped | gap-list | Verified 200 |
| DGDA | dgda / bd-dgda | health | https://dgda.gov.bd/ | shipped | gap-list | Verified 200 |
| e-GP | eprocure / bd-eprocure | central | https://www.eprocure.gov.bd/ | shipped | gap-list | Verified 200 |
| BIWTC | biwtc / bd-biwtc | transport | https://biwtc.gov.bd/ | shipped | gap-list | Verified 200 |
| BIWTA | biwta / bd-biwta | transport | https://biwta.gov.bd/ | shipped | gap-list | Verified 200 |
| Biman Bangladesh Airlines | biman / bd-biman | transport | https://biman.gov.bd/ | shipped | gap-list | Verified 200 |
| DIP | dip / bd-dip | identity | https://dip.gov.bd/ | shipped | gap-list | Verified 200 |
| NCTB | nctb / bd-nctb | education | https://nctb.gov.bd/ | shipped | gap-list | Verified 200 |
| BFSA | bfsa / bd-bfsa | health | https://bfsa.gov.bd/ | shipped | gap-list | Verified 200 |
| RAB | rab / bd-rab | safety | https://www.rab.gov.bd/ | shipped | gap-list | Verified 200 |
| IEDCR | iedcr / bd-iedcr | health | https://iedcr.gov.bd/ | shipped | gap-list | Verified 200 |


## Priority wave 4 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| VAT Online | vat / bd-vat | tax | https://www.vat.gov.bd/ | shipped | gap-list | Verified 200 |
| BCC | bcc / bd-bcc | central | https://www.bcc.gov.bd/ | shipped | gap-list | Verified 200 |
| DoICT | doict / bd-doict | central | https://doict.gov.bd/ | shipped | gap-list | Verified 200 |
| Ministry of Education | moedu / bd-moedu | education | https://moedu.gov.bd/ | shipped | gap-list | Verified 200 |
| MoPME | mopme / bd-mopme | education | https://mopme.gov.bd/ | shipped | gap-list | Verified 200 |
| TMED | tmed / bd-tmed | education | https://tmed.gov.bd/ | shipped | gap-list | Verified 200 |
| University of Dhaka | du / bd-du | education | https://www.du.ac.bd/ | shipped | gap-list | Verified 200 |
| BUET | buet / bd-buet | education | https://www.buet.ac.bd/ | shipped | gap-list | Verified 200 |
| DGFP | dgfp / bd-dgfp | health | https://dgfp.gov.bd/ | shipped | gap-list | Verified 200 |
| EPB | epb / bd-epb | central | https://epb.gov.bd/ | shipped | gap-list | Verified 200 |
| BSCIC | bscic / bd-bscic | central | https://bscic.gov.bd/ | shipped | gap-list | Verified 200 |
| PGCB | pgcb / bd-pgcb | utilities | https://pgcb.gov.bd/ | shipped | gap-list | Verified 200 |
| BERC | berc / bd-berc | utilities | https://berc.org.bd/ | shipped | gap-list | Verified 200 |
| BMD | bmd / bd-bmd | central | https://www.bmd.gov.bd/ | shipped | gap-list | Verified 200 |
| FFWC | ffwc / bd-ffwc | safety | https://www.ffwc.gov.bd/ | shipped | gap-list | Verified 200 |
| MoDMR | modmr / bd-modmr | safety | https://modmr.gov.bd/ | shipped | gap-list | Verified 200 |
| RTHD | rthd / bd-rthd | transport | https://rthd.gov.bd/ | shipped | gap-list | Verified 200 |
| DSS | dss / bd-dss | central | https://dss.gov.bd/ | shipped | gap-list | Verified 200 |
| MoWCA | mowca / bd-mowca | central | https://mowca.gov.bd/ | shipped | gap-list | Verified 200 |
| Supreme Court | supremecourt / bd-supremecourt | justice | https://www.supremecourt.gov.bd/ | shipped | gap-list | Verified 200 |
| Law and Justice Division | lawjusticediv / bd-lawjusticediv | justice | https://lawjusticediv.gov.bd/ | shipped | gap-list | Verified 200 |
| Bangladesh Coast Guard | coastguard / bd-coastguard | safety | https://coastguard.gov.bd/ | shipped | gap-list | Verified 200 |
| DAE | dae / bd-dae | central | https://dae.gov.bd/ | shipped | gap-list | Verified 200 |
| BANBEIS | banbeis / bd-banbeis | education | https://banbeis.gov.bd/ | shipped | gap-list | Verified 200 |

## Priority wave 30 — metro police + printing fix (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| Dhaka Metropolitan Police | dmp / bd-dmp | safety | https://www.dmp.gov.bd/ | shipped | gap-list | Verified 200 |
| Chattogram Metropolitan Police | cmp / bd-cmp | safety | https://www.cmp.gov.bd/ | shipped | gap-list | Verified 200 |
| Rajshahi Metropolitan Police | rmp / bd-rmp | safety | https://www.rmp.gov.bd/ | shipped | gap-list | Verified 200 |
| Gazipur Metropolitan Police | gmp / bd-gmp | safety | https://www.gmp.gov.bd/ | shipped | gap-list | Verified 200 |
| Rangpur Metropolitan Police | rpmp / bd-rpmp | safety | https://www.rpmp.gov.bd/ | shipped | gap-list | Verified 200 |
| Department of Printing and Publications | printing / bd-printing | central | https://www.dpp.gov.bd/ | shipped | gap-list | Corrects prior mislabeled prosecutions hop |

## Priority wave 29 — citizen + institutional portals (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| Bangladesh Judiciary | judiciary / bd-judiciary | justice | https://judiciary.gov.bd/ | shipped | gap-list | Verified 200 |
| DPDT | dpdt / bd-dpdt | central | https://dpdt.gov.bd/ | shipped | gap-list | Patents/designs/trademarks; verified 200 |
| Muktopaath | muktopaath / bd-muktopaath | education | https://muktopaath.gov.bd/ | shipped | gap-list | Gov e-learning; verified 200 |
| BMDC | bmdc / bd-bmdc | health | https://www.bmdc.org.bd/ | shipped | gap-list | Medical & Dental Council; verified 200 |
| PKSF | pksf / bd-pksf | central | https://www.pksf-bd.org/ | shipped | gap-list | Half-gov apex foundation; verified 200 |
| MoFA Consular Services | consular / bd-consular | central | https://consular.mofa.gov.bd/ | shipped | gap-list | Verified 200 |
| GST Admission | gst-admission / bd-gst-admission | education | https://gstadmission.ac.bd/ | shipped | gap-list | Cluster uni admission; verified 200 |

## Priority wave 28 — citizen must (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| Online GD | online-gd / bd-online-gd | safety | https://gd.police.gov.bd/ | shipped | gap-list | Police General Diary; verified 200; high citizen demand |
| GRS | grs / bd-grs | central | https://www.grs.gov.bd/ | shipped | gap-list | Grievance Redress System; verified 200 |
| Cause List | causelist / bd-causelist | justice | https://causelist.judiciary.gov.bd/ | shipped | gap-list | Judiciary e-Causelist; verified 200 |
| e-Court | ecourt / bd-ecourt | justice | https://ecourt.gov.bd/ | shipped | catalog | Already shipped earlier; reconfirmed 200 |

## Remaining candidates

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| Utility siblings (other DISCOs / gas) | _(TBD)_ | utilities | _(confirm)_ | candidate | gap-list | GTCL/NWPGCL/KGDCL/Padma Oil/BPC still curl-fail |
| Other city corporations | _(TBD)_ | central | _(confirm)_ | candidate | gap-list | Wave 30 shipped KCC/Rajshahi/RPCC/COCC/Mymensingh; remaining pourashava/siblings TBD |
| More public unis / boards | _(TBD)_ | education | _(confirm)_ | candidate | gap-list | SUST 403; IUT skipped (OIC) |
| More half-gov / SOE / state banks | _(TBD)_ | mixed | _(confirm)_ | candidate | gap-list | BDBL.com for sale; private banks & MFS out |
| More public medical colleges | _(TBD)_ | health | _(confirm)_ | candidate | gap-list | SHSMC / Cumilla MC still fail; private Barind skipped |
| BG Press / BPATC / forms / museum | _(TBD)_ | central | _(confirm)_ | candidate | gap-list | curl fail; liberationwarmuseum.org hijacked — skip |
| Development authorities (RAJUK/CDA/KDA/RDA) | _(TBD)_ | central | _(confirm)_ | candidate | gap-list | Wave 30 shipped RAJUK/CDA/KDA; Rajshahi DA outbound still unconfirmed (rda.gov.bd is Rural Development Academy Bogura — do not use) |
| Skip notes | — | — | — | skipped | gap-list | IUT (OIC); private Barind MC; `smc.edu.bd` junk; `afmcbd.com` for sale; `nitor.org` wrong (DE pest control); icddr,b international |
| Industry / trade associations (BASIS, …) | — | — | — | — | partner | **Not Official** — Partner candidates (ADR-0013); do not seed as Official rows |

## Priority wave 30 — RAJUK + city corps (2026-08-08)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| RAJUK | rajuk / bd-rajuk | central | https://rajuk.gov.bd/ | shipped | gap-list | Verified 200 (TLS chain soft); capital development authority |
| CDA | cda / bd-cda | central | https://cda.gov.bd/ | shipped | gap-list | Chattogram Development Authority; verified 200 |
| KDA | kda / bd-kda | central | https://kda.gov.bd/ | shipped | gap-list | Khulna Development Authority; verified 200 |
| KCC | kcc / bd-kcc | central | https://khulnacity.gov.bd/ | shipped | gap-list | Khulna City Corp; verified 200 |
| Rajshahi City Corporation | rajshahi-cc / bd-rajshahi-cc | central | https://erajshahi.portal.gov.bd/ | shipped | gap-list | Verified 200 |
| RPCC | rpcc / bd-rpcc | central | https://rpcc.gov.bd/ | shipped | gap-list | Rangpur City Corp; verified 200 |
| COCC | cocc / bd-cocc | central | https://cocc.portal.gov.bd/ | shipped | gap-list | Cumilla City Corp; verified 200 |
| Mymensingh City Corporation | mymensingh-cc / bd-mymensingh-cc | central | https://mcc.gov.bd/ | shipped | gap-list | Verified 200; not medical college |

## Priority wave 27 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| NICVD | nicvd / bd-nicvd | health | https://www.nicvd.gov.bd/ | shipped | gap-list | Verified 200 |
| NITOR | nitor / bd-nitor | health | https://www.nitor.gov.bd/ | shipped | gap-list | Verified 200; not nitor.org |
| NICRH | nicrh / bd-nicrh | health | https://www.nicrh.gov.bd/ | shipped | gap-list | Verified 200 |

## Priority wave 26 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| Directorate of Technical Education | techedu / bd-techedu | education | https://techedu.gov.bd/ | shipped | gap-list | DTE; verified 200 |
| CVASU | cvasu / bd-cvasu | education | https://cvasu.ac.bd/ | shipped | gap-list | Verified 200 |
| Sylhet Agricultural University | sylhet-au / bd-sylhet-au | education | https://sau.ac.bd/ | shipped | gap-list | Distinct from SAU Dhaka; verified 200 |
| JSTU | jstu / bd-jstu | education | https://www.bsfmstu.ac.bd/ | shipped | gap-list | Jamalpur S&T; domain still bsfmstu.ac.bd |
| Naogaon Polytechnic | npi / bd-npi | education | https://www.npi.gov.bd/ | shipped | gap-list | Verified 200 |
| Dinajpur Polytechnic | dinajpur-poly / bd-dinajpur-poly | education | https://www.dpi.edu.bd/ | shipped | gap-list | Verified 200; not DPE |
| Sylhet City Corporation | scc / bd-scc | central | https://www.scc.gov.bd/ | shipped | gap-list | Verified 200 |

## Priority wave 25 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| PUST | pust / bd-pust | education | https://www.pust.ac.bd/ | shipped | gap-list | Verified 200 |
| GSTU | gstu / bd-gstu | education | https://www.gstu.edu.bd/ | shipped | gap-list | Verified 200 |
| BAUET | bauet / bd-bauet | education | https://www.bauet.ac.bd/ | shipped | gap-list | Army engineering uni (half-gov); verified 200 |
| Rupali Bank | rupali / bd-rupali | tax | https://www.rupalibank.com/ | shipped | gap-list | State bank; verified 200 (was previously 403) |

## Priority wave 24 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| Chittagong Medical College | cmc / bd-cmc | health | https://www.cmc.gov.bd/ | shipped | gap-list | Verified 200 |
| Rangpur Medical College | rangpur-mc / bd-rangpur-mc | health | https://www.rpmc.edu.bd/ | shipped | gap-list | Verified 200 |
| Chittagong Medical University | cmu / bd-cmu | health | https://www.cmu.edu.bd/ | shipped | gap-list | Verified 200 |
| Rajshahi Medical University | rmu / bd-rmu | health | https://www.rmu.edu.bd/ | shipped | gap-list | Verified 200 |
| Jahangirnagar University | ju / bd-ju | education | https://www.juniv.edu/ | shipped | gap-list | Verified 200 |
| Begum Rokeya University | brur / bd-brur | education | https://www.brur.ac.bd/ | shipped | gap-list | Verified 200 |
| Bangladesh Maritime University | bsmrmu / bd-bsmrmu | education | https://www.bsmrmu.edu.bd/ | shipped | gap-list | BMU; verified 200 |
| JKKNIU | jkkniu / bd-jkkniu | education | https://www.jkkniu.edu.bd/ | shipped | gap-list | Verified 200 |

## Priority wave 23 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| Rajshahi Education Board | rajshahi-board / bd-rajshahi-board | education | https://rajshahiboard.gov.bd/ | shipped | gap-list | Verified 200 |
| Jashore Education Board | jashore-board / bd-jashore-board | education | https://www.jessoreboard.gov.bd/ | shipped | gap-list | Verified 200; former Jessore |
| Sylhet Education Board | sylhet-board / bd-sylhet-board | education | https://sylhetboard.gov.bd/ | shipped | gap-list | Verified 200 |
| Cumilla Education Board | comilla-board / bd-comilla-board | education | https://comillaboard.gov.bd/ | shipped | gap-list | Verified 200; former Comilla |
| Barishal Education Board | barishal-board / bd-barishal-board | education | https://barisalboard.gov.bd/ | shipped | gap-list | Verified 200 |
| Dinajpur Education Board | dinajpur-board / bd-dinajpur-board | education | https://dinajpureducationboard.gov.bd/ | shipped | gap-list | Verified 200 |
| Mymensingh Education Board | mymensingh-board / bd-mymensingh-board | education | https://www.mymensingheducationboard.gov.bd/ | shipped | gap-list | Verified 200 |

## Priority wave 22 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| WARPO | warpo / bd-warpo | utilities | https://www.warpo.gov.bd/ | shipped | gap-list | Water resources planning |
| BFDC | bfdc / bd-bfdc | central | https://www.bfdc.gov.bd/ | shipped | gap-list | Fisheries Development Corp (SOE) |
| BTEB | bteb / bd-bteb | education | https://www.bteb.gov.bd/ | shipped | gap-list | Technical Education Board |
| BMEB | bmeb / bd-bmeb | education | https://www.bmeb.gov.bd/ | shipped | gap-list | Madrasah Education Board |
| Dhaka Education Board | dhaka-board / bd-dhaka-board | education | https://www.dhakaeducationboard.gov.bd/ | shipped | gap-list | BISE Dhaka |
| ICTD | ictd / bd-ictd | central | https://www.ictd.gov.bd/ | shipped | gap-list | ICT Division |
| AIS | ais / bd-ais | central | https://www.ais.gov.bd/ | shipped | gap-list | Agriculture Information Service |
| SCA | sca / bd-sca | central | https://www.sca.gov.bd/ | shipped | gap-list | Seed Certification Agency |
| FID | fid / bd-fid | tax | https://www.fid.gov.bd/ | shipped | gap-list | Financial Institutions Division |
| DoS | dos / bd-dos | transport | https://www.dos.gov.bd/ | shipped | gap-list | Department of Shipping |

## Priority wave 21 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| SSMC | ssmc / bd-ssmc | health | https://www.ssmc.edu.bd/ | shipped | gap-list | Sir Salimullah Medical College |
| Faridpur Medical College | fmc / bd-fmc | health | https://www.fmc.edu.bd/ | shipped | gap-list | Public medical college |
| Mymensingh Medical College | mymensingh-mc / bd-mymensingh-mc | health | https://www.mmc.gov.bd/ | shipped | gap-list | Use mmc.gov.bd (not mmc.edu.bd) |
| BCPS | bcps / bd-bcps | health | https://www.bcps.edu.bd/ | shipped | gap-list | Physicians & Surgeons college |
| BMRC | bmrc / bd-bmrc | health | https://www.bmrcbd.org/ | shipped | gap-list | Medical Research Council |
| Police Staff College | police-staff-college / bd-police-staff-college | safety | https://www.psc.gov.bd/ | shipped | gap-list | Not BPSC |
| BARC | barc / bd-barc | central | https://www.barc.gov.bd/ | shipped | gap-list | Agricultural Research Council |
| BINA | bina / bd-bina | central | https://www.bina.gov.bd/ | shipped | gap-list | Nuclear agriculture institute |
| SRDI | srdi / bd-srdi | central | https://www.srdi.gov.bd/ | shipped | gap-list | Soil Resource Development Institute |
| BLRI | blri / bd-blri | central | https://www.blri.gov.bd/ | shipped | gap-list | Livestock Research Institute |

## Priority wave 20 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| Shilpakala Academy | shilpakala / bd-shilpakala | central | https://www.shilpakala.gov.bd/ | shipped | gap-list | Fine arts academy |
| Department of Archaeology | archaeology / bd-archaeology | central | https://www.archaeology.gov.bd/ | shipped | gap-list | Heritage directorate |
| University of Barishal | bu / bd-bu | education | https://www.bu.ac.bd/ | shipped | gap-list | Public university |
| Legislative Division | legislativediv / bd-legislativediv | justice | https://www.legislativediv.gov.bd/ | shipped | gap-list | Legislative & Parliamentary Affairs |
| PBI | pbi / bd-pbi | safety | https://pbi.gov.bd/ | shipped | gap-list | Police Bureau of Investigation |
| MoS | mos / bd-mos | transport | https://www.mos.gov.bd/ | shipped | gap-list | Ministry of Shipping |
| Department of Textiles | textiles / bd-textiles | central | https://www.dot.gov.bd/ | shipped | gap-list | Textiles directorate (not telecom) |
| Dhaka Medical College | dmc / bd-dmc | health | https://www.dmc.edu.bd/ | shipped | gap-list | Public medical college |
| Rajshahi Medical College | rmc / bd-rmc | health | https://www.rmc.edu.bd/ | shipped | gap-list | Public medical college |
| SOMC | somc / bd-somc | health | https://www.somc.edu.bd/ | shipped | gap-list | Sylhet MAG Osmani Medical College |

## Priority wave 19 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| FIMA | fima / bd-fima | central | https://www.fima.gov.bd/ | shipped | gap-list | Financial Management Academy |
| BASIC Bank | basic-bank / bd-basic-bank | tax | https://www.basicbanklimited.com/ | shipped | gap-list | State bank (half-gov) |
| RAKUB | rakub / bd-rakub | tax | https://www.rakub.org.bd/ | shipped | gap-list | State specialized agri bank |
| PPA | ppa / bd-ppa | transport | https://www.ppa.gov.bd/ | shipped | gap-list | Payra Port Authority |
| BSC | bsc / bd-bsc | transport | https://www.bsc.gov.bd/ | shipped | gap-list | Shipping Corporation (SOE) |
| BAEC | baec / bd-baec | central | https://www.baec.gov.bd/ | shipped | gap-list | Atomic Energy Commission |
| BITAC | bitac / bd-bitac | central | https://www.bitac.gov.bd/ | shipped | gap-list | Industrial technical assistance |
| BBS | bbs / bd-bbs | central | https://www.bbs.gov.bd/ | shipped | gap-list | Bureau of Statistics |
| NTRCA | ntrca / bd-ntrca | education | https://www.ntrca.gov.bd/ | shipped | gap-list | Non-gov teachers registration |
| Bangla Academy | bangla-academy / bd-bangla-academy | central | https://banglaacademy.gov.bd/ | shipped | gap-list | National language academy |

## Priority wave 18 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| PSTU | pstu / bd-pstu | education | https://www.pstu.ac.bd/ | shipped | gap-list | Public S&T uni |
| MBSTU | mbstu / bd-mbstu | education | https://www.mbstu.ac.bd/ | shipped | gap-list | Public S&T uni |
| BUTEX | butex / bd-butex | education | https://www.butex.edu.bd/ | shipped | gap-list | Textiles university |
| GAU | gau / bd-gau | education | https://www.gau.edu.bd/ | shipped | gap-list | Gazipur Agricultural Uni (ex-BSMRAU) |
| Comilla University | cou / bd-cou | education | https://www.cou.ac.bd/ | shipped | gap-list | Public university |
| JUST | just / bd-just | education | https://www.just.edu.bd/ | shipped | gap-list | Jashore S&T uni |
| RUET | ruet / bd-ruet | education | https://www.ruet.ac.bd/ | shipped | gap-list | Engineering university |
| BUP | bup / bd-bup | education | https://www.bup.edu.bd/ | shipped | gap-list | Public university |
| MIST | mist / bd-mist | education | https://www.mist.ac.bd/ | shipped | gap-list | Military institute (half-gov) |
| NSTU | nstu / bd-nstu | education | https://www.nstu.edu.bd/ | shipped | gap-list | Public S&T uni |

## Priority wave 17 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| BFRI | bfri / bd-bfri | central | https://www.bfri.gov.bd/ | shipped | gap-list | Forest Research Institute (not fisheries) |
| FRI | fri / bd-fri | central | https://www.fri.gov.bd/ | shipped | gap-list | Fisheries Research Institute |
| BJRI | bjri / bd-bjri | central | https://www.bjri.gov.bd/ | shipped | gap-list | Jute Research Institute |
| BSRI | bsri / bd-bsri | central | https://www.bsri.gov.bd/ | shipped | gap-list | Sugarcrop Research Institute |
| CID | cid / bd-cid | safety | https://www.cid.gov.bd/ | shipped | gap-list | Criminal Investigation Department |
| EMIS | emis / bd-emis | education | https://www.emis.gov.bd/ | shipped | gap-list | DSHE education MIS |
| BTV | btv / bd-btv | central | https://www.btv.gov.bd/ | shipped | gap-list | State television |
| Bangladesh Betar | betar / bd-betar | central | https://www.betar.gov.bd/ | shipped | gap-list | State radio |
| BSS | bss / bd-bss | central | https://www.bssnews.net/ | shipped | gap-list | National news agency |
| NHRC | nhrc / bd-nhrc | justice | https://www.nhrc.org.bd/ | shipped | gap-list | Human Rights Commission |

## Priority wave 16 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| DUET | duet / bd-duet | education | https://www.duet.ac.bd/ | shipped | gap-list | Public engineering uni |
| SAU | sau / bd-sau | education | https://www.sau.edu.bd/ | shipped | gap-list | Sher-e-Bangla Agricultural Uni |
| Khulna University | ku / bd-ku | education | https://www.ku.ac.bd/ | shipped | gap-list | Public university |
| Jagannath University | jnu / bd-jnu | education | https://www.jnu.ac.bd/ | shipped | gap-list | Public university |
| Islamic University | iu / bd-iu | education | https://www.iu.ac.bd/ | shipped | gap-list | Public university (Kushtia) |
| HSTU | hstu / bd-hstu | education | https://www.hstu.ac.bd/ | shipped | gap-list | Science & technology uni |
| EGCB | egcb / bd-egcb | utilities | https://www.egcb.com.bd/ | shipped | gap-list | Half-gov generation company |
| APSCL | apscl / bd-apscl | utilities | https://www.apscl.com/ | shipped | gap-list | Half-gov Ashuganj generation |
| CPGCBL | cpgcbl / bd-cpgcbl | utilities | https://www.cpgcbl.gov.bd/ | shipped | gap-list | Half-gov coal generation |
| BKSP | bksp / bd-bksp | central | https://www.bksp.gov.bd/ | shipped | gap-list | Sports education institute |

## Priority wave 15 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| Settlement Office | settlement / bd-settlement | land | https://www.settlement.gov.bd/ | shipped | gap-list | Land settlement |
| NILG | nilg / bd-nilg | central | https://www.nilg.gov.bd/ | shipped | gap-list | Local gov training institute |
| Department of Cooperatives | coop / bd-coop | central | https://www.coop.gov.bd/ | shipped | gap-list | Cooperatives |
| RDCD | rdcd / bd-rdcd | central | https://www.rdcd.gov.bd/ | shipped | gap-list | Rural Development & Cooperative Div |
| MoTJ | motj / bd-motj | central | https://www.motj.gov.bd/ | shipped | gap-list | Textiles & Jute ministry |
| BJMC | bjmc / bd-bjmc | central | https://www.bjmc.gov.bd/ | shipped | gap-list | Jute Mills SOE (half-gov) |
| HCU | hcu / bd-hcu | utilities | https://www.hcu.org.bd/ | shipped | gap-list | Hydrocarbon Unit |
| EMRD | emrd / bd-emrd | utilities | https://www.emrd.gov.bd/ | shipped | gap-list | Energy & Mineral Resources Div |
| SID | sid / bd-sid | central | https://www.sid.gov.bd/ | shipped | gap-list | Statistics & Informatics Div |
| BEPZA | bepza / bd-bepza | central | https://www.bepza.gov.bd/ | shipped | gap-list | EPZ authority (half-gov) |

## Priority wave 14 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| University of Rajshahi | ru / bd-ru | education | https://www.ru.ac.bd/ | shipped | gap-list | Public university |
| University of Chittagong | cu / bd-cu | education | https://www.cu.ac.bd/ | shipped | gap-list | Public university |
| KUET | kuet / bd-kuet | education | https://www.kuet.ac.bd/ | shipped | gap-list | Engineering university |
| CUET | cuet / bd-cuet | education | https://www.cuet.ac.bd/ | shipped | gap-list | Engineering university |
| BSMMU | bsmmu / bd-bsmmu | education | https://www.bsmmu.edu.bd/ | shipped | gap-list | Medical university |
| BAU | bau / bd-bau | education | https://www.bau.edu.bd/ | shipped | gap-list | Agricultural university |
| BRRI | brri / bd-brri | central | https://www.brri.gov.bd/ | shipped | gap-list | Rice research institute |
| IMED | imed / bd-imed | central | https://www.imed.gov.bd/ | shipped | gap-list | Implementation monitoring |
| PGCL | pgcl / bd-pgcl | utilities | https://www.pgcl.org.bd/ | shipped | gap-list | Half-gov western gas utility |
| Agrani Bank | agrani / bd-agrani | tax | https://www.agranibank.org/ | shipped | gap-list | State-owned bank (half-gov) |

## Priority wave 13 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| MoD | mod / bd-mod | safety | https://www.mod.gov.bd/ | shipped | gap-list | Defence ministry |
| Bangladesh Army | army / bd-army | safety | https://www.army.mil.bd/ | shipped | gap-list | Armed forces |
| Bangladesh Navy | navy / bd-navy | safety | https://www.navy.mil.bd/ | shipped | gap-list | Armed forces |
| Bangladesh Air Force | baf / bd-baf | safety | https://www.baf.mil.bd/ | shipped | gap-list | Armed forces |
| RPGCL | rpgcl / bd-rpgcl | utilities | https://www.rpgcl.org.bd/ | shipped | gap-list | Half-gov CNG company |
| Sonali Bank | sonali / bd-sonali | tax | https://www.sonalibank.com.bd/ | shipped | gap-list | State-owned bank (half-gov) |
| Janata Bank | janata / bd-janata | tax | https://www.janatabank-bd.com/ | shipped | gap-list | State-owned bank (half-gov) |
| BCIC | bcic / bd-bcic | central | https://www.bcic.gov.bd/ | shipped | gap-list | Chemical Industries SOE |
| IDCOL | idcol / bd-idcol | utilities | https://www.idcol.org/ | shipped | gap-list | Half-gov infrastructure finance |
| PKB | pkb / bd-pkb | tax | https://www.pkb.gov.bd/ | shipped | gap-list | Probashi Kallyan Bank (state) |

## Priority wave 12 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| CPA | cpa / bd-cpa | transport | https://cpa.gov.bd/ | shipped | gap-list | Chittagong Port; verified 200 |
| MPA | mpa / bd-mpa | transport | https://www.mpa.gov.bd/ | shipped | gap-list | Mongla Port; verified 200 |
| Highway Police | highway-police / bd-highway-police | safety | https://www.highwaypolice.gov.bd/ | shipped | gap-list | Verified 200 |
| Tourist Police | tourist-police / bd-tourist-police | safety | https://www.touristpolice.gov.bd/ | shipped | gap-list | Verified 200 |
| Forest Department | bforest / bd-bforest | central | https://www.bforest.gov.bd/ | shipped | gap-list | Verified 200 |
| DLS | dls / bd-dls | central | https://www.dls.gov.bd/ | shipped | gap-list | Livestock Services |
| BARI | bari / bd-bari | central | https://www.bari.gov.bd/ | shipped | gap-list | Agricultural Research Institute |
| TCB | tcb / bd-tcb | central | https://www.tcb.gov.bd/ | shipped | gap-list | Trading Corporation / fair price |
| MoSW | msw / bd-msw | central | https://www.msw.gov.bd/ | shipped | gap-list | Social Welfare ministry |
| DGNM | dgnm / bd-dgnm | health | https://www.dgnm.gov.bd/ | shipped | gap-list | Nursing & Midwifery |

## Priority wave 11 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| Jatiya Sangsad | parliament / bd-parliament | central | https://www.parliament.gov.bd/ | shipped | gap-list | Parliament; verified 200 |
| MoInfo | moinfo / bd-moinfo | central | https://www.moi.gov.bd/ | shipped | gap-list | Information & Broadcasting (not Industries MoI) |
| PID | pid / bd-pid | central | https://www.pressinform.gov.bd/ | shipped | gap-list | Press Information Department |
| MoR | mor / bd-mor | transport | https://mor.gov.bd/ | shipped | gap-list | Railways ministry |
| SREDA | sreda / bd-sreda | utilities | https://www.sreda.gov.bd/ | shipped | gap-list | Renewable energy authority |
| SGCL | sgcl / bd-sgcl | utilities | https://www.sgcl.org.bd/ | shipped | gap-list | Sundarban Gas |
| Petrobangla | petrobangla / bd-petrobangla | utilities | https://petrobangla.org.bd/ | shipped | gap-list | Oil/gas corporation |
| MoFood | mofood / bd-mofood | central | https://mofood.gov.bd/ | shipped | gap-list | Food ministry |
| DG Food | dgfood / bd-dgfood | central | https://dgfood.gov.bd/ | shipped | gap-list | Food directorate |
| DoF | fisheries / bd-fisheries | central | https://fisheries.gov.bd/ | shipped | gap-list | Department of Fisheries |
| DLRS | dlrs / bd-dlrs | land | https://dlrs.gov.bd/ | shipped | gap-list | Land records & surveys |

## Priority wave 10 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| BSEC | bsec / bd-bsec | tax | https://bsec.gov.bd/ | shipped | gap-list | Securities commission; verified 200 |
| CGA | cga / bd-cga | tax | https://cga.gov.bd/ | shipped | gap-list | Controller General of Accounts |
| MoCHTA | mochta / bd-mochta | central | https://www.mochta.gov.bd/ | shipped | gap-list | CHT Affairs |
| MoCAT | mocat / bd-mocat | transport | https://mocat.gov.bd/ | shipped | gap-list | Civil Aviation & Tourism |
| MoLWA | molwa / bd-molwa | central | https://molwa.gov.bd/ | shipped | gap-list | Liberation War Affairs |
| ERD | erd / bd-erd | tax | https://erd.gov.bd/ | shipped | gap-list | Economic Relations Division |
| Power Division | power-division / bd-power-division | utilities | https://powerdivision.gov.bd/ | shipped | gap-list | Electricity policy hub |
| SHED | shed / bd-shed | education | https://shed.gov.bd/ | shipped | gap-list | Secondary & Higher Education Div |
| DoE | doe / bd-doe | central | https://doe.gov.bd/ | shipped | gap-list | Department of Environment |
| BPSC | bpsc / bd-bpsc | central | https://bpsc.gov.bd/ | shipped | gap-list | Public Service Commission / BCS |

## Priority wave 9 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| MoC | moc / bd-moc | central | https://mincom.gov.bd/ | shipped | gap-list | Commerce; verified 200 |
| MoI | moi / bd-moi | central | https://moind.gov.bd/ | shipped | gap-list | Industries; verified 200 |
| MoWR | mowr / bd-mowr | central | https://mowr.gov.bd/ | shipped | gap-list | Water Resources; verified 200 |
| MoEFCC | moef / bd-moef | central | https://moef.gov.bd/ | shipped | gap-list | Environment / climate; verified 200 |
| CAG | cag / bd-cag | central | https://cag.org.bd/ | shipped | gap-list | Auditor General; verified 200 |
| DNC | dnc / bd-dnc | safety | https://dnc.gov.bd/ | shipped | gap-list | Narcotics Control; verified 200 |
| MoYS | moys / bd-moys | central | https://moysports.gov.bd/ | shipped | gap-list | Youth & Sports; verified 200 |
| Bangladesh Jail | prison / bd-prison | safety | https://prison.gov.bd/ | shipped | gap-list | Prisons; verified 200 |
| MoST | most / bd-most | central | https://most.gov.bd/ | shipped | gap-list | Science & Technology; verified 200 |
| DPE | dpe / bd-dpe | education | https://dpe.gov.bd/ | shipped | gap-list | Primary Education; verified 200 |

## Priority wave 8 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| IRD | ird / bd-ird | tax | https://www.ird.gov.bd/ | shipped | gap-list | Internal Resources Division |
| Bangabhaban | bangabhaban / bd-bangabhaban | central | https://www.bangabhaban.gov.bd/ | shipped | gap-list | President’s Office |
| Ansar & VDP | ansar / bd-ansar | safety | https://ansarvdp.gov.bd/ | shipped | gap-list | Verified 200 |
| GCC | gcc / bd-gcc | central | https://gcc.gov.bd/ | shipped | gap-list | Gazipur City Corp |
| MoLE | mole / bd-mole | central | https://www.mole.gov.bd/ | shipped | gap-list | Labour & Employment |
| MoFL | mofl / bd-mofl | central | https://www.mofl.gov.bd/ | shipped | gap-list | Fisheries & Livestock |
| SPARRSO | sparrso / bd-sparrso | central | https://www.sparrso.gov.bd/ | shipped | gap-list | Remote sensing |
| Information Commission | infocom / bd-infocom | justice | https://www.infocom.gov.bd/ | shipped | gap-list | RTI commission |
| Barishal City Corporation | barishal-cc / bd-barishal-cc | central | https://barishalcity.gov.bd/ | shipped | gap-list | Avoid confusion with BCC ICT |
| NCC | ncc / bd-ncc | central | https://www.ncc.gov.bd/ | shipped | gap-list | Narayanganj City Corp |

## Priority wave 7 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| MoPA | mopa / bd-mopa | central | https://mopa.gov.bd/ | shipped | gap-list | Verified 200 |
| Cabinet Division | cabinet / bd-cabinet | central | https://www.cabinet.gov.bd/ | shipped | gap-list | Verified 200 |
| Planning Commission | plancomm / bd-plancomm | central | https://www.plancomm.gov.bd/ | shipped | gap-list | Verified 200 |
| Planning Division | planning / bd-planning | central | https://plandiv.gov.bd/ | shipped | gap-list | MoP public portal |
| NBR | nbr / bd-nbr | tax | https://nbr.portal.gov.bd/ | shipped | gap-list | Portal host; nbr.gov.bd 403 |
| LGD | lgd / bd-lgd | central | https://lgd.gov.bd/ | shipped | gap-list | Verified 200 |
| MoA | moa / bd-moa | central | https://www.moa.gov.bd/ | shipped | gap-list | Agriculture ministry |
| BSTI | bsti / bd-bsti | central | https://www.bsti.gov.bd/ | shipped | gap-list | Standards |
| BGB | bgb / bd-bgb | safety | https://bgb.gov.bd/ | shipped | gap-list | Border Guard |
| ACC | acc / bd-acc | justice | https://acc.org.bd/ | shipped | gap-list | Anti-Corruption Commission |

## Priority wave 6 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| MoHFW | mohfw / bd-mohfw | health | https://mohfw.gov.bd/ | shipped | gap-list | Health ministry |
| DNCC | dncc / bd-dncc | central | https://dncc.gov.bd/ | shipped | gap-list | Dhaka North |
| DSCC | dscc / bd-dscc | central | https://dscc.gov.bd/ | shipped | gap-list | Dhaka South |
| CCC | ccc / bd-ccc | central | https://ccc.gov.bd/ | shipped | gap-list | Chattogram City |
| Khulna WASA | khulna-wasa / bd-khulna-wasa | utilities | https://kwasa.portal.gov.bd/ | shipped | gap-list | Portal host |
| PWD | pwd / bd-pwd | central | https://www.pwd.gov.bd/ | shipped | gap-list | Public works |
| RHD | rhd / bd-rhd | transport | https://www.rhd.gov.bd/ | shipped | gap-list | Roads & Highways Dept |
| MoHA | mha / bd-mha | safety | https://mha.gov.bd/ | shipped | gap-list | Home Affairs |
| MoF | mof / bd-mof | tax | https://mof.gov.bd/ | shipped | gap-list | Finance ministry |
| PMO | pmo / bd-pmo | central | https://pmo.gov.bd/ | shipped | gap-list | Prime Minister’s Office |

## Priority wave 5 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| Election Commission | election-commission / bd-election-commission | identity | https://www.ecs.gov.bd/ | shipped | gap-list | curl 403 — browser confirm |
| Chattogram WASA | chattogram-wasa / bd-chattogram-wasa | utilities | https://ctg-wasa.org.bd/ | shipped | gap-list | Utility sibling |
| DMTCL | dmtcl / bd-dmtcl | transport | https://dmtcl.gov.bd/ | shipped | gap-list | Dhaka Metro |
| BRTC | brtc / bd-brtc | transport | https://brtc.gov.bd/ | shipped | gap-list | Road transport corp |
| BWDB | bwdb / bd-bwdb | utilities | https://www.bwdb.gov.bd/ | shipped | gap-list | Verified 200 |
| Teletalk | teletalk / bd-teletalk | utilities | https://www.teletalk.com.bd/ | shipped | gap-list | State telco; verified 200 |
| e-Nothi | enothi / bd-enothi | central | https://nothi.gov.bd/ | shipped | gap-list | Verified 200 |
| LGED | lged / bd-lged | central | https://www.lged.gov.bd/ | shipped | gap-list | curl flaky — browser confirm |
| DPP (prosecutions) | — | justice | — | skip | gap-list | Prior row mislabeled: `dpp.gov.bd` is Printing & Publications — now `printing`. True public-prosecutions portal still unconfirmed |
| Department of Printing and Publications | printing / bd-printing | central | https://www.dpp.gov.bd/ | shipped | gap-list | Gazettes / BG Press; verified 200 |
| MoFA | mofa / bd-mofa | central | https://mofa.gov.bd/ | shipped | gap-list | curl flaky — browser confirm |

## Skipped

| Working name | Reason | Notes |
|--------------|--------|-------|
| nagorikseba.com listings | non-Official / mixed private | Out of seed scope |
| Private banks / MFS | commercial | Catalog v1 Official only — **state-owned banks / SOEs / half-gov utilities are in scope** |

