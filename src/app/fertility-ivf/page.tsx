import Link from "next/link";

import { FinalCta } from "~/app/_components/cta/final-cta";
import { FaqSection } from "~/app/_components/faq/faq-section";
import { ComplianceNote } from "~/app/_components/fertility/compliance-note";
import { JourneySteps } from "~/app/_components/fertility/journey-steps";
import { NeedleFreeCallout } from "~/app/_components/fertility/needle-free-callout";
import { Treatments } from "~/app/_components/fertility/treatments";
import { WhatToExpect } from "~/app/_components/fertility/what-to-expect";
import { WhenToSeekHelp } from "~/app/_components/fertility/when-to-seek-help";
import { JsonLd } from "~/app/_components/page/json-ld";
import { PageHeader } from "~/app/_components/page/page-header";
import { Button } from "~/components/ui/button";
import { BRAND } from "~/config/brand";
import { DOCTORS } from "~/config/doctors";
import { FERTILITY } from "~/config/fertility";
import { faqJsonLd, physicianJsonLd } from "~/lib/json-ld";
import { buildMetadata, url } from "~/lib/seo";

/** Opens the booking flow with Fertility & IVF already chosen. */
const BOOK_FERTILITY = "/book?speciality=fertility";

export const metadata = buildMetadata({
  title: "IVF and Fertility Treatment in Mancherial | Birth Roots",
  description:
    "Fertility evaluation, IVF and ICSI at Birth Roots Hospital, Mancherial, led by infertility specialist Dr. Shruthi Goli. Book a consultation online.",
  path: "/fertility-ivf",
});

export default function FertilityPage() {
  const lead = DOCTORS[0];
  const reviewed = FERTILITY.reviewedBy && FERTILITY.lastReviewed;

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Fertility and IVF care in Mancherial",
    description: FERTILITY.intro,
    url: url("/fertility-ivf"),
    about: { "@type": "MedicalCondition", name: "Infertility" },
    // Shown only once a doctor has reviewed the wording.
    ...(reviewed && lead
      ? {
          reviewedBy: physicianJsonLd(lead),
          lastReviewed: FERTILITY.lastReviewed,
        }
      : {}),
  };

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={faqJsonLd(FERTILITY.faqs)} />
      {lead && <JsonLd data={physicianJsonLd(lead)} />}

      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Fertility & IVF", href: "/fertility-ivf" },
        ]}
        title="Fertility and IVF care in Mancherial"
        intro={FERTILITY.intro}
        art="fertility-twins"
        chips={[
          "Led by Dr. Shruthi Goli, MBBS, DNB / MS OBG",
          "Infertility specialist",
        ]}
        actions={
          <>
            <Button asChild size="lg">
              <Link href={BOOK_FERTILITY}>Book a fertility consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`tel:${BRAND.helpline.tel}`}>
                Call {BRAND.helpline.label}
              </a>
            </Button>
          </>
        }
      />

      <WhenToSeekHelp />
      <JourneySteps />
      <Treatments />
      <NeedleFreeCallout />
      <WhatToExpect />

      <FaqSection
        id="fertility-faq"
        items={FERTILITY.faqs}
        heading="Questions about fertility and IVF"
        subtitle="Can't find your answer? Call us on the helpline."
      />

      <ComplianceNote />

      <section aria-labelledby="related-title" className="site-container pb-12">
        <div className="section-inner">
          <h2
            id="related-title"
            className="font-display text-ink text-lg font-extrabold"
          >
            Related care
          </h2>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {[
              { label: "Maternity & Obstetrics", href: "/services/maternity" },
              { label: "Fetal Medicine", href: "/services/fetal-medicine" },
              { label: "Gynaecology", href: "/services/gynaecology" },
              { label: "Meet our specialists", href: "/specialists" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-brand-deep font-bold underline underline-offset-4"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta
        heading="Start with one conversation."
        subtitle="Book a fertility consultation with our team in Mancherial."
        primary={{ label: "Book a fertility consultation", href: BOOK_FERTILITY }}
        secondary={{
          label: `Call ${BRAND.helpline.label}`,
          href: `tel:${BRAND.helpline.tel}`,
        }}
      />
    </>
  );
}
