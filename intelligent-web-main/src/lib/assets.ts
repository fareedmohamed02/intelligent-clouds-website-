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
  signatureNetwork: "/assets/illustrations/diagrams/signature-network.svg",
  migration: "/assets/illustrations/diagrams/migration.svg",
  securityLayers: "/assets/illustrations/diagrams/security-layers.svg",
  observability: "/assets/illustrations/diagrams/observability.svg",
  devopsStrip: "/assets/illustrations/diagrams/devops-strip.svg",
  techChips: "/assets/illustrations/ui/tech-chips.svg",
  ogShare: "/assets/illustrations/og/og-share.svg",
  process: {
    assess: "/assets/illustrations/process/assess.svg",
    design: "/assets/illustrations/process/design.svg",
    build: "/assets/illustrations/process/build.svg",
    operate: "/assets/illustrations/process/operate.svg",
  },
} as const;

/** Technology brand marks (Simple Icons) — see `src/lib/tech-brands.ts`. */
export const tech = {
  aws: "/assets/tech/aws.svg",
  azure: "/assets/tech/azure.svg",
  gcp: "/assets/tech/gcp.svg",
  kubernetes: "/assets/tech/kubernetes.svg",
  terraform: "/assets/tech/terraform.svg",
  helm: "/assets/tech/helm.svg",
  argo: "/assets/tech/argo.svg",
  prometheus: "/assets/tech/prometheus.svg",
  grafana: "/assets/tech/grafana.svg",
  docker: "/assets/tech/docker.svg",
  github: "/assets/tech/github.svg",
  githubActions: "/assets/tech/github-actions.svg",
  azureDevops: "/assets/tech/azure-devops.svg",
} as const;

