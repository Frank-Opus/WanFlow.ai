import { expect, test } from '@playwright/test';

const desktopPages = [
  { name: 'home', path: '/' },
  { name: 'solutions', path: '/solutions' },
  { name: 'cases', path: '/cases' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' },
] as const;

test.describe('marketing desktop regressions', () => {
  test.skip(({ isMobile }) => isMobile);

  test('desktop header navigation stays stable across route changes', async ({ page }) => {
    const measureHeader = async (path: string) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      return page.evaluate(() => {
        const nav = document.querySelector('header nav[aria-label]') as HTMLElement | null;
        const activeLink = document.querySelector('header nav[aria-label] a[aria-current="page"]') as HTMLElement | null;

        if (!nav || !activeLink) {
          throw new Error('Header navigation or active link not found');
        }

        const navRect = nav.getBoundingClientRect();
        const activeRect = activeLink.getBoundingClientRect();

        return {
          navLeft: Math.round(navRect.left),
          navTop: Math.round(navRect.top),
          navHeight: Math.round(navRect.height),
          activeHeight: Math.round(activeRect.height),
        };
      });
    };

    const home = await measureHeader('/');
    const solutions = await measureHeader('/solutions');

    expect(Math.abs(home.navLeft - solutions.navLeft)).toBeLessThanOrEqual(1);
    expect(Math.abs(home.navTop - solutions.navTop)).toBeLessThanOrEqual(1);
    expect(Math.abs(home.navHeight - solutions.navHeight)).toBeLessThanOrEqual(1);
    expect(Math.abs(home.activeHeight - solutions.activeHeight)).toBeLessThanOrEqual(1);
  });

  for (const pageCase of desktopPages) {
    test(pageCase.name + ' renders without desktop overflow', async ({ page }, testInfo) => {
      await page.goto(pageCase.path);
      await page.waitForLoadState('networkidle');

      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('main h1').first()).toBeVisible();
      await expect(page.locator('header').first()).toBeVisible();
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

      const screenshotPath = testInfo.outputPath(pageCase.name + '-desktop.png');
      await page.screenshot({ path: screenshotPath, fullPage: true, animations: 'disabled', timeout: 20_000 });
      await testInfo.attach(pageCase.name + '-desktop', {
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
    await expect(page.locator('header a[href="/contact"]').first()).toBeVisible();

    const screenshotPath = testInfo.outputPath('home-motion-hooks.png');
    await page.screenshot({ path: screenshotPath, fullPage: false, animations: 'disabled', timeout: 20_000 });
    await testInfo.attach('home-motion-hooks', {
      path: screenshotPath,
      contentType: 'image/png',
    });
  });

  test('proofbench entry redirects unauthenticated visitors to login', async ({ page }) => {
    await page.goto('/dataflow/proofbench');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/\/dataflow\/proofbench\/login\?next=%2Fdataflow%2Fproofbench$/);
    await expect(page.getByRole('heading', { name: '登录 BenchmarkOps 企业评测台' })).toBeVisible();
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
    await page.screenshot({ path: screenshotPath, fullPage: false, animations: 'disabled', timeout: 20_000 });
    await testInfo.attach('home-mobile-menu', {
      path: screenshotPath,
      contentType: 'image/png',
    });
  });
});
