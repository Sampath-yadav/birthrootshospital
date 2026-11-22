import { BRAND } from "~/config/brand";
import { DOCTORS, type Doctor } from "~/config/doctors";
import { FAQS, type Faq } from "~/config/faqs";
import { specialityLabel } from "~/config/specialities";

/**
 * Structured data built from the same config the page renders, so the markup and the
 * visible text can never disagree. Nothing unverified is published: no aggregateRating,
 * no review markup, no invented hours, coordinates or registration numbers.
 */

const hospitalId = BRAND.siteUrl ? `${BRAND.siteUrl}#hospital` : undefined;

export function hospitalJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Hospital",
    ...(hospitalId ? { "@id": hospitalId } : {}),
    name: BRAND.legalName,
    alternateName: "Birthroots Maternity & IVF Infertility Hospital",
    ...(BRAND.siteUrl ? { url: BRAND.siteUrl } : {}),
    founder: { "@type": "Physician", name: "Dr. Shruthi Goli" },
    telephone: BRAND.phones,
    address: {
      "@type": "PostalAddress",
      streetAddress: BRAND.address.street,
      addressLocality: BRAND.address.city,
      addressRegion: BRAND.address.region,
      postalCode: BRAND.address.postalCode,
      addressCountry: BRAND.address.country,
    },
    // TODO(user): coordinates and opening hours are omitted until confirmed.
    ...(BRAND.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: BRAND.geo.lat,
            longitude: BRAND.geo.lng,
          },
        }
      : {}),
    medicalSpecialty: ["Obstetric", "Gynecologic", "Pediatric"],
    availableService: [
      "Maternity and obstetrics",
      "Laparoscopic surgery",
      "IVF and ICSI",
      "Fetal medicine",
      "Newborn care",
    ],
    sameAs: [BRAND.social.instagram, BRAND.social.threads],
  };
}

export function physicianJsonLd(doctor: Doctor) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    medicalSpecialty: doctor.specialities.map(specialityLabel),
    worksFor: {
      "@type": "Hospital",
      name: BRAND.legalName,
      ...(hospitalId ? { "@id": hospitalId } : {}),
    },
    ...(BRAND.siteUrl
      ? { url: `${BRAND.siteUrl}/specialists/${doctor.slug}` }
      : {}),
  };
}

export function physiciansJsonLd() {
  return DOCTORS.map(physicianJsonLd);
}

export function faqJsonLd(items: Faq[] = FAQS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
