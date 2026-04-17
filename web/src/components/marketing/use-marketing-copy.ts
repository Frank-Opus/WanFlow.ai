'use client';

import { useLocale } from '@/components/shared/locale-provider';
import { getMarketingCopy } from '@/lib/marketing';

export function useMarketingCopy() {
  const { locale } = useLocale();
  return getMarketingCopy(locale);
}
