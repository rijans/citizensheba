# Official Services Priority Wave Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship ~9 full-quality Official Service hops (gap-first priority wave), new `utilities` / `migration` / `justice` Categories, and a filled Catalog Backlog tracking shipped vs remaining.

**Architecture:** Git Content Collections only — no scrapers. Add Category YAML + Lucide/accent maps, then Service Markdown matching existing hop shape (`docs/guides/service-page.md`). One Outbound URL per Service. Update `docs/ops/service-catalog-backlog.md` as statuses change. Single content PR preferred.

**Tech Stack:** Astro Content Collections · Zod schema (`src/content.config.ts`) · Vitest integrity tests · Lucide icons · Tailwind accents (`categoryVisuals.ts`)

**Spec:** `docs/superpowers/specs/2026-08-07-official-services-priority-wave-design.md`  
**Glossary:** `CONTEXT.md` (Catalog Backlog, Official Service, Display Name, Name Alias)  
**Hop SSOT:** `docs/guides/service-page.md`

---

## File structure

```text
docs/ops/service-catalog-backlog.md          # MODIFY — fill shipped + wave rows
docs/guides/display-names.md                 # MODIFY — new acronym rows
src/content/categories/utilities.yaml        # CREATE
src/content/categories/migration.yaml        # CREATE
src/content/categories/justice.yaml          # CREATE (e-Court ships)
src/lib/categoryIcons.ts                     # MODIFY — zap, plane, scale
src/lib/categoryVisuals.ts                   # MODIFY — accents for new ids
src/content/services/desco.md                # CREATE
src/content/services/dhaka-wasa.md           # CREATE
src/content/services/titas-gas.md            # CREATE
src/content/services/dpdc.md                 # CREATE
src/content/services/nesco.md                # CREATE
src/content/services/bmet.md                 # CREATE
src/content/services/bangladesh-visa.md      # CREATE
src/content/services/fire-service.md         # CREATE
src/content/services/ecourt.md               # CREATE
# optional: related arrays on police.md / epassport.md
```

### Wave roster (9 Services)

| id | Display Name | Category | Outbound (confirm with curl in Task 1) |
|----|--------------|----------|----------------------------------------|
| `desco` | DESCO | utilities | `https://www.desco.org.bd/` |
| `dhaka-wasa` | Dhaka WASA | utilities | `https://consumer-portal.dhakawasa.org/` |
| `titas-gas` | Titas Gas | utilities | `https://titasgas.gov.bd/` |
| `dpdc` | DPDC | utilities | `https://dpdc.org.bd/public/service/ebill` |
| `nesco` | NESCO | utilities | `https://customer.nesco.gov.bd/` |
| `bmet` | BMET Online Clearance | migration | `https://oc.bmet.gov.bd/` |
| `bangladesh-visa` | Bangladesh Online Visa (MRV) | migration | `https://www.visa.gov.bd/` |
| `fire-service` | Fire Service & Civil Defence | safety | `https://fireservice.gov.bd/` |
| `ecourt` | e-Court | justice | `https://ecourt.gov.bd/` |

If any URL fails verification, mark backlog `skip` with reason and replace from candidates (do not invent hubs). Prefer citizen-action URLs over corporate brochure pages when both are Official.

---

### Task 1: Verify Outbound URLs

**Files:**
- Modify: `docs/ops/service-catalog-backlog.md` (notes column only if a URL fails)

- [ ] **Step 1: HEAD/GET each candidate URL**

```bash
cd /home/jaber/www/Sheba
for u in \
  'https://www.desco.org.bd/' \
  'https://consumer-portal.dhakawasa.org/' \
  'https://titasgas.gov.bd/' \
  'https://dpdc.org.bd/public/service/ebill' \
  'https://customer.nesco.gov.bd/' \
  'https://oc.bmet.gov.bd/' \
  'https://www.visa.gov.bd/' \
  'https://fireservice.gov.bd/' \
  'https://ecourt.gov.bd/'
do
  code=$(curl -sS -o /dev/null -w '%{http_code}' -L --max-time 25 "$u" || echo FAIL)
  echo "$code  $u"
done
```

Expected: mostly `200`/`301`/`302`. Treat prolonged timeout / `000` / `5xx` as fail — pick alternate Official URL (e.g. DESCO → `https://ocsms.desco.org.bd/home`, DPDC → `https://dpdc.gov.bd/`) or `skip`.

- [ ] **Step 2: Commit only if backlog notes changed**

```bash
git add docs/ops/service-catalog-backlog.md
git -c user.name='Jaber Al Nahian' -c user.email='rijans.x@gmail.com' commit -m "$(cat <<'EOF'
docs(backlog): note Outbound verification for priority wave

EOF
)" || true
```

---

### Task 2: Fill Catalog Backlog — shipped + wave rows

**Files:**
- Modify: `docs/ops/service-catalog-backlog.md`

- [ ] **Step 1: Replace stub “Already shipped” section with this table**

