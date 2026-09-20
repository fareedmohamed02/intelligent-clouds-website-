import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

const viewport = { once: true, amount: 0.18, margin: "0px 0px -8% 0px" } as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "up" | "down" | "left" | "right" | "none";
};

function offset(from: RevealProps["from"]) {
  switch (from) {
    case "down":
      return { y: -20 };
    case "left":
      return { x: 24 };
    case "right":
      return { x: -24 };
    case "none":
      return {};
    case "up":
    default:
      return { y: 20 };
  }
}

/** Scroll in/out reveal — opacity + travel only (no blur/filter — keeps text crisp). */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const o = offset(from);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...o }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

export function Stagger({ children, className, stagger = 0.1 }: StaggerProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: 0.06 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  className?: string;
};

export function StaggerItem({ children, className, ...props }: StaggerItemProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: easeOut },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
