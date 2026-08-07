import { describe, expect, it } from 'vitest';
import { statusBadgeLabel } from '../../src/lib/serviceCard';

describe('statusBadgeLabel', () => {
  it('hides ACTIVE', () => {
    expect(statusBadgeLabel('ACTIVE')).toBeNull();
  });

  it('labels non-ACTIVE statuses', () => {
    expect(statusBadgeLabel('MAINTENANCE')).toBe('Maintenance');
    expect(statusBadgeLabel('DEPRECATED')).toBe('Deprecated');
  });
});
