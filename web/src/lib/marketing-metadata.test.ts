import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { metadata as aboutMetadata } from '@/app/about/page';
import { metadata as casesMetadata } from '@/app/cases/page';
import { metadata as contactMetadata } from '@/app/contact/page';
import { metadata as homeMetadata } from '@/app/page';
import { metadata as solutionsMetadata } from '@/app/solutions/page';
import { getMarketingRouteMeta } from '@/lib/marketing-metadata';

test('root layout metadata stays route-agnostic', () => {
  const source = readFileSync(resolve(process.cwd(), 'src/app/layout.tsx'), 'utf8');

  assert.doesNotMatch(source, /alternates:\s*\{\s*canonical:/);
  assert.doesNotMatch(source, /openGraph:\s*\{[\s\S]*?\burl:/);
});

test('shared marketing route metadata matches page metadata defaults', () => {
  const cases = [
    ['/', homeMetadata],
    ['/solutions', solutionsMetadata],
    ['/cases', casesMetadata],
    ['/about', aboutMetadata],
    ['/contact', contactMetadata],
  ] as const;

  for (const [pathname, pageMetadata] of cases) {
    const routeMeta = getMarketingRouteMeta(pathname, 'zh');

    assert.equal(routeMeta.title, pageMetadata.title);
    assert.equal(routeMeta.description, pageMetadata.description);
  }
});
