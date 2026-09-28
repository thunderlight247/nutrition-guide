import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { business } from "@/data/business";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Thank You | nutritionguide by MisScilla Thecoach",
  description: "Your message has been received by nutritionguide.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContactSuccessPage() {
  return (
    <section className="section-pad flex min-h-[65vh] items-center justify-center bg-cream py-16 sm:py-24">
      <div className="w-full max-w-2xl text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-moss/10 text-moss">
          <Check size={28} strokeWidth={2} aria-hidden="true" />
        </span>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-clay">
          {business.brandName} by {business.ownerName}
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium text-cocoa sm:text-5xl">
          Thank You!
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-stone">
          Your message has been received successfully. Small Madam will get back
          to you as soon as possible.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <WhatsAppButton
            label="Chat on WhatsApp"
            message="Hello Small Madam, I just sent a message through your website and would like to follow up."
            ctaId="contact-success"
          />
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-cocoa/20 px-6 py-3 text-[15px] font-medium text-cocoa transition-colors hover:border-cocoa/50 hover:bg-cocoa/[0.03]"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}