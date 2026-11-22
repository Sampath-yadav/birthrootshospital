import { AppointmentPanel } from "~/app/_components/booking/appointment-panel";
import { panelDoctors } from "~/app/_components/booking/panel-doctors";
import { findDoctor } from "~/config/doctors";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";

export const metadata = pageMeta({
  title: "Book an Appointment in Mancherial",
  description:
    "Request an appointment at Birth Roots Hospital, Mancherial. Choose a doctor, a day and a time of day, and our team will call you to confirm.",
  path: "/book",
});

type Props = {
  searchParams: Promise<{ doctor?: string; speciality?: string }>;
};

export default async function BookPage({ searchParams }: Props) {
  const { doctor, speciality } = await searchParams;
  // The home booking bar sends a doctor id; doctor cards send a slug.
  const chosen = findDoctor(doctor);
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Book an appointment", path: "/book" },
  ]);

  return (
    <div className="pt-[calc(var(--header-h)+32px)] pb-16 sm:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <div className="site-container">
        <div className="section-inner">
          <h1 className="section-title text-center">Book an appointment</h1>
          <p className="section-support mx-auto mt-3 mb-10 text-center">
            Tell us who you would like to see and when. We will call to confirm.
          </p>
          <AppointmentPanel
            doctors={panelDoctors()}
            initialDoctor={chosen?.slug}
            initialSpeciality={speciality}
          />
        </div>
      </div>
    </div>
  );
}
