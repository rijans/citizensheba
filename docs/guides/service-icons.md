# Service Icons (CitizenSheba)

> Glossary: `CONTEXT.md` → **Service Icon**, **Category Icon**. Decision: [ADR-0004](../adr/0004-category-icons-and-service-cards.md). Spec: [`docs/superpowers/specs/2026-08-07-service-icons-design.md`](../superpowers/specs/2026-08-07-service-icons-design.md).

Optional Lucide key on Service frontmatter (`icon`). Cards **and Service Page H1** use `service.icon ?? category.icon`. Soft accent stays Category-colored. Filter chips stay Category-only. Registry: `src/lib/categoryIcons.ts`.

## Seeded Service icons

| Content id | Lucide key | Notes |
|------------|------------|--------|
| `a2i` | `lightbulb` | Innovation |
| `bangladesh-bank` | `landmark` | Central bank |
| `bangladesh-post` | `mail` | Postal |
| `bangladesh-visa` | `plane` | Online visa |
| `banbeis` | `file-spreadsheet` | Education stats |
| `bcc` | `cpu` | Computer council |
| `bdris` | `scroll-text` | Vital records |
| `berc` | `bolt` | Energy regulator |
| `bfsa` | `utensils` | Food safety |
| `bida` | `briefcase-business` | Investment |
| `biman` | `plane` | National airline |
| `biwta` | `anchor` | Inland waterways auth. |
| `biwtc` | `ship` | Water transport |
| `bmd` | `cloud-sun` | Meteorology |
| `bmet` | `briefcase-business` | Overseas employment clearance |
| `bou` | `book-open` | Open university |
| `bpdb` | `zap` | Power development |
| `breb` | `zap` | Rural electrification |
| `brtc` | `bus` | Road transport corp |
| `brta` | `car` | Vehicles / licence |
| `bscic` | `factory` | Small industries |
| `btcl` | `phone` | Telecom |
| `btrc` | `radio` | Telecom regulator |
| `buet` | `university` | Engineering university |
| `bwdb` | `droplets` | Water development |
| `caab` | `plane` | Civil aviation |
| `chattogram-wasa` | `droplets` | Chattogram water |
| `coastguard` | `ship-wheel` | Coast Guard |
| `customs` | `package` | Customs |
| `dae` | `sprout` | Agriculture extension |
| `desco` | `zap` | Electricity |
| `dgda` | `pill` | Drug administration |
| `dgfp` | `baby` | Family planning |
| `dghs` | `stethoscope` | Health services |
| `dhaka-wasa` | `droplets` | Water |
| `dip` | `user-round` | Immigration / passports |
| `dmtcl` | `train-front` | Dhaka Metro |
| `doict` | `monitor` | ICT |
| `dpdc` | `zap` | Electricity |
| `dpp` | `scale` | Public prosecutions |
| `dshe` | `school` | Secondary / higher ed |
| `dss` | `hand-heart` | Social services |
| `du` | `university` | University of Dhaka |
| `ecourt` | `gavel` | e-Court |
| `edu-results` | `file-badge` | Board results |
| `ekpay` | `wallet` | Payments |
| `election-commission` | `badge-check` | Election Commission |
| `enothi` | `file-text` | e-Nothi |
| `epassport` | `book-user` | Passport |
| `epb` | `store` | Export promotion |
| `eporcha` | `map` | Land / khatian |
| `eprocure` | `clipboard-list` | e-GP procurement |
| `ereturn` | `file-text` | Tax return |
| `etin` | `receipt` | e-TIN |
| `ffwc` | `cloud-rain` | Flood forecasting |
| `fire-service` | `flame` | Fire service |
| `hajj` | `mosque` | Hajj |
| `iedcr` | `microscope` | Disease research |
| `land-portal` | `home` | Land ministry |
| `lawjusticediv` | `scale` | Law & justice |
| `ldtax` | `banknote` | Land development tax |
| `lged` | `building-2` | Local gov engineering |
| `modmr` | `shield-alert` | Disaster management |
| `moedu` | `school` | Education ministry |
| `mofa` | `globe` | Foreign affairs |
| `mopme` | `baby` | Primary education |
| `mowca` | `heart-handshake` | Women & children |
| `mygov` | `landmark` | Central portal |
| `namjari` | `stamp` | Mutation |
| `national-portal` | `globe` | National gateway |
| `national-university` | `university` | National University |
| `nctb` | `book-open` | Textbooks |
| `nesco` | `zap` | Electricity |
| `nid` | `id-card` | National ID |
| `pgcb` | `cable` | Power grid |
| `police` | `shield` | Police |
| `probashi` | `users` | Expatriate welfare |
| `rab` | `shield-alert` | RAB |
| `railway` | `train-front` | Rail tickets |
| `rjsc` | `building-2` | Company registration |
| `rthd` | `bus` | Roads & highways |
| `supremecourt` | `scale` | Supreme Court |
| `surokkha` | `heart-pulse` | Vaccination |
| `teachers-portal` | `graduation-cap` | Teachers |
| `teletalk` | `phone` | State mobile |
| `titas-gas` | `flame` | Gas |
| `tmed` | `library` | Technical / madrasah ed |
| `ugc` | `badge-check` | University grants |
| `vat` | `calculator` | VAT online |
| `wewb` | `hand-heart` | Wage earners welfare |
| `wzpdcl` | `zap` | West zone power |
| `xi-admission` | `clipboard-check` | Class 11 admission |

## Editing

1. Pick a Lucide key already in `categoryIcons.ts` `BY_KEY` (or add import + map entry).
2. Set `icon: …` on the Service Markdown.
3. Update this table.
4. Prefer outline metaphors over official logos or emoji.
