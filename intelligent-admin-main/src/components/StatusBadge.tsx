import type { LucideIcon } from "lucide-react";
import {
  Archive,
  CheckCircle2,
  CircleDot,
  Clock3,
  Eye,
  Sparkles,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type StatusTone = {
  label: string;
  className: string;
  Icon: LucideIcon;
};

const STATUS_MAP: Record<string, StatusTone> = {
  new: {
    label: "New",
    className: "bg-azure-100 text-navy-900",
    Icon: Sparkles,
  },
  reviewed: {
    label: "Reviewed",
    className: "bg-[#e8f0fe] text-blue-600",
    Icon: Eye,
  },
  archived: {
    label: "Archived",
    className: "bg-[#eef1f5] text-text-600",
    Icon: Archive,
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-navy-900/10 text-navy-900",
    Icon: CheckCircle2,
  },
  completed: {
    label: "Completed",
    className: "bg-[#e6f4f1] text-success",
    Icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-danger/10 text-danger",
    Icon: XCircle,
  },
  in_progress: {
    label: "In progress",
    className: "bg-orange-500/10 text-orange-500",
    Icon: Clock3,
  },
  resolved: {
    label: "Resolved",
    className: "bg-[#e6f4f1] text-success",
    Icon: CheckCircle2,
  },
  closed: {
    label: "Closed",
    className: "bg-[#eef1f5] text-text-600",
    Icon: CircleDot,
  },
  published: {
    label: "Published",
    className: "bg-[#e6f4f1] text-success",
    Icon: CheckCircle2,
  },
  draft: {
    label: "Draft",
    className: "border border-border-200 bg-white text-text-600",
    Icon: CircleDot,
  },
};

function resolveStatus(status: string): StatusTone {
  const key = status.trim().toLowerCase();
  return (
    STATUS_MAP[key] ?? {
      label: status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, " "),
      className: "border border-border-200 bg-white text-text-600",
      Icon: CircleDot,
    }
  );
}

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const tone = resolveStatus(status);
  const Icon = tone.Icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        tone.className,
        className,
      )}
    >
      <Icon className="h-3 w-3 shrink-0" aria-hidden />
      {tone.label}
    </span>
  );
}
