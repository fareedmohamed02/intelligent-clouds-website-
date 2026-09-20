import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toast";
import { AuthProvider } from "@/lib/auth";
import { LocaleProvider } from "@/i18n";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminLayout } from "@/layouts/AdminLayout";
import { LoginPage } from "@/pages/LoginPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { FaqsPage } from "@/pages/FaqsPage";
import { ContactsPage } from "@/pages/ContactsPage";
import { BookingsPage } from "@/pages/BookingsPage";
import { TicketsPage } from "@/pages/TicketsPage";
import { AnalyticsPage } from "@/pages/AnalyticsPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route path="leads/contacts" element={<ContactsPage />} />
                  <Route path="leads/bookings" element={<BookingsPage />} />
                  <Route path="content/faqs" element={<FaqsPage />} />
                  <Route path="support/tickets" element={<TicketsPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </LocaleProvider>
    </QueryClientProvider>
  );
}
