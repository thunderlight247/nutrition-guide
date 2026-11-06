"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion";
import { MapPin, Leaf, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { business } from "@/data/business";
import WhatsAppButton from "@/components/WhatsAppButton";

const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  // Parallax scroll tracking from top of hero down towards About
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end -30%"],
  });

  // Smooth spring physics for fluid movement
  const rawImageY = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const heroImageY = useSpring(rawImageY, { stiffness: 75, damping: 22, restDelta: 0.001 });

  const rawScale = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1.04, 1.02]);
  const heroImageScale = useSpring(rawScale, { stiffness: 90, damping: 25 });

  const rawRotate = useTransform(scrollYProgress, [0, 1], [-2, 3]);
  const frameBackdropRotate = useSpring(rawRotate, { stiffness: 90, damping: 25 });

  const blobOneY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const blobTwoY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const floatingBadgeY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative overflow-visible pt-4 sm:pt-6"
    >
      {/* Parallax ambient background layers */}
      <motion.div
        aria-hidden="true"
        style={{ y: blobOneY }}
        className="pointer-events-none absolute -left-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-moss/[0.08] blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: blobTwoY }}
        className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-clay/[0.08] blur-3xl"
      />

      <div className="relative mx-auto grid max-w-content items-center gap-14 section-pad pb-16 pt-10 sm:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:pb-24 lg:pt-20">
        {/* Left Column: Value Proposition & Clear Conversion Paths */}
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={textItemVariants}
            className="flex flex-wrap items-center gap-2.5"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-moss/20 bg-moss/10 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-moss shadow-sm">
              <MapPin size={14} strokeWidth={2.25} aria-hidden="true" />
              {business.serviceArea}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-clay/20 bg-clay/10 px-3 py-1 text-xs font-semibold text-clay">
              <span className="h-2 w-2 rounded-full bg-clay animate-pulse" />
              Direct Coaching Available
            </span>
          </motion.div>

          <motion.h1
            variants={textItemVariants}
            className="mt-6 max-w-xl text-[2.6rem] font-display font-medium leading-[1.08] tracking-[-0.015em] text-balance sm:text-5xl lg:text-[3.5rem] text-cocoa"
          >
            Nutrition guidance that fits your{" "}
            <span className="relative inline-block text-clay underline decoration-clay/30 decoration-wavy decoration-2 underline-offset-8">
              everyday life
            </span>
          </motion.h1>

          <motion.p
            variants={textItemVariants}
            className="mt-6 max-w-lg text-[16px] sm:text-[17px] leading-relaxed text-stone"
          >
            <strong className="font-semibold text-cocoa">{business.ownerHandle}</strong> helps people across Ghana and the diaspora achieve real, lasting body transformations with 100% genuine Herbalife nutrition, realistic meal plans, and ongoing 1-on-1 guidance.
          </motion.p>

          <motion.div
            variants={textItemVariants}
            className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center"
          >
            <WhatsAppButton ctaId="hero-primary" />
            <a
              href="#wellness"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-cocoa/20 bg-ivory/60 px-6 py-3.5 text-[15px] font-medium text-cocoa backdrop-blur-sm transition-all duration-200 hover:border-cocoa/50 hover:bg-ivory hover:shadow-md"
            >
              <span>Explore Products</span>
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          {/* Trust points bar */}
          <motion.div
            variants={textItemVariants}
            className="mt-10 pt-6 border-t border-cocoa/[0.08] flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm text-stone"
          >
            <div className="flex items-center gap-1.5 text-cocoa font-medium">
              <ShieldCheck size={16} className="text-moss" />
              <span>Verified Herbalife Distributor</span>
            </div>
            <div className="flex items-center gap-1.5 text-cocoa font-medium">
              <Leaf size={15} className="text-moss" />
              <span>Kumasi Hub · Nationwide Delivery</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Parallax Hero Image moving toward About section */}
        <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
          {/* Parallax Background Frames */}
          <motion.div
            style={{ rotate: frameBackdropRotate }}
            className="absolute -inset-3 -z-10 rounded-[2.75rem] bg-clay/[0.12] sm:-inset-5 transition-transform"
          />
          <div className="absolute -inset-6 -z-20 rounded-[3rem] bg-sand/80 sm:-inset-8 shadow-inner" />

          {/* Parallax Image Frame: Moves dynamically downward on scroll toward About */}
          <motion.div
            style={{ y: heroImageY, scale: heroImageScale }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.25rem] border border-cocoa/[0.08] shadow-2xl shadow-cocoa/20 bg-sand/30"
          >
            <Image
              src="/images/hero-priscilla.jpg"
              alt={`${business.ownerHandle}, independent Herbalife distributor in Ghana`}
              fill
              priority
              sizes="(min-width: 1024px) 500px, 90vw"
              className="object-cover"
            />
            {/* Subtle atmospheric gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa/25 via-transparent to-transparent opacity-50" />
          </motion.div>

          {/* Floating Callout 1 (Counter-Parallax) */}
          <motion.div
            style={{ y: floatingBadgeY }}
            initial={{ opacity: 0, scale: 0.9, x: -15 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="absolute -bottom-6 -left-4 z-20 flex items-center gap-3.5 rounded-2xl border border-ivory/50 bg-ivory/95 px-5 py-3.5 shadow-xl shadow-cocoa/15 backdrop-blur-md sm:-left-8 sm:px-6 sm:py-4"
          >
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-moss/10 text-moss shadow-inner">
              <Leaf size={20} strokeWidth={2.25} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs sm:text-sm font-semibold leading-tight text-cocoa">
                Doorstep Delivery
              </p>
              <p className="text-[11px] sm:text-xs text-stone mt-0.5">
                Every region in Ghana
              </p>
            </div>
          </motion.div>

          {/* Floating Callout 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 15 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="absolute -top-4 -right-3 z-20 hidden sm:flex items-center gap-2.5 rounded-xl border border-ivory/50 bg-ivory/95 px-4 py-2.5 shadow-lg shadow-cocoa/10 backdrop-blur-md"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-clay/10 text-clay">
              <Sparkles size={14} />
            </div>
            <div>
              <p className="text-xs font-semibold text-cocoa leading-tight">
                Small Madam
              </p>
              <p className="text-[10px] text-stone">Certified Support</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
