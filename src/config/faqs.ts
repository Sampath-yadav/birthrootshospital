import { ADDRESS_SHORT, BRAND } from "./brand";

/**
 * TODO(confirm): every answer below needs the hospital's sign-off before launch.
 * `answer` is the single source for both the visible text and the FAQPage JSON-LD,
 * so the two can never disagree. `links` are supplementary navigation.
 */
export type Faq = {
  id: string;
  question: string;
  answer: string;
  links?: { label: string; href: string }[];
};

export const FAQS: Faq[] = [
  {
    id: "where",
    question: "Where is Birth Roots Hospital?",
    answer: `We're at ${ADDRESS_SHORT}. Use Get directions on this page to open the map.`,
    links: [{ label: "Get directions", href: BRAND.mapsUrl }],
  },
  {
    id: "book",
    question: "How do I book an appointment?",
    answer: `Use Book Appointment on this page, or call our helpline on ${BRAND.helpline.label}.`,
    links: [{ label: "Book Appointment", href: "/book" }],
  },
  {
    id: "services",
    question: "Which services do you offer?",
    answer:
      "Maternity and obstetrics, gynaecology, laparoscopy, fertility and IVF, fetal medicine, and newborn and paediatric care.",
    links: [
      { label: "Maternity & Obstetrics", href: "/services/maternity" },
      { label: "Gynaecology", href: "/services/gynaecology" },
      { label: "Laparoscopy", href: "/services/laparoscopy" },
    ],
  },
  {
    id: "ivf",
    question: "Do you offer IVF treatment?",
    answer:
      "Yes. We offer fertility evaluation and IVF/ICSI treatment. Book a consultation to talk through what suits you.",
    links: [{ label: "Fertility & IVF", href: "/fertility-ivf" }],
  },
  {
    id: "fetal",
    question: "Is fetal medicine available?",
    answer:
      "Yes. Fetal medicine is now available at our Mancherial hospital, with detailed fetal evaluation and expert guidance at every important stage.",
  },
  {
    id: "doctors",
    question: "Which doctors will I see?",
    answer:
      "Dr. Shruthi Goli leads our maternity, gynaecology, laparoscopy and fertility care. Dr. Eshwar looks after newborns and children. See all specialists to choose your doctor.",
    links: [{ label: "Our specialists", href: "/specialists" }],
  },
];
