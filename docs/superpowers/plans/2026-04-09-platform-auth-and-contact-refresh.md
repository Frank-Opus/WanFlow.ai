# WanFlow Platform Auth and Contact Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update every public contact touchpoint to the new email and WeChat, then add a standard-edition credentials auth layer that protects `/dataflow/proofbench` and `/api/platform/*` while leaving marketing pages and `/api/contact` public and ready for future enterprise SSO/OAuth.

**Architecture:** Keep the marketing site public and data-driven from `web/src/lib/marketing.ts`. Add a small auth domain under `web/src/lib/auth/` with three layers: config and roles, provider abstraction, and signed `httpOnly` session cookies. Use `middleware.ts` for route gating, server-side guard helpers for API enforcement, and explicit actor propagation into the file-backed platform store so `local-admin` stops being hard-coded in write operations.

**Tech Stack:** Next.js 15 app router, React 19, TypeScript, Node `node:test`, Playwright, signed cookies, file-backed `platform-data/` persistence, bilingual marketing copy.

---

## File Structure

- `web/src/lib/marketing.ts` - canonical bilingual marketing copy and global contact constants.
- `web/src/app/page.tsx` - homepage JSON-LD organization schema sourced from canonical contact data.
- `web/src/lib/auth/auth-types.ts` - auth roles, user/session/provider interfaces, and route guard enums.
- `web/src/lib/auth/auth-config.ts` - runtime config loader for cookie names, secrets, default credentials, and future provider toggles.
- `web/src/lib/auth/password.ts` - password comparison helpers; starts with constant-time credentials verification and a hash-ready seam.
- `web/src/lib/auth/session.ts` - session signing, parsing, cookie serialization, and destroy helpers.
- `web/src/lib/auth/providers/credentials.ts` - current credentials provider implementation.
- `web/src/lib/auth/providers/index.ts` - provider registry that later accepts OAuth / enterprise SSO providers.
- `web/src/lib/auth/guards.ts` - `requirePlatformSession`, `requirePlatformRole`, and API JSON error helpers.
- `web/src/app/api/auth/login/route.ts` - login endpoint that issues the signed `httpOnly` cookie.
- `web/src/app/api/auth/logout/route.ts` - logout endpoint that clears the signed cookie.
- `web/src/app/dataflow/proofbench/login/page.tsx` - login route inside the protected product namespace.
- `web/src/components/platform/login-form.tsx` - client-side credentials form with Chinese-first copy and redirect support.
- `web/src/app/dataflow/proofbench/page.tsx` - protected platform entry that reads the current session before rendering the app.
- `web/src/components/platform/use-platform-console.ts` - client fetch behavior updated for 401/403 and current-user display state.
- `web/src/lib/platform-types.ts` - migrate role vocabulary to `owner | admin | operator | viewer`.
- `web/src/lib/platform-store.ts` - seed data and write paths updated to accept the authenticated actor instead of `local-admin`.
- `web/src/app/api/platform/**/*.ts` - platform endpoints enforce auth and pass `session.user.id` through to storage writes.
- `web/src/middleware.ts` - redirects unauthenticated browser traffic from `/dataflow/proofbench` to `/dataflow/proofbench/login`.
- `web/.env.example` - example auth configuration for local and Vercel deployments.
- `docs/release-and-delivery.md` - deployment notes for the new standard auth layer and future SSO seam.
- `web/src/lib/auth/session.test.ts` - Node tests for cookie signing / parsing behavior.
- `web/tests/e2e/platform-auth.spec.ts` - Playwright coverage for redirect, login, logout, and protected API behavior.
- `web/tests/e2e/contact-flow.spec.ts` - contact copy regression coverage.

### Task 1: Refresh public contact data everywhere

**Files:**
- Modify: `web/src/lib/marketing.ts`
- Modify: `web/src/app/page.tsx`
- Modify: `web/tests/e2e/contact-flow.spec.ts`
- Test: `web/tests/e2e/marketing-site.spec.ts`

- [ ] **Step 1: Add a failing Playwright assertion for the new contact details**

```ts
// web/tests/e2e/contact-flow.spec.ts
import { expect, test } from '@playwright/test';

test('contact page exposes the latest WanFlow contact channels', async ({ page }) => {
  await page.goto('/contact');
  await page.waitForLoadState('networkidle');

  await expect(page.getByText('wanflow@163.com')).toBeVisible();
  await expect(page.getByText(/FrankXu0303/)).toBeVisible();
  await expect(page.getByRole('button', { name: /提交|Submit/ })).toBeVisible();
});
```

