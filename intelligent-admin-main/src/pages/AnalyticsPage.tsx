import { useState } from "react";
import {
  Eye,
  FileText,
  Globe2,
  Users,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState, ErrorState } from "@/components/EmptyState";
import { AdminPage, AdminPageHeader } from "@/components/AdminPage";

type AnalyticsRange = "today" | "7d" | "30d" | "total";

type AnalyticsSummary = {
  range: AnalyticsRange;
  visits: number;
  uniqueVisitors: number;
  countriesTracked: number;
  topCountries: Array<{ country: string; count: number }>;
  topPages: Array<{ path: string; count: number }>;
};

function countryName(code: string, unknownLabel: string) {
  if (!code || code === "XX") return unknownLabel;
  try {
    return (
      new Intl.DisplayNames(undefined, { type: "region" }).of(code) ?? code
    );
  } catch {
    return code;
  }
}

export function AnalyticsPage() {
  const { t } = useI18n();
  const [range, setRange] = useState<AnalyticsRange>("7d");

  const ranges: Array<{ id: AnalyticsRange; label: string }> = [
    { id: "today", label: t.analytics.rangeToday },
    { id: "7d", label: t.analytics.range7d },
    { id: "30d", label: t.analytics.range30d },
    { id: "total", label: t.analytics.rangeTotal },
  ];

  const analytics = useQuery({
    queryKey: ["admin-analytics", range],
    queryFn: async () => {
      const res = await apiFetch<{ success: boolean; data: AnalyticsSummary }>(
        `/admin/analytics/summary?range=${range}`,
      );
      return res.data;
    },
  });

  const kpis = [
    {
      key: "visits",
      label: t.analytics.visits,
      value: analytics.data?.visits,
      Icon: Eye,
      tone: "bg-azure-100 text-navy-900",
      hint: t.analytics.visitsHint,
    },
    {
      key: "uniques",
      label: t.analytics.uniqueVisitors,
      value: analytics.data?.uniqueVisitors,
      Icon: Users,
      tone: "bg-orange-500/10 text-orange-500",
      hint: t.analytics.uniqueHint,
    },
    {
      key: "countries",
      label: t.analytics.countries,
      value: analytics.data?.countriesTracked,
      Icon: Globe2,
      tone: "bg-navy-900/10 text-navy-900",
      hint: t.analytics.countriesHint,
    },
    {
      key: "pages",
      label: t.analytics.pagesTracked,
      value: analytics.data?.topPages.length,
      Icon: FileText,
      tone: "bg-success/10 text-success",
      hint: t.analytics.pagesHint,
    },
  ];

  return (
    <AdminPage>
      <AdminPageHeader
        title={t.analytics.title}
        description={t.analytics.description}
        actions={
          <div
            className="inline-flex rounded-xl border border-border-200 bg-white p-1 shadow-[0_1px_0_rgba(4,39,95,0.04)]"
            role="tablist"
            aria-label={t.analytics.rangeLabel}
          >
            {ranges.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={range === item.id}
                onClick={() => setRange(item.id)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  range === item.id
                    ? "bg-navy-900 text-white shadow-sm"
                    : "text-text-600 hover:bg-[#eef3f8] hover:text-navy-900",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        }
      />

      {analytics.isError ? (
        <ErrorState
          description={
            analytics.error instanceof Error
              ? analytics.error.message
              : t.dashboard.loadError
          }
          onRetry={() => void analytics.refetch()}
        />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((kpi) => (
              <div
                key={kpi.key}
                className="group relative overflow-hidden rounded-2xl border border-border-200 bg-white p-5 shadow-[0_1px_0_rgba(4,39,95,0.04)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "inline-flex h-11 w-11 items-center justify-center rounded-xl",
                      kpi.tone,
                    )}
                  >
                    <kpi.Icon className="h-5 w-5" aria-hidden />
                  </span>
                </div>
                <p className="mt-5 text-sm text-text-600">{kpi.label}</p>
                {analytics.isLoading ? (
                  <Skeleton className="mt-2 h-9 w-16" />
                ) : (
                  <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-navy-900">
                    {kpi.value ?? 0}
                  </p>
                )}
                <p className="mt-2 text-xs text-text-600">{kpi.hint}</p>
              </div>
            ))}
          </div>

          {!analytics.isLoading && (analytics.data?.visits ?? 0) === 0 ? (
            <EmptyState
              title={t.dashboard.noTraffic}
              description={t.dashboard.noTrafficDesc}
            />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              <section className="overflow-hidden rounded-2xl border border-border-200 bg-white shadow-[0_1px_0_rgba(4,39,95,0.04)]">
                <div className="flex items-center gap-3 border-b border-border-200 px-5 py-4">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                    <Globe2 className="h-4 w-4" aria-hidden />
                  </span>
                  <div>
                    <h2 className="font-display text-base font-semibold text-navy-900">
                      {t.dashboard.topCountries}
                    </h2>
                    <p className="text-xs text-text-600">{t.analytics.byVisits}</p>
                  </div>
                </div>
                <div className="p-5">
                  {analytics.isLoading ? (
                    <div className="space-y-3">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ) : (analytics.data?.topCountries.length ?? 0) === 0 ? (
                    <p className="text-sm text-text-600">{t.dashboard.unknownCountry}</p>
                  ) : (
                    <ul className="space-y-3">
                      {(analytics.data?.topCountries ?? []).map((row, index) => (
                        <li key={row.country}>
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-3">
                              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#eef3f8] font-mono text-[11px] text-navy-900">
                                {index + 1}
                              </span>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-navy-900">
                                  {countryName(row.country, t.dashboard.unknownCountry)}
                                </p>
                                <p className="font-mono text-[11px] text-text-600">
                                  {row.country}
                                </p>
                              </div>
                            </div>
                            <span className="shrink-0 rounded-full bg-[#eef3f8] px-2.5 py-1 font-mono text-xs text-navy-900">
                              {row.count}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>

              <section className="overflow-hidden rounded-2xl border border-border-200 bg-white shadow-[0_1px_0_rgba(4,39,95,0.04)]">
                <div className="flex items-center gap-3 border-b border-border-200 px-5 py-4">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-azure-100 text-navy-900">
                    <FileText className="h-4 w-4" aria-hidden />
                  </span>
                  <div>
                    <h2 className="font-display text-base font-semibold text-navy-900">
                      {t.dashboard.topPages}
                    </h2>
                    <p className="text-xs text-text-600">{t.analytics.byVisits}</p>
                  </div>
                </div>
                <div className="p-5">
                  {analytics.isLoading ? (
                    <div className="space-y-3">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ) : (analytics.data?.topPages.length ?? 0) === 0 ? (
                    <p className="text-sm text-text-600">{t.dashboard.noTraffic}</p>
                  ) : (
                    <ul className="space-y-3">
                      {(analytics.data?.topPages ?? []).map((row, index) => (
                        <li key={row.path}>
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-3">
                              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#eef3f8] font-mono text-[11px] text-navy-900">
                                {index + 1}
                              </span>
                              <p className="truncate font-mono text-sm text-navy-900">
                                {row.path}
                              </p>
                            </div>
                            <span className="shrink-0 rounded-full bg-[#eef3f8] px-2.5 py-1 font-mono text-xs text-navy-900">
                              {row.count}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            </div>
          )}
        </>
      )}
    </AdminPage>
  );
}
