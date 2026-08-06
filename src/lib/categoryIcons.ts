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
