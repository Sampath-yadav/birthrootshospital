import { env } from "~/env";

export const BRAND = {
  name: "Birth Roots Hospital",
  legalName: "Dr. Shruthi Goli's Birth Roots Hospital",
  owner: "Dr. Shruthi Goli's Birth Roots",
  tagline: "Centre of Excellence: Fertility | Maternity | Laparoscopy",
  // Logo lives in /public/logo (the brief said /public/brand; existing path kept).
  logo: {
    src: "/logo/birthrootshospital_logo.png",
    width: 2172,
    height: 724,
    alt: "Birth Roots Hospital",
  },
  // TODO(confirm): a Google review says the hospital moved from Bellampalli
  // Crossroads to IB Crossroads. Check every listing matches this address.
  address: {
    street: "Door No. 12-667, IB Chowrasta (Bellampalli Chowrasta)",
    city: "Mancherial",
    region: "Telangana",
    postalCode: "504208",
    country: "IN",
  },
  phones: ["+919666890099", "+919177985540"],
  // Primary helpline shown in the header. TODO(confirm)
  helpline: { label: "+91 96668 90099", tel: "+919666890099" },
  emergency: {
    // TODO(user): set NEXT_PUBLIC_EMERGENCY_PHONE. Hidden everywhere until then.
    raw: env.NEXT_PUBLIC_EMERGENCY_PHONE,
    label: env.NEXT_PUBLIC_EMERGENCY_PHONE ?? "Number to be added",
    tel: env.NEXT_PUBLIC_EMERGENCY_PHONE?.replace(/[^+\d]/g, ""),
  },
  /** TODO(user): opening hours, e.g. "Open 24 hours, all days". Hidden while null. */
  hours: null as null | string,
  /** TODO(user): map coordinates. Omitted from JSON-LD while null. */
  geo: null as null | { lat: number; lng: number },
  mapsUrl: "https://maps.app.goo.gl/rLTJ6CxP9Lf471Zs5",
  /** TODO(user): Google Maps → Share → Embed a map → copy the iframe src. */
  mapsEmbedSrc: "" as string,
  /** Used for the map when mapsEmbedSrc is empty: Google finds the pin from the address. */
  mapsQuery: "Dr. Shruthi Goli Birth Roots Hospital, IB Chowrasta, Mancherial, Telangana 504208",
  /** TODO(user): set NEXT_PUBLIC_SITE_URL to the live origin (no trailing slash).
   *  Canonical URLs, the sitemap, social cards and JSON-LD all read it. */
  siteUrl: (env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/+$/, ""),
  social: {
    instagram: "https://www.instagram.com/birthrootshospitals",
    threads: "https://www.threads.com/@birthrootshospitals",
  },
  // Single branch only.
  branch: { name: "Mancherial", slug: "mancherial" },
} as const;

/** One-line postal address, used in the footer, contact block and FAQs. */
export const ADDRESS_LINE = `${BRAND.address.street}, ${BRAND.address.city}, ${BRAND.address.region} ${BRAND.address.postalCode}`;

/** Short address for tight spaces. */
export const ADDRESS_SHORT = `IB Chowrasta, ${BRAND.address.city}, ${BRAND.address.region} ${BRAND.address.postalCode}`;
