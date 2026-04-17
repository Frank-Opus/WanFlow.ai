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

test('PageHero applies custom eyebrow class when provided', () => {
  const html = renderToStaticMarkup(
    <PageHero
      eyebrow="Enterprise AI"
      eyebrowClassName="mkt-section-kicker-large"
      title="Operate the whole delivery chain."
      body="One system for data, process, and model operations."
      primary={{ href: '/contact', label: 'Talk to WanFlow' }}
    />,
  );

  assert.match(html, /class="mkt-kicker mkt-section-kicker-large mkt-hero-stage mkt-hero-stage-1"/);
});

test('SectionHeading omits body markup when no body is provided', () => {
  const html = renderToStaticMarkup(<SectionHeading eyebrow="Overview" title="Built for delivery" />);

  assert.match(html, /Overview/);
  assert.match(html, /Built for delivery/);
  assert.match(html, /class="mkt-title mt-5 max-w-full text-balance"/);
  assert.doesNotMatch(html, /mkt-copy/);
});

test('SectionHeading large size adds larger title classes', () => {
  const html = renderToStaticMarkup(
    <SectionHeading eyebrow="Platform" title="Command the whole workflow" size="large" />,
  );

  assert.match(
    html,
    /class="mkt-kicker mkt-section-kicker-large"/,
  );
  assert.match(
    html,
    /class="mkt-title mt-3 max-w-full text-balance text-\[1\.82rem\] leading-\[1\.06\] sm:text-\[2\.18rem\] lg:text-\[2\.7rem\]"/,
  );
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

test('FinalCtaBand large size applies section hierarchy classes', () => {
  const html = renderToStaticMarkup(
    <FinalCtaBand
      eyebrow="Next step"
      title="Bring the operators in."
      body="Start with the real workflow, not a deck."
      primary={{ href: '/contact', label: 'Book intro' }}
      size="large"
    />,
  );

  assert.match(html, /class="mkt-kicker mkt-section-kicker-large"/);
  assert.match(
    html,
    /class="mkt-title mt-3 max-w-full text-balance sm:max-w-\[20ch\] text-\[1\.92rem\] leading-\[1\.06\] sm:text-\[2\.32rem\] lg:text-\[2\.95rem\]"/,
  );
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
