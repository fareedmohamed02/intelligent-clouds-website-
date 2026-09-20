import { Activity, AlertOctagon, Gauge, Users } from "lucide-react";
import { SectionShell } from "@/components/ui/section-shell";
import { IcCard } from "@/components/ui/ic-card";
import { IcIconTile } from "@/components/ui/ic-icon-tile";
import { useI18n } from "@/i18n";

export function ObservabilitySection() {
  const { t } = useI18n();
  const o = t.home.observability;

  const signals = [
    {
      title: o.latency.title,
      body: o.latency.body,
      Icon: Gauge,
    },
    {
      title: o.errors.title,
      body: o.errors.body,
      Icon: AlertOctagon,
    },
    {
      title: o.saturation.title,
      body: o.saturation.body,
      Icon: Activity,
    },
    {
      title: o.ownership.title,
      body: o.ownership.body,
      Icon: Users,
    },
  ] as const;

  return (
    <SectionShell tone="navyLight" eyebrow={o.eyebrow} title={o.title} lead={o.lead}>
      <div className="grid gap-4 sm:grid-cols-2">
        {signals.map((s) => (
          <IcCard key={s.title} className="p-6">
            <IcIconTile>
              <s.Icon className="h-5 w-5" aria-hidden />
            </IcIconTile>
            <h3 className="font-display mt-4 text-base font-semibold text-navy-900">
              {s.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-600">{s.body}</p>
          </IcCard>
        ))}
      </div>
    </SectionShell>
  );
}
