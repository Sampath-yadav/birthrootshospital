import { Star } from "lucide-react";

/**
 * Stars filled to `value` out of 5. `--brand-deep` is used for the fill because it
 * has enough contrast on white. Never call this with a guessed rating.
 */
export function Stars({
  value,
  label,
  size = 16,
}: {
  value: number;
  label: string;
  size?: number;
}) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  const row = (filled: boolean) => (
    <span className="flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={filled ? "fill-brand-deep text-brand-deep" : "text-line"}
          strokeWidth={filled ? 0 : 1.5}
          aria-hidden
        />
      ))}
    </span>
  );

  return (
    <span className="relative inline-flex shrink-0" role="img" aria-label={label}>
      {row(false)}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${pct}%` }}
      >
        {row(true)}
      </span>
    </span>
  );
}
