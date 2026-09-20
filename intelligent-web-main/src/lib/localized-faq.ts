import type { Locale } from "@/i18n/messages";
import type { FaqItem } from "@/lib/types";

/** Pick EN or AR fields from a bilingual FAQ document. */
export function localizedFaq(item: FaqItem, locale: Locale) {
  if (locale === "ar") {
    return {
      question: item.questionAr?.trim() || item.question,
      answerHtml: item.answerHtmlAr?.trim() || item.answerHtml,
    };
  }
  return {
    question: item.question,
    answerHtml: item.answerHtml,
  };
}
