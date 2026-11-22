/**
 * Small transparent illustrations used as page accents (never as hero images).
 * Most are the cleaned stage icons; the emblem is cleaned from
 * /public/six Stages icons/Pink Teal OBGYN Emblem.png.
 */
export const ILLUSTRATIONS = {
  "gynaecology-emblem": "/illustrations/gynaecology-emblem.webp",
  "fertility-twins": "/stages/fertility.webp",
  "newborn-feet": "/stages/newborn.webp",
  pregnancy: "/stages/pregnancy.webp",
  "first-scan": "/stages/first-scan.webp",
  birth: "/stages/birth.webp",
  feeding: "/stages/feeding.webp",
} as const;

export type IllustrationName = keyof typeof ILLUSTRATIONS;
