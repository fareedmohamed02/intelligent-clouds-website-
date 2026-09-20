import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  en,
  isLocale,
  messagesByLocale,
  type Locale,
  type Messages,
} from "./messages";

const STORAGE_KEY = "ic-locale";

type I18nValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Messages;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nValue | null>(null);

function dirForLocale(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const candidates = [
    navigator.language,
    ...(navigator.languages ?? []),
  ]
    .filter(Boolean)
    .map((l) => l.toLowerCase());
  return candidates.some((l) => l === "ar" || l.startsWith("ar-")) ? "ar" : "en";
}

function readStoredLocale(): Locale | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw && isLocale(raw)) return raw;
  } catch {
    /* ignore */
  }
  return null;
}

function resolveInitialLocale(fallback: Locale): Locale {
  return readStoredLocale() ?? detectBrowserLocale() ?? fallback;
}

export function LocaleProvider({
  children,
  initialLocale = "en",
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    resolveInitialLocale(initialLocale),
  );
  const dir = dirForLocale(locale);
  const t = messagesByLocale[locale] ?? en;

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      dir,
      t,
      setLocale,
    }),
    [locale, dir, t, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LocaleProvider");
  return ctx;
}
