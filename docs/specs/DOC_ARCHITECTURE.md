# DOC_ARCHITECTURE — documentation structure

> Read when **adding, moving, or restructuring** docs. Day-to-day task routing lives in [`docs/agent/INDEX.md`](../agent/INDEX.md).

## Layer model

| Tier | Files | Role |
|------|-------|------|
| **0 — Anchor** | `AGENTS.md` | Guardrails and do-nots. **Not** a full keyword→spec table. |
| **0 — Router** | `docs/agent/INDEX.md` | Keyword → SSOT + code map. |
| **0 — Glossary** | `CONTEXT.md` | Ubiquitous language only (no implementation dump). |
| **1 — Decisions** | `docs/adr/*.md` | Hard-to-reverse product/tech decisions. |
| **1 — Traps** | `docs/specs/TRAPS.md` | Recurring pitfalls; scan titles, open bodies on demand. |
| **2 — Guides** | `docs/guides/*.md` | Agent workflow, **service-page hop**, frontend, performance, display-names (deep reference). |
| **2 — Ops** | `docs/ops/*.md` | Runbooks. |
| **3 — History** | `docs/superpowers/**` | Design/plan snapshots; prefer ADRs + CONTEXT for current truth. |
| **Map** | `docs/README.md` | Human-readable directory index. |

**Single ownership:** each fact in one canonical file. Link from `AGENTS.md` / INDEX — do not copy long tables into the anchor.

## Editor-specific config

One SSOT for agent behavior across Cursor / Claude Code / others:

| Location | Role |
|----------|------|
| `AGENTS.md` | Anchor |
| `docs/agent/INDEX.md` | Task router |
| `.cursor/rules/AGENTS.mdc` | **Pointer only** — `alwaysApply`; do not grow rules here |

**Forbidden:** new `.cursor/rules/*.mdc` files that duplicate guardrails. Put rules in `AGENTS.md`, `CONTEXT.md`, or an ADR.

## Adding docs (checklist)

1. Pick owner: glossary → `CONTEXT.md`; irreversible decision → new/updated ADR; ops → `docs/ops/`; agent routing → row in `INDEX.md`; recurring pitfall → `TRAPS.md`; how-to → `docs/guides/`; **Service Page hop structure/copy** → `docs/guides/service-page.md` (SSOT — then ADRs/CONTEXT if decisions/glossary change).
2. Add a row to `docs/agent/INDEX.md` Tier 1 (and ADR index if new ADR).
3. Link from `docs/README.md` if it is a top-level doc.
4. Mention in `AGENTS.md` only if it is a standing do-not or Tier 0 obligation — keep AGENTS lean.
5. Do not leave product decisions only in chat.
