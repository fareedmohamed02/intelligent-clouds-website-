import type { HTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

type IcCardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "section" | "li" | "aside";
  interactive?: boolean;
  /** Scroll in/out animation (default true) */
  animateIn?: boolean;
  children: ReactNode;
};

const viewport = { once: true, amount: 0.2, margin: "0px 0px -6% 0px" } as const;

/** Modern enterprise card — accent hover without transforms that blur text. */
export function IcCard({
  as: Comp = "div",
  interactive = false,
  animateIn = true,
  className,
  children,
  ...props
}: IcCardProps) {
  const reduced = usePrefersReducedMotion();
  const classes = cn(
    "group/card rounded-[16px] border border-border-200 bg-white p-5 shadow-[0_1px_0_rgba(4,39,95,0.04)]",
    /* Avoid transform/filter on the text container — they cause fuzzy glyphs on hover */
    interactive &&
      "relative overflow-hidden transition-[border-color,background-color,box-shadow,transform] duration-500 ease-out hover:-translate-y-0.5 hover:border-orange-500/40 hover:shadow-[0_16px_36px_-24px_rgba(4,39,95,0.28)] focus-within:border-orange-500 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:origin-left before:scale-x-0 before:bg-gradient-to-r before:from-orange-500 before:to-[#ff8a3d] before:transition-transform before:duration-500 before:ease-out hover:before:scale-x-100",
    className,
  );

  if (!animateIn || reduced) {
    return (
      <Comp className={classes} {...props}>
        {children}
      </Comp>
    );
  }

  const MotionComp =
    Comp === "article"
      ? motion.article
      : Comp === "section"
        ? motion.section
        : Comp === "li"
          ? motion.li
          : Comp === "aside"
            ? motion.aside
            : motion.div;

  return (
    <MotionComp
      className={classes}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.55, ease: easeOut }}
      {...(props as object)}
    >
      {children}
    </MotionComp>
  );
}
