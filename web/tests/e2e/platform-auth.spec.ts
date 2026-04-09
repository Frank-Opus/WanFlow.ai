import { expect, test } from '@playwright/test';

test.describe('platform credentials auth flow', () => {
  test.skip(({ isMobile }) => isMobile);

  test('login page is reachable and renders the credentials form', async ({ page }) => {
    await page.goto('/dataflow/proofbench/login');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { name: '登录 BenchmarkOps 企业评测台' })).toBeVisible();
    await expect(page.getByLabel('邮箱')).toBeVisible();
    await expect(page.getByLabel('密码')).toBeVisible();
    await expect(page.getByRole('button', { name: '登录并进入工作台' })).toBeVisible();
  });

  test('invalid credentials show failure message', async ({ page }) => {
    await page.goto('/dataflow/proofbench/login');
    await page.waitForLoadState('networkidle');

    await page.getByLabel('邮箱').fill('wrong-user@example.com');
    await page.getByLabel('密码').fill('wrong-password');
    await page.getByRole('button', { name: '登录并进入工作台' }).click();

    await expect(page.locator('form [role="alert"]')).toContainText('账号或密码错误。');
    await expect(page).toHaveURL(/\/dataflow\/proofbench\/login$/);
  });

  test('valid credentials return success and redirect to proofbench', async ({ page, context }) => {
    await page.goto('/dataflow/proofbench/login');
    await page.waitForLoadState('networkidle');

    await page.getByLabel('邮箱').fill('wanflow@163.com');
    await page.getByLabel('密码').fill('ChangeMe123!');

    const loginResponsePromise = page.waitForResponse(
      (response) => response.url().includes('/api/auth/login') && response.request().method() === 'POST'
    );

    await page.getByRole('button', { name: '登录并进入工作台' }).click();

    const loginResponse = await loginResponsePromise;
    expect(loginResponse.ok()).toBeTruthy();

    const payload = (await loginResponse.json()) as { ok?: boolean; redirectTo?: string };
    expect(payload.ok).toBe(true);
    expect(payload.redirectTo).toBe('/dataflow/proofbench');

    await expect(page).toHaveURL(/\/dataflow\/proofbench$/);

    const cookies = await context.cookies();
    expect(cookies.some((cookie) => cookie.name === 'wanflow_session')).toBeTruthy();
  });
});
