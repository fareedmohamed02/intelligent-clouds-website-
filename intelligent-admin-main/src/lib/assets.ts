/**
 * Paths mirror workspace `assets/` → each app's `public/assets/`.
 * URLs stay `/assets/...` (same path as the master pack).
 */
export const brand = {
  /** Official client logo (PNG mark). Prefer this in UI. */
  logo: "/assets/brand/logo.png",
  logoColor: "/assets/brand/logo-color.svg",
  logoReverse: "/assets/brand/logo-reverse.svg",
  logoMono: "/assets/brand/logo-mono.svg",
  logoMark: "/assets/brand/logo-mark.svg",
  favicon: "/assets/brand/favicon.svg",
  wordmark: "/assets/brand/wordmark.svg",
  wordmarkReverse: "/assets/brand/wordmark-reverse.svg",
} as const;

export const illustrations = {
  architectureEngine: "/assets/illustrations/diagrams/architecture-engine.svg",
  techChips: "/assets/illustrations/ui/tech-chips.svg",
  services: {
    "cloud-computing": "/assets/illustrations/services/cloud-computing.svg",
    storage: "/assets/illustrations/services/storage.svg",
    networking: "/assets/illustrations/services/networking.svg",
    database: "/assets/illustrations/services/database.svg",
    analytics: "/assets/illustrations/services/analytics.svg",
    ai: "/assets/illustrations/services/ai.svg",
    integration: "/assets/illustrations/services/integration.svg",
    "disaster-recovery": "/assets/illustrations/services/disaster-recovery.svg",
  },
} as const;
