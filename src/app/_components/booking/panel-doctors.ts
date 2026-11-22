import { type PanelDoctor } from "~/app/_components/booking/appointment-panel";
import { DOCTORS } from "~/config/doctors";
import { specialityLabel } from "~/config/specialities";

/** Doctors in the plain shape the (client) appointment panel needs. */
export function panelDoctors(): PanelDoctor[] {
  return DOCTORS.map((d) => ({
    slug: d.slug,
    name: d.name,
    specialities: d.specialities.map((id) => ({ id, label: specialityLabel(id) })),
  }));
}
