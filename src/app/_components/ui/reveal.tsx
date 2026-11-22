"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

import { cn } from "~/lib/utils";

/**
 * Reveals its contents once, bottom to top with a blur-to-sharp fade — the same
 * motion language as the hero. No library: one IntersectionObserver per element.
 * Movement is removed entirely by `prefers-reduced-motion` (handled in globals.css).
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  /** Milliseconds; use index * 90 for a staggered group. */
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.in = "true";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.in = "true";
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-in="false"
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  );
}
