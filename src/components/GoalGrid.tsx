"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { MessageCircle, Check, ArrowRight } from "lucide-react";
import type { ProductGoal } from "@/data/business";
import { buildWhatsAppRedirectLink } from "@/lib/links";

type Props = {
  goals: readonly ProductGoal[];
};

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function GoalGrid({ goals }: Props) {
  return (
    <motion.div
      variants={cardContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {goals.map((goal) => {
        const hasImage = goal.images && goal.images.length > 0;
        const mainImage = hasImage ? goal.images[0] : null;

        return (
          <motion.div
            key={goal.id}
            variants={cardItemVariants}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-cocoa/[0.08] bg-ivory/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-moss/40 hover:shadow-xl"
          >
            {/* Directly Visible Product Image on Scroll — No Clicking Needed! */}
            {mainImage && (
              <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-sand/30">
                <Image
                  src={mainImage}
                  alt={`Herbalife ${goal.title}`}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa/30 via-transparent to-transparent opacity-40" />
              </div>
            )}

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h4 className="text-lg font-display font-bold text-cocoa transition-colors group-hover:text-moss">
                  {goal.title}
                </h4>
                <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-stone">
                  {goal.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-cocoa/[0.06] flex items-center justify-between">
                <a
                  href={buildWhatsAppRedirectLink(
                    `Hello Small Madam, I'm interested in the ${goal.title} pack. Please let me know the price and delivery options.`
                  )}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-moss transition-colors group-hover:text-moss-dark"
                >
                  <MessageCircle size={14} />
                  <span>Ask on WhatsApp</span>
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                </a>

                <span className="text-[11px] font-medium text-stone/80">
                  Doorstep Delivery
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
