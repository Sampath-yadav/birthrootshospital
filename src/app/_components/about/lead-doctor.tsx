import Link from "next/link";

import { DoctorPortrait } from "~/app/_components/doctors/doctor-card";
import { DevPlaceholder } from "~/app/_components/page/dev-placeholder";
import { PageSection } from "~/app/_components/page/page-section";
import { Reveal } from "~/app/_components/ui/reveal";
import { Button } from "~/components/ui/button";
import { ABOUT } from "~/config/about";
import { DOCTORS } from "~/config/doctors";
import { specialityLabel } from "~/config/specialities";
import { isTodo } from "~/lib/todo";

/** The lead doctor, featured. Falls back to the initials circle without a photo. */
export function LeadDoctor() {
  const doctor = DOCTORS[0];
  if (!doctor) return null;

  const bio = ABOUT.leadBio;

  return (
    <PageSection id="lead-doctor" title={`Meet ${doctor.name}`} tone="white">
      <Reveal className="border-line shadow-soft-pink grid overflow-hidden rounded-[32px] border bg-white lg:grid-cols-[40%_1fr]">
        <DoctorPortrait
          doctor={doctor}
          sizes="(max-width: 1024px) 92vw, 420px"
          className="aspect-[4/5] w-full"
        />

        <div className="p-6 sm:p-9">
          <h3 className="font-display text-ink text-2xl font-extrabold">
            {doctor.name}
          </h3>
          {!isTodo(doctor.qualification) && (
            <p className="text-charcoal mt-1 text-[0.95rem]">
              {doctor.qualification}
            </p>
          )}
          <p className="text-ink mt-1 text-[1.02rem]">{doctor.role}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {doctor.specialities.map((id) => (
              <li
                key={id}
                className="bg-brand-tint-1 text-ink rounded-full px-3 py-1 text-[0.78rem] font-bold"
              >
                {specialityLabel(id)}
              </li>
            ))}
          </ul>

          {bio.length > 0 ? (
            <div className="text-charcoal mt-5 space-y-3 leading-relaxed">
              {bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : (
            <DevPlaceholder
              className="mt-5"
              label={`Two or three sentences about ${doctor.name} (ABOUT.leadBio).`}
            />
          )}

          {/* Shown only once the hospital confirms whose number it is */}
          {doctor.registration && (
            <p className="text-charcoal mt-4 text-[0.9rem]">
              Registration: {doctor.registration}
            </p>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <Button asChild size="lg">
              <Link href={`/book?doctor=${doctor.slug}`}>
                Book with {doctor.name}
              </Link>
            </Button>
            <Link
              href="/specialists"
              className="text-brand-deep text-[0.95rem] font-bold underline underline-offset-4"
            >
              View all specialists
            </Link>
          </div>
        </div>
      </Reveal>
    </PageSection>
  );
}
