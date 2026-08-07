# Service Icons (CitizenSheba)

> Glossary: `CONTEXT.md` → **Service Icon**, **Category Icon**. Decision: [ADR-0004](../adr/0004-category-icons-and-service-cards.md). Spec: [`docs/superpowers/specs/2026-08-07-service-icons-design.md`](../superpowers/specs/2026-08-07-service-icons-design.md).

Optional Lucide key on Service frontmatter (`icon`). Cards use `service.icon ?? category.icon`. Soft accent stays Category-colored. Filter chips stay Category-only. Registry: `src/lib/categoryIcons.ts`.

## Seeded Service icons

| Content id | Lucide key | Notes |
|------------|------------|--------|
| `nid` | `id-card` | National ID |
| `epassport` | `book-user` | Passport booklet |
| `etin` | `receipt` | Tax registration |
| `ereturn` | `file-text` | Tax return |
| `bdris` | `scroll-text` | Vital records certificate |
| `mygov` | `landmark` | Central portal |
| `national-portal` | `globe` | National gateway |
| `btrc` | `radio` | Telecom |
| `dhaka-wasa` | `droplets` | Water |
| `desco` | `zap` | Electricity |
| `dpdc` | `zap` | Electricity |
| `nesco` | `zap` | Electricity peer |
| `breb` | `zap` | Electricity peer |
| `railway` | `train-front` | Rail tickets |
| `brta` | `car` | Vehicles / licence |
| `police` | `shield` | Safety |
| `eporcha` | `map` | Land / khatian |
| `namjari` | `stamp` | Mutation peer |
| `teachers-portal` | `graduation-cap` | Education |
| `edu-results` | `file-badge` | Board results |
| `surokkha` | `heart-pulse` | Health |
| `fire-service` | `flame` | Fire |
| `titas-gas` | `flame` | Gas peer |
| `ekpay` | `wallet` | Payments |

Services not listed omit `icon` and keep their Category glyph.

## Editing

1. Pick a Lucide key already in `categoryIcons.ts` `BY_KEY` (or add import + map entry).
2. Set `icon: …` on the Service Markdown.
3. Update this table.
4. Prefer outline metaphors over official logos or emoji.
