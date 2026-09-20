import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-orange-500 text-white hover:bg-[#d95c0f]",
        secondary:
          "bg-transparent text-navy-900 border border-navy-900 hover:bg-navy-900 hover:text-white",
        ghost: "hover:bg-azure-100 text-navy-900",
        outline: "border border-border-200 bg-white hover:bg-surface-50 text-text-900",
        danger: "bg-danger text-white hover:opacity-90",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-[8px] px-3",
        lg: "h-12 rounded-[12px] px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
