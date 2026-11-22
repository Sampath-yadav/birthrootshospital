import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { AppointmentPanel } from "~/app/_components/booking/appointment-panel";
import { panelDoctors } from "~/app/_components/booking/panel-doctors";
import { DoctorPortrait } from "~/app/_components/doctors/doctor-card";
import { BRAND } from "~/config/brand";
import { DOCTORS, findDoctor } from "~/config/doctors";
import { specialityLabel } from "~/config/specialities";
import { physicianJsonLd } from "~/lib/json-ld";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";
import { isTodo } from "~/lib/todo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return DOCTORS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doctor = findDoctor((await params).slug);
  if (!doctor) return {};
  const photo = doctor.photo
    ? [{ url: doctor.photo, width: 452, height: 678, alt: doctor.name }]
    : undefined;
  return pageMeta({
    title: `${doctor.name} | ${doctor.department} in Mancherial`,
    description: `${doctor.name}, ${doctor.role} at ${BRAND.name}, Mancherial. See qualifications and request an appointment online.`,
    path: `/specialists/${doctor.slug}`,
    images: photo,
  });
}

export default async function DoctorProfile({ params }: Props) {
  const doctor = findDoctor((await params).slug);
  if (!doctor) notFound();

  const jsonLd = [
    physicianJsonLd(doctor),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Our specialists", path: "/specialists" },
      { name: doctor.name, path: `/specialists/${doctor.slug}` },
    ]),
  ];

  return (
    <>
      {jsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

      <div className="pt-[calc(var(--header-h)+24px)] pb-16 sm:pb-24">
        <div className="site-container">
          <div className="section-inner">
            {/* Header panel */}
            <section
              aria-labelledby="doctor-name"
              className="bg-brand-tint-1 rounded-[32px] p-5 sm:p-8"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <DoctorPortrait
                  doctor={doctor}
                  sizes="160px"
                  className="aspect-[4/5] w-32 shrink-0 rounded-[20px] sm:w-40"
                />
                <div>
                  <h1
                    id="doctor-name"
                    className="font-display text-ink text-[clamp(1.6rem,3.2vw,2.3rem)] leading-tight font-extrabold"
                  >
                    {doctor.name}
                  </h1>
                  <p className="text-ink mt-2 text-[1.15rem]">{doctor.department}</p>
                  {!isTodo(doctor.qualification) && (
                    <p className="text-charcoal mt-0.5 text-[0.95rem]">
                      {doctor.qualification}
                    </p>
                  )}
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {doctor.specialities.map((id) => (
                      <li
                        key={id}
                        className="text-ink rounded-full bg-white px-3 py-1 text-[0.78rem] font-bold"
                      >
                        {specialityLabel(id)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <AppointmentPanel
                  doctors={panelDoctors()}
                  initialDoctor={doctor.slug}
                  lockDoctor
                />
              </div>
            </section>

            {/* About */}
            <section aria-labelledby="about-title" className="mt-12 max-w-3xl">
              <h2 id="about-title" className="section-title !text-[clamp(1.4rem,2.6vw,1.9rem)]">
                About {doctor.name}
              </h2>
              <div className="text-charcoal mt-4 space-y-4 leading-relaxed">
                {doctor.about.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <p className="text-charcoal mt-8 text-[0.85rem]">
                The information on this page is general and is not a substitute for medical
                advice.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
