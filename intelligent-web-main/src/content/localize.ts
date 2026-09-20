import type { Locale } from "@/i18n/messages";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Deep-merge objects; arrays in the overlay replace base arrays entirely. */
function deepMerge(
  base: Record<string, unknown>,
  overlay: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = { ...base };
  for (const key of Object.keys(overlay)) {
    const next = overlay[key];
    if (next === undefined) continue;
    const prev = base[key];
    if (Array.isArray(next)) {
      out[key] = next;
    } else if (isPlainObject(next) && isPlainObject(prev)) {
      out[key] = deepMerge(prev, next);
    } else {
      out[key] = next;
    }
  }
  return out;
}

/**
 * When locale is `ar` and an overlay is provided, deep-merge overlay onto base.
 * Arrays from the overlay replace; nested objects merge field-by-field.
 */
export function mergeLocale<T extends Record<string, unknown>>(
  base: T,
  overlay: Partial<T> | undefined,
  locale: Locale,
): T {
  if (locale !== "ar" || !overlay) return base;
  return deepMerge(base, overlay as Record<string, unknown>) as T;
}
