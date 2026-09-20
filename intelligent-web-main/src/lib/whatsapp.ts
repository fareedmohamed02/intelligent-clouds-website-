/** WhatsApp “Talk to an Expert” helper — Gulf number from client Q&A. */
export const WHATSAPP_E164 = "966596264058";
export const WHATSAPP_DISPLAY = "+966 59 626 4058";

export function whatsappExpertUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_E164}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
