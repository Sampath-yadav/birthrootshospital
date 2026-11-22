"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion, type PanInfo } from "motion/react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { SERVICE_CARDS, type ServiceCard } from "~/config/services";
import { cn } from "~/lib/utils";

const DEFAULT_COUNT = SERVICE_CARDS.length;

// useLayoutEffect warns during server rendering; measure before paint on the client only.
const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;
const DEFAULT_ACTIVE = Math.min(2, DEFAULT_COUNT - 1); // Fetal Medicine opens in the spotlight (middle of the row)

/** Card geometry for the current container width. Kept in JS so the track can
 *  centre the active card without measuring the DOM mid-animation. */
function geometry(cw: number, COUNT: number) {
  const narrow = cw < 640;
  const gap = narrow ? 14 : 20;
  // Room kept clear at each end for the arrow buttons.
  const edge = narrow ? 0 : 72;
  // On wide screens every card fits on screen at once (active one included), so the
  // opening view never has half-cut cards at the edges.
  const fitBase = (cw - 2 * edge - gap * (COUNT - 1)) / (COUNT + 0.2);
  const fits = !narrow && fitBase >= 150;
  const base = narrow
    ? Math.min(176, Math.max(128, cw * 0.44))
    : fits
      ? Math.min(264, fitBase)
      : Math.min(272, Math.max(150, ((cw - gap * (COUNT - 1)) / COUNT) * 1.12));
  const activeW = base * 1.2;
  const h = base * 1.56;
  const activeH = activeW * 1.6;

  const width = (i: number, active: number) => (i === active ? activeW : base);
  const left = (i: number, active: number) => {
    let x = 0;
    for (let j = 0; j < i; j++) x += width(j, active) + gap;
    return x;
  };
  const centre = (i: number, active: number) =>
    left(i, active) + width(i, active) / 2;

  return { base, activeW, h, activeH, gap, fits, width, left, centre };
}