```markdown
## Already shipped (catalog today)

| Working name | id / slug | Category | Outbound URL | Status | Source | Notes |
|--------------|-----------|----------|--------------|--------|--------|-------|
| A2I | a2i / bd-a2i | central | https://a2i.gov.bd/ | shipped | catalog | |
| Birth & Death Registration (BDRIS) | bdris / bd-bdris | identity | https://bdris.gov.bd/ | shipped | catalog | |
| BRTA Service Portal (BSP) | brta / bd-brta | transport | https://bsp.brta.gov.bd/ | shipped | catalog | |
| DGHS | dghs / bd-dghs | health | https://dghs.gov.bd/ | shipped | catalog | |
| Education Board Results | edu-results / bd-edu-results | education | http://www.educationboardresults.gov.bd/ | shipped | catalog | |
| e-Passport Portal | epassport / bd-epassport | identity | https://www.epassport.gov.bd/ | shipped | catalog | |
| e-Porcha (Khatian & Mouza Map) | eporcha / bd-eporcha | land | https://eporcha.gov.bd/ | shipped | catalog | |
| e-Return (Online Tax Submission) | ereturn / bd-ereturn | tax | https://etaxnbr.gov.bd/ | shipped | catalog | |
| NBR e-TIN Registration | etin / bd-etin | tax | https://secure.incometax.gov.bd/ | shipped | catalog | |
| Ministry of Land Portal | land-portal / bd-land-portal | land | https://www.land.gov.bd/ | shipped | catalog | |
| Land Development Tax (LD Tax) | ldtax / bd-ldtax | land | https://ldtax.gov.bd/ | shipped | catalog | |
| myGov | mygov / bd-mygov | central | https://www.mygov.bd/ | shipped | catalog | |
| e-Namjari (Mutation) | namjari / bd-namjari | land | https://mutation.land.gov.bd/ | shipped | catalog | |
| Bangladesh National Portal | national-portal / bd-national-portal | central | https://bangladesh.gov.bd/ | shipped | catalog | |
| NID Services | nid / bd-nid | identity | https://services.nidw.gov.bd/nid-pub/ | shipped | catalog | |
| Bangladesh Police | police / bd-police | safety | https://www.police.gov.bd/ | shipped | catalog | |
| Bangladesh Railway e-Ticket | railway / bd-railway | transport | https://eticket.railway.gov.bd/ | shipped | catalog | |
| Surokkha | surokkha / bd-surokkha | health | https://surokkha.gov.bd/ | shipped | catalog | |
| Teachers' Portal | teachers-portal / bd-teachers-portal | education | https://www.teachers.gov.bd/ | shipped | catalog | |
| XI Class Admission | xi-admission / bd-xi-admission | education | http://www.xiclassadmission.gov.bd/ | shipped | catalog | |
```

- [ ] **Step 2: Set priority-wave must/research rows to `drafting` with confirmed URLs from Task 1**

Use the Wave roster table URLs (or verified alternates). Keep utility siblings not in this wave as `candidate` (e.g. BREB) if listed.

- [ ] **Step 3: Commit**

```bash
git add docs/ops/service-catalog-backlog.md
git -c user.name='Jaber Al Nahian' -c user.email='rijans.x@gmail.com' commit -m "$(cat <<'EOF'
docs(backlog): seed shipped catalog and priority-wave drafting rows

EOF
)"
```

---

### Task 3: Add Categories + Lucide icons + accents

**Files:**
- Create: `src/content/categories/utilities.yaml`
- Create: `src/content/categories/migration.yaml`
- Create: `src/content/categories/justice.yaml`
- Modify: `src/lib/categoryIcons.ts`
- Modify: `src/lib/categoryVisuals.ts`

- [ ] **Step 1: Create category YAML files**

`src/content/categories/utilities.yaml`:

```yaml
id: utilities
slug: utilities-bills
name: Utilities
name_bn: ইউটিলিটি
description: Electricity, water, and gas utility portals for bills and customer service.
description_bn: বিদ্যুৎ, পানি ও গ্যাস ইউটিলিটির বিল ও গ্রাহক সেবা পোর্টাল
icon: zap
sort_order: 8
```

`src/content/categories/migration.yaml`:

```yaml
id: migration
slug: migration-overseas
name: Migration & Visa
name_bn: অভিবাসন ও ভিসা
description: Overseas employment clearance and Bangladesh visa application portals.
description_bn: বৈদেশিক কর্মসংস্থান ক্লিয়ারেন্স ও বাংলাদেশ ভিসা আবেদন পোর্টাল
icon: plane
sort_order: 10
```

`src/content/categories/justice.yaml`:

```yaml
id: justice
slug: justice-courts
name: Justice & Courts
name_bn: বিচার ও আদালত
description: Official e-Court and related justice portals for citizens.
description_bn: নাগরিকদের জন্য অফিসিয়াল ই-কোর্ট ও সংশ্লিষ্ট বিচার পোর্টাল
icon: scale
sort_order: 11
```

- [ ] **Step 2: Update `src/lib/categoryIcons.ts`**

Replace imports + `BY_KEY` with:

```typescript
import type { LucideIcon } from 'lucide-react';
import {
  Banknote,
  Car,
  Fingerprint,
  GraduationCap,
  HeartPulse,
  Landmark,
  LayoutGrid,
  Map,
  Plane,
  Scale,
  SearchX,
  Shield,
  Zap,
} from 'lucide-react';

const BY_KEY: Record<string, LucideIcon> = {
  landmark: Landmark,
  fingerprint: Fingerprint,
  banknote: Banknote,
  car: Car,
  map: Map,
  'graduation-cap': GraduationCap,
  'heart-pulse': HeartPulse,
  shield: Shield,
  zap: Zap,
  plane: Plane,
  scale: Scale,
};

export function lucideIconFor(key: string | undefined | null): LucideIcon {
  if (!key) return Landmark;
  return BY_KEY[key] ?? Landmark;
}

export { LayoutGrid, SearchX };
```

