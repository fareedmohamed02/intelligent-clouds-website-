import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-6 py-10 text-center", className)}>
      <p className="text-sm font-medium text-navy-900">{title}</p>
      {description ? (
        <p className="mx-auto mt-1 max-w-md text-sm text-text-600">{description}</p>
      ) : null}
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  description,
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-[12px] border border-danger/30 bg-white px-6 py-8 text-center">
      <p className="text-sm font-medium text-danger">{title}</p>
      {description ? <p className="mt-1 text-sm text-text-600">{description}</p> : null}
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 text-sm font-medium text-orange-600 hover:underline"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
