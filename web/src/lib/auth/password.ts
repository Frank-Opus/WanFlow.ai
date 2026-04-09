import { timingSafeEqual } from 'node:crypto';

export function safeEqualText(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left, 'utf8');
  const rightBuffer = Buffer.from(right, 'utf8');
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }
  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function verifyPlaintextPassword(inputPassword: string, expectedPassword: string): boolean {
  return safeEqualText(inputPassword, expectedPassword);
}
