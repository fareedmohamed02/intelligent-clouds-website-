import * as React from "react";
import { cn, fieldFocusClass } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    data-ic-field=""
    className={cn(
      "flex h-11 w-full rounded-[8px] border border-border-200 bg-white px-3 py-2 text-sm text-text-900 placeholder:text-text-600 disabled:cursor-not-allowed disabled:opacity-50",
      fieldFocusClass,
      className,
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";
