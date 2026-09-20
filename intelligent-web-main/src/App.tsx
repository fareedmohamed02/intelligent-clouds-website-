import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/toast";
import { Analytics } from "@/components/Analytics";
import { LocaleProvider } from "@/i18n";
import { SiteLayout } from "@/layouts/SiteLayout";
import { HomePage } from "@/pages/HomePage";
import { ServicesPage } from "@/pages/ServicesPage";
import { ServiceDetailPage } from "@/pages/ServiceDetailPage";
import { SolutionsPage } from "@/pages/SolutionsPage";
import { SolutionDetailPage } from "@/pages/SolutionDetailPage";
import { AboutPage } from "@/pages/AboutPage";
import { FaqPage } from "@/pages/FaqPage";
import { SupportPage } from "@/pages/SupportPage";
import { ContactPage } from "@/pages/ContactPage";
import { BookDemoPage } from "@/pages/BookDemoPage";
import { PrivacyPage, TermsPage } from "@/pages/LegalPages";
import { easeOut } from "@/lib/motion";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Marketing routes.
 * Locale (EN/AR) is controlled by LocaleProvider — RTL flips automatically for Arabic.
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LocaleProvider initialLocale="en">
          <MotionConfig transition={{ duration: 0.9, ease: easeOut }}>
            <Analytics />
            <Routes>
              <Route element={<SiteLayout />}>
                <Route index element={<HomePage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="services/:slug" element={<ServiceDetailPage />} />
                <Route path="solutions" element={<SolutionsPage />} />
                <Route path="solutions/:slug" element={<SolutionDetailPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="faq" element={<FaqPage />} />
                <Route path="support" element={<SupportPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="book-demo" element={<BookDemoPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="terms" element={<TermsPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toaster richColors position="top-right" />
          </MotionConfig>
        </LocaleProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
