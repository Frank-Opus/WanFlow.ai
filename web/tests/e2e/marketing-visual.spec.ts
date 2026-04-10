import { expect, test, type Page } from '@playwright/test';

async function prepareStablePage(page: Page, path: string) {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(path);
  await page.waitForLoadState('networkidle');
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        caret-color: transparent !important;
      }

      html {
        scroll-behavior: auto !important;
      }

      .site-header-shell,
      .mkt-panel,
      .mkt-pop-surface,
      .mkt-card,
      .mkt-module-card,
      .mkt-case-card,
      .mkt-proof-panel,
      .mkt-rail-card,
      .mkt-split-callout,
      .mkt-flow-step {
        backdrop-filter: none !important;
      }
    `,
  });
}

test.describe('marketing visual regression', () => {
  test('home page desktop shell matches the baseline', async ({ page, isMobile }) => {
    test.skip(isMobile);
    await prepareStablePage(page, '/');

    await expect(page).toHaveScreenshot('home-main-desktop.png', {
      animations: 'disabled',
      fullPage: true,
    });
  });

  test('contact page desktop shell matches the baseline', async ({ page, isMobile }) => {
    test.skip(isMobile);
    await prepareStablePage(page, '/contact');

    await expect(page.locator('main')).toHaveScreenshot('contact-main-desktop.png', {
      animations: 'disabled',
    });
  });

  test('proofbench login desktop shell matches the baseline', async ({ page, isMobile }) => {
    test.skip(isMobile);
    await prepareStablePage(page, '/dataflow/proofbench/login');

    await expect(page.locator('main')).toHaveScreenshot('proofbench-login-desktop.png', {
      animations: 'disabled',
    });
  });

  test('home page mobile menu matches the baseline', async ({ page, isMobile }) => {
    test.skip(!isMobile);
    await prepareStablePage(page, '/');

    await page.getByRole('button', { name: /菜单|menu/i }).click();
    await expect(page.locator('#mobile-marketing-nav')).toBeVisible();

    await expect(page).toHaveScreenshot('home-mobile-menu-open.png', {
      animations: 'disabled',
      fullPage: true,
    });
  });
});
