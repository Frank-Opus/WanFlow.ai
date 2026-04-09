import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getAuthConfig } from '@/lib/auth/auth-config';
import { getAuthProvider } from '@/lib/auth/providers';
import { createSessionCookieSetOptions, createSessionCookieValue } from '@/lib/auth/session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type LoginPayload = {
  email?: string;
  password?: string;
  next?: string;
};

function normalizeNextPath(input: string | undefined, fallback: string): string {
  const candidate = input?.trim();
  if (!candidate) {
    return fallback;
  }

  if (!candidate.startsWith('/') || candidate.startsWith('//')) {
    return fallback;
  }

  return candidate;
}

export async function POST(request: Request) {
  let payload: LoginPayload;

  try {
    payload = (await request.json()) as LoginPayload;
  } catch {
    return NextResponse.json({ ok: false, error: '请求格式错误。' }, { status: 400 });
  }

  const config = getAuthConfig();
  const redirectTo = normalizeNextPath(payload.next, '/dataflow/proofbench');
  const email = payload.email?.trim() ?? '';
  const password = payload.password ?? '';

  if (!email || !password) {
    return NextResponse.json({ ok: false, error: '请输入邮箱和密码。' }, { status: 400 });
  }

  const provider = getAuthProvider('credentials');
  if (!provider) {
    return NextResponse.json({ ok: false, error: '登录服务暂不可用。' }, { status: 503 });
  }

  const user = await provider.authenticate({ email, password });
  if (!user) {
    return NextResponse.json({ ok: false, error: '账号或密码错误。' }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(
    config.cookieName,
    createSessionCookieValue(user, {
      secret: config.sessionSecret,
      ttlSeconds: config.sessionTtlSeconds,
    }),
    createSessionCookieSetOptions(config.sessionTtlSeconds, config.cookieSecure)
  );

  return NextResponse.json({
    ok: true,
    redirectTo,
    user: {
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
}
