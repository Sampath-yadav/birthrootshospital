/**
 * Real Google reviews, copied verbatim (only a doubled space was collapsed).
 * Never edit the wording or the star counts, and never add review/rating schema
 * markup for these — Google does not show stars for a business's own reviews.
 *
 * TODO(user): showing a hand-picked set of reviews needs each patient's consent, and
 * India's medical-advertising and testimonial rules apply. Have this section reviewed
 * before launch. The safer long-term route is the Google Places API with its attribution.
 */
export type Review = {
  id: string;
  name: string;
  text: string;
  /** true when Google showed "… More" */
  truncated: boolean;
  topic: "Delivery" | "C-section" | "Pregnancy care" | "Hospital care";
  /** TODO(user): read the stars on Google. Stars stay hidden while this is null. */
  rating: 1 | 2 | 3 | 4 | 5 | null;
};

/** TODO(confirm): verify the live rating and count on the day of launch. */
export const GOOGLE = {
  rating: 4.7,
  count: 517,
  url: "https://maps.app.goo.gl/rLTJ6CxP9Lf471Zs5",
};

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Siva Chandra",
    topic: "Delivery",
    truncated: true,
    rating: null,
    text: "We recently had an incredibly positive experience at Birth-roots during my wife’s pregnancy and delivery. From the very beginning, the level of care and professionalism shown by the entire team was exceptional.",
  },
  {
    id: "r2",
    name: "SOMNATH SOMU",
    topic: "Hospital care",
    truncated: true,
    rating: null,
    text: "We had a truly wonderful experience at Birthroots Hospitals. Dr. Shruthi Goli and Dr. Eshwar Sir provided exceptional, compassionate care that made us feel completely safe and valued.",
  },
  {
    id: "r3",
    name: "Saishma Bhandari",
    topic: "Delivery",
    truncated: true,
    rating: null,
    text: "I am very thankful to the hospital and the entire medical team for their excellent care and support during my delivery. The doctors and nurses handled my normal delivery very well and took special care of my premature baby.",
  },
  {
    id: "r4",
    name: "koti sidhireddy",
    topic: "Delivery",
    truncated: false,
    rating: null,
    text: "My wife was admitted to Shruthi Goli Hospital for delivery. We had a wonderful experience — the housekeeping and nursing staff were very kind and caring. Dr. Shruthi ma’am gave us outstanding support throughout the delivery and treated us like family. We are truly thankful and highly recommend this hospital to everyone!",
  },
  {
    id: "r5",
    name: "pooja pooja k",
    topic: "Delivery",
    truncated: true,
    rating: null,
    text: "We recently had our baby delivered here, and the experience was exceptional. Dr. Shruthi Garu and the hospital staff managed everything perfectly from start to finish.",
  },
  {
    id: "r6",
    name: "Vinod Puli",
    topic: "Delivery",
    truncated: true,
    rating: null,
    text: "We had a very good experience at Birth Roots Hospital. The doctors, nurses, and staff were very caring and supportive throughout the delivery journey.",
  },
  {
    id: "r7",
    name: "JYOTHSNA MADE",
    topic: "C-section",
    truncated: true,
    rating: null,
    text: "Hi myself Jyoshna had C-section surgery at Birthroots Hospital,under Dr. Shruthi goli. The doctor was very experienced and explained everything clearly before the procedure. The surgery went smoothly and the treatment was excellent.",
  },
  {
    id: "r8",
    name: "Srinivas Reddy",
    topic: "Pregnancy care",
    truncated: true,
    rating: null,
    text: "We had a very good experience with the maternity services at Shruthi Goli Hospital. The doctors were highly professional, caring, and explained everything clearly at every stage.",
  },
  {
    id: "r9",
    name: "karthik anaparthi",
    topic: "Delivery",
    truncated: true,
    rating: null,
    text: "Welcoming our baby into the world on 13th May 2026 was a beautiful experience, and this hospital played a huge part in it. From admission to discharge, every staff member treated us with kindness, respect, and genuine care.",
  },
  {
    id: "r10",
    name: "sri nivas",
    topic: "Delivery",
    truncated: true,
    rating: null,
    text: "We had an excellent experience for my wife’s delivery. A huge thank you to Dr. Sruthi Goli for handling the surgery so professionally and making us feel completely at ease throughout the process.",
  },
  {
    id: "r11",
    name: "Sujith Kumar",
    topic: "Pregnancy care",
    truncated: true,
    rating: null,
    text: "We’re extremely grateful to Birthroots Hospital for making our journey to parenthood such a smooth and memorable one. From our very first consultation till the delivery of our baby, the entire team provided exceptional care and support.",
  },
  {
    id: "r12",
    name: "prudhvi raj",
    topic: "Hospital care",
    truncated: false,
    rating: null,
    text: "Very good hospital with clean and hygienic facilities. The staff are supportive, polite, and caring. The doctor was very helpful, approachable, and always available when needed. Overall, a very positive experience.",
  },
];
