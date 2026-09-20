import type { Locale } from "@/i18n/messages";
import { mergeLocale } from "@/content/localize";
import type { ServicePageContent } from "./types";
import { arServiceOverlays } from "./ar";
import { ai } from "./ai";
import { analytics } from "./analytics";
import { cloudComputing } from "./cloud-computing";
import { database } from "./database";
import { disasterRecovery } from "./disaster-recovery";
import { integration } from "./integration";
import { networking } from "./networking";
import { storage } from "./storage";

const registry: Record<string, ServicePageContent> = {
  [cloudComputing.slug]: cloudComputing,
  [storage.slug]: storage,
  [networking.slug]: networking,
  [database.slug]: database,
  [analytics.slug]: analytics,
  [ai.slug]: ai,
  [integration.slug]: integration,
  [disasterRecovery.slug]: disasterRecovery,
};

export function getServicePage(
  slug: string | undefined,
  locale: Locale = "en",
): ServicePageContent | undefined {
  if (!slug) return undefined;
  const base = registry[slug];
  if (!base) return undefined;
  return mergeLocale(base, arServiceOverlays[slug], locale);
}

export function listServicePages(locale: Locale = "en"): ServicePageContent[] {
  return Object.keys(registry).map((slug) => getServicePage(slug, locale)!);
}

export { registry as servicePageRegistry };
