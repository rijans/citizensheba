# Astro SSG + React island on Cloudflare Pages

We need a production Directory that is SEO- and agent-friendly (static HTML for Service/Category Pages), still feels like an instant app on Home, and deploys simply on Cloudflare. We chose **Astro SSG** with a **React island** only for Instant Directory search/filter, **git-managed content**, and **Cloudflare Pages** (+ Worker for report-a-problem later). Rejected a pure React/Next default (heavier JS, easier to drift from static) and Eleventy (would discard the working React POC UX for little gain at this stage).
