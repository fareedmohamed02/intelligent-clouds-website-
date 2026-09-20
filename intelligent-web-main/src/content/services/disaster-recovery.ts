import type { ServicePageContent } from "./types";

export const disasterRecovery: ServicePageContent = {
  slug: "disaster-recovery",
  title: "Disaster Recovery",
  eyebrow: "Resilience",
  tagline: "Business continuity you can actually test — not just a plan on paper",
  summary:
    "We design disaster recovery solutions that help you restore critical systems and data when outages or disasters occur. We define RPO and RTO, build backup, replication, and failover, and then test recovery for real.",
  iconKey: "disaster-recovery",
  category: "resilience",
  approachTitle: "Define objectives → Design recovery → Implement → Test",
  approachLead:
    "Resilience is evidence. We size investment to business impact and leave timed drill reports behind.",
  metrics: [
    { label: "Typical engagement", value: "5–12 weeks" },
    { label: "Outcomes", value: "RPO/RTO evidence" },
    { label: "Practice", value: "Scheduled drills" },
    { label: "Scope", value: "Apps + data + people" },
  ],
  highlights: [
    {
      title: "Business-Aligned RPO/RTO",
      body: "We define recovery objectives in collaboration with business and application owners.",
    },
    {
      title: "Backup Architecture",
      body: "We design backup, retention, and replication policies suited to your systems and data.",
    },
    {
      title: "Disaster Recovery Architecture",
      body: "We design Active-Passive, Multi-AZ, or Multi-Region setups based on service requirements.",
    },
    {
      title: "Failover Planning",
      body: "We define clear steps for switching services, DNS, and connectivity over to the recovery environment.",
    },
    {
      title: "Recovery Runbooks",
      body: "We document recovery steps, responsibilities, and communications during an incident.",
    },
    {
      title: "DR Testing",
      body: "We run timed recovery tests and measure results against RPO and RTO.",
    },
  ],
  problems: [
    {
      title: "Untested plans",
      body: "RPO and RTO are documented, but have never been tested in a real scenario.",
    },
    {
      title: "Backups aren't enough",
      body: "Having a backup doesn't necessarily mean data can be restored within the required time.",
    },
    {
      title: "Failover depends on one person",
      body: "Recovery relies on one engineer's knowledge instead of documented procedures the whole team can execute.",
    },
    {
      title: "Ransomware risk",
      body: "Regular backups may not be enough to protect data from deletion or malicious encryption.",
    },
    {
      title: "The cost of recovery",
      body: "Some organizations pay for large DR infrastructure without tying that investment to their most critical assets and systems.",
    },
  ],
  challenges: [],
  outcomes: [
    "Clear RPO and RTO for every critical system",
    "Backup and replication designed according to system criticality",
    "Documented recovery runbooks",
    "Protected, immutable backups where needed",
    "Failover that has actually been tested",
    "A recurring schedule of DR tests",
  ],
  deliverables: [
    {
      title: "Disaster Recovery Assessment",
      body: "An assessment of critical systems, dependencies, and current gaps.",
    },
    {
      title: "DR Architecture",
      body: "A comprehensive design for backup, replication, and failover, with cost and trade-offs explained.",
    },
    {
      title: "Recovery Runbooks",
      body: "Runbooks covering technical steps and team responsibilities.",
    },
    {
      title: "DR Exercise Report",
      body: "An actual test report showing recovery time, results, gaps, and a remediation plan.",
    },
  ],
  approach: [
    {
      title: "Defining RPO and RTO",
      body: "We identify critical systems, dependencies, and real recovery requirements.",
    },
    {
      title: "DR design",
      body: "We choose the right backup, replication, and failover model for each layer.",
    },
    {
      title: "Solution implementation",
      body: "We implement backup, restore, and failover, and secure the recovery environment.",
    },
    {
      title: "Recovery testing",
      body: "We run a real DR exercise, measure the results, and address the gaps.",
    },
  ],
  stack: [
    "Azure Site Recovery / Backup",
    "AWS Elastic Disaster Recovery / Backup",
    "Object Lock / Immutable storage",
    "Traffic Manager / Route 53",
    "Terraform",
    "Runbook automation",
    "Observability / status pages",
  ],
  useCases: [
    {
      title: "First proven restore",
      body: "A mid-size firm had nightly backups but no restore evidence. We ran restores for the top three systems and fixed gaps.",
      outcome: "Documented restore times accepted by leadership.",
    },
    {
      title: "Region failover for SaaS",
      body: "A SaaS platform needed a secondary region for a contractual RTO. We implemented replication and a controlled failover drill.",
      outcome: "Measured failover under the contracted window.",
    },
    {
      title: "Ransomware-ready copies",
      body: "Security required immutable backups. We enabled locked retention and tested recovery to a clean environment.",
      outcome: "Recovery path that does not trust the compromised estate.",
    },
  ],
  related: ["storage", "cloud-computing", "database"],
};
