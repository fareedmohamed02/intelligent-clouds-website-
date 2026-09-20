import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

const VISITOR_KEY = "ic-visitor-id";

function loadScript(src: string, attrs: Record<string, string> = {}) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const el = document.createElement("script");
  el.src = src;
  el.async = true;
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  document.head.appendChild(el);
}

function getVisitorId(): string {
  try {
    const existing = localStorage.getItem(VISITOR_KEY);
    if (existing && existing.length >= 8) return existing;
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `v_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(VISITOR_KEY, id);
    return id;
  } catch {
    return `anon_${Date.now().toString(36)}`;
  }
}

function apiBase(): string {
  return (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") || "";
}

/** First-party pageview for admin traffic stats (unique visitors + country). */
function trackPageview(path: string) {
  const base = apiBase();
  if (!base) return;

  const payload = {
    visitorId: getVisitorId(),
    path,
    referrer: typeof document !== "undefined" ? document.referrer.slice(0, 1000) : "",
  };

  const body = JSON.stringify(payload);
  const url = `${base}/analytics/pageview`;

  // Prefer fetch so Express JSON middleware reliably parses the body.
  // Fall back to sendBeacon only if fetch is unavailable.
  try {
    void fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      /* ignore analytics failures */
    });
    return;
  } catch {
    /* fall through */
  }

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(url, blob);
    }
  } catch {
    /* ignore */
  }
}

/**
 * Env-gated third-party tags + first-party pageviews.
 * Leave GTM/GA/Clarity IDs empty in local/dev to disable those scripts.
 */
export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    const gtmId = import.meta.env.VITE_GTM_ID?.trim();
    const gaId = import.meta.env.VITE_GA4_ID?.trim();
    const clarityId = import.meta.env.VITE_CLARITY_ID?.trim();

    if (gtmId) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`);

      if (!document.getElementById("ic-gtm-noscript")) {
        const noscript = document.createElement("noscript");
        noscript.id = "ic-gtm-noscript";
        noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(gtmId)}" height="0" width="0" style="display:none;visibility:hidden" title="gtm"></iframe>`;
        document.body.prepend(noscript);
      }
    } else if (gaId) {
      loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", gaId);
    }

    if (clarityId) {
      const w = window;
      w.clarity =
        w.clarity ||
        function (...args: unknown[]) {
          ((w.clarity as unknown as { q: unknown[] }).q =
            (w.clarity as unknown as { q?: unknown[] }).q || []).push(args);
        };
      loadScript(`https://www.clarity.ms/tag/${encodeURIComponent(clarityId)}`);
    }
  }, []);

  useEffect(() => {
    const path = `${location.pathname}${location.search}`;
    trackPageview(path);
  }, [location.pathname, location.search]);

  return null;
}
