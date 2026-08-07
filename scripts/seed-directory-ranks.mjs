/**
 * One-shot / regenerator: inject directory_global_rank + directory_category_rank.
 * Edit GLOBAL_TOP / CATEGORY_TOP maps first, then: node scripts/seed-directory-ranks.mjs
 * Living table: docs/guides/directory-ranking.md
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const servicesDir = join(root, 'src/content/services');

/** @type {Record<string, number>} */
const GLOBAL_TOP = {
  nid: 10,
  epassport: 20,
  etin: 30,
  ereturn: 40,
  bdris: 50,
  mygov: 60,
  'national-portal': 70,
  btrc: 80,
  'dhaka-wasa': 90,
  desco: 100,
  dpdc: 110,
  railway: 120,
  brta: 130,
  police: 140,
  eporcha: 150,
  'teachers-portal': 160,
  'edu-results': 170,
  surokkha: 180,
  'fire-service': 190,
  ekpay: 200,
};

/** @type {Record<string, Record<string, number>>} */
const CATEGORY_TOP = {
  central: {
    mygov: 10,
    'national-portal': 20,
    ekpay: 30,
    a2i: 40,
    bcc: 50,
    doict: 60,
  },
  identity: { nid: 10, epassport: 20, bdris: 30, dip: 40 },
  tax: { etin: 10, ereturn: 20, vat: 30, customs: 40, 'bangladesh-bank': 50 },
  transport: {
    railway: 10,
    brta: 20,
    biman: 30,
    caab: 40,
    rthd: 50,
    biwtc: 60,
    biwta: 70,
  },
  land: { eporcha: 10, namjari: 20, ldtax: 30, 'land-portal': 40 },
  education: {
    'teachers-portal': 10,
    'edu-results': 20,
    'xi-admission': 30,
    moedu: 40,
    nctb: 50,
    ugc: 60,
    du: 70,
    buet: 80,
    mopme: 90,
    tmed: 100,
    dshe: 110,
    bou: 120,
    'national-university': 130,
    banbeis: 140,
  },
  health: { surokkha: 10, dghs: 20, dgda: 30, dgfp: 40, iedcr: 50, bfsa: 60 },
  safety: {
    police: 10,
    'fire-service': 20,
    rab: 30,
    coastguard: 40,
    modmr: 50,
    ffwc: 60,
  },
  utilities: {
    'dhaka-wasa': 10,
    desco: 20,
    dpdc: 30,
    btrc: 40,
    'titas-gas': 50,
    nesco: 60,
    breb: 70,
    bpdb: 80,
    wzpdcl: 90,
    btcl: 100,
    pgcb: 110,
    berc: 120,
  },
  migration: {
    bmet: 10,
    'bangladesh-visa': 20,
    hajj: 30,
    probashi: 40,
    wewb: 50,
  },
  justice: { ecourt: 10, supremecourt: 20, lawjusticediv: 30 },
};

const files = readdirSync(servicesDir).filter((f) => f.endsWith('.md'));
const services = files.map((f) => {
  const path = join(servicesDir, f);
  const raw = readFileSync(path, 'utf8');
  const { data, content } = matter(raw);
  return { path, file: f, data, content, raw };
});

const byCategory = new Map();
for (const s of services) {
  const cat = String(s.data.category);
  if (!byCategory.has(cat)) byCategory.set(cat, []);
  byCategory.get(cat).push(s);
}

/** @type {Map<string, number>} */
const categoryRank = new Map();
for (const [cat, list] of byCategory) {
  const tops = CATEGORY_TOP[cat] ?? {};
  const sorted = [...list].sort((a, b) =>
    String(a.data.title).localeCompare(String(b.data.title)),
  );
  let next = 200;
  for (const s of sorted) {
    const id = String(s.data.id);
    if (tops[id] != null) {
      categoryRank.set(id, tops[id]);
    } else {
      categoryRank.set(id, next);
      next += 10;
    }
  }
}

const globalRank = new Map();
for (const [id, rank] of Object.entries(GLOBAL_TOP)) {
  globalRank.set(id, rank);
}
const leftovers = services
  .filter((s) => GLOBAL_TOP[String(s.data.id)] == null)
  .sort((a, b) => String(a.data.title).localeCompare(String(b.data.title)));
let g = 500;
for (const s of leftovers) {
  globalRank.set(String(s.data.id), g);
  g += 10;
}

for (const s of services) {
  const id = String(s.data.id);
  const gr = globalRank.get(id);
  const cr = categoryRank.get(id);
  if (gr == null || cr == null) throw new Error(`Missing rank for ${id}`);

  const body = s.content.startsWith('\n') ? s.content.slice(1) : s.content;
  const orig = s.raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!orig) throw new Error(`No frontmatter in ${s.file}`);
  const origFm = orig[1]
    .split('\n')
    .filter((line) => !/^\s*directory_(global|category)_rank\s*:/.test(line));

  const outLines = [];
  let inserted = false;
  for (const line of origFm) {
    outLines.push(line);
    if (!inserted && /^category:\s*/.test(line)) {
      outLines.push(`directory_global_rank: ${gr}`);
      outLines.push(`directory_category_rank: ${cr}`);
      inserted = true;
    }
  }
  if (!inserted) {
    outLines.push(`directory_global_rank: ${gr}`);
    outLines.push(`directory_category_rank: ${cr}`);
  }

  const next = `---\n${outLines.join('\n')}\n---\n${body.startsWith('\n') ? body : `\n${body}`}`;
  writeFileSync(s.path, next.endsWith('\n') ? next : `${next}\n`);
  console.log(`${id}: global=${gr} category=${cr}`);
}

console.log(`Updated ${services.length} services.`);
