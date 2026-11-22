"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

import { HERO_MOTION, HERO_SCENE_COUNT } from "~/config/hero";

const DWELL = [
  HERO_MOTION.dwellMs.intro,
  HERO_MOTION.dwellMs.statement,
  HERO_MOTION.dwellMs.cards,
  HERO_MOTION.dwellMs.panel,
] as const;

type Options = {
  stageRef: RefObject<HTMLElement | null>;
  /** Plays the visual transition. Resolves when it has fully finished. */
  run: (from: number, to: number) => Promise<void>;
};

/**
 * State machine for the hero: index in {0,1,2,3}, autoplay, and every pause rule
 * (hover, keyboard focus, hidden tab, off-screen, manual pause, reduced motion).
 * Transitions never overlap: a request made mid-transition is queued (latest wins).
 */
export function useHeroTimeline({ stageRef, run }: Options) {
  const [index, setIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [inView, setInView] = useState(true);

  const indexRef = useRef(0);
  const busyRef = useRef(false);
  const pendingRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);
  const runRef = useRef(run);
  runRef.current = run;
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // prefers-reduced-motion: autoplay OFF by default
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      setUserPaused(true);
  }, []);

  // Tab visibility
  useEffect(() => {
    const onChange = () => setTabHidden(document.hidden);
    onChange();
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  // Off-screen
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(!!e?.isIntersecting),
      {
        threshold: 0.25,
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [stageRef]);

  const start = useCallback(async (target: number) => {
    const from = indexRef.current;
    busyRef.current = true;
    indexRef.current = target;
    elapsedRef.current = 0;
    setBusy(true);
    setIndex(target);
    try {
      await runRef.current(from, target);
    } finally {
      busyRef.current = false;
      if (mountedRef.current) {
        setBusy(false);
        const next = pendingRef.current;
        pendingRef.current = null;
        if (next !== null && next !== indexRef.current) void start(next);
      }
    }
  }, []);

  const goTo = useCallback(
    (target: number) => {
      const t =
        ((target % HERO_SCENE_COUNT) + HERO_SCENE_COUNT) % HERO_SCENE_COUNT;
      if (busyRef.current) {
        pendingRef.current = t;
        return;
      }
      if (t !== indexRef.current) void start(t);
    },
    [start],
  );

  const next = useCallback(
    () => goTo((pendingRef.current ?? indexRef.current) + 1),
    [goTo],
  );
  const prev = useCallback(
    () => goTo((pendingRef.current ?? indexRef.current) - 1),
    [goTo],
  );

  const running = !userPaused && !tabHidden && inView;

  // Dwell timer: accumulates only while running and idle; drives --hero-progress (0..1)
  useEffect(() => {
    const stage = stageRef.current;
    stage?.style.setProperty(
      "--hero-progress",
      String(Math.min(elapsedRef.current / DWELL[index]!, 1)),
    );
    if (busy || !running) return;

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsedRef.current += now - last;
      last = now;
      const dwell = DWELL[indexRef.current]!;
      stage?.style.setProperty(
        "--hero-progress",
        String(Math.min(elapsedRef.current / dwell, 1)),
      );
      if (elapsedRef.current >= dwell) {
        next();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, busy, running, next, stageRef]);

  // Event handlers to spread on the stage element
  const touchRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const stageHandlers = {
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      }
    },
    // Passive touch listeners: the page keeps scrolling normally. A quick, mostly-vertical flick
    // additionally changes slide (swipe up = next, swipe down = previous).
    onTouchStart: (e: React.TouchEvent) => {
      const t = e.touches[0];
      if (t)
        touchRef.current = { x: t.clientX, y: t.clientY, t: performance.now() };
    },
    onTouchEnd: (e: React.TouchEvent) => {
      const start = touchRef.current;
      const t = e.changedTouches[0];
      touchRef.current = null;
      if (!start || !t) return;
      const dy = t.clientY - start.y;
      const dx = t.clientX - start.x;
      const dt = performance.now() - start.t;
      if (Math.abs(dy) >= 56 && Math.abs(dy) > Math.abs(dx) * 1.5 && dt < 400) {
        if (dy < 0) next();
        else prev();
      }
    },
  };

  return {
    index,
    busy,
    paused: userPaused,
    goTo,
    next,
    prev,
    togglePause: () => setUserPaused((p) => !p),
    stageHandlers,
  };
}
