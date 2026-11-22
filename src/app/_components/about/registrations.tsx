import {
  DevPlaceholder,
  SHOW_PLACEHOLDERS,
} from "~/app/_components/page/dev-placeholder";
import { PageSection } from "~/app/_components/page/page-section";
import { Reveal } from "~/app/_components/ui/reveal";
import { ABOUT } from "~/config/about";

/** Registrations and recognition. Nothing here may be published before it is confirmed. */
export function Registrations() {
  if (ABOUT.registrations.length === 0 && !SHOW_PLACEHOLDERS) return null;

  return (
    <PageSection
      id="registrations"
      title="Registrations and recognition"
      tone="white"
    >
      {ABOUT.registrations.length === 0 ? (
        <DevPlaceholder label="Hospital registration, ART registration if applicable, and any accreditation (ABOUT.registrations). Hidden in production until supplied." />
      ) : (
        <Reveal>
          <dl className="max-w-3xl">
            {ABOUT.registrations.map((item) => (
              <div
                key={item.label}
                className="border-line flex flex-wrap justify-between gap-x-8 gap-y-1 border-b py-4"
              >
                <dt className="text-charcoal">{item.label}</dt>
                <dd className="text-ink font-bold">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )}
    </PageSection>
  );
}
