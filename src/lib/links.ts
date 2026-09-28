import { business } from "@/data/business";

/**
 * Builds a wa.me link with an optional custom message.
 * Centralized here so future conversion tracking (Google Ads, GA4, GTM)
 * can be added in one place without touching every call site.
 */
export function buildWhatsAppLink(message?: string) {
  const text = encodeURIComponent(message ?? business.whatsappMessage);
  const number = business.phoneIntl.replace("+", "");
  return `https://wa.me/${number}?text=${text}`;
}

export function buildWhatsAppRedirectLink(message?: string) {
  if (!message) return "/thank-you";
  return `/thank-you?message=${encodeURIComponent(message)}`;
}

export function buildTelLink() {
  return `tel:${business.phoneIntl}`;
}

export function buildEmailLink(subject?: string) {
  const params = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${business.email}${params}`;
}
