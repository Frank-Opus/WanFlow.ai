'use client';

import { useState } from 'react';

type LoginState = 'idle' | 'submitting' | 'error';

type LoginResponse = {
  ok?: boolean;
  redirectTo?: string;
  error?: string;
};

function normalizeNextPath(input: string | undefined): string {
  const candidate = input?.trim();
  if (!candidate) {
    return '/dataflow/proofbench';
  }
  if (!candidate.startsWith('/') || candidate.startsWith('//')) {
    return '/dataflow/proofbench';
  }
  return candidate;
}

type PlatformLoginFormProps = {
  nextPath?: string;
};

export default function PlatformLoginForm({ nextPath: nextPathInput }: PlatformLoginFormProps) {
  const nextPath = normalizeNextPath(nextPathInput);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<LoginState>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim();
    if (!normalizedEmail || !password) {
      setStatus('error');
      setMessage('请输入邮箱和密码。');
      return;
    }

    setStatus('submitting');
    setMessage('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: normalizedEmail,
          password,
          next: nextPath,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as LoginResponse;
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || '登录失败，请稍后再试。');
      }

      window.location.assign(payload.redirectTo || nextPath);
      return;
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : '登录失败，请稍后再试。');
    } finally {
      setStatus((current) => (current === 'error' ? 'error' : 'idle'));
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      noValidate
      aria-label="BenchmarkOps 登录表单"
    >
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-500">账号登录</p>
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-[1.85rem]">登录 BenchmarkOps 企业评测台</h1>
        <p className="text-sm leading-6 text-slate-600">
          当前阶段默认使用账号密码。OAuth 与企业 SSO 已预留 provider 接口，将在后续任务中接入。
        </p>
      </div>

      <div className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-medium text-slate-700" htmlFor="platform-login-email">
          邮箱
          <input
            id="platform-login-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="wanflow@163.com"
            className="h-11 rounded-lg border border-slate-300 px-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={status === 'submitting'}
            required
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700" htmlFor="platform-login-password">
          密码
          <input
            id="platform-login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="请输入密码"
            className="h-11 rounded-lg border border-slate-300 px-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={status === 'submitting'}
            required
          />
        </label>
      </div>

      <div className="mt-6 space-y-3">
        <button
          type="submit"
          className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? '登录中...' : '登录并进入工作台'}
        </button>

        {message ? (
          <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {message}
          </p>
        ) : null}
      </div>

      <p className="mt-4 text-xs text-slate-500">默认跳转：/dataflow/proofbench（可通过 next 参数覆盖同域路径）</p>
    </form>
  );
}
