# Service catalog backlog

> **Catalog Backlog** (glossary: `CONTEXT.md`). Working list of Official Service candidates vs shipped hops.  
> **Design:** [`docs/superpowers/specs/2026-08-07-official-services-priority-wave-design.md`](../superpowers/specs/2026-08-07-official-services-priority-wave-design.md).  
> **Published Services:** `src/content/services/*.md` — this file is not a content collection.

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
| Bangladesh visa (MRV) | `https://www.visa.gov.bd/` | 000 | `https://www.visa.gov.bd/` | Connection reset by peer; no working alternate found in this run |
| Fire Service | `https://fireservice.gov.bd/` | 000 | `https://fireservice.gov.bd/` | TLS verify fail (incomplete chain) |
| e-Court | `https://ecourt.gov.bd/` | **200** | same | Judiciary portal confirmed |

## Already shipped (catalog today)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| A2I | a2i / bd-a2i | central | https://a2i.gov.bd/ | shipped | catalog | |
| Birth & Death Registration (BDRIS) | bdris / bd-bdris | identity | https://bdris.gov.bd/ | shipped | catalog | |
| BRTA Service Portal (BSP) | brta / bd-brta | transport | https://bsp.brta.gov.bd/ | shipped | catalog | |
| DGHS | dghs / bd-dghs | health | https://dghs.gov.bd/ | shipped | catalog | |
| Education Board Results | edu-results / bd-edu-results | education | http://www.educationboardresults.gov.bd/ | shipped | catalog | |
| e-Passport Portal | epassport / bd-epassport | identity | https://www.epassport.gov.bd/ | shipped | catalog | |
| e-Porcha (Khatian & Mouza Map) | eporcha / bd-eporcha | land | https://eporcha.gov.bd/ | shipped | catalog | |
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
| XI Class Admission | xi-admission / bd-xi-admission | education | http://www.xiclassadmission.gov.bd/ | shipped | catalog | |

## Priority wave — musts

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| DESCO | desco / bd-desco | utilities | `https://ocsms.desco.org.bd/home` | shipped | gap-list | Must; verified 200 (primary `www.desco.org.bd` DNS fail) |
| Dhaka WASA | dhaka-wasa / bd-dhaka-wasa | utilities | `https://consumer-portal.dhakawasa.org/` | shipped | gap-list | Must; curl TLS fail — confirm in browser |
| Titas Gas | titas-gas / bd-titas-gas | utilities | `https://titasgas.gov.bd/` | shipped | gap-list | Must; curl TLS chain fail — confirm in browser |
| BMET Online Clearance | bmet / bd-bmet | migration | `https://oc.bmet.gov.bd/` | shipped | gap-list | Must; curl could not confirm — manual check |
| Bangladesh Online Visa (MRV) | bangladesh-visa / bd-bangladesh-visa | migration | `https://www.visa.gov.bd/` | shipped | gap-list | Must; connection reset from verifier |

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
| Bangladesh Post | bangladesh-post / bd-bangladesh-post | central | https://www.bangladeshpost.gov.bd/ | shipped | gap-list | Verified 200 |
| CAAB | caab / bd-caab | transport | https://caab.gov.bd/ | shipped | gap-list | Verified 200 |
| WZPDCL | wzpdcl / bd-wzpdcl | utilities | https://www.wzpdcl.org.bd/ | shipped | gap-list | Verified 200 |
| National University | national-university / bd-national-university | education | https://www.nu.ac.bd/ | shipped | gap-list | Verified 200 |
| WEWB | wewb / bd-wewb | migration | https://www.wewb.gov.bd/ | shipped | gap-list | Verified 200 |
| Bangladesh Customs | customs / bd-customs | tax | https://customs.gov.bd/ | shipped | gap-list | Verified 200 |


## Priority wave 3 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| Bangladesh Open University | bou / bd-bou | education | https://www.bou.ac.bd/ | shipped | gap-list | Verified 200 |
| Probashi Kalyan | probashi / bd-probashi | migration | https://www.probashi.gov.bd/ | shipped | gap-list | Verified 200 |
| Bangladesh Bank | bangladesh-bank / bd-bangladesh-bank | tax | https://www.bb.org.bd/ | shipped | gap-list | Verified 200 |
| BPDB | bpdb / bd-bpdb | utilities | https://www.bpdb.gov.bd/ | shipped | gap-list | Verified 200 |
| BTRC | btrc / bd-btrc | utilities | https://www.btrc.gov.bd/ | shipped | gap-list | Verified 200 |
| UGC | ugc / bd-ugc | education | https://www.ugc.gov.bd/ | shipped | gap-list | Verified 200 |
| DSHE | dshe / bd-dshe | education | https://www.dshe.gov.bd/ | shipped | gap-list | Verified 200 |
| DGDA | dgda / bd-dgda | health | https://www.dgda.gov.bd/ | shipped | gap-list | Verified 200 |
| e-GP | eprocure / bd-eprocure | central | https://www.eprocure.gov.bd/ | shipped | gap-list | Verified 200 |
| BIWTC | biwtc / bd-biwtc | transport | https://www.biwtc.gov.bd/ | shipped | gap-list | Verified 200 |
| BIWTA | biwta / bd-biwta | transport | https://www.biwta.gov.bd/ | shipped | gap-list | Verified 200 |
| Biman Bangladesh Airlines | biman / bd-biman | transport | https://www.biman.gov.bd/ | shipped | gap-list | Verified 200 |
| DIP | dip / bd-dip | identity | https://www.dip.gov.bd/ | shipped | gap-list | Verified 200 |
| NCTB | nctb / bd-nctb | education | https://www.nctb.gov.bd/ | shipped | gap-list | Verified 200 |
| BFSA | bfsa / bd-bfsa | health | https://www.bfsa.gov.bd/ | shipped | gap-list | Verified 200 |
| RAB | rab / bd-rab | safety | https://www.rab.gov.bd/ | shipped | gap-list | Verified 200 |
| IEDCR | iedcr / bd-iedcr | health | https://www.iedcr.gov.bd/ | shipped | gap-list | Verified 200 |


