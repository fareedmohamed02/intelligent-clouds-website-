import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";

export function PageHero({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-b border-border-200 bg-[#eef3f8]", className)}>
      <div className="container-ic py-16 lg:py-20">
        {eyebrow ? (
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#6b7a8c]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-4 max-w-4xl font-display text-[clamp(1.85rem,3.8vw,2.75rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-navy-900">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-[clamp(1rem,1.35vw,1.125rem)] leading-[1.7] text-[#5f6b7a]">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function Breadcrumbs({
  items,
  className,
}: {
  items: Array<{ label: string; to?: string }>;
  className?: string;
}) {
  const { t } = useI18n();
  return (
    <nav
      aria-label={t.common.breadcrumb}
      className={cn("mb-6 text-sm text-text-600", className)}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="inline-flex items-center gap-2">
            {i > 0 ? <span aria-hidden>/</span> : null}
            {item.to ? (
              <Link to={item.to} className="transition-colors duration-500 hover:text-orange-500">
                {item.label}
              </Link>
            ) : (
              <span className="text-navy-900">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
