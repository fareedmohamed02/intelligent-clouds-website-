import { CheckCircle2, XCircle } from "lucide-react";
import { SectionShell } from "@/components/ui/section-shell";
import { Reveal } from "@/components/motion/reveal";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import breaksUnderLoad from "@/assets/homepage/what-breaks-under-load.png";
import engineerInstead from "@/assets/homepage/what-we-engineer-instead.png";

export function ProblemSection() {
  const { t } = useI18n();
  const p = t.home.problem;
  const fragile = [
    p.fragile.snowflake,
    p.fragile.manualDeploys,
    p.fragile.costBlind,
    p.fragile.drPlans,
  ];
  const governed = [
    p.governed.landingZones,
    p.governed.gitops,
    p.governed.finops,
    p.governed.rpoRto,
  ];

  return (
    <SectionShell tone="white" eyebrow={p.eyebrow} title={p.title} lead={p.lead}>
      <div className="space-y-10 lg:space-y-14">
        {/* Left image · right text */}
        <Reveal>
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <img
              src={breaksUnderLoad}
              alt={p.fragileTitle}
              width={900}
              height={720}
              className="mx-auto block h-auto w-full max-w-md select-none object-contain lg:max-w-none"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
            <CopyBlock
              label={p.fragileLabel}
              title={p.fragileTitle}
              items={fragile}
              tone="danger"
            />
          </div>
        </Reveal>

        {/* Left text · right image */}
        <Reveal>
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <CopyBlock
              label={p.governedLabel}
              title={p.governedTitle}
              items={governed}
              tone="success"
              className="lg:order-1"
            />
            <img
              src={engineerInstead}
              alt={p.governedTitle}
              width={900}
              height={720}
              className="mx-auto block h-auto w-full max-w-md select-none object-contain lg:order-2 lg:max-w-none"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

function CopyBlock({
  label,
  title,
  items,
  tone,
  className,
}: {
  label: string;
  title: string;
  items: string[];
  tone: "danger" | "success";
  className?: string;
}) {
  const Icon = tone === "danger" ? XCircle : CheckCircle2;

  return (
    <div className={cn("min-w-0", className)}>
      <p
        className={cn(
          "font-mono text-[11px] uppercase tracking-[0.16em]",
          tone === "danger" ? "text-danger" : "text-success",
        )}
      >
        {label}
      </p>
      <h3 className="mt-3 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-tight tracking-[-0.02em] text-navy-900">
        {title}
      </h3>
      <ul className="mt-7 space-y-0">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 border-t border-border-200 py-3.5 text-[15px] leading-relaxed text-text-600 first:border-t-0 first:pt-0"
          >
            <Icon
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0",
                tone === "danger" ? "text-danger/80" : "text-success",
              )}
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