- [ ] **Step 2: Run the focused Playwright test to confirm it fails before the copy update**

Run: `cd web && npx playwright test tests/e2e/contact-flow.spec.ts --workers=1`
Expected: FAIL because the page still renders `business@wanflow.ai` and `WanFlow-AI`.

- [ ] **Step 3: Replace the canonical contact constants and downstream bilingual copy**

```ts
// web/src/lib/marketing.ts
export const siteContact = {
  email: 'wanflow@163.com',
  wechat: 'FrankXu0303',
  responseWindow: '24 hours',
} as const;

// keep all footer/contactItems/error messages derived from the same canonical values
items: ['wanflow@163.com', 'WeChat: FrankXu0303', '24 小时内响应工作日咨询'];
error: '提交失败，请稍后重试，或直接发送邮件到 wanflow@163.com。';
contactItems: ['邮箱：wanflow@163.com', 'WeChat：FrankXu0303', '工作日 24 小时内响应'];
```

```ts
// web/src/app/page.tsx
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'WanFlow',
  alternateName: 'WanFlow 万物归流',
  url: 'https://wanflow.ai',
  logo: 'https://wanflow.ai/brand/logo-wide.png',
  email: siteContact.email,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: siteContact.email,
      availableLanguage: ['zh-CN', 'en'],
    },
  ],
};
```

- [ ] **Step 4: Re-run the contact regression and a marketing smoke test**

Run: `cd web && npx playwright test tests/e2e/contact-flow.spec.ts tests/e2e/marketing-site.spec.ts --workers=1`
Expected: PASS, with the new email and WeChat visible on public pages.

- [ ] **Step 5: Commit the contact refresh**

```bash
git add web/src/lib/marketing.ts web/src/app/page.tsx web/tests/e2e/contact-flow.spec.ts
git commit -m "chore: refresh wanflow public contact details"
```

### Task 2: Add the auth core, cookie session primitives, and deployment config

**Files:**
- Create: `web/src/lib/auth/auth-types.ts`
- Create: `web/src/lib/auth/auth-config.ts`
- Create: `web/src/lib/auth/password.ts`
- Create: `web/src/lib/auth/session.ts`
- Create: `web/src/lib/auth/session.test.ts`
- Create: `web/.env.example`
- Modify: `docs/release-and-delivery.md`

- [ ] **Step 1: Write failing Node tests for signed session cookies**

```ts
// web/src/lib/auth/session.test.ts
import test from 'node:test';
import assert from 'node:assert/strict';
import { createSessionCookieValue, parseSessionCookieValue } from './session';

const baseUser = {
  id: 'owner-frank',
  email: 'wanflow@163.com',
  name: 'Frank Xu',
  role: 'owner',
} as const;

test('parseSessionCookieValue returns the signed user payload', () => {
  const raw = createSessionCookieValue(baseUser, {
    secret: 'test-secret',
    ttlSeconds: 60 * 60,
  });

  const parsed = parseSessionCookieValue(raw, { secret: 'test-secret' });
  assert.equal(parsed?.user.email, 'wanflow@163.com');
  assert.equal(parsed?.user.role, 'owner');
});

test('parseSessionCookieValue rejects tampered cookies', () => {
  const raw = createSessionCookieValue(baseUser, {
    secret: 'test-secret',
    ttlSeconds: 60 * 60,
  });

  const tampered = raw.replace('owner-frank', 'viewer-demo');
  assert.equal(parseSessionCookieValue(tampered, { secret: 'test-secret' }), null);
});
```

- [ ] **Step 2: Run the Node test to verify the auth primitives do not exist yet**

Run: `cd web && node --test src/lib/auth/session.test.ts`
Expected: FAIL because `src/lib/auth/session.ts` has not been created yet.

- [ ] **Step 3: Implement auth types, config loading, password verification, and signed cookie helpers**

```ts
// web/src/lib/auth/auth-types.ts
export type AppRole = 'owner' | 'admin' | 'operator' | 'viewer';

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: AppRole;
};

export type AppSession = {
  user: AuthUser;
  issuedAt: string;
  expiresAt: string;
};

export type AuthProvider = {
  id: 'credentials' | 'oauth';
  authenticate(input: { email: string; password: string }): Promise<AuthUser | null>;
};
```

