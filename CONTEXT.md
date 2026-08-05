# BD Digital Services Directory

A citizen-facing directory that helps people discover Bangladesh government and related digital portals, with a clear path to the official external site.

## Language

**Directory**:
The product itself — a searchable, filterable catalog of Services. Primary job today is discovery and hop-off to the official portal.
_Avoid_: Portal (ambiguous with government portals), Gateway, Hub (marketing-only)

**Service**:
A single discoverable digital offering citizens can open on an external official site (e.g. NID, e-Passport, Railway e-Ticket).
_Avoid_: Portal, App, Link, Listing (alone)

**Category**:
A grouping of related Services used for browsing and filtering (e.g. Identity & Registration, Tax & Finance).
_Avoid_: Tag, Topic, Section

**Service Page**:
Our site's dedicated page for one Service — short description, status, and a prominent CTA to the official external URL. Exists for SEO, shareability, and future expansion.
_Avoid_: Landing page (generic), Detail page (vague), Doorway page

**Guide** (future):
Deeper how-to content attached to a Service (steps, documents, fees, pitfalls). Not required for v1; planned for hybrid expansion.
_Avoid_: Article, Blog post, Tutorial (unless we later split content types)

**Outbound Link**:
The official external URL where the citizen actually completes the Service. We do not host or proxy that experience.
_Avoid_: Affiliate link, Deep link (unless literally deep-linking into a path)

**Non-Official Disclaimer**:
Footer (and similar) copy stating this Directory is not a government entity and is not an official portal.
_Avoid_: Legal waiver (unless counsel drafts one)

**Mixed UI**:
One URL per Service Page for all audiences. English slugs. Titles and copy may mix EN/BN where natural for clarity and SEO, without duplicating full parallel locale trees.
_Avoid_: Separate `/bn` and `/en` sites (for v1), Bangla-only slugs

**Official Service** (v1 catalog):
A Service whose Outbound Link is run by government, a statutory/public body, or a regulated utility citizens must use (e.g. NID, education boards, railway, DESCO/WASA-class bill portals).
_Avoid_: Partner listing, Promoted service, Affiliate (those are future, separate types)

**Out of catalog (v1)**:
Private banks, MFS apps (bKash/Nagad as products), commercial SaaS, and purely promotional third-party tools — unless later introduced under a distinct non-Official type.
_Avoid_: Calling these Official Services

**Service Page (v1 content)**:
SEO hop page: mixed title, short description, category, status, primary Outbound CTA, related Services, plus meta title/description, a small FAQ (3–5), “who is this for,” last-verified date, and the official domain shown plainly. Full Guides are out of scope for v1.
_Avoid_: Long how-to essays (v1), thin title-only doorway pages

**Category Page**:
A dedicated, indexable page for one Category that lists its Services. Exists alongside Home filters (chips) for SEO and shareable URLs — not instead of them.
_Avoid_: Tag page, Topic hub (unless we later add non-Category hubs)

**Content Source (v1)**:
Git-managed structured content (Markdown/JSON/YAML in repo) is the source of truth; updates ship via PR + SSG rebuild. A headless CMS is deferred until editorial load justifies migration.
_Avoid_: Database-backed admin as a v1 requirement

**Instant Directory**:
Home provides client-side fuzzy search and instant Category filtering without full page reloads (POC-parity UX). Service Pages and Category Pages remain statically generated HTML for SEO and agents.
_Avoid_: Server-roundtrip search as the primary Home UX (v1)

**Installable Shell**:
v1 ships a web app manifest and icons so users can Add to Home Screen. No service-worker offline cache of the Directory as a v1 goal.
_Avoid_: Full offline PWA, promising that official portals work offline

**Link Health**:
Outbound Links are kept trustworthy via (1) user “Report a problem” on Service Pages and (2) automated link checks (e.g. CI) that surface broken/changed URLs for editorial fix in git. Status and last-verified on the Service Page reflect editorial judgment.
_Avoid_: Auto-changing status without human review, proxying official sites

**Service Slug**:
Public URL path segment for a Service Page, English kebab-case with a `bd-` prefix (e.g. `/services/bd-nid`). The internal content id may omit the prefix.
_Avoid_: Bangla slugs, unprefixed public service paths (v1)

**Agent Index**:
A build-generated `/llms.txt` (and optional later `/llms-full.txt`) that gives AI agents a short curated map of the Directory. Complements sitemap; does not replace robots policy.
_Avoid_: Treating llms.txt as access control or a training license

**AI Usage Preference**:
v1 signals: allow search indexing and AI input/citation of our pages; disallow AI training on our content — expressed primarily via `robots.txt` Content Signals and known AI crawler rules, with an advisory `/.well-known/ai.txt` mirroring that stance.
_Avoid_: Relying on ai.txt alone for enforcement

**Mobile-First**:
Layouts, Instant Directory, and Service/Category Pages are designed for small screens first (thumb reach, single-column cards, sticky search/chips that don’t eat the viewport), then enhanced for tablet/desktop. Touch targets and performance on mid-range Android matter as much as desktop polish.
_Avoid_: Desktop-only hover reliance, tiny tap targets, hero chrome that pushes search below the fold on phones
