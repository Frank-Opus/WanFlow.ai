import type { Metadata } from 'next';
import PlatformLoginForm from '@/components/platform/login-form';

export const metadata: Metadata = {
  title: '登录 BenchmarkOps | WanFlow',
  description: '登录 WanFlow BenchmarkOps 企业评测台。当前支持账号密码登录，后续将扩展 OAuth 与企业 SSO。',
};

type ProofbenchLoginPageProps = {
  searchParams?: Promise<{
    next?: string | string[];
  }>;
};

export default async function ProofbenchLoginPage({ searchParams }: ProofbenchLoginPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const nextPath = Array.isArray(resolvedSearchParams?.next) ? resolvedSearchParams.next[0] : resolvedSearchParams?.next;

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <section className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 sm:p-8">
          <p className="text-sm font-semibold tracking-wide text-emerald-700">WanFlow.ai · DataFlow / ProofBench</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-900 sm:text-[2.1rem]">企业评测中台登录入口</h2>
          <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
            默认中文操作界面，登录后进入项目工作台（Project / SourceFile / ProblemItem）。当前版本已打通账号密码链路，后续可无缝接入
            OAuth 与企业 SSO。
          </p>
          <ul className="mt-5 grid gap-3 text-sm text-slate-700">
            <li className="rounded-xl border border-white/80 bg-white/80 px-4 py-3">登录成功后默认跳转到 /dataflow/proofbench</li>
            <li className="rounded-xl border border-white/80 bg-white/80 px-4 py-3">Cookie 使用既有 session helpers 与 auth-config 配置</li>
            <li className="rounded-xl border border-white/80 bg-white/80 px-4 py-3">后续 provider 扩展点：OAuth / 企业 SSO</li>
          </ul>
        </section>

        <PlatformLoginForm nextPath={nextPath} />
      </div>
    </main>
  );
}
