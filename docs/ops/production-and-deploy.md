# Production access & deployment — CitizenSheba

> **SSOT for agents and humans** on how this site is deployed, how to check live, and what *not* to assume.  
> Stack decision: [ADR-0001](../adr/0001-astro-ssg-react-island-cloudflare.md). Analytics/GSC: [web-analytics.md](web-analytics.md), [search-console.md](search-console.md).

## What “production” is

| Item | Value |
|------|--------|
| Product domain | `https://www.citizensheba.com` (apex → www; see DNS below) |
| Worker name | `citizensheba` |
| Workers.dev URL | `https://citizensheba.jaber-al-nahian.workers.dev` |
| Config | `wrangler.jsonc` — **static assets** from `./dist`, `not_found_handling: "404-page"` |
| Output | Astro `output: "static"` → `dist/` |
| Auto-deploy | **Cloudflare Workers Builds** on push to `main` (GitHub → build → deploy Worker) |
| Account (typical) | Cloudflare account tied to `wrangler whoami` (e.g. JABER AL NAHIAN) |

Production ships via **Workers Builds** when `main` is updated on GitHub. GitHub Actions (`.github/workflows/ci.yml`) only **verifies** (`check` / test / build) — it does not upload the Worker. Manual `npm run deploy` / `wrangler deploy` remains a fallback (hotfix, Builds outage, or local-only experiment).

