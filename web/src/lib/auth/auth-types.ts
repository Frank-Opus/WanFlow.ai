export type AppRole = 'owner' | 'admin' | 'operator' | 'viewer';

export type AuthProviderId = 'credentials' | 'oauth' | 'enterprise-sso';

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

export type CredentialsAuthInput = {
  email: string;
  password: string;
};

export type AuthProvider = {
  id: AuthProviderId;
  authenticate(input: CredentialsAuthInput): Promise<AuthUser | null>;
};

export type FutureProviderConfig = {
  oauthEnabled: boolean;
  ssoHint: string;
};