- [ ] **Step 3: Update `src/lib/categoryVisuals.ts` accents**

Add to `CATEGORY_ACCENTS` (keep existing keys):

```typescript
  utilities: { accent: '#0891b2', soft: 'rgba(8, 145, 178, 0.12)' },
  migration: { accent: '#4338ca', soft: 'rgba(67, 56, 202, 0.12)' },
  justice: { accent: '#57534e', soft: 'rgba(87, 83, 78, 0.12)' },
  safety: { accent: '#334155', soft: 'rgba(51, 65, 85, 0.12)' },
```

(Keep the existing `safety` line; do not duplicate — merge so `utilities` / `migration` / `justice` are new entries beside current ones.)

- [ ] **Step 4: Commit**

```bash
git add src/content/categories/utilities.yaml src/content/categories/migration.yaml \
  src/content/categories/justice.yaml src/lib/categoryIcons.ts src/lib/categoryVisuals.ts
git -c user.name='Jaber Al Nahian' -c user.email='rijans.x@gmail.com' commit -m "$(cat <<'EOF'
feat(categories): add utilities, migration, and justice

EOF
)"
```

---

### Task 4: Write utilities Services (DESCO, Dhaka WASA, Titas Gas, DPDC, NESCO)

**Files:**
- Create: `src/content/services/desco.md`
- Create: `src/content/services/dhaka-wasa.md`
- Create: `src/content/services/titas-gas.md`
- Create: `src/content/services/dpdc.md`
- Create: `src/content/services/nesco.md`

Use `last_verified: 2026-08-07` (implementation day UTC). If Task 1 changed a URL, use the verified URL and matching `official_domain`.

- [ ] **Step 1: Create `desco.md`**

```markdown
---
id: desco
slug: bd-desco
title: DESCO
title_bn: ডেসকো
serp_title: DESCO (Dhaka Electric Supply)
serp_title_bn: ডেসকো (ঢাকা ইলেকট্রিক সাপ্লাই)
description: Official Dhaka Electric Supply Company portal for customer information and electricity services in DESCO areas.
description_bn: ডেসকো এলাকায় গ্রাহক তথ্য ও বিদ্যুৎ সেবার জন্য অফিসিয়াল ডেসকো পোর্টাল
body: |
  **DESCO** (Dhaka Electric Supply) is the official utility portal for electricity customers in DESCO service areas.

  Use DESCO for company information and links into customer service channels (including online customer systems and prepaid guidance published by DESCO).

body_bn: |
  **ডেসকো (DESCO)** ডেসকো সেবাদান এলাকার বিদ্যুৎ গ্রাহকদের জন্য অফিসিয়াল ইউটিলিটি পোর্টাল।

  কোম্পানি তথ্য এবং গ্রাহক সেবা চ্যানেল (অনলাইন কাস্টমার সিস্টেম ও প্রিপেইড নির্দেশনাসহ) দেখতে ডেসকো ব্যবহার করুন।

url: "https://www.desco.org.bd/"
official_domain: desco.org.bd
category: utilities
tags: [desco, electricity, bill, "ডেসকো", "বিদ্যুৎ"]
aliases:
  - name: Dhaka Electric Supply
    lang: en
    kind: alt
  - name: Desco
    lang: en
    kind: informal
  - name: ডেসকো
    lang: bn
    kind: alt
  - name: ঢাকা ইলেকট্রিক সাপ্লাই
    lang: bn
    kind: alt
status: ACTIVE
audience: Electricity consumers and applicants in DESCO coverage areas of Dhaka.
audience_bn: ডেসকোর সেবাদান এলাকার বিদ্যুৎ গ্রাহক ও আবেদনকারী।
faq:
  - q: "Can I pay every Bangladesh electricity bill on DESCO?"
    a: "DESCO covers its own service area. For other distributors (for example DPDC or NESCO), use those Official Service Pages."
    q_bn: "সব এলাকার বিদ্যুৎ বিল কি ডেসকোতে পরিশোধ করা যায়?"
    a_bn: "ডেসকো শুধু নিজের সেবাদান এলাকা কভার করে। অন্য বিতরণকারী (যেমন ডিপিডিসি বা নেসকো) এর জন্য সেই অফিসিয়াল সেবা পেজ ব্যবহার করুন।"
related: [dpdc, nesco, titas-gas]
last_verified: 2026-08-07
---
```

- [ ] **Step 2: Create `dhaka-wasa.md`**

