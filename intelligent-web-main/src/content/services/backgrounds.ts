import cloudComputingBg from "@/assets/services/cloud-computing.jpg";
import storageBg from "@/assets/services/storage.jpg";
import databaseBg from "@/assets/services/database.jpg";
import analyticsBg from "@/assets/services/analytics.jpg";
import aiBg from "@/assets/services/artificial-intelligence.jpg";
import integrationBg from "@/assets/services/integration.jpg";
import disasterBg from "@/assets/services/disaster.jpg";

/** Hero backgrounds keyed by service slug. */
export const serviceBackgrounds: Record<string, string> = {
  "cloud-computing": cloudComputingBg,
  storage: storageBg,
  database: databaseBg,
  analytics: analyticsBg,
  ai: aiBg,
  integration: integrationBg,
  "disaster-recovery": disasterBg,
};

export function getServiceBackground(slug: string | undefined): string | undefined {
  if (!slug) return undefined;
  return serviceBackgrounds[slug];
}
