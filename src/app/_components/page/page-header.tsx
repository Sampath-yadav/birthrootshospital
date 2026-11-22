import Image from "next/image";
import { type ReactNode } from "react";

import { Breadcrumbs, type Crumb } from "~/app/_components/page/breadcrumbs";
import { ILLUSTRATIONS, type IllustrationName } from "~/config/illustrations";

/**
 * Photo mask: opaque across the full right portion, fades to transparent only
 * on the left edge where it meets the text, so the building fills the entire
 * header height with no gaps top or bottom.
 */
const FADE_GRADIENT =
  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 22%, #000 36%, #000 100%)";
const FADE = {
  maskImage: FADE_GRADIENT,
  WebkitMaskImage: FADE_GRADIENT,
} as const;

/**
 * The band at the top of every inner page: trail, the page's only H1, one intro
 * line, optional buttons and chips, and — on wide screens — either a small
 * illustration or a photo that fills the full header height on the right.
 */
export function PageHeader({
  breadcrumbs,
  title,
  intro,
  art,
  photo,
  actions,
  chips,
}: {
  breadcrumbs: Crumb[];
  title: string;
  intro: string;
  art?: IllustrationName;
  /** A real hospital photo. Takes the place of `art` when given. */
  photo?: { src: string; alt: string };
  actions?: ReactNode;
  chips?: string[];
}) {
  const showArt = Boolean(art) && !photo;
  return (
    <header className="bg-brand-tint-2 border-brand-soft relative overflow-hidden border-b pt-[calc(var(--header-h)+clamp(24px,4vw,56px))] pb-[clamp(32px,5vw,64px)]">
      {/* Soft glow, top-left */}
      <span
        aria-hidden
        className="bg-brand-tint-1 pointer-events-none absolute -top-28 -left-24 size-[520px] rounded-full blur-3xl opacity-60"
      />

      {/* ── Full-height photo: absolutely fills the right half of the header ── */}
      {photo && (
        <div
          style={FADE}
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[min(52vw,620px)] md:block"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority
            sizes="(max-width: 768px) 0vw, 620px"
            className="object-cover object-center"
          />
          {/* Barely-there brand tint to marry photo to the pink background */}
          <span
            aria-hidden
            className="from-brand-tint-1/20 absolute inset-0 bg-gradient-to-l to-transparent"
          />
        </div>
      )}

      <div className="site-container relative">
        <div className="section-inner flex flex-col gap-6">
          {/* Mobile-only photo: shown below the text on small screens */}
          {photo && (
            <div className="relative h-[220px] w-full overflow-hidden rounded-2xl sm:h-[260px] md:hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          )}

          {/* Text column — capped at ~52% so it never overlaps the photo */}
          <div className={photo ? "md:max-w-[52%]" : "min-w-0"}>
            {/* Below 900 px the art sits above the text instead of beside it */}
            {showArt && art && (
              <Image
                src={ILLUSTRATIONS[art]}
                alt=""
                width={224}
                height={224}
                sizes="72px"
                className="mb-4 size-[72px] object-contain md:hidden"
              />
            )}

            <Breadcrumbs items={breadcrumbs} />

            <h1 className="font-display text-ink mt-3 max-w-[18ch] text-[clamp(2rem,5vw,3.4rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-balance">
              {title}
            </h1>

            <p className="text-ink/85 mt-4 max-w-[46ch] text-[1.15rem] leading-relaxed">
              {intro}
            </p>

            {actions && (
              <div className="mt-7 flex flex-wrap gap-3">{actions}</div>
            )}

            {chips && chips.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <li
                    key={chip}
                    className="border-line text-ink rounded-full border bg-white px-3 py-1.5 text-[0.8rem] font-bold"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {showArt && art && (
            <div className="shadow-soft-pink hidden size-[200px] shrink-0 place-items-center rounded-full bg-white md:grid">
              <Image
                src={ILLUSTRATIONS[art]}
                alt=""
                width={224}
                height={224}
                sizes="140px"
                className="size-[140px] object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