```markdown
---
id: dhaka-wasa
slug: bd-dhaka-wasa
title: Dhaka WASA
title_bn: ঢাকা ওয়াসা
description: Official Dhaka WASA consumer portal for water and sewer account and bill services.
description_bn: পানি ও স্যুয়ারেজ অ্যাকাউন্ট ও বিল সেবার জন্য অফিসিয়াল ঢাকা ওয়াসা কনজিউমার পোর্টাল
body: |
  **Dhaka WASA** is the official consumer portal for Dhaka Water Supply and Sewerage Authority account and bill services.

  Open the consumer portal when you need WASA account access or bill-related self-service for Dhaka WASA customers.

body_bn: |
  **ঢাকা ওয়াসা** ঢাকা ওয়াটার সাপ্লাই অ্যান্ড স্যুয়ারেজ অথরিটির অ্যাকাউন্ট ও বিল সেবার অফিসিয়াল কনজিউমার পোর্টাল।

  ঢাকা ওয়াসা গ্রাহক হিসেবে অ্যাকাউন্ট বা বিল-সংক্রান্ত সেবা নিতে এই পোর্টাল খুলুন।

url: "https://consumer-portal.dhakawasa.org/"
official_domain: consumer-portal.dhakawasa.org
category: utilities
tags: [wasa, water, bill, "ওয়াসা", "পানি"]
aliases:
  - name: DWASA
    lang: en
    kind: alt
  - name: Dhaka Water Supply
    lang: en
    kind: alt
  - name: ঢাকা ওয়াসা
    lang: bn
    kind: alt
  - name: ওয়াসা বিল
    lang: bn
    kind: informal
status: ACTIVE
audience: Dhaka WASA water and sewer customers managing accounts or bills online.
audience_bn: অনলাইনে অ্যাকাউন্ট বা বিল দেখা ঢাকা ওয়াসা গ্রাহক।
faq:
  - q: "Is this for Chattogram or other city WASAs?"
    a: "This Service Page points to Dhaka WASA. Other city WASAs have separate Official portals — add them from the Catalog Backlog when curated."
    q_bn: "এটি কি চট্টগ্রাম বা অন্য শহরের ওয়াসার জন্য?"
    a_bn: "এই সেবা পেজ ঢাকা ওয়াসার জন্য। অন্য শহরের ওয়াসার আলাদা অফিসিয়াল পোর্টাল আছে—ক্যাটালগ ব্যাকলগে রাখা থাকলে পরে যোগ করা হবে।"
related: [titas-gas, desco]
last_verified: 2026-08-07
---
```

- [ ] **Step 3: Create `titas-gas.md`**

```markdown
---
id: titas-gas
slug: bd-titas-gas
title: Titas Gas
title_bn: তিতাস গ্যাস
description: Official Titas Gas Transmission and Distribution portal for customer information and gas services.
description_bn: গ্রাহক তথ্য ও গ্যাস সেবার জন্য অফিসিয়াল তিতাস গ্যাস পোর্টাল
body: |
  **Titas Gas** is the official portal for Titas Gas Transmission and Distribution Company Limited.

  Use it for company notices, customer-service information, and published guidance on bills and prepaid meter topics.

body_bn: |
  **তিতাস গ্যাস** তিতাস গ্যাস ট্রান্সমিসন অ্যান্ড ডিস্ট্রিবিউশন কোম্পানি লিমিটেডের অফিসিয়াল পোর্টাল।

  নোটিশ, গ্রাহক সেবা তথ্য এবং বিল ও প্রিপেইড মিটার সংক্রান্ত প্রকাশিত নির্দেশনার জন্য এটি ব্যবহার করুন।

url: "https://titasgas.gov.bd/"
official_domain: titasgas.gov.bd
category: utilities
tags: [titas, gas, bill, "তিতাস", "গ্যাস"]
aliases:
  - name: TGTDCL
    lang: en
    kind: alt
  - name: Titas
    lang: en
    kind: informal
  - name: তিতাস
    lang: bn
    kind: informal
  - name: তিতাস গ্যাস বিল
    lang: bn
    kind: alt
status: ACTIVE
audience: Titas Gas residential and commercial customers in its franchise areas.
audience_bn: তিতাস গ্যাসের ফ্র্যাঞ্চাইজি এলাকার আবাসিক ও বাণিজ্যিক গ্রাহক।
faq:
  - q: "Can I pay Titas Gas only through this website?"
    a: "The official site publishes payment guidance. Many customers also pay via bank or MFS channels listed by Titas — follow only channels the company publishes."
    q_bn: "তিতাস গ্যাস বিল কি শুধু এই ওয়েবসাইটে পরিশোধ করা যায়?"
    a_bn: "অফিসিয়াল সাইটে পেমেন্ট নির্দেশনা থাকে। অনেক গ্রাহক তিতাসের তালিকাভুক্ত ব্যাংক বা এমএফএস চ্যানেলেও পরিশোধ করেন—শুধু কোম্পানি প্রকাশিত চ্যানেল অনুসরণ করুন।"
related: [dhaka-wasa, desco]
last_verified: 2026-08-07
---
```

- [ ] **Step 4: Create `dpdc.md`**

