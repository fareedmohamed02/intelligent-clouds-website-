import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { SettingsData } from "@/lib/types";
import { useI18n } from "@/i18n";
import {
  email as validateEmail,
  hasErrors,
  optionalHttpUrl,
  optionalPhone,
  sanitizePhoneInput,
  type FieldErrors,
} from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toast } from "@/components/ui/toast";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Save } from "lucide-react";

type SettingsField =
  | "email"
  | "supportEmail"
  | "phone"
  | "whatsapp"
  | "linkedin"
  | "twitter";

function validateSettings(form: SettingsData): FieldErrors<SettingsField> {
  return {
    email: validateEmail(form.email, "Sales email"),
    supportEmail: validateEmail(form.supportEmail, "Support email"),
    phone: optionalPhone(form.phone, "Phone"),
    whatsapp: optionalPhone(form.whatsapp, "WhatsApp"),
    linkedin: optionalHttpUrl(form.social?.linkedin ?? "", "LinkedIn"),
    twitter: optionalHttpUrl(form.social?.twitter ?? "", "Twitter / X"),
  };
}

export function SettingsPage() {
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["settings-admin"],
    queryFn: async () => {
      const res = await apiFetch<{ success: boolean; data: SettingsData }>(
        "/settings/admin",
      );
      return res.data;
    },
  });

  const [form, setForm] = useState<SettingsData | null>(null);
  const [errors, setErrors] = useState<FieldErrors<SettingsField>>({});
  const [confirmSave, setConfirmSave] = useState(false);

  useEffect(() => {
    if (query.data) setForm(query.data);
  }, [query.data]);

  const mutation = useMutation({
    mutationFn: async (payload: SettingsData) => {
      const res = await apiFetch<{ success: boolean; data: SettingsData }>(
        "/settings/admin",
        {
          method: "PUT",
          body: JSON.stringify(payload),
        },
      );
      return res.data;
    },
    onSuccess: (data) => {
      setForm(data);
      setErrors({});
      void queryClient.invalidateQueries({ queryKey: ["settings-admin"] });
      toast.success(t.settings.saved);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  if (query.isLoading || !form) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold text-navy-900">{t.settings.title}</h1>
          <p className="mt-1 text-text-600">{t.settings.description}</p>
        </div>
        <Button
          type="submit"
          form="site-settings-form"
          disabled={mutation.isPending}
          className="shrink-0 self-start sm:self-auto"
        >
          <Save className="h-4 w-4" />
          {mutation.isPending ? t.common.saving : t.settings.saveSettings}
        </Button>
      </div>

      <form
        id="site-settings-form"
        className="w-full space-y-5 rounded-2xl border border-border-200 bg-white p-6 shadow-[0_1px_0_rgba(4,39,95,0.04)] sm:p-8"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const next = validateSettings(form);
          setErrors(next);
          if (hasErrors(next)) {
            toast.error(t.settings.fixFields);
            return;
          }
          setConfirmSave(true);
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={t.settings.salesEmail} error={errors.email}>
            <Input
              type="email"
              value={form.email}
              aria-invalid={Boolean(errors.email)}
              className={cn(errors.email && "border-danger")}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                setErrors((prev) => ({ ...prev, email: undefined }));
              }}
            />
          </Field>
          <Field label={t.settings.supportEmail} error={errors.supportEmail}>
            <Input
              type="email"
              value={form.supportEmail}
              aria-invalid={Boolean(errors.supportEmail)}
              className={cn(errors.supportEmail && "border-danger")}
              onChange={(e) => {
                setForm({ ...form, supportEmail: e.target.value });
                setErrors((prev) => ({ ...prev, supportEmail: undefined }));
              }}
            />
          </Field>
          <Field label={t.settings.phone} error={errors.phone}>
            <Input
              type="tel"
              inputMode="tel"
              value={form.phone}
              aria-invalid={Boolean(errors.phone)}
              className={cn(errors.phone && "border-danger")}
              onChange={(e) => {
                setForm({ ...form, phone: sanitizePhoneInput(e.target.value) });
                setErrors((prev) => ({ ...prev, phone: undefined }));
              }}
            />
          </Field>
          <Field label={t.settings.whatsapp} error={errors.whatsapp}>
            <Input
              type="tel"
              inputMode="tel"
              value={form.whatsapp}
              aria-invalid={Boolean(errors.whatsapp)}
              className={cn(errors.whatsapp && "border-danger")}
              onChange={(e) => {
                setForm({
                  ...form,
                  whatsapp: sanitizePhoneInput(e.target.value),
                });
                setErrors((prev) => ({ ...prev, whatsapp: undefined }));
              }}
            />
          </Field>
        </div>

        <Field label={t.settings.address}>
          <Textarea
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </Field>

        <Field label={t.settings.addressAr}>
          <Textarea
            value={form.addressAr ?? ""}
            dir="rtl"
            onChange={(e) => setForm({ ...form, addressAr: e.target.value })}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={t.settings.linkedin} error={errors.linkedin}>
            <Input
              type="url"
              placeholder="https://"
              value={form.social?.linkedin ?? ""}
              aria-invalid={Boolean(errors.linkedin)}
              className={cn(errors.linkedin && "border-danger")}
              onChange={(e) => {
                setForm({
                  ...form,
                  social: { ...form.social, linkedin: e.target.value },
                });
                setErrors((prev) => ({ ...prev, linkedin: undefined }));
              }}
            />
          </Field>
          <Field label={t.settings.twitter} error={errors.twitter}>
            <Input
              type="url"
              placeholder="https://"
              value={form.social?.twitter ?? ""}
              aria-invalid={Boolean(errors.twitter)}
              className={cn(errors.twitter && "border-danger")}
              onChange={(e) => {
                setForm({
                  ...form,
                  social: { ...form.social, twitter: e.target.value },
                });
                setErrors((prev) => ({ ...prev, twitter: undefined }));
              }}
            />
          </Field>
        </div>

        <Field label={t.settings.seoTitle}>
          <Input
            value={form.seo?.defaultTitle ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                seo: { ...form.seo, defaultTitle: e.target.value },
              })
            }
          />
        </Field>
        <Field label={t.settings.seoTitleAr}>
          <Input
            value={form.seo?.defaultTitleAr ?? ""}
            dir="rtl"
            onChange={(e) =>
              setForm({
                ...form,
                seo: { ...form.seo, defaultTitleAr: e.target.value },
              })
            }
          />
        </Field>
        <Field label={t.settings.seoDescription}>
          <Textarea
            value={form.seo?.defaultDescription ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                seo: { ...form.seo, defaultDescription: e.target.value },
              })
            }
          />
        </Field>
        <Field label={t.settings.seoDescriptionAr}>
          <Textarea
            value={form.seo?.defaultDescriptionAr ?? ""}
            dir="rtl"
            onChange={(e) =>
              setForm({
                ...form,
                seo: { ...form.seo, defaultDescriptionAr: e.target.value },
              })
            }
          />
        </Field>

      </form>

      <ConfirmDialog
        open={confirmSave}
        onOpenChange={setConfirmSave}
        tone="edit"
        destructive={false}
        title={t.common.saveConfirmTitle}
        description={t.common.saveConfirmDescription}
        confirmLabel={t.settings.saveSettings}
        cancelLabel={t.common.cancel}
        loading={mutation.isPending}
        onConfirm={() => {
          setConfirmSave(false);
          mutation.mutate(form);
        }}
      />
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-xs text-danger">{error}</p> : null}
    </div>
  );
}
