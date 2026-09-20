import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Package } from "lucide-react";
import type { SolutionPageContent } from "@/content/solutions/types";
import { getSolutionPage } from "@/content/solutions";
import { getSolutionBackground } from "@/content/solutions/backgrounds";
import { ChallengeIcon, OutcomeIcon, pickIcon } from "@/lib/section-icons";
import { ChallengeList, OutcomeList } from "@/components/ChallengeOutcomeList";
import { whatsappExpertUrl } from "@/lib/whatsapp";
import { useI18n } from "@/i18n";
import { Breadcrumbs } from "@/components/PageHero";
import { RichHtml } from "@/components/RichHtml";
import { Button } from "@/components/ui/button";
import { IcCard } from "@/components/ui/ic-card";
import { IcIconTile } from "@/components/ui/ic-icon-tile";
import { SectionShell } from "@/components/ui/section-shell";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { StickyPhotoHero, StickyPhotoHeroBody } from "@/components/StickyPhotoHero";
import { cn } from "@/lib/utils";

type SolutionLongFormProps = {
  content: SolutionPageContent;
  cmsBodyHtml?: string;
};

export function SolutionLongForm({ content, cmsBodyHtml }: SolutionLongFormProps) {
  const { t, locale } = useI18n();
  const lf = t.pages.longForm;
  const title = content.title;
  const summary = content.summary;
  const related = content.related
    .map((slug) => getSolutionPage(slug, locale))
    .filter(Boolean) as SolutionPageContent[];
  const heroBackground = getSolutionBackground(content.slug);
  const photoHero = Boolean(heroBackground);

  const heroCopy = (
    <div
      className={cn(
        "w-full",
        photoHero &&
          "max-w-[60rem] rounded-3xl bg-navy-950/35 p-6 ring-1 ring-white/10 backdrop-blur-md sm:p-9",
      )}
    >
      <Breadcrumbs
        items={[
          { label: t.common.home, to: "/" },
          { label: t.nav.solutions, to: "/solutions" },
          { label: title },
        ]}
        className={
          photoHero
            ? "text-white/65 [&_span.text-navy-900]:text-white [&_a]:text-white/75 [&_a:hover]:text-orange-400"
            : undefined
        }
      />
      <div className="mt-6 w-full max-w-none">
        <p
          className={cn(
            "text-[11px] font-medium uppercase tracking-[0.16em]",
            photoHero ? "text-orange-400/90" : "text-[#6b7a8c]",
          )}
        >
          {content.eyebrow} · {t.common.solution}
        </p>
        <h1
          className={cn(
            "mt-4 max-w-[55rem] font-display text-[clamp(2.15rem,4.6vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]",
            photoHero ? "text-white" : "text-navy-900",
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "mt-4 max-w-[52rem] text-lg font-medium leading-snug sm:text-xl",
            photoHero ? "text-white/85" : "text-navy-900/80",
          )}
        >
          {content.tagline}
        </p>
        <p
          className={cn(
            "mt-4 max-w-[56rem] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.7]",
            photoHero ? "text-white/70" : "text-[#5f6b7a]",
          )}
        >
          {summary}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to={content.ctaTo}>
              {content.ctaLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
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
              {t.common.talkExpert}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );

  const pageBody = (
    <>
      <SectionShell
        tone="white"
        eyebrow={t.common.capabilities}
        title={t.common.whatWeDeliver}
        lead={lf.capabilitiesLeadSolution}
      >
        <Stagger className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" stagger={0.07}>
          {content.highlights.map((h, i) => {
            const Icon = pickIcon(i);
            return (
              <StaggerItem key={h.title}>
                <IcCard interactive className="h-full border-0 shadow-none">
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

      <SectionShell
        tone="soft"
        eyebrow={lf.whyItMatters}
        title={lf.challengesTitle}
        lead={lf.challengesLead}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <IcCard className="h-full border-0 bg-orange-500/[0.03] shadow-none">
            <div className="flex items-center gap-2">
              <ChallengeIcon className="h-4 w-4 text-orange-500" aria-hidden />
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-orange-500">
                {t.common.challenges}
              </p>
            </div>
            <div className="mt-4">
              <ChallengeList items={content.challenges} />
            </div>
          </IcCard>
          <IcCard className="h-full border-0 bg-navy-900/[0.03] shadow-none">
            <div className="flex items-center gap-2">
              <OutcomeIcon className="h-4 w-4 text-navy-900" aria-hidden />
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-navy-900">
                {lf.outcomes}
              </p>
            </div>
            <div className="mt-4">
              <OutcomeList items={content.outcomes} />
            </div>
          </IcCard>
        </div>
      </SectionShell>

      <SectionShell
        tone="white"
        eyebrow={t.common.deliverables}
        title={lf.deliverablesTitle}
        lead={lf.deliverablesLead}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {content.deliverables.map((d, i) => {
            const Icon = pickIcon(i + 4);
            return (
              <IcCard key={d.title} interactive className="h-full border-0 shadow-none">
                <div className="flex items-center gap-3">
                  <IcIconTile size="sm">
                    <Icon className="h-4 w-4" aria-hidden />
                  </IcIconTile>
                  <p className="font-mono text-xs text-orange-500">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-navy-900">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-600">{d.body}</p>
              </IcCard>
            );
          })}
        </div>
      </SectionShell>

      <SectionShell
        tone="soft"
        eyebrow={lf.howWeDeliver}
        title={content.approachTitle}
        lead={content.approachLead}
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {content.approach.map((step, i) => {
            const Icon = pickIcon(i + 10);
            return (
              <IcCard key={step.title} interactive className="h-full border-0 shadow-none">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 font-display text-sm font-semibold text-white">
                    {i + 1}
                  </div>
                  <IcIconTile size="sm">
                    <Icon className="h-4 w-4" aria-hidden />
                  </IcIconTile>
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-navy-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-600">{step.body}</p>
              </IcCard>
            );
          })}
        </div>
        {cmsBodyHtml ? (
          <IcCard className="mt-8 border-0 shadow-none">
            <h3 className="font-display text-lg font-semibold text-navy-900">Approach detail</h3>
            <div className="mt-3">
              <RichHtml html={cmsBodyHtml} />
            </div>
          </IcCard>
        ) : null}
      </SectionShell>

      <SectionShell
        tone="white"
        eyebrow={t.common.useCases}
        title={lf.useCasesTitleSolution}
        lead={lf.useCasesLead}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {content.useCases.map((u, i) => {
            const Icon = pickIcon(i + 16);
            return (
              <IcCard key={u.title} interactive className="flex h-full flex-col border-0 shadow-none">
                <IcIconTile size="sm">
                  <Icon className="h-4 w-4" aria-hidden />
                </IcIconTile>
                <h3 className="mt-3 font-display text-lg font-semibold text-navy-900">{u.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-600">{u.body}</p>
                <p className="mt-5 pt-4 text-sm font-medium text-navy-900">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-orange-500">
                    <Package className="h-3.5 w-3.5" aria-hidden />
                    {t.common.outcome}
                  </span>
                  <span className="mt-1.5 block">{u.outcome}</span>
                </p>
              </IcCard>
            );
          })}
        </div>
      </SectionShell>

      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 80% at 100% 50%, rgba(242,106,19,0.18), transparent 55%), radial-gradient(ellipse 40% 60% at 0% 80%, rgba(67,139,216,0.16), transparent 50%)",
          }}
        />
        <div className="container-ic relative grid gap-10 py-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center lg:gap-14 lg:py-20">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
              {lf.nextStep}
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.75rem,3.2vw,2.35rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-white">
              Ready to scope {title.toLowerCase()} with an engineer?
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/65">
              Book a free assessment, or message us on WhatsApp. Timing is confirmed manually —
              no calendar sync.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to={content.ctaTo}>
                  {content.ctaLabel} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="light">
                <a
                  href={whatsappExpertUrl(t.whatsapp.defaultMessage)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t.common.talkExpert}
                </a>
              </Button>
            </div>
          </div>
          {related.length > 0 ? (
            <div>
              <p className="text-sm font-medium text-white/55">{t.common.relatedSolutions}</p>
              <ul className="mt-4 space-y-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      to={`/solutions/${r.slug}`}
                      className="group/card flex items-center justify-between gap-3 rounded-[12px] border border-white/10 bg-white/[0.04] px-4 py-3 transition-[border-color,background-color] duration-500 hover:border-orange-500/40 hover:bg-orange-500/10"
                    >
                      <span>
                        <span className="block font-display text-sm font-semibold text-white">
                          {r.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-white/50">{r.eyebrow}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-white/40 transition-transform duration-500 group-hover/card:translate-x-1 group-hover/card:text-orange-500" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );

  return (
    <>
      {photoHero && heroBackground ? (
        <StickyPhotoHero src={heroBackground}>{heroCopy}</StickyPhotoHero>
      ) : (
        <div className="relative overflow-hidden bg-white">
          <div className="container-ic relative py-12 lg:py-16">{heroCopy}</div>
        </div>
      )}
      {photoHero ? <StickyPhotoHeroBody>{pageBody}</StickyPhotoHeroBody> : pageBody}
    </>
  );
}
