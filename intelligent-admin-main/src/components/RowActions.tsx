import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type RowActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
  editLabel: string;
  deleteLabel: string;
  className?: string;
};

/** Compact modern edit / delete icon actions for admin tables. */
export function RowActions({
  onEdit,
  onDelete,
  editLabel,
  deleteLabel,
  className,
}: RowActionsProps) {
  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="h-8 w-8 rounded-lg border-border-200 text-navy-900 hover:border-navy-900/30 hover:bg-navy-900/5"
        onClick={onEdit}
        aria-label={editLabel}
        title={editLabel}
      >
        <Pencil className="h-3.5 w-3.5" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="h-8 w-8 rounded-lg border-danger/20 text-danger hover:border-danger/40 hover:bg-danger/5"
        onClick={onDelete}
        aria-label={deleteLabel}
        title={deleteLabel}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
