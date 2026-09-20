import {
  Building2,
  CloudCog,
  Boxes,
  Rocket,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const solutionIconMap: Record<string, LucideIcon> = {
  "cloud-migration": CloudCog,
  "devops-transformation": Boxes,
  "security-compliance": ShieldCheck,
  startups: Rocket,
  enterprises: Building2,
};

export function solutionIcon(iconKey: string): LucideIcon {
  return solutionIconMap[iconKey] ?? CloudCog;
}
