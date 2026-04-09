import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getAuthConfig } from '@/lib/auth/auth-config';
import { createSessionCookieClearOptions } from '@/lib/auth/session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST() {
  const config = getAuthConfig();
  const cookieStore = await cookies();

  cookieStore.set(config.cookieName, '', createSessionCookieClearOptions(config.cookieSecure));

  return NextResponse.json({
    ok: true,
    redirectTo: config.loginPath,
  });
}
