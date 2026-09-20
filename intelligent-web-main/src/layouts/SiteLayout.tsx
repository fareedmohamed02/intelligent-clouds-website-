import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, useAnimationControls } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { SeoProvider } from "@/components/PageSeo";
import { useI18n } from "@/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { easeOut } from "@/lib/motion";

function useLocaleContentMotion() {
  const { locale } = useI18n();
  const reduced = usePrefersReducedMotion();
  const controls = useAnimationControls();
  const skip = useRef(true);

  useEffect(() => {
    if (skip.current) {
      skip.current = false;
      return;
    }
    if (reduced) return;
    // Opacity-only — avoid translate transforms so sticky photo heroes work.
    controls.set({ opacity: 0.55 });
    void controls.start({
      opacity: 1,
      transition: { duration: 0.28, ease: easeOut },
    });
  }, [locale, reduced, controls]);

  return controls;
}

export function SiteLayout() {
  const location = useLocation();
  const reduced = usePrefersReducedMotion();
  const contentMotion = useLocaleContentMotion();

  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          return;
        }
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.search, location.hash]);

  return (
    <SeoProvider>
      <div className="flex min-h-screen flex-col bg-surface-50">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-[8px] focus:bg-orange-500 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <motion.div
          initial={false}
          animate={contentMotion}
          className="flex flex-1 flex-col"
        >
          <main
            id="main-content"
            className="flex-1 pt-14"
            tabIndex={-1}
          >
            <motion.div
              key={location.pathname}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0 : 0.45, ease: easeOut }}
            >
              <Outlet />
            </motion.div>
          </main>
          <Footer />
        </motion.div>
        <WhatsAppFab />
      </div>
    </SeoProvider>
  );
}
