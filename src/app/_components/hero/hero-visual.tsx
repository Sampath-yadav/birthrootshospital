import Image from "next/image";

import { HERO_BACKGROUNDS, type HeroAssets } from "~/config/hero";
import { Logomark } from "./logomark";

/**
 * Persistent centre visual. Never animates while slides 1-3 swap (only a 6px idle float,
 * disabled under reduced motion). Placeholder until /public/hero/hero-visual.png exists.
 */
export function HeroVisual({ visual }: { visual: HeroAssets["visual"] }) {
  return (
    <div
      data-h="visual"
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[52%] items-end justify-center"
    >
      <div className="hero-float flex h-full w-full items-end justify-center">
        {visual ? (
          <Image
            src={visual.src}
            alt=""
            width={visual.width}
            height={visual.height}
            priority
            sizes="(min-width: 1024px) 560px, 80vw"
            className="h-full w-auto max-w-[80%] object-contain object-bottom"
          />
        ) : HERO_BACKGROUNDS.some(Boolean) ? null : (
          <div className="bg-brand-soft relative mb-[3%] flex aspect-square h-[74%] max-h-[400px] items-center justify-center rounded-full">
            <Logomark className="h-1/3 w-auto" />
          </div>
        )}
      </div>
    </div>
  );
}
