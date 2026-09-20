export type SolutionHighlight = {
  title: string;
  body: string;
};

export type SolutionDeliverable = {
  title: string;
  body: string;
};

export type SolutionApproachStep = {
  title: string;
  body: string;
};

export type SolutionUseCase = {
  title: string;
  body: string;
  outcome: string;
};

export type SolutionMetric = {
  label: string;
  value: string;
};

export type SolutionKind = "outcome" | "audience";

export type SolutionPillar = "migration" | "devops" | "security" | "audience";

export type SolutionAudience = "startup" | "enterprise" | "both";

export type SolutionPageContent = {
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  iconKey: string;
  kind: SolutionKind;
  pillar: SolutionPillar;
  audiences: SolutionAudience[];
  ctaLabel: string;
  ctaTo: string;
  approachTitle: string;
  approachLead: string;
  metrics: SolutionMetric[];
  highlights: SolutionHighlight[];
  challenges: string[];
  outcomes: string[];
  deliverables: SolutionDeliverable[];
  approach: SolutionApproachStep[];
  stack: string[];
  useCases: SolutionUseCase[];
  related: string[];
};
