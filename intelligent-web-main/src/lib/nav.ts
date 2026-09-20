import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Cloud,
  CloudCog,
  Database,
  HardDrive,
  LineChart,
  Network,
  BrainCircuit,
  Rocket,
  ShieldCheck,
  Workflow,
  Boxes,
} from "lucide-react";
import type { Messages } from "@/i18n/messages";

export type MegaLink = {
  title: string;
  description: string;
  to: string;
  icon?: LucideIcon;
};

export type MegaColumn = {
  heading: string;
  links: MegaLink[];
};

export type MegaPanel = {
  id: "services" | "solutions" | "company";
  label: string;
  overviewTo: string;
  overviewLabel: string;
  columns: MegaColumn[];
  featured?: {
    title: string;
    description: string;
    to: string;
    cta: string;
  };
};

export type MegaId = MegaPanel["id"];

/**
 * Desktop mega-menu IA for a cloud consulting site
 * (intent-based columns: Platforms / Data & AI / Resilience / Goals / Audiences).
 */
export function getMegaPanels(t: Messages): MegaPanel[] {
  const s = t.mega.services;
  const sol = t.mega.solutions;
  const co = t.mega.company;

  return [
    {
      id: "services",
      label: t.nav.services,
      overviewTo: "/services",
      overviewLabel: s.overviewLabel,
      columns: [
        {
          heading: s.platforms,
          links: [
            {
              title: s.cloudComputing.title,
              description: s.cloudComputing.description,
              to: "/services/cloud-computing",
              icon: Cloud,
            },
            {
              title: s.storage.title,
              description: s.storage.description,
              to: "/services/storage",
              icon: HardDrive,
            },
            {
              title: s.networking.title,
              description: s.networking.description,
              to: "/services/networking",
              icon: Network,
            },
            {
              title: s.database.title,
              description: s.database.description,
              to: "/services/database",
              icon: Database,
            },
          ],
        },
        {
          heading: s.dataAi,
          links: [
            {
              title: s.analytics.title,
              description: s.analytics.description,
              to: "/services/analytics",
              icon: LineChart,
            },
            {
              title: s.ai.title,
              description: s.ai.description,
              to: "/services/ai",
              icon: BrainCircuit,
            },
          ],
        },
        {
          heading: s.resilience,
          links: [
            {
              title: s.integration.title,
              description: s.integration.description,
              to: "/services/integration",
              icon: Workflow,
            },
            {
              title: s.disasterRecovery.title,
              description: s.disasterRecovery.description,
              to: "/services/disaster-recovery",
              icon: ShieldCheck,
            },
          ],
        },
      ],
      featured: {
        title: s.featured.title,
        description: s.featured.description,
        to: "/services",
        cta: s.featured.cta,
      },
    },
    {
      id: "solutions",
      label: t.nav.solutions,
      overviewTo: "/solutions",
      overviewLabel: sol.overviewLabel,
      columns: [
        {
          heading: sol.byOutcome,
          links: [
            {
              title: sol.cloudMigration.title,
              description: sol.cloudMigration.description,
              to: "/solutions/cloud-migration",
              icon: CloudCog,
            },
            {
              title: sol.devopsTransformation.title,
              description: sol.devopsTransformation.description,
              to: "/solutions/devops-transformation",
              icon: Boxes,
            },
            {
              title: sol.securityCompliance.title,
              description: sol.securityCompliance.description,
              to: "/solutions/security-compliance",
              icon: ShieldCheck,
            },
          ],
        },
        {
          heading: sol.byAudience,
          links: [
            {
              title: sol.startups.title,
              description: sol.startups.description,
              to: "/solutions/startups",
              icon: Rocket,
            },
            {
              title: sol.enterprises.title,
              description: sol.enterprises.description,
              to: "/solutions/enterprises",
              icon: Building2,
            },
          ],
        },
      ],
      featured: {
        title: sol.featured.title,
        description: sol.featured.description,
        to: "/book-demo",
        cta: sol.featured.cta,
      },
    },
    {
      id: "company",
      label: t.nav.company,
      overviewTo: "/about",
      overviewLabel: co.overviewLabel,
      columns: [
        {
          heading: co.aboutUs,
          links: [
            {
              title: co.about.title,
              description: co.about.description,
              to: "/about",
              icon: Building2,
            },
          ],
        },
        {
          heading: co.talkToUs,
          links: [
            {
              title: co.contactSales.title,
              description: co.contactSales.description,
              to: "/contact",
              icon: Cloud,
            },
            {
              title: co.bookDemo.title,
              description: co.bookDemo.description,
              to: "/book-demo",
              icon: Rocket,
            },
          ],
        },
      ],
      featured: {
        title: co.featured.title,
        description: co.featured.description,
        to: "/support",
        cta: co.featured.cta,
      },
    },
  ];
}
