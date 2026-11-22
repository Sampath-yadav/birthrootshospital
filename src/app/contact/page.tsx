import { Navigation, Phone } from "lucide-react";

import { Branches } from "~/app/_components/contact/branches";
import { ContactCards } from "~/app/_components/contact/contact-cards";
import { EmergencyNote } from "~/app/_components/contact/emergency-note";
import { EnquiryForm } from "~/app/_components/contact/enquiry-form";
import { FollowUs } from "~/app/_components/contact/follow-us";
import { VisitUs } from "~/app/_components/contact/visit-us";
import { FaqSection } from "~/app/_components/faq/faq-section";
import { JsonLd } from "~/app/_components/page/json-ld";
import { PageHeader } from "~/app/_components/page/page-header";
import { PageSection } from "~/app/_components/page/page-section";
import { Reveal } from "~/app/_components/ui/reveal";
import { Button } from "~/components/ui/button";
import { BRAND } from "~/config/brand";
import { CONTACT } from "~/config/contact";
import { faqJsonLd, hospitalJsonLd } from "~/lib/json-ld";
import { buildMetadata, url } from "~/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Birth Roots Hospital, Mancherial",
  description:
    "Call, visit or send an enquiry to Birth Roots Hospital at IB Chowrasta, Mancherial. Phone number, address, map and directions.",
  path: "/contact",
});

export default function ContactPage() {
  // The hospital block, with the ways people can reach it.
  const hospital = {
    ...hospitalJsonLd(),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "appointments",
        telephone: BRAND.helpline.tel,
        // TODO(user): add availableLanguage once the hospital confirms which languages.
      },
      ...(BRAND.emergency.tel
        ? [
            {
              "@type": "ContactPoint",
              contactType: "emergency",
              telephone: BRAND.emergency.tel,
            },
          ]
        : []),
    ],
  };

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Reach Birth Roots Hospital",
    url: url("/contact"),
    about: hospital,
  };

  return (
    <>
      <JsonLd data={contactJsonLd} />
      <JsonLd data={faqJsonLd(CONTACT.quickFaqs)} />

      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Reach Us", href: "/contact" },
        ]}
        title="Reach Birth Roots Hospital"
        intro="Call us, visit us or send an enquiry. We're in Mancherial."
        // The building itself, so people know what to look for when they arrive.
        photo={{
          src: "/hospital/front-portrait.webp",
          alt: "The front of Birth Roots Hospital, Mancherial",
        }}
        actions={
          <>
            <Button asChild size="lg">
              <a href={`tel:${BRAND.helpline.tel}`}>
                <Phone className="size-5" aria-hidden />
                Call {BRAND.helpline.label}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={BRAND.mapsUrl} target="_blank" rel="noopener">
                <Navigation className="size-5" aria-hidden />
                Get directions
              </a>
            </Button>
          </>
        }
      />

      <ContactCards />
      <VisitUs />

      <PageSection
        id="enquiry"
        title="Send us an enquiry"
        subtitle="Share your name and number and we'll call you back. Please don't include medical details here."
        tone="white"
      >
        <Reveal className="border-line mx-auto max-w-[640px] rounded-[32px] border bg-white p-6 sm:p-[clamp(24px,4vw,44px)]">
          <EnquiryForm showPreferences showHeading={false} />
        </Reveal>
      </PageSection>

      <Branches />

      <FaqSection
        id="quick-answers"
        items={CONTACT.quickFaqs}
        heading="Quick answers"
        subtitle="A few things people ask us before they visit."
        showCallCard={false}
      />

      <FollowUs />
      <EmergencyNote />
    </>
  );
}
