import {
  DevPlaceholder,
  SHOW_PLACEHOLDERS,
} from "~/app/_components/page/dev-placeholder";
import { PageSection } from "~/app/_components/page/page-section";
import { Reveal } from "~/app/_components/ui/reveal";
import { ABOUT } from "~/config/about";

function Card({
  label,
  text,
  draft,
  delay,
}: {
  label: string;
  text?: string;
  draft: string;
  delay: number;
}) {
  if (!text && !SHOW_PLACEHOLDERS) return null;
  return (
    <Reveal
      delay={delay}
      className="border-line rounded-[28px] border bg-white p-8"
    >
      <span aria-hidden className="bg-brand-strong block size-2.5 rounded-full" />
      <h3 className="font-display text-ink mt-4 text-[1.1rem] font-extrabold">
        {label}
      </h3>
      {text ? (
        <p className="font-display text-ink mt-3 text-[clamp(1.15rem,2vw,1.5rem)] leading-[1.4] font-semibold">
          {text}
        </p>
      ) : (
        <DevPlaceholder className="mt-3" label={draft} />
      )}
    </Reveal>
  );
}

/** What guides us: mission and vision, hidden entirely until the hospital approves wording. */
export function MissionVision() {
  if (!ABOUT.mission && !ABOUT.vision && !SHOW_PLACEHOLDERS) return null;

  return (
    <PageSection id="guides" title="What guides us" tone="tint">
      <div className="grid gap-5 md:grid-cols-2">
        <Card
          label="Our mission"
          text={ABOUT.mission}
          delay={0}
          draft={`Approve or rewrite (ABOUT.mission). Draft: "To give every woman and family safe, respectful and personal care."`}
        />
        <Card
          label="Our vision"
          text={ABOUT.vision}
          delay={90}
          draft={`Approve or rewrite (ABOUT.vision). Draft: "To be the hospital families in Mancherial trust at every stage of life."`}
        />
      </div>
    </PageSection>
  );
}
