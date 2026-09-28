"use client";

import { useEffect, useState } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { buildWhatsAppLink } from "@/lib/links";

export default function WhatsAppRedirect() {
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    const requestedMessage = new URLSearchParams(window.location.search).get("message") || undefined;
    setMessage(requestedMessage);

    const timeoutId = window.setTimeout(() => {
      window.location.assign(buildWhatsAppLink(requestedMessage));
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <section className="section-pad flex min-h-[65vh] items-center justify-center bg-cream py-16 sm:py-24">
      <div className="w-full max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-clay">
          nutritionguide by MisScilla Thecoach
        </p>
        <h1 className="mt-4 font-display text-3xl font-medium leading-tight text-cocoa sm:text-5xl">
          Connecting you to Coach Scilla on WhatsApp...
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-stone">
          Thank you for reaching out! Opening your chat session automatically in 2 seconds.
        </p>
        <div className="mt-8 flex justify-center">
          <WhatsAppButton
            label="Open WhatsApp Chat Now"
            message={message}
            destination="whatsapp"
            ctaId="thank-you-redirect"
          />
        </div>
      </div>
    </section>
  );
}