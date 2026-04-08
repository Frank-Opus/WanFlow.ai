'use client';
import type { PlatformProjectBundle, PlatformSourceFile } from '@/lib/platform-types';
import type { BenchmarkOpsConsoleCopy, BenchmarkOpsViewIds } from '@dataflow/proofbench/lib/view-model';

type SourcesPanelProps = {
  locale: 'zh' | 'en';
  selectedBundle: PlatformProjectBundle | null;
  busyKey: string | null;
  ids: Pick<BenchmarkOpsViewIds, 'sourceUpload'>;
  fileInputRef: { current: HTMLInputElement | null };
  folderInputRef: { current: HTMLInputElement | null };
  copy: Pick<
    BenchmarkOpsConsoleCopy,
    | 'uploadFieldLabel'
    | 'uploadSource'
    | 'uploadFolder'
    | 'supportedFiles'
    | 'uploadHint'
    | 'importedCountLabel'
    | 'sourcePathLabel'
    | 'sourceOriginalLabel'
    | 'sourceNormalizedLabel'
    | 'sourceTextLabel'
    | 'sourceLatexLabel'
  >;
  onTriggerUpload: (kind: 'file' | 'folder') => void;
  onFilesSelected: (files: File[]) => void;
};

type SourceDownloadLink = {
  kind: 'original' | 'normalized' | 'text' | 'latex';
  label: string;
  href: string;
};

function sourceParseStatusLabel(locale: 'zh' | 'en', status: PlatformSourceFile['parseStatus']) {
  const map = {
    zh: {
      uploaded: '已上传',
      classifying: '分类中',
      extracting: '抽取中',
      normalized: '已标准化',
      itemized: '已生成题目',
      pending: '待处理',
      parsing: '解析中',
      parsed: '已解析',
      failed: '解析失败',
    },
    en: {
      uploaded: 'Uploaded',
      classifying: 'Classifying',
      extracting: 'Extracting',
      normalized: 'Normalized',
      itemized: 'Itemized',
      pending: 'Pending',
      parsing: 'Parsing',
      parsed: 'Parsed',
      failed: 'Failed',
    },
  };

  return map[locale][status];
}

function sourceStatusClass(status: PlatformSourceFile['parseStatus']) {
  if (status === 'itemized' || status === 'parsed') {
    return 'status-chip-success';
  }
  if (status === 'normalized') {
    return 'status-chip-info';
  }
  if (status === 'failed') {
    return 'status-chip-danger';
  }
  return 'status-chip-warning';
}

function buildSourceDownloadLinks(source: PlatformSourceFile, copy: SourcesPanelProps['copy']): SourceDownloadLink[] {
  const links: SourceDownloadLink[] = [
    {
      kind: 'original',
      label: copy.sourceOriginalLabel,
      href: `/api/platform/sources/download?sourceId=${source.id}&kind=original`,
    },
  ];

  if (source.metadata?.normalizedArtifactPath) {
    links.push({
      kind: 'normalized',
      label: copy.sourceNormalizedLabel,
      href: `/api/platform/sources/download?sourceId=${source.id}&kind=normalized`,
    });
  }
  if (source.metadata?.extractedTextPath) {
    links.push({
      kind: 'text',
      label: copy.sourceTextLabel,
      href: `/api/platform/sources/download?sourceId=${source.id}&kind=text`,
    });
  }
  if (source.metadata?.latexArtifactPath) {
    links.push({
      kind: 'latex',
      label: copy.sourceLatexLabel,
      href: `/api/platform/sources/download?sourceId=${source.id}&kind=latex`,
    });
  }

  return links;
}

export default function SourcesPanel({
  locale,
  selectedBundle,
  busyKey,
  ids,
  fileInputRef,
  folderInputRef,
  copy,
  onTriggerUpload,
  onFilesSelected,
}: SourcesPanelProps) {
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <div className="space-y-2">
          <div className="space-y-1">
            <label htmlFor={`${ids.sourceUpload}-button`} className="block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--mist)]">
              {copy.uploadFieldLabel}
            </label>
            <p className="text-xs leading-5 text-[var(--mist)]">{copy.supportedFiles}</p>
          </div>
          <input
            id={ids.sourceUpload}
            ref={fileInputRef}
            type="file"
            multiple
            className="sr-only"
            tabIndex={-1}
            onChange={(event) => {
              const files = Array.from(event.target.files ?? []);
              if (files.length > 0) {
                onFilesSelected(files);
              }
            }}
          />
          <button
            id={`${ids.sourceUpload}-button`}
            type="button"
            onClick={() => onTriggerUpload('file')}
            className="btn-secondary inline-flex rounded-[16px] px-5 py-3 text-sm font-semibold"
          >
            {busyKey === 'upload' ? '...' : copy.uploadSource}
          </button>
        </div>

        <div className="space-y-2">
          <div className="space-y-1">
            <label htmlFor={`${ids.sourceUpload}-folder-button`} className="block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--mist)]">
              {copy.uploadFolder}
            </label>
            <p className="text-xs leading-5 text-[var(--mist)]">{copy.supportedFiles}</p>
          </div>
          <input
            id={`${ids.sourceUpload}-folder`}
            ref={folderInputRef}
            type="file"
            multiple
            className="sr-only"
            tabIndex={-1}
            onChange={(event) => {
              const files = Array.from(event.target.files ?? []);
              if (files.length > 0) {
                onFilesSelected(files);
              }
            }}
          />
          <button
            id={`${ids.sourceUpload}-folder-button`}
            type="button"
            onClick={() => onTriggerUpload('folder')}
            className="btn-secondary inline-flex rounded-[16px] px-5 py-3 text-sm font-semibold"
          >
            {busyKey === 'upload' ? '...' : copy.uploadFolder}
          </button>
        </div>
      </div>

      <p className="text-sm text-[var(--mist)]">{copy.uploadHint}</p>

      <div className="surface-muted rounded-[24px] p-3">
        <div className="max-h-[28rem] space-y-3 overflow-y-auto pr-1">
          {(selectedBundle?.sourceFiles ?? []).length === 0 && (
            <div className="rounded-[26px] border border-dashed border-[rgba(25,40,72,0.14)] px-5 py-6 text-sm text-[var(--mist)]">
              {copy.supportedFiles}
            </div>
          )}
          {(selectedBundle?.sourceFiles ?? []).map((source) => (
            <div key={source.id} className="quiet-card rounded-[20px] px-5 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{source.fileName}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-xs uppercase tracking-[0.18em] text-[var(--mist)]">{source.fileType}</span>
                    <span className={['status-chip rounded-[12px] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em]', sourceStatusClass(source.parseStatus)].join(' ')}>
                      {sourceParseStatusLabel(locale, source.parseStatus)}
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-6 text-[var(--mist)]">
                    {copy.sourcePathLabel}: {source.metadata?.relativePath ?? source.fileName}
                  </p>
                  {source.metadata?.classifier ? <p className="text-xs leading-6 text-[var(--mist)]">classifier: {source.metadata.classifier}</p> : null}
                  {source.parseError ? <p className="status-danger text-xs leading-6">{source.parseError}</p> : null}
                </div>
                <div className="space-y-3 text-right">
                  <div className="text-xs text-[var(--mist)]">
                    {source.importedItemIds.length} {copy.importedCountLabel}
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    {buildSourceDownloadLinks(source, copy).map((link) => (
                      <a
                        key={`${source.id}-${link.kind}`}
                        href={link.href}
                        className="control-chip-sm rounded-[12px] px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em]"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