```ts
// web/src/lib/auth/auth-config.ts
import { cache } from 'react';

export const getAuthConfig = cache(() => ({
  cookieName: process.env.WANFLOW_SESSION_COOKIE?.trim() || 'wanflow_session',
  sessionSecret: process.env.WANFLOW_SESSION_SECRET?.trim() || 'dev-only-change-me',
  sessionTtlSeconds: Number(process.env.WANFLOW_SESSION_TTL_SECONDS || 60 * 60 * 12),
  loginPath: '/dataflow/proofbench/login',
  credentials: {
    email: process.env.WANFLOW_ADMIN_EMAIL?.trim() || 'wanflow@163.com',
    password: process.env.WANFLOW_ADMIN_PASSWORD?.trim() || 'ChangeMe123!',
    name: process.env.WANFLOW_ADMIN_NAME?.trim() || 'Frank Xu',
    role: (process.env.WANFLOW_ADMIN_ROLE?.trim() || 'owner') as const,
  },
  futureProviders: {
    oauthEnabled: process.env.WANFLOW_AUTH_ENABLE_OAUTH === '1',
    ssoHint: process.env.WANFLOW_AUTH_SSO_HINT?.trim() || 'reserved',
  },
}));
```

```ts
// web/src/lib/auth/password.ts
import { timingSafeEqual } from 'node:crypto';

export function safeEqualText(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function verifyPlaintextPassword(input: string, expected: string) {
  return safeEqualText(input, expected);
}
```

```ts
// web/src/lib/auth/session.ts
import { createHmac, timingSafeEqual } from 'node:crypto';
import type { AppSession, AuthUser } from './auth-types';

function sign(payload: string, secret: string) {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

export function createSessionCookieValue(user: AuthUser, options: { secret: string; ttlSeconds: number }) {
  const issuedAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + options.ttlSeconds * 1000).toISOString();
  const session: AppSession = { user, issuedAt, expiresAt };
  const payload = Buffer.from(JSON.stringify(session)).toString('base64url');
  const signature = sign(payload, options.secret);
  return `${payload}.${signature}`;
}

export function parseSessionCookieValue(raw: string, options: { secret: string }) {
  const [payload, signature] = raw.split('.');
  if (!payload || !signature) return null;
  const expected = sign(payload, options.secret);
  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as AppSession;
  if (Date.parse(session.expiresAt) <= Date.now()) return null;
  return session;
}
```

- [ ] **Step 4: Add environment examples and release notes for the standard auth layer**

```dotenv
# web/.env.example
WANFLOW_SESSION_COOKIE=wanflow_session
WANFLOW_SESSION_SECRET=replace-this-in-vercel
WANFLOW_SESSION_TTL_SECONDS=43200
WANFLOW_ADMIN_EMAIL=wanflow@163.com
WANFLOW_ADMIN_PASSWORD=ChangeMe123!
WANFLOW_ADMIN_NAME=Frank Xu
WANFLOW_ADMIN_ROLE=owner
WANFLOW_AUTH_ENABLE_OAUTH=0
WANFLOW_AUTH_SSO_HINT=reserved-for-enterprise-sso
```

```md
<!-- docs/release-and-delivery.md -->
## Standard auth environment variables

- `WANFLOW_SESSION_COOKIE`
- `WANFLOW_SESSION_SECRET`
- `WANFLOW_SESSION_TTL_SECONDS`
- `WANFLOW_ADMIN_EMAIL`
- `WANFLOW_ADMIN_PASSWORD`
- `WANFLOW_ADMIN_NAME`
- `WANFLOW_ADMIN_ROLE`
- `WANFLOW_AUTH_ENABLE_OAUTH`
- `WANFLOW_AUTH_SSO_HINT`

The standard edition uses credentials auth today and keeps the provider registry open for future OAuth / enterprise SSO integration.
```

- [ ] **Step 5: Re-run the Node auth test and make sure the primitives pass**

