// Verified services only (single branch: Mancherial).
export const SPECIALITIES = [
  { id: "maternity", label: "Maternity & Obstetrics" },
  { id: "gynaecology", label: "Gynaecology" },
  { id: "laparoscopy", label: "Laparoscopy" },
  { id: "fertility", label: "Fertility & IVF" },
  { id: "fetal", label: "Fetal Medicine" },
  { id: "newborn", label: "Newborn & Paediatric Care" },
] as const;

export type SpecialityId = (typeof SPECIALITIES)[number]["id"];

export function specialityLabel(id: SpecialityId): string {
  return SPECIALITIES.find((s) => s.id === id)?.label ?? id;
}
