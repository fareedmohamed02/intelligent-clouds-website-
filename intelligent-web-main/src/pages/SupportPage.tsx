import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  FileText,
  Headphones,
  LifeBuoy,
  Mail,
  Shield,
  User,
  type LucideIcon,
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import { getResourcePage, support as supportFallback } from "@/content/resources";
import { ResourceLongForm } from "@/components/resources/ResourceLongForm";
import { HoneypotField } from "@/components/HoneypotField";
import { useFormStartedAt, withSpamFields } from "@/lib/forms";
import {
  FormField,
  ModernFormCard,
  ModernFormSplit,
  modernControlClass,
  modernTextareaClass,
} from "@/components/forms/modern-form";
import { SectionShell } from "@/components/ui/section-shell";
import { IcCard } from "@/components/ui/ic-card";
import { IcChip } from "@/components/ui/ic-chip";
import { IcIconTile } from "@/components/ui/ic-icon-tile";
import { Button } from "@/components/ui/button";
import { SuccessDialog } from "@/components/ui/success-dialog";
import { toast } from "@/components/ui/toast";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import supportHero from "@/assets/support-page.jpg";
import {
  controlClass,
  email as validateEmail,
  fillTemplate,
  hasErrors,
  minLength,
  type FieldErrors,
  type ValidationMessages,
} from "@/lib/validation";

const tierIcons: Record<string, LucideIcon> = {
  standard: Headphones,
  "managed-operations": Shield,
  priority: AlertTriangle,
};

type SupportForm = {
  name: string;
  email: string;
  subject: string;
  body: string;
};

type SupportField = keyof SupportForm;

type TierId = "standard" | "managed-operations" | "priority";

function validateSupport(
  form: SupportForm,
  labels: { name: string; email: string; subject: string; details: string },
  msgs: ValidationMessages,
): FieldErrors<SupportField> {
  return {
    name: minLength(form.name, 2, labels.name, msgs),
    email: validateEmail(form.email, labels.email, msgs),
    subject: minLength(form.subject, 5, labels.subject, msgs),
    body: minLength(form.body, 20, labels.details, msgs),
  };
}

