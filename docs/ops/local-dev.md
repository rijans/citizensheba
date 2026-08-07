# Local development — live check before push

> Industry-standard local loop for this Astro SSG project. **SSOT** for running CitizenSheba on localhost with hot reload. Production deploy remains [`production-and-deploy.md`](production-and-deploy.md).

## Quick start

```bash
npm ci                 # first time / after lockfile changes
npm run dev            # http://localhost:4321 — live reload (HMR)
```

Edit files under `src/`, `public/`, or `src/content/` — the browser updates without a full redeploy.

| Command | Purpose |
|---------|---------|
| `npm run dev` | **Primary** live check — Astro dev server + HMR |
| `npm run build` | Production static output → `dist/` |
| `npm run preview` | Serve `dist/` locally (prod-like; no HMR) |
| `npm run ci` | check → test → build (verify before commit/push) |

Default URL: **http://localhost:4321** (Astro default). If the port is taken, the CLI prints the next free port.

## When to use what

| Goal | Use |
|------|-----|
| Iterate on UI, CSS, Instant Directory, content copy | `npm run dev` |
| Confirm production build / routing / 404 assets | `npm run build && npm run preview` |
| Typecheck + unit tests + build gate | `npm run ci` |
| Ship to Cloudflare | Push `main` (Workers Builds auto-deploys); `npm run deploy` only as fallback — see production-and-deploy |

**Agents (should):** for UI / CSS / visual content work, run or remind to use `npm run dev` so changes are checked live before push. Not a CI hard gate. Prefer `preview` when validating build-only behavior (e.g. asset hashing, `_headers` in `dist`).

## Content edits

Services/categories are Git Content Collections. In `dev`, frontmatter and MD/YAML changes usually hot-reload; if a schema change seems stuck, restart `npm run dev`.

Integrity: `npm test` (includes `tests/unit/content-integrity.test.ts`).

## Related

- [`README.md`](../../README.md) — script table  
- [`AGENTS.md`](../../AGENTS.md) — deploy do-nots  
- [`docs/guides/agent-workflow.md`](../guides/agent-workflow.md) — finalization  
- [`docs/ops/production-and-deploy.md`](production-and-deploy.md) — live production smoke  
