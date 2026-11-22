import Link from "next/link";

import { HERO_SLIDES } from "~/config/hero";

/** Slide 3: a centred title with the service names listed neatly beneath it. */
export function SlideCards({ active }: { active: boolean }) {
  return (
    <div
      data-h="cards-group"
      aria-hidden={!active}
      inert={!active}
      className="absolute inset-0 flex flex-col items-center justify-center px-9 text-center sm:px-2"
    >
      <h2 data-h="card" className="hero-title hero-init-hidden">
        {HERO_SLIDES.servicesTitle}
      </h2>
      <ul className="mt-5 flex max-w-[44rem] flex-wrap items-center justify-center gap-x-2 gap-y-2">
        {HERO_SLIDES.services.map((svc, i) => (
          <li
            key={svc.title}
            data-h="card"
            className="hero-init-hidden flex items-center gap-2"
          >
            {i > 0 && (
              <span
                aria-hidden
                className="bg-brand-strong size-1.5 rounded-full max-sm:hidden"
              />
            )}
            <Link
              href={svc.href}
              className="text-ink hover:text-brand-deep max-sm:border-brand-soft rounded-full bg-white/70 px-4 py-1.5 text-[clamp(1rem,1.5vw,1.2rem)] font-bold backdrop-blur-sm transition-colors max-sm:border sm:bg-transparent sm:px-3"
            >
              {svc.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
