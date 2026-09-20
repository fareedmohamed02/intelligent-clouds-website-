export type ServiceHighlight = {
  title: string;
  body: string;
  iconHint?: string;
};

/** Business/IT problem themes customers recognize before seeing technology. */
export type ServiceProblem = {
  title: string;
  body: string;
};

export type ServiceDeliverable = {
  title: string;
  body: string;
};

export type ServiceApproachStep = {
  title: string;
  body: string;
};

export type ServiceUseCase = {
  title: string;
  body: string;
  outcome: string;
};

export type ServiceMetric = {
  label: string;
  value: string;
};

export type ServiceCategory = "platforms" | "data" | "resilience";

export type ServicePageContent = {
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  iconKey: string;
  category: ServiceCategory;
  /** Unique “how we deliver” section chrome */
  approachTitle: string;
  approachLead: string;
  metrics: ServiceMetric[];
  highlights: ServiceHighlight[];
  /** Problem themes first — customers find the service via their pain, not tech names. */
  problems?: ServiceProblem[];
  challenges: string[];
  outcomes: string[];
  deliverables: ServiceDeliverable[];
  approach: ServiceApproachStep[];
  stack: string[];
  useCases: ServiceUseCase[];
  related: string[];
};
