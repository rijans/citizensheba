import type { CSSProperties } from 'react';
import CategoryIcon from './CategoryIcon';
import StatusBadge from './StatusBadge';
import { accentStyle } from '../../lib/categoryVisuals';
import type { ServiceCardFields } from '../../lib/serviceCard';

export type ServiceCardProps = ServiceCardFields;

export default function ServiceCard({
  href,
  title,
  titleBn,
  description,
  domain,
  status,
  categoryId,
  icon,
}: ServiceCardProps) {
  const style = accentStyle(categoryId) as CSSProperties;

  return (
    <a className="service-card" href={href} style={style}>
      <div className="service-card__top">
        <CategoryIcon icon={icon} categoryId={categoryId} inheritAccent size={24} />
        <div className="service-card__titles">
          <h3 className="service-card__title">{title}</h3>
          <p className="service-card__title-bn" lang="bn">
            {titleBn}
          </p>
        </div>
        <StatusBadge status={status} />
      </div>
      <p className="service-card__description">{description}</p>
      <p className="service-card__domain">{domain}</p>
    </a>
  );
}
