import type { CompanyPageContent } from "./types";

export const about: CompanyPageContent = {
  slug: "about",
  title: "Built by Engineers Who've Run Production Cloud at Scale",
  eyebrow: "About Us",
  tagline: "Hands-on production cloud — not theoretical best practices",
  summary:
    "Intelligent-Cloud helps companies fix fragile infrastructure, unclear cost visibility, and DevOps that doesn't scale — with hands-on Azure, AKS, Terraform, and GitOps experience from real high-availability workloads.",
  metrics: [
    { label: "Delivery model", value: "Assess → Operate" },
    { label: "Default path", value: "IaC + GitOps" },
    { label: "Engagement style", value: "Pilots first" },
    { label: "Operate model", value: "Team extension" },
  ],
  highlights: [
    {
      title: "Our Mission",
      body: "Make enterprise-grade cloud architecture, security, and automation accessible to companies at every stage — from a 5-person startup to an enterprise modernizing technical debt.",
    },
  ],
  principles: [
    {
      title: "Automation-First",
      body: "If it can be scripted, it shouldn't be manual. We build with Terraform, Helm, and ArgoCD so your infrastructure is version-controlled, auditable, and repeatable.",
    },
    {
      title: "Security",
      body: "Landing zones, network segmentation, and cost governance are designed in from day one, not retrofitted after an audit or a surprise bill.",
    },
    {
      title: "Continuous Improvement",
      body: "Observability by default — Prometheus, Grafana, Loki, Tempo — and we work as an extension of your team for migrations or 24×7 managed operations.",
    },
  ],
  ctaTitle: "Ready to talk platforms — not slides?",
  ctaLead: "Book a free assessment with an engineer, or reach sales for a scoped conversation.",
  ctaPrimary: { label: "Book assessment", to: "/book-demo" },
  ctaSecondary: { label: "Contact sales", to: "/contact" },
};

/* Removed partners page content.
  slug: "partners",
  title: "Partner with Intelligent Cloud",
  eyebrow: "Company",
  tagline: "Referral, reseller, and solution paths that keep ownership clear",
  summary:
    "Grow with an engineer-led cloud practice — landing zones, Kubernetes platforms, and managed operations — without building the entire delivery capability alone.",
  metrics: [
    { label: "Partner models", value: "3 paths" },
    { label: "Commercial style", value: "Written scopes" },
    { label: "Logo policy", value: "Approval only" },
    { label: "Co-delivery", value: "Shared RACI" },
  ],
  highlights: [
    {
      title: "Referral",
      body: "Introduce qualified opportunities. Stay involved through discovery while we deliver architecture, migration, or managed operations.",
    },
    {
      title: "Reseller",
      body: "Package Intelligent Cloud engagements alongside your product, MSP, or SI offering for clients who need cloud depth.",
    },
    {
      title: "Solution partner",
      body: "Co-deliver platforms with shared runbooks, observability, and a single customer-facing operating model.",
    },
    {
      title: "Clear ownership",
      body: "Every model assumes written scopes, delivery boundaries, and success criteria before kickoff.",
    },
    {
      title: "No placeholder logos",
      body: "We only publish approved partner brands — empty slots are never invented for the website.",
    },
    {
      title: "Technical shadowing",
      body: "Optional joint discovery and delivery shadowing so your team builds capability alongside ours.",
    },
  ],
  principles: [
    {
      title: "Transparent commercials",
      body: "Splits and packaging are explicit. No surprise margin games mid-engagement.",
    },
    {
      title: "Customer-first delivery",
      body: "Partners never become a second customer. The end client's operate model stays coherent.",
    },
    {
      title: "Shared escalation paths",
      body: "Solution partners align on on-call and severity so incidents do not bounce between brands.",
    },
    {
      title: "Enablement over lock-in",
      body: "We document enough that your practice can grow — we are not here to create permanent dependency theater.",
    },
  ],
  ctaTitle: "Become a partner",
  ctaLead: "Tell us how you want to engage — referral, reseller, or co-delivery — and we will propose a clear path.",
  ctaPrimary: { label: "Contact sales", to: "/contact" },
  ctaSecondary: { label: "Book assessment", to: "/book-demo" },
};

*/