```markdown
---
id: dpdc
slug: bd-dpdc
title: DPDC
title_bn: ডিপিডিসি
serp_title: DPDC (Dhaka Power Distribution)
serp_title_bn: ডিপিডিসি (ঢাকা পাওয়ার ডিস্ট্রিবিউশন)
description: Official DPDC e-bill and customer service entry for Dhaka Power Distribution Company customers.
description_bn: ডিপিডিসি গ্রাহকদের জন্য অফিসিয়াল ই-বিল ও গ্রাহক সেবা এন্ট্রি
body: |
  **DPDC** (Dhaka Power Distribution Company) provides official online bill and customer-service entry points for its coverage areas.

  Use the DPDC e-bill service when you need to view residential bill information on the official distributor site.

body_bn: |
  **ডিপিডিসি (DPDC)** নিজের সেবাদান এলাকায় অফিসিয়াল অনলাইন বিল ও গ্রাহক সেবার এন্ট্রি দেয়।

  আবাসিক বিল তথ্য দেখতে অফিসিয়াল ডিস্ট্রিবিউটর সাইটের ই-বিল সেবা ব্যবহার করুন।

url: "https://dpdc.org.bd/public/service/ebill"
official_domain: dpdc.org.bd
category: utilities
tags: [dpdc, electricity, ebill, "ডিপিডিসি", "বিদ্যুৎ"]
aliases:
  - name: Dhaka Power Distribution
    lang: en
    kind: alt
  - name: Dpdc
    lang: en
    kind: informal
  - name: ডিপিডিসি
    lang: bn
    kind: alt
  - name: ঢাকা পাওয়ার ডিস্ট্রিবিউশন
    lang: bn
    kind: alt
status: ACTIVE
audience: Electricity consumers in DPDC service areas checking e-bills and related services.
audience_bn: ই-বিল ও সংশ্লিষ্ট সেবা দেখা ডিপিডিসি এলাকার বিদ্যুৎ গ্রাহক।
faq:
  - q: "Is DPDC the same as DESCO?"
    a: "No. DPDC and DESCO are different Dhaka distributors with separate portals. Pick the Service that matches your bill / connection area."
    q_bn: "ডিপিডিসি কি ডেসকোর মতোই?"
    a_bn: "না। ডিপিডিসি ও ডেসকো আলাদা ঢাকা ডিস্ট্রিবিউটর—আলাদা পোর্টাল। আপনার বিল/সংযোগ এলাকার সাথে মিলিয়ে সেবা বাছুন।"
related: [desco, nesco]
last_verified: 2026-08-07
---
```

- [ ] **Step 5: Create `nesco.md`**

```markdown
---
id: nesco
slug: bd-nesco
title: NESCO
title_bn: নেসকো
serp_title: NESCO (Northern Electricity Supply)
serp_title_bn: নেসকো (নর্দান ইলেকট্রিসিটি সাপ্লাই)
description: Official NESCO customer service portal for northern electricity supply bills and account services.
description_bn: উত্তরাঞ্চলের বিদ্যুৎ বিল ও অ্যাকাউন্ট সেবার জন্য অফিসিয়াল নেসকো কাস্টমার সার্ভিস পোর্টাল
body: |
  **NESCO** (Northern Electricity Supply Company) runs an official customer service portal for bills and related account services in its franchise area.

  Use NESCO when your connection is under Northern Electricity Supply — not DESCO or DPDC.

body_bn: |
  **নেসকো (NESCO)** নিজের ফ্র্যাঞ্চাইজি এলাকায় বিল ও অ্যাকাউন্ট সেবার অফিসিয়াল কাস্টমার সার্ভিস পোর্টাল চালায়।

  সংযোগ নর্দান ইলেকট্রিসিটি সাপ্লাইয়ের অধীনে হলে নেসকো ব্যবহার করুন—ডেসকো বা ডিপিডিসি নয়।

url: "https://customer.nesco.gov.bd/"
official_domain: customer.nesco.gov.bd
category: utilities
tags: [nesco, electricity, bill, "নেসকো", "বিদ্যুৎ"]
aliases:
  - name: Northern Electricity Supply
    lang: en
    kind: alt
  - name: Nesco
    lang: en
    kind: informal
  - name: নেসকো
    lang: bn
    kind: alt
  - name: নর্দান ইলেকট্রিসিটি
    lang: bn
    kind: alt
status: ACTIVE
audience: Electricity consumers in NESCO coverage areas using the customer portal.
audience_bn: কাস্টমার পোর্টাল ব্যবহারকারী নেসকো এলাকার বিদ্যুৎ গ্রাহক।
faq:
  - q: "Where do I go if I live in Dhaka?"
    a: "Dhaka distributors are typically DESCO or DPDC. Use those Service Pages unless your bill explicitly names NESCO."
    q_bn: "ঢাকায় থাকলে কোন পোর্টালে যাব?"
    a_bn: "ঢাকায় সাধারণত ডেসকো বা ডিপিডিসি। বিলে স্পষ্টভাবে নেসকো না থাকলে সেই সেবা পেজ ব্যবহার করুন।"
related: [desco, dpdc]
last_verified: 2026-08-07
---
```

- [ ] **Step 6: Commit utilities Services**

```bash
git add src/content/services/desco.md src/content/services/dhaka-wasa.md \
  src/content/services/titas-gas.md src/content/services/dpdc.md src/content/services/nesco.md
git -c user.name='Jaber Al Nahian' -c user.email='rijans.x@gmail.com' commit -m "$(cat <<'EOF'
feat(content): add utilities Services for priority wave

EOF
)"
```

---

### Task 5: Write migration + safety + justice Services

**Files:**
- Create: `src/content/services/bmet.md`
- Create: `src/content/services/bangladesh-visa.md`
- Create: `src/content/services/fire-service.md`
- Create: `src/content/services/ecourt.md`
- Modify (optional related): `src/content/services/police.md`, `src/content/services/epassport.md`

- [ ] **Step 1: Create `bmet.md`**

