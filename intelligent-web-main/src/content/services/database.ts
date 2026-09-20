import type { ServicePageContent } from "./types";

export const database: ServicePageContent = {
  slug: "database",
  title: "Databases",
  eyebrow: "Data platforms",
  tagline: "High-performance, available, and reliable databases — from design to operations",
  summary:
    "We help you design, migrate, and manage cloud databases that fit your application requirements, focusing on performance, availability, security, backup, and ease of operation.",
  iconKey: "database",
  category: "platforms",
  approachTitle: "Analyze → Design → Migrate → Optimize",
  approachLead:
    "Database moves fail on unknowns. We profile first, rehearse cutover, and leave restore evidence behind.",
  metrics: [
    { label: "Typical engagement", value: "6–16 weeks" },
    { label: "Engines", value: "SQL, Postgres, NoSQL" },
    { label: "Migration style", value: "Online where possible" },
    { label: "Day two", value: "Backups + observability" },
  ],
  highlights: [
    {
      title: "Choosing the right database platform",
      body: "We help you choose between SQL, PostgreSQL, NoSQL, managed databases, or other solutions based on your application's requirements.",
    },
    {
      title: "Database security",
      body: "We implement private connectivity, encryption, IAM/RBAC, and least-privilege access.",
    },
    {
      title: "Safe migration",
      body: "We plan and execute database migration in phases, with prior testing and a clear cutover and rollback plan.",
    },
    {
      title: "Performance optimization",
      body: "We measure query performance, CPU, memory, IOPS, and latency, and identify areas for improvement.",
    },
    {
      title: "High Availability & Recovery",
      body: "We design Multi-AZ or Multi-Region setups based on service requirements and RPO/RTO.",
    },
    {
      title: "Day-two operations",
      body: "We provide monitoring, backup policies, maintenance windows, and clear operating procedures.",
    },
  ],
  problems: [
    {
      title: "Poor performance",
      body: "Slow queries and high resource consumption, with no clear performance baseline in place.",
    },
    {
      title: "Weak availability",
      body: "Outages or regional issues can affect critical applications and services.",
    },
    {
      title: "Difficulty scaling",
      body: "Growth leads to resources being scaled up without a clear plan, rather than following a defined scaling strategy.",
    },
    {
      title: "Untested backups",
      body: "Backups exist, but restores haven't been tested regularly.",
    },
    {
      title: "Database migration",
      body: "Moving a database engine or platform to the cloud can be risky without proper planning for cutover and rollback.",
    },
    {
      title: "Operational complexity",
      body: "Access, updates, monitoring, and backups are spread across different teams without clear ownership.",
    },
  ],
  challenges: [],
  outcomes: [
    "A database platform suited to the nature of the application",
    "High availability aligned with the system's criticality",
    "Backup and recovery that are documented and tested",
    "Private access, encryption, and appropriate permissions",
    "A clear migration and rollback plan",
    "Measurable monitoring and performance baselines",
  ],
  deliverables: [
    {
      title: "Database Assessment",
      body: "An assessment of the current environment, performance, dependencies, risks, and cost.",
    },
    {
      title: "Target Architecture",
      body: "A target design covering the database engine, HA, networking, security, and backup.",
    },
    {
      title: "Migration Runbook",
      body: "A clear migration plan covering phases, testing, cutover, and rollback.",
    },
    {
      title: "Operations Package",
      body: "Runbooks for backup and recovery, monitoring, maintenance, and scaling.",
    },
  ],
  approach: [
    {
      title: "Environment analysis",
      body: "We review your databases, applications, dependencies, and performance requirements.",
    },
    {
      title: "Solution design",
      body: "We define the database platform, HA, security, backup, and connectivity.",
    },
    {
      title: "Migration and testing",
      body: "We start with a non-production environment, then execute the migration incrementally while testing the cutover.",
    },
    {
      title: "Operational optimization",
      body: "We enable monitoring, backup, and recovery tests, and establish clear ownership.",
    },
  ],
  stack: [
    "Azure SQL / Flexible Server",
    "Amazon RDS / Aurora",
    "Cosmos DB / DynamoDB",
    "Private Link",
    "DMS / ADF",
    "Terraform",
  ],
  useCases: [],
  related: ["storage", "cloud-computing", "disaster-recovery"],
};
