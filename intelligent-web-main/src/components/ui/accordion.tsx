import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b border-border-200", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group/acc flex flex-1 items-center justify-between gap-4 py-4 text-start text-base font-medium text-navy-900 transition-colors duration-500 ease-out",
          "hover:text-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500",
          className,
        )}
        {...props}
      >
        <span className="min-w-0">{children}</span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border-200 bg-surface-50 text-text-600 transition-all duration-500 ease-out group-hover/acc:border-orange-500/40 group-hover/acc:text-orange-500 group-data-[state=open]/acc:border-orange-500/40 group-data-[state=open]/acc:bg-orange-500/10 group-data-[state=open]/acc:text-orange-500">
          <ChevronDown
            className="h-4 w-4 transition-transform duration-500 ease-out group-data-[state=open]/acc:rotate-180"
            aria-hidden
          />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        "overflow-hidden text-sm text-text-600",
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      )}
      {...props}
    >
      <div
        className={cn(
          "pb-5 pt-0 leading-relaxed transition-opacity duration-500",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}
