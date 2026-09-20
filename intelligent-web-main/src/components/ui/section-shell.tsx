import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Section surfaces: white, pale blue, or soft azure. */
export type SectionTone = "white" | "navyLight" | "soft" | "mist";

type SectionShellProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  className?: string;
  tone?: SectionTone;
  id?: string;
};

/** white · pale blue (#eef3f8) · soft azure (#d9eaf8). */
const toneBg: Record<SectionTone, string> = {
  white: "bg-white",
  soft: "bg-[#eef3f8]",
  mist: "bg-azure-100",
  navyLight: "bg-[#eef3f8]",
};

const viewport = { once: true, amount: 0.25, margin: "0px 0px -10% 0px" } as const;

/** Label (small) → title (large) → description (medium) + scroll motion. */
export function SectionShell({
  eyebrow,
  title,
  lead,
  children,
  aside,
  className,
  tone = "white",
  id,
}: SectionShellProps) {
  const reduced = usePrefersReducedMotion();

  const header = (
    <div className="max-w-4xl">
      {eyebrow ? (
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#6b7a8c]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-4 font-display text-[clamp(1.85rem,3.8vw,2.75rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-navy-900">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 max-w-2xl text-[clamp(1rem,1.35vw,1.125rem)] leading-[1.7] text-[#5f6b7a]">
          {lead}
        </p>
      ) : null}
      {children && aside ? <div className="mt-10">{children}</div> : null}
    </div>
  );

  return (
    <section id={id} className={cn("section-ic", toneBg[tone], className)}>
      <div className="container-ic">
        <div
          className={cn(
            "grid gap-10",
            aside && "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-12",
          )}
        >
          {reduced ? (
            header
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.65, ease: easeOut }}
            >
              {header}
            </motion.div>
          )}
          {aside ? (
            reduced ? (
              <div className="min-w-0">{aside}</div>
            ) : (
              <motion.div
                className="min-w-0"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewport}
                transition={{ duration: 0.65, delay: 0.1, ease: easeOut }}
              >
                {aside}
              </motion.div>
            )
          ) : null}
        </div>
        {children && !aside ? (
          <div className="section-shell-body mt-12">{children}</div>
        ) : null}
      </div>
    </section>
  );
}
