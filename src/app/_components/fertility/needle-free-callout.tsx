import { Reveal } from "~/app/_components/ui/reveal";
import { FERTILITY } from "~/config/fertility";

/**
 * Hidden until the hospital confirms what this is. Nothing is described here beyond
 * the words they supply.
 */
export function NeedleFreeCallout() {
  const item = FERTILITY.needleFree;
  if (!item) return null;

  return (
    <div className="site-container pb-8">
      <div className="section-inner">
        <Reveal className="from-brand-tint-1 to-brand-soft rounded-[32px] bg-gradient-to-br p-[clamp(24px,4vw,44px)]">
          <h2 className="font-display text-ink text-[clamp(1.3rem,2.6vw,1.8rem)] font-extrabold">
            {item.title}
          </h2>
          <p className="text-ink mt-3 max-w-[56ch] text-[1.05rem] leading-relaxed">
            {item.body}
          </p>
        </Reveal>
      </div>
    </div>
  );
}
