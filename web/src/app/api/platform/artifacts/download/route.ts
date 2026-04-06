import { promises as fs } from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { readPlatformDb } from '@/lib/platform-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function contentTypeFor(fileName: string) {
  if (fileName.endsWith('.xlsx')) {
    return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  }
  if (fileName.endsWith('.json')) {
    return 'application/json; charset=utf-8';
  }
  return 'text/plain; charset=utf-8';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const artifactId = searchParams.get('artifactId') ?? '';
  if (!artifactId) {
    return NextResponse.json({ error: 'artifactId is required.' }, { status: 400 });
  }

  const db = await readPlatformDb();
  const artifact = db.artifacts.find((entry) => entry.id === artifactId);
  if (!artifact) {
    return NextResponse.json({ error: 'Artifact not found.' }, { status: 404 });
  }

  const filePath = path.join(path.resolve(process.cwd(), '..'), artifact.storagePath);
  try {
    const buffer = await fs.readFile(filePath);
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentTypeFor(artifact.fileName),
        'Content-Disposition': `attachment; filename="${artifact.fileName}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Artifact file missing.' }, { status: 404 });
  }
}
