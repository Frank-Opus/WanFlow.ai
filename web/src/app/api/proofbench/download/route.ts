import { promises as fs } from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ROOT_DIR = path.resolve(process.cwd(), '..');
const RUNS_DIR = path.join(ROOT_DIR, 'runs');
const ALLOWED_FILES = new Set(['artifact.json', 'artifact.xlsx']);

function contentTypeFor(fileName: string): string {
  if (fileName.endsWith('.xlsx')) {
    return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  }
  return 'application/json; charset=utf-8';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const runId = searchParams.get('runId') ?? '';
  const fileName = searchParams.get('file') ?? '';

  if (!/^\d{4}-\d{2}-\d{2}T/.test(runId) || !ALLOWED_FILES.has(fileName)) {
    return NextResponse.json({ error: 'Invalid artifact request.' }, { status: 400 });
  }

  const filePath = path.join(RUNS_DIR, runId, fileName);

  try {
    const buffer = await fs.readFile(filePath);
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentTypeFor(fileName),
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Artifact not found.' }, { status: 404 });
  }
}
