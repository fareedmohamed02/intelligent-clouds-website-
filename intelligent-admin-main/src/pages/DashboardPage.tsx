import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarCheck2,
  Inbox,
  LifeBuoy,
  Activity,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch, API_URL } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/i18n";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDateTime } from "@/lib/datetime";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState, ErrorState } from "@/components/EmptyState";
import { AdminPage, AdminPageHeader, AdminPanel } from "@/components/AdminPage";
import { cn } from "@/lib/utils";

type DashboardData = {
  counts: {
    contacts: number;
    bookings: number;
    openTickets: number;
  };
  recent: Array<{
    id: string;
    type: "contact" | "booking" | "ticket";
    title: string;
    subtitle: string;
    status: string;
    createdAt: string;
  }>;
};

type HealthResponse = {
  success: boolean;
  service: string;
  database: string;
  timestamp: string;
};

function greetingForHour(hour: number, t: ReturnType<typeof useI18n>["t"]) {
  if (hour < 12) return t.dashboard.goodMorning;
  if (hour < 17) return t.dashboard.goodAfternoon;
  return t.dashboard.goodEvening;
}

const typeHref: Record<DashboardData["recent"][number]["type"], string> = {
  contact: "/leads/contacts",
  booking: "/leads/bookings",
  ticket: "/support/tickets",
};

const typeMeta: Record<
  DashboardData["recent"][number]["type"],
  { label: string; className: string }
> = {
  contact: {
    label: "Enquiry",
    className: "bg-azure-100 text-navy-900",
  },
  booking: {
    label: "Booking",
    className: "bg-navy-900/10 text-navy-900",
  },
  ticket: {
    label: "Ticket",
    className: "bg-orange-500/10 text-orange-500",
  },
};

export function DashboardPage() {
  const { user } = useAuth();
  const { t } = useI18n();
  const greeting = greetingForHour(new Date().getHours(), t);

  const cardMeta = [
    {
      label: t.dashboard.contactRequests,
      key: "contacts" as const,
      to: "/leads/contacts",
      Icon: Inbox,
      tone: "bg-orange-500/10 text-orange-500",
    },
    {
      label: t.dashboard.bookingRequests,
      key: "bookings" as const,
      to: "/leads/bookings",
      Icon: CalendarCheck2,
      tone: "bg-azure-100 text-navy-900",
    },
    {
      label: t.dashboard.openTickets,
      key: "openTickets" as const,
      to: "/support/tickets",
      Icon: LifeBuoy,
      tone: "bg-navy-900/10 text-navy-900",
    },
  ];

  const dashboard = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await apiFetch<{ success: boolean; data: DashboardData }>(
        "/admin/dashboard",
      );
      return res.data;
    },
  });

  const health = useQuery({
    queryKey: ["api-status"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/status`);
      if (!res.ok) throw new Error("API unreachable");
      return res.json() as Promise<HealthResponse>;
    },
    retry: 1,
  });

  return (
    <AdminPage>
      <AdminPageHeader
        title={`${greeting}${user?.name ? `, ${user.name.split(" ")[0]}` : ""}`}
        description={t.dashboard.description}
      />

      {dashboard.isError ? (
        <ErrorState
          description={
            dashboard.error instanceof Error
              ? dashboard.error.message
              : t.dashboard.loadError
          }
          onRetry={() => void dashboard.refetch()}
        />
      ) : (
        <div className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cardMeta.map((card) => (
            <Link
              key={card.key}
              to={card.to}
              className="group relative w-full overflow-hidden rounded-2xl border border-border-200 bg-white p-5 shadow-[0_1px_0_rgba(4,39,95,0.04)] transition-all hover:border-orange-500/40 hover:shadow-[0_16px_40px_-28px_rgba(4,39,95,0.35)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${card.tone}`}
                >
                  <card.Icon className="h-5 w-5" aria-hidden />
                </span>
                <ArrowUpRight className="h-4 w-4 text-text-600 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="mt-5 text-sm text-text-600">{card.label}</p>
              {dashboard.isLoading ? (
                <Skeleton className="mt-2 h-9 w-16" />
              ) : (
                <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-navy-900">
                  {dashboard.data?.counts[card.key] ?? 0}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}

      <AdminPanel title={t.dashboard.systemStatus}>
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-white">
            <Activity className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium text-navy-900">{t.dashboard.apiHealth}</p>
              {health.isLoading ? (
                <Skeleton className="h-5 w-20" />
              ) : health.isError ? (
                <Badge variant="outline">{t.dashboard.offline}</Badge>
              ) : (
                <Badge variant="success">{health.data?.database}</Badge>
              )}
            </div>
            <p className="mt-1 break-all font-mono text-xs text-text-600">
              {API_URL}/status
            </p>
            {health.data ? (
              <p className="mt-1 text-sm text-text-600">
                {health.data.service} · {formatDateTime(health.data.timestamp)}
              </p>
            ) : null}
            {health.isError ? (
              <p className="mt-2 text-sm text-danger">
                Request blocked or API unreachable. Disable ad blockers for this site, ensure Render
                CORS_ORIGINS includes this admin URL, then refresh.
              </p>
            ) : null}
          </div>
        </div>
      </AdminPanel>

      <AdminPanel
        title={t.dashboard.recentActivity}
        description={t.dashboard.recentActivityDesc}
        noPadding
      >
        {dashboard.isLoading ? (
          <div className="space-y-3 p-5">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (dashboard.data?.recent.length ?? 0) === 0 ? (
          <EmptyState
            title={t.dashboard.noActivity}
            description={t.dashboard.noActivityDesc}
          />
        ) : (
          <ul className="divide-y divide-border-200">
            {(dashboard.data?.recent ?? []).map((item) => {
              const type = typeMeta[item.type];
              return (
                <li key={`${item.type}-${item.id}`}>
                  <Link
                    to={typeHref[item.type]}
                    className="block px-5 py-4 transition-colors hover:bg-[#eef3f8]/70 sm:px-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
                      <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5">
                        <p className="text-sm font-medium text-navy-900">{item.title}</p>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
                            type.className,
                          )}
                        >
                          {type.label}
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <StatusBadge status={item.status} />
                        <span className="text-xs font-bold text-text-600">
                          {formatDateTime(item.createdAt)}
                        </span>
                      </div>
                    </div>
                    {item.subtitle ? (
                      <p className="mt-1 truncate text-xs text-text-600">{item.subtitle}</p>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </AdminPanel>
    </AdminPage>
  );
}