export function SupportPage() {
  const { t, locale } = useI18n();
  const supportContent = getResourcePage("support", locale) ?? supportFallback;
  const formStartedAt = useFormStartedAt();
  const [website, setWebsite] = useState("");
  const [tier, setTier] = useState<TierId>("standard");
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errors, setErrors] = useState<FieldErrors<SupportField>>({});
  const [form, setForm] = useState<SupportForm>({
    name: "",
    email: "",
    subject: "",
    body: "",
  });

  const s = t.pages.support;
  const tiers = s.tiers;

  const setField = <K extends SupportField>(key: K, value: SupportForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const resetTicket = () => {
    setForm({ name: "", email: "", subject: "", body: "" });
    setErrors({});
    setWebsite("");
  };

  const selected = tiers.find((item) => item.id === tier) ?? tiers[0]!;
  const SelectedIcon = tierIcons[selected.id] ?? Headphones;

  return (
    <ResourceLongForm content={supportContent} heroBackground={supportHero}>
      <SectionShell
        tone="navyLight"
        eyebrow={s.openTicketEyebrow}
        title={s.openTicketTitle}
        lead={s.openTicketLead}
      >
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {tiers.map((item) => {
            const Icon = tierIcons[item.id] ?? Headphones;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTier(item.id as TierId)}
                className="text-start"
              >
                <IcCard
                  interactive
                  animateIn={false}
                  className={cn("h-full p-6", tier === item.id && "border-orange-500")}
                >
                  <div className="flex items-center justify-between gap-3">
                    <IcIconTile size="sm">
                      <Icon className="h-4 w-4" aria-hidden />
                    </IcIconTile>
                    <IcChip as="span" active={tier === item.id}>
                      {item.short}
                    </IcChip>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-600">{item.body}</p>
                  <ul className="mt-3 space-y-1 text-xs text-text-600">
                    {item.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-orange-500" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                </IcCard>
              </button>
            );
          })}
        </div>

        <ModernFormSplit
          aside={
            <IcCard className="h-full space-y-4 p-6">
              <div className="flex items-center gap-3">
                <IcIconTile size="md">
                  <SelectedIcon className="h-5 w-5" aria-hidden />
                </IcIconTile>
                <div>
                  <p className="font-display text-base font-semibold text-navy-900">
                    {selected.title}
                  </p>
                  <p className="text-sm text-text-600">{s.attachedHint}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-text-600">{selected.body}</p>
              <ul className="space-y-2">
                {selected.points.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-text-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-navy-900" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </IcCard>
          }
        >
          <form
            className="w-full"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              const next = validateSupport(
                form,
                {
                  name: t.forms.name,
                  email: t.forms.email,
                  subject: t.forms.subject,
                  details: s.details,
                },
                t.validation,
              );
              setErrors(next);
              if (hasErrors(next)) {
                toast.error(t.forms.fixFields);
                return;
              }
              setSubmitting(true);
              void apiFetch("/support/tickets", {
                method: "POST",
                body: JSON.stringify(
                  withSpamFields({ ...form, tier }, { website, formStartedAt }),
                ),
              })
                .then(() => {
                  resetTicket();
                  setSuccessOpen(true);
                })
                .catch((err: unknown) => {
                  toast.error(err instanceof Error ? err.message : t.forms.submitFailed);
                })
                .finally(() => setSubmitting(false));
            }}
          >
            <HoneypotField value={website} onChange={setWebsite} />
            <ModernFormCard
              title={s.formTitle}
              subtitle={
                <span className="inline-flex items-center gap-2">
                  <SelectedIcon className="h-3.5 w-3.5 text-orange-500" aria-hidden />
                  {fillTemplate(s.tierLabel, { title: selected.title })}
                </span>
              }
              icon={LifeBuoy}
            >
              <div className="grid w-full gap-4 sm:grid-cols-2">
                <FormField id="name" label={t.forms.name} icon={User} required error={errors.name}>
                  <input
                    id="name"
                    aria-invalid={Boolean(errors.name)}
                    className={controlClass(modernControlClass, errors.name)}
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                  />
                </FormField>
                <FormField id="email" label={t.forms.email} icon={Mail} required error={errors.email}>
                  <input
                    id="email"
                    type="email"
                    aria-invalid={Boolean(errors.email)}
                    className={controlClass(modernControlClass, errors.email)}
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                  />
                </FormField>
              </div>
              <FormField id="subject" label={t.forms.subject} icon={FileText} required error={errors.subject}>
                <input
                  id="subject"
                  aria-invalid={Boolean(errors.subject)}
                  className={controlClass(modernControlClass, errors.subject)}
                  value={form.subject}
                  onChange={(e) => setField("subject", e.target.value)}
                />
              </FormField>
              <FormField
                id="body"
                label={s.details}
                icon={ClipboardList}
                required
                error={errors.body}
                hint={errors.body ? undefined : s.hint}
              >
                <textarea
                  id="body"
                  rows={6}
                  aria-invalid={Boolean(errors.body)}
                  className={controlClass(modernTextareaClass, errors.body)}
                  value={form.body}
                  onChange={(e) => setField("body", e.target.value)}
                />
              </FormField>
              <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
                <LifeBuoy className="h-4 w-4" />
                {submitting ? t.forms.sending : t.forms.submit}
              </Button>
            </ModernFormCard>
          </form>
        </ModernFormSplit>
      </SectionShell>

      <SuccessDialog
        open={successOpen}
        onOpenChange={setSuccessOpen}
        title={t.forms.ticketSuccessTitle}
        description={t.forms.ticketSuccessBody}
        confirmLabel={t.forms.close}
      />
    </ResourceLongForm>
  );
}
