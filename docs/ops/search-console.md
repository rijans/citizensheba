# Google Search Console — citizensheba.com

Use this checklist when connecting Search Console. Do not commit Google verification TXT secrets to git after use (zone DNS is fine).

## Steps

1. Open [Google Search Console](https://search.google.com/search-console) while signed into the Google account that should own the property.
2. **Add property** → **URL prefix** → `https://citizensheba.com`
3. Choose **DNS record** verification.
4. In Cloudflare DNS for `citizensheba.com`, create a **TXT** record:
   - Name: `@` (or as Google instructs)
   - Content: the string Google provides
   - Proxy: DNS only is fine for TXT
5. Click **Verify** in Search Console after DNS propagates (often under a minute on Cloudflare).
6. **Sitemaps** → submit: `https://citizensheba.com/sitemap-index.xml`
7. Optional: Bing Webmaster Tools → import from GSC or submit the same sitemap.

## Already on the site

- Sitemap: https://citizensheba.com/sitemap-index.xml
- robots.txt references the sitemap on every build
- Canonical URLs use `https://citizensheba.com` via `astro.config.mjs` `site`

## After catalog updates

Re-inspect key URLs in GSC URL Inspection if needed; sitemap regenerates automatically on deploy.
