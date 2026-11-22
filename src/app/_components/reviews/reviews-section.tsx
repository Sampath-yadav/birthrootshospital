import { ReviewsRow } from "~/app/_components/reviews/reviews-row";
import { Stars } from "~/app/_components/reviews/stars";
import { Reveal } from "~/app/_components/ui/reveal";
import { GOOGLE, REVIEWS } from "~/config/reviews";

/**
 * Real Google reviews, shown as text with no Google logo and no review schema markup.
 * The summary rating is the hospital's live Google rating. TODO(confirm) on launch day.
 */
export function ReviewsSection() {
  const anyRated = REVIEWS.some((r) => r.rating !== null);

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="bg-brand-tint-2 section-y w-full"
    >
      <div className="site-container">
        <div className="section-inner text-center">
          <Reveal>
            <h2 id="reviews-title" className="section-title">
              What our patients say about us
            </h2>
          </Reveal>

          <Reveal delay={90}>
            <p className="border-line mx-auto mt-5 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border bg-white px-4 py-2">
              <Stars
                value={GOOGLE.rating}
                label={`Rated ${GOOGLE.rating} out of 5 on Google`}
                size={18}
              />
              <span className="font-display text-ink text-lg font-extrabold">
                {GOOGLE.rating}
              </span>
              <span className="text-charcoal text-[0.95rem]">
                from {GOOGLE.count} Google reviews
              </span>
            </p>
            {!anyRated && (
              <p className="sr-only">
                Individual star counts are not shown; open the reviews on Google
                to see each one.
              </p>
            )}
          </Reveal>
        </div>
      </div>

      {/* Full-bleed sliding row */}
      <div className="mt-10 sm:mt-12">
        <ReviewsRow />
      </div>

      <div className="site-container">
        <div className="section-inner mt-6 text-center">
          <a
            href={GOOGLE.url}
            target="_blank"
            rel="noopener"
            className="text-brand-deep decoration-brand-soft text-[0.95rem] font-bold underline underline-offset-4 hover:decoration-current"
          >
            Read all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
