import { useEffect, useRef, useState } from "react";
import {
  Building2,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  Clock3,
  Crosshair,
  Mail,
  NotebookPen,
  Phone,
  Target,
  User,
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import { bookDemo as bookDemoFallback, getCompanyPage } from "@/content/company";
import { CompanyLongForm } from "@/components/company/CompanyLongForm";
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
import { IcIconTile } from "@/components/ui/ic-icon-tile";
import { Button } from "@/components/ui/button";
import { SuccessDialog } from "@/components/ui/success-dialog";
import { toast } from "@/components/ui/toast";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import bookAssessmentHero from "@/assets/book-assessment.jpg";
import {
  controlClass,
  email as validateEmail,
  fillTemplate,
  futureOrTodayDate,
  hasErrors,
  minLength,
  optionalMax,
  phone as validatePhone,
  sanitizePhoneInput,
  required,
  type FieldErrors,
  type ValidationMessages,
} from "@/lib/validation";

/** Stable English values for the API; labels come from i18n. */
const NEED_OPTIONS = [
  { value: "Cloud Services", key: "cloudServices" },
  { value: "Network & Connectivity", key: "networkConnectivity" },
  { value: "Infrastructure Services", key: "infrastructureServices" },
  { value: "Managed Infrastructure", key: "managedInfrastructure" },
  { value: "AI & Data Services", key: "aiDataServices" },
  { value: "Cloud Migration", key: "cloudMigration" },
  { value: "DevOps & Automation", key: "devopsAutomation" },
  { value: "Other", key: "other" },
] as const;

type NeedValue = (typeof NEED_OPTIONS)[number]["value"];
type NeedKey = (typeof NEED_OPTIONS)[number]["key"];

type PreferredSchedule = "" | "yes" | "no";

type FormState = {
  need: NeedValue;
  name: string;
  email: string;
  company: string;
  phone: string;
  preferredSchedule: PreferredSchedule;
  preferredDate: string;
  preferredTime: string;
  notes: string;
};

type BookingField = keyof FormState;

const empty: FormState = {
  need: "Cloud Services",
  name: "",
  email: "",
  company: "",
  phone: "",
  preferredSchedule: "",
  preferredDate: "",
  preferredTime: "",
  notes: "",
};

const stepIcons = [Target, User, CalendarDays] as const;
const sessionPointIcons = [Crosshair, Clock3, NotebookPen] as const;

function validateStep(
  step: number,
  form: FormState,
  labels: {
    need: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    preferredSchedule: string;
    preferredDate: string;
    preferredTime: string;
    notes: string;
  },
  msgs: ValidationMessages,
): FieldErrors<BookingField> {
  if (step === 1) {
    return { need: required(form.need, labels.need, msgs) };
  }
  if (step === 2) {
    return {
      name: minLength(form.name, 2, labels.name, msgs),
      company: minLength(form.company, 2, labels.company, msgs),
      email: validateEmail(form.email, labels.email, msgs),
      phone: validatePhone(form.phone, labels.phone, msgs),
      preferredSchedule: required(form.preferredSchedule, labels.preferredSchedule, msgs),
    };
  }
  return {
    preferredDate: futureOrTodayDate(form.preferredDate, labels.preferredDate, msgs),
    preferredTime: required(form.preferredTime, labels.preferredTime, msgs),
    notes: optionalMax(form.notes, 2000, labels.notes, msgs),
  };
}

export function BookDemoPage() {
  const { t, locale } = useI18n();
  const bookDemoContent = getCompanyPage("book-demo", locale) ?? bookDemoFallback;
  const formStartedAt = useFormStartedAt();
  const [step, setStep] = useState(1);
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errors, setErrors] = useState<FieldErrors<BookingField>>({});
  const [form, setForm] = useState<FormState>(empty);
  const panelRef = useRef<HTMLDivElement>(null);

  const b = t.pages.bookDemo;
  const stepLabels = [b.stepNeed, b.stepIdentity, b.stepSchedule] as const;
  const needLabels = b.needOptions;
  const skipSchedule = form.preferredSchedule === "no";
  const visibleStepCount = skipSchedule ? 2 : 3;
  const isFinalStep = step === 3 || (step === 2 && skipSchedule);

  useEffect(() => {
    panelRef.current?.focus();
  }, [step]);

  const setField = <K extends BookingField>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const resetBooking = () => {
    setForm(empty);
    setStep(1);
    setErrors({});
    setWebsite("");
  };

  const stepTitle = fillTemplate(b.stepTitle, {
    step,
    label: stepLabels[step - 1]!,
  });

  return (
    <CompanyLongForm
      content={bookDemoContent}
      heroBackground={bookAssessmentHero}
    >
      <SectionShell
        tone="navyLight"
        eyebrow={b.bookingEyebrow}
        title={b.bookingTitle}
        lead={b.bookingLead}
      >
        <ModernFormSplit
          aside={
            <IcCard className="h-full space-y-5 p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <IcIconTile size="md">
                  <CalendarCheck className="h-5 w-5" aria-hidden />
                </IcIconTile>
                <div>
                  <p className="font-display text-base font-semibold text-navy-900">
                    {b.whatYouGet}
                  </p>
                  <p className="text-sm text-text-600">{b.sessionLabel}</p>
                </div>
              </div>
              <ul className="space-y-3">
                {b.sessionPoints.map((text, i) => {
                  const Icon = sessionPointIcons[i] ?? Crosshair;
                  return (
                    <li key={text} className="flex gap-3 text-sm leading-relaxed text-text-600">
                      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-orange-500/10 text-orange-500">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      {text}
                    </li>
                  );
                })}
              </ul>
            </IcCard>
          }
        >
          <div className="w-full space-y-5">
            <ol
              className={cn(
                "grid w-full gap-2",
                visibleStepCount === 2 ? "grid-cols-2" : "grid-cols-3",
              )}
              aria-label={b.stepsAria}
            >
              {stepLabels.slice(0, visibleStepCount).map((label, index) => {
                const n = index + 1;
                const Icon = stepIcons[index]!;
                return (
                  <li
                    key={label}
                    aria-current={step === n ? "step" : undefined}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-[12px] px-2 py-3 font-mono text-xs tracking-[0.08em]",
                      step === n
                        ? "bg-orange-500 text-white"
                        : step > n
                          ? "bg-azure-100 text-navy-900"
                          : "bg-border-200/60 text-text-600",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    <span className="hidden sm:inline">{label}</span>
                    <span className="sm:hidden">{n}</span>
                  </li>
                );
              })}
            </ol>

            <form
              className="w-full"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                const next = validateStep(
                  step,
                  form,
                  {
                    need: b.stepNeed,
                    name: t.forms.name,
                    company: t.forms.company,
                    email: t.forms.email,
                    phone: t.forms.phone,
                    preferredSchedule: b.preferredScheduleQuestion,
                    preferredDate: b.preferredDate,
                    preferredTime: b.preferredTime,
                    notes: b.notes,
                  },
                  t.validation,
                );
                setErrors(next);
                if (hasErrors(next)) {
                  toast.error(t.forms.fixFields);
                  return;
                }
                if (!isFinalStep) {
                  setStep((s) => s + 1);
                  setErrors({});
                  return;
                }
                const payload = skipSchedule
                  ? { ...form, preferredDate: "", preferredTime: "" }
                  : form;
                setSubmitting(true);
                void apiFetch("/bookings", {
                  method: "POST",
                  body: JSON.stringify(withSpamFields(payload, { website, formStartedAt })),
                })
                  .then(() => {
                    resetBooking();
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
                  title={stepTitle}
                  subtitle={b.subtitleWizard}
                  icon={stepIcons[step - 1]!}
                >
                  <div
                    ref={panelRef}
                    tabIndex={-1}
                    className="w-full outline-none"
                    aria-labelledby={`booking-step-${step}`}
                  >
                    <p id={`booking-step-${step}`} className="sr-only">
                      {stepTitle}
                    </p>

                    {step === 1 ? (
                      <div className="space-y-3">
                        <p className="inline-flex items-center gap-2 text-sm font-medium text-navy-900">
                          <Target className="h-4 w-4 text-orange-500" aria-hidden />
                          {b.needHelp}
                          <span className="text-orange-500">*</span>
                        </p>
                        <div className="grid w-full gap-2 sm:grid-cols-2">
                          {NEED_OPTIONS.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => setField("need", opt.value)}
                              className={cn(
                                "rounded-[12px] border px-4 py-3.5 text-start text-sm transition-colors duration-500",
                                form.need === opt.value
                                  ? "border-orange-500 bg-orange-500/[0.06] text-navy-900"
                                  : "border-border-200 bg-[#f8fafc] text-text-600 hover:border-orange-500/40",
                                errors.need && form.need !== opt.value && "border-danger/40",
                              )}
                            >
                              {needLabels[opt.key as NeedKey]}
                            </button>
                          ))}
                        </div>
                        {errors.need ? (
                          <p role="alert" className="text-xs font-medium text-danger">
                            {errors.need}
                          </p>
                        ) : null}
                      </div>
                    ) : null}

                    {step === 2 ? (
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
                        <FormField
                          id="company"
                          label={t.forms.company}
                          icon={Building2}
                          required
                          error={errors.company}
                        >
                          <input
                            id="company"
                            aria-invalid={Boolean(errors.company)}
                            className={controlClass(modernControlClass, errors.company)}
                            value={form.company}
                            onChange={(e) => setField("company", e.target.value)}
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
                        <FormField id="phone" label={t.forms.phone} icon={Phone} required error={errors.phone}>
                          <input
                            id="phone"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            aria-invalid={Boolean(errors.phone)}
                            className={controlClass(modernControlClass, errors.phone)}
                            value={form.phone}
                            onChange={(e) => setField("phone", sanitizePhoneInput(e.target.value))}
                          />
                        </FormField>

                        <div className="space-y-3 sm:col-span-2">
                          <p className="inline-flex items-center gap-2 text-sm font-medium text-navy-900">
                            <CalendarClock className="h-4 w-4 text-orange-500" aria-hidden />
                            {b.preferredScheduleQuestion}
                            <span className="text-orange-500">*</span>
                          </p>
                          <div className="grid w-full gap-2 sm:grid-cols-2">
                            {(
                              [
                                { value: "yes", label: b.preferredScheduleYes },
                                { value: "no", label: b.preferredScheduleNo },
                              ] as const
                            ).map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => setField("preferredSchedule", opt.value)}
                                aria-pressed={form.preferredSchedule === opt.value}
                                className={cn(
                                  "rounded-[12px] border px-4 py-3.5 text-start text-sm transition-colors duration-500",
                                  form.preferredSchedule === opt.value
                                    ? "border-orange-500 bg-orange-500/[0.06] text-navy-900"
                                    : "border-border-200 bg-[#f8fafc] text-text-600 hover:border-orange-500/40",
                                  errors.preferredSchedule &&
                                    form.preferredSchedule !== opt.value &&
                                    "border-danger/40",
                                )}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                          {errors.preferredSchedule ? (
                            <p role="alert" className="text-xs font-medium text-danger">
                              {errors.preferredSchedule}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    ) : null}

                    {step === 3 ? (
                      <div className="w-full space-y-4">
                        <div className="grid w-full gap-4 sm:grid-cols-2">
                          <FormField
                            id="date"
                            label={b.preferredDate}
                            icon={CalendarDays}
                            required
                            error={errors.preferredDate}
                          >
                            <input
                              id="date"
                              type="date"
                              aria-invalid={Boolean(errors.preferredDate)}
                              className={controlClass(modernControlClass, errors.preferredDate)}
                              value={form.preferredDate}
                              onChange={(e) => setField("preferredDate", e.target.value)}
                            />
                          </FormField>
                          <FormField
                            id="time"
                            label={b.preferredTime}
                            icon={Clock3}
                            required
                            error={errors.preferredTime}
                          >
                            <input
                              id="time"
                              type="time"
                              aria-invalid={Boolean(errors.preferredTime)}
                              className={controlClass(modernControlClass, errors.preferredTime)}
                              value={form.preferredTime}
                              onChange={(e) => setField("preferredTime", e.target.value)}
                            />
                          </FormField>
                        </div>
                        <FormField
                          id="notes"
                          label={b.notes}
                          icon={NotebookPen}
                          error={errors.notes}
                        >
                          <textarea
                            id="notes"
                            rows={4}
                            aria-invalid={Boolean(errors.notes)}
                            className={controlClass(modernTextareaClass, errors.notes)}
                            value={form.notes}
                            onChange={(e) => setField("notes", e.target.value)}
                          />
                        </FormField>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex w-full flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={step === 1 || submitting}
                      onClick={() => {
                        setErrors({});
                        setStep((s) => Math.max(1, s - 1));
                      }}
                      className="w-full sm:w-auto"
                    >
                      {b.back}
                    </Button>
                    <Button type="submit" disabled={submitting} size="lg" className="w-full sm:w-auto">
                      {!isFinalStep ? b.continue : submitting ? t.forms.sending : t.forms.submit}
                    </Button>
                  </div>
                </ModernFormCard>
              </form>
          </div>
        </ModernFormSplit>
      </SectionShell>

      <SuccessDialog
        open={successOpen}
        onOpenChange={setSuccessOpen}
        title={t.forms.demoSuccessTitle}
        description={t.forms.demoSuccessBody}
        confirmLabel={t.forms.close}
      />
    </CompanyLongForm>
  );
}
