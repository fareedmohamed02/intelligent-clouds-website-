/**
 * Public marketing site origin for “open live page” links from admin.
 * Prefer VITE_SITE_URL; never keep a localhost fallback when admin is hosted.
 */
export function getPublicSiteUrl(): string {
  const configured = (import.meta.env.VITE_SITE_URL ?? "").trim().replace(/\/$/, "");

  if (typeof window === "undefined") {
    return configured || "http://localhost:5173";
  }

  const { protocol, hostname, port } = window.location;
  const isLocalHost =
    hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";

  const configuredIsLocal =
    !configured ||
    /^(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?$/i.test(configured);

  if (configured && !(configuredIsLocal && !isLocalHost)) {
    return configured;
  }

  if (isLocalHost) {
    return configured || "http://localhost:5173";
  }

  // admin.example.com → https://example.com
  if (hostname.startsWith("admin.")) {
    return `${protocol}//${hostname.slice("admin.".length)}`;
  }

  // Same host as the public site (or unknown layout)
  return `${protocol}//${hostname}${port ? `:${port}` : ""}`;
}

