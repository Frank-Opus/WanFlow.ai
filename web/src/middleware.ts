import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PROOFBENCH_ROOT = '/dataflow/proofbench';
const PROOFBENCH_LOGIN = '/dataflow/proofbench/login';

function sessionCookieName() {
  const configuredName = process.env.WANFLOW_SESSION_COOKIE?.trim();
  return configuredName || 'wanflow_session';
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!pathname.startsWith(PROOFBENCH_ROOT) || pathname.startsWith(PROOFBENCH_LOGIN)) {
    return NextResponse.next();
  }

  const hasSessionCookie = Boolean(request.cookies.get(sessionCookieName())?.value);
  if (hasSessionCookie) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = PROOFBENCH_LOGIN;
  loginUrl.search = '';
  loginUrl.searchParams.set('next', `${pathname}${search}`);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/dataflow/proofbench/:path*'],
};

