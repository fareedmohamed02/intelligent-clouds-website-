import type { LucideIcon } from "lucide-react";
import { Hash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type ListCountProps = {
  total: number;
  filtered: number;
  singular: string;
  plural?: string;
  filterLabel?: string | null;
  className?: string;
  loading?: boolean;
  icon?: LucideIcon;
};

export function ListCount({
  total,
  filtered,
  singular,
  plural,
  filterLabel,
  className,
  loading,
  icon: Icon = Hash,
}: ListCountProps) {
  const noun = (n: number) => (n === 1 ? singular : (plural ?? `${singular}s`));
  const isFiltered = Boolean(filterLabel && filterLabel !== "all");

  if (loading) {
    return <Skeleton className={cn("h-11 w-40 rounded-xl", className)} />;
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 rounded-xl border border-border-200 bg-white px-3 py-2 shadow-[0_1px_0_rgba(4,39,95,0.04)]",
        className,
      )}
    >
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <div className="min-w-0 leading-tight">
        {isFiltered ? (
          <>
            <p className="text-sm font-semibold text-navy-900">
              {filtered}
              <span className="font-medium text-text-600"> / {total}</span>
            </p>
            <p className="text-[11px] text-text-600">
              {noun(filtered)} · {filterLabel}
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-navy-900">{total}</p>
            <p className="text-[11px] text-text-600">{noun(total)} total</p>
          </>
        )}
      </div>
    </div>
  );
}
