export type SearchableService = {
  id: string;
  slug: string;
  categoryId: string;
  title: string;
  titleBn: string;
  description: string;
  tags: string[];
  /** Name Alias strings for search (all kinds). */
  aliases: string[];
  categoryName: string;
  categoryNameBn: string;
  domain: string;
  status: 'ACTIVE' | 'MAINTENANCE' | 'DEPRECATED';
};

const norm = (s: string) => (s || '').toString().toLowerCase().normalize('NFC');

function subseq(q: string, s: string): boolean {
  let i = 0;
  for (let j = 0; j < s.length && i < q.length; j++) if (s[j] === q[i]) i++;
  return i === q.length;
}

export function scoreService(sv: SearchableService, rawQuery: string): number {
  const q = norm(rawQuery).trim();
  if (!q) return 0;

  const title = norm(sv.title);
  const desc = norm(sv.description);
  const bn = `${norm(sv.titleBn)} ${norm(sv.categoryNameBn)}`;
  const tags = sv.tags.map(norm);
  const aliases = (sv.aliases ?? []).map(norm);
  const catName = norm(sv.categoryName);
  const dom = norm(sv.domain);
  const hay = [title, bn, desc, catName, tags.join(' '), aliases.join(' '), dom].join(' | ');

  let total = 0;
  for (const t of q.split(/\s+/)) {
    let best = -1;
    if (title.startsWith(t)) best = 100;
    else if (title.split(/\s+/).some((w) => w.startsWith(t))) best = 90;
    else if (title.includes(t)) best = 82;
    else if (tags.some((g) => g.startsWith(t)) || aliases.some((g) => g.startsWith(t))) best = 76;
    else if (bn.includes(t)) best = 74;
    else if (tags.some((g) => g.includes(t)) || aliases.some((g) => g.includes(t))) best = 66;
    else if (catName.includes(t)) best = 56;
    else if (desc.includes(t)) best = 50;
    else if (dom.includes(t)) best = 46;
    else if (t.length >= 3 && subseq(t, title.replace(/\s+/g, ''))) best = 28;
    else if (t.length >= 4 && subseq(t, hay)) best = 12;
    if (best < 0) return -1;
    total += best;
  }
  return total;
}

export function filterAndSort(
  services: SearchableService[],
  query: string,
  categoryId: string | null,
): SearchableService[] {
  const scored = services
    .filter((s) => (categoryId ? s.categoryId === categoryId : true))
    .map((s) => ({ s, score: scoreService(s, query) }))
    .filter((x) => x.score >= 0);

  if (!query.trim()) return scored.map((x) => x.s);
  return scored.sort((a, b) => b.score - a.score).map((x) => x.s);
}
