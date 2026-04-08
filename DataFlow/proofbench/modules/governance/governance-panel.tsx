'use client';

import type { PlatformProjectBundle } from '@/lib/platform-types';
import type { BenchmarkOpsConsoleCopy, BenchmarkOpsSectionIntro } from '@dataflow/proofbench/lib/view-model';

type GovernancePanelProps = {
  locale: 'zh' | 'en';
  selectedBundle: PlatformProjectBundle | null;
  intro: BenchmarkOpsSectionIntro;
  copy: Pick<BenchmarkOpsConsoleCopy, 'members' | 'permissions' | 'genericExport' | 'enterpriseNotice'>;
};

function SectionIntro({ intro }: { intro: BenchmarkOpsSectionIntro }) {
  return (
    <div className={intro.align === 'compact' ? 'max-w-xl' : 'max-w-2xl'}>
      <p className="eyebrow">{intro.eyebrow}</p>
      <h2 className="mt-2 max-w-[20ch] text-xl font-semibold leading-snug text-ink sm:text-[1.65rem]">{intro.title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--mist)] sm:text-[0.96rem]">{intro.body}</p>
    </div>
  );
}

function roleLabel(locale: 'zh' | 'en', role: 'owner' | 'editor' | 'viewer' | 'runner') {
  const map = {
    zh: {
      owner: '负责人',
      editor: '编辑',
      viewer: '查看者',
      runner: '执行者',
    },
    en: {
      owner: 'Owner',
      editor: 'Editor',
      viewer: 'Viewer',
      runner: 'Runner',
    },
  };

  return map[locale][role];
}

export default function GovernancePanel({ locale, selectedBundle, intro, copy }: GovernancePanelProps) {
  return (
    <section className="panel rounded-[26px] p-6 sm:p-8">
      <SectionIntro intro={{ ...intro, align: intro.align ?? 'compact' }} />
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="quiet-card rounded-[20px] p-5">
          <p className="text-sm font-semibold text-ink">{copy.members}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(selectedBundle?.members ?? []).map((member) => (
              <span key={member.userId} className="control-chip-sm rounded-[12px] px-3 py-2 text-xs uppercase tracking-[0.16em]">
                {member.name} · {roleLabel(locale, member.role)}
              </span>
            ))}
          </div>
        </div>
        <div className="quiet-card rounded-[20px] p-5">
          <p className="text-sm font-semibold text-ink">{copy.permissions}</p>
          <p className="mt-3 text-sm leading-7 text-[var(--mist)]">
            {locale === 'zh' ? '负责人 / 编辑 / 查看者 / 执行者' : 'Owner / Editor / Viewer / Runner'}
          </p>
        </div>
        <div className="quiet-card rounded-[20px] p-5">
          <p className="text-sm font-semibold text-ink">{copy.genericExport}</p>
          <p className="mt-3 text-sm leading-7 text-[var(--mist)]">{copy.enterpriseNotice}</p>
        </div>
      </div>
    </section>
  );
}
