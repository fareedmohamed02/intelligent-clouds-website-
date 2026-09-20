export type ServiceItem = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  bodyHtml: string;
  bodyJson?: unknown;
  iconKey: string;
  order: number;
  published: boolean;
};

export type SolutionItem = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  bodyHtml: string;
  bodyJson?: unknown;
  audiences: Array<"startup" | "enterprise">;
  pillar: "migration" | "devops" | "security" | "general";
  highlights: string[];
  order: number;
  published: boolean;
};

export type FaqItem = {
  _id: string;
  question: string;
  questionAr?: string;
  answerHtml: string;
  answerHtmlAr?: string;
  answerJson?: unknown;
  order: number;
  published: boolean;
};

export type ContactNeed =
  | "Cloud Migration"
  | "Managed Services"
  | "Kubernetes"
  | "DevOps Consulting"
  | "Other";

export type ContactStatus = "new" | "reviewed" | "archived";

export type ContactSubmission = {
  _id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  need: ContactNeed | string;
  message: string;
  status: ContactStatus;
  adminNotes?: string;
  meta?: { ip?: string; userAgent?: string };
  createdAt?: string;
  updatedAt?: string;
};

export type BookingNeed =
  | "Cloud Migration"
  | "Managed Cloud"
  | "Kubernetes"
  | "DevOps"
  | "Security"
  | "Other";

export type BookingStatus = "new" | "confirmed" | "completed" | "cancelled";

export type PreferredSchedule = "yes" | "no";

export type BookingRequest = {
  _id: string;
  need: BookingNeed | string;
  name: string;
  email: string;
  company: string;
  phone: string;
  preferredSchedule?: PreferredSchedule;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  status: BookingStatus;
  adminNotes?: string;
  reminderAt?: string | null;
  reminderSentAt?: string | null;
  meta?: { ip?: string; userAgent?: string };
  createdAt?: string;
  updatedAt?: string;
};

export type TicketTier = "standard" | "managed-operations" | "priority";
export type TicketStatus = "new" | "in_progress" | "resolved" | "closed";

export type TicketItem = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  tier: TicketTier | string;
  status: TicketStatus;
  adminNotes?: string;
  meta?: { ip?: string; userAgent?: string };
  createdAt?: string;
  updatedAt?: string;
};

export type SettingsData = {
  _id?: string;
  email: string;
  supportEmail: string;
  phone: string;
  whatsapp: string;
  address: string;
  addressAr?: string;
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  seo: {
    defaultTitle?: string;
    defaultDescription?: string;
    defaultTitleAr?: string;
    defaultDescriptionAr?: string;
    ogImageUrl?: string;
  };
};
