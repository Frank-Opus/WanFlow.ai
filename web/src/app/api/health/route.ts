import { NextResponse } from 'next/server';
import { getPlatformRuntimeHealth } from '@/lib/platform-runtime';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const payload = await getPlatformRuntimeHealth();
  const httpStatus = payload.status === 'error' ? 503 : 200;

  return NextResponse.json(
    {
      service: 'wanflow-enterprise-platform',
      timestamp: new Date().toISOString(),
      ...payload,
    },
    { status: httpStatus }
  );
}
