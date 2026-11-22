import { type ReactNode } from "react";

import { Reveal } from "~/app/_components/ui/reveal";
import { cn } from "~/lib/utils";

const TONES = {
  white: "bg-white",
  warm: "bg-surface-warm",
  tint: "bg-brand-tint-2",
} as const;

/** One section of an inner page: background tone, heading, and the shared container. */
export function PageSection({
  id,
  title,
  subtitle,
  tone = "white",
  className,
  children,
}: {
  id: string;
  title?: string;
  subtitle?: string;
  tone?: keyof typeof TONES;
  className?: string;
  children: ReactNode;
}) {
  const headingId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      aria-label={title ? undefined : id}
      className={cn(TONES[tone], "section-y", className)}
    >
      <div className="site-container">
        <div className="section-inner">
          {title && (
            <Reveal>
              <h2 id={headingId} className="section-title">
                {title}
              </h2>
              {subtitle && <p className="section-support mt-3">{subtitle}</p>}
            </Reveal>
          )}
          <div className={title ? "mt-8 sm:mt-10" : undefined}>{children}</div>
        </div>
      </div>
    </section>
  );
}
