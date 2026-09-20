import type { ServicePageContent } from "./types";

export const ai: ServicePageContent = {
  slug: "ai",
  title: "Artificial Intelligence",
  eyebrow: "Intelligent automation",
  tagline: "Practical, secure AI solutions that help you automate operations and improve productivity",
  summary:
    "We help organizations move from AI experiments to real, usable solutions — building intelligent assistants, AI applications, RAG, and process automation, with controls for security, cost, and output quality.",
  iconKey: "ai",
  category: "data",
  approachTitle:
    "Discover the opportunities → Secure the platform → Implement the first use case → Scale usage",
  approachLead:
    "AI value sticks when security, evaluation, and cost controls exist before the second team asks for keys.",
  metrics: [
    { label: "Typical engagement", value: "6–14 weeks" },
    { label: "Focus", value: "Platform + first use case" },
    { label: "Controls", value: "Identity, data, eval" },
    { label: "Ops", value: "Cost & quality gates" },
  ],
  highlights: [
    {
      title: "AI Assistants",
      body: "Intelligent assistants that help employees access information and complete tasks.",
    },
    {
      title: "RAG & Enterprise Knowledge",
      body: "Connecting AI models to your enterprise data and documents, with access permissions enforced.",
    },
    {
      title: "AI Automation",
      body: "Automating repetitive processes using AI, workflows, and agents.",
    },
    {
      title: "AI Infrastructure",
      body: "Designing the infrastructure needed for models, applications, and data.",
    },
    {
      title: "AI Security",
      body: "Controls for data, prompt injection, access, logging, and policies.",
    },
    {
      title: "AI Cost & Performance",
      body: "Monitoring usage, cost, and output quality, and optimizing model consumption.",
    },
  ],
  problems: [
    {
      title: "Business automation",
      body: "Many repetitive processes could be automated, but there's no safe, structured way to apply AI to them.",
    },
    {
      title: "Ungoverned AI tools",
      body: "Employees use different tools without a clear policy to protect company data.",
    },
    {
      title: "Difficulty reaching production",
      body: "Proofs of concept exist, but turning them into a reliable production system is a real challenge.",
    },
    {
      title: "Access to enterprise data",
      body: "Models need your data and internal knowledge, but access to it must be governed and secure.",
    },
    {
      title: "Unclear AI architecture",
      body: "Choosing models, networking, identity, storage, monitoring, and cost can quickly become complex.",
    },
    {
      title: "Rising costs",
      body: "Increased model usage can lead to unexpected cost spikes without clear monitoring.",
    },
  ],
  challenges: [],
  outcomes: [
    "A secure, scalable AI platform",
    "Governed access to AI models",
    "A first use case live in production",
    "Secure RAG access to internal knowledge",
    "Continuous evaluation of output quality",
    "Cost and usage monitoring",
  ],
  deliverables: [
    {
      title: "AI Platform Architecture",
      body: "A design covering models, networking, identity, data, logging, and environments.",
    },
    {
      title: "Production AI Use Case",
      body: "A real, operational use case running in production.",
    },
    {
      title: "AI Evaluation Framework",
      body: "A methodology for evaluating the quality, accuracy, and stability of outputs.",
    },
    {
      title: "AI Operations Package",
      body: "Runbooks for incidents, cost, models, data, and changes.",
    },
  ],
  approach: [
    {
      title: "Identifying opportunities and risks",
      body: "We identify use cases, data sensitivity, and expected ROI.",
    },
    {
      title: "Building the AI foundation",
      body: "We set up identity, networking, access, logging, and policies.",
    },
    {
      title: "Launching the first use case",
      body: "We turn the selected case into production with monitoring and evaluation.",
    },
    {
      title: "Structured scaling",
      body: "We build a clear process for adding new use cases without losing control.",
    },
  ],
  stack: [
    "Azure OpenAI",
    "Amazon Bedrock",
    "Azure AI Search / OpenSearch",
    "LangChain / Semantic Kernel",
    "Private Link",
    "Terraform",
  ],
  useCases: [],
  related: ["analytics", "integration", "cloud-computing"],
};
