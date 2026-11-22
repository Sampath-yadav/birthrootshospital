import {
  ClipboardList,
  HeartHandshake,
  MessageCircle,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { PageSection } from "~/app/_components/page/page-section";
import { Reveal } from "~/app/_components/ui/reveal";
import { FERTILITY } from "~/config/fertility";

const ICONS: Record<string, LucideIcon> = {
  UserRound,
  MessageCircle,
  ClipboardList,
  HeartHandshake,
};

export function WhatToExpect() {
  return (
    <PageSection id="expect" title="What you can expect" tone="tint">
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {FERTILITY.expect.map((item, i) => {
          const Icon = ICONS[item.icon] ?? HeartHandshake;
          return (
            <Reveal key={item.title} as="li" delay={i * 90}>
              <span className="grid size-[52px] place-items-center rounded-full bg-white">
                <Icon className="text-brand-deep size-6" aria-hidden />
              </span>
              <h3 className="text-ink mt-4 text-[1.05rem] font-bold">
                {item.title}
              </h3>
              <p className="text-charcoal mt-2 text-[0.95rem] leading-relaxed">
                {item.body}
              </p>
            </Reveal>
          );
        })}
      </ul>
    </PageSection>
  );
}
