import { useMemo } from "react";
import { useFaqs } from "@/hooks/useCms";
import { faq as faqFallback, getResourcePage } from "@/content/resources";
import { ResourceLongForm } from "@/components/resources/ResourceLongForm";
import { useI18n } from "@/i18n";
import { SectionShell } from "@/components/ui/section-shell";
import { IcCard } from "@/components/ui/ic-card";
import { ListSkeleton } from "@/components/skeletons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RichHtml } from "@/components/RichHtml";
import { localizedFaq } from "@/lib/localized-faq";

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function FaqPage() {
  const { locale } = useI18n();
  const faqContent = getResourcePage("faq", locale) ?? faqFallback;
  const { data, isLoading, isError } = useFaqs();
  const cmsFaqs = useMemo(
    () =>
      (data ?? []).filter(
        (item) =>
          locale !== "ar" ||
          (Boolean(item.questionAr?.trim()) && Boolean(item.answerHtmlAr?.trim())),
      ),
    [data, locale],
  );

  const faqJsonLd = useMemo(() => {
    if (cmsFaqs.length === 0) return undefined;
    return {
      "@type": "FAQPage",
      mainEntity: cmsFaqs.slice(0, 30).map((item) => {
        const loc = localizedFaq(item, locale);
        return {
          "@type": "Question",
          name: loc.question,
          acceptedAnswer: { "@type": "Answer", text: stripHtml(loc.answerHtml) },
        };
      }),
    };
  }, [cmsFaqs, locale]);

  return (
    <ResourceLongForm content={faqContent} jsonLd={faqJsonLd}>
      <SectionShell
        tone="navyLight"
        eyebrow={locale === "ar" ? "منشور" : "Published"}
        title={locale === "ar" ? "الأسئلة الشائعة" : "Frequently asked questions"}
        lead={
          locale === "ar"
            ? "كل الأسئلة المنشورة من نظام المحتوى."
            : "Every published question, in one place."
        }
      >
        {isLoading ? (
          <ListSkeleton rows={6} />
        ) : isError ? (
          <p className="text-sm text-danger">
            {locale === "ar" ? "تعذر تحميل الأسئلة المنشورة." : "Unable to load published FAQs."}
          </p>
        ) : cmsFaqs.length === 0 ? (
          <IcCard className="bg-white text-center">
            <p className="text-sm text-text-600">
              {locale === "ar"
                ? "لا توجد أسئلة منشورة بعد."
                : "No published FAQs yet."}
            </p>
          </IcCard>
        ) : (
          <IcCard className="p-2 sm:p-4">
            <Accordion type="single" collapsible>
              {cmsFaqs.map((item) => {
                const loc = localizedFaq(item, locale);
                return (
                  <AccordionItem key={item._id} value={item._id}>
                    <AccordionTrigger>{loc.question}</AccordionTrigger>
                    <AccordionContent>
                      <RichHtml html={loc.answerHtml} />
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </IcCard>
        )}
      </SectionShell>
    </ResourceLongForm>
  );
}
