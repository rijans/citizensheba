# Agent workflow (CitizenSheba)

> Stack-agnostic working rules for humans and agents. Product/stack do-nots stay in root `AGENTS.md`. Route tasks via `docs/agent/INDEX.md`. Scan `docs/specs/TRAPS.md` when relevant.

## Follow existing patterns — don't redesign silently

1. Locate files via `docs/agent/INDEX.md` § Code map; read surrounding code.
2. If the pattern is sound → **match it** (same card component, same SEO helpers, same content schema, same seams in [`code-structure.md`](code-structure.md)).
3. If the pattern is fragile or violates `AGENTS.md` / an ADR → **stop**. Propose a scoped change; get approval before redesigning. Do not fork projection / browse / hop disclose / badge recipes (Trap #16).

No drive-by architecture refactors mid-task.

## Stop-and-ask (mandatory)

**Before coding — ask** if:

- Business/product meaning is unclear after Tier 0 + matching INDEX rows
- The request contradicts code, tests, ADRs, or a trap
- Two interpretations would change user-visible or SEO behavior
- **Display Name** casing is stylized or conflicts with house rules (ADR-0005 / `docs/guides/display-names.md`) — clear acronym/`e-` fixes may proceed; ask on disputed brands, then update the display-names table

**Mid-task — pause** if you find:

- Docs/code contradiction outside the scoped fix
- A larger cross-cutting refactor than the task needs
- Foreign dirty files (see Parallel sessions)

Report options; wait for direction. Fixes required for the current task are fine; opportunistic cleanups are not.

## Business logic — clarify before you code

Never implement behavior you do not understand. Prefer `grill-with-docs` / domain grilling for product changes. When the developer clarifies, update `CONTEXT.md` / ADR / trap note so the answer survives chat.

## Parallel sessions

Git has no “session.” Two agent chats on one worktree overwrite each other.

- Prefer **one worktree (or clone) per parallel agent** when running concurrent chats.
- At session start: `git status --porcelain`. Paths already dirty → treat as **foreign**; **ask** before editing or committing them.
- Never `git add -A` / `git commit -a` blindly. Stage **explicit paths**. “Commit everything” still needs OK if foreign files are included.
- Do not rewrite git config; use `git -c user.name=… -c user.email=…` when identity is required.

## Document for future agents

- Prefer clear names and small modules over narrating comments.
- Comment only non-obvious *why* (SERP order vs H1, overflow clipping, CF static vs adapter).
- Exported helpers (`seo.ts`, `categoryVisuals.ts`) should stay the single place for that rule.

## Finalization checklist

Before calling a task done:

1. `npm run ci` (or at least the checks that cover your change).
2. UI / CSS / visual content work: **should** verify with `npm run dev` ([local-dev.md](../ops/local-dev.md)).
3. Docs: update the **owner** layer — glossary → `CONTEXT.md`; decision → ADR; ops → `docs/ops/`; routing → `INDEX.md`; new pitfall → `TRAPS.md`; **Service Page hop structure/copy** → [`service-page.md`](service-page.md); **shared seams / where logic lives** → [`code-structure.md`](code-structure.md) (then ADRs/CONTEXT/INDEX if needed).
4. Content edits: ensure integrity tests still pass (`tests/unit/content-integrity.test.ts`) — **new Services: follow [`docs/guides/new-service.md`](new-service.md)** (then hop rules in [`service-page.md`](service-page.md): EN+BN `aliases`, `body` / `body_bn`, `audience_bn`, FAQ `q_bn` / `a_bn`, no redundant hop FAQs) — Trap #9, #14; ADR-0008, ADR-0009.
5. Do not leave product decisions only in chat.

## Related

- `AGENTS.md`, `docs/agent/INDEX.md`, `docs/specs/TRAPS.md`, `docs/specs/DOC_ARCHITECTURE.md`, `docs/ops/local-dev.md`
