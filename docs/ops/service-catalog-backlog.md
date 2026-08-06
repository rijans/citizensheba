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
| DESCO | desco / bd-desco | utilities | `https://ocsms.desco.org.bd/home` | drafting | gap-list | Must; verified 200 (primary `www.desco.org.bd` DNS fail) |
| Dhaka WASA | dhaka-wasa / bd-dhaka-wasa | utilities | `https://consumer-portal.dhakawasa.org/` | drafting | gap-list | Must; curl TLS fail — confirm in browser |
| Titas Gas | titas-gas / bd-titas-gas | utilities | `https://titasgas.gov.bd/` | drafting | gap-list | Must; curl TLS chain fail — confirm in browser |
| BMET Online Clearance | bmet / bd-bmet | migration | `https://oc.bmet.gov.bd/` | drafting | gap-list | Must; curl could not confirm — manual check |
| Bangladesh Online Visa (MRV) | bangladesh-visa / bd-bangladesh-visa | migration | `https://www.visa.gov.bd/` | drafting | gap-list | Must; connection reset from verifier |

## Research-first / fill slots

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| DPDC | dpdc / bd-dpdc | utilities | `https://dpdc.org.bd/public/service/ebill` | drafting | gap-list | Verified **200** |
| NESCO | nesco / bd-nesco | utilities | `https://customer.nesco.gov.bd/` | drafting | gap-list | Verified **200** |
| e-Court / judiciary | ecourt / bd-ecourt | justice (if ships) | `https://ecourt.gov.bd/` | drafting | gap-list | Verified **200** |
| Fire Service & Civil Defence | fire-service / bd-fire-service | safety | `https://fireservice.gov.bd/` | drafting | gap-list | curl TLS fail — confirm in browser |
| Utility siblings (other DISCOs) | _(TBD)_ | utilities | _(confirm)_ | candidate | gap-list | One portal per Service; wave cap ~8–12; e.g. BREB still candidate |

## Skipped

| Working name | Reason | Notes |
|--------------|--------|-------|
| nagorikseba.com listings | non-Official / mixed private | Out of seed scope |

