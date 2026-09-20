import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/btn relative isolate inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-[12px] text-sm font-medium",
    "transition-[color,border-color,background-color,box-shadow,transform] duration-300 ease-out",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2",
    "active:scale-[0.98]",
    // Soft shine sweep on hover
    "after:pointer-events-none after:absolute after:inset-y-0 after:-start-1/2 after:w-1/2 after:skew-x-[-20deg] after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:opacity-0 after:transition-[transform,opacity] after:duration-500 after:ease-out",
    "hover:after:translate-x-[220%] hover:after:opacity-100",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "border border-orange-500 bg-orange-500 text-white hover:bg-[#e86110] hover:border-[#e86110] hover:shadow-[0_8px_20px_-12px_rgba(242,106,19,0.55)]",
        secondary:
          "border border-navy-900 bg-navy-900 text-white hover:bg-[#031f4d] hover:border-[#031f4d] hover:shadow-[0_8px_20px_-12px_rgba(4,39,95,0.35)]",
        outline:
          "border border-border-200 bg-white text-navy-900 after:via-navy-900/8 hover:border-navy-900/25 hover:bg-surface-50 hover:text-navy-900 hover:shadow-[0_6px_16px_-12px_rgba(4,39,95,0.2)]",
        light:
          "border border-white bg-white text-navy-900 after:via-navy-900/10 hover:bg-white hover:text-navy-900 hover:border-white",
        ghost:
          "border border-transparent text-navy-900 after:via-navy-900/5 hover:bg-surface-50 hover:text-navy-900",
        danger:
          "border border-danger bg-danger text-white hover:brightness-95",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-[10px] px-3",
        lg: "h-12 rounded-[14px] px-8 text-base",
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
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
