"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Stars } from "~/app/_components/reviews/stars";
import { GOOGLE, REVIEWS, type Review } from "~/config/reviews";
import { cn } from "~/lib/utils";

const CARD_STEP = 358; // 340px card + 18px gap

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="border-line flex h-full w-[340px] shrink-0 flex-col rounded-[26px] border bg-white p-[22px]">
      <div className="flex items-start justify-between gap-3">
        {/* Never default a missing rating to five stars. */}
        {review.rating === null ? (
          <span />
        ) : (
          <Stars
            value={review.rating}
            label={`${review.rating} out of 5 stars`}
          />
        )}
        <span className="bg-brand-tint-1 text-ink rounded-full px-2.5 py-1 text-[0.72rem] font-bold">
          {review.topic}
        </span>
      </div>

      <p className="text-ink mt-3 line-clamp-6 text-[15.5px] leading-[1.6]">
        {review.text}
      </p>

      {review.truncated && (
        <a
          href={GOOGLE.url}
          target="_blank"
          rel="noopener"
          className="text-brand-deep mt-2 self-start text-[0.85rem] font-bold underline underline-offset-4"
        >
          Read on Google
        </a>
      )}

      <div className="mt-auto flex items-center gap-3 pt-5">
        <span
          aria-hidden
          className="bg-brand-tint-1 text-brand-deep grid size-9 shrink-0 place-items-center rounded-full text-sm font-extrabold"
        >
          {review.name.trim()[0]?.toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="text-ink block truncate text-[0.95rem] font-bold">
            {review.name}
          </span>
          <span className="text-charcoal block text-[0.8rem]">
            Google review
          </span>
        </span>
      </div>
    </article>
  );
}

/**
 * The sliding row of real Google reviews.
 * - Desktop: a 70s linear marquee that pauses on hover, on focus within, on touch
 *   and with the Pause button (moving content must be stoppable).
 * - Mobile: no auto-motion at all, just a snapping swipe row.
 * - Reduced motion: no auto-motion anywhere; Previous/Next buttons instead.
 * Every review is in the server-rendered HTML; the row's height is reserved.
 */
export function ReviewsRow() {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const scrollBy = (dir: 1 | -1) =>
    viewportRef.current?.scrollBy({
      left: dir * CARD_STEP,
      behavior: "smooth",
    });

  return (
    <div className="relative">
      <div
        ref={viewportRef}
        onTouchStart={() => setPaused(true)}
        className={cn(
          "marquee-viewport scrollbar-none snap-x snap-mandatory overflow-x-auto",
          !reduced && "md:snap-none md:overflow-hidden",
        )}
      >
        <div
          data-paused={paused || reduced}
          className={cn(
            "flex min-h-[320px] w-max gap-[18px] px-[max(var(--site-gutter),1rem)] pb-2",
            !reduced && "marquee-track md:px-0",
          )}
        >
          {REVIEWS.map((review) => (
            <div key={review.id} className="snap-start">
              <ReviewCard review={review} />
            </div>
          ))}
          {/* Second copy so the loop has no seam. Hidden from everything but the eye. */}
          {!reduced &&
            REVIEWS.map((review) => (
              <div
                key={`dup-${review.id}`}
                aria-hidden
                inert
                className="max-md:hidden"
              >
                <ReviewCard review={review} />
              </div>
            ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        {reduced ? (
          <>
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous reviews"
              className="border-line text-brand-deep grid size-11 place-items-center rounded-full border bg-white"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next reviews"
              className="border-line text-brand-deep grid size-11 place-items-center rounded-full border bg-white"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="border-line text-ink hidden items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-bold md:inline-flex"
          >
            {paused ? (
              <Play className="size-4" aria-hidden />
            ) : (
              <Pause className="size-4" aria-hidden />
            )}
            {paused ? "Play reviews" : "Pause reviews"}
          </button>
        )}
      </div>
    </div>
  );
}
