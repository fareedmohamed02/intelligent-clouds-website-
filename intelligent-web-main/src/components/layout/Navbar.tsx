import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { ChevronDown, Menu, Search, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { SiteSearch, useSiteSearchHotkey } from "@/components/SiteSearch";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";
import { brand } from "@/lib/assets";
import { useI18n } from "@/i18n";
import { getMegaPanels, type MegaId, type MegaPanel } from "@/lib/nav";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function MegaPanelContent({
  panel,
  onNavigate,
}: {
  panel: MegaPanel;
  onNavigate?: () => void;
}) {
  return (
    <div className="container-ic grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_240px]">
      <div
        className={cn(
          "grid gap-8",
          panel.columns.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2",
        )}
      >
        {panel.columns.map((col) => (
          <div key={col.heading}>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-600">
              {col.heading}
            </p>
            <ul className="mt-3 space-y-1">
              {col.links.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={onNavigate}
                      className="group flex gap-3 rounded-[10px] px-2 py-2.5 transition-colors hover:bg-surface-50"
                    >
                      {Icon ? (
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-azure-100 text-navy-900">
                          <Icon className="h-4 w-4" aria-hidden />
                        </span>
                      ) : null}
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-navy-900 group-hover:text-orange-500">
                          {link.title}
                        </span>
                        <span className="mt-0.5 block text-xs leading-snug text-text-600">
                          {link.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {panel.featured ? (
        <aside className="rounded-[12px] border border-border-200 bg-navy-950 p-5 text-white lg:self-start">
          <p className="font-display text-base font-semibold">{panel.featured.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            {panel.featured.description}
          </p>
          <Link
            to={panel.featured.to}
            onClick={onNavigate}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-500/90"
          >
            {panel.featured.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      ) : null}

      <div className="border-t border-border-200 pt-4 lg:col-span-full">
        <Link
          to={panel.overviewTo}
          onClick={onNavigate}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:underline"
        >
          {panel.overviewLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

export function Navbar() {
  const { t, locale } = useI18n();
  const location = useLocation();
  const reduced = usePrefersReducedMotion();
  const megaPanels = useMemo(() => getMegaPanels(t), [t]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openMega, setOpenMega] = useState<MegaId | null>(null);
  const [mobileSection, setMobileSection] = useState<MegaId | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navId = useId();
  const navFade = useAnimationControls();
  const skipNavFade = useRef(true);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  useSiteSearchHotkey(openSearch);

  useEffect(() => {
    if (skipNavFade.current) {
      skipNavFade.current = false;
      return;
    }
    if (reduced) return;
    navFade.set({ opacity: 0.45 });
    void navFade.start({
      opacity: 1,
      transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
    });
  }, [locale, reduced, navFade]);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMega(null);
    setMobileSection(null);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMega(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openPanel = (id: MegaId) => {
    clearCloseTimer();
    setOpenMega(id);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenMega(null), 140);
  };

  // Light tinted, near-opaque bar so it stays readable over any hero.
  const activePanel = megaPanels.find((p) => p.id === openMega) ?? null;

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-border-200 bg-surface-100/95 backdrop-blur-md text-navy-900 shadow-[0_8px_24px_-18px_rgba(4,39,95,0.18)]"
        onMouseLeave={scheduleClose}
      >
        <div className="container-ic grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-1.5 justify-self-start"
            onMouseEnter={scheduleClose}
          >
            <img
              src={brand.logo}
              alt={t.brand}
              className="h-10 w-auto"
              width={40}
              height={40}
              decoding="async"
            />
            <span className="hidden text-base font-semibold tracking-tight text-navy-900 sm:inline">
              {t.brand}
            </span>
          </Link>

          <motion.nav
            initial={false}
            animate={navFade}
            className="hidden items-center justify-center gap-2 lg:flex"
            aria-label="Primary"
          >
            {megaPanels.map((panel) => {
              const isOpen = openMega === panel.id;
              return (
                <div
                  key={panel.id}
                  className="relative"
                  onMouseEnter={() => openPanel(panel.id)}
                >
                  <button
                    type="button"
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-[8px] px-5 py-2.5 text-sm font-medium outline-none transition-colors",
                      isOpen
                        ? "bg-surface-50 text-navy-900"
                        : "text-text-600 hover:bg-surface-50 hover:text-navy-900",
                    )}
                    aria-expanded={isOpen}
                    aria-controls={`${navId}-${panel.id}`}
                    aria-haspopup="true"
                    onClick={() => setOpenMega(isOpen ? null : panel.id)}
                    onFocus={() => openPanel(panel.id)}
                  >
                    {panel.label}
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
                      }
                      className="inline-flex"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>
                </div>
              );
            })}
          </motion.nav>

          <div
            className="flex items-center justify-end gap-1.5 justify-self-end sm:gap-2"
            onMouseEnter={scheduleClose}
          >
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="before:hidden bg-transparent text-navy-900 shadow-none hover:bg-transparent hover:text-orange-500 hover:shadow-none hover:before:scale-x-0 hover:[&_svg]:translate-x-0"
              aria-label={t.nav.search}
              onClick={openSearch}
            >
              <Search className="h-4 w-4 transition-transform duration-200 group-hover/btn:scale-110" />
            </Button>
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="hidden text-navy-900 hover:bg-transparent hover:text-orange-500 lg:inline-flex"
            >
              <Link to="/contact">{t.nav.contactSales}</Link>
            </Button>
            <LanguageSwitcher />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="text-navy-900 hover:bg-surface-50 lg:hidden"
              aria-label={t.nav.openMenu}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Full-width multiline mega panel — animated from top */}
        <AnimatePresence initial={false}>
          {openMega && activePanel ? (
            <motion.div
              key="mega-shell"
              id={`${navId}-${activePanel.id}`}
              className="origin-top overflow-hidden border-t border-border-200 bg-white text-navy-900 shadow-[0_16px_40px_-20px_rgba(4,39,95,0.28)]"
              initial={
                reduced
                  ? { opacity: 1, height: "auto" }
                  : { opacity: 0, height: 0, y: -16 }
              }
              animate={
                reduced
                  ? { opacity: 1, height: "auto" }
                  : { opacity: 1, height: "auto", y: 0 }
              }
              exit={
                reduced ? { opacity: 0, height: 0 } : { opacity: 0, height: 0, y: -12 }
              }
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={clearCloseTimer}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activePanel.id}
                  initial={reduced ? false : { opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -6 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
                  }
                >
                  <MegaPanelContent
                    panel={activePanel}
                    onNavigate={() => setOpenMega(null)}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {openMega ? (
          <motion.div
            key="mega-backdrop"
            className="fixed inset-0 z-40 hidden bg-navy-950/30 lg:block"
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.6 }}
            aria-hidden
            onMouseEnter={scheduleClose}
            onClick={() => setOpenMega(null)}
          />
        ) : null}
      </AnimatePresence>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="flex w-[min(100%,22rem)] flex-col">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <img src={brand.logo} alt="" className="h-8 w-auto" />
              <SheetTitle className="text-base">{t.brand}</SheetTitle>
            </div>
            <SheetClose asChild>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label={t.nav.closeMenu}
              >
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>

          <nav className="mt-6 flex-1 overflow-y-auto" aria-label="Mobile">
            {megaPanels.map((panel) => {
              const expanded = mobileSection === panel.id;
              return (
                <div key={panel.id} className="border-b border-border-200">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-1 py-3 text-start text-sm font-semibold text-navy-900"
                    aria-expanded={expanded}
                    onClick={() => setMobileSection(expanded ? null : panel.id)}
                  >
                    {panel.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-text-600 transition-transform",
                        expanded && "rotate-180",
                      )}
                    />
                  </button>
                  {expanded ? (
                    <div className="space-y-4 pb-4">
                      {panel.columns.map((col) => (
                        <div key={col.heading}>
                          <p className="px-1 font-mono text-[10px] uppercase tracking-[0.12em] text-text-600">
                            {col.heading}
                          </p>
                          <ul className="mt-1">
                            {col.links.map((link) => (
                              <li key={link.to}>
                                <Link
                                  to={link.to}
                                  className="block rounded-[8px] px-2 py-2 text-sm text-text-600 hover:bg-surface-50 hover:text-navy-900"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {link.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <Link
                        to={panel.overviewTo}
                        className="inline-flex items-center gap-1 px-2 text-sm font-semibold text-orange-500"
                        onClick={() => setMobileOpen(false)}
                      >
                        {panel.overviewLabel}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="mt-auto flex flex-col gap-2 border-t border-border-200 pt-4">
            <Button
              type="button"
              variant="outline"
              className="before:hidden hover:before:scale-x-0 hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-500 hover:shadow-none hover:[&_svg]:translate-x-0 hover:[&_svg]:scale-110"
              onClick={openSearch}
            >
              <Search className="h-4 w-4 transition-transform duration-200" />
              {t.nav.search}
            </Button>
            <Button asChild>
              <Link to="/contact">{t.nav.contactSales}</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/book-demo">{t.nav.bookDemo}</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <SiteSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
