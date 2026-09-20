import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";
import type { Messages } from "@/i18n/messages";

type Crumb = { label: string; to?: string };

function labelsFromMessages(t: Messages): Record<string, string> {
  return {
    "": t.breadcrumbs.dashboard,
    analytics: t.breadcrumbs.analytics,
    leads: t.breadcrumbs.leads,
    contacts: t.breadcrumbs.contacts,
    bookings: t.breadcrumbs.bookings,
    content: t.breadcrumbs.content,
    faqs: t.breadcrumbs.faqs,
    support: t.breadcrumbs.support,
    tickets: t.breadcrumbs.tickets,
    settings: t.breadcrumbs.settings,
  };
}

function labelFor(segment: string, labels: Record<string, string>) {
  if (labels[segment]) return labels[segment];
  // Mongo-style object ids → softer crumb label
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function buildBreadcrumbs(
  pathname: string,
  labels: Record<string, string>,
  dashboardLabel: string,
): Crumb[] {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) {
    return [{ label: dashboardLabel }];
  }

  const crumbs: Crumb[] = [{ label: dashboardLabel, to: "/" }];
  let path = "";

  for (let i = 0; i < parts.length; i++) {
    const segment = parts[i]!;
    path += `/${segment}`;
    const isLast = i === parts.length - 1;
    crumbs.push({
      label: labelFor(segment, labels),
      to: isLast ? undefined : path,
    });
  }

  return crumbs;
}

export function AdminBreadcrumbs({ className }: { className?: string }) {
  const { pathname } = useLocation();
  const { t } = useI18n();
  const labels = labelsFromMessages(t);
  const crumbs = buildBreadcrumbs(pathname, labels, t.breadcrumbs.dashboard);

  return (
    <nav aria-label="Breadcrumb" className={cn("w-full", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={`${crumb.label}-${index}`} className="inline-flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-text-600/70 rtl:rotate-180" aria-hidden />
              ) : null}
              {crumb.to && !isLast ? (
                <Link
                  to={crumb.to}
                  className="text-text-600 transition-colors hover:text-navy-900"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-medium text-navy-900">{crumb.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
