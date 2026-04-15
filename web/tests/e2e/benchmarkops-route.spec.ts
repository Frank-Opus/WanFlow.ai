import { expect, test } from '@playwright/test';

const marketingPages = ['/', '/solutions', '/cases', '/about', '/contact'] as const;

test.describe('benchmarkops canonical route', () => {
  test('canonical /dataflow/proofbench route redirects to the protected login page', async ({ page }) => {
    await page.goto('/dataflow/proofbench');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/\/dataflow\/proofbench\/login\?next=%2Fdataflow%2Fproofbench$/);
    await expect(page.getByRole('heading', { name: '登录 BenchmarkOps 企业评测台' })).toBeVisible();
  });

  test('marketing pages do not expose the legacy /proofbench route', async ({ page }) => {
    for (const route of marketingPages) {
      await page.goto(route);
      await page.waitForLoadState('networkidle');

      await expect(page.locator('a[href="/proofbench"]'), `legacy proofbench link leaked on ${route}`).toHaveCount(0);
    }
  });

  test('home page hides benchmarkops entry but other marketing pages keep the canonical route', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('a[href="/dataflow/proofbench"]')).toHaveCount(0);

    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    expect(await page.locator('a[href="/dataflow/proofbench"]').count()).toBeGreaterThan(0);
  });

  test('legacy /proofbench route returns 404', async ({ page }) => {
    const response = await page.goto('/proofbench', { waitUntil: 'domcontentloaded' });

    expect(response?.status()).toBe(404);
  });
});