Run: `cd web && node --test src/lib/auth/session.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit the auth core foundation**

```bash
git add web/src/lib/auth/auth-types.ts web/src/lib/auth/auth-config.ts web/src/lib/auth/password.ts web/src/lib/auth/session.ts web/src/lib/auth/session.test.ts web/.env.example docs/release-and-delivery.md
git commit -m "feat: add platform auth core and session config"
```

### Task 3: Implement the credentials provider, login page, and logout flow

**Files:**
- Create: `web/src/lib/auth/providers/credentials.ts`
- Create: `web/src/lib/auth/providers/index.ts`
- Create: `web/src/app/api/auth/login/route.ts`
- Create: `web/src/app/api/auth/logout/route.ts`
- Create: `web/src/app/dataflow/proofbench/login/page.tsx`
- Create: `web/src/components/platform/login-form.tsx`
- Create: `web/tests/e2e/platform-auth.spec.ts`

- [ ] **Step 1: Add failing Playwright coverage for redirect, bad login, and successful login**

```ts
// web/tests/e2e/platform-auth.spec.ts
import { expect, test } from '@playwright/test';

test('unauthenticated users are redirected to the proofbench login page', async ({ page }) => {
  await page.goto('/dataflow/proofbench');
  await expect(page).toHaveURL(/\/dataflow\/proofbench\/login/);
});

test('login page rejects invalid credentials', async ({ page }) => {
  await page.goto('/dataflow/proofbench/login');
  await page.getByLabel(/邮箱|Email/).fill('wrong@example.com');
  await page.getByLabel(/密码|Password/).fill('bad-password');
  await page.getByRole('button', { name: /登录|Sign in/ }).click();
  await expect(page.getByRole('alert')).toContainText(/邮箱或密码错误|Invalid email or password/);
});
```

- [ ] **Step 2: Run the auth E2E file to confirm it fails before implementation**

Run: `cd web && npx playwright test tests/e2e/platform-auth.spec.ts --workers=1`
Expected: FAIL because `/dataflow/proofbench/login` and `/api/auth/login` do not exist yet.

- [ ] **Step 3: Create the provider registry and credentials auth routes**

```ts
// web/src/lib/auth/providers/credentials.ts
import { getAuthConfig } from '@/lib/auth/auth-config';
import { verifyPlaintextPassword } from '@/lib/auth/password';
import type { AuthProvider } from '@/lib/auth/auth-types';

export const credentialsProvider: AuthProvider = {
  id: 'credentials',
  async authenticate({ email, password }) {
    const { credentials } = getAuthConfig();
    if (email.trim().toLowerCase() !== credentials.email.toLowerCase()) return null;
    if (!verifyPlaintextPassword(password, credentials.password)) return null;
    return {
      id: 'owner-frank',
      email: credentials.email,
      name: credentials.name,
      role: credentials.role,
    };
  },
};
```

```ts
// web/src/lib/auth/providers/index.ts
import { credentialsProvider } from './credentials';

export function getDefaultAuthProvider() {
  return credentialsProvider;
}
```

```ts
// web/src/app/api/auth/login/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getAuthConfig } from '@/lib/auth/auth-config';
import { getDefaultAuthProvider } from '@/lib/auth/providers';
import { createSessionCookieValue } from '@/lib/auth/session';

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { email?: string; password?: string };
  const provider = getDefaultAuthProvider();
  const user = await provider.authenticate({
    email: body.email ?? '',
    password: body.password ?? '',
  });

  if (!user) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  }

  const config = getAuthConfig();
  const cookieValue = createSessionCookieValue(user, {
    secret: config.sessionSecret,
    ttlSeconds: config.sessionTtlSeconds,
  });

  (await cookies()).set(config.cookieName, cookieValue, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: config.sessionTtlSeconds,
  });

  return NextResponse.json({ ok: true, user });
}
```

```ts
// web/src/app/api/auth/logout/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getAuthConfig } from '@/lib/auth/auth-config';

