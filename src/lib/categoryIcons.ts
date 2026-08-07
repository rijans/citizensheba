import type { LucideIcon } from 'lucide-react';
import {
  Banknote,
  BookUser,
  Car,
  Droplets,
  FileBadge,
  FileText,
  Fingerprint,
  Flame,
  Globe,
  GraduationCap,
  HeartPulse,
  IdCard,
  Landmark,
  LayoutGrid,
  Map,
  Plane,
  Radio,
  Receipt,
  Scale,
  ScrollText,
  SearchX,
  Shield,
  Stamp,
  TrainFront,
  Wallet,
  Zap,
} from 'lucide-react';

/** Lucide keys used by Category YAML and optional Service `icon` fields. */
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
  'id-card': IdCard,
  'book-user': BookUser,
  receipt: Receipt,
  'file-text': FileText,
  'scroll-text': ScrollText,
  globe: Globe,
  radio: Radio,
  droplets: Droplets,
  'train-front': TrainFront,
  'file-badge': FileBadge,
  flame: Flame,
  wallet: Wallet,
  stamp: Stamp,
};

export function lucideIconFor(key: string | undefined | null): LucideIcon {
  if (!key) return Landmark;
  return BY_KEY[key] ?? Landmark;
}

export { LayoutGrid, SearchX };
