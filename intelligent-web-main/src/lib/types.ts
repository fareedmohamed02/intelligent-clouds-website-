export type SettingsPublic = {
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

export type ServiceItem = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  bodyHtml: string;
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
  order: number;
  published: boolean;
};

