"use client";

import { stagger, useAnimate } from "motion/react";
import Image from "next/image";
import { useCallback, useRef } from "react";

import {
  HERO_BACKGROUNDS,
  HERO_MOTION as M,
  type HeroAssets,
} from "~/config/hero";
import { HeroControls } from "./hero-controls";
import { HeroVisual } from "./hero-visual";
import { SlideCards } from "./slide-cards";
import { SlideIntro } from "./slide-intro";
import { SlideStatement } from "./slide-statement";
import { SlideVisit } from "./slide-panel";
import { useHeroTimeline } from "./use-hero-timeline";

/**
 * Scenes: 0 intro -> 1 doctor statement -> 2 services -> 3 visit us -> back to 0.
 * Each scene = a background photo (cross-faded) + a centred text group.
 *
 * Direction law: every exit translates to a NEGATIVE y, every entrance starts at a POSITIVE y.
 * All slides stay mounted; only transform / opacity / filter:blur are animated.
 * The quick-access bar (children) sits under the text frame and never animates with the slides.
 */

const bez = (e: readonly [number, number, number, number]) =>
  [...e] as [number, number, number, number];
const EASE = { exit: bez(M.ease.exit), enter: bez(M.ease.enter) };
const blurIn = (px: number) => `blur(${px}px)`;
const q = (name: string) => `[data-h="${name}"]`;
const rise = (offset: number) => ({
  opacity: [0, 1],
  y: [offset, 0],
  filter: [blurIn(M.from.blurPx), "blur(0px)"],
});

const SCENES = [
  { group: "intro-group", lines: "intro-line" },
  { group: "statement-group", lines: "statement-line" },
  { group: "cards-group", lines: "card" },
  { group: "visit-group", lines: "visit-line" },
] as const;

export function HeroSlider({
  assets,
  children,
}: {
  assets: HeroAssets;
  children?: React.ReactNode;
}) {
  const [scope, animate] = useAnimate<HTMLElement>();
  const frameRef = useRef<HTMLDivElement>(null);

  const exitDistance = (selector: string) => {
    const frame = frameRef.current;
    const el = scope.current?.querySelector(selector);
    if (!frame || !el) return 400;
    const f = frame.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    // at least 110% of its own height, and always far enough to clear the frame's top edge
    return Math.max(r.bottom - f.top, r.height * 1.1) + 8;
  };

  const set = (selector: string, values: Record<string, unknown>) =>
    animate(selector, values as never, { duration: 0 });

  const enterScene = (scene: number, delay: number) => {
    const { lines } = SCENES[scene]!;
    const isCards = scene === 2;
    return animate(
      q(lines),
      rise(isCards ? M.from.cardOffsetY : M.from.textOffsetY),
      {
        duration: isCards ? M.duration.cardEnter : M.duration.textEnter,
        ease: EASE.enter,
        delay: stagger(isCards ? M.stagger.cards : M.stagger.lines, {
          startDelay: delay,
        }),
      },
    );
  };

  // exits upward only, no fade: the frame's overflow clips it at the top edge
  const exitScene = (scene: number) =>
    animate(
      q(SCENES[scene]!.group),
      { y: [0, -exitDistance(q(SCENES[scene]!.group))] },
      { duration: M.duration.textExit, ease: EASE.exit },
    );

  /** Instantly returns a scene to "ready to enter from below" (it is off-screen). */
  const resetScene = (scene: number) => {
    const { group, lines } = SCENES[scene]!;
    set(q(group), { y: 0 });
    set(q(lines), { opacity: 0 });
  };

  const fadeBackground = (to: number) =>
    HERO_BACKGROUNDS.forEach((src, i) => {
      if (src)
        void animate(
          `[data-bg="${i}"]`,
          { opacity: i === to ? 1 : 0 },
          { duration: 0.6 },
        );
    });

  const slide = async (from: number, to: number) => {
    const enterDelay = M.duration.textExit * 0.75; // next text starts at ~75% of the exit
    await Promise.all([exitScene(from), enterScene(to, enterDelay)]);
    resetScene(from);
  };

  /** prefers-reduced-motion: 250ms crossfade, no translate, no blur. */
  const crossfade = async (to: number) => {
    await Promise.all(
      SCENES.map((s, i) =>
        animate(q(s.lines), { opacity: i === to ? 1 : 0 }, { duration: 0.25 }),
      ),
    );
  };

  const run = useCallback(
    async (from: number, to: number) => {
      fadeBackground(to);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return crossfade(to);
      return slide(from, to);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const { index, paused, goTo, stageHandlers } = useHeroTimeline({
    stageRef: scope,
    run,
  });

  return (
    <section
      ref={scope}
      data-hero-section
      role="region"
      aria-roledescription="carousel"
      aria-label="Birth Roots Hospital highlights"
      aria-live={paused ? "polite" : "off"}
      tabIndex={0}
      {...stageHandlers}
      className="bg-brand-tint-2 relative isolate flex h-[max(640px,min(92svh,760px))] w-full flex-col overflow-hidden lg:h-[clamp(600px,calc(100svh-24px),760px)]"
    >
      {/* Backgrounds: soft glow + per-scene photos (cross-faded) + readability wash */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_50%_88%,color-mix(in_srgb,var(--brand-soft)_55%,transparent)_0%,transparent_72%)]"
      />
      {HERO_BACKGROUNDS.map((src, i) =>
        src ? (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            data-bg={i}
            className={
              i === 3
                ? "-z-10 object-cover object-[65%_30%]"
                : "-z-10 object-cover"
            }
            style={{ opacity: i === 0 ? 1 : 0 }}
          />
        ) : null,
      )}
      {HERO_BACKGROUNDS.some(Boolean) && (
        <>
          {/* Brand wash: the photo reads through a pink tint, the way Fernandez
              lays its yellow over theirs. Heaviest top-left, lightest bottom-right. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(145deg,color-mix(in_srgb,var(--brand-tint-1)_92%,transparent)_0%,color-mix(in_srgb,var(--brand-soft)_62%,transparent)_45%,color-mix(in_srgb,var(--brand-strong)_26%,transparent)_100%)]"
          />
          {/* Keeps the dark hero type legible wherever a photo is busy */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(70%_50%_at_50%_42%,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.28)_55%,transparent_80%)]"
          />
        </>
      )}

      {/* Stack = text frame, then the quick-access bar just below it, centred in the hero */}
      <div className="mt-[var(--header-h)] flex flex-1 flex-col items-center justify-center pb-10">
        <div className="site-box">
          <div
            ref={frameRef}
            className="relative h-[clamp(230px,32svh,300px)] w-full overflow-hidden"
          >
            <HeroVisual visual={assets.visual} />
            <SlideIntro active={index === 0} />
            <SlideStatement active={index === 1} />
            <SlideCards active={index === 2} />
            <SlideVisit active={index === 3} />
          </div>
          <div className="relative z-30 mt-6">{children}</div>
        </div>
      </div>

      <div className="site-container pointer-events-none absolute inset-0 z-30">
        <div className="relative h-full [&>*]:pointer-events-auto">
          <HeroControls index={index} onGoTo={goTo} />
        </div>
      </div>
    </section>
  );
}
