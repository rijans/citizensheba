# BD Digital Services Directory

A citizen-facing directory that helps people discover Bangladesh government and related digital portals, with a clear path to the official external site.

## Documentation layers

Product decisions and logic must be recorded and kept current:

| Layer | Use for |
|-------|---------|
| `CONTEXT.md` | Glossary / ubiquitous language |
| `docs/adr/` | Hard-to-reverse product and tech decisions (why + alternatives) |
| `AGENTS.md` | Agent guardrails and pointers (lean) |
| `docs/agent/INDEX.md` | Agent task router — keywords → SSOTs + code map |
| `docs/README.md` | Human/agent directory index of all docs |
| `docs/specs/DOC_ARCHITECTURE.md` | Where new docs belong; editor pointer policy |
| `docs/specs/TRAPS.md` | Known pitfalls (scan titles) |
| `docs/guides/` | Agent workflow, frontend, performance |
| `docs/ops/` | Operational runbooks |

Do not leave decisions only in chat or code comments. Route tasks via `docs/agent/INDEX.md` (see also root `AGENTS.md` Tier 0).

## Language

**Directory**:
The product itself — a searchable, filterable catalog of Services. Primary job today is discovery and hop-off to the official portal.
_Avoid_: Portal (ambiguous with government portals), Gateway, Hub (marketing-only)

**Service**:
A single discoverable digital offering citizens can open on an external official site (e.g. NID, e-Passport, Railway e-Ticket).
_Avoid_: Portal, App, Link, Listing (alone)

**Display Name**:
CitizenSheba’s curated visible casing for a Service’s English name. Stored in the Service `title` and used consistently in every English mention in that Service’s content (description, audience, FAQ). May correct nonstandard casing on the official site; Outbound Link hostnames and path casing stay exact as published. Clear cases use editorial judgment; stylized or conflicting brands escalate to a human decision. House style: lowercase `e-` for electronic-service prefixes (e.g. e-Passport, e-Namjari, e-TIN); ALL CAPS for letter/digit government acronyms (e.g. A2I, BRTA, NID); preserve known camelCase product brands (e.g. myGov). Decided brands are listed in `docs/guides/display-names.md` alongside the Service `title`.
_Avoid_: Blindly copying homepage typography, rewriting official domains to match Display Name, mismatched casing between title and body, silent “corrections” when official branding is stylized or disputed, mixed `E-` / `e-` for the same pattern, Title-casing acronyms (`A2i`, `Brta`)

**Name Alias**:
An alternate, former, informal, or romanized EN/BN name citizens use for a Service that is not the Display Name. **Required** on every Service: at least two `aliases` entries with `name`, `lang` (`en`|`bn`), and `kind` (`former`|`informal`|`alt`), covering both languages. All kinds match Instant Directory search; only `former` appears as a muted “Formerly …” line on the Service Page. Not a second public title; does not change the Service Slug.
_Avoid_: Shipping a Service without EN+BN aliases, treating aliases as the Display Name, stuffing aliases only into `tags`, renaming slugs when government wording changes, putting aliases into Document Title / Meta Description (v1), relying on a full transliteration library as the only romanization strategy, putting Service-specific romanizations only in the global Search Variant map

**Search Variant**:
A global, Service-agnostic spelling twin used by Instant Directory normalization (e.g. licence/license, e-passport/epassport). Not a Name Alias and not Service-specific.
_Avoid_: Stuffing per-Service nicknames into the variant map, full transliteration dictionaries as the variant map

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

**Document Title**:
The HTML `<title>` / SERP title for a page. Format: `বাংলা — English | CitizenSheba` (Bengali first, then English, brand last). Always generated from content fields (`title_bn` / `title`, or category `name_bn` / `name`); do not store a separate `meta_title`. Applies to Service, Category, Home, About, Disclaimer, and 404 via site BN/EN constants where needed. Visible page H1 may keep English-first Mixed UI; Document Title order does not force H1 order.
_Avoid_: English-only meta titles, reversing BN/EN order for Document Titles, requiring H1 to mirror Document Title order, per-page `meta_title` overrides, leaving static pages English-only in `<title>`

