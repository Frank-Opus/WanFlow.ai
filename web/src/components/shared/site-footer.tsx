'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCopy } from '@/components/shared/locale-provider';
import { siteMeta } from '@/lib/proofbench';

export default function SiteFooter() {
  const text = useCopy();

  return (
    <footer className="mt-14 border-t border-[rgba(25,40,72,0.1)] bg-[rgba(248,250,253,0.96)]">
      <div className="w-full px-5 py-8 lg:px-8 lg:py-10 xl:px-10">
        <div className="grid gap-8 border-b border-[rgba(25,40,72,0.08)] pb-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--mist)]">Enterprise release</p>
            <Link href="/" className="focus-ring inline-flex items-center rounded-[18px] border border-[rgba(25,40,72,0.08)] bg-[rgba(255,255,255,0.98)] px-3 py-2">
              <Image
                src="/brand/logo-wide.png"
                alt={`${siteMeta.brand} ${siteMeta.moduleName}`}
                width={220}
                height={75}
                className="h-auto w-[168px] sm:w-[200px]"
                priority={false}
              />
            </Link>
            <p className="max-w-3xl text-sm leading-7 text-[var(--mist)]">{text.home.footerBody}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="border-l border-[rgba(25,40,72,0.08)] pl-4">
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--mist)]">Module</p>
              <p className="mt-2 text-sm leading-7 text-ink">{text.home.footerPrimary}</p>
            </div>
            <div className="border-l border-[rgba(25,40,72,0.08)] pl-4">
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--mist)]">Stack</p>
              <p className="mt-2 text-sm leading-7 text-ink">{text.home.footerSecondary}</p>
            </div>
            <div className="border-l border-[rgba(25,40,72,0.08)] pl-4">
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--mist)]">Positioning</p>
              <p className="mt-2 text-sm leading-7 text-ink">{siteMeta.tagline}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-4 text-sm text-[var(--mist)] sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 WanFlow.ai. All rights reserved.</p>
          <p>{siteMeta.moduleName} · Enterprise Evaluation Workspace</p>
        </div>
      </div>
    </footer>
  );
}
