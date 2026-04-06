# Multi-Source Intake And Normalization Design

**Date:** 2026-04-04

**Scope:** Extend the enterprise evaluation platform so it can accept folder-based and multi-file uploads, normalize heterogeneous documents into a unified intermediate representation, produce LaTeX when appropriate, and extract benchmark-ready `ProblemItem` records without regressing the existing Python evaluation engine.

## Goals

- Keep the product as a Chinese-first enterprise evaluation platform, not a single-problem demo.
- Preserve the locked core objects:
  - `Project`
  - `SourceFile`
  - `ProblemItem`
  - `BenchmarkRun`
  - `Artifact`
- Accept broader source types:
  - PDF
  - DOCX
  - JSON
  - TXT / Markdown / TeX
  - folder uploads containing mixed files
- Normalize all non-JSON sources into one internal document shape before item extraction.
- Support generating LaTeX artifacts for handwritten math notes and document-like inputs, so downstream evaluation operates on a consistent structure.
- Keep the Python evaluation engine as the execution backend.

## Non-Goals

- Do not replace the Python evaluator with a browser-side or Node-side evaluator.
- Do not introduce a new top-level domain object beyond the locked five objects.
- Do not attempt a full OCR/agentic document understanding platform in one step.
- Do not depend on interactive desktop tooling such as CodexBar for platform runtime.

## Current State

### Source Intake

Current upload entrypoint:
- `web/src/app/api/platform/projects/[projectId]/sources/route.ts`

Current behavior:
- Accepts a single uploaded file.
- Persists file into project uploads directory.
- Creates a `SourceFile` row.
- If the file is JSON, directly creates one `ProblemItem`.
- If the file is PDF/DOCX/TXT/MD, marks it pending but does not normalize or extract items.

### Existing Text Extraction

Current utility:
- `src/math_eval_framework/utils.py`

Current behavior:
- Reads `.txt`, `.md`, `.tex`, `.json` as text.
- Reads `.pdf` using `PyMuPDF`.
- Reads `.docx` using `python-docx`.
- This is useful but is not connected to source ingestion workflow or stored normalization artifacts.

## Proposed Architecture

The ingestion pipeline should be split into four explicit layers.

### 1. Upload Layer

Frontend:
- Extend the platform console upload area to support:
  - multiple file upload
  - folder upload via directory selection
  - preserving relative paths when browser provides them

Backend:
- The source upload route will accept:
  - one file
  - multiple files under the same request
  - optional client-provided relative path metadata

Output:
- one `SourceFile` per uploaded file
- initial parse state stored immediately

### 2. Classification Layer

Each uploaded file is classified into one of:
- `json`
- `latex_source`
- `doc_like_text`
- `pdf_printed`
- `pdf_handwritten_math`
- `other`

This classification does not create new top-level objects.
It enriches `SourceFile` metadata and determines which normalization branch to run.

### 3. Normalization Layer

All non-JSON inputs are normalized into a shared internal representation named `NormalizedSourceDocument`.

Proposed internal shape:

```ts
type NormalizedSourceDocument = {
  schemaVersion: 'v1';
  sourceFileId: string;
  projectId: string;
  sourceKind: 'json' | 'pdf' | 'docx' | 'txt' | 'md' | 'tex' | 'folder_bundle';
  title: string;
  language: 'zh' | 'en' | 'mixed' | 'unknown';
  plainText: string;
  latexSource: string | null;
  sectionBlocks: Array<{
    heading: string | null;
    bodyText: string;
    blockType: 'section' | 'problem' | 'solution' | 'table' | 'figure_note' | 'other';
  }>;
  sourceFiles: string[];
  diagnostics: {
    classifier: string;
    extractionMethod: string;
    warnings: string[];
  };
};
```

This document is not a new top-level domain model.
It should be stored as an artifact or normalization file under existing project artifact storage.

### 4. Item Extraction Layer

Once normalized, a second pass extracts `ProblemItem` records.

Rules:
- JSON sources may still create items directly when valid.
- PDF/DOCX/TXT/MD/TEX sources create items only after normalization.
- Extraction should support:
  - single-problem documents
  - multi-problem notes
  - mixed notes where only some sections are itemizable

The extracted item set is then stored as standard `ProblemItem` records linked back to `SourceFile`.

## LaTeX Capability Strategy

We will incorporate two installed skills differently.

### `handwriting-to-latex`

Installed at:
- `~/.codex/skills/handwriting-to-latex`

Use it as:
- a conversion policy and prompt pattern library for handwritten math/scanned note inputs

Good fit:
- scanned handwritten math
- iPad handwritten PDFs
- step-by-step derivations

Not used as:
- the primary production backend

Reason:
- it has strong rules but no reusable scripts, validators, or conversion pipeline.

### `latex-document`

Installed at:
- `~/.codex/skills/latex-document`

Use it as:
- the operational backbone for document normalization and LaTeX generation

Good fit:
- `pdf_to_images.sh`
- `convert_document.sh`
- `validate_latex.py`
- profile-driven PDF-to-LaTeX conversion

Adoption rule:
- reuse the logic and scripts selectively
- do not copy the entire skill wholesale into runtime without trimming auto-install side effects

## File And API Design

### Frontend

Primary file:
- `web/src/components/platform/platform-console.tsx`

Planned changes:
- support `multiple`
- support folder upload control
- show upload queue grouped by file and relative path
- show per-source normalization state
- show derived artifacts such as:
  - normalized JSON
  - generated `.tex`
  - extracted text preview
  - extracted item count

### API

Primary file:
- `web/src/app/api/platform/projects/[projectId]/sources/route.ts`

