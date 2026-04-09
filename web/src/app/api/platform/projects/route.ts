import { NextResponse } from 'next/server';
import { requirePlatformSession } from '@/lib/auth/guards';
import { createProject, listProjectBundles } from '@/lib/platform-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const auth = await requirePlatformSession();
  if (!auth.ok) {
    return auth.response;
  }
  const bundles = await listProjectBundles();
  return NextResponse.json({ projects: bundles });
}

export async function POST(request: Request) {
  const auth = await requirePlatformSession();
  if (!auth.ok) {
    return auth.response;
  }
  const body = (await request.json().catch(() => ({}))) as { name?: string; description?: string };
  if (!body.name?.trim()) {
    return NextResponse.json({ error: 'Project name is required.' }, { status: 400 });
  }
  const project = await createProject({
    name: body.name,
    description: body.description ?? '',
  });
  return NextResponse.json({ project });
}
