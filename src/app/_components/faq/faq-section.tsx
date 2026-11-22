import { Phone } from "lucide-react";
import Link from "next/link";

import { Reveal } from "~/app/_components/ui/reveal";
import { Button } from "~/components/ui/button";
import { BRAND } from "~/config/brand";
import { FAQS, type Faq } from "~/config/faqs";

/**
 * Common questions. Native <details>/<summary>, so every answer is in the HTML and
 * the section works with JavaScript switched off. The same `answer` strings feed the
 * FAQPage JSON-LD, so the markup can never disagree with the visible text.
 */
export function FaqSection({
  items = FAQS,
  heading = "Common questions",
  subtitle = "Can’t find your answer? Call us on the helpline.",
  showCallCard = true,
  id = "faq",
  tone = "bg-surface-warm",
}: {
  items?: Faq[];
  heading?: string;
  subtitle?: string;
  showCallCard?: boolean;
  id?: string;
  tone?: string;
} = {}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`${tone} section-y`}
    >
      <div className="site-container">
        {/* Mobile order: heading, accordion, call card. Desktop: heading and call
            card stacked on the left, accordion on the right. */}
        <div className="section-inner grid gap-8 lg:grid-cols-[38%_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-14">
          <Reveal className="lg:col-start-1 lg:row-start-1">
            <h2 id={`${id}-title`} className="section-title">
              {heading}
            </h2>
            <p className="section-support mt-3">{subtitle}</p>
          </Reveal>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            {items.map((faq, i) => (
              <Reveal key={faq.id} delay={i * 90}>
                <details className="group border-line border-b open:bg-brand-tint-1 open:rounded-[20px] open:border-transparent">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-5 [&::-webkit-details-marker]:hidden">
                    <h3 className="font-display text-ink text-[1.05rem] font-bold">
                      {faq.question}
                    </h3>
                    <span
                      aria-hidden
                      className="border-line relative grid size-8 shrink-0 place-items-center rounded-full border bg-white"
                    >
                      <span className="bg-ink absolute h-0.5 w-3.5 rounded-full" />
                      <span className="bg-ink absolute h-3.5 w-0.5 rounded-full transition-transform duration-300 group-open:scale-y-0" />
                    </span>
                  </summary>
                  <div className="faq-answer px-4 pb-5">
                    <p className="text-charcoal text-[0.98rem] leading-relaxed">
                      {faq.answer}
                    </p>
                    {faq.links && (
                      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                        {faq.links.map((link) => (
                          <li key={link.href}>
                            {link.href.startsWith("http") ? (
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener"
                                className="text-brand-deep text-[0.9rem] font-bold underline underline-offset-4"
                              >
                                {link.label}
                              </a>
                            ) : (
                              <Link
                                href={link.href}
                                className="text-brand-deep text-[0.9rem] font-bold underline underline-offset-4"
                              >
                                {link.label}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>

          {showCallCard && (
          <Reveal
            delay={90}
            className="bg-brand-tint-1 self-start rounded-[28px] p-6 lg:col-start-1 lg:row-start-2"
          >
            <p className="text-charcoal text-[0.9rem] font-bold">Helpline</p>
            <p className="font-display text-ink mt-1 text-xl font-extrabold">
              {BRAND.helpline.label}
            </p>
            <Button asChild size="lg" className="mt-4">
              <a href={`tel:${BRAND.helpline.tel}`}>
                <Phone className="size-5" aria-hidden />
                Call now
              </a>
            </Button>
          </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
