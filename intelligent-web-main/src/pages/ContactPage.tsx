import { useState } from "react";
import {
  Building2,
  Clock3,
  Mail,
  MessageCircle,
  MessageSquareText,
  Phone,
  Send,
  User,
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useSettings } from "@/hooks/useCms";
import { contact as contactFallback, getCompanyPage } from "@/content/company";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SuccessDialog } from "@/components/ui/success-dialog";
import { toast } from "@/components/ui/toast";
import { WHATSAPP_DISPLAY, whatsappExpertUrl } from "@/lib/whatsapp";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164 } from "@/lib/contact";
import { useI18n } from "@/i18n";
import contactHero from "@/assets/contact-sales.jpg";
import {
  controlClass,
  email as validateEmail,
  hasErrors,
  minLength,
  optionalMax,
  phone as validatePhone,
  sanitizePhoneInput,
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

type ContactNeedValue = (typeof NEED_OPTIONS)[number]["value"];
type ContactNeedKey = (typeof NEED_OPTIONS)[number]["key"];

type ContactForm = {
  name: string;
  email: string;
  company: string;
  phone: string;
  need: ContactNeedValue;
  message: string;
};

type ContactField = keyof ContactForm;

function validateContact(
  form: ContactForm,
  labels: { name: string; company: string; email: string; phone: string; message: string },
  msgs: ValidationMessages,
): FieldErrors<ContactField> {
  return {
    name: minLength(form.name, 2, labels.name, msgs),
    email: validateEmail(form.email, labels.email, msgs),
    company: minLength(form.company, 2, labels.company, msgs),
    phone: validatePhone(form.phone, labels.phone, msgs),
    message: optionalMax(form.message, 2000, labels.message, msgs),
  };
}

export function ContactPage() {
  const { t, locale } = useI18n();
  const contactContent = getCompanyPage("contact", locale) ?? contactFallback;
  const settings = useSettings();
  const formStartedAt = useFormStartedAt();
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errors, setErrors] = useState<FieldErrors<ContactField>>({});
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    company: "",
    phone: "",
    need: NEED_OPTIONS[0].value,
    message: "",
  });

  const c = t.pages.contact;
  const needLabels = c.needs;

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      company: "",
      phone: "",
      need: NEED_OPTIONS[0].value,
      message: "",
    });
    setErrors({});
    setWebsite("");
  };

  const setField = <K extends ContactField>(key: K, value: ContactForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const email = settings.data?.email || CONTACT_EMAIL;
  const phone = settings.data?.phone || CONTACT_PHONE_DISPLAY;
  const phoneHref = settings.data?.phone || CONTACT_PHONE_E164;
  const whatsapp = settings.data?.whatsapp || WHATSAPP_DISPLAY;

  return (
    <CompanyLongForm
      content={contactContent}
      heroBackground={contactHero}
    >
      <SectionShell
        tone="navyLight"
        eyebrow={c.messageEyebrow}
        title={c.messageTitle}
        lead={c.messageLead}
      >
        <ModernFormSplit
          aside={
            <IcCard className="h-full space-y-5 p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <IcIconTile size="md">
                  <Send className="h-5 w-5" aria-hidden />
                </IcIconTile>
                <div>
                  <p className="font-display text-base font-semibold text-navy-900">
                    {c.directChannels}
                  </p>
                  <p className="text-sm text-text-600">{c.pickPath}</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  { Icon: Mail, label: t.forms.email, value: email, href: `mailto:${email}` },
                  { Icon: Phone, label: t.forms.phone, value: phone || "—", href: `tel:${phoneHref.replace(/\s+/g, "")}` },
                  {
                    Icon: MessageCircle,
                    label: c.whatsapp,
                    value: whatsapp,
                    href: whatsappExpertUrl(t.whatsapp.defaultMessage),
                    external: true,
                  },
                ].map((row) => (
                  <li key={row.label} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-orange-500/10 text-orange-500">
                      <row.Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#6b7a8c]">
                        {row.label}
                      </p>
                      <a
                        className="mt-0.5 block truncate text-sm font-medium text-navy-900 hover:underline"
                        href={row.href}
                        {...(row.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      >
                        {row.value}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex items-start gap-3 rounded-[12px] border border-border-200 bg-[#eef3f8]/80 p-4">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" aria-hidden />
                <p className="text-sm leading-relaxed text-text-600">{c.replyHint}</p>
              </div>
            </IcCard>
          }
        >
          <form
            className="w-full"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              const next = validateContact(
                form,
                {
                  name: t.forms.name,
                  company: t.forms.company,
                  email: t.forms.email,
                  phone: t.forms.phone,
                  message: t.forms.message,
                },
                t.validation,
              );
              setErrors(next);
              if (hasErrors(next)) {
                toast.error(t.forms.fixFields);
                return;
              }
              setSubmitting(true);
              void apiFetch("/contact", {
                method: "POST",
                body: JSON.stringify(withSpamFields(form, { website, formStartedAt })),
              })
                .then(() => {
                  resetForm();
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
              title={c.contactFormTitle}
              subtitle={c.contactFormSubtitle}
              icon={MessageSquareText}
            >
              <div className="grid w-full gap-4 sm:grid-cols-2">
                <FormField id="name" label={t.forms.name} icon={User} required error={errors.name}>
                  <input
                    id="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
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
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={controlClass(modernControlClass, errors.email)}
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                  />
                </FormField>
                <FormField id="company" label={t.forms.company} icon={Building2} required error={errors.company}>
                  <input
                    id="company"
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={errors.company ? "company-error" : undefined}
                    className={controlClass(modernControlClass, errors.company)}
                    value={form.company}
                    onChange={(e) => setField("company", e.target.value)}
                  />
                </FormField>
                <FormField id="phone" label={t.forms.phone} icon={Phone} required error={errors.phone}>
                    <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={controlClass(modernControlClass, errors.phone)}
                    value={form.phone}
                    onChange={(e) => setField("phone", sanitizePhoneInput(e.target.value))}
                  />
                </FormField>
              </div>
              <FormField id="need" label={c.lookingFor} icon={Send} required>
                <Select
                  value={form.need}
                  onValueChange={(value) =>
                    setField("need", value as ContactNeedValue)
                  }
                >
                  <SelectTrigger id="need" className={modernControlClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {NEED_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {needLabels[opt.key as ContactNeedKey]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
              <FormField
                id="message"
                label={t.forms.message}
                icon={MessageSquareText}
                error={errors.message}
              >
                <textarea
                  id="message"
                  rows={5}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={controlClass(modernTextareaClass, errors.message)}
                  value={form.message}
                  onChange={(e) => setField("message", e.target.value)}
                />
              </FormField>
              <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
                <Send className="h-4 w-4" />
                {submitting ? t.forms.sending : t.forms.submit}
              </Button>
            </ModernFormCard>
          </form>
        </ModernFormSplit>
      </SectionShell>

      <SuccessDialog
        open={successOpen}
        onOpenChange={setSuccessOpen}
        title={t.forms.enquirySuccessTitle}
        description={t.forms.enquirySuccessBody}
        confirmLabel={t.forms.close}
      />
    </CompanyLongForm>
  );
}
