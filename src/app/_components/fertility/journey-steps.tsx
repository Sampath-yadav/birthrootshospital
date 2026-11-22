import { PageSection } from "~/app/_components/page/page-section";
import { Reveal } from "~/app/_components/ui/reveal";
import { FERTILITY } from "~/config/fertility";

/**
 * Five numbered steps. Horizontal and joined by a dashed line on desktop,
 * a vertical timeline on phones. The numbers are meaningful: this is a sequence.
 */
export function JourneySteps() {
  return (
    <PageSection id="journey" title="Your journey with us" tone="warm">
      <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-4">
        {/* Desktop connector */}
        <span
          aria-hidden
          className="border-brand-soft absolute top-[22px] right-[10%] left-[10%] hidden border-t-2 border-dashed lg:block"
        />
        {/* Mobile connector */}
        <span
          aria-hidden
          className="border-brand-soft absolute top-2 bottom-8 left-[21px] border-l-2 border-dashed lg:hidden"
        />

        {FERTILITY.steps.map((step, i) => (
          <Reveal
            key={step.title}
            as="li"
            delay={i * 90}
            className="relative flex gap-4 lg:block lg:text-center"
          >
            <span
              aria-hidden
              className="bg-brand-strong font-display text-ink relative grid size-11 shrink-0 place-items-center rounded-full text-lg font-extrabold lg:mx-auto"
            >
              {i + 1}
            </span>
            <div className="lg:mt-4">
              <h3 className="font-display text-ink text-[1.05rem] font-extrabold">
                {step.title}
              </h3>
              <p className="text-charcoal mt-1.5 text-[0.95rem] leading-relaxed">
                {step.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </PageSection>
  );
}
