'use client';

import PlatformConsole from '@/components/platform/platform-console';
import { useLocale } from '@/components/shared/locale-provider';
import { getBenchmarkOpsShellCopy } from '../lib/copy';
import {
  BENCHMARKOPS_FORMAL_PRODUCT_ID,
  BENCHMARKOPS_FORMAL_SHELL_TEST_ID,
  BENCHMARKOPS_FORMAL_TITLE_TEST_ID,
} from '../lib/constants';

export default function BenchmarkOpsShell() {
  const { locale } = useLocale();
  const shellCopy = getBenchmarkOpsShellCopy(locale);
  const titleId = 'benchmarkops-shell-title';

  return (
    <section
      data-testid={BENCHMARKOPS_FORMAL_SHELL_TEST_ID}
      data-product-id={BENCHMARKOPS_FORMAL_PRODUCT_ID}
      aria-labelledby={titleId}
      className="space-y-6"
    >
      <header className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4 text-slate-800 sm:px-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{shellCopy.shellBadge}</p>
        <h2 id={titleId} data-testid={BENCHMARKOPS_FORMAL_TITLE_TEST_ID} className="mt-1 text-xl font-semibold sm:text-2xl">
          {shellCopy.formalTitle}
        </h2>
        <p className="mt-1 text-sm text-slate-600">{shellCopy.shellBody}</p>
      </header>

      <PlatformConsole />
    </section>
  );
}
