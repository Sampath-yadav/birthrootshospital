"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";

import { DevPlaceholder } from "~/app/_components/page/dev-placeholder";
import { PageSection } from "~/app/_components/page/page-section";
import { Reveal } from "~/app/_components/ui/reveal";
import { ABOUT } from "~/config/about";

/** Autoplay, loop, muted video — natural aspect ratio, nothing cropped. */
function StoryVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    void el.play().catch(() => {
      /* autoplay blocked — stays paused, user can click */
    });
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-[28px] shadow-lg">
      <video
        ref={ref}
        src={src}
        poster={poster}
        loop
        muted
        playsInline
        autoPlay
        className="block w-full"
        style={{ display: "block" }}
      />
    </div>
  );
}

/** Our story: the text, and the hospital story video beside it. */
export function Story() {
  return (
    <PageSection id="story" title="Our story" tone="white">
      {/* On large screens: text left, video right (wider column).
          On small screens: text then full-width video below. */}
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20 lg:items-center">
        <Reveal>
          <div className="text-charcoal space-y-4 text-[1.1rem] leading-[1.7]">
            {ABOUT.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {ABOUT.story.length < 2 && (
            <DevPlaceholder
              className="mt-4"
              label="Our story — two or three sentences on why the hospital began and what has changed since (ABOUT.story)."
            />
          )}
          <p className="mt-5">
            <Link
              href="/fertility-ivf"
              className="text-brand-deep font-bold underline underline-offset-4"
            >
              Read about our fertility and IVF care
            </Link>
          </p>
        </Reveal>

        <Reveal delay={90} className="relative">
          <StoryVideo
            src="/video/Birth Roots story.mp4"
            poster={ABOUT.photo ?? undefined}
          />
          <span className="text-ink absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[0.8rem] font-bold shadow-sm backdrop-blur-sm">
            {ABOUT.photoAlt}
          </span>
        </Reveal>
      </div>
    </PageSection>
  );
}
