// The six stages of care, in journey order. Icons live in /public/stages (cleaned copies of
// /public/six Stages icons). "Pink Teal OBGYN Emblem.png" is not used.
export const STAGES = [
  { id: "fertility", label: "Fertility", icon: "/stages/fertility.webp" },
  { id: "pregnancy", label: "Pregnancy", icon: "/stages/pregnancy.webp" },
  { id: "first-scan", label: "First Scan", icon: "/stages/first-scan.webp" },
  { id: "birth", label: "Birth", icon: "/stages/birth.webp" },
  { id: "newborn", label: "Newborn Care", icon: "/stages/newborn.webp" },
  { id: "feeding", label: "Feeding", icon: "/stages/feeding.webp" },
] as const;
