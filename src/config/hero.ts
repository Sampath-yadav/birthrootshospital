// All copy below is placeholder: TODO(confirm) with the hospital.

export const HERO_MOTION = {
  ease: {
    exit: [0.65, 0, 0.35, 1], // text leaving upward
    enter: [0.16, 1, 0.3, 1], // text/cards rising in (fast start, soft landing)
    panel: [0.76, 0, 0.24, 1], // panel rising, and the push transition
  },
  duration: {
    // seconds
    textExit: 0.38,
    textEnter: 0.45,
    cardEnter: 0.4,
    panelRise: 0.55,
    push: 0.6,
  },
  stagger: { lines: 0.05, cards: 0.07, panelContent: 0.07 },
  from: { blurPx: 10, textOffsetY: 48, cardOffsetY: 64 },
  // How long each scene is held, in ms (readable real-site values).
  dwellMs: { intro: 2000, statement: 2000, cards: 2000, panel: 2000 },
} as const;

export const HERO_SLIDES = {
  intro: {
    // H1 for SEO: service + place
    headline: ["Trusted Maternity & IVF", "Care in Mancherial"],
    sub: "Birth Roots Women Hospital, led by Dr. Shruthi Goli",
  },
  statement: {
    lines: [
      "Gynaecologist, obstetrician",
      "and IVF specialist",
      "Dr. Shruthi Goli leads our team",
    ],
    credentials: "MBBS · DNB / MS OBG · Laparoscopy & IVF",
  },
  servicesTitle: "Our services",
  services: [
    { title: "Maternity", href: "/services/maternity" },
    { title: "Gynaecology", href: "/services/gynaecology" },
    { title: "Laparoscopy", href: "/services/laparoscopy" },
    { title: "Fertility & IVF", href: "/fertility-ivf" },
  ],
  panel: {
    title: "Visit us in Mancherial",
    body: [
      "50-bed women's hospital, open daily with 24/7 emergency and maternity services",
      "Door No. 12-667, IB Chowrasta (Bellampalli Chowrasta), Mancherial, Telangana 504208",
    ],
  },
} as const;

export const HERO_SCENE_COUNT = 4;

/**
 * Per-scene background images, cross-faded behind the stage (and behind the transparent header).
 * Drop files into /public/hero and set the paths here, e.g. "/hero/bg-1.jpg". null = plain tint.
 * TODO(confirm): images to be supplied by the client.
 */
export const HERO_BACKGROUNDS: (string | null)[] = [
  encodeURI("/hero/Indian maternity-hospital.png"), // 1 intro: family with newborn
  "/hero/gynecology-obstetrics-consultation.jpg", // 2 statement: consultation + scan
  "/hero/maternity-care.png", // 3 care areas: family with newborn
  "/hero/mother-and-baby.png", // 4 visit us
];

export type HeroAssets = {
  visual: { src: string; width: number; height: number } | null;
};
