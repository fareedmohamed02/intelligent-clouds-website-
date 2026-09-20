import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/** Calm enterprise loading blocks for marketing pages. */
export function PageHeroSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("container-ic grid gap-10 py-20 lg:grid-cols-2 lg:py-28", className)}>
      <div className="space-y-4">
        <Skeleton className="h-3 w-48 bg-azure-100" />
        <Skeleton className="h-12 w-full max-w-xl bg-border-200/60" />
        <Skeleton className="h-12 w-4/5 max-w-lg bg-border-200/60" />
        <Skeleton className="h-20 w-full max-w-xl bg-border-200/50" />
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-12 w-36 rounded-[12px] bg-border-200/60" />
          <Skeleton className="h-12 w-40 rounded-[12px] bg-border-200/60" />
        </div>
      </div>
      <Skeleton className="min-h-[280px] w-full rounded-[12px] bg-border-200/50" />
    </div>
  );
}

export function CardGridSkeleton({
  count = 6,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="space-y-3 rounded-[12px] border border-border-200 bg-white p-5"
        >
          <Skeleton className="h-10 w-10 rounded-[8px] bg-azure-100" />
          <Skeleton className="h-5 w-2/3 bg-border-200/60" />
          <Skeleton className="h-4 w-full bg-border-200/50" />
          <Skeleton className="h-4 w-5/6 bg-border-200/50" />
        </div>
      ))}
    </div>
  );
}

export function ListSkeleton({
  rows = 5,
  className,
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-[10px] border border-border-200 bg-white p-4"
        >
          <Skeleton className="mt-1 h-4 w-4 shrink-0 rounded-full bg-azure-100" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4 bg-border-200/60" />
            <Skeleton className="h-3 w-full bg-border-200/50" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DocsSidebarSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6", className)}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-3 w-28 bg-border-200/60" />
          <Skeleton className="h-4 w-full bg-border-200/50" />
          <Skeleton className="h-4 w-5/6 bg-border-200/50" />
          <Skeleton className="h-4 w-2/3 bg-border-200/50" />
        </div>
      ))}
    </div>
  );
}
