import { type SpecialityId } from "./specialities";

export type Doctor = {
  /** Used by the booking bar query string. */
  id: string;
  /** Used by /specialists/<slug>. */
  slug: string;
  name: string;
  qualification: string;
  role: string;
  /** Short department line shown on the profile header. */
  department: string;
  specialities: SpecialityId[];
  /** Real hospital photo only. While unset, the card shows the doctor's initials. */
  photo?: string;
  /** CSS object-position for the portrait crop. */
  photoPosition?: string;
  /** Paragraphs for "About". Only facts the hospital has confirmed. */
  about: string[];
  /** Only shown once confirmed. */
  registration?: string;
};

// TODO(user): add the other consultants (full names, qualifications, photos).
export const DOCTORS: Doctor[] = [
  {
    id: "shruthi-goli",
    slug: "dr-shruthi-goli",
    name: "Dr. Shruthi Goli",
    qualification: "MBBS, DNB / MS OBG",
    role: "Gynaecologist, laparoscopy and infertility specialist",
    department: "Obstetrics & Gynaecology",
    specialities: ["maternity", "gynaecology", "laparoscopy", "fertility"],
    photo: "/doctors/shruthi-goli.webp",
    photoPosition: "50% 20%",
    about: [
      "Dr. Shruthi Goli founded Birth Roots Hospital in Mancherial and leads its maternity, gynaecology, laparoscopy and fertility care.",
      "Families come to her for pregnancy care and delivery, women's surgery including laparoscopy, and infertility evaluation and treatment, including IVF and ICSI.",
    ],
    // TODO(confirm): the Instagram bio shows "Reg.No.76318" — confirm whose it is
    // and whether it should be published before filling this in.
    registration: undefined,
  },
  {
    id: "eshwar",
    slug: "dr-eshwar",
    // Read from the nameplate in the supplied photo ("Dr.B. Eshwar, MBBS.DCH.(NBE)").
    // TODO(confirm): full name and the exact wording of the qualification.
    name: "Dr. B. Eshwar",
    qualification: "MBBS, DCH (NBE)",
    role: "Paediatrician",
    department: "Newborn & Paediatric Care",
    specialities: ["newborn"],
    photo: "/doctors/eshwar.webp",
    photoPosition: "50% 35%",
    about: [
      "Dr. Eshwar looks after newborns and children at Birth Roots Hospital, working alongside the maternity team so babies are cared for from their first hours.",
    ],
  },
];

export function findDoctor(idOrSlug: string | undefined): Doctor | undefined {
  if (!idOrSlug) return undefined;
  return DOCTORS.find((d) => d.slug === idOrSlug || d.id === idOrSlug);
}
