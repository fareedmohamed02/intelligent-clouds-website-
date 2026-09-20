import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import type { CompanyPageContent } from "@/content/company/types";
import { pickIcon } from "@/lib/section-icons";
import { whatsappExpertUrl } from "@/lib/whatsapp";
import { useI18n } from "@/i18n";
import { Breadcrumbs } from "@/components/PageHero";
import { PageSeo } from "@/components/PageSeo";
import { Button } from "@/components/ui/button";
import { IcCard } from "@/components/ui/ic-card";
import { IcIconTile } from "@/components/ui/ic-icon-tile";
import { SectionShell } from "@/components/ui/section-shell";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { StickyPhotoHero, StickyPhotoHeroBody } from "@/components/StickyPhotoHero";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CompanyLongFormProps = {
  content: CompanyPageContent;
  /** Optional mark / visual in the hero card */
  heroVisual?: ReactNode;
  /** Optional full-bleed hero photo (cover). Enables a photo hero treatment. */
  heroBackground?: string;
  /** Content between principles and CTA (forms, partner logos, etc.) */
  children?: ReactNode;
  /** Optional section inserted after highlights */
  afterHighlights?: ReactNode;
  /** Opt-in overview blocks — off by default so pages stay lean */
  showHighlights?: boolean;
  showPrinciples?: boolean;
  highlightsTitle?: string;
  principlesTitle?: string;
};

