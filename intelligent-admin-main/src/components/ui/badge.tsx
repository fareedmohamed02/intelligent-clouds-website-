import * as React from "react";
import { cn } from "@/lib/utils";

export const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "outline" | "success" }
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-[8px] px-2.5 py-0.5 text-xs font-medium",
      variant === "default" && "bg-azure-100 text-navy-900",
      variant === "outline" && "border border-border-200 text-text-600",
      variant === "success" && "bg-[#e6f4f1] text-success",
      className,
    )}
    {...props}
  />
));
Badge.displayName = "Badge";
