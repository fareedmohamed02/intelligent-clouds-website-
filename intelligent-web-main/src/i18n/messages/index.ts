import { ar } from "./ar";
import { en, type Locale, type Messages } from "./en";

export type { Locale, Messages };
export { en, ar };

export const messagesByLocale: Record<Locale, Messages> = {
  en: en as Messages,
  ar: ar as Messages,
};

export const LOCALES: Locale[] = ["en", "ar"];

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "ar";
}
