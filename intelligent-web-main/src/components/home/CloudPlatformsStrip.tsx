import { TechBrandIcon } from "@/components/TechBrandIcon";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

const platforms = [
  { id: "aws", label: "AWS" },
  { id: "azure", label: "Azure" },
  { id: "gcp", label: "GCP" },
  { id: "alibaba-cloud", label: "Alibaba Cloud" },
] as const;

/** Cloud-provider trust strip — sits directly below the hero. */
export function CloudPlatformsStrip() {
  const { t } = useI18n();

  return (
    <section className="border-b border-border-200 bg-surface-100">
      <div className="container-ic flex flex-col items-center gap-4 py-6 sm:flex-row sm:justify-center sm:gap-8 lg:py-7">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-600">
          {t.home.cloudStripLabel}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-0">
          {platforms.map((platform, index) => (
            <div
              key={platform.id}
              className={cn(
                "flex items-center gap-2 sm:px-6",
                index > 0 && "sm:border-s sm:border-navy-900/12",
              )}
            >
              <TechBrandIcon brand={platform.id} size="md" />
              <span className="text-[13px] font-semibold tracking-wide text-navy-900/80">
                {platform.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
