import cloudMigrationBg from "@/assets/solutions/cloud-migration.jpg";
import devopsTransformationBg from "@/assets/solutions/devops-transformation.jpg";
import securityBg from "@/assets/solutions/security.jpg";
import startupsBg from "@/assets/solutions/start-ups.jpg";
import enterprisesBg from "@/assets/solutions/enterprise.jpg";

/** Hero backgrounds keyed by solution slug. */
export const solutionBackgrounds: Record<string, string> = {
  "cloud-migration": cloudMigrationBg,
  "devops-transformation": devopsTransformationBg,
  "security-compliance": securityBg,
  startups: startupsBg,
  enterprises: enterprisesBg,
};

export function getSolutionBackground(slug: string | undefined): string | undefined {
  if (!slug) return undefined;
  return solutionBackgrounds[slug];
}
