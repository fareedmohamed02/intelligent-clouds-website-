import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useServices } from "@/hooks/useCms";
import { listServicePages } from "@/content/services";
import type { ServiceCategory, ServicePageContent } from "@/content/services/types";
import { serviceIcon } from "@/lib/service-icons";
import { PageHero } from "@/components/PageHero";
import { PageSeo } from "@/components/PageSeo";
import { SectionShell } from "@/components/ui/section-shell";
import { IcCard } from "@/components/ui/ic-card";
import { IcChip } from "@/components/ui/ic-chip";
import { IcIconTile } from "@/components/ui/ic-icon-tile";
import { Button } from "@/components/ui/button";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";
import type { Locale } from "@/i18n/messages";

const catalogOrder = [
  "cloud-computing",
  "storage",
  "networking",
  "database",
  "analytics",
  "ai",
  "integration",
  "disaster-recovery",
];

function mergeCatalog(
  cmsBySlug: Map<string, { title?: string; summary?: string }>,
  locale: Locale,
) {
  const staticPages = listServicePages(locale).slice().sort((a, b) => {
    return catalogOrder.indexOf(a.slug) - catalogOrder.indexOf(b.slug);
  });
  return staticPages.map((page) => {
    const cms = cmsBySlug.get(page.slug);
    // Prefer static (locale-aware) copy; CMS only fills empty gaps
    return {
      ...page,
      title: page.title || cms?.title || page.title,
      summary: page.summary || cms?.summary || page.summary,
    } satisfies ServicePageContent;
  });
}

export function ServicesPage() {
  const { locale, t } = useI18n();
  const c = t.pages.servicesCatalog;
  const { data: cmsServices } = useServices();
  const [filter, setFilter] = useState<"all" | ServiceCategory>("all");

  const filters: Array<{ id: "all" | ServiceCategory; label: string }> = useMemo(
    () => [
      { id: "all", label: c.filterAll },
      { id: "platforms", label: c.filterPlatforms },
      { id: "data", label: c.filterDataAi },
      { id: "resilience", label: c.filterResilience },
    ],
    [c],
  );

  const services = useMemo(() => {
    const cmsBySlug = new Map(
      (cmsServices ?? []).map((s) => [s.slug, { title: s.title, summary: s.summary }]),
    );
    const all = mergeCatalog(cmsBySlug, locale);
    if (filter === "all") return all;
    return all.filter((s) => s.category === filter);
  }, [cmsServices, filter, locale]);

  return (
    <>
      <PageSeo title={c.seoTitle} description={c.seoDescription} />
      <PageHero eyebrow={c.eyebrow} title={c.title} description={c.description} />

      <SectionShell
        tone="soft"
        eyebrow={c.catalogEyebrow}
        title={c.catalogTitle}
        lead={c.catalogLead}
      >
        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <IcChip
              key={f.id}
              active={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </IcChip>
          ))}
        </div>

        <Stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" stagger={0.07}>
          {services.map((service) => {
            const Icon = serviceIcon(service.iconKey);
            return (
              <StaggerItem key={service.slug}>
                <Link to={`/services/${service.slug}`} className="group/card block h-full">
                  <IcCard
                    interactive
                    animateIn={false}
                    className={cn(
                      "flex h-full flex-col p-0",
                      "transition-[border-color,box-shadow] duration-500",
                    )}
                  >
                    <div className="border-b border-border-200 bg-[#eef3f8]/50 px-5 pb-4 pt-5">
                      <div className="flex items-start justify-between gap-3">
                        <IcIconTile size="md">
                          <Icon className="h-5 w-5" aria-hidden />
                        </IcIconTile>
                        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#6b7a8c]">
                          {service.eyebrow}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="font-display text-lg font-semibold tracking-[-0.02em] text-navy-900">
                        {service.title}
                      </h2>
                      <p className="mt-2 text-sm font-medium leading-snug text-navy-900/75">
                        {service.tagline}
                      </p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-text-600">
                        {service.summary}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500">
                        {c.openService}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                      </span>
                    </div>
                  </IcCard>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </SectionShell>

      <section className="section-ic bg-[#eef3f8]">
        <div className="container-ic">
          <IcCard className="bg-white p-8 text-center sm:p-10">
            <p className="font-display text-xl font-semibold text-navy-900">{c.ctaTitle}</p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-text-600">
              {c.ctaLead}
            </p>
            <Button asChild className="mt-6">
              <Link to="/book-demo">
                {c.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </IcCard>
        </div>
      </section>
    </>
  );
}
