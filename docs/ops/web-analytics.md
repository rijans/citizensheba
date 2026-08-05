# Cloudflare Web Analytics — citizensheba.com

## Preferred: automatic (proxied zone)

1. Open [Web Analytics](https://dash.cloudflare.com/?to=/:account/web-analytics/sites).
2. Add hostname `citizensheba.com`.
3. Enable **automatic** setup for sites proxied through Cloudflare.
4. Confirm the DNS record is **proxied** (orange cloud).

No site code change is required when automatic injection works.

## Fallback: manual beacon

1. In Web Analytics, copy the site **token**.
2. In the Cloudflare Worker/Pages project for CitizenSheba, set environment variable:
   - `PUBLIC_CF_WEB_ANALYTICS_TOKEN=<token>`
3. Redeploy. [`BaseLayout.astro`](../../src/components/layout/BaseLayout.astro) injects the beacon only when this variable is present.

Never commit the token to git.

## Related metrics

Edge request analytics for the Worker/zone live under the project **Analytics** tab (separate from Web Analytics RUM).
