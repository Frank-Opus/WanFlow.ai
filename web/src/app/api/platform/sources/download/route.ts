import { promises as fs } from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { requirePlatformSession } from '@/lib/auth/guards';
import { readPlatformDb } from '@/lib/platform-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type DownloadKind = 'original' | 'normalized' | 'text' | 'latex';

function contentTypeFor(fileName: string) {
  if (fileName.endsWith('.json')) return 'application/json; charset=utf-8';
  if (fileName.endsWith('.pdf')) return 'application/pdf';
  if (fileName.endsWith('.docx')) {
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  }
  if (fileName.endsWith('.tex')) return 'application/x-tex; charset=utf-8';
  if (fileName.endsWith('.md')) return 'text/markdown; charset=utf-8';
  return 'text/plain; charset=utf-8';
}

function resolveDownloadTarget(kind: DownloadKind, source: Awaited<ReturnType<typeof readPlatformDb>>['sourceFiles'][number]) {
  const originalExt = path.extname(source.fileName);
  const baseName = path.basename(source.fileName, originalExt);

  if (kind === 'original') {
    return {
      storagePath: source.storagePath,
      fileName: source.fileName,
    };
  }
  if (kind === 'normalized') {
    return source.metadata?.normalizedArtifactPath
      ? {
          storagePath: source.metadata.normalizedArtifactPath,
          fileName: `${baseName}.normalized.json`,
        }
      : null;
  }
  if (kind === 'text') {
    return source.metadata?.extractedTextPath
      ? {
          storagePath: source.metadata.extractedTextPath,
          fileName: `${baseName}.extracted.txt`,
        }
      : null;
  }
  return source.metadata?.latexArtifactPath
    ? {
        storagePath: source.metadata.latexArtifactPath,
        fileName: `${baseName}.normalized.tex`,
      }
    : null;
}

export async function GET(request: Request) {
  const auth = await requirePlatformSession();
  if (!auth.ok) {
    return auth.response;
  }

  const { searchParams } = new URL(request.url);
  const sourceId = searchParams.get('sourceId') ?? '';
  const kind = (searchParams.get('kind') ?? 'original') as DownloadKind;
  if (!sourceId) {
    return NextResponse.json({ error: 'sourceId is required.' }, { status: 400 });
  }
  if (!['original', 'normalized', 'text', 'latex'].includes(kind)) {
    return NextResponse.json({ error: 'Unsupported download kind.' }, { status: 400 });
  }

  const db = await readPlatformDb();
  const source = db.sourceFiles.find((entry) => entry.id === sourceId);
  if (!source) {
    return NextResponse.json({ error: 'Source file not found.' }, { status: 404 });
  }

  const target = resolveDownloadTarget(kind, source);
  if (!target) {
    return NextResponse.json({ error: `Source ${kind} artifact not available.` }, { status: 404 });
  }

  const filePath = path.join(path.resolve(process.cwd(), '..'), target.storagePath);
  try {
    const buffer = await fs.readFile(filePath);
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentTypeFor(target.fileName),
        'Content-Disposition': `attachment; filename="${target.fileName}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Source artifact file missing.' }, { status: 404 });
  }
}