Do **not** run `astro add cloudflare` (Trap #1). Do **not** confuse GitHub CI success with a live deploy — wait for the Workers Builds run (or smoke the www hostname).

## Custom domains (www primary)

Canonical host is **`www.citizensheba.com`**. Apex must redirect to www so one hostname owns SEO and bookmarks.

1. Cloudflare DNS: apex and **`www`** both attached to the Worker (or proxied so TLS works on both).
2. **301 redirect** apex → www: `http.host eq "citizensheba.com"` → `concat("https://www.citizensheba.com", http.request.uri.path)` with query string preserved (Redirect Rule).
3. Astro `site` / `SITE_ORIGIN` must be `https://www.citizensheba.com` so canonicals, sitemap, and robots match.
4. Smoke: `curl -sS -o /dev/null -w '%{http_code} %{url_effective}\n' -L 'https://citizensheba.com/'` should end on `https://www.citizensheba.com/` with 200.

## Before production

Use [`local-dev.md`](local-dev.md) (`npm run dev`) to live-check UI/content on localhost. Use `npm run ci` before commit/push to `main` (push **does** trigger Workers Builds deploy — get approval first).

## Deployment cycle

```text
edit code/content
    │
    ▼
npm run ci          # astro check → vitest → astro build  (also GitHub Actions on push/PR)
    │
    ▼
git commit + push main
    │
    ├─► GitHub Actions     # verify only — does NOT deploy
    │
    └─► Workers Builds     # Cloudflare builds dist/ and deploys Worker `citizensheba`
            │
            ▼
smoke-check https://www.citizensheba.com  (see below)

# Fallback / hotfix (optional):
npm run deploy      # = npm run build && wrangler deploy
```

| Stage | Who / what | Deploys? |
|-------|------------|----------|
| `npm run ci` / GitHub Actions | Local or `.github/workflows/ci.yml` | No — verify only |
| `git push` to `main` | Cloudflare **Workers Builds** | **Yes** — builds and deploys Worker |
| `npm run deploy` / `npx wrangler deploy` | Authenticated CLI | **Yes** — manual fallback |
| Cloudflare dashboard | Manual upload / retry build | Possible |

**Agent rule:** never push to `main` / production without **explicit user approval** (`AGENTS.md`) — a merge to `main` **is** a production deploy via Workers Builds. Prefer `npm run ci` locally before push; use `npm run deploy` only when Builds cannot ship (or the user asks for a CLI deploy).

### Auth for deploy (CLI fallback)

```bash
npx wrangler whoami
# If not logged in:
npx wrangler login
# Or set CLOUDFLARE_API_TOKEN in the environment (do not commit tokens)
```

Credentials live under `~/.config/.wrangler/` when using OAuth. Non-interactive CLI/agents need `CLOUDFLARE_API_TOKEN`.

### Cursor Cloudflare MCP (optional)

Project MCP config: [`.cursor/mcp.json`](../../.cursor/mcp.json).

| Server | Use for |
|--------|---------|
| `cloudflare` / bindings | Account resources (Workers list, etc.) after OAuth |
| `cloudflare-builds` | Workers Builds history/logs (confirm auto-deploy status) |
| `cloudflare-observability` | Worker logs/metrics |
| `cloudflare-docs` | Docs search (public; no auth) |

On first use, call `mcp_auth` for servers that require it. After a push to `main`, use `workers_builds_list_builds` (Worker id from `workers_list`) to confirm the commit built successfully — do not assume GitHub Actions green means live is updated until Builds succeeds.

## How to check production (smoke)

Prefer the **www custom domain** (CDN + real DNS), not only `workers.dev`. Apex should 301 to www.

### Quick HTTP checks

```bash
# Apex → www
curl -sS -o /dev/null -w '%{http_code} %{url_effective}\n' -L 'https://citizensheba.com/'

# Home — BN→EN Document Title + chips (cards hydrate via React island)
curl -sS -L 'https://www.citizensheba.com/' | rg -o '<title>[^<]+</title>|canonical" href="[^"]+|directory-chip|category-icon'

# Service SEO hop — BN→EN title/meta + Outbound CTA
curl -sS -L 'https://www.citizensheba.com/services/bd-nid/' | rg -o '<title>[^<]+</title>|meta name="description" content="[^"]{0,120}|Open official'

# Category — static Service cards + domain line
curl -sS -L 'https://www.citizensheba.com/categories/identity-registration/' | rg -o '<title>[^<]+</title>|service-card__domain|category-icon'

# Agent / SEO surfaces
curl -sS -o /dev/null -w '%{http_code}\n' 'https://www.citizensheba.com/sitemap-index.xml'
curl -sS -o /dev/null -w '%{http_code}\n' 'https://www.citizensheba.com/llms.txt'
curl -sS -o /dev/null -w '%{http_code}\n' 'https://www.citizensheba.com/robots.txt'

# Cache / CF
curl -sS -I -L 'https://www.citizensheba.com/' | rg -i 'HTTP/|cf-cache-status|cf-ray'
```

### What to expect

| Surface | Static HTML includes | Notes |
|---------|----------------------|--------|
| Home Instant Directory cards | Search/chips/icons in SSR shell; **card list from React** after hydrate | `client:load` — `curl` may not show every `service-card` |
| Category / related cards | Full card markup (icon, titles, domain) | Good for `curl` smoke |
| Service Page | Title/meta, Outbound CTA, FAQ | Primary SEO hop check |
| Cache | `cf-cache-status: HIT` common | After deploy, soft-refresh or wait; purge only if stale content confirmed |

### Browser smoke (optional)

Open Home → chips + icons + result count; open one Service Page → official CTA; dark/light toggle still works.

### Confirm Worker / Builds via CLI / MCP

```bash
npx wrangler deployments list --name citizensheba   # if supported by installed wrangler
npx wrangler whoami
```

Or MCP `workers_list` / `workers_builds_list_builds` after auth — Worker name `citizensheba` (confirm the latest build commit hash matches `main`).

## npm scripts (deploy-related)

| Script | Does |
|--------|------|
| `npm run build` | Astro → `dist/` only |
| `npm run ci` | check + test + build |
| `npm run deploy` | build + `wrangler deploy` (manual fallback; usual path is Workers Builds on `main`) |
| `npm run pages:deploy` | Same as `deploy` (legacy name; still Workers assets) |

## Related traps

- Trap #1 — Cloudflare adapter on static site  
- Trap #2 — `_headers` `#` comments only (`public/_headers`)  
- See [TRAPS.md](../specs/TRAPS.md)

## Related docs

- [ADR-0001](../adr/0001-astro-ssg-react-island-cloudflare.md)  
- [README.md](../../README.md) § Cloudflare  
- [AGENTS.md](../../AGENTS.md) § Deploy smoke / do-nots  
- [docs/guides/performance.md](../guides/performance.md)
