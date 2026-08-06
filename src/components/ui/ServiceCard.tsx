import type { CSSProperties } from 'react';
import CategoryIcon from './CategoryIcon';
import { accentStyle } from '../../lib/categoryVisuals';

export type ServiceCardProps = {
  href: string;
  title: string;
  titleBn: string;
  description: string;
  domain: string;
  status: 'ACTIVE' | 'MAINTENANCE' | 'DEPRECATED';
  categoryId: string;
  icon: string;
};

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
        <CategoryIcon icon={icon} categoryId={categoryId} inheritAccent size={20} />
        <div className="service-card__titles">
          <h3 className="service-card__title">{title}</h3>
          <p className="service-card__title-bn" lang="bn">
            {titleBn}
          </p>
        </div>
        {status !== 'ACTIVE' && (
          <span className={`status-badge status-badge--${status.toLowerCase()}`}>
            {status === 'MAINTENANCE' ? 'Maintenance' : 'Deprecated'}
          </span>
        )}
      </div>
      <p className="service-card__description">{description}</p>
      <p className="service-card__domain">{domain}</p>
    </a>
  );
}
