import type { Metadata } from "next";
import WhatsAppRedirect from "@/components/WhatsAppRedirect";

export const metadata: Metadata = {
  title: "Thank You | nutritionguide by MisScilla Thecoach",
  description: "Continue your conversation with Coach Scilla on WhatsApp.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return <WhatsAppRedirect />;
}