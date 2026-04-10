import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { FinalCtaBand, PageHero, SectionHeading, WorkbenchProofCard } from './primitives';

test('PageHero renders hero copy, CTAs, and optional aside rail', () => {
  const html = renderToStaticMarkup(
    <PageHero
      eyebrow="Enterprise AI"
      title="Operate the whole delivery chain."
      body="One system for data, process, and model operations."
      primary={{ href: '/contact', label: 'Talk to WanFlow' }}
      secondary={{ href: '/solutions', label: 'See solutions' }}
      aside={<div>Proof rail</div>}
    />,
  );

  assert.match(html, /Enterprise AI/);
  assert.match(html, /Operate the whole delivery chain\./);
  assert.match(html, /href="\/contact"/);
  assert.match(html, /Talk to WanFlow/);
  assert.match(html, /href="\/solutions"/);
  assert.match(html, /Proof rail/);
});

test('SectionHeading omits body markup when no body is provided', () => {
  const html = renderToStaticMarkup(<SectionHeading eyebrow="Overview" title="Built for delivery" />);

  assert.match(html, /Overview/);
  assert.match(html, /Built for delivery/);
  assert.doesNotMatch(html, /mkt-copy/);
});

test('FinalCtaBand renders both primary and secondary actions', () => {
  const html = renderToStaticMarkup(
    <FinalCtaBand
      eyebrow="Next step"
      title="Bring the operators in."
      body="Start with the real workflow, not a deck."
      primary={{ href: '/contact', label: 'Book intro' }}
      secondary={{ href: '/dataflow/proofbench', label: 'Open BenchmarkOps' }}
    />,
  );

  assert.match(html, /Book intro/);
  assert.match(html, /Open BenchmarkOps/);
  assert.match(html, /href="\/dataflow\/proofbench"/);
});

test('WorkbenchProofCard keeps the canonical BenchmarkOps route', () => {
  const html = renderToStaticMarkup(
    <WorkbenchProofCard
      proofLabel="Proof layer"
      workbenchNote="Existing internal platform as evidence"
      proofNote="Show the real execution spine."
      workbenchCta="View platform"
    />,
  );

  assert.match(html, /WanFlow BenchmarkOps/);
  assert.match(html, /href="\/dataflow\/proofbench"/);
  assert.match(html, /View platform/);
});
