import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createProblemItem, getSourceArtifactDir, resolvePlatformPath, updateSourceFile } from '@/lib/platform-store';
import { resolvePythonBin } from '@/lib/platform-runtime';
import type { PlatformProblemItem, PlatformSourceFile } from '@/lib/platform-types';
import type { NormalizedSourceDocument } from '@/lib/source-types';

const ROOT_DIR = path.resolve(process.cwd(), '..');

export function inferSourceFileType(fileName: string): PlatformSourceFile['fileType'] {
  const ext = path.extname(fileName).toLowerCase();
  if (ext === '.pdf') return 'pdf';
  if (ext === '.docx') return 'docx';
  if (ext === '.json') return 'json';
  if (ext === '.txt' || ext === '.md' || ext === '.tex') return 'txt';
  return 'other';
}

function parseAnswerLine(text: string) {
  return text.match(/(?:^|\n)\s*(?:answer|答案)\s*[:：]\s*(.+)$/im)?.[1]?.trim() ?? '';
}

function stripAnswerLine(text: string) {
  return text.replace(/(?:^|\n)\s*(?:answer|答案)\s*[:：]\s*.+$/im, '').trim();
}

export function extractProblemDraftsFromNormalizedDocument(doc: NormalizedSourceDocument) {
  return doc.sectionBlocks
    .filter((block) => block.blockType === 'problem')
    .map((block, index) => ({
      title: block.heading || `${doc.title} / Problem ${index + 1}`,
      prompt: stripAnswerLine(block.bodyText),
      answerKey: parseAnswerLine(block.bodyText),
    }))
    .filter((item) => item.prompt && item.answerKey);
}

function buildNormalizedDocumentFromJson(
  source: PlatformSourceFile,
  parsed: Record<string, unknown>,
): NormalizedSourceDocument {
  const title = String(parsed['标题'] ?? parsed['title'] ?? source.fileName);
  const prompt = String(parsed['问题'] ?? parsed['prompt'] ?? '');
  const answerKey = String(parsed['最终答案'] ?? parsed['answer'] ?? '');
  return {
    schemaVersion: 'v1',
    sourceFileId: source.id,
    projectId: source.projectId,
    sourceKind: 'json',
    title,
    language: /[\u4e00-\u9fff]/.test(`${title}\n${prompt}`) ? 'zh' : 'en',
    plainText: [title, prompt, `Answer: ${answerKey}`].filter(Boolean).join('\n'),
    latexSource: null,
    sectionBlocks: [
      {
        heading: title,
        bodyText: `${prompt}\nAnswer: ${answerKey}`.trim(),
        blockType: 'problem',
      },
    ],
    sourceFiles: [source.fileName],
    diagnostics: {
      classifier: 'json_structured',
      extractionMethod: 'json_direct',
      warnings: [],
    },
  };
}

async function runPythonNormalization(input: {
  absolutePath: string;
  source: PlatformSourceFile;
  outputJsonPath: string;
}) {
  const pythonBin = await resolvePythonBin();
  return await new Promise<{ code: number; stdout: string; stderr: string }>((resolve, reject) => {
    const child = spawn(
      pythonBin,
      [
        '-m',
        'math_eval_framework.cli',
        'normalize-source',
        '--input',
        input.absolutePath,
        '--project-id',
        input.source.projectId,
        '--source-file-id',
        input.source.id,
        '--original-file-name',
        input.source.fileName,
        '--output-json',
        input.outputJsonPath,
      ],
      {
        cwd: ROOT_DIR,
        env: {
          ...process.env,
          PYTHONPATH: process.env.PYTHONPATH
            ? `${path.join(ROOT_DIR, 'src')}${path.delimiter}${process.env.PYTHONPATH}`
            : path.join(ROOT_DIR, 'src'),
        },
      }
    );
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => {
      stdout += String(chunk);
    });
    child.stderr.on('data', (chunk) => {
      stderr += String(chunk);
    });
    child.on('error', reject);
    child.on('close', (code) => {
      resolve({ code: code ?? 1, stdout, stderr });
    });
  });
}

async function persistNormalizedArtifacts(source: PlatformSourceFile, doc: NormalizedSourceDocument, normalizedJsonPath: string) {
  const assetDir = getSourceArtifactDir(source.projectId, source.id);
  await fs.mkdir(assetDir, { recursive: true });
  const extractedTextPath = path.join(assetDir, 'extracted.txt');
  await fs.writeFile(extractedTextPath, doc.plainText, 'utf8');
  const latexSource = doc.latexSource;
  const latexPath = latexSource ? path.join(assetDir, 'normalized.tex') : null;
  if (latexPath && latexSource) {
    await fs.writeFile(latexPath, latexSource, 'utf8');
  }

  return {
    normalizedArtifactPath: path.relative(ROOT_DIR, normalizedJsonPath),
    extractedTextPath: path.relative(ROOT_DIR, extractedTextPath),
    latexArtifactPath: latexPath ? path.relative(ROOT_DIR, latexPath) : null,
  };
}