```markdown
---
id: bmet
slug: bd-bmet
title: BMET Online Clearance
title_bn: বিএমইটি অনলাইন ক্লিয়ারেন্স
serp_title: BMET Online Clearance (Emigration)
serp_title_bn: বিএমইটি অনলাইন ক্লিয়ারেন্স (বহির্গমন)
description: Official BMET online clearance system for Bangladesh overseas employment emigration clearance.
description_bn: বৈদেশিক কর্মসংস্থানের বহির্গমন ক্লিয়ারেন্সের জন্য অফিসিয়াল বিএমইটি অনলাইন ক্লিয়ারেন্স সিস্টেম
body: |
  **BMET Online Clearance** is the official online clearance system of the Bureau of Manpower, Employment and Training for emigration clearance related to overseas employment.

  Create or sign in to your clearance account on the official portal when you need BMET clearance services. The bureau site `bmet.gov.bd` remains the institutional home page.

body_bn: |
  **বিএমইটি অনলাইন ক্লিয়ারেন্স** বৈদেশিক কর্মসংস্থান-সংক্রান্ত বহির্গমন ক্লিয়ারেন্সের জন্য জনশক্তি কর্মসংস্থান ও প্রশিক্ষণ ব্যুরোর অফিসিয়াল অনলাইন সিস্টেম।

  ক্লিয়ারেন্স সেবা নিতে অফিসিয়াল পোর্টালে অ্যাকাউন্ট তৈরি বা লগইন করুন। প্রাতিষ্ঠানিক হোম পেজ হিসেবে `bmet.gov.bd` আলাদা।

url: "https://oc.bmet.gov.bd/"
official_domain: oc.bmet.gov.bd
category: migration
tags: [bmet, emigration, overseas, "বিএমইটি", "প্রবাস"]
aliases:
  - name: Bureau of Manpower Employment and Training
    lang: en
    kind: alt
  - name: BMET clearance
    lang: en
    kind: informal
  - name: বিএমইটি
    lang: bn
    kind: alt
  - name: বহির্গমন ক্লিয়ারেন্স
    lang: bn
    kind: alt
status: ACTIVE
audience: Bangladeshi workers and agencies handling BMET emigration clearance for overseas employment.
audience_bn: বৈদেশিক কর্মসংস্থানের বিএমইটি বহির্গমন ক্লিয়ারেন্স করা কর্মী ও সংশ্লিষ্ট সংস্থা।
faq:
  - q: "Is Ami Probashi the same as this portal?"
    a: "Clearance workflows have moved to the official BMET online clearance system. Prefer `oc.bmet.gov.bd` for new clearance work unless BMET publishes otherwise."
    q_bn: "আমি প্রবাসী কি এই পোর্টালের মতোই?"
    a_bn: "ক্লিয়ারেন্স কার্যক্রম অফিসিয়াল বিএমইটি অনলাইন ক্লিয়ারেন্স সিস্টেমে স্থানান্তরিত। নতুন ক্লিয়ারেন্সের জন্য `oc.bmet.gov.bd` ব্যবহার করুন—বিএমইটি অন্যথা প্রকাশ না করলে।"
related: [epassport, bangladesh-visa]
last_verified: 2026-08-07
---
```

- [ ] **Step 2: Create `bangladesh-visa.md`**

```markdown
---
id: bangladesh-visa
slug: bd-bangladesh-visa
title: Bangladesh Online Visa (MRV)
title_bn: বাংলাদেশ অনলাইন ভিসা (এমআরভি)
description: Official Bangladesh Online MRV portal to start machine-readable visa applications.
description_bn: মেশিন-রিডেবল ভিসা আবেদন শুরু করার অফিসিয়াল বাংলাদেশ অনলাইন এমআরভি পোর্টাল
body: |
  **Bangladesh Online Visa (MRV)** is the official portal to fill and submit Machine Readable Visa application forms online.

  After submitting online, applicants typically print the form and complete submission with documents and fees at a Bangladesh mission or visa office as instructed on the portal.

body_bn: |
  **বাংলাদেশ অনলাইন ভিসা (এমআরভি)** মেশিন-রিডেবল ভিসা আবেদন ফর্ম অনলাইনে পূরণ ও জমার অফিসিয়াল পোর্টাল।

  অনলাইন জমার পর সাধারণত ফর্ম প্রিন্ট করে পোর্টালের নির্দেশ অনুযায়ী মিশন বা ভিসা অফিসে কাগজপত্র ও ফিসহ জমা দিতে হয়।

url: "https://www.visa.gov.bd/"
official_domain: visa.gov.bd
category: migration
tags: [visa, mrv, immigration, "ভিসা", "এমআরভি"]
aliases:
  - name: MRV portal
    lang: en
    kind: alt
  - name: Bangladesh visa application
    lang: en
    kind: alt
  - name: ভিসা ডট গভ
    lang: bn
    kind: informal
  - name: এমআরভি
    lang: bn
    kind: alt
status: ACTIVE
audience: Foreign nationals and others applying for Bangladesh visas through the official MRV process.
audience_bn: অফিসিয়াল এমআরভি প্রক্রিয়ায় বাংলাদেশ ভিসার আবেদনকারী বিদেশি নাগরিকসহ সংশ্লিষ্ট আবেদনকারী।
faq:
  - q: "Does this replace e-Passport services for Bangladeshi citizens?"
    a: "No. Passport services use the e-Passport portal. This MRV portal is for Bangladesh visa applications."
    q_bn: "এটি কি বাংলাদেশি নাগরিকের ই-পাসপোর্টের বিকল্প?"
    a_bn: "না। পাসপোর্ট সেবা ই-পাসপোর্ট পোর্টালে। এই এমআরভি পোর্টাল বাংলাদেশ ভিসা আবেদনের জন্য।"
related: [epassport, bmet]
last_verified: 2026-08-07
---
```

