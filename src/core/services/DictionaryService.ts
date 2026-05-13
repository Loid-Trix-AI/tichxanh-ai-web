import en from "../../locales/en.json";
import vi from "../../locales/vi.json";

export type Locale = "en" | "vi";
export type Dictionary = typeof en;

const LOCALE_STORAGE_KEY = "tichxanh_locale";
const SUPPORTED_LOCALES: Locale[] = ["en", "vi"];

function isSupportedLocale(value: unknown): value is Locale {
  return typeof value === "string" && (SUPPORTED_LOCALES as string[]).includes(value);
}

class DictionaryService {
  private static instance: DictionaryService;
  private currentLocale: Locale = "en";
  private dictionaries: Record<Locale, Dictionary> = { en, vi };

  private constructor() {
    this.detectLocale();
  }

  /**
   * Priority: localStorage → navigator.language → "en"
   * Persists user's explicit choice across reloads.
   */
  private detectLocale() {
    if (typeof window === "undefined") return;

    // 1. Respect previously saved choice
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isSupportedLocale(stored)) {
      this.currentLocale = stored;
      return;
    }

    // 2. Infer from browser language
    const browserLang = navigator.language.toLowerCase();
    this.currentLocale = browserLang.startsWith("vi") ? "vi" : "en";
  }

  public static getInstance(): DictionaryService {
    if (!DictionaryService.instance) {
      DictionaryService.instance = new DictionaryService();
    }
    return DictionaryService.instance;
  }

  /** Persist locale so it survives page reloads and SSR hydration. */
  public setLocale(locale: Locale) {
    this.currentLocale = locale;
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    }
  }

  public getLocale(): Locale {
    return this.currentLocale;
  }

  public t(): Dictionary {
    return this.dictionaries[this.currentLocale];
  }

  /** Returns the dictionary for a specific locale. Used by the hook to derive
   *  `t` from locale state so React re-renders propagate correctly. */
  public getDictionary(locale: Locale): Dictionary {
    return this.dictionaries[locale];
  }
}

export const dictionaryService = DictionaryService.getInstance();
