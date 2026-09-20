import type { Locale } from "@/i18n/messages";
import { mergeLocale } from "@/content/localize";
import type { SolutionPageContent } from "./types";
import { arSolutionOverlays } from "./ar";
import { cloudMigration } from "./cloud-migration";
import { devopsTransformation } from "./devops-transformation";
import { enterprises } from "./enterprises";
import { securityCompliance } from "./security-compliance";
import { startups } from "./startups";

const registry: Record<string, SolutionPageContent> = {
  [cloudMigration.slug]: cloudMigration,
  [devopsTransformation.slug]: devopsTransformation,
  [securityCompliance.slug]: securityCompliance,
  [startups.slug]: startups,
  [enterprises.slug]: enterprises,
};

export function getSolutionPage(
  slug: string | undefined,
  locale: Locale = "en",
): SolutionPageContent | undefined {
  if (!slug) return undefined;
  const base = registry[slug];
  if (!base) return undefined;
  return mergeLocale(base, arSolutionOverlays[slug], locale);
}

export function listSolutionPages(locale: Locale = "en"): SolutionPageContent[] {
  return Object.keys(registry).map((slug) => getSolutionPage(slug, locale)!);
}

export { registry as solutionPageRegistry };