export function CompanyLongForm({
  content,
  heroVisual,
  heroBackground,
  children,
  afterHighlights,
  showHighlights = false,
  showPrinciples = false,
  highlightsTitle,
  principlesTitle,
}: CompanyLongFormProps) {
  const { t } = useI18n();
  const resolvedHighlightsTitle = highlightsTitle ?? t.common.highlights;
  const resolvedPrinciplesTitle = principlesTitle ?? t.common.howWeWork;
  const photoHero = Boolean(heroBackground);

  const heroCopy = (
    <>
      <Breadcrumbs
        items={[
          { label: t.common.home, to: "/" },
          { label: t.common.company, to: "/about" },
          { label: content.title },
        ]}
        className={
          photoHero
            ? "text-white/65 [&_span.text-navy-900]:text-white [&_a]:text-white/75 [&_a:hover]:text-orange-400"
            : undefined
        }
      />
      <div
        className={cn(
          "grid items-center gap-10",
          (heroVisual || !photoHero) &&
            "lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]",
          photoHero && !heroVisual && "max-w-[60rem]",
        )}
      >
        <div
          className={cn(
            photoHero &&
              "rounded-3xl bg-navy-950/35 p-6 ring-1 ring-white/10 backdrop-blur-md sm:p-9",
          )}
        >
          <p
            className={cn(
              "text-[11px] font-medium uppercase tracking-[0.16em]",
              photoHero ? "text-orange-400/90" : "text-[#6b7a8c]",
            )}
          >
            {content.eyebrow}
          </p>
          <h1
            className={cn(
              "mt-4 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.12] tracking-[-0.03em]",
              photoHero ? "text-white" : "text-navy-900",
            )}
          >
            {content.title}
          </h1>
          <p
            className={cn(
              "mt-3 max-w-2xl text-lg font-medium leading-snug",
              photoHero ? "text-white/85" : "text-navy-900/80",
            )}
          >
            {content.tagline}
          </p>
          <p
            className={cn(
              "mt-4 max-w-2xl text-[clamp(1rem,1.35vw,1.125rem)] leading-[1.7]",
              photoHero ? "text-white/70" : "text-[#5f6b7a]",
            )}
          >
            {content.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to={content.ctaPrimary.to}>
                {content.ctaPrimary.label} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            {content.ctaSecondary ? (
              <Button
                asChild
                size="lg"
                variant="outline"
                className={
                  photoHero
                    ? "border-white/35 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                    : undefined
                }
              >
                <Link to={content.ctaSecondary.to}>{content.ctaSecondary.label}</Link>
              </Button>
            ) : (
              <Button
                asChild
                size="lg"
                variant="outline"
                className={
                  photoHero
                    ? "border-white/35 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                    : undefined
                }
              >
                <a
                  href={whatsappExpertUrl(t.whatsapp.defaultMessage)}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp an expert
                </a>
              </Button>
            )}
          </div>
        </div>
        {heroVisual ? (
          <div className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">{heroVisual}</div>
        ) : !photoHero ? (
          <IcCard className="mx-auto w-full max-w-md p-6 lg:mx-0 lg:justify-self-end">
            <Stagger className="grid gap-3 sm:grid-cols-2" stagger={0.06}>
              {content.metrics.map((m) => (
                <StaggerItem key={m.label}>
                  <div className="rounded-[10px] border border-border-200 bg-[#eef3f8]/80 p-4">
                    <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#6b7a8c]">
                      {m.label}
                    </p>
                    <p className="mt-2 font-display text-base font-semibold text-navy-900">
                      {m.value}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </IcCard>
        ) : null}
      </div>
    </>
  );

  const pageBody = (
    <>
      {showHighlights ? (
      <SectionShell tone="white" eyebrow={t.common.context} title={resolvedHighlightsTitle}>
        <Stagger className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" stagger={0.07}>
          {content.highlights.map((h, i) => {
            const Icon = pickIcon(i);
            return (
              <StaggerItem key={h.title}>
                <IcCard interactive className="h-full">
                  <div className="flex items-start gap-3">
                    <IcIconTile size="sm">
                      <Icon className="h-4 w-4" aria-hidden />
                    </IcIconTile>
                    <div>
                      <h3 className="font-display text-base font-semibold text-navy-900">{h.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-600">{h.body}</p>
                    </div>
                  </div>
                </IcCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </SectionShell>
      ) : null}

      {afterHighlights}

      {showPrinciples ? (
      <SectionShell tone="soft" eyebrow={t.common.principles} title={resolvedPrinciplesTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {content.principles.map((p, i) => {
            const Icon = pickIcon(i + 8);
            return (
              <IcCard key={p.title} interactive className="h-full">
                <div className="flex items-center gap-3">
                  <IcIconTile size="sm">
                    <Icon className="h-4 w-4" aria-hidden />
                  </IcIconTile>
                  <p className="font-mono text-xs text-orange-500">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-navy-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-600">{p.body}</p>
              </IcCard>
            );
          })}
        </div>
      </SectionShell>
      ) : null}

      {children}

      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 80% at 100% 50%, rgba(242,106,19,0.18), transparent 55%), radial-gradient(ellipse 40% 60% at 0% 80%, rgba(67,139,216,0.16), transparent 50%)",
          }}
        />
        <div className="container-ic relative py-16 lg:py-20">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
            Next step
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.75rem,3.2vw,2.35rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-white">
            {content.ctaTitle}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/65">{content.ctaLead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to={content.ctaPrimary.to}>
                {content.ctaPrimary.label} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            {content.ctaSecondary ? (
              <Button
                asChild
                size="lg"
                variant="light"
              >
                <Link to={content.ctaSecondary.to}>{content.ctaSecondary.label}</Link>
              </Button>
            ) : (
              <Button
                asChild
                size="lg"
                variant="light"
              >
                <a
                  href={whatsappExpertUrl(t.whatsapp.defaultMessage)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );

  return (
    <>
      <PageSeo
        title={`${content.title} | Intelligent Cloud`}
        description={content.summary}
      />

      {photoHero && heroBackground ? (
        <StickyPhotoHero src={heroBackground} objectPosition="object-[center_35%]">
          {heroCopy}
        </StickyPhotoHero>
      ) : (
        <div className="relative overflow-hidden border-b border-border-200 bg-[#eef3f8]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(ellipse 50% 60% at 90% 20%, rgba(242,106,19,0.12), transparent 55%), radial-gradient(ellipse 40% 50% at 10% 80%, rgba(67,139,216,0.12), transparent 50%)",
            }}
          />
          <div className="container-ic relative py-12 lg:py-16">{heroCopy}</div>
        </div>
      )}

      {photoHero ? <StickyPhotoHeroBody>{pageBody}</StickyPhotoHeroBody> : pageBody}
    </>
  );
}
