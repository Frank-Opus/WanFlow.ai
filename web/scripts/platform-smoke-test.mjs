import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const webDir = path.resolve(scriptDir, '..');
const rootDir = path.resolve(webDir, '..');
const execFileAsync = promisify(execFile);
const baseUrl = (process.env.PLATFORM_SMOKE_BASE_URL || 'http://127.0.0.1:3010').replace(/\/$/, '');
const runBaseUrl = process.env.PLATFORM_SMOKE_MODEL_BASE_URL || 'http://35.220.164.252:3888/v1/';
const runModel = process.env.PLATFORM_SMOKE_MODEL_NAME || 'Qwen/Qwen3-235B-A22B-Thinking-2507';
const runLive = process.env.PLATFORM_SMOKE_SKIP_RUNS === '1' ? false : true;

async function createPdfFixture() {
  const tempDir = await mkdtemp(path.join(tmpdir(), 'wanflow-smoke-'));
  const pdfPath = path.join(tempDir, 'algebra-sheet.pdf');
  const pythonBin = process.env.WANFLOW_PYTHON_BIN || 'python3';
  await execFileAsync(pythonBin, [
    '-c',
    [
      'import sys',
      'import fitz',
      'doc = fitz.open()',
      'page = doc.new_page()',
      "page.insert_text((72, 72), 'Problem 2\\nQuestion: Compute 3+4.\\nAnswer: 7')",
      'doc.save(sys.argv[1])',
      'doc.close()',
    ].join('; '),
    pdfPath,
  ]);
  return {
    pdfPath,
    async cleanup() {
      await rm(tempDir, { recursive: true, force: true });
    },
  };
}

async function createDocxFixture() {
  const tempDir = await mkdtemp(path.join(tmpdir(), 'wanflow-docx-smoke-'));
  const docxPath = path.join(tempDir, 'algebra-sheet.docx');
  const pythonBin = process.env.WANFLOW_PYTHON_BIN || 'python3';
  await execFileAsync(pythonBin, [
    '-c',
    [
      'import sys',
      'from docx import Document',
      'doc = Document()',
      "doc.add_paragraph('Problem 4')",
      "doc.add_paragraph('Question: Compute 8+5.')",
      "doc.add_paragraph('Answer: 13')",
      'doc.save(sys.argv[1])',
    ].join('; '),
    docxPath,
  ]);
  return {
    docxPath,
    async cleanup() {
      await rm(tempDir, { recursive: true, force: true });
    },
  };
}

function assertOk(response, message) {
  if (!response.ok) {
    throw new Error(`${message}: ${response.status} ${response.statusText}`);
  }
}

async function requestJson(url, init, message) {
  const response = await fetch(url, init);
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`${message}: ${response.status} ${detail}`);
  }
  return { response, data: await response.json() };
}

async function uploadSources(projectId) {
  const form = new FormData();
  const sourcePath = path.join(rootDir, 'examples', 'qf3_item.json');
  const payload = await readFile(sourcePath);
  const pdfFixture = await createPdfFixture();
  const docxFixture = await createDocxFixture();
  form.append('file', new Blob([payload], { type: 'application/json' }), 'qf3_item.json');
  form.append('relativePath', 'json/qf3_item.json');
  form.append(
    'file',
    new Blob(
      [
        '# Algebra Notes\n\nProblem 1\nQuestion: Solve x^2-1=0 and return the positive root only.\nAnswer: 1\n',
      ],
      { type: 'text/markdown' }
    ),
    'algebra-notes.md'
  );
  form.append('relativePath', 'notes/algebra-notes.md');
  form.append('file', new Blob([await readFile(pdfFixture.pdfPath)], { type: 'application/pdf' }), 'algebra-sheet.pdf');
  form.append('relativePath', 'pdf/algebra-sheet.pdf');
  form.append(
    'file',
    new Blob(
      [await readFile(docxFixture.docxPath)],
      { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
    ),
    'algebra-sheet.docx'
  );
  form.append('relativePath', 'docx/algebra-sheet.docx');

  try {
    const { data } = await requestJson(
      `${baseUrl}/api/platform/projects/${projectId}/sources`,
      { method: 'POST', body: form },
      'Upload sources failed'
    );
    return data;
  } finally {
    await pdfFixture.cleanup();
    await docxFixture.cleanup();
  }
}

async function createManualItem(projectId) {
  const { data } = await requestJson(
    `${baseUrl}/api/platform/projects/${projectId}/items`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Platform Smoke Item',
        prompt: 'Solve x^2-1=0 and return the positive root only.',
        answerKey: '1',
        subject: 'Algebra',
        gradeLevel: 'Middle School',
        difficulty: 'Easy',
        itemType: 'Open response',
        tags: ['platform', 'smoke'],
        notes: 'Created by platform smoke test.',
      }),
    },
    'Create manual item failed'
  );
  return data;
}

async function createRun(projectId, problemItemId, mode) {
  const { data } = await requestJson(
    `${baseUrl}/api/platform/projects/${projectId}/runs`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        problemItemId,
        mode,
        baseUrl: runBaseUrl,
        modelName: runModel,
        runs: 1,
        parallelism: 1,
        temperature: 0.1,
        maxTokens: 256,
      }),
    },
    `${mode} run failed`
  );
  return data;
}

async function getRuns(projectId) {
  const { data } = await requestJson(
    `${baseUrl}/api/platform/projects/${projectId}/runs`,
    undefined,
    'Fetch runs failed'
  );
  return data;
}

