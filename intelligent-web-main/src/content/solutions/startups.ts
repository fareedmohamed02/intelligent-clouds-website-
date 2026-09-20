import type { SolutionPageContent } from "./types";

export const startups: SolutionPageContent = {
  slug: "startups",
  title: "For Startups",
  eyebrow: "By audience",
  tagline: "Launch fast without inheriting infrastructure debt",
  summary:
    "A pragmatic cloud path for early and growth-stage teams — secure defaults, CI/CD, cost visibility, and just enough platform so you ship product instead of reinventing operations every sprint.",
  iconKey: "startups",
  kind: "audience",
  pillar: "audience",
  audiences: ["startup"],
  ctaLabel: "Book a startup assessment",
  ctaTo: "/book-demo",
  approachTitle: "Pilot → Foundation → Automate → Scale",
  approachLead:
    "Startups win with a thin paved path: ship a pilot, lock foundations, automate delivery, then scale when product-market fit demands it.",
  metrics: [
    { label: "Typical engagement", value: "4–10 weeks" },
    { label: "Path", value: "Pilot → Scale" },
    { label: "Team fit", value: "Lean eng orgs" },
    { label: "Bias", value: "Ship + guardrails" },
  ],
  highlights: [
    {
      title: "Right-sized foundation",
      body: "Identity, environments, and networking without a 50-subscription enterprise design.",
    },
    {
      title: "Product-ready CI/CD",
      body: "A golden path to deploy with tests and basic security checks from week one.",
    },
    {
      title: "Cost clarity",
      body: "Budgets, alerts, and simple showback so burn rate stays intentional.",
    },
    {
      title: "Observability starter",
      body: "Logs, metrics, and alerts that a small team can actually respond to.",
    },
    {
      title: "Security defaults",
      body: "Private where it matters, secrets out of repos, and least privilege without a full GRC program.",
    },
    {
      title: "Growth runway",
      body: "Patterns that expand into enterprise-grade landing zones when you raise or enter regulated markets.",
    },
  ],
  challenges: [
    "Hero engineers holding production in their heads",
    "Cloud spend climbing with no tagging or budgets",
    "Security postponed until an enterprise customer asks",
    "Every new service invents a new deploy script",
    "No time for a six-month platform program",
  ],
  outcomes: [
    "A thin but real foundation your team can operate",
    "One paved deploy path used by the product squads",
    "Budget alerts and basic FinOps hygiene",
    "Security defaults that pass early customer questionnaires",
    "A clear backlog for the next maturity step",
  ],
  deliverables: [
    {
      title: "Startup cloud blueprint",
      body: "Environments, identity, networking, and tool choices sized to your stage.",
    },
    {
      title: "Deploy golden path",
      body: "CI/CD template and IaC stubs for your primary workload type.",
    },
    {
      title: "Ops starter kit",
      body: "Alerting, on-call basics, and a cost dashboard.",
    },
    {
      title: "90-day growth backlog",
      body: "Prioritized next steps when you hire, raise, or enter a regulated deal.",
    },
  ],
  approach: [
    {
      title: "Pilot the critical path",
      body: "Pick the product surface that matters most and map how it reaches users today.",
    },
    {
      title: "Lay a lean foundation",
      body: "Stand up environments, identity, and guardrails without over-building.",
    },
    {
      title: "Automate delivery",
      body: "Put CI/CD and IaC under the product team with minimal ceremony.",
    },
    {
      title: "Scale when pulled",
      body: "Add multi-env, stronger compliance, or multi-region only when the business needs it.",
    },
  ],
  stack: [
    "Azure / AWS (right-sized)",
    "Managed containers or PaaS",
    "GitHub Actions",
    "Terraform",
    "Managed Postgres / SQL",
    "Basic APM + budgets",
  ],
  useCases: [
    {
      title: "Pre-Series B cleanup",
      body: "A SaaS startup had production in one engineer’s account. We rebuilt a shared foundation and deploy path before diligence.",
      outcome: "Investor and enterprise security questions became answerable.",
    },
    {
      title: "First enterprise customer",
      body: "A product team needed SSO, private networking, and audit logs without freezing the roadmap.",
      outcome: "Deal-blocking controls shipped on a lean timeline.",
    },
    {
      title: "Burn-rate shock",
      body: "Cloud spend doubled after a growth spike. We introduced budgets, rightsizing, and env hygiene.",
      outcome: "Predictable monthly spend with product still shipping.",
    },
  ],
  related: ["devops-transformation", "cloud-migration", "enterprises"],
};
