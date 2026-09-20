import { useMemo, useState } from "react";
import {
  Eye,
  GitCommitHorizontal,
  Hammer,
  Rocket,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";
import { SectionShell } from "@/components/ui/section-shell";
import { IcCard } from "@/components/ui/ic-card";
import { IcChip } from "@/components/ui/ic-chip";
import { IcIconTile } from "@/components/ui/ic-icon-tile";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";

export function DevOpsStripSection() {
  const { t } = useI18n();
  const d = t.home.devops;
  const [active, setActive] = useState(3);

  const stages = useMemo(
    () =>
      [
        {
          label: d.commit.label,
          body: d.commit.body,
          Icon: GitCommitHorizontal,
        },
        {
          label: d.build.label,
          body: d.build.body,
          Icon: Hammer,
        },
        {
          label: d.scan.label,
          body: d.scan.body,
          Icon: ScanSearch,
        },
        {
          label: d.deploy.label,
          body: d.deploy.body,
          Icon: Rocket,
        },
        {
          label: d.verify.label,
          body: d.verify.body,
          Icon: ShieldCheck,
        },
        {
          label: d.observe.label,
          body: d.observe.body,
          Icon: Eye,
        },
      ] as const,
    [d],
  );

  return (
    <SectionShell tone="navyLight" eyebrow={d.eyebrow} title={d.title} lead={d.lead}>
      <div className="flex flex-wrap gap-2">
        {stages.map((s, i) => (
          <IcChip key={s.label} active={active === i} onClick={() => setActive(i)}>
            <s.Icon className="h-3.5 w-3.5" aria-hidden />
            {s.label}
          </IcChip>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stages.map((s, i) => (
          <button key={s.label} type="button" className="text-start" onClick={() => setActive(i)}>
            <IcCard
              interactive
              className={cn("h-full p-5", active === i && "border-orange-500 before:scale-x-100")}
            >
              <div className="flex items-start justify-between gap-3">
                <IcIconTile size="sm" className={cn(active === i && "bg-orange-500 text-white")}>
                  <s.Icon className="h-4 w-4" aria-hidden />
                </IcIconTile>
                <p className="font-mono text-[11px] tracking-[0.12em] text-orange-500">
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>
              <h3 className="font-display mt-3 text-base font-semibold text-navy-900">
                {s.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-600">{s.body}</p>
            </IcCard>
          </button>
        ))}
      </div>
    </SectionShell>
  );
}
