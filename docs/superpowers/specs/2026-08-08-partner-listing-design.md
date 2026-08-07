# Partner listing — design

> **Status:** decision locked (docs-only). Current truth: [ADR-0013](../../adr/0013-partner-listing.md), [`CONTEXT.md`](../../../CONTEXT.md) → **Partner listing**. Instant Directory stays Official-only until a follow-up discovery ADR.

Citizens search for industry / trade associations (e.g. BASIS at basis.org.bd) that are useful but are not Official Services. v1 must not stuff them into Official or invent ad-hoc non-Official hops without rules.

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Type name | **Partner listing** (not umbrella NonOfficial; not Promoted / Affiliate) |
| Allowlist v1 | Membership-based industry / trade / civic associations with a public useful portal |
| Explicit out | Private banks, MFS apps, commercial SaaS; Promoted / Affiliate; scrapers; NP mirrors |
| Delivery this wave | **ADR + owner docs only** — zero hops, zero schema, zero Instant Directory code |
| Discovery | Partners **must not** enter Instant Directory / `directory-index.json` / Category Official lists until a follow-up ADR |
| Future hop rules | Distinct Non-Official chrome; one Outbound; thin-hop discipline; no Official SERP/trust copy |
| Related | Partner ↔ Official only after Partner hops exist; cards must not imply Partner is Official |

## Alternatives rejected

- Umbrella NonOfficial covering banks / MFS / SaaS / associations
- Stuffing associations into Official Services
- Shipping Partner UI or BASIS hop before the ADR

## Non-goals (this wave)

- `listing_type` / partners content collection
- Partner backlog file (note only on Official Catalog Backlog)
- Promoted / Affiliate ADRs
- BASIS pilot hop

## Later ship wave (out of scope here)

Schema + hop template + Non-Official chrome + optional Partner backlog + pilot (e.g. BASIS) — gated by amending discovery before Home mix-in.

## Docs touched

ADR-0013, CONTEXT, AGENTS, TRAPS #8/#17, INDEX, `new-service.md`, Catalog Backlog note, docs/README ADR row.
