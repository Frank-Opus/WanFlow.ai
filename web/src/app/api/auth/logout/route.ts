import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getAuthConfig } from '@/lib/auth/auth-config';
import { createSessionCookieClearOptions, resolveSessionCookieSecure } from '@/lib/auth/session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const config = getAuthConfig();
  const cookieStore = await cookies();
  const cookieSecure = resolveSessionCookieSecure(request, config.cookieSecure);

  cookieStore.set(config.cookieName, '', createSessionCookieClearOptions(cookieSecure));

  return NextResponse.json({
    ok: true,
    redirectTo: config.loginPath,
  });
}
