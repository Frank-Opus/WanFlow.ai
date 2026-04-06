'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { copy, defaultLocale, localeStorageKey, type Locale } from '@/lib/i18n';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const saved = window.localStorage.getItem(localeStorageKey);
    if (saved === 'zh' || saved === 'en') {
      setLocaleState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
    window.localStorage.setItem(localeStorageKey, locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale: (nextLocale: Locale) => setLocaleState(nextLocale),
    }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used inside LocaleProvider.');
  }
  return context;
}

export function useCopy() {
  const { locale } = useLocale();
  return copy[locale];
}
