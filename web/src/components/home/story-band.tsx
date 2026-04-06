'use client';

import { useCopy } from '@/components/shared/locale-provider';

export function StoryBand() {
  const text = useCopy();

  return (
    <section className="relative overflow-hidden rounded-[36px] border border-[rgba(23,18,15,0.08)] bg-[linear-gradient(135deg,rgba(255,252,247,0.92),rgba(245,236,225,0.82))] px-6 py-8 shadow-cloud sm:px-8 sm:py-10">
      <div className="liquid-orb right-8 top-0 h-24 w-24 bg-[rgba(184,137,24,0.18)]" />
      <div className="max-w-3xl">
        <p className="eyebrow">{text.home.storyEyebrow}</p>
        <h2 className="display-face mt-3 text-4xl text-ink sm:text-5xl">{text.home.storyTitle}</h2>
        <p className="mt-4 text-base leading-8 text-[var(--mist)] sm:text-lg">{text.home.storyBody}</p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-4">
        {text.home.phases.map((phase) => (
          <article key={phase.step} className="rounded-[26px] border border-[rgba(23,18,15,0.08)] bg-[rgba(255,252,247,0.72)] p-5 backdrop-blur-sm transition hover:-translate-y-1">
            <p className="mono-face text-xs text-[var(--brass)]">{phase.step}</p>
            <h3 className="mt-5 text-xl font-semibold text-ink">{phase.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--mist)]">{phase.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
