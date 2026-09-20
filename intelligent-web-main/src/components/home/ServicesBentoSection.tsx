import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useServices } from "@/hooks/useCms";
import { listServicePages } from "@/content/services";
import { serviceIcon } from "@/lib/service-icons";
import { SectionShell } from "@/components/ui/section-shell";
import { CardGridSkeleton } from "@/components/skeletons";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";

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

export function ServicesBentoSection() {
  const { t, locale } = useI18n();
  const s = t.home.servicesBento;
  const { data, isLoading, isError } = useServices();
  const reduced = usePrefersReducedMotion();

  // Static registry is source of unique copy; CMS only fills gaps if a slug is missing
  const staticPages = listServicePages(locale)
    .slice()
    .sort((a, b) => catalogOrder.indexOf(a.slug) - catalogOrder.indexOf(b.slug));
  const cmsBySlug = new Map((data ?? []).map((svc) => [svc.slug, svc]));
  const services =
    staticPages.length > 0
      ? staticPages
      : (data ?? [])
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((svc) => ({
            slug: svc.slug,
            title: svc.title,
            summary: svc.summary,
            tagline: svc.summary,
            iconKey: svc.iconKey,
            eyebrow: s.serviceEyebrow,
          }));

  const showSkeleton = isLoading && staticPages.length === 0;

  return (
    <SectionShell tone="mist" eyebrow={s.eyebrow} title={s.title} lead={s.lead}>
      {showSkeleton ? (
        <CardGridSkeleton count={8} />
      ) : isError && staticPages.length === 0 ? (
        <p className="text-sm text-danger">{s.loadError}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = serviceIcon(service.iconKey);
            const n = String(index + 1).padStart(2, "0");
            const tagline =
              "tagline" in service && service.tagline
                ? service.tagline
                : cmsBySlug.get(service.slug)?.summary ?? service.summary;
            return (
              <motion.div
                key={service.slug}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
                transition={{
                  duration: reduced ? 0 : 0.55,
                  delay: reduced ? 0 : index * 0.06,
                  ease: easeOut,
                }}
              >
                <Link to={`/services/${service.slug}`} className="group/card block h-full">
                  <article
                    className={cn(
                      "relative flex h-full flex-col overflow-hidden rounded-[16px] border border-border-200 bg-white p-6",
                      "transition-[border-color,background-color,box-shadow] duration-500 ease-out",
                      "hover:border-orange-500/35 hover:bg-[#fffaf7]",
                      "hover:shadow-[0_24px_48px_-28px_rgba(4,39,95,0.35)]",
                    )}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-orange-500/0 blur-2xl transition-[background-color] duration-700 group-hover/card:bg-orange-500/15"
                    />

                    <div className="relative flex items-start justify-between gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-orange-500/10 text-orange-500 transition-transform duration-500 ease-out group-hover/card:rotate-12 group-hover/card:scale-110 group-hover/card:bg-orange-500 group-hover/card:text-white">
                        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.16em] text-text-600/70 transition-colors duration-500 group-hover/card:text-orange-500">
                        {n}
                      </span>
                    </div>

                    <h3 className="relative mt-5 font-display text-lg font-semibold tracking-[-0.02em] text-navy-900">
                      {service.title}
                    </h3>
                    <p className="relative mt-2 flex-1 text-sm leading-relaxed text-text-600">
                      {tagline}
                    </p>

                    <span className="relative mt-6 inline-flex h-10 w-10 items-center justify-center self-end rounded-full border border-border-200 bg-surface-50 text-navy-900 transition-all duration-500 ease-out group-hover/card:border-orange-500 group-hover/card:bg-orange-500 group-hover/card:text-white group-hover/card:shadow-[0_10px_24px_-12px_rgba(242,106,19,0.7)]">
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-500 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
                        aria-hidden
                      />
                      <span className="sr-only">
                        {s.viewService} {service.title}
                      </span>
                    </span>
                  </article>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
      <div className="mt-8">
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:underline"
        >
          {s.viewAll} <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </SectionShell>
  );
}