export const contact: CompanyPageContent = {
  slug: "contact",
  title: "Contact sales",
  eyebrow: "Company",
  tagline: "Email, phone, and WhatsApp — or send a structured message",
  summary:
    "Reach us for migrations, managed operations, Kubernetes platforms, or partnership conversations. Prefer a guided assessment? Book a demo and we confirm timing manually.",
  metrics: [
    { label: "Response", value: "Business hours" },
    { label: "Engineer chat", value: "WhatsApp" },
    { label: "Assessment", value: "30 minutes" },
    { label: "Scheduling", value: "Manual confirm" },
  ],
  highlights: [
    {
      title: "Cloud migration & landing zones",
      body: "Wave plans, foundations, and cutover rehearsals for Azure and AWS estates.",
    },
    {
      title: "Managed Kubernetes & GitOps",
      body: "Platforms with promotion gates, observability, and named operate ownership.",
    },
    {
      title: "Security baselines & operations",
      body: "Identity, policy-as-code, and 24×7-ready run models when coverage matters.",
    },
    {
      title: "Partnerships",
      body: "Referral, reseller, and solution partner conversations with clear commercials.",
    },
  ],
  principles: [
    {
      title: "No calendar spam",
      body: "We confirm preferred times manually so engineers are actually available — not auto-booked into a void.",
    },
    {
      title: "Right room, right people",
      body: "Sales routes you to an engineer when the question is technical; partnership talks stay with the commercial path.",
    },
    {
      title: "WhatsApp for quick scope",
      body: "Use WhatsApp when you need a fast engineer conversation before a formal assessment.",
    },
    {
      title: "Written follow-up",
      body: "After contact, expect a confirmation and next-step note — not silence.",
    },
  ],
  ctaTitle: "Prefer a structured assessment?",
  ctaLead: "Book a free 30-minute session with an engineer. We confirm your preferred slot by email.",
  ctaPrimary: { label: "Book assessment", to: "/book-demo" },
  ctaSecondary: { label: "View services", to: "/services" },
};

export const bookDemo: CompanyPageContent = {
  slug: "book-demo",
  title: "Book a cloud assessment",
  eyebrow: "Company",
  tagline: "30 minutes with an engineer — preferred time, confirmed manually",
  summary:
    "Share what you need, who you are, and a preferred slot. We confirm by email — no live calendar sync, no auto-booked empty meetings.",
  metrics: [
    { label: "Session length", value: "30 minutes" },
    { label: "Format", value: "Engineer-led" },
    { label: "Cost", value: "Free assessment" },
    { label: "Confirm", value: "Manual by email" },
  ],
  highlights: [
    {
      title: "Migration readiness",
      body: "Dependency risks, wave realism, and landing-zone prerequisites before you book a cutover.",
    },
    {
      title: "Platform / GitOps",
      body: "Whether your delivery path can survive the next hire — and what a golden path would look like.",
    },
    {
      title: "Managed operations",
      body: "Coverage, RACI, and what must be true before managed run makes sense.",
    },
    {
      title: "Security & compliance",
      body: "Control gaps that block deals or audits — and a pragmatic order of work.",
    },
  ],
  principles: [
    {
      title: "Come with a workload in mind",
      body: "The best assessments start from a real system, not a generic cloud wishlist.",
    },
    {
      title: "Success criteria first",
      body: "We push for written outcomes before proposing a multi-month program.",
    },
    {
      title: "Honest fit",
      body: "If we are not the right partner, we say so — and point you at a better next step when we can.",
    },
    {
      title: "Follow-up in writing",
      body: "After the call you get notes and recommended options — not a vague “we'll be in touch.”",
    },
  ],
  ctaTitle: "Need to reach sales instead?",
  ctaLead: "Partnership, invoicing, or an open commercial question — contact sales directly.",
  ctaPrimary: { label: "Contact sales", to: "/contact" },
  ctaSecondary: { label: "About us", to: "/about" },
};
