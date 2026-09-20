import type { ServicePageContent } from "./types";

export const analytics: ServicePageContent = {
  slug: "analytics",
  title: "Analytics",
  eyebrow: "Decision visibility",
  tagline: "Turn your data into clear insights that help you make better decisions",
  summary:
    "We build analytics platforms that help you collect data from multiple sources, clean, transform, and analyze it, then present it through reliable dashboards and reports your teams and leadership can depend on.",
  iconKey: "analytics",
  category: "data",
  approachTitle: "Discover the data → Design the platform → Build the first pipeline → Scale analytics",
  approachLead:
    "We prove the platform with one high-value domain, then package onboarding so the next teams do not fork the stack.",
  metrics: [
    { label: "Typical engagement", value: "8–16 weeks" },
    { label: "Layers", value: "Ingest → transform → serve" },
    { label: "Quality", value: "Tests + lineage" },
    { label: "Consumers", value: "BI & products" },
  ],
  highlights: [
    {
      title: "Data Ingestion",
      body: "We collect data from databases, applications, files, and various systems into organized pipelines.",
    },
    {
      title: "Data Lake & Data Warehouse",
      body: "We design the right architecture for storing and analyzing data with scalability in mind.",
    },
    {
      title: "Data Transformation",
      body: "We build transformation processes and data tests to ensure result quality.",
    },
    {
      title: "Business Intelligence",
      body: "We turn data into dashboards and KPIs that help leadership and teams make better decisions.",
    },
    {
      title: "Data Governance",
      body: "We apply classification, access control, and data ownership based on data sensitivity.",
    },
    {
      title: "Monitoring & Data Quality",
      body: "We monitor data freshness and quality, and alert teams when issues occur.",
    },
  ],
  problems: [
    {
      title: "Multiple data sources",
      body: "Data is spread across systems, applications, and files, with no unified view.",
    },
    {
      title: "Conflicting reports",
      body: "Each team uses a different definition for the same metric, resulting in different numbers for what should be the same measure.",
    },
    {
      title: "Unstable pipelines",
      body: "Data pipelines rely on scripts or manual processes that are hard to monitor and maintain.",
    },
    {
      title: "Delayed data",
      body: "Reports don't update fast enough, which delays decision-making.",
    },
    {
      title: "Difficulty accessing insights",
      body: "The data exists, but turning it into actionable information takes too long.",
    },
  ],
  challenges: [],
  outcomes: [
    "A single source of truth for data and analytics",
    "Unified metric definitions",
    "Monitorable, testable data pipelines",
    "Alerts for data quality and freshness",
    "Clear, business-oriented dashboards",
    "Governance and permissions appropriate to data sensitivity",
  ],
  deliverables: [
    {
      title: "Analytics Architecture",
      body: "A map of data sources, pipelines, and the target platform.",
    },
    {
      title: "Data Pipeline Foundation",
      body: "A reusable foundation for ingesting and transforming data.",
    },
    {
      title: "KPI & Dashboard Starter",
      body: "A starter set of metrics and reference dashboards built on unified definitions.",
    },
    {
      title: "Operations Package",
      body: "Runbooks for handling pipeline failures, data delays, and access requests.",
    },
  ],
  approach: [
    {
      title: "Data discovery",
      body: "We identify the sources, decisions, and metrics most important to the business.",
    },
    {
      title: "Analytics platform design",
      body: "We define the architecture, ownership, access model, and security.",
    },
    {
      title: "Build the first data pipeline",
      body: "We implement a complete pipeline from source to dashboard as a proof case.",
    },
    {
      title: "Scale",
      body: "We add new sources and domains while maintaining the same standards.",
    },
  ],
  stack: [
    "Azure Data Factory / Synapse",
    "AWS Glue / Redshift",
    "Databricks",
    "dbt",
    "Power BI / QuickSight",
    "Terraform",
  ],
  useCases: [],
  related: ["ai", "database", "integration"],
};
