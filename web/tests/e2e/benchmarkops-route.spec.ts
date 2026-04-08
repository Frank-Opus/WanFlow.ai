import { expect, test } from '@playwright/test';
import { BENCHMARKOPS_PRODUCT_TITLE } from '../../../DataFlow/proofbench/lib/constants';

const marketingPages = ['/', '/solutions', '/cases', '/about', '/contact'] as const;

test.describe('benchmarkops canonical route', () => {
  test('formal product title is visible on /dataflow/proofbench', async ({ page }) => {
    await page.goto('/dataflow/proofbench');
    await page.waitForLoadState('networkidle');

    await expect(page.getByTestId('benchmarkops-formal-shell')).toBeVisible();
    await expect(page.getByTestId('benchmarkops-formal-title')).toHaveText(BENCHMARKOPS_PRODUCT_TITLE);
  });

  test('marketing pages do not expose the legacy /proofbench route', async ({ page }) => {
    for (const route of marketingPages) {
      await page.goto(route);
      await page.waitForLoadState('networkidle');

      await expect(page.locator('a[href="/proofbench"]'), `legacy proofbench link leaked on ${route}`).toHaveCount(0);
    }
  });

  test('home page keeps the canonical benchmarkops entry point', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(await page.locator('a[href="/dataflow/proofbench"]').count()).toBeGreaterThan(0);
  });

  test('legacy /proofbench route returns 404', async ({ page }) => {
    const response = await page.goto('/proofbench', { waitUntil: 'domcontentloaded' });

    expect(response?.status()).toBe(404);
  });
});
