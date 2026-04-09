import { promises as fs } from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import { siteContact } from '../../src/lib/marketing';

const leadsDir = path.join(process.cwd(), '.playwright-runtime', 'marketing-leads');

test.describe('contact flow end-to-end', () => {
  test.skip(({ isMobile }) => isMobile);

  test('shows canonical public contact details in zh/en and homepage JSON-LD', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('body')).toContainText(`邮箱：${siteContact.email}`);
    await expect(page.locator('body')).toContainText(`WeChat：${siteContact.wechat}`);

    await page.getByRole('button', { name: 'EN' }).click();
    await expect(page.locator('body')).toContainText(`Email: ${siteContact.email}`);
    await expect(page.locator('body')).toContainText(`WeChat: ${siteContact.wechat}`);

    await page.goto('/');
    const organizationEmail = await page.$$eval('script[type="application/ld+json"]', (elements) => {
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

      return typeof organizationNode?.email === 'string' ? organizationNode.email : null;
    });

    expect(organizationEmail).toBe(siteContact.email);
  });

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
