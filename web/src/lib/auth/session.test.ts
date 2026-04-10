import assert from 'node:assert/strict';
import test from 'node:test';
import type { AuthUser } from './auth-types.ts';
import { createSessionCookieValue, parseSessionCookieValue, resolveSessionCookieSecure } from './session.ts';

const USER: AuthUser = {
  id: 'owner-frank',
  email: 'wanflow@163.com',
  name: 'Frank Xu',
  role: 'owner',
};

test('createSessionCookieValue and parseSessionCookieValue roundtrip', () => {
  const raw = createSessionCookieValue(USER, { secret: 'test-secret', ttlSeconds: 60 });
  const parsed = parseSessionCookieValue(raw, { secret: 'test-secret' });

  assert.ok(parsed);
  assert.equal(parsed.user.email, 'wanflow@163.com');
  assert.equal(parsed.user.role, 'owner');
});

test('parseSessionCookieValue rejects tampered cookies', () => {
  const raw = createSessionCookieValue(USER, { secret: 'test-secret', ttlSeconds: 60 });
  const [payload, signature] = raw.split('.');
  const json = Buffer.from(payload, 'base64url').toString('utf8').replace('owner-frank', 'viewer-demo');
  const tamperedPayload = Buffer.from(json, 'utf8').toString('base64url');
  const tampered = `${tamperedPayload}.${signature}`;

  assert.equal(parseSessionCookieValue(tampered, { secret: 'test-secret' }), null);
});

test('parseSessionCookieValue rejects expired cookies', () => {
  const raw = createSessionCookieValue(USER, { secret: 'test-secret', ttlSeconds: -1 });
  assert.equal(parseSessionCookieValue(raw, { secret: 'test-secret' }), null);
});

test('parseSessionCookieValue rejects cookies with wrong secret', () => {
  const raw = createSessionCookieValue(USER, { secret: 'test-secret', ttlSeconds: 60 });
  assert.equal(parseSessionCookieValue(raw, { secret: 'wrong-secret' }), null);
});

test('resolveSessionCookieSecure trusts forwarded https headers', () => {
  assert.equal(
    resolveSessionCookieSecure(
      {
        url: 'http://127.0.0.1:3401/api/auth/login',
        headers: new Headers({ 'x-forwarded-proto': 'https' }),
      },
      false
    ),
    true
  );
});

test('resolveSessionCookieSecure stays false for local http requests', () => {
  assert.equal(
    resolveSessionCookieSecure(
      {
        url: 'http://127.0.0.1:3401/api/auth/login',
        headers: new Headers(),
      },
      true
    ),
    false
  );
});
