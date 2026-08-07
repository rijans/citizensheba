/** Shared Service card / status badge types (React island + Astro SSR twins). */

export type ServiceStatus = 'ACTIVE' | 'MAINTENANCE' | 'DEPRECATED';

export type ServiceCardFields = {
  href: string;
  title: string;
  titleBn: string;
  description: string;
  domain: string;
  status: ServiceStatus;
  categoryId: string;
  icon: string;
};

/** Visible badge text, or null when ACTIVE (no badge). */
export function statusBadgeLabel(status: ServiceStatus): string | null {
  if (status === 'ACTIVE') return null;
  return status === 'MAINTENANCE' ? 'Maintenance' : 'Deprecated';
}
