import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays, FileText, Scale, Shield } from "lucide-react";
import { getResourcePage, privacy as privacyFallback, terms as termsFallback } from "@/content/resources";
import { ResourceLongForm } from "@/components/resources/ResourceLongForm";
import { useI18n } from "@/i18n";
import { fillTemplate } from "@/lib/validation";
import { IcCard } from "@/components/ui/ic-card";
import { IcIconTile } from "@/components/ui/ic-icon-tile";
import { cn } from "@/lib/utils";

const LAST_UPDATED = "August 14, 2026";
const LAST_UPDATED_AR = "١٤ أغسطس ٢٠٢٦";

type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

type LegalDocumentProps = {
  intro: ReactNode;
  sections: LegalSection[];
  contactEmail: string;
  contactLabel: string;
  sibling: { label: string; to: string };
  updatedLabel: string;
  banner: string;
  onThisPage: string;
  respondHint: string;
};

/** Split body on blank lines; lines starting with `- ` become list items. */
function renderLegalBody(body: string): ReactNode {
  const blocks = body.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);

  return blocks.map((block, blockIndex) => {
    const lines = block.split("\n").map((l) => l.trimEnd()).filter((l) => l.length > 0);
    const listLines = lines.filter((l) => l.startsWith("- "));
    const isList = listLines.length > 0 && listLines.length === lines.length;

    if (isList) {
      return (
        <ul key={blockIndex} className="list-disc space-y-2 ps-5">
          {listLines.map((line, i) => (
            <li key={i}>{line.slice(2).trim()}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={blockIndex}>
        {lines.join(" ")}
      </p>
    );
  });
}

function sectionsFromMessages(
  items: ReadonlyArray<{ id: string; title: string; body: string }>,
): LegalSection[] {
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    body: <div className="space-y-3">{renderLegalBody(item.body)}</div>,
  }));
}

function LegalDocument({
  intro,
  sections,
  contactEmail,
  contactLabel,
  sibling,
  updatedLabel,
  banner,
  onThisPage,
  respondHint,
}: LegalDocumentProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0]?.target.id;
        if (top) setActiveId(top);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [sections]);

  return (
    <section className="border-b border-border-200 bg-[#f8fafc]">
      <div className="container-ic py-12 lg:py-16">
        <div className="mb-10 flex overflow-hidden rounded-[14px] border border-border-200 bg-[#eef3f8]">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3 px-5 py-4 text-sm text-text-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-navy-900">
              <CalendarDays className="h-3.5 w-3.5 text-orange-500" aria-hidden />
              {updatedLabel}
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-border-200 sm:inline" />
            <span>{banner}</span>
          </div>
          <Link
            to={sibling.to}
            className="inline-flex shrink-0 items-center gap-1.5 self-stretch border-s border-border-200 bg-white px-5 text-sm font-medium text-navy-900 transition-colors hover:bg-orange-500 hover:text-white"
          >
            {sibling.label}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6b7a8c]">
              {onThisPage}
            </p>
            <nav className="ic-scroll max-h-[min(70vh,28rem)] space-y-0.5 overflow-y-auto pe-2">
              {sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={cn(
                    "flex items-start gap-2.5 rounded-[8px] px-2.5 py-2 text-sm transition-colors",
                    activeId === section.id
                      ? "bg-azure-100 font-medium text-navy-900"
                      : "text-text-600 hover:bg-[#eef3f8] hover:text-navy-900",
                  )}
                >
                  <span className="mt-0.5 font-mono text-[10px] text-orange-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-snug">{section.title}</span>
                </a>
              ))}
            </nav>
          </aside>

          <article className="min-w-0">
            <div className="mb-10 rounded-[16px] border border-border-200 bg-[#eef3f8]/70 p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <IcIconTile size="sm">
                  <FileText className="h-4 w-4" aria-hidden />
                </IcIconTile>
                <div className="text-base leading-relaxed text-text-600">{intro}</div>
              </div>
            </div>

            <div className="space-y-0 divide-y divide-border-200 rounded-[16px] border border-border-200 bg-white">
              {sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 px-5 py-8 sm:px-8 sm:py-10"
                >
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden
                      className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-navy-900 font-mono text-xs text-white"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-display text-xl font-semibold tracking-[-0.02em] text-navy-900 sm:text-2xl">
                        {section.title}
                      </h2>
                      <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-text-600">
                        {section.body}
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 rounded-[14px] border border-orange-500/20 bg-orange-500/[0.04] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <p className="font-display text-base font-semibold text-navy-900">{contactLabel}</p>
                <p className="mt-1 text-sm text-text-600">{respondHint}</p>
              </div>
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:underline"
              >
                {contactEmail}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function PrivacyPage() {
  const { t, locale } = useI18n();
  const lastUpdated = locale === "ar" ? LAST_UPDATED_AR : LAST_UPDATED;
  const privacyContent = getResourcePage("privacy", locale) ?? privacyFallback;
  const legal = t.pages.legal;
  const sections = useMemo(
    () => sectionsFromMessages(t.pages.privacySections),
    [t.pages.privacySections],
  );

  return (
    <ResourceLongForm
      content={privacyContent}
      heroVisual={
        <IcCard className="overflow-hidden p-0">
          <div className="relative bg-[linear-gradient(145deg,#04275f_0%,#0a3a7a_55%,#124a8c_100%)] p-6 text-white">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 100% 0%, rgba(242,106,19,0.35), transparent 55%)",
              }}
            />
            <div className="relative">
              <IcIconTile size="lg" className="h-14 w-14 rounded-[14px] bg-white/10 text-orange-500">
                <Shield className="h-7 w-7" aria-hidden />
              </IcIconTile>
              <p className="mt-5 font-display text-lg font-semibold">{legal.privacyHeroTitle}</p>
              <p className="mt-2 text-sm text-white/70">
                {fillTemplate(legal.lastUpdated, { date: lastUpdated })}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                {legal.privacyHeroBody}
              </p>
            </div>
          </div>
        </IcCard>
      }
    >
      <LegalDocument
        intro={<p>{legal.privacyIntro}</p>}
        sections={sections}
        contactEmail="privacy@intelligent-cloud.com"
        contactLabel={legal.privacyContactLabel}
        sibling={{ label: legal.termsSibling, to: "/terms" }}
        updatedLabel={fillTemplate(legal.updated, { date: lastUpdated })}
        banner={legal.privacyBanner}
        onThisPage={legal.onThisPage}
        respondHint={legal.respondHint}
      />
    </ResourceLongForm>
  );
}

