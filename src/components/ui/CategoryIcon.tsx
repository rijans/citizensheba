import type { CSSProperties } from 'react';
import { lucideIconFor } from '../../lib/categoryIcons';
import { accentStyle } from '../../lib/categoryVisuals';

type Props = {
  icon: string;
  categoryId: string;
  size?: number;
  className?: string;
  /** When true, parent supplies --cat-accent via accentStyle */
  inheritAccent?: boolean;
};

export default function CategoryIcon({
  icon,
  categoryId,
  size = 18,
  className = '',
  inheritAccent = false,
}: Props) {
  const Icon = lucideIconFor(icon);
  const style = inheritAccent ? undefined : (accentStyle(categoryId) as CSSProperties);

  return (
    <span className={`category-icon ${className}`.trim()} style={style} aria-hidden="true">
      <Icon size={size} strokeWidth={2} />
    </span>
  );
}
