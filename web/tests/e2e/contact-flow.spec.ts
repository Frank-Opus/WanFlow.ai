import { promises as fs } from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';

const leadsDir = path.join(process.cwd(), '.playwright-runtime', 'marketing-leads');
const outboxDir = path.join(process.cwd(), '.playwright-runtime', 'contact-email-outbox');
const publicContact = {
  email: 'wanflow@163.com',
  phone: '+86 18307010306',
  wechat: 'FrankXu0303',
} as const;

test.describe('contact flow end-to-end', () => {
  test.skip(({ isMobile }) => isMobile);

  test('shows canonical public contact details in zh/en and homepage JSON-LD', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('body')).toContainText(`邮箱：${publicContact.email}`);
    await expect(page.locator('body')).toContainText(`电话：${publicContact.phone}`);
    await expect(page.locator('body')).toContainText(`WeChat：${publicContact.wechat}`);

    await page.getByRole('button', { name: 'EN' }).click();
    await expect(page.locator('body')).toContainText(`Email: ${publicContact.email}`);
    await expect(page.locator('body')).toContainText(`Phone: ${publicContact.phone}`);
    await expect(page.locator('body')).toContainText(`WeChat: ${publicContact.wechat}`);

    await page.goto('/');
    const organizationContact = await page.$$eval('script[type="application/ld+json"]', (elements) => {
      const docs = elements
        .map((element) => element.textContent?.trim())
        .filter((text): text is string => Boolean(text))
        .map((text) => {
          try {
            return JSON.parse(text);
          } catch {
            return null;
          }
        })
        .filter((parsed): parsed is Record<string, unknown> | Record<string, unknown>[] => parsed !== null);

      const nodes = docs.flatMap((doc) => {
        if (Array.isArray(doc)) {
          return doc;
        }
        if (Array.isArray(doc['@graph'])) {
          return doc['@graph'] as Record<string, unknown>[];
        }
        return [doc];
      });

      const organizationNode = nodes.find((node) => {
        const type = node['@type'];
        if (Array.isArray(type)) {
          return type.includes('Organization');
        }
        return type === 'Organization';
      });

      const contactPoint = Array.isArray(organizationNode?.contactPoint) ? organizationNode.contactPoint[0] : null;
      return {
        email: typeof organizationNode?.email === 'string' ? organizationNode.email : null,
        telephone: typeof contactPoint?.telephone === 'string' ? contactPoint.telephone : null,
      };
    });

    expect(organizationContact.email).toBe(publicContact.email);
    expect(organizationContact.telephone).toBe(publicContact.phone);
  });

  test('submits the contact form into isolated lead storage', async ({ page }) => {
    await fs.rm(leadsDir, { recursive: true, force: true });
    await fs.rm(outboxDir, { recursive: true, force: true });

    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    const stamp = String(Date.now());
    await page.locator('input[name="name"]').fill('端到端测试用户');
    await page.locator('input[name="company"]').fill('WanFlow QA');
    await page.locator('input[name="email"]').fill(`qa-${stamp}@wanflow.ai`);
    await page.locator('select[name="interest"]').selectOption({ index: 1 });
    await page.locator('select[name="timeline"]').selectOption({ index: 1 });
    await page.locator('textarea[name="message"]').fill('这是一次联系表单端到端测试。');
    const submitResponsePromise = page.waitForResponse(
      (response) => response.url().includes('/api/contact') && response.request().method() === 'POST',
    );
    await page.getByRole('button', { name: '提交咨询' }).click();
    const submitResponse = await submitResponsePromise;
    expect(submitResponse.ok()).toBeTruthy();

    await expect(page.locator('.mkt-status-success')).toContainText('已收到你的信息');
    await expect(page.locator('.mkt-status-success')).toContainText('工作日 24 小时内通过邮箱联系你');

    const leadFiles = await fs.readdir(leadsDir);
    expect(leadFiles.length).toBeGreaterThan(0);

    const submittedEmail = `qa-${stamp}@wanflow.ai`;
    const leadEntries = await Promise.all(
      leadFiles.map(async (fileName) => ({
        fileName,
        payload: JSON.parse(await fs.readFile(path.join(leadsDir, fileName), 'utf8')) as {
          company?: string;
          email?: string;
          message?: string;
        },
      })),
    );
    const leadEntry = leadEntries.find((item) => item.payload.email === submittedEmail);

    expect(leadEntry).toBeDefined();
    if (!leadEntry) {
      throw new Error(`Unable to locate lead file for ${submittedEmail}`);
    }

    const leadPayload = leadEntry.payload;
    expect(leadPayload.company).toBe('WanFlow QA');
    expect(leadPayload.email).toBe(submittedEmail);
    expect(leadPayload.message).toBe('这是一次联系表单端到端测试。');

    const emailFiles = await fs.readdir(outboxDir);
    expect(emailFiles.length).toBeGreaterThan(0);
    const emailPayload = JSON.parse(await fs.readFile(path.join(outboxDir, emailFiles[0]), 'utf8')) as {
      to?: Array<{ address?: string }>;
      subject?: string;
      replyTo?: Array<{ address?: string }>;
      html?: string;
    };

    expect(emailPayload.to?.[0]?.address).toBe(publicContact.email);
    expect(emailPayload.replyTo?.[0]?.address).toBe(submittedEmail);
    expect(emailPayload.subject).toContain('WanFlow QA / 端到端测试用户');
    expect(emailPayload.html).toContain('这是一次联系表单端到端测试。');
  });
});