async function waitForAsyncRun(projectId, runId) {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const snapshot = await getRuns(projectId);
    const run = (snapshot.runs || []).find((entry) => entry.id === runId);
    if (run && ['completed', 'failed', 'cancelled'].includes(run.status)) {
      return { snapshot, run };
    }
  }
  throw new Error(`Async run ${runId} did not finish within timeout.`);
}

async function downloadArtifact(artifactId) {
  const response = await fetch(`${baseUrl}/api/platform/artifacts/download?artifactId=${encodeURIComponent(artifactId)}`);
  assertOk(response, 'Artifact download failed');
  return {
    artifactId,
    contentType: response.headers.get('content-type'),
    bytes: (await response.arrayBuffer()).byteLength,
  };
}

async function downloadSourceArtifact(sourceId, kind) {
  const response = await fetch(
    `${baseUrl}/api/platform/sources/download?sourceId=${encodeURIComponent(sourceId)}&kind=${encodeURIComponent(kind)}`
  );
  assertOk(response, `Source ${kind} download failed`);
  return {
    sourceId,
    kind,
    contentType: response.headers.get('content-type'),
    bytes: (await response.arrayBuffer()).byteLength,
  };
}

async function main() {
  const summary = {
    baseUrl,
    runLive,
  };

  const { data: projectsPayload } = await requestJson(`${baseUrl}/api/platform/projects`, undefined, 'List projects failed');
  summary.initialProjectCount = (projectsPayload.projects || []).length;

  const { data: createProjectPayload } = await requestJson(
    `${baseUrl}/api/platform/projects`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `Smoke Project ${new Date().toISOString()}`,
        description: 'Created by platform smoke test.',
      }),
    },
    'Create project failed'
  );
  const projectId = createProjectPayload.project.id;
  summary.projectId = projectId;

  const uploadPayload = await uploadSources(projectId);
  summary.uploadedSourceIds = (uploadPayload.sources || []).map((source) => source.id);
  summary.uploadedSourceTypes = (uploadPayload.sources || []).map((source) => source.fileType);
  summary.importedItemIds = (uploadPayload.importedItems || []).map((item) => item.id);
  summary.uploadWarnings = uploadPayload.warnings || [];

  const normalizedSource =
    (uploadPayload.sources || []).find((source) => source.metadata?.latexArtifactPath) ||
    (uploadPayload.sources || []).find((source) => source.metadata?.normalizedArtifactPath);
  const pdfSource = (uploadPayload.sources || []).find((source) => source.fileType === 'pdf');
  const docxSource = (uploadPayload.sources || []).find((source) => source.fileType === 'docx');
  const originalSource = (uploadPayload.sources || [])[0];
  if (originalSource) {
    summary.sourceDownloads = [
      await downloadSourceArtifact(originalSource.id, 'original'),
    ];
    if (normalizedSource) {
      summary.sourceDownloads.push(await downloadSourceArtifact(normalizedSource.id, 'normalized'));
      summary.sourceDownloads.push(await downloadSourceArtifact(normalizedSource.id, 'text'));
      if (normalizedSource.metadata?.latexArtifactPath) {
        summary.sourceDownloads.push(await downloadSourceArtifact(normalizedSource.id, 'latex'));
      }
    }
    if (pdfSource && pdfSource.id !== normalizedSource?.id) {
      summary.sourceDownloads.push(await downloadSourceArtifact(pdfSource.id, 'normalized'));
      summary.sourceDownloads.push(await downloadSourceArtifact(pdfSource.id, 'text'));
      if (pdfSource.metadata?.latexArtifactPath) {
        summary.sourceDownloads.push(await downloadSourceArtifact(pdfSource.id, 'latex'));
      }
    }
    if (docxSource && docxSource.id !== normalizedSource?.id && docxSource.id !== pdfSource?.id) {
      summary.sourceDownloads.push(await downloadSourceArtifact(docxSource.id, 'normalized'));
      summary.sourceDownloads.push(await downloadSourceArtifact(docxSource.id, 'text'));
      if (docxSource.metadata?.latexArtifactPath) {
        summary.sourceDownloads.push(await downloadSourceArtifact(docxSource.id, 'latex'));
      }
    }
  }

  const manualItemPayload = await createManualItem(projectId);
  summary.manualItemId = manualItemPayload.item.id;

  if (runLive) {
    const syncPayload = await createRun(projectId, manualItemPayload.item.id, 'sync');
    summary.syncRun = {
      runId: syncPayload.runId,
      status: syncPayload.run?.status,
      modelName: syncPayload.run?.modelName,
      artifactKinds: (syncPayload.artifacts || []).map((artifact) => artifact.kind),
    };

    const asyncPayload = await createRun(projectId, manualItemPayload.item.id, 'async');
    const asyncResult = await waitForAsyncRun(projectId, asyncPayload.runId);
    const asyncArtifacts = (asyncResult.snapshot.artifacts || []).filter((artifact) => artifact.benchmarkRunId === asyncPayload.runId);
    summary.asyncRun = {
      runId: asyncPayload.runId,
      status: asyncResult.run.status,
      modelName: asyncResult.run.modelName,
      artifactKinds: asyncArtifacts.map((artifact) => artifact.kind),
    };

    const downloads = [];
    for (const artifact of asyncArtifacts) {
      downloads.push(await downloadArtifact(artifact.id));
    }
    summary.downloads = downloads;
  }

  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
