import { MapPin, Navigation } from "lucide-react";

import { CopyAddress } from "~/app/_components/contact/copy-address";
import {
  DevPlaceholder,
  SHOW_PLACEHOLDERS,
} from "~/app/_components/page/dev-placeholder";
import { PageSection } from "~/app/_components/page/page-section";
import { Reveal } from "~/app/_components/ui/reveal";
import { Button } from "~/components/ui/button";
import { ADDRESS_LINE, BRAND } from "~/config/brand";
import { CONTACT } from "~/config/contact";

/** Visit us: the map beside the address, directions and a copy button. */
export function VisitUs() {
  const mapSrc =
    BRAND.mapsEmbedSrc ||
    `https://www.google.com/maps?q=${encodeURIComponent(BRAND.mapsQuery)}&output=embed`;

  return (
    <PageSection id="visit" title="Visit us" tone="tint">
      <Reveal className="border-line grid overflow-hidden rounded-[32px] border bg-white lg:grid-cols-2">
        <div className="bg-brand-tint-1 p-6 sm:p-8">
          <iframe
            src={mapSrc}
            title="Map showing Birth Roots Hospital, Mancherial"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border-line aspect-[4/3] w-full rounded-[24px] border bg-white"
          />
        </div>

        <div className="bg-white p-6 sm:p-[clamp(24px,4vw,44px)]">
          <h3 className="font-display text-ink text-[1.3rem] font-extrabold">
            Birth Roots Hospital
          </h3>

          {/* A div, not a p: <address> is block-level and may not sit inside a p. */}
          <div className="mt-4 flex gap-3">
            <MapPin className="text-brand-deep mt-0.5 size-5 shrink-0" aria-hidden />
            <address className="text-ink text-[1rem] not-italic">
              {ADDRESS_LINE}
            </address>
          </div>

          {CONTACT.landmark && (
            <p className="text-charcoal mt-2 pl-8 text-[0.95rem]">
              {CONTACT.landmark}
            </p>
          )}

          {CONTACT.howToReach.length > 0 ? (
            <>
              <h4 className="font-display text-ink mt-6 text-[1rem] font-extrabold">
                How to reach us
              </h4>
              <ul className="text-charcoal mt-2 list-disc space-y-1 pl-5">
                {CONTACT.howToReach.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </>
          ) : (
            SHOW_PLACEHOLDERS && (
              <DevPlaceholder
                className="mt-6"
                label="How to reach us — distance from the railway station and bus stand, nearby landmarks, parking (CONTACT.howToReach)."
              />
            )
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={BRAND.mapsUrl} target="_blank" rel="noopener">
                <Navigation className="size-5" aria-hidden />
                Get directions
              </a>
            </Button>
            <CopyAddress address={ADDRESS_LINE} />
          </div>
        </div>
      </Reveal>
    </PageSection>
  );
}
