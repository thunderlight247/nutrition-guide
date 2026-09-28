import { MessageCircle } from "lucide-react";
import { buildWhatsAppRedirectLink } from "@/lib/links";

export default function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppRedirectLink()}
      data-cta="whatsapp"
      data-cta-id="floating"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-moss text-ivory shadow-lg shadow-moss/25 transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
    >
      <MessageCircle size={26} strokeWidth={2} aria-hidden="true" />
    </a>
  );
}
