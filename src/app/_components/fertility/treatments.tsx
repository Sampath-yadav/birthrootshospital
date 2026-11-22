import { PageSection } from "~/app/_components/page/page-section";
import { Reveal } from "~/app/_components/ui/reveal";
import { FERTILITY } from "~/config/fertility";

/** Treatments the hospital confirms it offers. No links, no prices, no claims. */
export function Treatments() {
  return (
    <PageSection id="treatments" title="Treatments we offer" tone="white">
      <ul className="flex flex-wrap gap-5">
        {FERTILITY.treatments.map((treatment, i) => (
          <Reveal
            key={treatment.name}
            as="li"
            delay={i * 90}
            className="border-line w-full max-w-[22rem] grow rounded-[26px] border bg-white p-[26px] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
          >
            <span
              aria-hidden
              className="bg-brand-strong block size-2.5 rounded-full"
            />
            <h3 className="font-display text-ink mt-4 text-[1.2rem] font-extrabold">
              {treatment.name}
            </h3>
            <p className="text-charcoal mt-2 leading-relaxed">
              {treatment.body}
            </p>
          </Reveal>
        ))}
      </ul>
    </PageSection>
  );
}
