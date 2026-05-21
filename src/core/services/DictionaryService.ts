import en from "../../locales/en.json";
import vi from "../../locales/vi.json";

export type Locale = "en" | "vi";

export interface WasteCategoryItem {
  name: string;
  label: string;
}

export interface GalleryItem {
  title: string;
  desc: string;
}

export interface Dictionary {
  hero: { redefine: string; value: string; waste: string; scroll: string };
  nav: { home: string; getRecycling: string; features: string; reality: string; downloads: string };
  auth: {
    login: string;
    signup: string;
    google: string;
    signingIn: string;
    creatingAccount: string;
    welcomeBack: string;
    join: string;
    email: string;
    password: string;
    noAccount: string;
    hasAccount: string;
    backHome: string;
  };
  downloadPage: {
    titlePrefix: string;
    titleHighlight: string;
    body: string;
    googlePlay: string;
    mirror: string;
    betaLabel: string;
    betaTitle: string;
    betaBody: string;
    betaButton: string;
  };
  treeMock: { recycled: string; treeLvl: string };
  features: {
    label: string;
    headline: string;
    edge: { title: string; body: string };
    carbon: { title: string; body: string };
    rewards: { title: string; body: string };
  };
  downloads: { ready: string; headline: string; subheadline: string; body: string; button: string };
  founder: {
    name: string;
    title: string;
    location: string;
    sectionLabel: string;
    quote: string;
    tagline: string;
  };
  reality: {
    stat1: string;
    stat1Label: string;
    stat1Sub: string;
    stat2: string;
    stat2Label: string;
    guideTitle: string;
    categories: WasteCategoryItem[];
    co2Title: string;
    countries: { vn: string; usa: string; eu: string };
    wasteStats: { recycled: string; landfill: string };
  };
  impact: {
    label: string;
    headline: string;
    headlineHighlight: string;
    subheadline: string;
    items: GalleryItem[];
  };
}

const LOCALE_STORAGE_KEY = "tichxanh_locale";
const SUPPORTED_LOCALES: Locale[] = ["en", "vi"];

function isSupportedLocale(value: unknown): value is Locale {
  return typeof value === "string" && (SUPPORTED_LOCALES as string[]).includes(value);
}

class DictionaryService {
  private static instance: DictionaryService;
  private currentLocale: Locale = "vi";
  private dictionaries: Record<Locale, Dictionary> = { en, vi };

  private constructor() {
    this.detectLocale();
  }

  /**
   * Priority: localStorage → navigator.language → "vi"
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

    // 2. Infer from browser language (default to 'vi' unless browser language is explicitly 'en')
    const browserLang = navigator.language.toLowerCase();
    this.currentLocale = browserLang.startsWith("en") ? "en" : "vi";
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
