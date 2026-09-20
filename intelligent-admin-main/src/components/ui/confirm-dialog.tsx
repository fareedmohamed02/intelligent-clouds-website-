import type { ReactNode } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  LogOut,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ConfirmTone = "danger" | "warning" | "neutral" | "signout" | "edit";

type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  tone?: ConfirmTone;
  icon?: ReactNode;
  onConfirm: () => void;
};

const toneStyles: Record<
  ConfirmTone,
  { wrap: string; icon: ReactNode; button: "danger" | "default" | "secondary" }
> = {
  danger: {
    wrap: "bg-danger/10 text-danger",
    icon: <Trash2 className="h-5 w-5" />,
    button: "danger",
  },
  warning: {
    wrap: "bg-orange-500/10 text-orange-500",
    icon: <AlertTriangle className="h-5 w-5" />,
    button: "default",
  },
  neutral: {
    wrap: "bg-navy-900/10 text-navy-900",
    icon: <CheckCircle2 className="h-5 w-5" />,
    button: "default",
  },
  signout: {
    wrap: "bg-navy-900/10 text-navy-900",
    icon: <LogOut className="h-5 w-5" />,
    button: "secondary",
  },
  edit: {
    wrap: "bg-azure-100 text-navy-900",
    icon: <Pencil className="h-5 w-5" />,
    button: "default",
  },
};

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = true,
  loading = false,
  tone,
  icon,
  onConfirm,
}: ConfirmDialogProps) {
  const resolvedTone: ConfirmTone =
    tone ?? (destructive ? "danger" : "neutral");
  const styles = toneStyles[resolvedTone];
  const buttonVariant = destructive && !tone ? "danger" : styles.button;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md gap-0 overflow-hidden p-0">
        <div className="space-y-4 px-6 pb-2 pt-6">
          <div
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-2xl",
              styles.wrap,
            )}
          >
            {icon ?? styles.icon}
          </div>
          <DialogHeader className="space-y-2 text-start">
            <DialogTitle className="text-lg">{title}</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              {description}
            </DialogDescription>
          </DialogHeader>
        </div>
        <DialogFooter className="border-t border-border-200 bg-[#f8fafc] px-6 py-4 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => onOpenChange(false)}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={buttonVariant}
            disabled={loading}
            onClick={onConfirm}
          >
            {loading ? "Working…" : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
