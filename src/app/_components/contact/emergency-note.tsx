import { BRAND } from "~/config/brand";

/**
 * Forms and inboxes are not watched around the clock, so the page must say where to
 * go in an emergency. No claim of a 24-hour service is made here.
 */
export function EmergencyNote() {
  return (
    <aside className="bg-brand-tint-1 border-brand-soft border-t py-6">
      <div className="site-container">
        <p className="section-inner text-charcoal text-center text-[0.95rem]">
          {BRAND.emergency.tel ? (
            <>
              In an emergency, call{" "}
              <a
                href={`tel:${BRAND.emergency.tel}`}
                className="text-brand-deep font-bold underline underline-offset-4"
              >
                {BRAND.emergency.label}
              </a>{" "}
              or go to your nearest emergency department.
            </>
          ) : (
            <>In an emergency, go to your nearest emergency department.</>
          )}{" "}
          This website&rsquo;s forms are not monitored for emergencies.
        </p>
      </div>
    </aside>
  );
}
