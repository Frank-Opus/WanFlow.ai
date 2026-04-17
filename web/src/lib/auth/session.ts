import { createHmac, timingSafeEqual } from 'node:crypto';
import type { AppSession, AuthUser } from './auth-types';

export type SessionCookieSigningOptions = {
  secret: string;
  ttlSeconds: number;
};

export type SessionCookieParseOptions = {
  secret: string;
};

export type SessionCookieSetOptions = {
  httpOnly: true;
  secure: boolean;
  sameSite: 'lax';
  path: '/';
  expires: Date;
  maxAge: number;
};

type RequestLike = {
  url: string;
  headers: Pick<Headers, 'get'>;
};

function signPayload(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

function safeEqualSignature(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left, 'utf8');
  const rightBuffer = Buffer.from(right, 'utf8');
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }
  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function createSessionCookieValue(user: AuthUser, options: SessionCookieSigningOptions): string {
  const issuedAt = new Date();
  const expiresAt = new Date(issuedAt.getTime() + options.ttlSeconds * 1000);
  const session: AppSession = {
    user,
    issuedAt: issuedAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };
  const payload = Buffer.from(JSON.stringify(session), 'utf8').toString('base64url');
  const signature = signPayload(payload, options.secret);
  return `${payload}.${signature}`;
}

export function parseSessionCookieValue(raw: string, options: SessionCookieParseOptions): AppSession | null {
  const [payload = '', signature = '', ...rest] = raw.split('.');
  if (!payload || !signature || rest.length > 0) {
    return null;
  }

  const expectedSignature = signPayload(payload, options.secret);
  if (!safeEqualSignature(signature, expectedSignature)) {
    return null;
  }

  let session: AppSession;
  try {
    session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as AppSession;
  } catch {
    return null;
  }

  const expiresAt = Date.parse(session.expiresAt);
  const issuedAt = Date.parse(session.issuedAt);
  if (!Number.isFinite(expiresAt) || !Number.isFinite(issuedAt)) {
    return null;
  }
  if (expiresAt <= Date.now() || issuedAt > Date.now() + 10_000) {
    return null;
  }
  if (!session.user?.id || !session.user?.email || !session.user?.name || !session.user?.role) {
    return null;
  }

  return session;
}

export function createSessionCookieSetOptions(ttlSeconds: number, secure: boolean): SessionCookieSetOptions {
  return {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    expires: new Date(Date.now() + ttlSeconds * 1000),
    maxAge: ttlSeconds,
  };
}

export function createSessionCookieClearOptions(secure: boolean): SessionCookieSetOptions {
  return {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
    maxAge: 0,
  };
}

export function resolveSessionCookieSecure(request: RequestLike, fallback: boolean): boolean {
  const forwardedProto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim().toLowerCase();
  if (forwardedProto === 'https') {
    return true;
  }
  if (forwardedProto === 'http') {
    return false;
  }

  try {
    return new URL(request.url).protocol === 'https:';
  } catch {
    return fallback;
  }
}
