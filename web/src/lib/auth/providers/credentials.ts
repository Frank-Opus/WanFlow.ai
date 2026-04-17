import type { AuthProvider, CredentialsAuthInput } from '../auth-types';
import { getAuthConfig } from '../auth-config';
import { safeEqualText, verifyPlaintextPassword } from '../password';

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function createCredentialsProvider(): AuthProvider {
  return {
    id: 'credentials',
    async authenticate(input: CredentialsAuthInput) {
      const config = getAuthConfig();
      const email = normalizeEmail(input.email);
      const expectedEmail = normalizeEmail(config.credentials.email);
      const password = input.password;

      const emailMatched = safeEqualText(email, expectedEmail);
      const passwordMatched = verifyPlaintextPassword(password, config.credentials.password);

      if (!emailMatched || !passwordMatched) {
        return null;
      }

      return {
        id: `credentials:${expectedEmail}`,
        email: config.credentials.email,
        name: config.credentials.name,
        role: config.credentials.role,
      };
    },
  };
}
