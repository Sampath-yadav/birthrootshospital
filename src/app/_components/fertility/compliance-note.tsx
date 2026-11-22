import { FERTILITY } from "~/config/fertility";

/** The honesty notice that must sit on this page. Never remove the first two lines. */
export function ComplianceNote() {
  const { registration, reviewedBy, lastReviewed } = FERTILITY;
  const reviewed = reviewedBy && lastReviewed;

  return (
    <div className="site-container pb-10">
      <div className="section-inner">
        <div className="bg-brand-tint-2 text-charcoal rounded-[22px] p-5 text-[0.92rem] leading-relaxed">
          <p>Results vary from person to person, and no outcome is guaranteed.</p>
          <p className="mt-1">
            This page is general information and is not a substitute for medical
            advice.
          </p>
          {registration && (
            <p className="mt-1">
              {registration.label}: {registration.value}
            </p>
          )}
          {reviewed && (
            <p className="mt-1">
              Reviewed by {reviewedBy} on{" "}
              <time dateTime={lastReviewed}>
                {new Date(lastReviewed).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
