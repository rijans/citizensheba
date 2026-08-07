# Service Icons (CitizenSheba)

> Glossary: `CONTEXT.md` → **Service Icon**, **Category Icon**. Decision: [ADR-0004](../adr/0004-category-icons-and-service-cards.md). Spec: [`docs/superpowers/specs/2026-08-07-service-icons-design.md`](../superpowers/specs/2026-08-07-service-icons-design.md).

Optional Lucide key on Service frontmatter (`icon`). Cards **and Service Page H1** use `service.icon ?? category.icon`. Soft accent stays Category-colored. Filter chips stay Category-only. Registry: `src/lib/categoryIcons.ts`.

## Seeded Service icons

| Content id | Lucide key | Notes |
|------------|------------|--------|
| `a2i` | `lightbulb` | Innovation |
| `acc` | `scale` | Anti-Corruption Commission |
| `ansar` | `users` | Ansar & VDP |
| `bangabhaban` | `landmark` | President’s Office |
| `bangladesh-bank` | `landmark` | Central bank |
| `bangladesh-post` | `mail` | Postal |
| `bangladesh-visa` | `plane` | Online visa |
| `banbeis` | `file-spreadsheet` | Education stats |
| `barishal-cc` | `building-2` | Barishal City Corp |
| `bcc` | `cpu` | Computer council |
| `bdris` | `scroll-text` | Vital records |
| `berc` | `bolt` | Energy regulator |
| `bfsa` | `utensils` | Food safety |
| `bgb` | `shield` | Border Guard |
| `bida` | `briefcase-business` | Investment |
| `biman` | `plane` | National airline |
| `biwta` | `anchor` | Inland waterways auth. |
| `biwtc` | `ship` | Water transport |
| `bmd` | `cloud-sun` | Meteorology |
| `bmet` | `briefcase-business` | Overseas employment clearance |
| `bou` | `book-open` | Open university |
| `bpdb` | `zap` | Power development |
| `bpsc` | `clipboard-list` | Public Service Commission |
| `breb` | `zap` | Rural electrification |
| `brtc` | `bus` | Road transport corp |
| `brta` | `car` | Vehicles / licence |
| `bscic` | `factory` | Small industries |
| `bsec` | `banknote` | Securities commission |
| `bsti` | `badge-check` | Standards & testing |
| `btcl` | `phone` | Telecom |
| `btrc` | `radio` | Telecom regulator |
| `buet` | `university` | Engineering university |
| `bwdb` | `droplets` | Water development |
| `caab` | `plane` | Civil aviation |
| `cabinet` | `landmark` | Cabinet Division |
| `cag` | `scroll-text` | Comptroller & Auditor General |
| `ccc` | `building-2` | Chattogram City Corp |
| `cga` | `calculator` | Controller General of Accounts |
| `chattogram-wasa` | `droplets` | Chattogram water |
| `coastguard` | `ship-wheel` | Coast Guard |
| `customs` | `package` | Customs |
| `dae` | `sprout` | Agriculture extension |
| `desco` | `zap` | Electricity |
| `dgda` | `pill` | Drug administration |
| `dgfood` | `utensils` | Food directorate |
| `dgfp` | `baby` | Family planning |
| `dghs` | `stethoscope` | Health services |
| `dhaka-wasa` | `droplets` | Water |
| `dip` | `user-round` | Immigration / passports |
| `dlrs` | `map` | Land records & surveys |
| `dmtcl` | `train-front` | Dhaka Metro |
| `dnc` | `shield-alert` | Narcotics Control |
| `dncc` | `building-2` | Dhaka North City |
| `doe` | `cloud-sun` | Department of Environment |
| `doict` | `monitor` | ICT |
| `dpdc` | `zap` | Electricity |
| `dpe` | `school` | Primary education |
| `dpp` | `scale` | Public prosecutions |
| `dscc` | `building-2` | Dhaka South City |
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
| `erd` | `briefcase-business` | Economic Relations Division |
| `ereturn` | `file-text` | Tax return |
| `etin` | `receipt` | e-TIN |
| `ffwc` | `cloud-rain` | Flood forecasting |
| `fire-service` | `flame` | Fire service |
| `fisheries` | `anchor` | Department of Fisheries |
| `gcc` | `building-2` | Gazipur City Corp |
| `hajj` | `mosque` | Hajj |
| `iedcr` | `microscope` | Disease research |
| `infocom` | `scroll-text` | Information Commission / RTI |
| `ird` | `banknote` | Internal Resources Division |
| `khulna-wasa` | `droplets` | Khulna water |
| `land-portal` | `home` | Land ministry |
| `lawjusticediv` | `scale` | Law & justice |
| `ldtax` | `banknote` | Land development tax |
| `lgd` | `building-2` | Local Government Division |
| `lged` | `building-2` | Local gov engineering |
| `mha` | `shield` | Home Affairs |
| `moa` | `sprout` | Agriculture ministry |
| `moc` | `store` | Commerce ministry |
| `mocat` | `plane` | Civil Aviation & Tourism |
| `mochta` | `landmark` | CHT Affairs |
| `modmr` | `shield-alert` | Disaster management |
| `moedu` | `school` | Education ministry |
| `moef` | `cloud-sun` | Environment / climate |
| `mof` | `banknote` | Finance ministry |
| `mofa` | `globe` | Foreign affairs |
| `mofood` | `utensils` | Food ministry |
| `mofl` | `sprout` | Fisheries & Livestock |
| `mohfw` | `heart-pulse` | Health ministry |
| `moi` | `factory` | Industries ministry |
| `moinfo` | `radio` | Information & Broadcasting |
| `mole` | `briefcase-business` | Labour & Employment |
| `molwa` | `scroll-text` | Liberation War Affairs |
| `mopa` | `landmark` | Public Administration |
| `mopme` | `baby` | Primary education |
| `mor` | `train-front` | Railways ministry |
| `most` | `lightbulb` | Science & Technology |
| `mowca` | `heart-handshake` | Women & children |
| `mowr` | `droplets` | Water Resources |
| `moys` | `users` | Youth & Sports |
| `mygov` | `landmark` | Central portal |
| `namjari` | `stamp` | Mutation |
| `national-portal` | `globe` | National gateway |
| `national-university` | `university` | National University |
| `nbr` | `banknote` | National Board of Revenue |
| `ncc` | `building-2` | Narayanganj City Corp |
| `nctb` | `book-open` | Textbooks |
| `nesco` | `zap` | Electricity |
| `nid` | `id-card` | National ID |
| `parliament` | `landmark` | Jatiya Sangsad |
| `petrobangla` | `flame` | Oil/gas corporation |
| `pgcb` | `cable` | Power grid |
| `pid` | `file-text` | Press Information Department |
| `plancomm` | `clipboard-list` | Planning Commission |
| `planning` | `clipboard-list` | Planning Division |
| `pmo` | `landmark` | Prime Minister’s Office |
| `police` | `shield` | Police |
| `power-division` | `zap` | Power Division |
| `prison` | `shield` | Bangladesh Jail / prisons |
| `probashi` | `users` | Expatriate welfare |
| `pwd` | `building-2` | Public works |
| `rab` | `shield-alert` | RAB |
| `railway` | `train-front` | Rail tickets |
| `rhd` | `bus` | Roads & Highways Dept |
| `rjsc` | `building-2` | Company registration |
| `rthd` | `bus` | Roads & highways |
| `shed` | `school` | Secondary & Higher Education Div |
| `sgcl` | `flame` | Sundarban Gas |
| `sparrso` | `cloud-sun` | Space / remote sensing |
| `sreda` | `zap` | Renewable energy authority |
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
