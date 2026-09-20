import type { Locale } from "@/i18n/messages";
import { mergeLocale } from "@/content/localize";
import { documentation, faq, privacy, support, terms } from "./pages";
import { arResourceOverlays } from "./ar";
import type { ResourcePageContent } from "./types";

const registry: Record<string, ResourcePageContent> = {
  documentation,
  faq,
  support,
  privacy,
  terms,
};

/** Documentation stays English; faq/support/privacy/terms merge Arabic overlays. */
export function getResourcePage(
  slug: string | undefined,
  locale: Locale = "en",
): ResourcePageContent | undefined {
  if (!slug) return undefined;
  const base = registry[slug];
  if (!base) return undefined;
  if (slug === "documentation") return base;
  return mergeLocale(base, arResourceOverlays[slug], locale);
}

export { documentation, faq, support, privacy, terms };
