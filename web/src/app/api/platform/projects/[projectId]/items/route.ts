import { NextResponse } from 'next/server';
import { requirePlatformSession } from '@/lib/auth/guards';
import { createProblemItem, getProjectBundle } from '@/lib/platform-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_: Request, context: { params: Promise<{ projectId: string }> }) {
  const auth = await requirePlatformSession();
  if (!auth.ok) {
    return auth.response;
  }
  const { projectId } = await context.params;
  const bundle = await getProjectBundle(projectId);
  if (!bundle) {
    return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
  }
  return NextResponse.json({ problemItems: bundle.problemItems });
}

export async function POST(request: Request, context: { params: Promise<{ projectId: string }> }) {
  const auth = await requirePlatformSession();
  if (!auth.ok) {
    return auth.response;
  }
  const { projectId } = await context.params;
  const body = (await request.json().catch(() => ({}))) as {
    sourceFileId?: string | null;
    title?: string;
    prompt?: string;
    answerKey?: string;
    subject?: string;
    gradeLevel?: string;
    difficulty?: string;
    itemType?: string;
    tags?: string[];
    notes?: string;
  };

  if (!body.title?.trim() || !body.prompt?.trim() || !body.answerKey?.trim()) {
    return NextResponse.json({ error: 'title, prompt, and answerKey are required.' }, { status: 400 });
  }

  const item = await createProblemItem({
    projectId,
    sourceFileId: body.sourceFileId ?? null,
    title: body.title,
    prompt: body.prompt,
    answerKey: body.answerKey,
    metadata: {
      subject: body.subject ?? 'General',
      gradeLevel: body.gradeLevel ?? 'Unknown',
      difficulty: body.difficulty ?? 'Unspecified',
      itemType: body.itemType ?? 'Open response',
      tags: body.tags ?? [],
      notes: body.notes ?? '',
    },
    itemSchemaVersion: 'v1',
    reviewStatus: 'draft',
    actor: {
      id: auth.session.user.id,
      name: auth.session.user.name,
      role: auth.session.user.role,
    },
  });

  return NextResponse.json({ item }, { status: 201 });
}
