import { NavLink, Outlet } from "react-router-dom";
import {
  FileQuestion,
  LayoutDashboard,
  LifeBuoy,
  CalendarCheck2,
  Inbox,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { brand } from "@/lib/assets";
import { useI18n } from "@/i18n";
import { AdminBreadcrumbs } from "@/components/AdminBreadcrumbs";
import { AdminAccountMenu } from "@/components/AdminAccountMenu";

export function AdminLayout() {
  const { t } = useI18n();

  const navSections = [
    {
      label: t.nav.overview,
      items: [
        { to: "/", label: t.nav.dashboard, icon: LayoutDashboard, end: true },
        { to: "/analytics", label: t.nav.analytics, icon: BarChart3 },
      ],
    },
    {
      label: t.nav.leads,
      items: [
        { to: "/leads/contacts", label: t.nav.contacts, icon: Inbox },
        { to: "/leads/bookings", label: t.nav.bookings, icon: CalendarCheck2 },
      ],
    },
    {
      label: t.nav.content,
      items: [
        { to: "/content/faqs", label: t.nav.faqs, icon: FileQuestion },
      ],
    },
    {
      label: t.nav.support,
      items: [{ to: "/support/tickets", label: t.nav.tickets, icon: LifeBuoy }],
    },
  ];

  return (
    <div className="min-h-screen bg-[#eef3f8]">
      <aside className="fixed inset-y-0 start-0 z-30 flex w-[16.25rem] flex-col overflow-hidden bg-[#061830] text-white">
        {/* Soft brand glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 top-0 h-48 w-48 rounded-full bg-azure-500/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 bottom-24 h-40 w-40 rounded-full bg-orange-500/15 blur-3xl"
        />

        <div className="relative flex shrink-0 items-center gap-3 border-b border-white/8 px-5 py-5">
          <div className="relative">
            <img src={brand.logo} alt={t.brand} className="h-9 w-auto" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight">{t.brand}</p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
              {t.adminConsole}
            </p>
          </div>
        </div>

        <nav className="ic-scroll relative flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 py-3">
          {navSections.map((section) => (
            <div key={section.label}>
              <p className="mb-1 px-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
                {section.label}
              </p>
              <div className="flex flex-col gap-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={"end" in item ? Boolean(item.end) : false}
                      className={({ isActive }) =>
                        cn(
                          "group relative flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-sm transition-all",
                          isActive
                            ? "bg-white/10 font-medium text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                            : "text-white/55 hover:bg-white/[0.06] hover:text-white",
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive ? (
                            <span
                              aria-hidden
                              className="absolute start-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-e-full bg-orange-500"
                            />
                          ) : null}
                          <span
                            className={cn(
                              "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                              isActive
                                ? "bg-orange-500 text-white shadow-[0_8px_18px_-10px_rgba(242,106,19,0.95)]"
                                : "bg-white/[0.06] text-white/70 group-hover:bg-white/10 group-hover:text-white",
                            )}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <span className="truncate">{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="relative shrink-0 border-t border-white/8 p-3">
          <AdminAccountMenu />
        </div>
      </aside>

      <div className="flex min-h-screen min-w-0 flex-col ps-[16.25rem]">
        <main className="w-full flex-1 px-6 py-6 lg:px-8 lg:py-8">
          <AdminBreadcrumbs className="mb-5" />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
