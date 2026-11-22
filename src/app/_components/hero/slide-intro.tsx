import { HERO_SLIDES } from "~/config/hero";

const s = HERO_SLIDES.intro;

/** Slide 1: H1 + one supporting line, centred above the quick-access bar. */
export function SlideIntro({ active }: { active: boolean }) {
  return (
    <div
      data-h="intro-group"
      aria-hidden={!active}
      inert={!active}
      className="absolute inset-0 flex flex-col items-center justify-center px-9 text-center sm:px-2"
    >
      <h1 className="hero-title">
        {s.headline.map((line) => (
          <span key={line} data-h="intro-line" className="block">
            {line}
          </span>
        ))}
      </h1>
      <p data-h="intro-line" className="hero-sub mt-4">
        {s.sub}
      </p>
    </div>
  );
}
