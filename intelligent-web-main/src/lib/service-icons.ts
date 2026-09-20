import {
  BarChart3,
  Brain,
  Cable,
  Cloud,
  Database,
  HardDrive,
  Network,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

const serviceIconMap: Record<string, LucideIcon> = {
  "cloud-computing": Cloud,
  storage: HardDrive,
  networking: Network,
  database: Database,
  analytics: BarChart3,
  ai: Brain,
  integration: Cable,
  "disaster-recovery": ShieldAlert,
};

export function serviceIcon(iconKey: string): LucideIcon {
  return serviceIconMap[iconKey] ?? Cloud;
}
