import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useService } from "@/hooks/useCms";
import { getServicePage } from "@/content/services";
import { PageSeo } from "@/components/PageSeo";
import { PageHeroSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { ServiceLongForm } from "@/components/services/ServiceLongForm";
import { useI18n } from "@/i18n";
import { absoluteUrl } from "@/lib/seo";

export function ServiceDetailPage() {
  const { slug } = useParams();
  const { locale, t } = useI18n();
  const staticContent = getServicePage(slug, locale);
  const { data: cms, isLoading, isError } = useService(slug);
  const seoContent = staticContent ?? cms;
  const serviceJsonLd = useMemo(() => {
    if (!seoContent) return undefined;
    return {
      "@type": "Service",
      name: seoContent.title,
      description: seoContent.summary,
      url: absoluteUrl(`/services/${seoContent.slug}`),
      provider: { "@id": `${absoluteUrl("/")}#organization` },
    };
  }, [seoContent]);

  // Static registry can render immediately; only wait on CMS when we have no static page
  if (!staticContent && isLoading) {
    return <PageHeroSkeleton />;
  }

  if (!staticContent && (isError || !cms)) {
    return (
      <section className="container-ic py-20">
        <h1 className="text-2xl font-semibold text-navy-900">{t.common.notFoundService}</h1>
        <Button asChild className="mt-4" variant="secondary">
          <Link to="/services">{t.common.backToServices}</Link>
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
          jsonLd={serviceJsonLd}
        />
        <ServiceLongForm
          content={staticContent}
          cmsBodyHtml={locale === "ar" ? undefined : cms?.bodyHtml}
        />
      </>
    );
  }

  // CMS-only fallback (should not happen for mega-menu slugs)
  return (
    <>
      <PageSeo
        title={`${cms!.title} | Intelligent Cloud`}
        description={cms!.summary}
        jsonLd={serviceJsonLd}
      />
      <ServiceLongForm
        content={{
          slug: cms!.slug,
          title: cms!.title,
          eyebrow: t.common.service,
          tagline: cms!.summary,
          summary: cms!.summary,
          iconKey: cms!.iconKey,
          category: "platforms",
          approachTitle: t.pages.longForm.howWeDeliver,
          approachLead: t.pages.longForm.scopedDuringAssessment,
          metrics: [],
          highlights: [],
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
