import type { LucideIcon } from "lucide-react";
import { pickChallengeIcon, pickOutcomeIcon } from "@/lib/section-icons";
import { cn } from "@/lib/utils";

type Variant = "challenge" | "outcome";

function Row({
  text,
  icon: Icon,
  variant,
}: {
  text: string;
  icon: LucideIcon;
  variant: Variant;
}) {
  return (
    <li className="flex items-start gap-3 text-sm leading-relaxed text-text-600">
      <span
        className={cn(
          "mt-px inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
          variant === "challenge"
            ? "bg-orange-500/10 text-orange-600"
            : "bg-navy-900/[0.07] text-navy-900",
        )}
      >
        <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
      </span>
      <span className="pt-1">{text}</span>
    </li>
  );
}

type ListProps = {
  items: readonly string[];
  /** Use a two-column grid instead of a single stacked column. */
  columns?: boolean;
};

export function ChallengeList({ items, columns }: ListProps) {
  return (
    <ul className={cn(columns ? "grid gap-3 sm:grid-cols-2" : "space-y-3")}>
      {items.map((text, i) => (
        <Row key={text} text={text} icon={pickChallengeIcon(i)} variant="challenge" />
      ))}
    </ul>
  );
}

export function OutcomeList({ items, columns }: ListProps) {
  return (
    <ul className={cn(columns ? "grid gap-3 sm:grid-cols-2" : "space-y-3")}>
      {items.map((text, i) => (
        <Row key={text} text={text} icon={pickOutcomeIcon(i)} variant="outcome" />
      ))}
    </ul>
  );
}
