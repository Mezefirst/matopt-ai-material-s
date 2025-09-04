import React, { createContext, useContext, ReactNode } from 'react';
import { useKV } from '@github/spark/hooks';
import { translations, Translation, Language } from './translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguage] = useKV<Language>('app-language', 'en');

  const safeLanguage = language || 'en';
  const t = translations[safeLanguage] || translations.en;

  return (
    <I18nContext.Provider value={{ language: safeLanguage, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

export type { Language, Translation };
















