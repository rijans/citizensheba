# Per-Service Lucide icons — design

> **Status:** implemented on `feat/directory-ranking-pagination`. Amends [ADR-0004](../../adr/0004-category-icons-and-service-cards.md). Living table: [`docs/guides/service-icons.md`](../../guides/service-icons.md).

Service cards today reuse one **Category Icon** for every Service in that Category (e.g. all identity → `fingerprint`). Citizens scan better when high-demand Services show a **semantic glyph** (ID card, passport booklet metaphor, utility meter, etc.) while staying inside the existing Lucide + soft-accent system — not Google Images stock illustrations.

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Scope | Optional per-Service Lucide icon |
| Fallback | Category `icon` when Service omits `icon` |
| Chips | Category icons only (unchanged) |
| Accent | **Category accent** on the icon well; only the glyph is Service-specific |
| Asset style | Lucide outline only — no PNG/emoji/custom ID-card illustrations |
| Seed | Top ~20 global + obvious peers; rest Category fallback |
| Docs | Amend ADR-0004 + CONTEXT + living `service-icons.md` + INDEX |

## Schema

Optional on Service frontmatter:

```yaml
icon: id-card   # lucide key, same registry as Category icons
```

Zod: `icon: z.string().optional()`.

## Runtime

- `SearchableService.icon?: string` from frontmatter.
- Card / Instant Directory / Category island: `lucideIconFor(service.icon ?? category.icon)`.
- Expand `BY_KEY` in `categoryIcons.ts` (or rename to shared `icons.ts` if cleaner) for new keys used by seeds.
- Related cards + Category Page cards use the same resolution.

## Seed icons (draft — lock keys to Lucide at implement)

| id | Lucide key (kebab) | Rationale |
|----|--------------------|-----------|
| `nid` | `id-card` | National ID card |
| `epassport` | `book-user` | Passport booklet / traveler |
| `etin` | `receipt` | Tax registration slip |
| `ereturn` | `file-text` | Tax return document |
| `bdris` | `scroll-text` | Vital-record certificate (no baby-emoji) |
| `mygov` | `landmark` | Gov portal hub (or keep category) |
| `national-portal` | `globe` | National gateway |
| `btrc` | `radio` / `smartphone` | Telecom regulator (pick available) |
| `dhaka-wasa` | `droplets` | Water |
| `desco` | `zap` | Electricity |
| `dpdc` | `zap` | Electricity (same metaphor OK) |
| `railway` | `train-front` | Rail |
| `brta` | `car` | Vehicles / licence |
| `police` | `shield` | Safety |
| `eporcha` | `map` | Land / khatian maps |
| `teachers-portal` | `graduation-cap` | Education |
| `edu-results` | `file-badge` | Results / credential |
| `surokkha` | `heart-pulse` | Health / vaccine |
| `fire-service` | `flame` | Fire |
| `ekpay` | `wallet` | Payments |

Obvious peers (same PR if cheap): `namjari` → `file-badge` or `stamp`; `titas-gas` → `flame`; `nesco`/`breb` → `zap`.

## Non-goals

- Official government logos on cards.
- Per-Service accent colors.
- Illustrated / flat-color stock packs from image search.
- Changing chip UI.

## Success criteria

- Top Services show distinct glyphs; accent still matches Category.
- Services without `icon` look unchanged (Category icon).
- Docs + integrity (optional field) + `npm run ci` green.
