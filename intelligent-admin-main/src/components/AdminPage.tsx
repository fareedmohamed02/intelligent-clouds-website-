import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Full-width admin page shell. */
export function AdminPage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("w-full space-y-6", className)}>{children}</div>;
}

/** Page title row with optional actions — always full width. */
export function AdminPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-navy-900">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 max-w-3xl text-sm text-text-600">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

/** Full-width white panel used for tables and forms. */
export function AdminPanel({
  children,
  className,
  title,
  description,
  actions,
  noPadding,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  actions?: ReactNode;
  noPadding?: boolean;
}) {
  return (
    <section
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-border-200 bg-white shadow-[0_1px_0_rgba(4,39,95,0.04)]",
        className,
      )}
    >
      {title ? (
        <div className="flex flex-col gap-3 border-b border-border-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="min-w-0">
            <h2 className="font-display text-base font-semibold text-navy-900">{title}</h2>
            {description ? <p className="mt-0.5 text-sm text-text-600">{description}</p> : null}
          </div>
          {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
        </div>
      ) : null}
      <div className={cn(!noPadding && "p-5 sm:p-6")}>{children}</div>
    </section>
  );
}
