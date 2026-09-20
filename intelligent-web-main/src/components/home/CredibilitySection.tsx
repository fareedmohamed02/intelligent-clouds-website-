import { FlaskConical, Target } from "lucide-react";
import { SectionShell } from "@/components/ui/section-shell";
import { IcCard } from "@/components/ui/ic-card";
import { IcIconTile } from "@/components/ui/ic-icon-tile";
import { useI18n } from "@/i18n";

export function CredibilitySection() {
  const { t } = useI18n();
  const c = t.home.credibility;

  return (
    <SectionShell tone="white" eyebrow={c.eyebrow} title={c.title} lead={c.lead}>
      <div className="grid gap-4 md:grid-cols-2">
        <IcCard interactive className="p-6">
          <IcIconTile>
            <Target className="h-5 w-5" aria-hidden />
          </IcIconTile>
          <h3 className="font-display mt-4 text-lg font-semibold text-navy-900">
            {c.outcomeBased.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-600">{c.outcomeBased.body}</p>
          <ul className="mt-4 space-y-2 text-sm text-text-600">
            <li className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-orange-500" aria-hidden />
              {c.outcomeBased.criteria}
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-orange-500" aria-hidden />
              {c.outcomeBased.increments}
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-orange-500" aria-hidden />
              {c.outcomeBased.knowledge}
            </li>
          </ul>
        </IcCard>
        <IcCard interactive className="p-6">
          <IcIconTile>
            <FlaskConical className="h-5 w-5" aria-hidden />
          </IcIconTile>
          <h3 className="font-display mt-4 text-lg font-semibold text-navy-900">
            {c.poc.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-600">{c.poc.body}</p>
          <ul className="mt-4 space-y-2 text-sm text-text-600">
            <li className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-orange-500" aria-hidden />
              {c.poc.assessment}
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-orange-500" aria-hidden />
              {c.poc.metrics}
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-orange-500" aria-hidden />
              {c.poc.gates}
            </li>
          </ul>
        </IcCard>
      </div>
    </SectionShell>
  );
}
