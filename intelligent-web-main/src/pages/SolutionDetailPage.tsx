import { Link, useParams } from "react-router-dom";
import { useSolution } from "@/hooks/useCms";
import { getSolutionPage } from "@/content/solutions";
import { PageSeo } from "@/components/PageSeo";
import { PageHeroSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { SolutionLongForm } from "@/components/solutions/SolutionLongForm";
import { useI18n } from "@/i18n";

export function SolutionDetailPage() {
  const { slug } = useParams();
  const { locale, t } = useI18n();
  const staticContent = getSolutionPage(slug, locale);
  const { data: cms, isLoading, isError } = useSolution(slug);

  if (!staticContent && isLoading) {
    return <PageHeroSkeleton />;
  }

  if (!staticContent && (isError || !cms)) {
    return (
      <section className="container-ic py-20">
        <h1 className="text-2xl font-semibold text-navy-900">{t.common.notFoundSolution}</h1>
        <Button asChild className="mt-4" variant="secondary">
          <Link to="/solutions">{t.common.backToSolutions}</Link>
        </Button>
      </section>
    );
  }

  if (staticContent) {
    return (
      <>
        <PageSeo
          title={`${staticContent.title} | Intelligent Cloud`}
          description={staticContent.summary}
        />
        <SolutionLongForm
          content={staticContent}
          cmsBodyHtml={locale === "ar" ? undefined : cms?.bodyHtml}
        />
      </>
    );
  }

  return (
    <>
      <PageSeo title={`${cms!.title} | Intelligent Cloud`} description={cms!.summary} />
      <SolutionLongForm
        content={{
          slug: cms!.slug,
          title: cms!.title,
          eyebrow: t.common.solution,
          tagline: cms!.summary,
          summary: cms!.summary,
          iconKey: cms!.pillar,
          kind: "outcome",
          pillar:
            cms!.pillar === "general" ? "migration" : (cms!.pillar as "migration" | "devops" | "security"),
          audiences: cms!.audiences?.includes("startup")
            ? cms!.audiences.includes("enterprise")
              ? ["both"]
              : ["startup"]
            : ["enterprise"],
          ctaLabel: t.common.bookAssessment,
          ctaTo: "/book-demo",
          approachTitle: t.pages.longForm.howWeDeliver,
          approachLead: t.pages.longForm.scopedDuringAssessment,
          metrics: [],
          highlights: (cms!.highlights ?? []).map((h) => ({ title: h, body: h })),
          challenges: [],
          outcomes: [],
          deliverables: [],
          approach: [],
          stack: [],
          useCases: [],
          related: [],
        }}
        cmsBodyHtml={locale === "ar" ? undefined : cms!.bodyHtml}
      />
    </>
  );
}
