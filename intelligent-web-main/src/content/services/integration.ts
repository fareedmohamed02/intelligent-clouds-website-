import type { ServicePageContent } from "./types";

export const integration: ServicePageContent = {
  slug: "integration",
  title: "Integration",
  eyebrow: "Resilience",
  tagline: "Connect your systems and data reliably — through APIs, events, and synchronization",
  summary:
    "We design and implement integration solutions that connect applications, legacy systems, cloud, and partners through APIs, event-driven architecture, and messaging, with a focus on reliability, security, and scalability.",
  iconKey: "integration",
  category: "resilience",
  approachTitle: "Map the flows → Choose the pattern → Implement → Monitor",
  approachLead:
    "Integration debt clears when patterns are catalogued, contracts are tested, and dead-letter paths are owned.",
  metrics: [
    { label: "Typical engagement", value: "6–14 weeks" },
    { label: "Patterns", value: "API · event · sync" },
    { label: "Reliability", value: "Retries & DLQ" },
    { label: "Visibility", value: "Tracing & contracts" },
  ],
  highlights: [
    {
      title: "API Management",
      body: "Designing and managing APIs with authentication, authorization, and versioning.",
    },
    {
      title: "Event-Driven Integration",
      body: "Using topics, queues, and events to decouple systems and improve resilience.",
    },
    {
      title: "Hybrid Integration",
      body: "Connecting on-premises systems to the cloud securely and reliably.",
    },
    {
      title: "Data Synchronization",
      body: "Designing synchronization processes that keep data consistent across systems.",
    },
    {
      title: "Integration Resilience",
      body: "Implementing retry, timeout, idempotency, and dead letter queues.",
    },
    {
      title: "Monitoring",
      body: "Tracking messages and requests from source to destination, with performance and error monitoring.",
    },
  ],
  problems: [
    {
      title: "Point-to-Point Integrations",
      body: "Every system is connected directly to every other, so any change ends up affecting multiple systems.",
    },
    {
      title: "Unclear ownership",
      body: "When a message or integration fails, it isn't clear who's responsible for handling it.",
    },
    {
      title: "Unstructured APIs",
      body: "Interfaces without clear versioning or authentication standards.",
    },
    {
      title: "Data inconsistency",
      body: "Discrepancies appear between systems due to the lack of clear data contracts or synchronization.",
    },
    {
      title: "Poor error handling",
      body: "There are no clear mechanisms for retries or dead letter queues.",
    },
  ],
  challenges: [],
  outcomes: [
    "Reusable integration patterns",
    "Documented, secure APIs",
    "Event-driven architecture where needed",
    "Clear data contracts",
    "Retry, DLQ, and idempotency in place",
    "End-to-end monitoring",
  ],
  deliverables: [
    {
      title: "Integration Landscape",
      body: "A map of systems, flows, integration points, and SLAs.",
    },
    {
      title: "Reference Patterns",
      body: "Reference designs for APIs, events, messaging, and synchronization.",
    },
    {
      title: "Integration Platform Foundation",
      body: "A foundation covering the API gateway, messaging, schemas, and CI/CD.",
    },
    {
      title: "Operations Runbook",
      body: "Runbooks for incidents, message replay, and version management.",
    },
  ],
  approach: [
    {
      title: "Flow analysis",
      body: "We identify the systems, dependencies, and most important processes.",
    },
    {
      title: "Architecture selection",
      body: "We determine when to use APIs, events, messaging, or synchronization.",
    },
    {
      title: "Implement a proof flow",
      body: "We start with a high-value flow to prove out the solution.",
    },
    {
      title: "Monitoring and scaling",
      body: "We add monitoring and error handling, and extend the platform to the remaining flows.",
    },
  ],
  stack: [
    "Azure API Management",
    "Amazon API Gateway",
    "Service Bus / Event Grid / SNS·SQS",
    "Kafka / Event Hubs",
    "Logic Apps / Step Functions",
    "OpenAPI / AsyncAPI",
    "Terraform",
  ],
  useCases: [
    {
      title: "Partner API productization",
      body: "A business unit exposed ad-hoc APIs to partners. We introduced a gateway, versions, and auth standards.",
      outcome: "Safer partner onboarding with usage visibility.",
    },
    {
      title: "Order flow eventing",
      body: "Order updates were synchronous chains that failed loudly. We moved to events with idempotent consumers.",
      outcome: "Partial outages no longer blocked the entire chain.",
    },
    {
      title: "Hybrid ERP sync",
      body: "Cloud CRM and on-prem ERP drifted. We designed a sync path with conflict rules and monitoring.",
      outcome: "Measurable lag SLAs and fewer manual reconciliations.",
    },
  ],
  related: ["analytics", "networking", "disaster-recovery"],
};
