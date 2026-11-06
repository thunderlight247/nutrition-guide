import { productGoals } from "@/data/business";
import SectionHeader from "@/components/SectionHeader";
import GoalGrid from "@/components/GoalGrid";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductPointerCallout from "@/components/ProductPointerCallout";
import { AlertCircle, Target, Sparkles } from "lucide-react";

export default function Wellness() {
  return (
    <section id="wellness" className="section-pad py-20 sm:py-28">
      <div className="mx-auto max-w-content">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <SectionHeader
            kicker="Genuine Nutrition Products"
            title="Everyday nutrition built around your body's needs"
            description="Explore our proven Herbalife Healthy Breakfast routine and targeted goal packs below. All products appear directly with ingredients and benefits as you scroll."
          />
        </div>

        {/* 1. Exact Video / WhatsApp Screenshot Product Pointer Callout */}
        <ProductPointerCallout />

        {/* 2. Targeted Goal Packs Directly Visible as You Scroll (No Click-to-Open Modal) */}
        <div className="mt-24 pt-16 border-t border-cocoa/[0.08]">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-moss/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-moss">
              <Target size={13} />
              <span>Targeted Solutions</span>
            </span>
            <h3 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-cocoa">
              Browse Targeted Body & Wellness Packs
            </h3>
            <p className="mt-2 text-stone text-sm sm:text-base">
              Scroll through each program below to see the products and benefits directly.
            </p>
          </div>

          {/* Goal Grid: Cards show product photos and animated benefits immediately on scroll */}
          <GoalGrid goals={productGoals} />

          {/* Disclaimer Box */}
          <aside className="mt-14 mx-auto max-w-2xl rounded-2xl border border-clay/20 bg-clay/[0.06] p-5 text-xs sm:text-sm leading-relaxed text-cocoa text-center backdrop-blur-sm">
            <div className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider text-clay text-xs">
              <AlertCircle size={15} />
              <span>Important Nutritional Disclaimer</span>
            </div>
            <p className="mt-2 text-cocoa/90">
              These products are food and nutritional supplements, not drugs or medicine. They do not diagnose, cure, or treat any condition. Food provides nutrition, and your body uses nutrition to support its normal, vital functions.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
