export type FieldErrors<T extends string = string> = Partial<Record<T, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHARS_RE = /^\+?[\d\s().-]+$/;

export function sanitizePhoneInput(value: string): string {
  const cleaned = value.replace(/[^\d+\s().-]/g, "");
  const plus = cleaned.startsWith("+") ? "+" : "";
  const rest = cleaned.replace(/\+/g, "");
  return plus + rest;
}

export function email(value: string, label = "Email"): string | undefined {
  if (!value.trim()) return `${label} is required`;
  const trimmed = value.trim();
  if (!EMAIL_RE.test(trimmed) || trimmed.includes("..")) {
    return "Enter a valid email address";
  }
  return undefined;
}

export function phone(value: string, label = "Phone"): string | undefined {
  if (!value.trim()) return `${label} is required`;
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (!PHONE_CHARS_RE.test(trimmed) || digits.length < 8 || digits.length > 15) {
    return "Enter a valid phone number (digits only, 8–15 digits)";
  }
  return undefined;
}

export function optionalPhone(value: string, label = "Phone"): string | undefined {
  if (!value.trim()) return undefined;
  return phone(value, label);
}

export function optionalHttpUrl(value: string, label = "URL"): string | undefined {
  if (!value.trim()) return undefined;
  if (!/^https?:\/\/.+/i.test(value.trim())) {
    return `${label} must start with http:// or https://`;
  }
  return undefined;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.values(errors).some(Boolean);
}
