/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  /** Public site origin for canonical/OG/sitemap absolute URLs (e.g. https://intelligent-cloud.com) */
  readonly VITE_SITE_URL?: string;
  /** Google Tag Manager container ID (GTM-XXXX). When set, preferred over direct GA4. */
  readonly VITE_GTM_ID?: string;
  /** Google Analytics 4 measurement ID (G-XXXX). Used only if GTM is empty. */
  readonly VITE_GA4_ID?: string;
  /** Microsoft Clarity project ID. Leave empty to disable. */
  readonly VITE_CLARITY_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
