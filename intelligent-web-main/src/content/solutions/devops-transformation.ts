import type { SolutionPageContent } from "./types";

export const devopsTransformation: SolutionPageContent = {
  slug: "devops-transformation",
  title: "DevOps Transformation",
  eyebrow: "By outcome",
  tagline: "CI/CD, GitOps, and platform engineering your teams can actually run",
  summary:
    "Build delivery platforms with promotion gates, environment parity, and self-service paths so releases are reviewable, repeatable, and owned — not heroics on Friday night.",
  iconKey: "devops-transformation",
  kind: "outcome",
  pillar: "devops",
  audiences: ["both"],
  ctaLabel: "Discuss delivery platforms",
  ctaTo: "/book-demo",
  approachTitle: "Baseline → Pave the path → Adopt → Measure",
  approachLead:
    "DevOps transforms when the golden path is easier than the workaround. We prove it with one product team first.",
  metrics: [
    { label: "Typical engagement", value: "8–16 weeks" },
    { label: "Focus", value: "Golden path" },
    { label: "Delivery", value: "GitOps / CI+CD" },
    { label: "Proof", value: "One team live" },
  ],
  highlights: [
    {
      title: "Pipeline standards",
      body: "Build, test, security scan, and promote with gates that match your risk appetite.",
    },
    {
      title: "Environment parity",
      body: "Dev → test → prod defined as code so “works on my machine” stops being the release plan.",
    },
    {
      title: "GitOps / IaC",
      body: "Desired state in git with drift detection and peer review for production changes.",
    },
    {
      title: "Platform self-service",
      body: "Templates and internal developer portals so teams scaffold safely without tickets for every namespace.",
    },
    {
      title: "Release observability",
      body: "DORA-friendly metrics, deployment markers, and rollback playbooks.",
    },
    {
      title: "Security in the path",
      body: "Secrets hygiene, SBOM/scanning, and least-privilege deploy identities baked into CI.",
    },
  ],
  challenges: [
    "Every team invents its own pipeline with different quality bars",
    "Production changes still happen in the portal under pressure",
    "No promotion gates — or gates so heavy nobody uses them",
    "Platform team is a ticket queue instead of a product",
    "Incidents without clear deploy markers or rollback owners",
  ],
  outcomes: [
    "A documented golden path used by at least one product team",
    "Environments provisioned and promoted via pipeline",
    "Security checks in CI with exceptions that expire",
    "Deployment and failure metrics visible to engineering leaders",
    "A backlog for the next teams to adopt the same path",
  ],
  deliverables: [
    {
      title: "Delivery platform blueprint",
      body: "Toolchain, environments, identity for deploy, and gate policy.",
    },
    {
      title: "Golden path starter",
      body: "Reference app or service template with CI/CD and IaC stubs.",
    },
    {
      title: "GitOps / pipeline modules",
      body: "Reusable workflows and policies your teams can fork safely.",
    },
    {
      title: "Operate & adopt pack",
      body: "Runbooks, exception process, and adoption checklist for new teams.",
    },
  ],
  approach: [
    {
      title: "Baseline the current path",
      body: "Map how software reaches production today — including the unofficial workarounds.",
    },
    {
      title: "Pave the golden path",
      body: "Design toolchain, gates, and templates; implement with one willing product team.",
    },
    {
      title: "Adopt with enablement",
      body: "Train, document, and remove friction until the paved path wins by default.",
    },
    {
      title: "Measure & harden",
      body: "Instrument DORA-style signals, tighten gates where risk warrants, and expand adoption.",
    },
  ],
  stack: [
    "GitHub Actions / Azure DevOps",
    "Argo CD / Flux",
    "Terraform",
    "Kubernetes / AKS / EKS",
    "OIDC deploy identities",
    "Sonar / container scanning",
    "Prometheus / App Insights",
  ],
  useCases: [
    {
      title: "From portal deploys to GitOps",
      body: "A platform team still clicked production changes. We introduced desired-state deploys with peer review and drift alerts.",
      outcome: "Production changes became reviewable and reversible.",
    },
    {
      title: "Startup release acceleration",
      body: "A growing product org had brittle scripts. We shipped a golden path template and CI gates matched to their risk.",
      outcome: "Faster releases without losing basic quality and security checks.",
    },
    {
      title: "Enterprise pipeline consolidation",
      body: "Five business units ran five incompatible CI stacks. We defined a shared paved path with room for justified exceptions.",
      outcome: "One platform product with measurable adoption.",
    },
  ],
  related: ["cloud-migration", "startups", "security-compliance"],
};
