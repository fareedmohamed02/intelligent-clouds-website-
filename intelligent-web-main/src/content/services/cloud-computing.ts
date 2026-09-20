import type { ServicePageContent } from "./types";

export const cloudComputing: ServicePageContent = {
  slug: "cloud-computing",
  title: "Cloud Compute",
  eyebrow: "Cloud foundation",
  tagline: "We build you a reliable, secure, and scalable cloud foundation",
  summary:
    "We design and build secure, unified, and scalable cloud environments, so your teams can launch new applications and services quickly, without redesigning the infrastructure for every new project.",
  iconKey: "cloud-computing",
  category: "platforms",
  approachTitle: "We discover → We plan → We build → We deliver",
  approachLead:
    "We follow a clear methodology that starts with understanding the current environment and ends with enabling your team to manage the cloud environment independently.",
  metrics: [
    { label: "Typical engagement", value: "6–14 weeks" },
    { label: "Foundation pattern", value: "Hub-spoke" },
    { label: "Clouds", value: "Azure · AWS · GCP" },
    { label: "Day-two ready", value: "Runbooks included" },
  ],
  highlights: [
    {
      title: "Reliable cloud environments",
      body: "We build unified, reusable cloud architecture, so new systems run on the same approved security standards and configurations.",
    },
    {
      title: "Clear permissions and responsibilities",
      body: "We define roles, permissions, access paths, and emergency procedures, ensuring the right people have access to the right resources.",
    },
    {
      title: "Security built in from day one",
      body: "We apply security controls, network segmentation, and policies before applications go live, instead of adding them after issues occur.",
    },
    {
      title: "Better cost management",
      body: "We help you organize resources using tagging, budgets, and monitoring mechanisms, so you can understand and control spend.",
    },
    {
      title: "Faster path to production",
      body: "We provide ready-made templates and standards that help development teams launch applications, containers, and virtual machines quickly, without rebuilding the environment from scratch.",
    },
    {
      title: "Day-one operational readiness",
      body: "We provide the diagrams, defined ownership, and runbooks your team needs to manage the environment efficiently after go-live.",
    },
  ],
  problems: [
    {
      title: "Cloud environments that are hard to scale",
      body: "Accounts and subscriptions have grown over time, and each project ends up with a different setup, making the environment harder to manage and replicate.",
    },
    {
      title: "Unclear permissions and responsibilities",
      body: "It isn't clear who owns each environment, who has access to production or can make changes, or how emergencies should be handled.",
    },
    {
      title: "Security comes after systems go live",
      body: "Security controls and network configurations are added after systems are already running, which can lead to vulnerabilities and additional costs to fix later.",
    },
    {
      title: "Rising cloud service costs",
      body: "Without proper resource classification, budgets, and spend-monitoring mechanisms, it's difficult to know where costs are going or control them.",
    },
    {
      title: "Slow rollout of new applications and services",
      body: "Setting up a secure, ready environment for each new application takes too long due to manual processes and the lack of reusable standard templates.",
    },
  ],
  challenges: [],
  outcomes: [
    "New environments created in hours instead of weeks",
    "Consistent security and policy standards applied across all environments",
    "Clear identity and network management for every type of application",
    "Monitoring and alerts tied to specific owners",
    "A clear plan for migrating applications to the new cloud environment",
  ],
  deliverables: [
    {
      title: "Cloud Architecture Design",
      body: "A clear, agreed-upon blueprint for infrastructure, networking, naming, resource tagging, and policies, so all teams work from a unified model.",
    },
    {
      title: "A Ready-to-Use Cloud Environment",
      body: "Deployable, reproducible, and scalable cloud architecture, instead of relying on one-off manual configurations.",
    },
    {
      title: "Ready-Made Application Templates",
      body: "Reference templates for the most commonly used applications and services, helping development teams launch new workloads faster and with less complexity.",
    },
    {
      title: "Operations & Management Package",
      body: "Practical runbooks covering access management, incident response, periodic reviews, and day-to-day operating procedures.",
    },
  ],
  approach: [
    {
      title: "We understand the challenges",
      body: "We review accounts, identity, networking, and the applications that need hosting, focusing on business requirements and real risks.",
    },
    {
      title: "We design the right solution",
      body: "We agree on the cloud, network, policy, and permissions design before implementation begins, to ensure clear scope and deliverables.",
    },
    {
      title: "We build and test",
      body: "We implement the cloud architecture and test it end-to-end using a reference application or workload, while setting up monitoring and access paths.",
    },
    {
      title: "We hand over knowledge and ownership",
      body: "We walk your team through deployment, access management, operations, and periodic reviews, so they can manage the environment independently after handover.",
    },
  ],
  stack: [
    "Azure",
    "AWS",
    "Google Cloud",
    "Terraform",
    "Entra ID",
    "GitHub Actions",
  ],
  useCases: [],
  related: ["networking", "database", "disaster-recovery"],
};
