import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { AppSession } from './auth-types';
import { getAuthConfig } from './auth-config';
import { parseSessionCookieValue } from './session';

type SessionGuardResult =
  | {
      ok: true;
      session: AppSession;
    }
  | {
      ok: false;
      response: NextResponse;
    };

function parseCurrentSession(rawValue: string | undefined): AppSession | null {
  if (!rawValue) {
    return null;
  }

  const config = getAuthConfig();
  return parseSessionCookieValue(rawValue, { secret: config.sessionSecret });
}

export async function getCurrentSession(): Promise<AppSession | null> {
  const config = getAuthConfig();
  const cookieStore = await cookies();
  return parseCurrentSession(cookieStore.get(config.cookieName)?.value);
}

export async function requirePlatformSession(): Promise<SessionGuardResult> {
  const session = await getCurrentSession();
  if (!session) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }

  return {
    ok: true,
    session,
  };
}