Planned behavior:
- accept `FormData` with repeated `file` entries
- optionally accept `relativePath[]`
- create multiple `SourceFile` entries in one request
- trigger normalization pipeline per file
- return batch response:

```json
{
  "sources": [],
  "normalizedArtifacts": [],
  "importedItems": [],
  "warnings": []
}
```

### Platform Types

Primary file:
- `web/src/lib/platform-types.ts`

Planned changes:
- expand `SourceParseStatus`
- add richer source metadata to `PlatformSourceFile`

Recommended status progression:
- `uploaded`
- `classifying`
- `extracting`
- `normalized`
- `itemized`
- `failed`

Recommended `PlatformSourceFile` metadata extension:

```ts
metadata?: {
  relativePath?: string | null;
  classifier?: string | null;
  normalizedArtifactPath?: string | null;
  latexArtifactPath?: string | null;
  extractedTextPath?: string | null;
}
```

### Backend Normalization Modules

New modules should be added under `web/src/lib/` and `src/math_eval_framework/`.

Suggested split:
- `web/src/lib/source-ingestion.ts`
  - orchestration entrypoint
- `web/src/lib/source-classifier.ts`
  - choose normalization branch
- `web/src/lib/source-normalizer.ts`
  - convert raw file to `NormalizedSourceDocument`
- `web/src/lib/source-item-extractor.ts`
  - derive `ProblemItem[]`
- `src/math_eval_framework/normalize.py`
  - Python-side document extraction helpers

## Input Handling Strategy

### JSON

Fast path:
- validate keys
- normalize field names
- create `ProblemItem`
- optionally emit normalized JSON artifact

### PDF

Two branches:

1. Printed or machine-readable PDF
- extract text directly
- optionally split into page images for fallback
- generate `plainText`
- generate `latexSource` only when useful

2. Handwritten or math-heavy PDF
- render pages to images
- use profile-driven PDF-to-LaTeX workflow
- preserve uncertain passages in diagnostics
- emit `.tex` artifact plus normalized JSON

### DOCX / Markdown / TXT / TEX

- DOCX and Markdown should pass through text extraction and optional Pandoc conversion to LaTeX
- `.tex` should be treated as already-normalized author source with extraction on top
- plain text should become normalized section blocks with lightweight heuristics

### Folder Uploads

Folder uploads should preserve relative path hierarchy.

Example:
- `chapter1/notes.pdf`
- `chapter1/figures/graph.png`
- `chapter2/questions.docx`

The platform should:
- store each file separately as `SourceFile`
- keep `relativePath`
- allow future bundle-level normalization

For v1 of this design, only document-like files participate in normalization.
Auxiliary images remain attached to the source bundle but are not yet used in evaluation unless referenced later.

## Artifact Strategy

Do not introduce new core objects.
Use `Artifact` for generated outputs.

New artifact kinds to support over time:
- `normalized_result`
- `preview`
- `raw_log`

Expected outputs per source:
- normalized JSON artifact
- extracted text artifact
- generated LaTeX artifact when applicable
- diagnostic log artifact if normalization fails or needs review

## UI Requirements

The intake experience should look like an enterprise batch workflow, not a single upload button.

Required UI capabilities:
- select files
- select folder
- show file count and relative paths
- show type badge
- show parse/normalization status
- show imported item count
- open/download normalized artifact

Important UX constraint:
- retain the existing enterprise console language and bilingual support
- do not regress the current project/workbench/results flow

## Validation And Testing

Required validation levels:

1. Build validation
- `cd web && npm run build`

2. Python tests
- `python3 -m pytest tests -q`

3. Source intake smoke validation on port `3010`
- upload JSON
- upload PDF
- upload DOCX
- folder or multi-file upload
- verify `SourceFile` state transitions
- verify normalized artifact generation
- verify `ProblemItem` extraction
- run sync and async benchmark on extracted item

4. Negative validation
- unsupported file types
- empty files
- malformed JSON
- PDF extraction failure
- handwritten conversion uncertainty

## Risks

### 1. Over-scoping OCR

Risk:
- trying to solve full OCR, handwriting recognition, structural parsing, and benchmark extraction in one pass

Mitigation:
- stage the work
- first unify intake and normalization contracts
- then add handwritten/PDF-specific improvements

### 2. Runtime dependency sprawl

Risk:
- `latex-document` scripts may auto-install packages at runtime

Mitigation:
- vendor only the scripts and logic we need
- make runtime dependencies explicit in project docs and bootstrap scripts

### 3. False item extraction

Risk:
- notes converted to text may create bad `ProblemItem` records

Mitigation:
- keep extraction conservative
- attach diagnostics
- allow “normalized but not itemized” state

## Recommended Delivery Order

### Phase 1

- multiple file upload
- folder upload
- richer `SourceFile` metadata
- parse status lifecycle

### Phase 2

- normalization pipeline for PDF/DOCX/TXT/MD/TEX
- generated artifacts for normalized JSON and extracted text

### Phase 3

- handwritten math / scanned PDF to LaTeX branch
- profile-based conversion using installed LaTeX skill logic

### Phase 4

- item extraction from normalized documents
- full evaluation loop on extracted items

## Decision Summary

- `latex-document` is the main enhancement source for this project.
- `handwriting-to-latex` is a narrow but valuable rule layer for handwritten math conversion.
- `codexbar` is unrelated to source normalization and remains optional developer tooling, not product runtime.
- We will extend `SourceFile` and `Artifact` rather than inventing new top-level entities.
- The end state is:
  - multi-source upload
  - folder-aware intake
  - normalization to a shared intermediate document
  - optional LaTeX generation
  - extraction to `ProblemItem`
  - unchanged benchmark execution core
