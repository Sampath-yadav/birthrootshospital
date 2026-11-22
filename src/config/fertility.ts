import { type Faq } from "./faqs";

/**
 * Fertility & IVF page content.
 *
 * COMPLIANCE — read before editing:
 * - No success rates, no "best" or "only", no guarantees, no comparisons.
 * - No mention of sex selection, donor gametes or surrogacy.
 * - No patient or baby photos, and no testimonials, without written consent.
 * - India's ART (Regulation) Act, 2021 governs fertility clinics and their advertising.
 *   TODO(user): your legal or compliance advisor must confirm which registration number,
 *   notices and wording must appear here. The registration line stays hidden until then.
 * - Every medical sentence below is a TODO(doctor review) draft in plain language.
 */
export const FERTILITY = {
  intro:
    "Understand your options and get a plan built around you, with an infertility specialist.",

  // TODO(doctor review)
  whenToSeek: [
    "You have been trying to conceive for a year (six months if you are over 35).",
    "Your periods are irregular or have stopped.",
    "You have had pregnancy losses.",
    "You or your partner have a condition that may affect fertility.",
  ],

  // A real sequence, so these steps are numbered.
  steps: [
    {
      title: "Consultation",
      body: "We listen to your history and answer your questions.",
    },
    {
      title: "Evaluation",
      body: "Simple tests to understand what may be affecting fertility.",
    },
    {
      title: "Your plan",
      body: "We explain your options and agree a plan with you.",
    },
    {
      title: "Treatment",
      body: "Treatment such as IVF or ICSI, if it is right for you.",
    },
    {
      title: "Follow-up",
      body: "We stay in touch and support you after treatment.",
    },
  ],

  // Only treatments the hospital states publicly. TODO(confirm) before adding any other.
  treatments: [
    {
      name: "Fertility evaluation",
      body: "Tests and a consultation to find out what may be affecting your fertility.",
    },
    {
      name: "IVF",
      body: "Eggs and sperm are brought together in the lab, and an embryo is placed in the womb.",
    },
    {
      name: "ICSI",
      body: "As part of IVF, a single sperm is placed directly into an egg in the lab.",
    },
  ],

  /**
   * TODO(confirm): the hospital's Instagram promotes "needle-free injection technology"
   * for IVF. Fill this in only after the hospital confirms what it is and where it applies.
   * Do not describe how it works beyond what they supply.
   */
  needleFree: null as null | { title: string; body: string },

  // TODO(confirm): echoes what patients say; the hospital must agree each is true.
  expect: [
    {
      icon: "UserRound",
      title: "A specialist leads your care",
      body: "Your consultations are with an infertility specialist.",
    },
    {
      icon: "MessageCircle",
      title: "Clear explanations",
      body: "We explain each step in plain language.",
    },
    {
      icon: "ClipboardList",
      title: "A plan that fits you",
      body: "Your options are discussed with you, not decided for you.",
    },
    {
      icon: "HeartHandshake",
      title: "Support from the first visit",
      body: "Questions are welcome at every stage.",
    },
  ] as { icon: string; title: string; body: string }[],

  /** TODO(confirm): ART registration, only if applicable. */
  registration: undefined as undefined | { label: string; value: string },
  /** TODO(user): e.g. "Dr. Shruthi Goli" */
  reviewedBy: undefined as undefined | string,
  /** TODO(user): ISO date, e.g. "2026-12-01" */
  lastReviewed: undefined as undefined | string,

  // TODO(doctor review). No prices, no success rates, no guarantees.
  faqs: [
    {
      id: "need",
      question: "How do I know if I need IVF?",
      answer:
        "Not everyone who struggles to conceive needs IVF. A consultation and a few tests help your doctor explain which options suit you.",
    },
    {
      id: "pain",
      question: "Is IVF painful?",
      answer:
        "Most people feel discomfort rather than severe pain. Your team explains each step beforehand and discusses ways to keep you comfortable.",
    },
    {
      id: "follicles",
      question: "If my scan shows 10 follicles, will I get 10 eggs?",
      answer:
        "Not always. The number of follicles on a scan is an estimate, and not every follicle holds a mature egg. Your doctor will explain what your scan means for you.",
    },
    {
      id: "diff",
      question: "What is the difference between IVF and ICSI?",
      answer:
        "In IVF, eggs and sperm are brought together in a dish. In ICSI, a single sperm is placed directly into an egg. Your doctor advises which suits your situation.",
    },
    {
      id: "time",
      question: "How long does one IVF cycle take?",
      answer:
        "A cycle usually takes a few weeks from the start of medicines to embryo transfer. Your doctor will give you a timeline for your own plan.",
    },
    {
      id: "cost",
      question: "What does IVF cost?",
      answer:
        "The cost depends on your plan and the tests and medicines you need. Book a consultation to get an estimate for your situation.",
    },
    {
      id: "both",
      question: "Do both partners need to come to the first visit?",
      answer:
        "It helps if both can come, but you can start with one of you and bring the other later.",
    },
    {
      id: "where",
      question: "Do you offer fertility treatment in Mancherial?",
      answer:
        "Yes. Birth Roots Hospital in Mancherial offers fertility evaluation and IVF/ICSI treatment, led by Dr. Shruthi Goli.",
    },
  ] as Faq[],
};
