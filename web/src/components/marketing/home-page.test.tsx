import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

test('MarketingHomePage uses business-facing executive wording and standalone section layout', () => {
  const filePath = resolve(process.cwd(), 'src/components/marketing/home-page.tsx');
  const source = readFileSync(filePath, 'utf8');

  assert.match(source, /业务速览/);
  assert.doesNotMatch(source, /关键结论/);
  assert.doesNotMatch(source, /更新日期：4-20 WanFlow/);
  assert.doesNotMatch(source, /className="mkt-panel mkt-editorial-band/);
  assert.doesNotMatch(source, /GEO/);
  assert.match(source, /帮助企业建立稳定、可复用的执行链路/);
  assert.match(source, /统一术语、清晰输入输出和可验证指标/);
  assert.doesNotMatch(source, /便于 AI 直接提取/);
  assert.doesNotMatch(source, /提升可提取性与引用准确性/);
  assert.match(source, /围绕服务范围、合作方式与交付节奏/);
  assert.doesNotMatch(source, /参考依据/);
  assert.match(source, /治理框架/);
  assert.match(source, /治理与实施标准/);
  assert.match(source, /text-\[var\(--mk-brand-4\)\]/);
  assert.match(source, /mkt-snapshot-table-wrap/);
  assert.match(source, /mkt-snapshot-table/);
  assert.match(source, /mkt-snapshot-th/);
  assert.match(source, /mkt-snapshot-td/);
  assert.match(source, /mkt-snapshot-colgroup/);
  assert.match(source, /输入到输出/);
  assert.match(source, /KPI \/ 周期/);
  assert.match(source, /mkt-snapshot-col-kpi/);
  assert.match(source, /执行骨架/);
  assert.match(source, /内容版本更新：4-20/);
  assert.doesNotMatch(source, /eyebrow=\{copy\.home\.platformView\.eyebrow\}/);
});
