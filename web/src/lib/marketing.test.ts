import assert from 'node:assert/strict';
import test from 'node:test';
import { marketingCopy } from './marketing';

for (const locale of ['zh', 'en'] as const) {
  test(`marketing copy exposes credentials content for ${locale}`, () => {
    const credentials = marketingCopy[locale].about.credentials;

    assert.ok(credentials.eyebrow.length > 0);
    assert.ok(credentials.title.length > 0);
    assert.ok(credentials.body.length > 0);
    assert.ok(credentials.tabs.papers.length > 0);
    assert.ok(credentials.tabs.patents.length > 0);
    assert.ok(credentials.tabs.softwareCopyright.length > 0);
    assert.equal(credentials.papers.length, 4);
    assert.equal(credentials.patents.length, 4);
    assert.equal(credentials.softwareCopyright.length, 4);

    for (const item of [...credentials.papers, ...credentials.patents, ...credentials.softwareCopyright]) {
      assert.ok(item.title.length > 0);
      assert.ok(item.year.length > 0);
      assert.ok(item.venue.length > 0);
      assert.ok(item.description.length > 0);
      assert.ok(item.previewCode.length > 0);
      assert.ok(item.previewStamp.length > 0);
    }
  });
}
