import React, { createContext, useContext, useEffect, useState } from 'react';
import { en } from './en';
import { hi } from './hi';
import { mr } from './mr';
import { gu } from './gu';
import { Language, LanguageOption, LANGUAGES, Translations } from './types';

export * from './types';

export const translations: Record<Language, Translations> = {
  hi,
  en,
  mr,
  gu,
};

export function getLanguageFromPath(pathname: string): Language {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/hi' || clean.startsWith('/hi/')) return 'hi';
  if (clean === '/mr' || clean.startsWith('/mr/')) return 'mr';
  if (clean === '/gu' || clean.startsWith('/gu/')) return 'gu';
  return 'en';
}

export function stripLanguagePrefix(pathname: string): string {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/hi' || clean === '/mr' || clean === '/gu') return '/';
  if (clean.startsWith('/hi/')) return clean.slice(3) + '/';
  if (clean.startsWith('/mr/')) return clean.slice(3) + '/';
  if (clean.startsWith('/gu/')) return clean.slice(3) + '/';
  return pathname.endsWith('/') ? pathname : pathname + '/';
}

export function buildLocalizedPath(pathname: string, targetLang: Language): string {
  if (!pathname) return targetLang === 'en' ? '/' : `/${targetLang}/`;

  // Preserve anchor/hash if present
  let [pathOnly, hash] = pathname.split('#');
  hash = hash ? `#${hash}` : '';

  // Preserve query if present
  let [baseOnly, query] = pathOnly.split('?');
  query = query ? `?${query}` : '';

  let clean = stripLanguagePrefix(baseOnly);
  if (!clean.startsWith('/')) clean = '/' + clean;
  if (!clean.endsWith('/')) clean = clean + '/';

  if (targetLang === 'en') {
    return `${clean}${query}${hash}`;
  }
  const prefix = `/${targetLang}`;
  const localized = clean === '/' ? `${prefix}/` : `${prefix}${clean}`;
  return `${localized}${query}${hash}`;
}

export interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return getLanguageFromPath(window.location.pathname);
    }
    return 'en';
  });

  // Keep lang in sync when popstate (browser back/forward or route switch) fires
  useEffect(() => {
    const handlePopState = () => {
      const detected = getLanguageFromPath(window.location.pathname);
      setLangState(detected);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('np_lang', newLang);
      } catch {
        // ignore
      }
      document.documentElement.lang = newLang;
      const currentPath = window.location.pathname;
      const currentHash = window.location.hash || '';
      const currentSearch = window.location.search || '';
      const newPath = buildLocalizedPath(currentPath + currentSearch + currentHash, newLang);
      if (currentPath !== newPath.split('#')[0].split('?')[0]) {
        window.history.pushState({}, '', newPath);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const value = {
    lang,
    setLang,
    t: translations[lang] || translations.en,
  };

  return React.createElement(LanguageContext.Provider, { value }, children);
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
