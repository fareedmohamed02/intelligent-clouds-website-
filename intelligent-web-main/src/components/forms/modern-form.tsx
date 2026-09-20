import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

/** Left content panel + full-bleed right form (or stacked on mobile). */
export function ModernFormSplit({
  aside,
  children,
  className,
}: {
  aside: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid w-full gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-8",
        className,
      )}
    >
      <aside className="min-w-0">{aside}</aside>
      <div className="min-w-0 w-full">{children}</div>
    </div>
  );
}

/** Full-width modern form card shell. */
export function ModernFormCard({
  children,
  className,
  title,
  subtitle,
  icon: Icon,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <div
      className={cn(
        "relative w-full space-y-5 rounded-[16px] border border-border-200 bg-white p-6 shadow-[0_12px_32px_-24px_rgba(4,39,95,0.22)] sm:p-8",
        className,
      )}
    >
      {title ? (
        <div className="flex items-start gap-3 border-b border-border-200 pb-5">
          {Icon ? (
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-orange-500/10 text-orange-500">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
          ) : null}
          <div className="min-w-0">
            <h3 className="font-display text-lg font-semibold text-navy-900">{title}</h3>
            {subtitle ? <div className="mt-1 text-sm text-text-600">{subtitle}</div> : null}
          </div>
        </div>
      ) : null}
      {children}
    </div>
  );
}

/** Label + optional Lucide icon + control + error. */
export function FormField({
  id,
  label,
  icon: Icon,
  children,
  className,
  hint,
  error,
  required,
}: {
  id: string;
  label: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
  hint?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="inline-flex items-center gap-2 text-navy-900">
        {Icon ? <Icon className="h-3.5 w-3.5 text-orange-500" aria-hidden /> : null}
        {label}
        {required ? <span className="text-orange-500">*</span> : null}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-danger">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-text-600">{hint}</p>
      ) : null}
    </div>
  );
}

export const modernControlClass =
  "flex h-12 w-full rounded-[12px] border border-border-200 bg-[#f8fafc] px-3.5 text-sm text-text-900 transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-text-600/80 hover:border-navy-900/20 focus-visible:border-orange-500 focus-visible:bg-white focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_rgba(242,106,19,0.9)]";

export const modernTextareaClass =
  "flex min-h-[120px] w-full rounded-[12px] border border-border-200 bg-[#f8fafc] px-3.5 py-3 text-sm text-text-900 transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-text-600/80 hover:border-navy-900/20 focus-visible:border-orange-500 focus-visible:bg-white focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_rgba(242,106,19,0.9)]";
