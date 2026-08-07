# Directory ranking (CitizenSheba)

> Glossary: `CONTEXT.md` → **Directory Global Rank**, **Directory Category Rank**, **Directory Pagination**. Decision: [ADR-0010](../adr/0010-directory-ranking-and-pagination.md). Specs: [ranking/pagination](../superpowers/specs/2026-08-07-directory-ranking-pagination-design.md), [Load more](../superpowers/specs/2026-08-07-directory-load-more-design.md).

Runtime SSOT is Service frontmatter (`directory_global_rank`, `directory_category_rank`). Update this table when you change Top browse order so agents do not invent ranks.

## Rules

| Rule | Detail |
|------|--------|
| Lower = higher | `10` before `20` before `500` |
| Home All | Sort by `directory_global_rank`, then title |
| Category / chip | Sort by `directory_category_rank`, then title |
| Search | Ignore ranks while query is non-empty (ADR-0007 scores) |
| New Services | Default high (`500+` global, `100+` category) until curated |
| Pagination | Page size 20; show all if ≤21 results; pager if ≥22 |
| Load more | Between grid and pager; appends next batch; muted “N more”; page jump replaces |

## Top ~20 global (approved seed)

| Rank | Content id | Display Name |
|------|------------|--------------|
| 10 | `nid` | NID Services |
| 20 | `epassport` | e-Passport Portal |
| 30 | `etin` | NBR e-TIN Registration |
| 40 | `ereturn` | e-Return (Online Tax Submission) |
| 50 | `bdris` | Birth & Death Registration (BDRIS) |
| 60 | `mygov` | myGov |
| 70 | `national-portal` | Bangladesh National Portal |
| 80 | `btrc` | BTRC |
| 90 | `dhaka-wasa` | Dhaka WASA |
| 100 | `desco` | DESCO |
| 110 | `dpdc` | DPDC |
| 120 | `railway` | Bangladesh Railway e-Ticket |
| 130 | `brta` | BRTA Service Portal (BSP) |
| 140 | `police` | Bangladesh Police |
| 150 | `eporcha` | e-Porcha (Khatian & Mouza Map) |
| 160 | `teachers-portal` | Teachers' Portal |
| 170 | `edu-results` | Education Board Results |
| 180 | `surokkha` | Surokkha |
| 190 | `fire-service` | Fire Service & Civil Defence |
| 200 | `ekpay` | ekPay |

All other Services use `directory_global_rank` ≥ 500 (title A–Z among leftovers).

## Per-category tops (seed notes)

Within each Category, popular Services get low `directory_category_rank` (10, 20, …). Examples:

| Category | Tops (low → high) |
|----------|-------------------|
| identity | NID, e-Passport, BDRIS, DIP |
| tax | e-TIN, e-Return, VAT Online, Customs, Bangladesh Bank |
| utilities | Dhaka WASA, DESCO, DPDC, BTRC, Titas Gas, … |
| transport | Railway, BRTA, Biman, CAAB, … |
| land | e-Porcha, e-Namjari, LD Tax, Land Portal |
| central | myGov, National Portal, ekPay, A2I, BCC, DoICT |
| education | Teachers' Portal, Board Results, XI Admission, MoEdu, … |
| health | Surokkha, DGHS, DGDA, … |
| safety | Police, Fire Service, RAB, … |
| migration | BMET, Online Visa, Hajj, … |
| justice | e-Court, Supreme Court, Law and Justice Division |

## Editing ranks

1. Change frontmatter on the Service(s).
2. Update this table if Top global or Category tops change.
3. Prefer spaced integers (10, 20, 30…) so inserts do not require renumbering everyone.
4. Optional regenerator: `node scripts/seed-directory-ranks.mjs` (overwrites from its embedded maps — edit the script maps first if re-seeding).
