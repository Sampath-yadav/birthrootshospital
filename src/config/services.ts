// The six services shown as photo cards on the home page.
// Photos live in /public/services (webp copies of the supplied service-*.png files).
export const SERVICE_CARDS = [
  {
    id: "fertility",
    title: "Fertility & IVF",
    image: "/services/svc-fertility.webp",
    alt: "A newborn baby's feet cradled in a mother's hands",
  },
  {
    id: "maternity",
    title: "Maternity Care",
    image: "/services/svc-maternity.webp",
    alt: "A doctor examining an expecting mother during an antenatal check-up",
  },
  {
    id: "fetal",
    title: "Fetal Medicine",
    image: "/services/svc-fetal.webp",
    alt: "An expecting mother having an ultrasound scan",
  },
  {
    id: "newborn",
    title: "Newborn Care",
    image: "/services/svc-newborn.webp",
    alt: "A mother holding her newborn baby after delivery",
  },
  {
    id: "gynaecology",
    title: "Gynaecology",
    image: "/services/svc-gynaecology.webp",
    alt: "A doctor consulting a mother with her child in the clinic",
  },
  {
    id: "laparoscopy",
    title: "Laparoscopy",
    image: "/services/svc-laparoscopy.webp",
    alt: "A nurse handing a newborn to the mother in the delivery room",
  },
] as const;

export type ServiceCard = (typeof SERVICE_CARDS)[number];
