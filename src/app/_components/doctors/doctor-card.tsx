import Image from "next/image";
import Link from "next/link";

import { type Doctor } from "~/config/doctors";
import { isTodo } from "~/lib/todo";

/** "Dr. Shruthi Goli" → "SG" */
export function initials(name: string) {
  return name
    .replace(/^dr\.?\s+/i, "")
    .replace(/\b[a-z]\.\s*/gi, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** Portrait on a pale pink backdrop, or initials until a real photo exists. */
export function DoctorPortrait({
  doctor,
  sizes,
  className,
}: {
  doctor: Doctor;
  sizes: string;
  className?: string;
}) {
  return (
    <div
      className={`from-brand-tint-1 to-brand-soft relative grid place-items-center overflow-hidden bg-gradient-to-b ${className ?? ""}`}
    >
      {doctor.photo ? (
        <Image
          src={doctor.photo}
          alt={`${doctor.name}, ${doctor.role} at Birth Roots Hospital`}
          fill
          sizes={sizes}
          style={{ objectPosition: doctor.photoPosition }}
          className="object-cover"
        />
      ) : (
        // No stock photography: initials until the hospital supplies a real portrait.
        <span
          aria-hidden
          className="font-display text-brand-deep grid size-24 place-items-center rounded-full bg-white/80 text-3xl font-extrabold"
        >
          {initials(doctor.name)}
        </span>
      )}
    </div>
  );
}

/**
 * Photo-led card: the portrait fills it, sinks into a deep plum at the foot, and
 * the name and speciality sit over that in white. The two actions follow underneath.
 */
export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="shadow-soft-pink flex h-full w-full flex-col overflow-hidden rounded-[26px] bg-white">
      <div className="relative">
        <DoctorPortrait
          doctor={doctor}
          sizes="(max-width: 640px) 78vw, 300px"
          className="aspect-[3/4] w-full"
        />

        {/* The photo melts into plum so white type is always legible over it */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3d0b26] from-0% via-[#3d0b26]/60 via-34% to-transparent to-72%"
        />

        <div className="absolute inset-x-0 bottom-0 p-5 text-center">
          <h3 className="font-display text-[1.1rem] leading-tight font-extrabold text-white">
            {/* Covers the photo only — the buttons below stay clickable */}
            <Link
              href={`/specialists/${doctor.slug}`}
              className="rounded-sm outline-offset-4 after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-white"
            >
              {doctor.name}
            </Link>
          </h3>
          <p className="mt-1.5 text-[0.85rem] text-white/90">
            {doctor.department}
          </p>
          {!isTodo(doctor.qualification) && (
            <p className="mt-1 text-[0.74rem] text-white/70">
              {doctor.qualification}
            </p>
          )}
        </div>
      </div>

      <div className="border-line grid grid-cols-2 border-t">
        <Link
          href={`/specialists/${doctor.slug}`}
          className="text-ink hover:bg-brand-tint-1 border-line flex h-12 items-center justify-center border-r text-[0.9rem] font-bold transition-colors"
        >
          View Profile
        </Link>
        <Link
          href={`/book?doctor=${doctor.slug}`}
          className="bg-brand-strong text-ink hover:bg-brand-soft flex h-12 items-center justify-center text-[0.9rem] font-bold transition-colors"
        >
          Book Appointment
        </Link>
      </div>
    </article>
  );
}
