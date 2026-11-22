import {
  HeartHandshake,
  MessageCircle,
  Route,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { PageSection } from "~/app/_components/page/page-section";
import { Reveal } from "~/app/_components/ui/reveal";
import { ABOUT } from "~/config/about";

const ICONS: Record<string, LucideIcon> = {
  MessageCircle,
  HeartHandshake,
  ShieldCheck,
  Route,
};

/** How we care: four values, no cards — just hairline dividers on wide screens. */
export function CareValues() {
  return (
    <PageSection id="values" title="How we care" tone="warm">
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {ABOUT.values.map((value, i) => {
          const Icon = ICONS[value.icon] ?? ShieldCheck;
          return (
            <Reveal
              key={value.title}
              as="li"
              delay={i * 90}
              className="border-line lg:px-6 lg:[&:not(:first-child)]:border-l"
            >
              <span className="bg-brand-tint-1 grid size-[52px] place-items-center rounded-full">
                <Icon className="text-brand-deep size-6" aria-hidden />
              </span>
              <h3 className="font-display text-ink mt-4 text-[1.05rem] font-extrabold">
                {value.title}
              </h3>
              <p className="text-charcoal mt-2 text-[0.95rem] leading-relaxed">
                {value.body}
              </p>
            </Reveal>
          );
        })}
      </ul>
    </PageSection>
  );
}
