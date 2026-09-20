import * as React from "react";
import { cn, fieldFocusClass } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    data-ic-field=""
    className={cn(
      "flex min-h-[120px] w-full rounded-[8px] border border-border-200 bg-white px-3 py-2 text-sm text-text-900 placeholder:text-text-600 disabled:cursor-not-allowed disabled:opacity-50",
      fieldFocusClass,
      className,
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";
