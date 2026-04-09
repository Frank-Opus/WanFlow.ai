import { cache } from 'react';
import type { AppRole, FutureProviderConfig } from './auth-types';

type CredentialsConfig = {
  email: string;
  password: string;
  name: string;
  role: AppRole;
};

export type AuthConfig = {
  cookieName: string;
  sessionSecret: string;
  sessionTtlSeconds: number;
  cookieSecure: boolean;
  loginPath: string;
  credentials: CredentialsConfig;
  futureProviders: FutureProviderConfig;
};

const VALID_ROLES: readonly AppRole[] = ['owner', 'admin', 'operator', 'viewer'];

function parseRole(value: string | undefined): AppRole {
  const normalized = value?.trim().toLowerCase();
  if (normalized && VALID_ROLES.includes(normalized as AppRole)) {
    return normalized as AppRole;
  }
  return 'owner';
}

function parsePositiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  if (Number.isFinite(parsed) && parsed > 0 && Number.isInteger(parsed)) {
    return parsed;
  }
  return fallback;
}

export const getAuthConfig = cache((): AuthConfig => ({
  cookieName: process.env.WANFLOW_SESSION_COOKIE?.trim() || 'wanflow_session',
  sessionSecret: process.env.WANFLOW_SESSION_SECRET?.trim() || 'dev-only-change-me',
  sessionTtlSeconds: parsePositiveInteger(process.env.WANFLOW_SESSION_TTL_SECONDS, 60 * 60 * 12),
  cookieSecure: process.env.NODE_ENV === 'production',
  loginPath: '/dataflow/proofbench/login',
  credentials: {
    email: process.env.WANFLOW_ADMIN_EMAIL?.trim() || 'wanflow@163.com',
    password: process.env.WANFLOW_ADMIN_PASSWORD?.trim() || 'ChangeMe123!',
    name: process.env.WANFLOW_ADMIN_NAME?.trim() || 'Frank Xu',
    role: parseRole(process.env.WANFLOW_ADMIN_ROLE),
  },
  futureProviders: {
    oauthEnabled: process.env.WANFLOW_AUTH_ENABLE_OAUTH === '1',
    ssoHint: process.env.WANFLOW_AUTH_SSO_HINT?.trim() || 'reserved-for-enterprise-sso',
  },
}));
