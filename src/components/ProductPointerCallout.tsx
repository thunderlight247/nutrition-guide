"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Check, MessageCircle, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { buildWhatsAppRedirectLink } from "@/lib/links";

// Variants for scroll-driven animations
const rowContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const imageSlideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -45, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const imageSlideRightVariants: Variants = {
  hidden: { opacity: 0, x: 45, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const pointerLineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ProductPointerCallout() {
  return (
    <div className="relative w-full">
      {/* Outer Card with pristine, clean ivory background matching the WhatsApp story design */}
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-moss/15 bg-[#FAF7F0] p-6 sm:p-12 lg:p-16 shadow-2xl shadow-cocoa/[0.05]">
        {/* Subtle ambient light backdrops */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-moss/[0.05] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-clay/[0.05] blur-3xl"
        />

        {/* Top Header: Exact text and font weight from reference image */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center pb-10 sm:pb-16"
        >
          <p className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-[#164E2E]">
            Herbalife
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#164E2E] mt-0.5">
            Healthy Breakfast
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-medium tracking-wide uppercase text-stone/90">
            Everyday 4-Step Nutritional System · Nationwide Doorstep Delivery
          </p>
        </motion.div>

        {/* 4 Staggered Products matching the exact alternating zig-zag layout in the WhatsApp reference image */}
        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
          {/* ======================================================= */}
          {/* 1. TOP LEFT: F1 SHAKE */}
          {/* ======================================================= */}
          <motion.div
            variants={rowContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid items-center gap-6 sm:gap-10 lg:grid-cols-[0.85fr_1.15fr]"
          >
            {/* Product Image on Left */}
            <motion.div
              variants={imageSlideLeftVariants}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative aspect-[3/4] w-full max-w-[210px] sm:max-w-[250px] overflow-hidden">
                <Image
                  src="/images/products/display-f1-shake.png"
                  alt="Herbalife Formula 1 Healthy Meal Shake with prepared glass"
                  fill
                  sizes="(min-width: 1024px) 250px, 60vw"
                  className="object-contain drop-shadow-lg transition-transform duration-500 hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Pointer Line & Features on Right */}
            <div className="flex flex-col justify-center">
              {/* Pointer line connecting from product to title: ────• F1 Shake */}
              <div className="flex items-center gap-2.5">
                <motion.div
                  variants={pointerLineVariants}
                  style={{ transformOrigin: "left center" }}
                  className="relative flex items-center"
                >
                  <span className="h-[2px] w-10 sm:w-16 bg-[#164E2E]" />
                  <span className="relative flex h-3 w-3 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#164E2E]/40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#164E2E]" />
                  </span>
                </motion.div>

                <motion.h3
                  variants={textItemVariants}
                  className="text-2xl sm:text-3xl font-display font-extrabold text-[#164E2E]"
                >
                  F1 Shake
                </motion.h3>
              </div>

              {/* Animated Bullet Points */}
              <div className="mt-4 flex flex-col gap-2.5">
                <motion.div
                  variants={textItemVariants}
                  className="flex items-start gap-2.5 text-sm sm:text-base font-medium text-cocoa/90 leading-snug"
                >
                  <span className="flex-shrink-0 mt-0.5 text-[#164E2E]">
                    <Check size={18} strokeWidth={3} />
                  </span>
                  <span>A complete meal and nourishing start to your day</span>
                </motion.div>

                <motion.div
                  variants={textItemVariants}
                  className="flex items-start gap-2.5 text-sm sm:text-base font-medium text-cocoa/90 leading-snug"
                >
                  <span className="flex-shrink-0 mt-0.5 text-[#164E2E]">
                    <Check size={18} strokeWidth={3} />
                  </span>
                  <span>Smooth, tasty and easy to personalise</span>
                </motion.div>

                <motion.div
                  variants={textItemVariants}
                  className="flex items-start gap-2.5 text-sm sm:text-base font-medium text-cocoa/90 leading-snug"
                >
                  <span className="flex-shrink-0 mt-0.5 text-[#164E2E]">
                    <Check size={18} strokeWidth={3} />
                  </span>
                  <span>Balanced nutrition support*</span>
                </motion.div>

                <motion.p
                  variants={textItemVariants}
                  className="mt-1 text-[11px] sm:text-xs text-stone/80 italic leading-relaxed"
                >
                  *Substituting one of the main daily meals of an energy restricted diet with a meal replacement contributes to the maintenance of weight after weight loss.
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* ======================================================= */}
          {/* 2. MIDDLE RIGHT: PDM (PROTEIN DRINK MIX) */}
          {/* ======================================================= */}
          <motion.div
            variants={rowContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid items-center gap-6 sm:gap-10 lg:grid-cols-[1.15fr_0.85fr]"
          >
            {/* Features & Pointer Line on Left (Desktop) */}
            <div className="order-2 lg:order-1 flex flex-col justify-center lg:items-end lg:text-right">
              {/* Pointer line connecting toward product on the right: PDM •──── */}
              <div className="flex items-center gap-2.5">
                <motion.h3
                  variants={textItemVariants}
                  className="text-2xl sm:text-3xl font-display font-extrabold text-[#164E2E]"
                >
                  PDM
                </motion.h3>

                <motion.div
                  variants={pointerLineVariants}
                  style={{ transformOrigin: "left center" }}
                  className="relative flex items-center"
                >
                  <span className="relative flex h-3 w-3 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#164E2E]/40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#164E2E]" />
                  </span>
                  <span className="h-[2px] w-10 sm:w-16 bg-[#164E2E]" />
                </motion.div>
              </div>

              {/* Animated Bullet Points */}
              <div className="mt-4 flex flex-col gap-2.5 lg:items-end">
                <motion.div
                  variants={textItemVariants}
                  className="flex items-start gap-2.5 text-sm sm:text-base font-medium text-cocoa/90 leading-snug lg:flex-row-reverse"
                >
                  <span className="flex-shrink-0 mt-0.5 text-[#164E2E]">
                    <Check size={18} strokeWidth={3} />
                  </span>
                  <span>High in protein which supports muscle mass maintenance and growth</span>
                </motion.div>

                <motion.div
                  variants={textItemVariants}
                  className="flex items-start gap-2.5 text-sm sm:text-base font-medium text-cocoa/90 leading-snug lg:flex-row-reverse"
                >
                  <span className="flex-shrink-0 mt-0.5 text-[#164E2E]">
                    <Check size={18} strokeWidth={3} />
                  </span>
                  <span>Can make your shake creamier and more satisfying</span>
                </motion.div>
              </div>
            </div>

            {/* Product Image on Right */}
            <motion.div
              variants={imageSlideRightVariants}
              className="order-1 lg:order-2 relative flex justify-center lg:justify-start"
            >
              <div className="relative aspect-[3/4] w-full max-w-[210px] sm:max-w-[250px] overflow-hidden">
                <Image
                  src="/images/products/display-pdm.png"
                  alt="Herbalife Protein Drink Mix canister and shake glass"
                  fill
                  sizes="(min-width: 1024px) 250px, 60vw"
                  className="object-contain drop-shadow-lg transition-transform duration-500 hover:scale-105"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* ======================================================= */}
          {/* 3. LOWER LEFT: HERBAL ALOE CONCENTRATE */}
          {/* ======================================================= */}
          <motion.div
            variants={rowContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid items-center gap-6 sm:gap-10 lg:grid-cols-[0.85fr_1.15fr]"
          >
            {/* Product Image on Left */}
            <motion.div
              variants={imageSlideLeftVariants}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative aspect-[3/4] w-full max-w-[190px] sm:max-w-[230px] overflow-hidden">
                <Image
                  src="/images/products/display-aloe.png"
                  alt="Herbal Aloe Concentrate bottle with fresh aloe vera leaf"
                  fill
                  sizes="(min-width: 1024px) 230px, 60vw"
                  className="object-contain drop-shadow-lg transition-transform duration-500 hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Pointer Line & Features on Right */}
            <div className="flex flex-col justify-center">
              {/* Pointer line: ────• Herbal Aloe Concentrate */}
              <div className="flex items-center gap-2.5">
                <motion.div
                  variants={pointerLineVariants}
                  style={{ transformOrigin: "left center" }}
                  className="relative flex items-center"
                >
                  <span className="h-[2px] w-10 sm:w-16 bg-[#164E2E]" />
                  <span className="relative flex h-3 w-3 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#164E2E]/40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#164E2E]" />
                  </span>
                </motion.div>

                <motion.h3
                  variants={textItemVariants}
                  className="text-2xl sm:text-3xl font-display font-extrabold text-[#164E2E]"
                >
                  Herbal Aloe Concentrate
                </motion.h3>
              </div>

              {/* Animated Bullet Points */}
              <div className="mt-4 flex flex-col gap-2.5">
                <motion.div
                  variants={textItemVariants}
                  className="flex items-start gap-2.5 text-sm sm:text-base font-medium text-cocoa/90 leading-snug"
                >
                  <span className="flex-shrink-0 mt-0.5 text-[#164E2E]">
                    <Check size={18} strokeWidth={3} />
                  </span>
                  <span>Helps with daily water intake</span>
                </motion.div>

                <motion.div
                  variants={textItemVariants}
                  className="flex items-start gap-2.5 text-sm sm:text-base font-medium text-cocoa/90 leading-snug"
                >
                  <span className="flex-shrink-0 mt-0.5 text-[#164E2E]">
                    <Check size={18} strokeWidth={3} />
                  </span>
                  <span>A tasty alternative to sugary drinks</span>
                </motion.div>

                <motion.div
                  variants={textItemVariants}
                  className="flex items-start gap-2.5 text-sm sm:text-base font-medium text-cocoa/90 leading-snug"
                >
                  <span className="flex-shrink-0 mt-0.5 text-[#164E2E]">
                    <Check size={18} strokeWidth={3} />
                  </span>
                  <span>Certified by the AOAC International**</span>
                </motion.div>

                <motion.div
                  variants={textItemVariants}
                  className="flex items-start gap-2.5 text-sm sm:text-base font-medium text-cocoa/90 leading-snug"
                >
                  <span className="flex-shrink-0 mt-0.5 text-[#164E2E]">
                    <Check size={18} strokeWidth={3} />
                  </span>
                  <span>Aloe Mango flavour now available in half-gallon size!</span>
                </motion.div>

                <motion.p
                  variants={textItemVariants}
                  className="mt-1 text-[11px] sm:text-xs text-stone/80 italic leading-relaxed"
                >
                  **Applies to Aloe Juice
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* ======================================================= */}
          {/* 4. BOTTOM RIGHT: INSTANT HERBAL BEVERAGE */}
          {/* ======================================================= */}
          <motion.div
            variants={rowContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid items-center gap-6 sm:gap-10 lg:grid-cols-[1.15fr_0.85fr]"
          >
            {/* Features & Pointer Line on Left (Desktop) */}
            <div className="order-2 lg:order-1 flex flex-col justify-center lg:items-end lg:text-right">
              {/* Pointer line: Instant Herbal Beverage •──── */}
              <div className="flex items-center gap-2.5">
                <motion.h3
                  variants={textItemVariants}
                  className="text-2xl sm:text-3xl font-display font-extrabold text-[#164E2E]"
                >
                  Instant Herbal Beverage
                </motion.h3>

                <motion.div
                  variants={pointerLineVariants}
                  style={{ transformOrigin: "left center" }}
                  className="relative flex items-center"
                >
                  <span className="relative flex h-3 w-3 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#164E2E]/40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#164E2E]" />
                  </span>
                  <span className="h-[2px] w-10 sm:w-16 bg-[#164E2E]" />
                </motion.div>
              </div>

              {/* Animated Bullet Points */}
              <div className="mt-4 flex flex-col gap-2.5 lg:items-end">
                <motion.div
                  variants={textItemVariants}
                  className="flex items-start gap-2.5 text-sm sm:text-base font-medium text-cocoa/90 leading-snug lg:flex-row-reverse"
                >
                  <span className="flex-shrink-0 mt-0.5 text-[#164E2E]">
                    <Check size={18} strokeWidth={3} />
                  </span>
                  <span>Contains caffeine which helps improve alertness</span>
                </motion.div>

                <motion.div
                  variants={textItemVariants}
                  className="flex items-start gap-2.5 text-sm sm:text-base font-medium text-cocoa/90 leading-snug lg:flex-row-reverse"
                >
                  <span className="flex-shrink-0 mt-0.5 text-[#164E2E]">
                    <Check size={18} strokeWidth={3} />
                  </span>
                  <span>Low in calories, enjoy hot or cold throughout the day</span>
                </motion.div>

                <motion.div
                  variants={textItemVariants}
                  className="flex items-start gap-2.5 text-sm sm:text-base font-medium text-cocoa/90 leading-snug lg:flex-row-reverse"
                >
                  <span className="flex-shrink-0 mt-0.5 text-[#164E2E]">
                    <Check size={18} strokeWidth={3} />
                  </span>
                  <span>Infused with green & orange pekoe black tea extracts</span>
                </motion.div>
              </div>
            </div>

            {/* Product Image on Right */}
            <motion.div
              variants={imageSlideRightVariants}
              className="order-1 lg:order-2 relative flex justify-center lg:justify-start"
            >
              <div className="relative aspect-[3/4] w-full max-w-[210px] sm:max-w-[250px] overflow-hidden">
                <Image
                  src="/images/products/display-tea.png"
                  alt="Herbalife Instant Herbal Beverage tea extract bottle and teacup"
                  fill
                  sizes="(min-width: 1024px) 250px, 60vw"
                  className="object-contain drop-shadow-lg transition-transform duration-500 hover:scale-105"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* WhatsApp Chat & Ordering Footer matching "Send message" bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 sm:mt-20 border-t border-moss/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-[#164E2E]">
              <ShieldCheck size={16} />
              <span>Official Herbalife Independent Distributor · Ghana</span>
            </div>
            <p className="mt-1 text-sm text-stone">
              Ask Small Madam about pack prices, flavour choices, and doorstep delivery.
            </p>
          </div>

          <a
            href={buildWhatsAppRedirectLink(
              "Hello Small Madam, I saw the Herbalife Healthy Breakfast routine (F1 Shake, PDM, Herbal Aloe & Instant Tea). Can you share the price and delivery options to my location?"
            )}
            className="inline-flex items-center gap-3 rounded-full bg-[#164E2E] px-8 py-4 text-base font-semibold text-ivory shadow-xl shadow-moss/20 transition-all duration-200 hover:bg-[#0F3820] hover:scale-105"
          >
            <MessageCircle size={20} />
            <span>Send message on WhatsApp</span>
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