export async function POST() {
  (await cookies()).set(getAuthConfig().cookieName, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 4: Add a Chinese-first login surface inside `/dataflow/proofbench`**

```tsx
// web/src/app/dataflow/proofbench/login/page.tsx
import LoginForm from '@/components/platform/login-form';

export default function ProofbenchLoginPage() {
  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
```

```tsx
// web/src/components/platform/login-form.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/dataflow/proofbench';
  const [error, setError] = useState('');

  async function handleSubmit(formData: FormData) {
    setError('');
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
    });

    if (!response.ok) {
      setError('邮箱或密码错误，请重试。');
      return;
    }

    router.replace(next);
    router.refresh();
  }

  return (
    <form action={handleSubmit} className="space-y-4 rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="email">邮箱</label>
        <input id="email" name="email" type="email" required className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="password">密码</label>
        <input id="password" name="password" type="password" required className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" />
      </div>
      {error ? <p role="alert" className="text-sm text-rose-600">{error}</p> : null}
      <button type="submit" className="btn-primary w-full rounded-2xl px-5 py-3 text-sm font-semibold">登录进入 WanFlow BenchmarkOps</button>
    </form>
  );
}
```

- [ ] **Step 5: Re-run the auth E2E file and confirm the login flow works**

Run: `cd web && WANFLOW_ADMIN_PASSWORD=ChangeMe123! npx playwright test tests/e2e/platform-auth.spec.ts --workers=1`
Expected: PASS for redirect and invalid-login coverage; the success case can now log in with `wanflow@163.com / ChangeMe123!`.

- [ ] **Step 6: Commit the login flow**

```bash
git add web/src/lib/auth/providers/credentials.ts web/src/lib/auth/providers/index.ts web/src/app/api/auth/login/route.ts web/src/app/api/auth/logout/route.ts web/src/app/dataflow/proofbench/login/page.tsx web/src/components/platform/login-form.tsx web/tests/e2e/platform-auth.spec.ts
git commit -m "feat: add credentials login flow for benchmarkops"
```

### Task 4: Enforce route and API protection while keeping marketing public

**Files:**
- Create: `web/src/lib/auth/guards.ts`
- Create: `web/src/middleware.ts`
- Modify: `web/src/app/dataflow/proofbench/page.tsx`
- Modify: `web/src/app/api/platform/projects/route.ts`
- Modify: `web/src/app/api/platform/projects/[projectId]/items/route.ts`
- Modify: `web/src/app/api/platform/projects/[projectId]/sources/route.ts`
- Modify: `web/src/app/api/platform/artifacts/download/route.ts`
- Modify: `web/src/app/api/platform/sources/download/route.ts`
- Test: `web/tests/e2e/platform-auth.spec.ts`
- Test: `web/tests/e2e/marketing-site.spec.ts`

- [ ] **Step 1: Extend the auth Playwright file with protected API assertions**

```ts
// web/tests/e2e/platform-auth.spec.ts
import { expect, test } from '@playwright/test';

test('platform API returns 401 while public contact API remains available', async ({ page }) => {
  const platformResponse = await page.request.get('/api/platform/projects');
  expect(platformResponse.status()).toBe(401);

  const contactResponse = await page.request.post('/api/contact', {
    data: {
      name: 'Auth Smoke',
      company: 'WanFlow',
      email: 'wanflow@163.com',
      interest: 'Process as a Service',
      timeline: 'This month',
      message: 'Public contact endpoint should stay open.',
    },
  });

  expect(contactResponse.status()).toBe(200);
});
```

- [ ] **Step 2: Run the focused auth suite to verify the protection is still missing**

Run: `cd web && npx playwright test tests/e2e/platform-auth.spec.ts --workers=1`
Expected: FAIL because `/api/platform/projects` still returns `200` without authentication.

- [ ] **Step 3: Add middleware and reusable guard helpers**

```ts
// web/src/lib/auth/guards.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getAuthConfig } from '@/lib/auth/auth-config';
import { parseSessionCookieValue } from '@/lib/auth/session';
import type { AppRole } from '@/lib/auth/auth-types';

const roleOrder: Record<AppRole, number> = {
  viewer: 0,
  operator: 1,
  admin: 2,
  owner: 3,
};

export async function getCurrentSession() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(getAuthConfig().cookieName)?.value;
  if (!raw) return null;
  return parseSessionCookieValue(raw, { secret: getAuthConfig().sessionSecret });
}

export async function requirePlatformSession() {
  const session = await getCurrentSession();
  if (!session) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: 'Authentication required.' }, { status: 401 }),
    };
  }
  return { ok: true as const, session };
}

export function hasRequiredRole(role: AppRole, minimum: AppRole) {
  return roleOrder[role] >= roleOrder[minimum];
}
```

```ts
// web/src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthConfig } from '@/lib/auth/auth-config';
import { parseSessionCookieValue } from '@/lib/auth/session';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (!pathname.startsWith('/dataflow/proofbench')) return NextResponse.next();
  if (pathname === '/dataflow/proofbench/login') return NextResponse.next();

  const raw = request.cookies.get(getAuthConfig().cookieName)?.value;
  const session = raw ? parseSessionCookieValue(raw, { secret: getAuthConfig().sessionSecret }) : null;
  if (session) return NextResponse.next();

  const loginUrl = new URL('/dataflow/proofbench/login', request.url);
  loginUrl.searchParams.set('next', `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/dataflow/proofbench/:path*'],
};
```

- [ ] **Step 4: Guard the platform page and every `/api/platform/*` handler**

```ts
// web/src/app/dataflow/proofbench/page.tsx
import { redirect } from 'next/navigation';
import { WanFlowBenchmarkOpsApp } from '@dataflow/proofbench';
import { getCurrentSession } from '@/lib/auth/guards';

export default async function DataFlowProofbenchPage() {
  const session = await getCurrentSession();
  if (!session) {
    redirect('/dataflow/proofbench/login');
  }

  return (
    <main id="main-content" className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <WanFlowBenchmarkOpsApp session={session} />
      </div>
    </main>
  );
}
```

```ts
// example pattern for every protected API route
const auth = await requirePlatformSession();
if (!auth.ok) return auth.response;
const { session } = auth;
```

- [ ] **Step 5: Re-run auth and marketing suites to verify protection boundaries**

Run: `cd web && npx playwright test tests/e2e/platform-auth.spec.ts tests/e2e/marketing-site.spec.ts --workers=1`
Expected: PASS. `/dataflow/proofbench` redirects to login when signed out, `/api/platform/*` returns `401`, and public marketing pages still render.

- [ ] **Step 6: Commit the enforcement layer**

```bash
git add web/src/lib/auth/guards.ts web/src/middleware.ts web/src/app/dataflow/proofbench/page.tsx web/src/app/api/platform/projects/route.ts web/src/app/api/platform/projects/[projectId]/items/route.ts web/src/app/api/platform/projects/[projectId]/sources/route.ts web/src/app/api/platform/artifacts/download/route.ts web/src/app/api/platform/sources/download/route.ts web/tests/e2e/platform-auth.spec.ts
git commit -m "feat: protect benchmarkops routes and platform apis"
```

### Task 5: Replace hard-coded `local-admin`, normalize roles, and surface the current user in the product UI

**Files:**
- Modify: `web/src/lib/platform-types.ts`
- Modify: `web/src/lib/platform-store.ts`
- Modify: `web/src/components/platform/use-platform-console.ts`
- Modify: `DataFlow/proofbench/ui/benchmarkops-shell.tsx`
- Modify: `DataFlow/proofbench/modules/governance/governance-panel.tsx`
- Modify: `web/src/app/api/platform/projects/route.ts`
- Modify: `web/src/app/api/platform/projects/[projectId]/items/route.ts`
- Modify: `web/src/app/api/platform/projects/[projectId]/sources/route.ts`
- Test: `web/tests/e2e/platform-console.spec.ts`
- Test: `web/tests/e2e/platform-auth.spec.ts`

- [ ] **Step 1: Update role vocabulary in the shared platform types**

```ts
// web/src/lib/platform-types.ts
export type PlatformRole = 'owner' | 'admin' | 'operator' | 'viewer';
```

```ts
// DataFlow/proofbench/modules/governance/governance-panel.tsx
function roleLabel(locale: 'zh' | 'en', role: 'owner' | 'admin' | 'operator' | 'viewer') {
  const map = locale === 'zh'
    ? {
        owner: '负责人',
        admin: '管理员',
        operator: '执行运营',
        viewer: '查看者',
      }
    : {
        owner: 'Owner',
        admin: 'Admin',
        operator: 'Operator',
        viewer: 'Viewer',
      };

  return map[role];
}
```

- [ ] **Step 2: Change platform writes to use the authenticated actor instead of `local-admin`**

```ts
// web/src/lib/platform-store.ts
export async function createProject(input: {
  name: string;
  description: string;
  actor: { userId: string; name: string; role: PlatformRole };
}) {
  return mutatePlatformDb((db) => {
    const createdAt = now();
    const project: PlatformProject = {
      id: randomUUID(),
      name: input.name.trim(),
      description: input.description.trim(),
      ownerUserId: input.actor.userId,
      status: 'active',
      createdAt,
      updatedAt: createdAt,
    };
    db.projects.unshift(project);
    db.members[project.id] = [input.actor];
    return project;
  });
}
```

```ts
// example route usage
const auth = await requirePlatformSession();
if (!auth.ok) return auth.response;
const project = await createProject({
  name: body.name,
  description: body.description ?? '',
  actor: {
    userId: auth.session.user.id,
    name: auth.session.user.name,
    role: auth.session.user.role,
  },
});
```

- [ ] **Step 3: Teach the client console to handle expired sessions and show the current operator**

```ts
// web/src/components/platform/use-platform-console.ts
async function readJsonOrThrow(response: Response) {
  if (response.status === 401) {
    window.location.href = '/dataflow/proofbench/login?next=/dataflow/proofbench';
    throw new Error('Authentication required.');
  }
  if (response.status === 403) {
    throw new Error('You do not have permission for this action.');
  }
  return response.json();
}
```

```tsx
// DataFlow/proofbench/ui/benchmarkops-shell.tsx
<div className="surface-muted rounded-[18px] px-4 py-3 text-sm text-[var(--mist)]">
  {shell.locale === 'zh'
    ? `当前身份：${shell.session.user.name} / ${shell.session.user.role}`
    : `Signed in as ${shell.session.user.name} / ${shell.session.user.role}`}
</div>
```

- [ ] **Step 4: Re-run the authenticated platform workflow end-to-end**

Run: `cd web && WANFLOW_ADMIN_PASSWORD=ChangeMe123! npx playwright test tests/e2e/platform-console.spec.ts tests/e2e/platform-auth.spec.ts --workers=1`
Expected: PASS. After login, project creation, manual item creation, and uploads still work, but ownership fields now resolve to the signed-in user instead of `local-admin`.

- [ ] **Step 5: Commit the actor propagation and UI normalization**

```bash
git add web/src/lib/platform-types.ts web/src/lib/platform-store.ts web/src/components/platform/use-platform-console.ts DataFlow/proofbench/ui/benchmarkops-shell.tsx DataFlow/proofbench/modules/governance/governance-panel.tsx web/src/app/api/platform/projects/route.ts web/src/app/api/platform/projects/[projectId]/items/route.ts web/src/app/api/platform/projects/[projectId]/sources/route.ts
git commit -m "refactor: propagate authenticated actors through benchmarkops"
```

### Task 6: Final verification and release-ready regression pass

**Files:**
- Test: `web/src/lib/auth/session.test.ts`
- Test: `web/tests/e2e/contact-flow.spec.ts`
- Test: `web/tests/e2e/platform-auth.spec.ts`
- Test: `web/tests/e2e/platform-console.spec.ts`
- Test: `web/tests/e2e/marketing-site.spec.ts`
- Test: `web/tests/e2e/benchmarkops-route.spec.ts`

- [ ] **Step 1: Run the Node auth unit test in isolation**

Run: `cd web && node --test src/lib/auth/session.test.ts`
Expected: PASS.

- [ ] **Step 2: Run the focused browser regressions without introducing a parallel build conflict**

Run: `cd web && npx playwright test tests/e2e/contact-flow.spec.ts tests/e2e/platform-auth.spec.ts tests/e2e/platform-console.spec.ts tests/e2e/marketing-site.spec.ts tests/e2e/benchmarkops-route.spec.ts --workers=1`
Expected: PASS.

- [ ] **Step 3: Run a fresh production build from a clean `.next` directory**

Run: `cd web && rm -rf .next && npm run build`
Expected: PASS. Do not run this in parallel with Playwright's own build step.

- [ ] **Step 4: Run the full Playwright suite once more for completion evidence**

Run: `cd web && npx playwright test --workers=1`
Expected: PASS with zero failed tests.

- [ ] **Step 5: Commit the verified auth release**

```bash
git add web/src/lib/auth/session.test.ts web/tests/e2e/contact-flow.spec.ts web/tests/e2e/platform-auth.spec.ts web/tests/e2e/platform-console.spec.ts web/tests/e2e/marketing-site.spec.ts web/tests/e2e/benchmarkops-route.spec.ts web/.env.example docs/release-and-delivery.md
git commit -m "test: verify benchmarkops auth and contact refresh"
```

## Self-Review

- Spec coverage: The plan covers the new email and WeChat update, keeps marketing public, keeps `/api/contact` public, protects `/dataflow/proofbench`, protects `/api/platform/*`, migrates the selected role model to `owner | admin | operator | viewer`, and leaves a provider seam for future OAuth / enterprise SSO.
- Placeholder scan: No `TODO`, `TBD`, or vague "add validation later" steps remain; every task names exact files, commands, and expected outcomes.
- Type consistency: The plan uses `AppRole` / `PlatformRole` with the same `owner | admin | operator | viewer` vocabulary across auth, storage, route guards, and UI.
