import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { easeOut } from "@/lib/motion";

type SuccessDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  className?: string;
};

/**
 * Modal confirmation after enquiry / demo / ticket submit.
 * Replaces toast + inline success cards for those flows.
 */
export function SuccessDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Close",
  className,
}: SuccessDialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open ? (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-navy-950/55 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content asChild>
              <motion.div
                role="alertdialog"
                aria-modal="true"
                className={cn(
                  "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[16px] border border-border-200 bg-white shadow-[0_24px_80px_-24px_rgba(4,39,95,0.45)] outline-none",
                  className,
                )}
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ duration: 0.28, ease: easeOut }}
              >
                <div
                  aria-hidden
                  className="h-1.5 w-full bg-gradient-to-r from-azure-500 via-orange-500 to-azure-500"
                />
                <div className="space-y-5 px-6 pb-2 pt-7 text-center sm:px-8">
                  <motion.div
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/10 text-orange-500 ring-8 ring-orange-500/5"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.08, duration: 0.35, ease: easeOut }}
                  >
                    <CheckCircle2 className="h-8 w-8" strokeWidth={2.25} aria-hidden />
                  </motion.div>
                  <div className="space-y-2">
                    <DialogPrimitive.Title className="font-display text-xl font-semibold tracking-[-0.02em] text-navy-900">
                      {title}
                    </DialogPrimitive.Title>
                    <DialogPrimitive.Description className="text-sm leading-relaxed text-text-600">
                      {description}
                    </DialogPrimitive.Description>
                  </div>
                </div>
                <div className="border-t border-border-200 bg-[#f8fafc] px-6 py-4 sm:px-8">
                  <Button
                    type="button"
                    className="w-full"
                    onClick={() => onOpenChange(false)}
                  >
                    {confirmLabel}
                  </Button>
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        ) : null}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
