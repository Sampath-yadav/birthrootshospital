/**
 * A dashed box marking content the hospital still has to supply. It renders only
 * in development, so a production build can never show a TODO to a patient.
 */
export function DevPlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  if (process.env.NODE_ENV !== "development") return null;
  return (
    <p
      className={`border-brand-soft text-charcoal rounded-[18px] border-2 border-dashed bg-white/60 p-4 text-[0.9rem] ${className ?? ""}`}
    >
      <span className="text-brand-deep font-bold">Needs content: </span>
      {label}
    </p>
  );
}

/** True while the hospital can still see placeholders (development only). */
export const SHOW_PLACEHOLDERS = process.env.NODE_ENV === "development";