- [ ] **Step 3: Create `fire-service.md`**

```markdown
---
id: fire-service
slug: bd-fire-service
title: Fire Service & Civil Defence
title_bn: ফায়ার সার্ভিস ও সিভিল ডিফেন্স
description: Official Bangladesh Fire Service and Civil Defence portal for emergency information and public services.
description_bn: জরুরি তথ্য ও জনসেবার জন্য অফিসিয়াল বাংলাদেশ ফায়ার সার্ভিস ও সিভিল ডিফেন্স পোর্টাল
body: |
  **Fire Service & Civil Defence** is the official national portal for Bangladesh Fire Service and Civil Defence.

  Use it for official notices, contacts, and published public-service information. Fire-license e-services may be offered on related Official subdomains linked from the directorate.

body_bn: |
  **ফায়ার সার্ভিস ও সিভিল ডিফেন্স** বাংলাদেশ ফায়ার সার্ভিস ও সিভিল ডিফেন্সের অফিসিয়াল জাতীয় পোর্টাল।

  নোটিশ, যোগাযোগ ও প্রকাশিত জনসেবা তথ্যের জন্য এটি ব্যবহার করুন। ফায়ার লাইসেন্স ই-সেবা অধিদপ্তরের লিংক করা অফিসিয়াল সাবডোমেইনে থাকতে পারে।

url: "https://fireservice.gov.bd/"
official_domain: fireservice.gov.bd
category: safety
tags: [fire, civil defence, emergency, "ফায়ার", "সিভিল ডিফেন্স"]
aliases:
  - name: FSCD
    lang: en
    kind: alt
  - name: Bangladesh Fire Service
    lang: en
    kind: alt
  - name: ফায়ার সার্ভিস
    lang: bn
    kind: alt
  - name: সিভিল ডিফেন্স
    lang: bn
    kind: alt
status: ACTIVE
audience: Public seeking official Fire Service and Civil Defence information and related services.
audience_bn: ফায়ার সার্ভিস ও সিভিল ডিফেন্সের অফিসিয়াল তথ্য ও সেবা খোঁজা নাগরিক।
faq:
  - q: "What number do I call for fire emergencies?"
    a: "Use the emergency numbers published on the official Fire Service portal and national emergency guidance — confirm the current hotline on the official site."
    q_bn: "অগ্নিকাণ্ডে কোন নম্বরে ফোন করব?"
    a_bn: "অফিসিয়াল ফায়ার সার্ভিস পোর্টাল ও জাতীয় জরুরি নির্দেশনায় প্রকাশিত নম্বর ব্যবহার করুন—বর্তমান হটলাইন অফিসিয়াল সাইটে নিশ্চিত করুন।"
related: [police]
last_verified: 2026-08-07
---
```

- [ ] **Step 4: Create `ecourt.md`**

```markdown
---
id: ecourt
slug: bd-ecourt
title: e-Court
title_bn: ই-কোর্ট
description: Official e-Court portal for citizen reports and mobile court related digital services.
description_bn: নাগরিক অভিযোগ ও মোবাইল কোর্ট-সংক্রান্ত ডিজিটাল সেবার অফিসিয়াল ই-কোর্ট পোর্টাল
body: |
  **e-Court** is the official digital portal for e-Court / mobile-court related citizen services published by the government.

  Citizens can use published reporting and information features on the official site; magistrates and officers use separate administrative login paths described there.

body_bn: |
  **ই-কোর্ট** সরকার প্রকাশিত ই-কোর্ট / মোবাইল কোর্ট-সংক্রান্ত নাগরিক সেবার অফিসিয়াল ডিজিটাল পোর্টাল।

  নাগরিকরা অফিসিয়াল সাইটের রিপোর্টিং ও তথ্য ফিচার ব্যবহার করতে পারেন; ম্যাজিস্ট্রেট ও কর্মকর্তাদের প্রশাসনিক লগইন আলাদা পথে বর্ণিত।

url: "https://ecourt.gov.bd/"
official_domain: ecourt.gov.bd
category: justice
tags: [ecourt, court, mobile court, "ই-কোর্ট", "আদালত"]
aliases:
  - name: eCourts
    lang: en
    kind: alt
  - name: mobile court
    lang: en
    kind: informal
  - name: ইকোর্ট
    lang: bn
    kind: informal
  - name: মোবাইল কোর্ট
    lang: bn
    kind: alt
status: ACTIVE
audience: Citizens reporting matters through e-Court channels and users following official mobile-court digital services.
audience_bn: ই-কোর্ট চ্যানেলে বিষয় জানানো নাগরিক এবং মোবাইল কোর্ট ডিজিটাল সেবা অনুসরণকারী ব্যবহারকারী।
faq:
  - q: "Is this a full higher-court case management system for all lawsuits?"
    a: "e-Court as linked here focuses on the published mobile-court / citizen reporting services on ecourt.gov.bd. Follow on-site guidance for what is and is not offered."
    q_bn: "এটি কি সব মামলার সম্পূর্ণ উচ্চ আদালত কেস ম্যানেজমেন্ট?"
    a_bn: "এখানে লিংক করা ই-কোর্ট মূলত ecourt.gov.bd-এ প্রকাশিত মোবাইল কোর্ট / নাগরিক রিপোর্টিং সেবা। কী আছে কী নেই তা সাইটের নির্দেশনায় দেখুন।"
related: [police, fire-service]
last_verified: 2026-08-07
---
```

