import type { SolutionPageContent } from "./types";

export const enterprises: SolutionPageContent = {
  slug: "enterprises",
  title: "For Enterprises",
  eyebrow: "By audience",
  tagline: "Landing zones and managed operations at enterprise scale",
  summary:
    "CAF-aligned foundations, platform engineering, security baselines, and operate models that fit enterprise governance — so business units ship on shared rails instead of shadow cloud.",
  iconKey: "enterprises",
  kind: "audience",
  pillar: "audience",
  audiences: ["enterprise"],
  ctaLabel: "Discuss enterprise engagement",
  ctaTo: "/contact",
  approachTitle: "Assess → Migrate / Harden → Platformize → Operate",
  approachLead:
    "Enterprises need evidence, ownership, and a paved path. We assess the estate, harden foundations, then industrialize delivery and operations.",
  metrics: [
    { label: "Typical engagement", value: "12–26 weeks" },
    { label: "Path", value: "Assess → Operate" },
    { label: "Governance", value: "CAF / WAF aligned" },
    { label: "Model", value: "Platform + spokes" },
  ],
  highlights: [
    {
      title: "Enterprise landing zones",
      body: "Subscription/account topology, shared services, and policy baselines at scale.",
    },
    {
      title: "Platform as a product",
      body: "Internal platforms with SLAs, adoption metrics, and self-service — not a ticket sink.",
    },
    {
      title: "Security & evidence",
      body: "Controls and audit artifacts that satisfy enterprise risk and regulators.",
    },
    {
      title: "Migration factories",
      body: "Wave-based moves onto the foundation with rehearsed cutovers.",
    },
    {
      title: "FinOps & showback",
      body: "Chargeback/showback models finance and BU leaders can trust.",
    },
    {
      title: "Operate & SRE patterns",
      body: "Runbooks, on-call, and reliability practices for critical services.",
    },
  ],
  challenges: [
    "Shadow cloud across business units with incompatible standards",
    "Platform teams trapped in ticket queues",
    "Migrations stalled by unfinished foundations",
    "Audit and risk findings that reopen every year",
    "Unclear RACI between central IT, security, and product orgs",
  ],
  outcomes: [
    "A governed foundation BU teams can consume",
    "Documented RACI for platform, security, and apps",
    "Measurable adoption of the paved path",
    "Evidence packs that reduce audit scramble",
    "Operate model with named owners for critical services",
  ],
  deliverables: [
    {
      title: "Enterprise cloud assessment",
      body: "Estate map, risk, cost, and maturity against target operating model.",
    },
    {
      title: "Landing zone & platform blueprint",
      body: "Topology, policy, platform product backlog, and ownership design.",
    },
    {
      title: "Pilot BU onboarding",
      body: "One business unit live on the paved path with lessons captured.",
    },
    {
      title: "Operate & governance pack",
      body: "Forums, exception process, FinOps cadence, and runbook set.",
    },
  ],
  approach: [
    {
      title: "Assess the estate & model",
      body: "Map cloud sprawl, governance gaps, and where delivery is blocked today.",
    },
    {
      title: "Migrate and harden foundations",
      body: "Close landing-zone and security gaps that block safe scale.",
    },
    {
      title: "Platformize the paved path",
      body: "Turn foundations into consumable platform products with adoption goals.",
    },
    {
      title: "Operate with clear RACI",
      body: "Install forums, metrics, and runbooks so the model survives the engagement.",
    },
  ],
  stack: [
    "Azure CAF / AWS Control Tower",
    "Terraform / Bicep",
    "AKS / EKS / App platforms",
    "Policy as code",
    "GitHub / Azure DevOps",
    "Sentinel / Security Hub",
    "FinOps toolchains",
  ],
  useCases: [
    {
      title: "Multi-BU consolidation",
      body: "Several units ran incompatible Azure estates. We unified hub services and onboarded two spokes onto shared policy.",
      outcome: "One platform standard with BU autonomy inside the rails.",
    },
    {
      title: "Regulated platform program",
      body: "Risk required evidence and segmentation before new workloads. We delivered baselines and an evidence cadence.",
      outcome: "New workloads onboarded without reopening the same findings.",
    },
    {
      title: "From projects to platform product",
      body: "Central IT delivered one-off projects. We redefined platform SLAs and a self-service backlog.",
      outcome: "Reduced tickets and faster BU time-to-env.",
    },
  ],
  related: ["cloud-migration", "security-compliance", "devops-transformation"],
};
