import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink, buildWhatsAppRedirectLink } from "@/lib/links";

type Props = {
  label?: string;
  message?: string;
  variant?: "solid" | "outline" | "light";
  className?: string;
  destination?: "thank-you" | "whatsapp";
  /** Identifies this CTA's placement for future conversion-tracking hooks. */
  ctaId: string;
};

export default function WhatsAppButton({
  label = "Chat on WhatsApp",
  message,
  variant = "solid",
  className = "",
  destination = "thank-you",
  ctaId,
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium transition-all duration-200 active:scale-[0.98]";

  const variants: Record<string, string> = {
    solid:
      "bg-moss text-ivory shadow-lg shadow-moss/20 hover:bg-moss-dark hover:shadow-xl hover:shadow-moss/25 hover:-translate-y-0.5",
    outline:
      "border border-cocoa/20 text-cocoa hover:border-cocoa/50 hover:bg-cocoa/[0.03]",
    light:
      "bg-ivory text-cocoa shadow-lg shadow-cocoa/10 hover:bg-white hover:shadow-xl hover:-translate-y-0.5",
  };

  return (
    <a
      href={
        destination === "whatsapp"
          ? buildWhatsAppLink(message)
          : buildWhatsAppRedirectLink(message)
      }
      target={destination === "whatsapp" ? "_blank" : undefined}
      rel={destination === "whatsapp" ? "noopener noreferrer" : undefined}
      data-cta="whatsapp"
      data-cta-id={ctaId}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
      {label}
    </a>
  );
}
