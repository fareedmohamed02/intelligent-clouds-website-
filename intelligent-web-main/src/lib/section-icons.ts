import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AlertTriangle,
  Award,
  BadgeCheck,
  Boxes,
  Bug,
  Building2,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Cloud,
  Compass,
  Cpu,
  Database,
  EyeOff,
  FileCheck2,
  FileText,
  FileWarning,
  Flag,
  Gauge,
  GitBranch,
  Globe2,
  Handshake,
  KeyRound,
  Layers,
  LayoutGrid,
  Lightbulb,
  Lock,
  LockKeyhole,
  Map,
  Network,
  Package,
  Rocket,
  Route,
  Settings2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Hexagon,
  Target,
  Timer,
  Unlock,
  Users,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";

/** Rotate distinct Lucide icons for card grids so pages aren't icon-monotone. */
const POOL: LucideIcon[] = [
  Hexagon,
  Layers,
  Shield,
  Cloud,
  Database,
  Network,
  GitBranch,
  Workflow,
  Rocket,
  Target,
  Gauge,
  Lock,
  Boxes,
  Cpu,
  Lightbulb,
  Compass,
  Package,
  Wrench,
  Users,
  Building2,
  Handshake,
  Globe2,
  Flag,
  Award,
  Activity,
  LayoutGrid,
  ClipboardList,
  FileText,
  Map,
  Settings2,
  Timer,
  Zap,
];

export function pickIcon(index: number): LucideIcon {
  return POOL[index % POOL.length]!;
}

/** Section header markers. */
export const ChallengeIcon = ShieldAlert;
export const OutcomeIcon = ShieldCheck;

/** Per-row icons so challenge / outcome lists aren't a column of identical marks. */
const CHALLENGE_POOL: LucideIcon[] = [
  AlertTriangle,
  Unlock,
  FileWarning,
  EyeOff,
  Clock,
  Bug,
  KeyRound,
  GitBranch,
  Network,
  Users,
];

const OUTCOME_POOL: LucideIcon[] = [
  ShieldCheck,
  LockKeyhole,
  FileCheck2,
  Activity,
  Route,
  GitBranch,
  ClipboardCheck,
  BadgeCheck,
  Gauge,
  Target,
];

export function pickChallengeIcon(index: number): LucideIcon {
  return CHALLENGE_POOL[index % CHALLENGE_POOL.length]!;
}

export function pickOutcomeIcon(index: number): LucideIcon {
  return OUTCOME_POOL[index % OUTCOME_POOL.length]!;
}

export const MetricIcons: LucideIcon[] = [Timer, Target, Layers, Gauge, Flag, Award, Activity, Zap];
