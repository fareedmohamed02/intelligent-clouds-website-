import { useMemo } from "react";

/** Timestamp captured when the form UI mounts (for min-fill spam guard). */
export function useFormStartedAt() {
  return useMemo(() => Date.now(), []);
}

export function withSpamFields<T extends Record<string, unknown>>(
  fields: T,
  opts: { website: string; formStartedAt: number },
) {
  return {
    ...fields,
    website: opts.website,
    formStartedAt: opts.formStartedAt,
  };
}
