"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  Activity,
  Dumbbell,
  Coffee,
  Sparkles,
  Clock,
  HeartPulse,
  Target,
  Droplets,
  Zap,
  Briefcase,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ProductGoal } from "@/data/business";
import { buildWhatsAppRedirectLink } from "@/lib/links";
import GoalTile from "@/components/GoalTile";

// Icon components can't be passed as props from a server component, so the
// mapping lives here, inside the client component that actually uses it.
const icons: Record<string, LucideIcon> = {
  "weight-loss": TrendingDown,
  "flat-tummy": Activity,
  "weight-gain-muscle-building": Dumbbell,
  "healthy-breakfast": Coffee,
  "hair-skin-care": Sparkles,
  "healthy-aging": Clock,
  "nutritional-goals": Target,
  "digestive-health": Droplets,
  "energy-fitness": Zap,
  "heart-health": HeartPulse,
  "business-opportunity": Briefcase,
};

type Props = {
  goals: readonly ProductGoal[];
};

export default function GoalGrid({ goals }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  const active = goals.find((g) => g.id === activeId) ?? null;

  function open(id: string) {
    setActiveId(id);
    setImageIndex(0);
  }

  function close() {
    setActiveId(null);
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {goals.map((goal) => (
          <button
            key={goal.id}
            type="button"
            onClick={() => open(goal.id)}
            className="text-left"
            aria-haspopup="dialog"
          >
            <GoalTile icon={icons[goal.id]} title={goal.title} />
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-cocoa/50 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={close}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] bg-cream shadow-2xl sm:rounded-[2rem]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 text-cocoa shadow-md transition-colors hover:bg-ivory"
            >
              <X size={18} strokeWidth={2} aria-hidden="true" />
            </button>

            {active.images.length > 0 && (
              <div className="relative aspect-[4/3] w-full bg-sand">
                <Image
                  src={active.images[imageIndex]}
                  alt={active.title}
                  fill
                  sizes="(min-width: 640px) 512px, 100vw"
                  className="object-cover"
                />
                {active.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous image"
                      onClick={() =>
                        setImageIndex(
                          (i) => (i - 1 + active.images.length) % active.images.length
                        )
                      }
                      className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/90 text-cocoa shadow-md hover:bg-ivory"
                    >
                      <ChevronLeft size={16} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next image"
                      onClick={() =>
                        setImageIndex((i) => (i + 1) % active.images.length)
                      }
                      className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/90 text-cocoa shadow-md hover:bg-ivory"
                    >
                      <ChevronRight size={16} aria-hidden="true" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                      {active.images.map((_, i) => (
                        <span
                          key={i}
                          className={`h-1.5 w-1.5 rounded-full ${
                            i === imageIndex ? "bg-ivory" : "bg-ivory/40"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="p-7 sm:p-8">
              <h3 className="text-2xl font-display font-medium leading-snug text-balance">
                {active.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-stone">
                {active.description}
              </p>

              <a
                href={buildWhatsAppRedirectLink(
                  `Hello Small Madam, I'm interested in ${active.title}. Can you tell me more?`
                )}
                data-cta="whatsapp"
                data-cta-id={`product-${active.id}`}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-moss px-6 py-3.5 text-[15px] font-medium text-ivory shadow-lg shadow-moss/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-moss-dark hover:shadow-xl active:scale-[0.98] sm:w-auto"
              >
                <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
                Ask About {active.title}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
