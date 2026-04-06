export type NormalizedSectionBlock = {
  heading: string | null;
  bodyText: string;
  blockType: 'section' | 'problem' | 'solution' | 'table' | 'figure_note' | 'other';
};

export type NormalizedSourceDocument = {
  schemaVersion: 'v1';
  sourceFileId: string;
  projectId: string;
  sourceKind: 'json' | 'pdf' | 'docx' | 'txt' | 'md' | 'tex' | 'folder_bundle';
  title: string;
  language: 'zh' | 'en' | 'mixed' | 'unknown';
  plainText: string;
  latexSource: string | null;
  sectionBlocks: NormalizedSectionBlock[];
  sourceFiles: string[];
  diagnostics: {
    classifier: string;
    extractionMethod: string;
    warnings: string[];
  };
};
