import type { AuthProvider, AuthProviderId } from '../auth-types';
import { getAuthConfig } from '../auth-config';
import { createCredentialsProvider } from './credentials';

export type AuthProviderDescriptor = {
  id: AuthProviderId;
  enabled: boolean;
  label: string;
  hint?: string;
};

const credentialsProvider = createCredentialsProvider();

const providerMap: Record<AuthProviderId, AuthProvider | null> = {
  credentials: credentialsProvider,
  oauth: null,
  'enterprise-sso': null,
};

export function getAuthProvider(id: AuthProviderId): AuthProvider | null {
  return providerMap[id];
}

export function listAuthProviderDescriptors(): AuthProviderDescriptor[] {
  const config = getAuthConfig();

  return [
    {
      id: 'credentials',
      enabled: true,
      label: '账号密码',
      hint: '推荐用于当前内测环境',
    },
    {
      id: 'oauth',
      enabled: config.futureProviders.oauthEnabled,
      label: 'OAuth',
      hint: config.futureProviders.oauthEnabled ? '即将接入第三方 OAuth' : '未启用（预留）',
    },
    {
      id: 'enterprise-sso',
      enabled: false,
      label: '企业 SSO',
      hint: config.futureProviders.ssoHint,
    },
  ];
}
