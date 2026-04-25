'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/components/shared/locale-provider';
import { getMarketingRouteMeta, normalizeMarketingRoute } from '@/lib/marketing-metadata';

export default function MarketingHeadSync() {
  const pathname = usePathname();
  const { locale } = useLocale();

  useEffect(() => {
    const routeKey = normalizeMarketingRoute(pathname);

    if (!routeKey) {
      return;
    }

    const meta = getMarketingRouteMeta(routeKey, locale);
    document.title = meta.title;

    const selectors = [
      ['meta[name="description"]', meta.description],
      ['meta[property="og:title"]', meta.title],
      ['meta[property="og:description"]', meta.description],
      ['meta[name="twitter:title"]', meta.title],
      ['meta[name="twitter:description"]', meta.description],
    ] as const;

    for (const [selector, content] of selectors) {
      const element = document.head.querySelector(selector);
      if (element) {
        element.setAttribute('content', content);
      }
    }
  }, [locale, pathname]);

  return null;
}
