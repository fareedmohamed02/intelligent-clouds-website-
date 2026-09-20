import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Icon tile — tilt only on card hover (no continuous idle motion). */
export function IcIconTile({
  children,
  className,
  size = "md",
}: {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[10px] bg-orange-500/10 text-orange-500",
        "transition-transform duration-500 ease-out will-change-transform",
        "group-hover/card:rotate-12 group-hover/card:scale-110",
        size === "sm" && "h-8 w-8",
        size === "md" && "h-10 w-10",
        size === "lg" && "h-12 w-12",
        className,
      )}
    >
      <span className="inline-flex transition-transform duration-500 ease-out group-hover/card:-rotate-6">
        {children}
      </span>
    </span>
  );
}
