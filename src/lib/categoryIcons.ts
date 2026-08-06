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
  SearchX,
  Shield,
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
};

export function lucideIconFor(key: string | undefined | null): LucideIcon {
  if (!key) return Landmark;
  return BY_KEY[key] ?? Landmark;
}

export { LayoutGrid, SearchX };
