import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronsUpDown,
  Globe,
  KeyRound,
  LogOut,
  Settings,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/i18n";
import { apiFetch } from "@/lib/api";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function initials(name?: string, email?: string) {
  const source = (name || email || "?").trim();
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}

export function AdminAccountMenu() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { locale, setLocale, t } = useI18n();
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const resetPasswordForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const submitPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast.error(t.account.passwordMin);
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error(t.account.passwordMismatch);
      return;
    }
    setSaving(true);
    try {
      await apiFetch("/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      toast.success(t.account.passwordChanged);
      setPasswordOpen(false);
      resetPasswordForm();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t.account.passwordFailed);
    } finally {
      setSaving(false);
    }
  };

  const confirmSignOut = async () => {
    setSigningOut(true);
    try {
      await logout();
    } finally {
      setSigningOut(false);
      setSignOutOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center gap-2.5 rounded-xl bg-white/5 px-2.5 py-2.5 text-start transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-[#d95c0f] text-xs font-semibold text-white">
              {initials(user?.name, user?.email)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-white">
                {user?.name || t.account.admin}
              </span>
              <span className="block truncate text-xs text-white/45">
                {user?.email}
              </span>
            </span>
            <ChevronsUpDown className="h-4 w-4 shrink-0 text-white/45" aria-hidden />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="top" align="start" className="w-[15rem]">
          <DropdownMenuLabel className="truncate font-normal">
            {user?.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onSelect={() => navigate("/settings")}>
            <Settings className="h-4 w-4 opacity-70" />
            {t.nav.siteSettings}
          </DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Globe className="h-4 w-4 opacity-70" />
              {t.nav.language}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={locale}
                onValueChange={(value) => {
                  if (value === "en" || value === "ar") setLocale(value);
                }}
              >
                <DropdownMenuRadioItem value="en">{t.nav.english}</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="ar">{t.nav.arabic}</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuItem
            onSelect={() => {
              resetPasswordForm();
              setPasswordOpen(true);
            }}
          >
            <KeyRound className="h-4 w-4 opacity-70" />
            {t.account.changePassword}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-red-300 focus:bg-red-500/15 focus:text-red-200"
            onSelect={() => setSignOutOpen(true)}
          >
            <LogOut className="h-4 w-4 opacity-70" />
            {t.nav.signOut}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={signOutOpen}
        onOpenChange={setSignOutOpen}
        tone="signout"
        destructive={false}
        title={t.account.signOutTitle}
        description={t.account.signOutDescription}
        confirmLabel={t.account.signOutConfirm}
        cancelLabel={t.common.cancel}
        loading={signingOut}
        onConfirm={() => void confirmSignOut()}
      />

      <Dialog
        open={passwordOpen}
        onOpenChange={(open) => {
          setPasswordOpen(open);
          if (!open) resetPasswordForm();
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900/10 text-navy-900">
                <KeyRound className="h-4 w-4" />
              </span>
              {t.account.changePassword}
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={(e) => void submitPassword(e)}>
            <div className="space-y-2">
              <Label htmlFor="current-password">{t.account.currentPassword}</Label>
              <Input
                id="current-password"
                type="password"
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">{t.account.newPassword}</Label>
              <Input
                id="new-password"
                type="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">{t.account.confirmPassword}</Label>
              <Input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                onClick={() => setPasswordOpen(false)}
              >
                {t.common.cancel}
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? t.common.saving : t.account.updatePassword}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
