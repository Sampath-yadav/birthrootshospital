import Link from "next/link";

import { DoctorCard } from "~/app/_components/doctors/doctor-card";
import { Reveal } from "~/app/_components/ui/reveal";
import { DOCTORS, type Doctor } from "~/config/doctors";

/**
 * Meet your doctors. Server-rendered.
 * NOTE: the Location/Speciality filter chips are only shown once there are four or
 * more doctors; they need a small client component when that day comes.
 */
export function DoctorsSection({
  doctors = DOCTORS,
  heading = "Meet your doctors",
  subtitle = "Choose a specialist and book your visit online.",
  id = "doctors",
}: {
  doctors?: Doctor[];
  heading?: string;
  subtitle?: string;
  id?: string;
} = {}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section-y">
      <div className="site-container">
        <div className="section-inner">
          <Reveal className="text-center">
            <h2 id={`${id}-title`} className="section-title">
              {heading}
            </h2>
            <p className="section-support mx-auto mt-3">{subtitle}</p>
          </Reveal>

          {/* Mobile: a snapping row where the next card peeks. Desktop: cards keep
              their width and centre themselves, however many there are. */}
          <ul className="mt-10 flex snap-x snap-mandatory scrollbar-none gap-5 overflow-x-auto pb-2 sm:mt-12 sm:grid sm:grid-cols-[repeat(auto-fit,minmax(230px,286px))] sm:justify-center sm:overflow-visible">
            {doctors.map((doctor, i) => (
              <li
                key={doctor.id}
                className="w-[78%] shrink-0 snap-start sm:w-auto"
              >
                <Reveal delay={i * 90} className="h-full">
                  <DoctorCard doctor={doctor} />
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={180} className="mt-8 text-center">
            <Link
              href="/specialists"
              className="text-brand-deep decoration-brand-soft text-[0.95rem] font-bold underline underline-offset-4 hover:decoration-current"
            >
              View all specialists
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
