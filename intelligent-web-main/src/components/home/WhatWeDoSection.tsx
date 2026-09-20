import { SectionShell } from "@/components/ui/section-shell";
import { Reveal } from "@/components/motion/reveal";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import cloudMigrationArt from "@/assets/homepage/cloud-migration.png";
import platformEngineeringArt from "@/assets/homepage/platform-engineering.png";
import securityOperationsArt from "@/assets/homepage/security-operations.png";

export function WhatWeDoSection() {
  const { t } = useI18n();
  const w = t.home.whatWeDo;

  const capabilities = [
    {
      id: "migrate",
      title: w.migrate.title,
      art: cloudMigrationArt,
      points: [
        w.migrate.points.wavePlanning,
        w.migrate.points.cutover,
        w.migrate.points.rpoRto,
        w.migrate.points.hybrid,
      ],
    },
    {
      id: "platform",
      title: w.platform.title,
      art: platformEngineeringArt,
      points: [
        w.platform.points.terraform,
        w.platform.points.aksEks,
        w.platform.points.gitops,
        w.platform.points.cicd,
        w.platform.points.selfService,
      ],
    },
    {
      id: "secure",
      title: w.secure.title,
      art: securityOperationsArt,
      points: [
        w.secure.points.iam,
        w.secure.points.waf,
        w.secure.points.slo,
        w.secure.points.incident,
      ],
    },
  ] as const;

  return (
    <SectionShell
      tone="soft"
      eyebrow={w.eyebrow}
      title={w.title}
      lead={w.lead}
      className="[&_.section-shell-body]:mt-8 lg:[&_.section-shell-body]:mt-10"
    >
      <div className="grid gap-10 md:grid-cols-3 md:gap-0">
        {capabilities.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.08}>
            <article
              className={cn(
                "group flex h-full flex-col md:px-6 lg:px-8",
                i > 0 && "md:border-s md:border-navy-900/8",
              )}
            >
              <p className="font-mono text-[11px] tracking-[0.16em] text-navy-900/35">
                {String(i + 1).padStart(2, "0")}
              </p>
              <img
                src={c.art}
                alt={c.title}
                width={640}
                height={480}
                className="mx-auto mt-3 block h-auto w-full max-w-60 select-none object-contain mix-blend-multiply md:max-w-68 lg:max-w-none"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <h3 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em] text-navy-900 transition-colors duration-300 group-hover:text-orange-500">
                {c.title}
              </h3>
              <ul className="mt-4 flex-1 space-y-2.5">
                {c.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2.5 text-sm leading-relaxed text-text-600"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-orange-500/70"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
