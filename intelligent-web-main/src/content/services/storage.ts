import type { ServicePageContent } from "./types";

export const storage: ServicePageContent = {
  slug: "storage",
  title: "Storage",
  eyebrow: "Data protection",
  tagline:
    "Secure, flexible storage that grows with your business — with transparent costs and reliable recovery",
  summary:
    "We help you design a storage environment suited to the size and nature of your data, managing data lifecycle, protecting backups, and controlling access and costs. The goal is to keep your data available, secure, and recoverable whenever you need it.",
  iconKey: "storage",
  category: "platforms",
  approachTitle: "Analyze → Classify → Protect → Test Recovery",
  approachLead:
    "We design around data classes and risk, automate lifecycle, and prove restore paths before calling the work done.",
  metrics: [
    { label: "Typical engagement", value: "4–10 weeks" },
    { label: "Focus areas", value: "Growth · cost · protect" },
    { label: "Compliance", value: "Retention & immutability" },
    { label: "Access model", value: "Private by default" },
  ],
  highlights: [
    {
      title: "Storage designed around your data",
      body: "We determine the right storage tier for each type of data based on usage frequency, importance, and retention period.",
    },
    {
      title: "Data lifecycle management",
      body: "We automate data movement between storage tiers according to clear policies, reducing cost without affecting access to important data.",
    },
    {
      title: "Protection and secure access",
      body: "We apply encryption, identity and access controls, and private endpoints to reduce exposure of sensitive data.",
    },
    {
      title: "Ransomware-resistant backup",
      body: "We design protected, immutable backups where needed, with retention policies and real recovery testing.",
    },
    {
      title: "High-performance storage",
      body: "We define IOPS, throughput, and latency requirements for high-performance workloads, and design accordingly.",
    },
    {
      title: "Storage cost management",
      body: "We help you understand and optimize the cost of capacity, data transfer, and API requests based on actual usage.",
    },
  ],
  problems: [
    {
      title: "Data growth",
      body: "Data volumes keep growing, while a large share of it remains on high-cost storage tiers without proper classification or management.",
    },
    {
      title: "Backups",
      body: "Backups may exist, but restore testing isn't performed regularly, making successful recovery uncertain when it's actually needed.",
    },
    {
      title: "Data availability",
      body: "Teams need fast access to data, while outages or slow restores can disrupt operations.",
    },
    {
      title: "Rising storage costs",
      body: "Capacity, egress, and access-request costs pile up without clear visibility into what each service or team is consuming.",
    },
    {
      title: "Data protection",
      body: "Unrestricted access, long-lived keys, and the absence of immutable backups can increase the risk of data loss or ransomware attacks.",
    },
  ],
  challenges: [],
  outcomes: [
    "Clear data classification, with each category mapped to the right storage tier",
    "Automated lifecycle policies to move data between Hot, Cool, and Archive tiers",
    "Private, secure access to production data",
    "Protected, immutable backups where needed",
    "Regular recovery testing for critical data",
    "Clear visibility into storage costs and consumption",
  ],
  deliverables: [
    {
      title: "Data Classification",
      body: "A matrix outlining data types, sensitivity levels, retention periods, owners, and protection requirements.",
    },
    {
      title: "Storage Environment Design",
      body: "A clear structure for accounts, storage resources, permissions, networking, and backups.",
    },
    {
      title: "Lifecycle and Retention Policies",
      body: "Clear rules for moving, archiving, deleting, and retaining data, with alerts when issues occur.",
    },
    {
      title: "Recovery Test Report",
      body: "An actual restore test for critical data, with measured recovery time and documented results and gaps.",
    },
  ],
  approach: [
    {
      title: "Analyze data and usage",
      body: "We review data sources, access patterns, performance requirements, risks, and the largest cost drivers.",
    },
    {
      title: "Design storage tiers",
      body: "We define Hot, Cool, and Archive tiers, along with retention and access policies for each data category.",
    },
    {
      title: "Build protection and automation",
      body: "We implement storage, lifecycle policies, encryption, private access, and protected backups.",
    },
    {
      title: "Test recovery",
      body: "We run a recovery test on critical data, document the results, and build a plan to address any gaps.",
    },
  ],
  stack: [
    "Azure Blob / Files",
    "AWS S3 / EBS / EFS",
    "Private Link",
    "Terraform",
    "Object Lock / WORM",
    "Azure & AWS Backup",
  ],
  useCases: [],
  related: ["cloud-computing", "disaster-recovery", "database"],
};