## Priority wave 4 — gap fill (2026-08-07)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| VAT Online | vat / bd-vat | tax | https://www.vat.gov.bd/ | shipped | gap-list | Verified 200 |
| BCC | bcc / bd-bcc | central | https://www.bcc.gov.bd/ | shipped | gap-list | Verified 200 |
| DoICT | doict / bd-doict | central | https://www.doict.gov.bd/ | shipped | gap-list | Verified 200 |
| Ministry of Education | moedu / bd-moedu | education | https://www.moedu.gov.bd/ | shipped | gap-list | Verified 200 |
| MoPME | mopme / bd-mopme | education | https://www.mopme.gov.bd/ | shipped | gap-list | Verified 200 |
| TMED | tmed / bd-tmed | education | https://www.tmed.gov.bd/ | shipped | gap-list | Verified 200 |
| University of Dhaka | du / bd-du | education | https://www.du.ac.bd/ | shipped | gap-list | Verified 200 |
| BUET | buet / bd-buet | education | https://www.buet.ac.bd/ | shipped | gap-list | Verified 200 |
| DGFP | dgfp / bd-dgfp | health | https://www.dgfp.gov.bd/ | shipped | gap-list | Verified 200 |
| EPB | epb / bd-epb | central | https://www.epb.gov.bd/ | shipped | gap-list | Verified 200 |
| BSCIC | bscic / bd-bscic | central | https://www.bscic.gov.bd/ | shipped | gap-list | Verified 200 |
| PGCB | pgcb / bd-pgcb | utilities | https://www.pgcb.gov.bd/ | shipped | gap-list | Verified 200 |
| BERC | berc / bd-berc | utilities | https://www.berc.org.bd/ | shipped | gap-list | Verified 200 |
| BMD | bmd / bd-bmd | central | https://www.bmd.gov.bd/ | shipped | gap-list | Verified 200 |
| FFWC | ffwc / bd-ffwc | safety | https://www.ffwc.gov.bd/ | shipped | gap-list | Verified 200 |
| MoDMR | modmr / bd-modmr | safety | https://www.modmr.gov.bd/ | shipped | gap-list | Verified 200 |
| RTHD | rthd / bd-rthd | transport | https://www.rthd.gov.bd/ | shipped | gap-list | Verified 200 |
| DSS | dss / bd-dss | central | https://www.dss.gov.bd/ | shipped | gap-list | Verified 200 |
| MoWCA | mowca / bd-mowca | central | https://www.mowca.gov.bd/ | shipped | gap-list | Verified 200 |
| Supreme Court | supremecourt / bd-supremecourt | justice | https://www.supremecourt.gov.bd/ | shipped | gap-list | Verified 200 |
| Law and Justice Division | lawjusticediv / bd-lawjusticediv | justice | https://www.lawjusticediv.gov.bd/ | shipped | gap-list | Verified 200 |
| Bangladesh Coast Guard | coastguard / bd-coastguard | safety | https://www.coastguard.gov.bd/ | shipped | gap-list | Verified 200 |
| DAE | dae / bd-dae | central | https://www.dae.gov.bd/ | shipped | gap-list | Verified 200 |
| BANBEIS | banbeis / bd-banbeis | education | https://www.banbeis.gov.bd/ | shipped | gap-list | Verified 200 |

## Remaining candidates

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| Election Commission | _(TBD)_ | central / identity | https://www.ecs.gov.bd/ | candidate | gap-list | curl 403 — browser check |
| Chattogram WASA | _(TBD)_ | utilities | _(confirm)_ | candidate | gap-list | prior URL fail |
| BOU | bou / bd-bou | education | https://www.bou.ac.bd/ | candidate | gap-list | Verified 200 — next wave |
| Probashi Ministry | _(TBD)_ | migration | https://www.probashi.gov.bd/ | candidate | gap-list | Verified 200 — next wave |
| Bangladesh Bank | _(TBD)_ | tax / central | https://www.bb.org.bd/ | candidate | gap-list | Verified 200 — next wave |
| Utility siblings (other DISCOs) | _(TBD)_ | utilities | _(confirm)_ | candidate | gap-list | e.g. SZPDCL, NESCO peers |

## Skipped

| Working name | Reason | Notes |
|--------------|--------|-------|
| nagorikseba.com listings | non-Official / mixed private | Out of seed scope |

