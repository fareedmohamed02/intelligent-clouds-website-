import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StickyPhotoHeroProps = {
  src: string;
  children: ReactNode;
  /** Tailwind object-position utility, e.g. object-center or object-[center_35%] */
  objectPosition?: string;
  className?: string;
};

/**
 * Tall photo hero that sticks while the page body scrolls over it.
 * Pair with {@link StickyPhotoHeroBody} as the next sibling (shared parent).
 */
export function StickyPhotoHero({
  src,
  children,
  objectPosition = "object-center",
  className,
}: StickyPhotoHeroProps) {
  return (
    <div
      className={cn(
        "sticky top-0 z-0 flex min-h-[min(100svh,54rem)] flex-col justify-center overflow-hidden bg-navy-950",
        className,
      )}
    >
      <img
        src={src}
        alt=""
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          objectPosition,
        )}
        decoding="async"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-navy-950/88 via-navy-950/72 to-navy-950/35"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-navy-950/25"
      />
      <div className="container-ic relative py-16 lg:py-24">{children}</div>
    </div>
  );
}

/** Opaque page body that scrolls over {@link StickyPhotoHero}. */
export function StickyPhotoHeroBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("relative z-10", className)}>{children}</div>;
}
