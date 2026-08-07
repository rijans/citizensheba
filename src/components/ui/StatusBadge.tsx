import { statusBadgeLabel, type ServiceStatus } from '../../lib/serviceCard';

type Props = {
  status: ServiceStatus;
};

/** React twin of StatusBadge.astro — same classes / labels (island cards). */
export default function StatusBadge({ status }: Props) {
  const label = statusBadgeLabel(status);
  if (!label) return null;
  return (
    <span className={`status-badge status-badge--${status.toLowerCase()}`}>{label}</span>
  );
}
