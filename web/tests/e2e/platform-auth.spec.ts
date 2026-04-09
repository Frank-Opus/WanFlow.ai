import { expect, test } from '@playwright/test';

function parseCookie(rawSetCookie: string | null): { name: string; value: string } | null {
  if (!rawSetCookie) {
    return null;
  }

  const firstSegment = rawSetCookie.split(';', 1)[0]?.trim();
  if (!firstSegment) {
    return null;
  }

  const separatorIndex = firstSegment.indexOf('=');
  if (separatorIndex <= 0) {
    return null;
  }

  return {
    name: firstSegment.slice(0, separatorIndex),
    value: firstSegment.slice(separatorIndex + 1),
  };
}

test.describe('platform credentials auth flow', () => {
  test.skip(({ isMobile }) => isMobile);

  test('unauthenticated users are redirected from /dataflow/proofbench to login', async ({ page }) => {
    await page.goto('/dataflow/proofbench');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/\/dataflow\/proofbench\/login\?next=%2Fdataflow%2Fproofbench$/);
    await expect(page.getByRole('heading', { name: '登录 BenchmarkOps 企业评测台' })).toBeVisible();
  });

  test('unauthenticated users receive 401 on /api/platform/projects', async ({ request }) => {
    const response = await request.get('/api/platform/projects');

    expect(response.status()).toBe(401);
    const payload = (await response.json()) as { error?: string };
    expect(payload.error).toBe('Unauthorized');
  });

  test('/api/contact remains publicly accessible', async ({ request }) => {
    const stamp = Date.now();
    const response = await request.post('/api/contact', {
      data: {
        name: `Playwright Contact ${stamp}`,
        company: 'WanFlow QA',
        email: `qa-public-${stamp}@wanflow.ai`,
        interest: 'Demo',
        timeline: 'This quarter',
        message: 'Public contact endpoint should remain open without auth.',
      },
    });

    expect(response.status()).toBe(200);
    const payload = (await response.json()) as { ok?: boolean };
    expect(payload.ok).toBe(true);
  });

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

    const sessionCookie = parseCookie(await loginResponse.headerValue('set-cookie'));
    expect(sessionCookie?.name).toBe('wanflow_session');
    expect(sessionCookie?.value?.length).toBeGreaterThan(10);

    if (!sessionCookie) {
      throw new Error('Missing session cookie from login response.');
    }

    await context.addCookies([
      {
        name: sessionCookie.name,
        value: sessionCookie.value,
        domain: '127.0.0.1',
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
      },
    ]);

    await page.goto('/dataflow/proofbench');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/\/dataflow\/proofbench$/);
    await expect(page.getByText(/项目工作台|Project workspace/i).first()).toBeVisible();

    const cookies = await context.cookies();
    expect(cookies.some((cookie) => cookie.name === 'wanflow_session')).toBeTruthy();
  });
});
