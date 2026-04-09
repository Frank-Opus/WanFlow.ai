import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { requirePlatformSession } from '@/lib/auth/guards';
import { createSourceFile, getProjectBundle, getProjectUploadDir } from '@/lib/platform-store';
import { inferSourceFileType, ingestStoredSource } from '@/lib/source-ingestion';

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
  return NextResponse.json({ sourceFiles: bundle.sourceFiles });
}

export async function POST(request: Request, context: { params: Promise<{ projectId: string }> }) {
  const auth = await requirePlatformSession();
  if (!auth.ok) {
    return auth.response;
  }
  const { projectId } = await context.params;
  const bundle = await getProjectBundle(projectId);
  if (!bundle) {
    return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
  }

  const formData = await request.formData();
  const files = formData.getAll('file').filter((entry): entry is File => entry instanceof File);
  if (!files.length) {
    return NextResponse.json({ error: 'At least one uploaded file is required.' }, { status: 400 });
  }
  const relativePaths = formData.getAll('relativePath').map((entry) => String(entry));

  const uploadDir = getProjectUploadDir(projectId);
  await fs.mkdir(uploadDir, { recursive: true });

  const sources = [];
  const importedItems = [];
  const warnings: string[] = [];

  for (const [index, file] of files.entries()) {
    const safeName = `${randomUUID()}-${file.name}`;
    const absolutePath = path.join(uploadDir, safeName);
    const storagePath = path.relative(path.resolve(process.cwd(), '..'), absolutePath);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(absolutePath, buffer);

    const relativePath = relativePaths[index]?.trim() || file.name;
    const source = await createSourceFile({
      projectId,
      fileName: file.name,
      fileType: inferSourceFileType(file.name),
      storagePath,
      uploadUserId: 'local-admin',
      parseStatus: 'uploaded',
      parseError: null,
      importedItemIds: [],
      metadata: {
        relativePath,
      },
    });

    try {
      const result = await ingestStoredSource({ source });
      if (result.source) {
        sources.push(result.source);
      } else {
        sources.push(source);
      }
      importedItems.push(...result.importedItems);
      warnings.push(...result.warnings);
    } catch (error) {
      sources.push(source);
      warnings.push(error instanceof Error ? error.message : `Failed to ingest ${file.name}.`);
    }
  }

  return NextResponse.json({ sources, importedItems, warnings }, { status: 201 });
}
