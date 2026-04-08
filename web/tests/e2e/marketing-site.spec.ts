import { expect, test } from '@playwright/test';

const desktopPages = [
  { name: 'home', path: '/' },
  { name: 'solutions', path: '/solutions' },
  { name: 'cases', path: '/cases' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' },
  { name: 'proofbench', path: '/proofbench' },
] as const;

test.describe('marketing desktop regressions', () => {
  test.skip(({ isMobile }) => isMobile);

  for (const pageCase of desktopPages) {
    test(`${pageCase.name} renders without desktop overflow`, async ({ page }, testInfo) => {
      await page.goto(pageCase.path);
      await page.waitForLoadState('networkidle');

      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('main h1').first()).toBeVisible();
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('header nav[aria-label]').first()).toBeVisible();

      const overflow = await page.evaluate(() => {
        const root = document.documentElement;
        return {
          scrollWidth: root.scrollWidth,
          clientWidth: root.clientWidth,
          overflowX: Math.max(0, root.scrollWidth - root.clientWidth),
        };
      });

      expect(overflow.overflowX).toBeLessThanOrEqual(1);

      const screenshotPath = testInfo.outputPath(`${pageCase.name}-desktop.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true, animations: 'disabled' });
      await testInfo.attach(`${pageCase.name}-desktop`, {
        path: screenshotPath,
        contentType: 'image/png',
      });
    });
  }

  test('home page wires motion hooks and desktop header actions', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('.mkt-reveal').first()).toBeVisible();
    await expect(page.locator('.mkt-hero-stage-1').first()).toBeVisible();
    await expect(page.locator('.mkt-stagger-grid').first()).toBeVisible();

    const desktopActions = page.locator('header').locator('a[href="/proofbench"], a[href="/contact"]').filter({ hasText: /./ });
    await expect(desktopActions.first()).toBeVisible();

    const screenshotPath = testInfo.outputPath('home-motion-hooks.png');
    await page.screenshot({ path: screenshotPath, fullPage: false, animations: 'disabled' });
    await testInfo.attach('home-motion-hooks', {
      path: screenshotPath,
      contentType: 'image/png',
    });
  });
});

test.describe('marketing mobile smoke', () => {
  test.skip(({ isMobile }) => !isMobile);

  test('home page mobile menu opens and layout stays within viewport', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const menuButton = page.getByRole('button', { name: /菜单|menu/i });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    await expect(page.locator('#mobile-marketing-nav')).toBeVisible();
    await expect(page.locator('#mobile-marketing-nav a[href="/solutions"]')).toBeVisible();

    const overflow = await page.evaluate(() => {
      const root = document.documentElement;
      return Math.max(0, root.scrollWidth - root.clientWidth);
    });

    expect(overflow).toBeLessThanOrEqual(1);

    const screenshotPath = testInfo.outputPath('home-mobile-menu.png');
    await page.screenshot({ path: screenshotPath, fullPage: true, animations: 'disabled' });
    await testInfo.attach('home-mobile-menu', {
      path: screenshotPath,
      contentType: 'image/png',
    });
  });
});
