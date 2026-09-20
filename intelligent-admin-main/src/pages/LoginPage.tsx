import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { brand } from "@/lib/assets";
import { toast } from "@/components/ui/toast";
import { useI18n } from "@/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function LoginPage() {
  const { login, user, loading } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  const validate = () => {
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) next.email = t.login.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = t.login.emailInvalid;
    }
    if (!password) next.password = t.login.passwordRequired;
    else if (password.length < 6) next.password = t.login.passwordMin;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-950 px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,99,189,0.35),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(242,106,19,0.22),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-20" />
      <div className="absolute end-4 top-4 z-10">
        <LanguageSwitcher />
      </div>
      <div className="relative w-full max-w-md rounded-[12px] border border-white/10 bg-white p-8 shadow-xl">
        <div className="flex items-center gap-3">
          <img src={brand.logo} alt={t.brand} className="h-12 w-auto" />
          <div>
            <p className="text-lg font-semibold tracking-tight text-navy-900">{t.brand}</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-orange-600">
              {t.adminConsole}
            </p>
          </div>
        </div>
        <h1 className="mt-6 text-2xl font-semibold text-navy-900">{t.login.title}</h1>
        <p className="mt-2 text-sm text-text-600">{t.login.subtitle}</p>
        <form
          className="mt-6 space-y-4"
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            if (!validate()) {
              toast.error(t.login.fixFields);
              return;
            }
            setSubmitting(true);
            void login(email, password)
              .then(() => {
                toast.success(t.login.success);
                navigate("/");
              })
              .catch((err: unknown) => {
                toast.error(err instanceof Error ? err.message : t.login.failed);
              })
              .finally(() => setSubmitting(false));
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="email">{t.login.email}</Label>
            <Input
              id="email"
              name="admin-email"
              type="email"
              value={email}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              aria-invalid={Boolean(errors.email)}
              className={errors.email ? "border-danger" : undefined}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: undefined }));
              }}
            />
            {errors.email ? (
              <p role="alert" className="text-xs font-medium text-danger">
                {errors.email}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t.login.password}</Label>
            <Input
              id="password"
              name="admin-password"
              type="password"
              value={password}
              autoComplete="new-password"
              aria-invalid={Boolean(errors.password)}
              className={errors.password ? "border-danger" : undefined}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: undefined }));
              }}
            />
            {errors.password ? (
              <p role="alert" className="text-xs font-medium text-danger">
                {errors.password}
              </p>
            ) : null}
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? t.login.submitting : t.login.submit}
          </Button>
        </form>
      </div>
    </div>
  );
}
