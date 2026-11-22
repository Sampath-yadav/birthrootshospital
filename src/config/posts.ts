/**
 * Health tips shown on the home page.
 * TODO(user): every article must be written or reviewed by a doctor before publishing,
 * and carry a "last reviewed" date plus the general-information note on its own page.
 */
export type Post = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readMinutes: number;
  /** Real cover photo. While unset, a pink gradient with a small illustration is used. */
  cover?: string;
  /** Illustration used in the placeholder cover. */
  illustration: string;
};

export const POSTS: Post[] = [
  {
    slug: "ivf-myths-and-facts",
    cover: "/blog/ivf-myths-and-facts.webp",
    title: "IVF myths and facts, explained simply",
    summary: "Clear answers to the questions couples ask most.",
    category: "Fertility",
    readMinutes: 4,
    illustration: "/stages/fertility.webp",
  },
  {
    slug: "what-to-expect-fetal-medicine-scan",
    cover: "/blog/what-to-expect-fetal-medicine-scan.webp",
    title: "What to expect at your fetal medicine scan",
    summary: "How the scan works and how to prepare for it.",
    category: "Fetal Medicine",
    readMinutes: 3,
    illustration: "/stages/first-scan.webp",
  },
  {
    slug: "newborn-jaundice-what-parents-should-know",
    cover: "/blog/newborn-jaundice-what-parents-should-know.webp",
    title: "Newborn jaundice: what parents should know",
    summary: "Signs to watch for and when to call your doctor.",
    category: "Newborn care",
    readMinutes: 4,
    illustration: "/stages/newborn.webp",
  },
];