**Meta Description**:
The HTML meta description / SERP snippet. Bengali sentence(s) first, then English sentence(s), joined as two natural sentences (e.g. `বাংলা বাক্য। English sentence.`). Always generated from content fields (`description_bn` then `description`); do not store a separate `meta_description`. Same rule for Service, Category, and static pages via BN/EN site constants.
_Avoid_: English-only meta descriptions, EN-then-BN order, em-dash or pipe joins for descriptions, per-page `meta_description` overrides

**Official Service** (v1 catalog):
A Service whose Outbound Link is run by government, a statutory/public body, or a regulated utility citizens must use (e.g. NID, education boards, railway, DESCO/WASA-class bill portals).
_Avoid_: Partner listing, Promoted service, Affiliate (those are future, separate types)

**Out of catalog (v1)**:
Private banks, MFS apps (bKash/Nagad as products), commercial SaaS, and purely promotional third-party tools — unless later introduced under a distinct non-Official type.
_Avoid_: Calling these Official Services

**Service Page (v1 content)**:
SEO hop page: mixed title, short description (cards + Meta Description), primary Outbound CTA (domain tight under the button), then longer Markdown **body_bn** then **body** (BN first), bilingual **Who is this for** / **FAQ** / **Related services** (EN+BN headings; BN-then-EN values via `audience_bn` and FAQ `q_bn`/`a_bn`), related Service cards, **official link last verified** (human-readable date), and the official domain shown plainly. Body copy describes the Service — not CitizenSheba hop disclaimers. Full Guides are out of scope for v1.
_Avoid_: Long how-to essays (v1), thin title-only doorway pages, putting long hop prose into `description` (breaks cards/SERP), repeating “we don’t process applications here” in `body` / `body_bn`, English-only audience/FAQ on Service Pages

**Category Page**:
A dedicated, indexable page for one Category that lists its Services. Exists alongside Home filters (chips) for SEO and shareable URLs — not instead of them.
_Avoid_: Tag page, Topic hub (unless we later add non-Category hubs)

**Content Source (v1)**:
Git-managed structured content (Markdown/JSON/YAML in repo) is the source of truth; updates ship via PR + SSG rebuild. A headless CMS is deferred until editorial load justifies migration.
_Avoid_: Database-backed admin as a v1 requirement

**Instant Directory**:
Home provides client-side fuzzy search and instant Category filtering without full page reloads (POC-parity UX). Search aims to match EN and BN Display Names, Name Aliases (including former and related terms), curated Latin romanizations, and (at a lower weight) related Services’ Display Names (`title` / `title_bn` from explicit related or same-category fallback), with light query/index normalization and a small shared variant map — not a full transliteration library or typo engine by default. `title_bn` ranks with EN title parity; `description_bn` is searchable like EN description. Service cards show Category Icon (with soft accent), title / title_bn, short description, official domain, and status when not ACTIVE. The same Service card visual language is shared on Category Pages and related Services on Service Pages. Instant Directory shows a live result count and a clear empty state when nothing matches. Service Pages and Category Pages remain statically generated HTML for SEO and agents.
_Avoid_: Server-roundtrip search as the primary Home UX (v1), emoji-first cards, stuffing Category name + domain + status + last-verified onto every card, divergent card UIs per surface, depending on automatic BN↔Latin transliteration alone for discovery, ranking related-Service title hits as strongly as the Service’s own Display Name

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

**Category Icon**:
A simple SVG mark for a Category (lucide-style key in content), reused on filter chips and Service cards in that Category so the Instant Directory is scannable. Paired with a soft Category accent (muted tint + icon hue), not strong app-like color blocks. Accent hues are defined in code keyed by category id/icon, not in content YAML. Category-level only in v1 — not per-Service emoji or logo. Chips use a small icon + soft accent with the English category name (no BN on chips in v1).
_Avoid_: Emoji wallpaper on every card, per-Service custom icons as the default, loud category color fills, BN labels on chips that force wrapping, accent colors edited ad hoc in YAML, decorative illustrations that compete with the Outbound CTA

**Mobile-First**:
Layouts, Instant Directory, and Service/Category Pages are designed for small screens first (thumb reach, single-column cards, sticky search/chips that don’t eat the viewport), then enhanced for tablet/desktop. Touch targets and performance on mid-range Android matter as much as desktop polish.
_Avoid_: Desktop-only hover reliance, tiny tap targets, hero chrome that pushes search below the fold on phones
