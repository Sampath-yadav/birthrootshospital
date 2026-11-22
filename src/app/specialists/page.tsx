import { DoctorCard } from "~/app/_components/doctors/doctor-card";
import { DOCTORS } from "~/config/doctors";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";

export const metadata = pageMeta({
  title: "Our Specialists",
  description:
    "Meet the doctors at Birth Roots Hospital, Mancherial: obstetrics, gynaecology, laparoscopy, fertility and newborn care.",
  path: "/specialists",
});

export default function SpecialistsPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Our specialists", path: "/specialists" },
  ]);

  return (
    <div className="pt-[calc(var(--header-h)+32px)] pb-16 sm:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <div className="site-container">
        <div className="section-inner">
          <h1 className="section-title text-center">Our specialists</h1>
          <p className="section-support mx-auto mt-3 text-center">
            Choose a specialist to see their profile or request an appointment.
          </p>
          {/* Cards keep their width and centre themselves, however many there are */}
          <ul className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(230px,286px))] justify-center gap-5">
            {DOCTORS.map((d) => (
              <li key={d.id}>
                <DoctorCard doctor={d} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
