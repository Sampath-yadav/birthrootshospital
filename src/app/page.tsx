import { HealthTips } from "~/app/_components/blog/health-tips";
import { BookingBar } from "~/app/_components/booking/booking-bar";
import { FindUs } from "~/app/_components/contact/find-us";
import { FinalCta } from "~/app/_components/cta/final-cta";
import { DoctorsSection } from "~/app/_components/doctors/doctors-section";
import { FaqSection } from "~/app/_components/faq/faq-section";
import { getHeroAssets } from "~/app/_components/hero/hero-assets";
import { HeroSlider } from "~/app/_components/hero/hero-slider";
import { KeyHighlights } from "~/app/_components/highlights/key-highlights";
import { ReviewsSection } from "~/app/_components/reviews/reviews-section";
import { ServiceCarousel } from "~/app/_components/services/service-carousel";
import { CareStages } from "~/app/_components/stages/care-stages";
import { faqJsonLd, hospitalJsonLd, physiciansJsonLd } from "~/lib/json-ld";
import { pageMeta } from "~/lib/seo";

export const metadata = pageMeta({
  title: "Birth Roots Hospital | Maternity & IVF in Mancherial",
  absoluteTitle: true,
  description:
    "Maternity and delivery, gynaecology, laparoscopy, fertility and IVF, fetal medicine and newborn care in Mancherial, led by Dr. Shruthi Goli. Book an appointment online.",
  path: "/",
});

export default function Home() {
  // Structured data, built from the same config the page renders.
  const jsonLd = [hospitalJsonLd(), ...physiciansJsonLd(), faqJsonLd()];

  return (
    <>
      {jsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

      <HeroSlider assets={getHeroAssets()}>
        <BookingBar />
      </HeroSlider>
      <CareStages />
      <ServiceCarousel />
      <KeyHighlights />
      <DoctorsSection />
      <ReviewsSection />
      <HealthTips />
      <FaqSection />
      <FindUs />
      <FinalCta />
    </>
  );
}
