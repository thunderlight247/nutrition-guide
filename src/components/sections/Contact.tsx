import { MapPin, Mail, Clock, Share2 } from "lucide-react";
import { business } from "@/data/business";
import SectionHeader from "@/components/SectionHeader";
import WhatsAppButton from "@/components/WhatsAppButton";
import CallButton from "@/components/CallButton";
import BusinessHours from "@/components/BusinessHours";
import SocialLinks from "@/components/SocialLinks";
import { buildEmailLink } from "@/lib/links";
import ContactForm from "@/components/ContactForm";

const cards = [
  {
    icon: MapPin,
    title: "Location",
    content: (
      <p className="mt-3 text-[15px] leading-relaxed text-stone">
        {business.location.name}
        <br />
        {business.location.line1}
        <br />
        {business.location.line2}
        <br />
        {business.location.city}
      </p>
    ),
  },
  {
    icon: Mail,
    title: "Email",
    content: (
      <a
        href={buildEmailLink("Website enquiry")}
        data-cta="email"
        data-cta-id="contact"
        className="mt-3 block break-all text-[15px] text-stone underline decoration-cocoa/20 underline-offset-4 hover:text-cocoa"
      >
        {business.email}
      </a>
    ),
  },
  {
    icon: Clock,
    title: "Hours",
    content: (
      <div className="mt-3">
        <BusinessHours />
      </div>
    ),
  },
  {
    icon: Share2,
    title: "Follow",
    content: (
      <div className="mt-3">
        <SocialLinks />
      </div>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-pad bg-ivory py-20 sm:py-28">
      <div className="mx-auto max-w-content">
        <SectionHeader
          kicker="Contact"
          title="Let's talk about your goals"
          description="Reach out on WhatsApp for the fastest response, or use the details below."
        />

        <div className="mt-14 flex flex-col gap-3 sm:flex-row">
          <WhatsAppButton ctaId="contact-primary" />
          <CallButton ctaId="contact-primary" variant="solid" />
        </div>

        <div className="mt-12 max-w-3xl rounded-2xl bg-cream p-6 shadow-sm shadow-cocoa/[0.04] ring-1 ring-cocoa/8 sm:p-8">
          <h3 className="font-display text-2xl font-medium">Send us a message</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-stone">
            Tell us a little about yourself and how we can help.
          </p>
          <ContactForm />
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, content }) => (
            <div
              key={title}
              className="rounded-2xl bg-cream p-6 shadow-sm shadow-cocoa/[0.04] ring-1 ring-cocoa/8"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-clay/10 text-clay">
                <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-medium">
                {title}
              </h3>
              {content}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
