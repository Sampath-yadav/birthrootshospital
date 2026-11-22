import Image from "next/image";

import {
  DevPlaceholder,
  SHOW_PLACEHOLDERS,
} from "~/app/_components/page/dev-placeholder";
import { PageSection } from "~/app/_components/page/page-section";
import { Reveal } from "~/app/_components/ui/reveal";
import { ABOUT } from "~/config/about";

/** A look inside: real hospital photos only. Hidden entirely until they exist. */
export function Gallery() {
  if (ABOUT.gallery.length === 0 && !SHOW_PLACEHOLDERS) return null;

  return (
    <PageSection id="gallery" title="A look inside" tone="warm">
      {ABOUT.gallery.length === 0 ? (
        <DevPlaceholder label="Four to six real photos of the hospital — reception, rooms, theatre, nursery (ABOUT.gallery). This whole section is hidden in production until then." />
      ) : (
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {ABOUT.gallery.map((photo, i) => (
            <Reveal key={photo.src} as="li" delay={i * 60}>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={800}
                height={600}
                sizes="(max-width: 1024px) 46vw, 360px"
                className="aspect-[4/3] w-full rounded-[22px] object-cover"
              />
            </Reveal>
          ))}
        </ul>
      )}
    </PageSection>
  );
}
