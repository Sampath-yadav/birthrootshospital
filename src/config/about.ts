/**
 * About page content. Only the first story paragraph is a confirmed fact; everything
 * else waits for the hospital. Nothing here may be invented, and every empty field
 * hides its section in production.
 */
export const ABOUT = {
  intro:
    "A women's health, maternity and fertility hospital in Mancherial, Telangana, led by Dr. Shruthi Goli.",

  story: [
    "Birth Roots is a women's health, maternity and fertility hospital in Mancherial, Telangana. It is led by Dr. Shruthi Goli, a gynaecologist, laparoscopy specialist and infertility specialist.",
    // TODO(user): two or three sentences in your own words — why the hospital began and
    // what has changed since. Add the founding year and milestones only if you supply them.
  ] as string[],

  /** Portrait crop of the building, faded into the About page header. */
  heroPhoto: "/hospital/front-portrait.webp",
  /** Landscape crop of the same photo, beside "Our story". */
  photo: "/hospital/front.webp" as string | undefined,
  photoAlt: "Birth Roots Hospital, Mancherial",

  /** TODO(user). Suggested draft to approve: "To give every woman and family safe, respectful and personal care." */
  mission: undefined as string | undefined,
  /** TODO(user). Suggested draft to approve: "To be the hospital families in Mancherial trust at every stage of life." */
  vision: undefined as string | undefined,

  /** TODO(user): two or three sentences about Dr. Shruthi Goli. */
  leadBio: [] as string[],

  // TODO(confirm): these echo what patients write in reviews; the hospital must agree each is true.
  values: [
    {
      icon: "MessageCircle",
      title: "Clear explanations",
      body: "We explain every step before it happens.",
    },
    {
      icon: "HeartHandshake",
      title: "Kind, attentive staff",
      body: "Nurses and support staff who treat you like family.",
    },
    {
      icon: "ShieldCheck",
      title: "A clean, safe hospital",
      body: "Hygiene and safety come first.",
    },
    {
      icon: "Route",
      title: "Care from first visit to delivery",
      body: "One team beside you through your pregnancy.",
    },
  ] as { icon: string; title: string; body: string }[],

  /**
   * Real hospital photos only. TODO(user): add rooms, theatre and the nursery to
   * these three when you have photos of them.
   */
  gallery: [
    {
      src: "/hospital/front.webp",
      alt: "The front of Birth Roots Hospital, with the entrance and reception behind the glass",
    },
    {
      src: "/hospital/waiting-room.webp",
      alt: "Families waiting in the reception area at Birth Roots Hospital",
    },
    {
      src: "/hospital/corridor.webp",
      alt: "A bright corridor on a patient floor at Birth Roots Hospital",
    },
  ] as { src: string; alt: string }[],

  /** TODO(user): hospital registration, ART registration if applicable, accreditation. Hidden while empty. */
  registrations: [] as { label: string; value: string }[],
};
