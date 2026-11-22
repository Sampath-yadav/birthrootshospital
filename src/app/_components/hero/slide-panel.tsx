import { HERO_SLIDES } from "~/config/hero";

const s = HERO_SLIDES.panel;

/** Slide 4: visit details, centred above the quick-access bar (same layout as the other slides). */
export function SlideVisit({ active }: { active: boolean }) {
  return (
    <div
      data-h="visit-group"
      aria-hidden={!active}
      inert={!active}
      className="absolute inset-0 flex flex-col items-center justify-center px-9 text-center sm:px-2"
    >
      <h2 data-h="visit-line" className="hero-title hero-init-hidden">
        {s.title}
      </h2>
      <div className="mt-3 space-y-1">
        {s.body.map((p) => (
          <p key={p} data-h="visit-line" className="hero-sub hero-init-hidden">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
