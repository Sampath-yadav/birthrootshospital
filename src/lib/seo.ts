import { type Metadata } from "next";

import { BRAND } from "~/config/brand";

/**
 * One place for page metadata, so every page gets a canonical URL and a social card
 * without repeating itself. Until NEXT_PUBLIC_SITE_URL is set, canonical URLs are
 * relative and metadataBase is omitted (Next then falls back to the request origin).
 */

export const SITE_NAME = "Birth Roots Hospital";
export const LOCALE = "en_IN";

/** Absolute URL when the live origin is known, otherwise the path itself. */
export function url(path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return BRAND.siteUrl ? `${BRAND.siteUrl}${clean}` : clean;
}

export const metadataBase = BRAND.siteUrl
  ? new URL(BRAND.siteUrl)
  : undefined;

/** Share card used by WhatsApp, Facebook, X and Google's preview. */
// TODO(user): replace /public/og.jpg with a real hospital photo card when you have one.
const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME}, Mancherial`,
};

export function pageMeta({
  title,
  description,
  path,
  images,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  images?: { url: string; width: number; height: number; alt: string }[];
  /** true keeps the title exactly as given, without the "| Birth Roots Hospital" suffix. */
  absoluteTitle?: boolean;
}): Metadata {
  const canonical = url(path);
  const image = images ?? [OG_IMAGE];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: LOCALE,
      url: canonical,
      title,
      description,
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image.map((i) => i.url),
    },
  };
}

/**
 * Inner pages state their whole title themselves, so the layout's
 * "| Birth Roots Hospital" template is not appended twice.
 */
export function buildMetadata(args: {
  title: string;
  description: string;
  path: string;
  images?: { url: string; width: number; height: number; alt: string }[];
}): Metadata {
  return pageMeta({ ...args, absoluteTitle: true });
}

/** Minimal BreadcrumbList for inner pages. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: url(step.path),
    })),
  };
}
