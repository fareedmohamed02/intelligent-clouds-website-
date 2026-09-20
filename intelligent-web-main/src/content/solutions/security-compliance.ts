import type { SolutionPageContent } from "./types";

export const securityCompliance: SolutionPageContent = {
  slug: "security-compliance",
  title: "Security & Compliance",
  eyebrow: "By outcome",
  tagline: "Identity, guardrails, and evidence that ship with the platform",
  summary:
    "Design security baselines — identity, network segmentation, policy-as-code, and audit evidence — so controls are operable in production, not a binder that drifts after go-live.",
  iconKey: "security-compliance",
  kind: "outcome",
  pillar: "security",
  audiences: ["both"],
  ctaLabel: "Discuss security",
  ctaTo: "/contact",
  approachTitle: "Threat & gap scan → Baselines → Embed → Evidence",
  approachLead:
    "Security sticks when engineers can ship inside the rails. We embed controls in platforms and prove them with evidence packs.",
  metrics: [
    { label: "Typical engagement", value: "6–14 weeks" },
    { label: "Focus", value: "Baselines + evidence" },
    { label: "Delivery", value: "Policy as code" },
    { label: "Proof", value: "Audit-ready packs" },
  ],
  highlights: [
    {
      title: "Identity hardening",
      body: "Entra ID / IAM patterns, privileged access, and break-glass procedures that are drilled, not theoretical.",
    },
    {
      title: "Policy as code",
      body: "Guardrails at subscription/account and pipeline scope with exceptions that expire.",
    },
    {
      title: "Segmentation & private access",
      body: "Network and PaaS exposure reduced to what the architecture actually needs.",
    },
    {
      title: "Logging & detection hooks",
      body: "Central logs, retention, and alert routing aligned to your SOC or managed detection partner.",
    },
    {
      title: "Compliance evidence",
      body: "Mapped controls to frameworks you care about — with artifacts auditors can follow.",
    },
    {
      title: "Secure delivery path",
      body: "Secrets, scanning, and deploy identities so security is part of release, not a late gate.",
    },
  ],
  challenges: [
    "Controls designed after the platform is already live",
    "Shared admin credentials and standing privileged access",
    "Policies that exist in documents but not in enforceable code",
    "Audit season becomes a scramble for screenshots",
    "Security reviews that block delivery without offering a paved path",
  ],
  outcomes: [
    "Documented control baselines owned by platform and security jointly",
    "Privileged access paths with logging and drills",
    "Policy-as-code coverage for the priority guardrails",
    "Evidence pack mapped to your target framework",
    "A secure golden path developers can use without constant exceptions",
  ],
  deliverables: [
    {
      title: "Security posture assessment",
      body: "Gap analysis against target baselines and quick-win vs structural findings.",
    },
    {
      title: "Control blueprint",
      body: "Identity, network, logging, and policy design with ownership matrix.",
    },
    {
      title: "Policy & pipeline pack",
      body: "Enforceable policies and CI checks with exception workflow.",
    },
    {
      title: "Evidence starter kit",
      body: "Control mapping, artifact locations, and recurring collection cadence.",
    },
  ],
  approach: [
    {
      title: "Scan threats & gaps",
      body: "Review identity, exposure, logging, and delivery paths with security and platform owners.",
    },
    {
      title: "Design operable baselines",
      body: "Freeze control set and paved exceptions so delivery is not frozen.",
    },
    {
      title: "Embed in platform & pipelines",
      body: "Implement identity, policy, and scanning where engineers already work.",
    },
    {
      title: "Prove with evidence",
      body: "Produce an evidence pack and a cadence that keeps it fresh between audits.",
    },
  ],
  stack: [
    "Entra ID / AWS IAM",
    "Azure Policy / SCP",
    "Private Link",
    "Microsoft Sentinel / Security Hub",
    "OPA / Checkov",
    "Key Vault / Secrets Manager",
    "Terraform",
  ],
  useCases: [
    {
      title: "Audit-ready landing zone",
      body: "An enterprise needed CAF-aligned controls with evidence for an upcoming assessment.",
      outcome: "Policy-as-code baselines plus an evidence map auditors accepted.",
    },
    {
      title: "Privileged access cleanup",
      body: "Standing admin roles were common. We introduced JIT/PIM-style paths and break-glass drills.",
      outcome: "Reduced standing privilege with tested emergency access.",
    },
    {
      title: "Secure CI for regulated teams",
      body: "Developers bypassed security gates under release pressure. We redesigned gates and exceptions with expiry.",
      outcome: "Fewer shadow deploys and clearer accountability.",
    },
  ],
  related: ["cloud-migration", "enterprises", "devops-transformation"],
};
