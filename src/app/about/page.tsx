import Link from "next/link";

import { CareValues } from "~/app/_components/about/care-values";
import { Gallery } from "~/app/_components/about/gallery";
import { LeadDoctor } from "~/app/_components/about/lead-doctor";
import { MissionVision } from "~/app/_components/about/mission-vision";
import { Registrations } from "~/app/_components/about/registrations";
import { Story } from "~/app/_components/about/story";
import { FinalCta } from "~/app/_components/cta/final-cta";
import { DoctorsSection } from "~/app/_components/doctors/doctors-section";
import { KeyHighlights } from "~/app/_components/highlights/key-highlights";
import { JsonLd } from "~/app/_components/page/json-ld";
import { PageHeader } from "~/app/_components/page/page-header";
import { ServiceCarousel } from "~/app/_components/services/service-carousel";
import { Button } from "~/components/ui/button";
import { ABOUT } from "~/config/about";
import { DOCTORS } from "~/config/doctors";
import { BOOK_HREF } from "~/config/navigation";
import { hospitalJsonLd, physicianJsonLd } from "~/lib/json-ld";
import { buildMetadata, url } from "~/lib/seo";

export const metadata = buildMetadata({
  title: "About Birth Roots Hospital in Mancherial",
  description:
    "Meet Dr. Shruthi Goli and the team at Birth Roots Hospital in Mancherial, caring for women and families in maternity, fertility and laparoscopy.",
  path: "/about",
});

export default function AboutPage() {
  const lead = DOCTORS[0];
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Birth Roots Hospital",
    description: ABOUT.intro,
    url: url("/about"),
    about: hospitalJsonLd(),
  };

  return (
    <>
      <JsonLd data={aboutJsonLd} />
      {lead && <JsonLd data={physicianJsonLd(lead)} />}

      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
        ]}
        title="About Dr. Shruthi Goli's Birth Roots Hospital"
        intro={ABOUT.intro}
        photo={{ src: ABOUT.heroPhoto, alt: ABOUT.photoAlt }}
        actions={
          <>
            <Button asChild size="lg">
              <Link href={BOOK_HREF}>Book Appointment</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/specialists">Our specialists</Link>
            </Button>
          </>
        }
      />

      <Story />
      <MissionVision />
      <LeadDoctor />
      <CareValues />
      <ServiceCarousel
        id="centres"
        heading="Our centres of care"
        subtitle="Six areas of care under one roof in Mancherial."
      />
      <DoctorsSection id="specialists" heading="Our specialists" />
      <KeyHighlights />
      <Gallery />
      <Registrations />
      <FinalCta />
    </>
  );
}
