'use client';

import { useState } from 'react';
import AnswerInspector from '@/components/proofbench/answer-inspector';
import ConfigPanel from '@/components/proofbench/config-panel';
import ExportPanel from '@/components/proofbench/export-panel';
import RunMatrix from '@/components/proofbench/run-matrix';
import SummaryCards from '@/components/proofbench/summary-cards';
import ValidationRail from '@/components/proofbench/validation-rail';
import { useCopy } from '@/components/shared/locale-provider';
import {
  defaultRunConfig,
  productStats,
  seededArtifact,
  siteMeta,
  type ProofBenchRequestConfig,
  type ProofBenchRunResponse,
} from '@/lib/proofbench';

export default function ProofBenchWorkbench() {
  const text = useCopy();
  const [artifact, setArtifact] = useState(seededArtifact);
  const [config, setConfig] = useState<ProofBenchRequestConfig>(defaultRunConfig);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [diagnostics, setDiagnostics] = useState<ProofBenchRunResponse['diagnostics'] | null>(null);

  function onConfigChange<K extends keyof ProofBenchRequestConfig>(key: K, value: ProofBenchRequestConfig[K]) {
    setConfig((current) => ({ ...current, [key]: value }));
  }

  async function runBenchmark() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/proofbench/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      const payload = (await response.json()) as Partial<ProofBenchRunResponse> & { error?: string };
      if (!response.ok || !payload.artifact) {
        setDiagnostics(payload.diagnostics ?? null);
        throw new Error(payload.error ?? text.workbench.noArtifactError);
      }

      setArtifact(payload.artifact);
      setDiagnostics(payload.diagnostics ?? null);
    } catch (runError) {
      setError(runError instanceof Error ? runError.message : text.workbench.unknownRunError);
    } finally {
      setLoading(false);
    }
  }

  function resetPreview() {
    setArtifact(seededArtifact);
    setConfig(defaultRunConfig);
    setDiagnostics(null);
    setError(null);
  }

  return (
    <div className="space-y-6">
      <ConfigPanel
        siteMeta={siteMeta}
        artifact={artifact}
        config={config}
        loading={loading}
        error={error}
        diagnostics={diagnostics}
        onConfigChange={onConfigChange}
        onRun={runBenchmark}
        onReset={resetPreview}
      />

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-6">
          <SummaryCards artifact={artifact} productStats={productStats} />
          <RunMatrix runs={artifact.runs} />
          <AnswerInspector item={artifact.item} runs={artifact.runs} />
          <ExportPanel artifact={artifact} />
        </div>

        <div className="space-y-6">
          <ValidationRail validationResults={artifact.validationResults} item={artifact.item} />

          <section className="panel rounded-[32px] p-6 sm:p-8">
            <p className="eyebrow">{text.workbench.itemSchemaEyebrow}</p>
            <h3 className="mt-2 text-3xl font-semibold text-ink">{text.workbench.itemSchemaTitle}</h3>
            <div className="mt-6 rounded-[26px] border border-[rgba(23,18,15,0.08)] bg-[rgba(255,252,247,0.72)] p-5">
              <p className="text-sm font-semibold text-ink">{artifact.item.title}</p>
              <p className="mt-2 text-[0.68rem] uppercase tracking-[0.24em] text-[var(--mist)]">{text.workbench.itemSchemaLabel}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--mist)]">{artifact.item.question}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {artifact.item.keyPoints.map((point) => (
                  <span
                    key={point}
                    className="rounded-full border border-[rgba(23,18,15,0.08)] bg-[rgba(255,252,247,0.7)] px-3 py-1 text-xs text-[var(--mist)]"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