- [ ] **Step 5: Add related links on existing peers (optional but recommended)**

In `src/content/services/police.md`, set or extend:

```yaml
related: [fire-service, ecourt]
```

In `src/content/services/epassport.md`, set or extend:

```yaml
related: [nid, bangladesh-visa, bmet]
```

(Keep any existing valid related ids; do not self-relate.)

- [ ] **Step 6: Commit**

```bash
git add src/content/services/bmet.md src/content/services/bangladesh-visa.md \
  src/content/services/fire-service.md src/content/services/ecourt.md \
  src/content/services/police.md src/content/services/epassport.md
git -c user.name='Jaber Al Nahian' -c user.email='rijans.x@gmail.com' commit -m "$(cat <<'EOF'
feat(content): add migration, fire service, and e-Court Services

EOF
)"
```

---

### Task 6: Display Names table + backlog `shipped`

**Files:**
- Modify: `docs/guides/display-names.md`
- Modify: `docs/ops/service-catalog-backlog.md`

- [ ] **Step 1: Append rows to the Known Display Names table**

```markdown
| `desco` | **DESCO** | Acronym ALL CAPS |
| `dpdc` | **DPDC** | Acronym ALL CAPS |
| `nesco` | **NESCO** | Acronym ALL CAPS |
| `bmet` | **BMET Online Clearance** | Acronym + product clarity |
| `dhaka-wasa` | **Dhaka WASA** | WASA acronym |
| `ecourt` | **e-Court** | House lowercase `e-` |
| `bangladesh-visa` | **Bangladesh Online Visa (MRV)** | Expand MRV for clarity |
| `titas-gas` | **Titas Gas** | Company short name |
| `fire-service` | **Fire Service & Civil Defence** | Full directorate short form |
```

- [ ] **Step 2: Mark the nine wave rows `shipped` in the backlog; leave non-shipped utility siblings as `candidate`**

- [ ] **Step 3: Commit**

```bash
git add docs/guides/display-names.md docs/ops/service-catalog-backlog.md
git -c user.name='Jaber Al Nahian' -c user.email='rijans.x@gmail.com' commit -m "$(cat <<'EOF'
docs: Display Names and backlog shipped for priority wave

EOF
)"
```

---

### Task 7: CI + Instant Directory spot-check

**Files:** none required if green

- [ ] **Step 1: Run unit tests (content integrity)**

```bash
cd /home/jaber/www/Sheba
npm test
```

Expected: PASS, including `tests/unit/content-integrity.test.ts` (category refs, aliases EN+BN, related ids).

- [ ] **Step 2: Full CI**

```bash
npm run ci
```

Expected: `astro check` + Vitest + `astro build` succeed.

- [ ] **Step 3: Dev spot-check**

```bash
npm run dev
```

Open `http://localhost:4321` and confirm:

1. New chips: Utilities, Migration & Visa, Justice & Courts  
2. Search hits: `desco`, `ওয়াসা`, `bmet`, `ভিসা`, `ই-কোর্ট`  
3. One hop per new Category loads; Outbound CTA domain matches frontmatter  

- [ ] **Step 4: Final commit only if spot-check fixed copy**

```bash
git status
# if fixes:
git add -u
git -c user.name='Jaber Al Nahian' -c user.email='rijans.x@gmail.com' commit -m "$(cat <<'EOF'
fix(content): polish priority-wave hops after spot-check

EOF
)"
```

---

## Spec coverage self-review

| Spec requirement | Task |
|------------------|------|
| Catalog Backlog living table | Tasks 2, 6 |
| ~8–12 full hops | Tasks 4–5 (9 Services) |
| Musts DESCO, WASA, Titas, BMET, Visa | Tasks 4–5 |
| Research Fire + e-Court | Task 5 |
| Fill slots (utility peers) | Task 4 DPDC + NESCO |
| Categories utilities / migration / justice | Task 3 |
| One Outbound per Service | Wave roster + content |
| Manual research, no scraper | Task 1 curl only |
| Full hop gate + integrity | Task 7 |
| Display Names | Task 6 |
| Single content PR packaging | Commits on one branch; open one PR when executing |
| nagorikseba out of scope | Backlog skipped section (already in stub) |

## Placeholder / consistency check

- No TBD steps; URLs are concrete with Task 1 fail-closed alternates.  
- ids/slugs/related targets consistent across Tasks 4–5 (`bangladesh-visa`, `ecourt`, `fire-service`).  
- `justice` Category only ships because `ecourt` ships in the same plan.  
- Commit identity uses `git -c` (do not rewrite git config).

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-07-official-services-priority-wave.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks  
2. **Inline Execution** — execute tasks in this session with executing-plans checkpoints  

Which approach?
