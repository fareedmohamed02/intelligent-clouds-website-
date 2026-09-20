import { Activity, CloudCog, CloudUpload, ShieldCheck } from "lucide-react";
import { IcCard } from "@/components/ui/ic-card";
import { IcIconTile } from "@/components/ui/ic-icon-tile";
import { SectionShell } from "@/components/ui/section-shell";
import { useI18n } from "@/i18n";

export function CloudCapabilitiesSection() {
  const { t } = useI18n();
  const c = t.home.cloudCapabilities;
  const capabilities = [
    { id: "transformation", content: c.transformation, Icon: CloudUpload },
    { id: "engineering", content: c.engineering, Icon: CloudCog },
    { id: "guardrails", content: c.guardrails, Icon: ShieldCheck },
    { id: "operations", content: c.operations, Icon: Activity },
  ] as const;

  return (
    <SectionShell
      tone="soft"
      title={c.title}
      className="[&_.section-shell-body]:mt-8 lg:[&_.section-shell-body]:mt-10"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {capabilities.map(({ id, content, Icon }, index) => (
          <IcCard as="article" interactive className="p-6 sm:p-7" key={id}>
            <div className="flex items-start justify-between gap-4">
              <IcIconTile size="lg">
                <Icon className="h-6 w-6" aria-hidden />
              </IcIconTile>
              <span className="font-mono text-[11px] tracking-[0.16em] text-navy-900/35">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold tracking-[-0.02em] text-navy-900 transition-colors duration-300 group-hover/card:text-orange-500">
              {content.title}
            </h3>
            <p className="mt-3 text-[12px] font-medium uppercase leading-relaxed tracking-[0.08em] text-orange-500">
              {content.category}
            </p>
            <p className="mt-4 text-[15px] leading-[1.75] text-text-600">
              {content.description}
            </p>
          </IcCard>
        ))}
      </div>
    </SectionShell>
  );
}
