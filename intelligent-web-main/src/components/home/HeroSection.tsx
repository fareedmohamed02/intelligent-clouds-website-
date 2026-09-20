import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { brand } from "@/lib/assets";
import { whatsappExpertUrl } from "@/lib/whatsapp";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { easeOut } from "@/lib/motion";

function MorphKeywords({
  reduced,
  prefix,
  keywords,
}: {
  reduced: boolean;
  prefix: string;
  keywords: readonly string[];
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || keywords.length <= 1) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % keywords.length), 2800);
    return () => window.clearInterval(timer);
  }, [reduced, keywords.length]);

  const current = keywords[index] ?? keywords[0] ?? "";
  const longest = useMemo(
    () => keywords.reduce((longestValue, value) => (value.length > longestValue.length ? value : longestValue), ""),
    [keywords],
  );

  return (
    <h1 className="mt-2 flex min-h-[2.5rem] max-w-full flex-wrap items-center justify-center gap-x-1.5 text-center font-display text-[clamp(1rem,5vw,1.85rem)] font-semibold tracking-[-0.02em] sm:text-[clamp(1.3rem,2.5vw,1.85rem)]">
      <span className="text-navy-900/75">{prefix}</span>
      <span className="relative inline-grid text-start text-orange-500">
        <span className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden>
          {longest}
        </span>
        <span className="relative col-start-1 row-start-1 h-[1.35em] overflow-hidden whitespace-nowrap">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={current}
              className="absolute inset-x-0 top-0"
              initial={reduced ? false : { y: "85%", opacity: 0, filter: "blur(5px)" }}
              animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
              exit={reduced ? undefined : { y: "-75%", opacity: 0, filter: "blur(5px)" }}
              transition={{ duration: reduced ? 0 : 0.7, ease: easeOut }}
            >
              {current}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </h1>
  );
}

export function HeroSection() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const h = t.home.hero;
  const keywords = useMemo(
    () => [
      h.keywords.finopsGuardrails,
      h.keywords.securityGuardrails,
      h.keywords.costOptimizationGuardrails,
      h.keywords.cloudGovernanceGuardrails,
    ] as const,
    [h.keywords],
  );

  return (
    <section className="relative overflow-hidden border-b border-border-200 bg-linear-to-b from-[#e8f0fb] via-surface-100 to-[#f2f6fc] text-navy-900">
      <div className="container-ic relative mx-auto flex min-h-[34rem] flex-col justify-center py-20 text-center sm:py-24 lg:min-h-[38rem] lg:py-28">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-2 sm:px-4">
          <motion.img
            src={brand.logo}
            alt={t.brand}
            className="mb-4 mt-3 h-28 w-auto sm:h-36"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.42, ease: easeOut }}
          />
          <motion.div
            className="w-full"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.55, ease: easeOut }}
          >
            <MorphKeywords reduced={reduced} prefix={h.weArchitect} keywords={keywords} />
          </motion.div>
          <motion.p
            className="mt-4 max-w-2xl text-[clamp(1.05rem,1.45vw,1.2rem)] leading-[1.7] text-text-600"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.7, ease: easeOut }}
          >
            {h.lead}
          </motion.p>
          <p className="mt-3 max-w-3xl text-sm leading-[1.7] text-text-600 sm:text-base">
            {t.home.intro.description}
          </p>
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-9"
            initial={reduced ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.85, ease: easeOut }}
          >
            <Button asChild size="lg">
              <Link to="/book-demo">
                {t.nav.bookDemo} <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={whatsappExpertUrl(t.whatsapp.defaultMessage)} target="_blank" rel="noreferrer">
                {t.common.talkExpert}
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
