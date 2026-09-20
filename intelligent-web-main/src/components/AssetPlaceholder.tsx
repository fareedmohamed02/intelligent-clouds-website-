import { cn } from "@/lib/utils";

type AssetPlaceholderProps = {
  label: string;
  aspectRatio?: string;
  className?: string;
  hint?: string;
};

export function AssetPlaceholder({
  label,
  aspectRatio = "16 / 9",
  className,
  hint = "Asset placeholder",
}: AssetPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2 rounded-[12px] border border-dashed border-border-200 bg-surface-50 px-4 py-8 text-center",
        className,
      )}
      style={{ aspectRatio }}
      role="img"
      aria-label={label}
    >
      <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-600">
        {hint}
      </p>
      <p className="text-sm font-medium text-navy-900">{label}</p>
    </div>
  );
}
