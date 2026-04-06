# Source Intake Normalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build multi-file and folder-aware source intake that normalizes PDF/DOCX/TXT/MD/TEX inputs into a shared structure, extracts `ProblemItem` records, and keeps the current benchmark runtime working.

**Architecture:** The upload route will fan into a normalization service. Python remains responsible for file text extraction and base normalization, while the Next.js platform owns source metadata, orchestration, download routes, and UI state. Normalization outputs are stored on disk and referenced from `SourceFile.metadata`, then converted conservatively into `ProblemItem` records.

**Tech Stack:** Next.js App Router, TypeScript, Node Route Handlers, Python CLI, PyMuPDF, python-docx, node:test, pytest

---

## File Structure

- Create: `web/src/lib/source-types.ts`
  - normalized document types shared by route/UI helpers
- Create: `web/src/lib/source-ingestion.ts`
  - orchestration for per-file save, classify, normalize, and item extraction
- Create: `web/src/app/api/platform/sources/download/route.ts`
  - download original/normalized/text/latex source assets
- Modify: `web/src/lib/platform-types.ts`
  - richer `SourceParseStatus` and `PlatformSourceFile.metadata`
- Modify: `web/src/lib/platform-store.ts`
  - persist new source metadata safely
- Modify: `web/src/app/api/platform/projects/[projectId]/sources/route.ts`
  - multi-file intake and batch response
- Modify: `web/src/components/platform/platform-console.tsx`
  - multiple upload, folder upload, source status and source artifact links
- Modify: `web/scripts/platform-smoke-test.mjs`
  - validate multi-file normalization path
- Create: `tests/test_normalizer.py`
  - Python-side normalization coverage
- Modify: `src/math_eval_framework/cli.py`
  - add `normalize-source` subcommand
- Create: `src/math_eval_framework/normalizer.py`
  - file text extraction, classification, normalized document generation, basic LaTeX output

### Task 1: Python Normalization CLI

**Files:**
- Create: `src/math_eval_framework/normalizer.py`
- Modify: `src/math_eval_framework/cli.py`
- Test: `tests/test_normalizer.py`

- [ ] **Step 1: Write the failing test**

```python
from pathlib import Path

from math_eval_framework.normalizer import normalize_source_file


def test_normalize_markdown_source_generates_plain_text_and_latex(tmp_path: Path):
    source_path = tmp_path / "notes.md"
    source_path.write_text("# Algebra\n\nProblem 1\nSolve x+1=2.\nAnswer: 1\n", encoding="utf-8")

    result = normalize_source_file(
        source_path=source_path,
        project_id="project-1",
        source_file_id="source-1",
        original_file_name="notes.md",
    )

    assert result["sourceKind"] == "md"
    assert "Solve x+1=2" in result["plainText"]
    assert result["latexSource"]
    assert any(block["blockType"] == "problem" for block in result["sectionBlocks"])
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /home/wanguancheng/AProj/WanFlow/Data-Centric-transfer-20260404_163341/project/Data-Centric && python3 -m pytest tests/test_normalizer.py::test_normalize_markdown_source_generates_plain_text_and_latex -q`
Expected: FAIL because `math_eval_framework.normalizer` does not exist yet

- [ ] **Step 3: Write minimal implementation**

```python
def normalize_source_file(source_path, project_id, source_file_id, original_file_name):
    text = read_text_from_path(source_path)
    return {
        "schemaVersion": "v1",
        "projectId": project_id,
        "sourceFileId": source_file_id,
        "sourceKind": "md",
        "title": original_file_name,
        "language": "unknown",
        "plainText": text,
        "latexSource": build_basic_latex_document(text, original_file_name),
        "sectionBlocks": [{"heading": None, "bodyText": text, "blockType": "problem"}],
        "sourceFiles": [original_file_name],
        "diagnostics": {"classifier": "doc_like_text", "extractionMethod": "python_text", "warnings": []},
    }
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd /home/wanguancheng/AProj/WanFlow/Data-Centric-transfer-20260404_163341/project/Data-Centric && python3 -m pytest tests/test_normalizer.py::test_normalize_markdown_source_generates_plain_text_and_latex -q`
Expected: PASS

- [ ] **Step 5: Expand CLI coverage**

Add a second test for the CLI entrypoint:

```python
import json
import subprocess


def test_cli_normalize_source_writes_json(tmp_path: Path):
    source_path = tmp_path / "notes.txt"
    output_path = tmp_path / "normalized.json"
    source_path.write_text("Problem 1\nQuestion: 2+2=?\nAnswer: 4\n", encoding="utf-8")

    result = subprocess.run(
        [
            "python3",
            "-m",
            "math_eval_framework.cli",
            "normalize-source",
            "--input",
            str(source_path),
            "--project-id",
            "project-1",
            "--source-file-id",
            "source-1",
            "--original-file-name",
            "notes.txt",
            "--output-json",
            str(output_path),
        ],
        capture_output=True,
        text=True,
        check=False,
    )

    assert result.returncode == 0
    payload = json.loads(output_path.read_text(encoding="utf-8"))
    assert payload["sourceFileId"] == "source-1"
```

- [ ] **Step 6: Run Python test suite**

Run: `cd /home/wanguancheng/AProj/WanFlow/Data-Centric-transfer-20260404_163341/project/Data-Centric && python3 -m pytest tests -q`
Expected: PASS with the new normalization tests included

### Task 2: Web Source Metadata And Ingestion

**Files:**
- Create: `web/src/lib/source-types.ts`
- Create: `web/src/lib/source-ingestion.ts`
- Modify: `web/src/lib/platform-types.ts`
- Modify: `web/src/lib/platform-store.ts`
- Modify: `web/src/app/api/platform/projects/[projectId]/sources/route.ts`

