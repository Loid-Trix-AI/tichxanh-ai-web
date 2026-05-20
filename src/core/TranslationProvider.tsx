import React, { createContext, useCallback, useContext, useState } from "react";
import { dictionaryService, Locale, Dictionary } from "@/core/services/DictionaryService";

interface TranslationContextValue {
  t: Dictionary;
  locale: Locale;
  changeLanguage: (locale: Locale) => void;
}

const TranslationContext = createContext<TranslationContextValue | null>(null);

/**
 * Wraps the app at the root level so all consumers share a single locale state.
 * Any call to `changeLanguage` triggers a re-render in every `useTranslation` consumer.
 */
export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(dictionaryService.getLocale());
  const t = dictionaryService.getDictionary(locale);

  const changeLanguage = useCallback((newLocale: Locale) => {
    dictionaryService.setLocale(newLocale);
    setLocale(newLocale);
    window.location.reload();
  }, []);

  return (
    <TranslationContext.Provider value={{ t, locale, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTranslationContext(): TranslationContextValue {
  const ctx = useContext(TranslationContext);
  if (!ctx) {
    throw new Error("useTranslationContext must be used within a TranslationProvider");
  }
  return ctx;
}
