import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';

test('MarketingHomePage renders the primary marketing entry points and support sections', () => {
  const source = readFileSync(resolve(process.cwd(), 'src/components/marketing/home-page.tsx'), 'utf8');

  assert.match(source, /href="\/solutions"/);
  assert.match(source, /href="\/cases"/);
  assert.match(source, /常见问题/);
  assert.match(source, /治理与实施标准/);
  assert.match(source, /mkt-snapshot-table/);
  assert.doesNotMatch(source, /GEO_UPDATE_LOG/);
});
