import { CalendarCheck, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "~/app/_components/ui/reveal";
import { Button } from "~/components/ui/button";
import { BRAND } from "~/config/brand";
import { BOOK_HREF } from "~/config/navigation";

export function FinalCta({
  heading = "Your family’s journey starts with one visit.",
  subtitle = "Book a consultation with our team in Mancherial.",
  primary = { label: "Book Appointment", href: BOOK_HREF },
  secondary = {
    label: `Call ${BRAND.helpline.label}`,
    href: `tel:${BRAND.helpline.tel}`,
  },
}: {
  heading?: string;
  subtitle?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
} = {}) {
  return (
    <section id="cta" aria-labelledby="cta-title" className="pb-8 sm:pb-12">
      <div className="site-container">
        <div className="section-inner">
          <Reveal className="from-brand-tint-1 to-brand-soft flex flex-col items-center gap-8 rounded-[36px] bg-gradient-to-br p-[clamp(28px,5vw,64px)] text-center lg:flex-row lg:justify-between lg:text-left">
            <div className="order-last lg:order-first">
              <h2 id="cta-title" className="section-title">
                {heading}
              </h2>
              <p className="section-support mt-3 lg:mx-0">{subtitle}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Button asChild size="lg">
                  <Link href={primary.href}>
                    <CalendarCheck className="size-5" aria-hidden />
                    {primary.label}
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={secondary.href}>
                    <Phone className="size-5" aria-hidden />
                    {secondary.label}
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative order-first shrink-0 lg:order-last">
              <span
                aria-hidden
                className="absolute inset-0 -m-6 rounded-full bg-white/50 blur-2xl"
              />
              <Image
                src="/stages/newborn.webp"
                alt=""
                width={224}
                height={224}
                sizes="140px"
                className="relative size-24 object-contain lg:size-[140px]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
