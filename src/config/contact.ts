import { ADDRESS_SHORT, BRAND } from "./brand";
import { type Faq } from "./faqs";

/**
 * Everything on the Reach Us page comes from BRAND, so the address and numbers here,
 * on the Google Business Profile and on every directory stay identical.
 */
export const CONTACT = {
  appointments: {
    label: "Appointments",
    value: BRAND.helpline.label,
    href: `tel:${BRAND.helpline.tel}`,
    note: "Call to book or reschedule.",
  },

  /** Shown only when NEXT_PUBLIC_EMERGENCY_PHONE is set. Never invent a number. */
  emergency: BRAND.emergency.tel
    ? {
        label: "Emergency",
        value: BRAND.emergency.label,
        href: `tel:${BRAND.emergency.tel}`,
        note: "For urgent help, call this number.",
      }
    : null,

  /** TODO(user): a monitored email address. */
  email: undefined as undefined | string,

  /** TODO(confirm): only if the hospital uses WhatsApp for patients. */
  whatsapp: undefined as undefined | { display: string; href: string },

  /** TODO(user): opening hours, set in BRAND.hours. */
  hours: BRAND.hours,

  /** TODO(confirm): listings say near Anjeneya Prasad Hospital. Verify before showing. */
  landmark: undefined as undefined | string,

  /** TODO(user): distance from the railway station and bus stand, parking, and so on. */
  howToReach: [] as string[],

  quickFaqs: [
    {
      id: "book",
      question: "How do I book an appointment?",
      answer:
        "Use Book Appointment on this site, or call our helpline. We will call you back to confirm the time.",
    },
    {
      id: "where",
      // TODO(confirm): the address, against the Google Business Profile.
      question: "Where exactly is the hospital?",
      answer: `Birth Roots Hospital is at ${ADDRESS_SHORT}. Use Get directions to open the map.`,
    },
    // TODO(user): visiting hours. The question stays hidden until BRAND.hours is set.
    ...(BRAND.hours
      ? [
          {
            id: "hours",
            question: "What are your visiting hours?",
            answer: BRAND.hours,
          },
        ]
      : []),
  ] as Faq[],
};
