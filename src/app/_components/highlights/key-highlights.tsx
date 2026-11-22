"use client";

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { BRAND } from "~/config/brand";
import { HIGHLIGHTS } from "~/config/highlights";
import { cn } from "~/lib/utils";

type Item = (typeof HIGHLIGHTS)[number];

function Stat({
  item,
  index,
  show,
}: {
  item: Item;
  index: number;
  show: boolean;
}) {
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);
  const final = `${item.value}${item.suffix}`;

  useEffect(() => {
    if (!show) return;
    if (reduced) {
      setN(item.value);
      return;
    }
    const controls = animate(0, item.value, {
      duration: 1.8,
      delay: index * 0.15,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [show, reduced, item.value, index]);

  return (
    <li className="border-brand-soft/60 flex items-center justify-center py-5 sm:[&:not(:first-child)]:border-l max-sm:[&:nth-child(odd)]:border-r">
      <p className="relative inline-block">
        {/* Real value for search engines and screen readers */}
        <span className="sr-only">
          {final} {item.label}
        </span>
        {/* Invisible copy of the final value reserves the width so nothing shifts while counting */}
        <span
          aria-hidden
          className="font-display text-[clamp(3.75rem,6.5vw,5.5rem)] leading-none font-extrabold tabular-nums opacity-0 select-none"
        >
          {final}
        </span>
        <span
          aria-hidden
          className="font-display text-brand-logo absolute inset-0 flex items-center justify-center text-[clamp(3.75rem,6.5vw,5.5rem)] leading-none font-extrabold tabular-nums"
        >
          {n}
          {item.suffix}
        </span>
        {/* White label strip cut through the middle of the numeral */}
        <motion.span
          aria-hidden
          initial={false}
          animate={{ scaleX: show || reduced ? 1 : 0 }}
          transition={{
            duration: reduced ? 0 : 0.5,
            delay: reduced ? 0 : 0.2 + index * 0.15,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <span
            className={cn(
              "text-ink block bg-white px-2.5 py-0.5 text-[9px] font-semibold tracking-[0.12em] whitespace-nowrap uppercase sm:px-3 sm:py-1 sm:text-xs sm:tracking-[0.18em]",
            )}
          >
            {item.label}
          </span>
        </motion.span>
      </p>
    </li>
  );
}

export function KeyHighlights({
  items = HIGHLIGHTS,
}: { items?: readonly Item[] } = {}) {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });

  return (
    <section
      aria-labelledby="glance-title"
      className="site-container py-8 sm:py-12"
    >
      <div className="border-brand-soft border-y py-6 sm:py-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2
            id="glance-title"
            className="font-display text-ink text-2xl font-extrabold sm:text-3xl"
          >
            Birth Roots at a glance
          </h2>
          <Link
            href={`tel:${BRAND.helpline.tel}`}
            className="text-brand-deep border-brand-deep border-b-2 pb-0.5 text-sm font-bold"
          >
            Call {BRAND.helpline.label}
          </Link>
        </div>

        <ul ref={ref} className="mt-4 grid grid-cols-2 sm:grid-cols-4">
          {items.map((item, i) => (
            <Stat key={item.label} item={item} index={i} show={inView} />
          ))}
        </ul>
      </div>
    </section>
  );
}
