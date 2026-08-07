# Official portal discovery

> How to find Official Service Outbounds without mirroring the National Portal or inventing non-Official hops.  
> Glossary: `CONTEXT.md` → **Official Service**, **Catalog Backlog**, **Partner listing**.  
> Checklist when shipping: [`docs/guides/new-service.md`](../guides/new-service.md). Living queue: [`service-catalog-backlog.md`](service-catalog-backlog.md).

## Goal

Grow the Official catalog by **bucket sweeps** (finance, medical colleges, public universities, recruitment portals, utilities, LGI, …) — still **gap-first and hop-quality**, not completeness theatre.

## In / out (always filter first)

| In (Official) | Out (v1) |
|---------------|----------|
| Gov ministries / divisions / directorates | Private banks, MFS products, commercial SaaS |
| Statutory / public bodies | Partner associations (BASIS, FBCCI, …) — ADR-0013 |
| Regulated utilities + half-gov SOEs | Scraped third-party directories (nagorikseba, etc.) |
| Public universities + public medical colleges | Private universities / private medical colleges |
| State banks + state insurers / specialized finance SOEs | Every National Portal row (no NP mirror) |
| Dedicated Official recruitment portals (when distinct Outbound) | Multi-Outbound “hub” pages |

One Service = **one Outbound portal**. Careers microsites under a bank/uni stay backlog siblings until they earn their own hop.

## Discovery wells (preferred order)

1. **Catalog Backlog** remaining / bucket queues — already triaged candidates.
2. **National Portal** (`bangladesh.gov.bd`) — ministry / office directory as a **hint list**; pick citizen-facing portals only.
3. **Sector apex lists** (Official):
   - Finance → Bangladesh Bank / MoF / FID notices of SOCB & specialized banks
   - Health → DGHS / MoHFW lists of public medical colleges & institutes
   - Education → UGC list of public universities; education boards separately
   - Energy → Petrobangla / Power Division / BERC company lists
   - Jobs → BPSC first; then Teletalk exam-application hosts; then org careers only if distinct Official URL
4. **A2I / myGov ecosystem** — cross-check only (not a dump seed).
5. **Peer hops already shipped** — `related` fields and same-Category peers often name missing siblings.

**Never seed from:** nagorikseba-style mixed directories, Wikipedia alone (OK for spelling check after Official URL found), paid SEO lists, Facebook pages as Outbound.

## Verify before drafting

```bash
# Prefer -k when BD gov TLS chains are incomplete (common); still record HTTP + page title.
curl -skS -o /tmp/p.html -w '%{http_code} %{url_effective}\n' -L --max-time 25 'https://example.gov.bd/'
# Confirm <title> matches the intended org (avoid wrong private college on a similar acronym).
```

Ship when the Outbound is the **confirmed official entry** for that org:

- Title / branding matches (when the host responds), **or**
- Soft-down / flaky host (TLS fail, timeout, 5xx, WAF 403, Cloudflare challenge) **and** we are sure of the URL from Official sources (National Portal / sector apex / long-standing `.gov.bd` or known SOE domain already used in Bangladesh gov practice)

Soft failures are **not** a reason to skip a known Official hop or to invent a “working today” alternate. Same rule as living **Link Health** in `CONTEXT.md`: keep the confirmed official URL; change only if the entry was wrong, HTTPS-on-same-host is required, or the official entry permanently moved. Record the soft failure in Catalog Backlog notes + `last_verified`.

Still **do not** ship when:

- Domain is parked / for-sale / hijacked / private lookalike
- We only have a guess URL with no Official confirmation
- EN `description` / aliases / ranks / icon incomplete — see new-service checklist

Soft-TLS (curl verify fail but browser works) is the common WASA / Titas / RAJUK pattern — ship with a backlog note.

## Bucket sweep checklist (repeat per wave)

| Bucket | Look for | Typical Category | Notes |
|--------|----------|------------------|-------|
| State banks / finance SOEs | SOCB, specialized banks, ICB, HBFC, IDRA, MRA, SBC/JBC | `tax` (current house for banks) or future finance Category | Majors mostly shipped; keep sweeping specialized |
| Public medical colleges | District MCs, specialized institutes (NINS, NIDCH, …) | `health` | Skip private BMC/Barind lookalikes |
| Public universities | UGC public list; engineering / agri / S&T | `education` | SUST often Cloudflare-blocked from CI — keep candidate |
| Jobs / recruitment | BPSC, NTRCA, Teletalk **exam-application** hosts, dedicated join-forces URLs | `central` / `education` / `safety` | Prefer dedicated application portals. **Do not** ship Teletalk Alljobs (`alljobs.teletalk.com.bd`) as Official — it mixes private + gov job ads |
| Utilities / energy SOEs | DISCOs, gas distribution, generation, Petrobangla siblings | `utilities` | One company = one hop |
| LGI / development | City corps, pourashava (selective), RAJUK/CDA/KDA | `central` | Pourashava: high bar (citizen demand) |
| Tourism / travel | Tourism Board, Parjatan, hotels booking, Beautiful Bangladesh, BTB registration, NHTTI | `transport` | MoCAT / CAAB / Biman / Tourist Police peers |
| Gov media / information | MoInfo peers: DFP, Mass Communication, FDC, PIB, Press Council (BTV/Betar/BSS/PID often already shipped) | `central` | Skip private channels |
| Ministries apex gaps | MoRA, MoCA, MoHPW, MoP, … when not already covered by a division hop alone | `central` / domain Category | Prefer ministry + key directorate siblings |
| Agro / farming SOEs | DAM, BADC, BMDA, research institutes, DAE/AIS already common | `central` (until farm Category) | Do not ship private agri apps |
| Social safety / pension | DSS Bhata (ISPMIS) for vata; CAFO Pension for civil pensions | `health` / `tax` | Do not conflate boyosko/bekar vata with civil pension |
| Training / forms | BPATC, NILG, forms.gov.bd | `central` | Skip hijacked museum domains |

## Wave rhythm

1. Pick **one or two buckets** (e.g. finance + medical colleges).
2. Verify 8–12 Outbounds; draft only the passes.
3. Update Catalog Backlog (wave table + remaining notes).
4. `npm run ci`; spot-check one hop in `npm run dev`.
5. Do **not** stall Official waves for Partner (ADR-0013).

## Anti-patterns

- Stuffing private medical colleges because the acronym matches (e.g. Barind BMC ≠ Barishal Medical College)
- Trusting every `*.college.gov.bd` host without checking `<title>` (some acronyms resolve to unrelated women's colleges)
- Using `rda.gov.bd` for Rajshahi Development Authority (that domain is Rural Development Academy Bogura — shipped as RDA Bogura)
- Shipping Teletalk org home as “all gov jobs”
- Mirroring every NP office page as a thin hop
- Calling associations Official (Partner only)
