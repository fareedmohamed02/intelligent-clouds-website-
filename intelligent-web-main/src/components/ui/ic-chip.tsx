import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type IcChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  as?: "button" | "span";
  children: ReactNode;
};

/** Tech/status chip with micro hover. */
export function IcChip({
  active = false,
  as = "button",
  className,
  children,
  type = "button",
  ...props
}: IcChipProps) {
  const classes = cn(
    "inline-flex items-center gap-1.5 rounded-[10px] border px-3 py-2 font-mono text-xs tracking-[0.04em] transition-colors duration-500 ease-out",
    active
      ? "border-orange-500 bg-orange-500/10 text-navy-900"
      : "border-border-200 bg-surface-50 text-navy-900 hover:border-orange-500/45 hover:bg-orange-500/[0.04]",
    as === "button" && "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
    className,
  );

  if (as === "span") {
    return <span className={classes}>{children}</span>;
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
