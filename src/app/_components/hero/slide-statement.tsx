import { HERO_SLIDES } from "~/config/hero";

/** Slide 2: statement, centred above the quick-access bar. */
export function SlideStatement({ active }: { active: boolean }) {
  return (
    <div
      data-h="statement-group"
      aria-hidden={!active}
      inert={!active}
      className="absolute inset-0 flex flex-col items-center justify-center px-9 text-center sm:px-2"
    >
      <p className="hero-title">
        {HERO_SLIDES.statement.lines.map((line) => (
          <span
            key={line}
            data-h="statement-line"
            className="hero-init-hidden block"
          >
            {line}
          </span>
        ))}
      </p>
      <p
        data-h="statement-line"
        className="hero-sub hero-init-hidden mt-4 font-bold"
      >
        {HERO_SLIDES.statement.credentials}
      </p>
    </div>
  );
}
