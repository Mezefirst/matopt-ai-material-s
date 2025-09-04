import React, { createContext, useContext, ReactNode } from 'react';
import { useKV } from '@github/spark/hooks';
import { translations, Translation } from './translations';

interface I18nContextType {

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
e

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguage] = useKV<Language>('app-language', 'en');

  const safeLanguage = language || 'en';
  const t = translations[safeLanguage] || translations.en;

  return c
    <I18nContext.Provider value={{ language: safeLanguage, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
}
}

export function useI18n() {

















