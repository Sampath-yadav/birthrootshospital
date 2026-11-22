import { Check } from "lucide-react";

import { PageSection } from "~/app/_components/page/page-section";
import { Reveal } from "~/app/_components/ui/reveal";
import { FERTILITY } from "~/config/fertility";

export function WhenToSeekHelp() {
  return (
    <PageSection
      id="when"
      title="When to see a fertility specialist"
      subtitle="Not sure? Book a consultation and we will guide you."
      tone="white"
    >
      <Reveal className="bg-brand-tint-2 rounded-[28px] p-[clamp(22px,4vw,40px)]">
        <ul className="grid gap-5 sm:grid-cols-2">
          {FERTILITY.whenToSeek.map((line) => (
            <li key={line} className="flex items-start gap-3">
              <span
                aria-hidden
                className="bg-brand-strong mt-0.5 grid size-7 shrink-0 place-items-center rounded-full"
              >
                <Check className="text-ink size-4" strokeWidth={3} />
              </span>
              <span className="text-ink text-[1.05rem] leading-relaxed">
                {line}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </PageSection>
  );
}
