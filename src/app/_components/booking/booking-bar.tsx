"use client";

import {
  ChevronDown,
  Lock,
  MapPin,
  Stethoscope,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";

import { Button } from "~/components/ui/button";
import { BRAND } from "~/config/brand";
import { DOCTORS } from "~/config/doctors";
import { SPECIALITIES } from "~/config/specialities";

function Field({
  icon: Icon,
  label,
  id,
  children,
  locked,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  id: string;
  children: React.ReactNode;
  locked?: boolean;
}) {
  return (
    <div className="relative flex min-w-0 items-center gap-3 px-4 py-2.5">
      <Icon className="text-charcoal size-6 shrink-0" aria-hidden />
      <div className="min-w-0 flex-1">
        <label
          htmlFor={id}
          className="text-charcoal block text-xs leading-tight"
        >
          {label}
        </label>
        {children}
      </div>
      {locked ? (
        <Lock className="text-charcoal size-4 shrink-0" aria-hidden />
      ) : (
        <ChevronDown
          className="text-ink pointer-events-none size-4 shrink-0"
          aria-hidden
        />
      )}
    </div>
  );
}

const selectClass =
  "text-ink block w-full min-w-0 cursor-pointer appearance-none truncate bg-transparent text-[15px] leading-snug font-bold outline-none disabled:cursor-not-allowed";

/**
 * Booking bar (Fernandez-style): Location (locked to our single branch) | Speciality | Doctor | Book.
 * Lives under the hero text and never animates with the slides.
 */
export function BookingBar() {
  const base = useId();
  const [speciality, setSpeciality] = useState("");
  const [doctor, setDoctor] = useState("");

  const doctors = DOCTORS.filter(
    (d) => !speciality || d.specialities.some((s) => s === speciality),
  );

  const params = new URLSearchParams();
  if (speciality) params.set("speciality", speciality);
  if (doctor) params.set("doctor", doctor);
  const href = `/book${params.size ? `?${params.toString()}` : ""}`;

  return (
    <form
      aria-label="Book a consultation"
      onSubmit={(e) => e.preventDefault()}
      className="border-brand-soft mx-auto grid w-full max-w-[980px] gap-1 rounded-2xl border bg-white p-2 shadow-[0_16px_40px_-20px_rgba(30,26,25,0.35)] md:grid-cols-[1fr_1fr_1fr_auto] md:items-center"
    >
      <Field icon={MapPin} label="Location" id={`${base}-loc`} locked>
        <select
          id={`${base}-loc`}
          className={selectClass}
          value={BRAND.branch.slug}
          disabled
          aria-label="Location (our only branch)"
        >
          <option value={BRAND.branch.slug}>{BRAND.branch.name}</option>
        </select>
      </Field>

      <Field icon={Stethoscope} label="Select Speciality" id={`${base}-spec`}>
        <select
          id={`${base}-spec`}
          className={selectClass}
          value={speciality}
          onChange={(e) => {
            setSpeciality(e.target.value);
            setDoctor("");
          }}
        >
          <option value="">Select Speciality</option>
          {SPECIALITIES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </Field>

      <Field icon={UserRound} label="Select Doctor" id={`${base}-doc`}>
        <select
          id={`${base}-doc`}
          className={selectClass}
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
        >
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </Field>

      <Button asChild size="lg" className="h-14 rounded-xl px-8 md:ml-1">
        <Link href={href}>Book Consultation</Link>
      </Button>
    </form>
  );
}
