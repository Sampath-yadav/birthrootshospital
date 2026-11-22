import { Navigation } from "lucide-react";

import { PageSection } from "~/app/_components/page/page-section";
import { Reveal } from "~/app/_components/ui/reveal";
import { Button } from "~/components/ui/button";
import { BRANCHES } from "~/config/branches";

/**
 * Hidden while Mancherial is the only live branch — one branch needs no list.
 */
export function Branches() {
  const live = BRANCHES.filter((b) => b.live);
  if (live.length < 2) return null;

  return (
    <PageSection id="branches" title="Our branches" tone="warm">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {live.map((branch, i) => (
          <Reveal
            key={branch.slug}
            as="li"
            delay={i * 90}
            className="border-line rounded-[26px] border bg-white p-6"
          >
            <h3 className="font-display text-ink text-[1.15rem] font-extrabold">
              {branch.name}
            </h3>
            <address className="text-charcoal mt-2 text-[0.95rem] not-italic">
              {branch.address}
            </address>
            <a
              href={`tel:${branch.phone.tel}`}
              className="text-ink hover:text-brand-deep mt-3 inline-block font-bold"
            >
              {branch.phone.label}
            </a>
            <Button asChild variant="outline" className="mt-4 w-full">
              <a href={branch.mapsUrl} target="_blank" rel="noopener">
                <Navigation className="size-4" aria-hidden />
                Get directions
              </a>
            </Button>
          </Reveal>
        ))}
      </ul>
    </PageSection>
  );
}
