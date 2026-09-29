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

export interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('np_lang');
        if (saved && (saved === 'hi' || saved === 'en' || saved === 'mr' || saved === 'gu')) {
          return saved as Language;
        }
      } catch {
        // ignore
      }
    }
    return 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('np_lang', newLang);
      } catch {
        // ignore
      }
      document.documentElement.lang = newLang;
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
