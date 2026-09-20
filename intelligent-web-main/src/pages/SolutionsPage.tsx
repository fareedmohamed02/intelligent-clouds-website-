import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { listSolutionPages } from "@/content/solutions";
import type { SolutionKind, SolutionPageContent } from "@/content/solutions/types";
import { solutionIcon } from "@/lib/solution-icons";
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
  "cloud-migration",
  "devops-transformation",
  "security-compliance",
  "startups",
  "enterprises",
];

function orderedSolutions(locale: Locale): SolutionPageContent[] {
  return listSolutionPages(locale)
    .slice()
    .sort((a, b) => catalogOrder.indexOf(a.slug) - catalogOrder.indexOf(b.slug));
}

export function SolutionsPage() {
  const { locale, t } = useI18n();
  const c = t.pages.solutionsCatalog;
  const [filter, setFilter] = useState<"all" | SolutionKind | "startup" | "enterprise">("all");

  const filters: Array<{ id: "all" | SolutionKind | "startup" | "enterprise"; label: string }> =
    useMemo(
      () => [
        { id: "all", label: c.filterAll },
        { id: "outcome", label: c.filterByOutcome },
        { id: "audience", label: c.filterByAudience },
        { id: "startup", label: c.filterStartups },
        { id: "enterprise", label: c.filterEnterprises },
      ],
      [c],
    );

  const solutions = useMemo(() => {
    const all = orderedSolutions(locale);
    if (filter === "all") return all;
    if (filter === "outcome" || filter === "audience") {
      return all.filter((s) => s.kind === filter);
    }
    if (filter === "startup") {
      return all.filter(
        (s) => s.audiences.includes("startup") || s.audiences.includes("both") || s.slug === "startups",
      );
    }
    return all.filter(
      (s) =>
        s.audiences.includes("enterprise") ||
        s.audiences.includes("both") ||
        s.slug === "enterprises",
    );
  }, [filter, locale]);

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
            <IcChip key={f.id} active={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label}
            </IcChip>
          ))}
        </div>

        <Stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" stagger={0.07}>
          {solutions.map((solution) => {
            const Icon = solutionIcon(solution.iconKey);
            return (
              <StaggerItem key={solution.slug}>
                <Link to={`/solutions/${solution.slug}`} className="group/card block h-full">
                  <IcCard
                    interactive
                    animateIn={false}
                    className={cn("flex h-full flex-col border-0 p-0 shadow-none")}
                  >
                    <div className="bg-[#eef3f8]/50 px-5 pb-4 pt-5">
                      <div className="flex items-start justify-between gap-3">
                        <IcIconTile size="md">
                          <Icon className="h-5 w-5" aria-hidden />
                        </IcIconTile>
                        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#6b7a8c]">
                          {solution.eyebrow}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="font-display text-lg font-semibold tracking-[-0.02em] text-navy-900">
                        {solution.title}
                      </h2>
                      <p className="mt-2 text-sm font-medium leading-snug text-navy-900/75">
                        {solution.tagline}
                      </p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-text-600">
                        {solution.summary}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500">
                        {c.openSolution}
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
