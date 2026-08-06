/** Soft Category accents — design system, keyed by category id (ADR-0004). */
export type CategoryAccent = {
  /** Icon / active chip stroke-fill hue */
  accent: string;
  /** Muted well / inactive chip tint */
  soft: string;
};

export const CATEGORY_ACCENTS: Record<string, CategoryAccent> = {
  central: { accent: '#006a4e', soft: 'rgba(0, 106, 78, 0.12)' },
  identity: { accent: '#1d4ed8', soft: 'rgba(29, 78, 216, 0.12)' },
  tax: { accent: '#b45309', soft: 'rgba(180, 83, 9, 0.12)' },
  transport: { accent: '#0f766e', soft: 'rgba(15, 118, 110, 0.12)' },
  land: { accent: '#7c3aed', soft: 'rgba(124, 58, 237, 0.12)' },
  education: { accent: '#0369a1', soft: 'rgba(3, 105, 161, 0.12)' },
  health: { accent: '#be123c', soft: 'rgba(190, 18, 60, 0.12)' },
  safety: { accent: '#334155', soft: 'rgba(51, 65, 85, 0.12)' },
  utilities: { accent: '#0891b2', soft: 'rgba(8, 145, 178, 0.12)' },
  migration: { accent: '#4338ca', soft: 'rgba(67, 56, 202, 0.12)' },
  justice: { accent: '#57534e', soft: 'rgba(87, 83, 78, 0.12)' },
};

export const DEFAULT_CATEGORY_ACCENT: CategoryAccent = {
  accent: '#006a4e',
  soft: 'rgba(0, 106, 78, 0.12)',
};

export function categoryAccent(categoryId: string): CategoryAccent {
  return CATEGORY_ACCENTS[categoryId] ?? DEFAULT_CATEGORY_ACCENT;
}

export function accentStyle(categoryId: string): Record<string, string> {
  const { accent, soft } = categoryAccent(categoryId);
  return {
    '--cat-accent': accent,
    '--cat-accent-soft': soft,
  };
}
