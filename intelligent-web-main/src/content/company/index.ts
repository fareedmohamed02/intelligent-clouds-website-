import type { Locale } from "@/i18n/messages";
import { mergeLocale } from "@/content/localize";
import { about, bookDemo, contact } from "./pages";
import { arCompanyOverlays } from "./ar";
import type { CompanyPageContent } from "./types";

const registry: Record<string, CompanyPageContent> = {
  about,
  contact,
  "book-demo": bookDemo,
};

export function getCompanyPage(
  slug: string | undefined,
  locale: Locale = "en",
): CompanyPageContent | undefined {
  if (!slug) return undefined;
  const base = registry[slug];
  if (!base) return undefined;
  return mergeLocale(base, arCompanyOverlays[slug], locale);
}

export { about, contact, bookDemo };