export function ServiceCarousel({
  items = SERVICE_CARDS,
  heading = "Comprehensive care for every stage of womanhood",
  subtitle,
  id = "services",
}: {
  items?: readonly ServiceCard[];
  heading?: string;
  subtitle?: string;
  id?: string;
} = {}) {
  const reduced = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [cw, setCw] = useState(0);
  const [active, setActive] = useState(DEFAULT_ACTIVE);
  // A mouse hover previews a card in the spotlight; the pointer leaving puts the
  // clicked card back. Touch never sets this, so a tap still has to be a tap.
  const [hovered, setHovered] = useState<number | null>(null);
  const draggingRef = useRef(false);

  useIsoLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      if (entry) setCw(entry.contentRect.width);
    });
    ro.observe(el);
    setCw(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const COUNT = items.length;

  const go = useCallback(
    (delta: number) => {
      setHovered(null);
      setActive((i) => Math.min(COUNT - 1, Math.max(0, i + delta)));
    },
    [COUNT],
  );

  // The card in the spotlight: the hovered one while a mouse is over the row,
  // otherwise the chosen one.
  const view = hovered ?? active;

  const g = geometry(cw || 1200, COUNT);
  const total = g.left(COUNT - 1, view) + g.width(COUNT - 1, view);
  // Everything fits: just centre the whole row. Otherwise slide the active card towards
  // the centre, allowing only a small overhang at either end.
  const slack = cw * 0.18;
  const trackX = !cw
    ? 0
    : g.fits || total <= cw
      ? (cw - total) / 2
      : Math.min(
          slack,
          Math.max(cw - total - slack, cw / 2 - g.centre(view, view)),
        );

  const move = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 110, damping: 20, mass: 0.9 };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    draggingRef.current = false;
    const travelled = info.offset.x;
    if (Math.abs(travelled) > 60) go(travelled < 0 ? 1 : -1);
  };

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="from-brand-tint-2 relative overflow-hidden bg-gradient-to-b from-0% to-white to-70% py-16 sm:py-24"
    >
      <div className="site-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-brand-logo flex items-center justify-center gap-4 text-xs font-bold tracking-[0.3em] uppercase">
            <span aria-hidden className="bg-brand-soft h-px w-10 sm:w-16" />
            Our Services
            <span aria-hidden className="bg-brand-soft h-px w-10 sm:w-16" />
          </p>
          <h2
            id={`${id}-title`}
            className="font-display text-ink mt-4 text-[clamp(1.6rem,3.4vw,2.75rem)] leading-tight font-extrabold text-balance"
          >
            {heading}
          </h2>
          <span
            aria-hidden
            className="bg-brand-strong mx-auto mt-4 block h-1 w-24 rounded-full"
          />
          {subtitle && (
            <p className="section-support mx-auto mt-4">{subtitle}</p>
          )}
        </div>
      </div>

      <div
        role="group"
        aria-label="Our services"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(-1);
          }
        }}
        className="relative mt-12 sm:mt-16"
      >
        <div
          ref={viewportRef}
          onPointerLeave={() => setHovered(null)}
          className={cn("w-full overflow-hidden", !cw && "invisible")}
        >
          <motion.div
            // Re-mounted once the width is known so the first paint is already in place.
            key={cw ? "measured" : "pending"}
            initial={false}
            className="relative cursor-grab active:cursor-grabbing"
            style={{ height: g.activeH }}
            animate={{ x: trackX }}
            transition={move}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            dragMomentum={false}
            onDragStart={() => {
              draggingRef.current = true;
              setHovered(null);
            }}
            onDragEnd={onDragEnd}
          >
            {items.map((svc, i) => {
              const isActive = i === view;
              const w = g.width(i, view);
              const h = isActive ? g.activeH : g.h;
              return (
                <motion.button
                  key={svc.id}
                  initial={false}
                  type="button"
                  onClick={() => {
                    setHovered(null);
                    setActive(i);
                  }}
                  // Hover pops the card into the spotlight — mouse only, so a
                  // tap on a phone is not read as a hover first.
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse" && !draggingRef.current)
                      setHovered(i);
                  }}
                  // Keyboard users get the same preview when they tab to a card.
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  aria-current={isActive}
                  aria-label={svc.title}
                  animate={{
                    x: g.left(i, view),
                    y: (g.activeH - h) / 2,
                    width: w,
                    height: h,
                  }}
                  transition={move}
                  className={cn(
                    "absolute top-0 left-0 overflow-hidden rounded-[22px] border-2 text-left select-none",
                    "transition-[border-color,box-shadow,opacity] duration-[400ms]",
                    isActive
                      ? "border-brand-strong shadow-[0_0_0_6px_rgba(255,179,222,0.35),0_28px_60px_-28px_rgba(214,51,108,0.55)]"
                      : "border-transparent opacity-90 shadow-[0_18px_40px_-28px_rgba(30,26,25,0.5)] hover:opacity-100",
                  )}
                >
                  <Image
                    src={svc.image}
                    alt={svc.alt}
                    fill
                    draggable={false}
                    sizes="(max-width: 640px) 50vw, 280px"
                    className={cn(
                      "object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isActive ? "scale-[1.06]" : "scale-100",
                    )}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[#4a1030]/90 via-[#4a1030]/35 to-transparent"
                  />
                  <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <span
                      className={cn(
                        "font-display block font-extrabold text-balance text-white",
                        isActive
                          ? "text-[clamp(1.05rem,1.6vw,1.45rem)]"
                          : "text-[clamp(0.95rem,1.3vw,1.2rem)]",
                      )}
                    >
                      {svc.title}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "bg-brand-strong mt-2 block h-[3px] rounded-full transition-all duration-500",
                        isActive ? "w-14" : "w-9",
                      )}
                    />
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={active === 0}
          aria-label="Previous service"
          className="text-brand-deep absolute top-1/2 left-2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_10px_24px_-10px_rgba(30,26,25,0.45)] transition disabled:pointer-events-none disabled:opacity-0 sm:left-4 sm:size-12"
        >
          <ChevronLeft className="size-5 sm:size-6" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={active === COUNT - 1}
          aria-label="Next service"
          className="bg-brand-logo absolute top-1/2 right-2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full text-white shadow-[0_10px_24px_-10px_rgba(214,51,108,0.7)] transition disabled:pointer-events-none disabled:opacity-0 sm:right-4 sm:size-12"
        >
          <ChevronRight className="size-5 sm:size-6" aria-hidden />
        </button>
      </div>

      {/* Pagination dots */}
      <div className="mt-8 flex items-center justify-center gap-2.5">
        {items.map((svc, i) => (
          <button
            key={svc.id}
            type="button"
            onClick={() => {
              setHovered(null);
              setActive(i);
            }}
            aria-label={`Show ${svc.title}`}
            aria-current={i === view}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300",
              i === view
                ? "bg-brand-logo w-7"
                : "bg-brand-soft hover:bg-brand-strong w-2.5",
            )}
          />
        ))}
      </div>
    </section>
  );
}
