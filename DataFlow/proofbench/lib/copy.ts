import { BENCHMARKOPS_PRODUCT_TITLE } from './constants';

export type BenchmarkOpsShellCopy = {
  shellBadge: string;
  shellBody: string;
  formalTitle: string;
};

const SHELL_COPY: Record<'zh' | 'en', BenchmarkOpsShellCopy> = {
  zh: {
    shellBadge: '正式产品壳层',
    shellBody: 'DataFlow / proofbench 正式产品入口，保留可测试的正式产品标识。',
    formalTitle: BENCHMARKOPS_PRODUCT_TITLE,
  },
  en: {
    shellBadge: 'Formal product shell',
    shellBody: 'The formal DataFlow / proofbench entry with a testable product identifier.',
    formalTitle: BENCHMARKOPS_PRODUCT_TITLE,
  },
};

export function getBenchmarkOpsShellCopy(locale: string): BenchmarkOpsShellCopy {
  return locale === 'en' ? SHELL_COPY.en : SHELL_COPY.zh;
}