- [ ] **Step 1: Write the failing node test**

Create a new Node test file:

```ts
import test from 'node:test';
import assert from 'node:assert/strict';
import { extractProblemDraftsFromNormalizedDocument } from '@/lib/source-ingestion';

test('extracts conservative problem drafts from normalized sections', () => {
  const items = extractProblemDraftsFromNormalizedDocument({
    schemaVersion: 'v1',
    sourceFileId: 'source-1',
    projectId: 'project-1',
    sourceKind: 'txt',
    title: 'Sample',
    language: 'en',
    plainText: 'Problem 1\\nQuestion: 2+2=?\\nAnswer: 4',
    latexSource: null,
    sourceFiles: ['sample.txt'],
    sectionBlocks: [
      { heading: 'Problem 1', bodyText: 'Question: 2+2=?\\nAnswer: 4', blockType: 'problem' },
    ],
    diagnostics: { classifier: 'doc_like_text', extractionMethod: 'python_text', warnings: [] },
  });

  assert.equal(items.length, 1);
  assert.match(items[0].prompt, /2\\+2/);
  assert.equal(items[0].answerKey, '4');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /home/wanguancheng/AProj/WanFlow/Data-Centric-transfer-20260404_163341/project/Data-Centric/web && node --test src/lib/source-ingestion.test.ts`
Expected: FAIL because the module does not exist yet

- [ ] **Step 3: Implement minimal source types and ingestion helpers**

Key code to add:

```ts
export type NormalizedSourceDocument = {
  schemaVersion: 'v1';
  sourceFileId: string;
  projectId: string;
  sourceKind: 'json' | 'pdf' | 'docx' | 'txt' | 'md' | 'tex' | 'folder_bundle';
  title: string;
  language: 'zh' | 'en' | 'mixed' | 'unknown';
  plainText: string;
  latexSource: string | null;
  sourceFiles: string[];
  sectionBlocks: Array<{ heading: string | null; bodyText: string; blockType: 'section' | 'problem' | 'solution' | 'table' | 'figure_note' | 'other' }>;
  diagnostics: { classifier: string; extractionMethod: string; warnings: string[] };
};
```

```ts
export function extractProblemDraftsFromNormalizedDocument(doc: NormalizedSourceDocument) {
  return doc.sectionBlocks
    .filter((block) => block.blockType === 'problem')
    .map((block, index) => {
      const answerMatch = block.bodyText.match(/Answer\\s*[:：]\\s*(.+)$/im);
      return {
        title: block.heading || `${doc.title} / Problem ${index + 1}`,
        prompt: block.bodyText.replace(/Answer\\s*[:：].+$/im, '').trim(),
        answerKey: answerMatch?.[1]?.trim() || '',
      };
    })
    .filter((item) => item.prompt && item.answerKey);
}
```

- [ ] **Step 4: Extend source metadata and route behavior**

Update the route to:
- read `formData.getAll('file')`
- support repeated uploads
- keep `relativePath`
- call normalization for non-JSON sources
- persist metadata paths for `normalized`, `text`, and `latex` outputs

- [ ] **Step 5: Run node test**

Run: `cd /home/wanguancheng/AProj/WanFlow/Data-Centric-transfer-20260404_163341/project/Data-Centric/web && node --test src/lib/source-ingestion.test.ts`
Expected: PASS

- [ ] **Step 6: Run build**

Run: `cd /home/wanguancheng/AProj/WanFlow/Data-Centric-transfer-20260404_163341/project/Data-Centric/web && npm run build`
Expected: PASS

### Task 3: Source Asset Download And Platform UI

**Files:**
- Create: `web/src/app/api/platform/sources/download/route.ts`
- Modify: `web/src/components/platform/platform-console.tsx`
- Modify: `web/scripts/platform-smoke-test.mjs`

- [ ] **Step 1: Write the failing smoke assertion**

Add smoke expectations for:
- multi-file upload response contains multiple sources
- normalized asset download works for a text source

- [ ] **Step 2: Run smoke to verify it fails**

Run: `cd /home/wanguancheng/AProj/WanFlow/Data-Centric-transfer-20260404_163341/project/Data-Centric/web && PLATFORM_SMOKE_BASE_URL=http://127.0.0.1:3010 npm run smoke:platform`
Expected: FAIL because normalization asset download is not exposed yet

- [ ] **Step 3: Implement source download route and console controls**

Route behavior:
- query by `sourceId` and `kind=original|normalized|text|latex`
- stream the correct file from `SourceFile.metadata`

Console behavior:
- add two upload controls:
  - multi-file upload
  - folder upload
- set `webkitdirectory` on the folder input
- show relative path, parse state, and source artifact buttons

- [ ] **Step 4: Run build**

Run: `cd /home/wanguancheng/AProj/WanFlow/Data-Centric-transfer-20260404_163341/project/Data-Centric/web && npm run build`
Expected: PASS

- [ ] **Step 5: Run smoke**

Run: `cd /home/wanguancheng/AProj/WanFlow/Data-Centric-transfer-20260404_163341/project/Data-Centric/web && PLATFORM_SMOKE_BASE_URL=http://127.0.0.1:3010 npm run smoke:platform`
Expected: PASS including multi-file normalization coverage

## Self-Review

- Spec coverage:
  - multi-file upload covered in Task 2 and Task 3
  - folder upload UI covered in Task 3
  - normalization pipeline covered in Task 1 and Task 2
  - LaTeX artifact generation covered in Task 1 and Task 2
  - item extraction covered in Task 2
- Placeholder scan:
  - no `TBD`, `TODO`, or undefined implementation steps remain
- Type consistency:
  - `NormalizedSourceDocument` name and fields are consistent across tasks
