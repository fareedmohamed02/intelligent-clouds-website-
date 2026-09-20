import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type {
  FaqItem,
  ServiceItem,
  SettingsPublic,
  SolutionItem,
} from "@/lib/types";

export function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const res = await apiFetch<{ success: boolean; data: SettingsPublic }>(
        "/settings",
      );
      return res.data;
    },
    staleTime: 60_000,
  });
}

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await apiFetch<{ success: boolean; data: ServiceItem[] }>(
        "/services",
      );
      return res.data;
    },
    staleTime: 60_000,
  });
}

export function useService(slug: string | undefined) {
  return useQuery({
    queryKey: ["services", slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      const res = await apiFetch<{ success: boolean; data: ServiceItem }>(
        `/services/${slug}`,
      );
      return res.data;
    },
    staleTime: 60_000,
  });
}

export function useSolutions(audience?: "startup" | "enterprise") {
  return useQuery({
    queryKey: ["solutions", audience ?? "all"],
    queryFn: async () => {
      const qs = audience ? `?audience=${audience}` : "";
      const res = await apiFetch<{ success: boolean; data: SolutionItem[] }>(
        `/solutions${qs}`,
      );
      return res.data;
    },
    staleTime: 60_000,
  });
}

export function useSolution(slug: string | undefined) {
  return useQuery({
    queryKey: ["solutions", "detail", slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      const res = await apiFetch<{ success: boolean; data: SolutionItem }>(
        `/solutions/${slug}`,
      );
      return res.data;
    },
    staleTime: 60_000,
  });
}

export function useFaqs() {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const res = await apiFetch<{ success: boolean; data: FaqItem[] }>("/faqs");
      return res.data;
    },
    staleTime: 60_000,
  });
}

