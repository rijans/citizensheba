import { test, expect } from '@playwright/test';

test.describe('Home', () => {
  test('shows search and service directory', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('CitizenSheba');

    const search = page.getByRole('searchbox');
    await expect(search).toBeVisible();
    await search.fill('NID');

    await expect(page.getByRole('link', { name: /NID Services/i })).toBeVisible();
  });

  test('navigates to a service page', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /NID Services/i }).click();

    await expect(page).toHaveURL(/\/services\/bd-nid/);
    await expect(page.getByRole('link', { name: 'Open official site' })).toBeVisible();
  });
});
