import { Clock, MapPin, Navigation, Phone } from "lucide-react";

import { EnquiryForm } from "~/app/_components/contact/enquiry-form";
import { Reveal } from "~/app/_components/ui/reveal";
import { Button } from "~/components/ui/button";
import { ADDRESS_LINE, BRAND } from "~/config/brand";

/** Find us: map, address, and a call-back enquiry form. */
export function FindUs({
  showForm = true,
  formExtras,
}: {
  showForm?: boolean;
  formExtras?: React.ReactNode;
} = {}) {
  const mapSrc =
    BRAND.mapsEmbedSrc ||
    `https://www.google.com/maps?q=${encodeURIComponent(BRAND.mapsQuery)}&output=embed`;

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y">
      <div className="site-container">
        <div className="section-inner">
          <Reveal className="text-center">
            <h2 id="contact-title" className="section-title">
              Find Birth Roots in Mancherial
            </h2>
          </Reveal>

          <Reveal
            delay={90}
            className="border-line shadow-soft-pink mt-10 grid overflow-hidden rounded-[32px] border bg-white sm:mt-12 lg:grid-cols-2"
          >
            {/* Left: map and address */}
            <div className="bg-brand-tint-1 p-6 sm:p-8">
              {/* An exact embed link wins; otherwise Google locates the pin from the address. */}
              <iframe
                src={mapSrc}
                title="Map showing Birth Roots Hospital, Mancherial"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-line aspect-[4/3] w-full rounded-[24px] border bg-white"
              />

              <ul className="mt-6 space-y-4">
                <li className="flex gap-3">
                  <MapPin
                    className="text-brand-deep mt-0.5 size-5 shrink-0"
                    aria-hidden
                  />
                  <address className="text-ink text-[0.98rem] not-italic">
                    {ADDRESS_LINE}
                  </address>
                </li>
                <li className="flex gap-3">
                  <Phone
                    className="text-brand-deep mt-0.5 size-5 shrink-0"
                    aria-hidden
                  />
                  <a
                    href={`tel:${BRAND.helpline.tel}`}
                    className="text-ink hover:text-brand-deep text-[0.98rem] font-bold"
                  >
                    {BRAND.helpline.label}
                  </a>
                </li>
                {/* TODO(user): opening hours. The row stays hidden until BRAND.hours is set. */}
                {BRAND.hours && (
                  <li className="flex gap-3">
                    <Clock
                      className="text-brand-deep mt-0.5 size-5 shrink-0"
                      aria-hidden
                    />
                    <span className="text-ink text-[0.98rem]">
                      {BRAND.hours}
                    </span>
                  </li>
                )}
              </ul>

              <Button asChild size="lg" className="mt-6">
                <a href={BRAND.mapsUrl} target="_blank" rel="noopener">
                  <Navigation className="size-5" aria-hidden />
                  Get directions
                </a>
              </Button>
            </div>

            {/* Right: enquiry form */}
            {showForm && (
              <div className="bg-white p-6 sm:p-9">
                <EnquiryForm extras={formExtras} />
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
