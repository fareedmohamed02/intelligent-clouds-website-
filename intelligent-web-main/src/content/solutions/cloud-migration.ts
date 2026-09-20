import type { SolutionPageContent } from "./types";

export const cloudMigration: SolutionPageContent = {
  slug: "cloud-migration",
  title: "Cloud Migration",
  eyebrow: "By outcome",
  tagline: "Carefully planned cloud migration — from your current environment to AWS or Azure, with confidence",
  summary:
    "We plan and execute migrations in clear phases, starting with an assessment of the environment and dependencies through to operations and stabilization after the move. We ensure cloud readiness, a clear cutover plan, and business continuity, with full visibility into cost and performance.",
  iconKey: "cloud-migration",
  kind: "outcome",
  pillar: "migration",
  audiences: ["both"],
  ctaLabel: "Start Migration Assessment",
  ctaTo: "/book-demo",
  approachTitle: "Assess → Design → Migrate → Stabilize",
  approachLead:
    "We follow a repeatable methodology: understand the current environment, design the target architecture, migrate in phases, then stabilize and optimize.",
  metrics: [
    { label: "Typical engagement", value: "8–20 weeks" },
    { label: "Pattern", value: "Wave-based move" },
    { label: "Cutover style", value: "Rehearsed" },
    { label: "Day two", value: "Operate + FinOps" },
  ],
  highlights: [
    {
      title: "Readiness and Dependency Assessment",
      body: "Analyzing applications, databases, networks, and identity to identify risks and prioritize migration order.",
    },
    {
      title: "Cloud Landing Zone Design",
      body: "Preparing accounts, networking, identity, security, and monitoring before workloads are migrated.",
    },
    {
      title: "Migration Wave Planning and Execution",
      body: "Breaking the migration into organized waves with clear criteria for cutover and validation.",
    },
    {
      title: "Cutover and Rollback Plans",
      body: "Detailed execution plans that include responsibilities, checkpoints, and rollback options when needed.",
    },
    {
      title: "Hybrid Connectivity",
      body: "Secure, reliable connectivity between your current environment and the cloud during the transition period.",
    },
    {
      title: "Post-Migration Cost Optimization",
      body: "Reviewing resources, right-sizing, tagging, and tracking spend to ensure you're actually getting value from the cloud.",
    },
  ],
  challenges: [
    "A complex technical environment with undocumented dependencies",
    "No clear order for which workloads should move first",
    "Incomplete cloud architecture before migration begins",
    "Untested cutover plans",
    "Rising cloud costs after migration with no clear tracking",
  ],
  outcomes: [
    "A clear migration plan broken into phases",
    "A landing zone ready to receive workloads",
    "Documented dependencies and risks for every application",
    "A pre-tested cutover and rollback plan",
    "A stable cloud environment with clear visibility into cost and performance",
  ],
  deliverables: [
    {
      title: "Migration Assessment Report",
      body: "Analysis of the current environment, dependencies, risks, and the best migration strategy for each workload.",
    },
    {
      title: "Target Cloud Architecture",
      body: "Design of the required architecture for compute, networking, data, and security.",
    },
    {
      title: "Wave and Cutover Plan",
      body: "A clear execution plan for each wave, including responsibilities, success criteria, and rollback.",
    },
    {
      title: "Post-Migration Handover and Operations",
      body: "Support for stabilization, monitoring, and optimization after workloads move to the new environment.",
    },
  ],
  approach: [
    {
      title: "Assessment and Discovery",
      body: "We understand the current environment and identify the applications, data, dependencies, and risks.",
    },
    {
      title: "Target Environment Design",
      body: "We prepare the landing zone and the required security and network architecture.",
    },
    {
      title: "Migration Execution",
      body: "We move workloads in phases, with clear tests and cutover plans.",
    },
    {
      title: "Stabilization and Optimization",
      body: "We monitor the environment after migration, review performance and cost, and ensure operational readiness.",
    },
  ],
  stack: [
    "Azure Migrate / AWS Migration Hub",
    "Terraform / Bicep",
    "DMS / ADF",
    "ExpressRoute / Direct Connect",
    "Azure Monitor / CloudWatch",
    "FinOps tags & budgets",
  ],
  useCases: [
    {
      title: "Datacenter exit in waves",
      body: "A lease end forced a multi-year estate into a sequenced exit. We prepared the landing zone, then moved low-risk waves first to prove the factory.",
      outcome: "On-schedule exit with documented cutovers and no emergency big-bang.",
    },
    {
      title: "Regulated app move",
      body: "A financial workload needed private connectivity and evidence for auditors during migration.",
      outcome: "Rehearsed cutover under the approved window with control evidence retained.",
    },
    {
      title: "Hybrid coexistence year",
      body: "Not everything could move at once. We designed DNS and network bridging for a 12-month coexistence period.",
      outcome: "Stable hybrid path while remaining waves completed.",
    },
  ],
  related: ["devops-transformation", "enterprises", "security-compliance"],
};
