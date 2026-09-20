import { cn } from "@/lib/utils";
import type { TechBrand } from "@/lib/tech-brands";
import { getTechBrand } from "@/lib/tech-brands";

type Size = "sm" | "md" | "lg" | "xl";

const sizeClass: Record<Size, string> = {
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-10 w-10",
};

type TechBrandIconProps = {
  brand: TechBrand | string;
  size?: Size;
  className?: string;
  /** Use brand color (default) or muted navy */
  tone?: "brand" | "muted";
};

/** Renders a tech brand SVG via CSS mask so color can follow brand guidelines. */
export function TechBrandIcon({
  brand,
  size = "md",
  className,
  tone = "brand",
}: TechBrandIconProps) {
  const resolved = typeof brand === "string" ? getTechBrand(brand) : brand;
  if (!resolved) return null;

  return (
    <span
      role="img"
      aria-label={resolved.name}
      title={resolved.name}
      className={cn("inline-block shrink-0", sizeClass[size], className)}
      style={{
        backgroundColor: tone === "brand" ? resolved.color : "#04275f",
        WebkitMaskImage: `url(${resolved.src})`,
        maskImage: `url(${resolved.src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

type ChipSize = "md" | "lg";

type TechBrandChipProps = {
  brand: TechBrand | string;
  className?: string;
  showLabel?: boolean;
  size?: ChipSize;
};

const chipShell: Record<ChipSize, string> = {
  md: "gap-2 rounded-[10px] px-3 py-2",
  lg: "gap-3 rounded-[14px] px-5 py-3.5",
};

const chipLabel: Record<ChipSize, string> = {
  md: "text-[11px] tracking-[0.1em]",
  lg: "text-[13px] tracking-[0.12em]",
};

const chipIcon: Record<ChipSize, Size> = {
  md: "sm",
  lg: "lg",
};

export function TechBrandChip({
  brand,
  className,
  showLabel = true,
  size = "md",
}: TechBrandChipProps) {
  const resolved = typeof brand === "string" ? getTechBrand(brand) : brand;
  if (!resolved) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center border border-border-200 bg-white shadow-[0_1px_0_rgba(4,39,95,0.04)]",
        chipShell[size],
        className,
      )}
    >
      <TechBrandIcon brand={resolved} size={chipIcon[size]} />
      {showLabel ? (
        <span
          className={cn(
            "font-mono uppercase text-navy-900/85",
            chipLabel[size],
          )}
        >
          {resolved.name}
        </span>
      ) : null}
    </span>
  );
}
