"use client";

import { HERO_SCENE_COUNT } from "~/config/hero";
import { cn } from "~/lib/utils";

const LABELS = ["Welcome", "Our doctor", "Our services", "Visit us"];

type Props = {
  index: number;
  onGoTo: (i: number) => void;
};

/** Vertical progress rail on the right edge (click to jump). */
export function HeroControls({ index, onGoTo }: Props) {
  return (
    <ol
      aria-label="Hero slides"
      className="absolute top-[calc(var(--header-h)+80px)] right-0 z-30 flex flex-col items-center gap-2.5"
    >
      {Array.from({ length: HERO_SCENE_COUNT }, (_, i) => {
        const active = i === index;
        return (
          <li key={i} className="flex">
            <button
              type="button"
              onClick={() => onGoTo(i)}
              aria-label={`Go to slide ${i + 1}: ${LABELS[i]}`}
              aria-current={active ? "true" : undefined}
              className="group flex size-6 items-center justify-center"
            >
              <span
                className={cn(
                  "bg-brand-soft relative block w-2 overflow-hidden rounded-full transition-[height,background-color] duration-300",
                  active ? "h-8" : "group-hover:bg-brand-strong h-2",
                )}
              >
                {active && (
                  // Fills bottom-to-top (upward) over the dwell time
                  <span
                    className="bg-ink absolute inset-0 origin-bottom"
                    style={{ transform: "scaleY(var(--hero-progress, 0))" }}
                  />
                )}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