export function TermsPage() {
  const { t, locale } = useI18n();
  const lastUpdated = locale === "ar" ? LAST_UPDATED_AR : LAST_UPDATED;
  const termsContent = getResourcePage("terms", locale) ?? termsFallback;
  const legal = t.pages.legal;
  const sections = useMemo(
    () => sectionsFromMessages(t.pages.termsSections),
    [t.pages.termsSections],
  );

  return (
    <ResourceLongForm
      content={termsContent}
      heroVisual={
        <IcCard className="overflow-hidden p-0">
          <div className="relative bg-[linear-gradient(145deg,#04275f_0%,#0a3a7a_55%,#124a8c_100%)] p-6 text-white">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 100% 0%, rgba(242,106,19,0.35), transparent 55%)",
              }}
            />
            <div className="relative">
              <IcIconTile size="lg" className="h-14 w-14 rounded-[14px] bg-white/10 text-orange-500">
                <Scale className="h-7 w-7" aria-hidden />
              </IcIconTile>
              <p className="mt-5 font-display text-lg font-semibold">{legal.termsHeroTitle}</p>
              <p className="mt-2 text-sm text-white/70">
                {fillTemplate(legal.lastUpdated, { date: lastUpdated })}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                {legal.termsHeroBody}
              </p>
            </div>
          </div>
        </IcCard>
      }
    >
      <LegalDocument
        intro={<p>{legal.termsIntro}</p>}
        sections={sections}
        contactEmail="legal@intelligent-cloud.com"
        contactLabel={legal.termsContactLabel}
        sibling={{ label: legal.privacySibling, to: "/privacy" }}
        updatedLabel={fillTemplate(legal.updated, { date: lastUpdated })}
        banner={legal.termsBanner}
        onThisPage={legal.onThisPage}
        respondHint={legal.respondHint}
      />
    </ResourceLongForm>
  );
}