export async function ingestStoredSource(input: {
  source: PlatformSourceFile;
}): Promise<{
  source: PlatformSourceFile | null;
  normalizedDocument: NormalizedSourceDocument | null;
  importedItems: PlatformProblemItem[];
  warnings: string[];
}> {
  const warnings: string[] = [];
  const importedItems: PlatformProblemItem[] = [];
  const sourceAbsolutePath = resolvePlatformPath(input.source.storagePath);
  const assetDir = getSourceArtifactDir(input.source.projectId, input.source.id);
  await fs.mkdir(assetDir, { recursive: true });
  const normalizedJsonPath = path.join(assetDir, 'normalized.json');

  try {
    if (input.source.fileType === 'json') {
      const parsed = JSON.parse(await fs.readFile(sourceAbsolutePath, 'utf8')) as Record<string, unknown>;
      const normalizedDocument = buildNormalizedDocumentFromJson(input.source, parsed);
      await fs.writeFile(normalizedJsonPath, JSON.stringify(normalizedDocument, null, 2), 'utf8');
      const artifactPaths = await persistNormalizedArtifacts(input.source, normalizedDocument, normalizedJsonPath);
      const item = await createProblemItem({
        projectId: input.source.projectId,
        sourceFileId: input.source.id,
        title: String(parsed['标题'] ?? parsed['title'] ?? input.source.fileName),
        prompt: String(parsed['问题'] ?? parsed['prompt'] ?? ''),
        answerKey: String(parsed['最终答案'] ?? parsed['answer'] ?? ''),
        metadata: {
          subject: String(parsed['领域类型'] ?? parsed['subject'] ?? 'General'),
          gradeLevel: String(parsed['适合年级'] ?? parsed['gradeLevel'] ?? 'Unknown'),
          difficulty: String(parsed['difficulty'] ?? 'Unspecified'),
          itemType: String(parsed['itemType'] ?? 'Open response'),
          tags: Array.isArray(parsed['考察知识点']) ? parsed['考察知识点'].map(String) : [],
          notes: 'Imported from uploaded JSON source.',
        },
        itemSchemaVersion: 'v1',
        reviewStatus: 'reviewed',
      });
      importedItems.push(item);
      const source = await updateSourceFile(input.source.id, {
        parseStatus: 'itemized',
        parseError: null,
        metadata: {
          ...(input.source.metadata ?? {}),
          classifier: normalizedDocument.diagnostics.classifier,
          ...artifactPaths,
        },
      });
      return { source, normalizedDocument, importedItems, warnings };
    }

    await updateSourceFile(input.source.id, {
      parseStatus: 'classifying',
      parseError: null,
    });
    await updateSourceFile(input.source.id, {
      parseStatus: 'extracting',
    });

    const result = await runPythonNormalization({
      absolutePath: sourceAbsolutePath,
      source: input.source,
      outputJsonPath: normalizedJsonPath,
    });
    if (result.code !== 0) {
      throw new Error(result.stderr || result.stdout || 'Source normalization failed.');
    }

    const normalizedDocument = JSON.parse(await fs.readFile(normalizedJsonPath, 'utf8')) as NormalizedSourceDocument;
    const artifactPaths = await persistNormalizedArtifacts(input.source, normalizedDocument, normalizedJsonPath);
    const drafts = extractProblemDraftsFromNormalizedDocument(normalizedDocument);
    for (const draft of drafts) {
      importedItems.push(
        await createProblemItem({
          projectId: input.source.projectId,
          sourceFileId: input.source.id,
          title: draft.title,
          prompt: draft.prompt,
          answerKey: draft.answerKey,
          metadata: {
            subject: 'General',
            gradeLevel: normalizedDocument.language === 'zh' ? '未标注' : 'Unspecified',
            difficulty: 'Unspecified',
            itemType: 'Open response',
            tags: [],
            notes: `Extracted from normalized source ${input.source.fileName}.`,
          },
          itemSchemaVersion: 'v1',
          reviewStatus: 'reviewed',
        })
      );
    }

    const source = await updateSourceFile(input.source.id, {
      parseStatus: importedItems.length ? 'itemized' : 'normalized',
      parseError: null,
      metadata: {
        ...(input.source.metadata ?? {}),
        classifier: normalizedDocument.diagnostics.classifier,
        ...artifactPaths,
      },
    });

    return { source, normalizedDocument, importedItems, warnings: normalizedDocument.diagnostics.warnings };
  } catch (error) {
    const source = await updateSourceFile(input.source.id, {
      parseStatus: 'failed',
      parseError: error instanceof Error ? error.message : 'Source normalization failed.',
    });
    warnings.push(error instanceof Error ? error.message : 'Source normalization failed.');
    return { source, normalizedDocument: null, importedItems, warnings };
  }
}
