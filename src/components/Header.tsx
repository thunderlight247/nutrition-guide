"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { business } from "@/data/business";
import WhatsAppButton from "./WhatsAppButton";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Wellness", href: "#wellness" },
  { label: "Portion Checker", href: "https://opal.google/app/10wG_g8VtnixPF8Mv4bSQK6kgzQary1rV", external: true },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-cream/85 backdrop-blur-md transition-shadow duration-200 ${
        scrolled
          ? "border-cocoa/10 shadow-sm shadow-cocoa/[0.04]"
          : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between section-pad py-3.5">
        <a href="#top" className="flex items-center gap-2.5">
          <Image
            src="/images/logo-icon.png"
            alt=""
            width={38}
            height={38}
            className="h-9 w-9 flex-shrink-0"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold tracking-tight">
              {business.brandName}
            </span>
            <span className="text-xs text-stone">{business.brandTagline}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="relative text-[15px] text-cocoa/80 transition-colors hover:text-cocoa after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-clay after:transition-all after:duration-200 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <WhatsAppButton ctaId="header" label="Chat on WhatsApp" />
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full p-2 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-cocoa/8 bg-cream md:hidden">
          <nav className="mx-auto flex max-w-content flex-col gap-1 section-pad py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-[15px] text-cocoa/85 hover:bg-sand/50"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2">
              <WhatsAppButton
                ctaId="mobile-menu"
                label="Chat on WhatsApp"
                className="w-full"
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}