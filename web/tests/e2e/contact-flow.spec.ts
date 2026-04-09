import { promises as fs } from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';

const leadsDir = path.join(process.cwd(), '.playwright-runtime', 'marketing-leads');

test.describe('contact flow end-to-end', () => {
  test.skip(({ isMobile }) => isMobile);

  test('submits the contact form into isolated lead storage', async ({ page }) => {
    await fs.rm(leadsDir, { recursive: true, force: true });

    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    const stamp = String(Date.now());
    await page.locator('input[name="name"]').fill('端到端测试用户');
    await page.locator('input[name="company"]').fill('WanFlow QA');
    await page.locator('input[name="email"]').fill(`qa-${stamp}@wanflow.ai`);
    await page.locator('select[name="interest"]').selectOption({ index: 1 });
    await page.locator('select[name="timeline"]').selectOption({ index: 1 });
    await page.locator('textarea[name="message"]').fill('这是一次联系表单端到端测试。');
    await page.getByRole('button', { name: '提交咨询' }).click();

    await expect(page.getByRole('status')).toContainText('已收到你的信息。我们会在工作日尽快通过邮箱联系你。');

    const leadFiles = await fs.readdir(leadsDir);
    expect(leadFiles).toHaveLength(1);

    const leadPayload = JSON.parse(await fs.readFile(path.join(leadsDir, leadFiles[0]!), 'utf8')) as {
      company?: string;
      email?: string;
      message?: string;
    };

    expect(leadPayload.company).toBe('WanFlow QA');
    expect(leadPayload.email).toBe(`qa-${stamp}@wanflow.ai`);
    expect(leadPayload.message).toBe('这是一次联系表单端到端测试。');
  });
});
