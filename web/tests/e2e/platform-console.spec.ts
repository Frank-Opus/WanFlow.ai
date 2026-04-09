import { expect, test } from '@playwright/test';

test.describe('platform console end-to-end', () => {
  test.skip(({ isMobile }) => isMobile);

  test('starts from an isolated seeded platform workspace', async ({ page }) => {
    await page.goto('/dataflow/proofbench');
    await page.waitForLoadState('networkidle');

    const response = await page.request.get('/api/platform/projects');
    expect(response.ok()).toBeTruthy();

    const payload = (await response.json()) as {
      projects?: Array<{
        project: {
          name: string;
        };
      }>;
    };

    expect(payload.projects).toHaveLength(1);
    expect(payload.projects?.[0]?.project.name).toBe('企业评测项目 / Enterprise Evaluation');
  });

  test('can create a project and a manual item end-to-end', async ({ page }) => {
    await page.goto('/dataflow/proofbench');
    await page.waitForLoadState('networkidle');

    const stamp = String(Date.now());
    const projectName = `E2E Project ${stamp}`;
    const itemTitle = `E2E Item ${stamp}`;

    await page.locator('input[placeholder="项目名称"]').fill(projectName);
    await page.locator('input[placeholder="项目说明"]').fill('E2E test project created by Playwright.');
    await page.getByRole('button', { name: '新建项目' }).click();

    await expect(page.getByRole('status')).toContainText('项目已创建。');
    await expect(page.getByText(projectName).first()).toBeVisible();

    const afterProject = (await (await page.request.get('/api/platform/projects')).json()) as {
      projects?: Array<{ project: { name: string } }>;
    };
    expect(afterProject.projects?.[0]?.project.name).toBe(projectName);

    await page.getByRole('tab', { name: '题目列表' }).click();
    await page.locator('input[placeholder="题目标题"]').fill(itemTitle);
    await page.locator('textarea[placeholder="题目内容 / Prompt"]').fill('What is 1 + 1?');
    await page.locator('textarea[placeholder="标准答案"]').fill('2');
    await page.getByRole('button', { name: '创建题目' }).click();

    await expect(page.getByRole('status')).toContainText('题目已创建。');
    await expect(page.getByText(itemTitle).first()).toBeVisible();
  });

  test('can upload a JSON source and materialize import downloads', async ({ page }) => {
    await page.goto('/dataflow/proofbench');
    await page.waitForLoadState('networkidle');

    const stamp = String(Date.now());
    const projectName = `Upload Project ${stamp}`;
    const sourceName = `import-${stamp}.json`;

    await page.locator('input[placeholder="项目名称"]').fill(projectName);
    await page.locator('input[placeholder="项目说明"]').fill('Project for upload flow verification.');
    await page.getByRole('button', { name: '新建项目' }).click();
    await expect(page.getByRole('status')).toContainText('项目已创建。');

    await page.getByRole('tab', { name: '文件导入中心' }).click();
    await page.locator('input[type="file"]').first().setInputFiles({
      name: sourceName,
      mimeType: 'application/json',
      buffer: Buffer.from(
        JSON.stringify(
          {
            标题: `Imported Item ${stamp}`,
            问题: 'What is 2 + 2?',
            最终答案: '4',
            领域类型: 'Arithmetic',
            适合年级: 'Primary',
            考察知识点: ['addition'],
          },
          null,
          2
        )
      ),
    });

    await expect(page.getByRole('status')).toContainText('已导入 1 个源文件，生成 1 道题目。');
    await expect(page.getByText(sourceName, { exact: true })).toBeVisible();
    await expect(page.getByText('已生成题目')).toBeVisible();
    await expect(page.getByRole('link', { name: '原文件' })).toBeVisible();
    await expect(page.getByRole('link', { name: '标准化 JSON' })).toBeVisible();
    await expect(page.getByRole('link', { name: '提取文本' })).toBeVisible();
  });
});
