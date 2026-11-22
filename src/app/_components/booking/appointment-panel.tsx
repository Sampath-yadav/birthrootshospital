"use client";

import {
  CheckCircle2,
  ChevronDown,
  Lock,
  MapPin,
  Stethoscope,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import { Button } from "~/components/ui/button";
import { BRAND } from "~/config/brand";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

export type PanelDoctor = {
  slug: string;
  name: string;
  specialities: { id: string; label: string }[];
};

type Day = { value: string; weekday: string; label: string };
type TimeOfDay = "morning" | "afternoon" | "evening";

const TIMES: { id: TimeOfDay; label: string }[] = [
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
  { id: "evening", label: "Evening" },
];

const DAYS_AHEAD = 7;

/** Local YYYY-MM-DD, built by hand so a late-night visit is not shifted to UTC. */
function isoLocal(d: Date) {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function nextDays(): Day[] {
  const today = new Date();
  return Array.from({ length: DAYS_AHEAD }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    return {
      value: isoLocal(d),
      weekday: i === 0 ? "Today" : d.toLocaleDateString("en-IN", { weekday: "short" }),
      label: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
    };
  });
}

const selectClass =
  "text-ink block w-full min-w-0 cursor-pointer appearance-none truncate bg-transparent text-[15px] leading-snug font-bold outline-none disabled:cursor-not-allowed";

function SelectField({
  icon: Icon,
  label,
  id,
  locked,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  id: string;
  locked?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="border-line focus-within:border-brand-strong flex items-center gap-3 rounded-[15px] border bg-white px-3.5 py-2.5">
      <Icon className="text-charcoal size-5 shrink-0" aria-hidden />
      <div className="min-w-0 flex-1">
        <label htmlFor={id} className="text-charcoal block text-xs leading-tight">
          {label}
        </label>
        {children}
      </div>
      {locked ? (
        <Lock className="text-charcoal size-4 shrink-0" aria-hidden />
      ) : (
        <ChevronDown className="text-ink pointer-events-none size-4 shrink-0" aria-hidden />
      )}
    </div>
  );
}

/**
 * Appointment request panel, shared by /book and each doctor's profile.
 * The hospital has no live slot data, so the visitor proposes a day and a time of day;
 * the team confirms by phone. Nothing here pretends to be a confirmed booking.
 */
export function AppointmentPanel({
  doctors,
  initialDoctor,
  initialSpeciality,
  lockDoctor = false,
}: {
  doctors: PanelDoctor[];
  initialDoctor?: string;
  initialSpeciality?: string;
  lockDoctor?: boolean;
}) {
  const base = useId();
  const id = (n: string) => `${base}-${n}`;

  const first = doctors.find((d) => d.slug === initialDoctor);
  const [doctor, setDoctor] = useState(first?.slug ?? "");
  const [speciality, setSpeciality] = useState(
    initialSpeciality &&
      (first ?? doctors[0])?.specialities.some((s) => s.id === initialSpeciality)
      ? initialSpeciality
      : "",
  );
  // Days depend on the visitor's clock, so they are built after mount (no hydration mismatch).
  const [days, setDays] = useState<Day[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState<TimeOfDay | "">("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const list = nextDays();
    setDays(list);
    setDate(list[0]?.value ?? "");
  }, []);

  const submit = api.appointment.request.useMutation({
    onSuccess: () => setDone(true),
  });

  const current = doctors.find((d) => d.slug === doctor);
  const specialities = useMemo(
    () => (current ? current.specialities : doctors.flatMap((d) => d.specialities)),
    [current, doctors],
  );
  const uniqueSpecialities = specialities.filter(
    (s, i, all) => all.findIndex((x) => x.id === s.id) === i,
  );
  const visibleDoctors = speciality
    ? doctors.filter((d) => d.specialities.some((s) => s.id === speciality))
    : doctors;

  function validate() {
    const e: Record<string, string> = {};
    if (!doctor) e.doctor = "Please choose a doctor.";
    if (!date) e.date = "Please choose a day.";
    if (!time) e.time = "Please choose a time of day.";
    if (name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[6-9]\d{9}$/.test(phone))
      e.phone = "Please enter a 10-digit mobile number starting with 6, 7, 8 or 9.";
    if (!consent) e.consent = "Please tick the box so we may call you back.";
    return e;
  }

  if (done) {
    return (
      <div className="border-line rounded-[28px] border bg-white p-8 text-center sm:p-12">
        <CheckCircle2 className="text-brand-deep mx-auto size-12" aria-hidden />
        <h2 role="status" className="font-display text-ink mt-4 text-2xl font-extrabold">
          Thank you. We&rsquo;ve received your request.
        </h2>
        <p className="text-charcoal mx-auto mt-2 max-w-[44ch]">
          This is a request, not a confirmed slot. Our team will call you on the number you
          gave to confirm the time. In a hurry? Call{" "}
          <a className="text-brand-deep font-bold underline" href={`tel:${BRAND.helpline.tel}`}>
            {BRAND.helpline.label}
          </a>
          .
        </p>
        <Link
          href="/"
          className="text-brand-deep mt-6 inline-block text-[0.95rem] font-bold underline underline-offset-4"
        >
          Back to home
        </Link>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? (
      <p id={id(`${k}-error`)} className="text-brand-deep mt-1.5 text-[0.85rem]">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form
      noValidate
      aria-label="Request an appointment"
      onSubmit={(e) => {
        e.preventDefault();
        const found = validate();
        setErrors(found);
        if (Object.keys(found).length) {
          errorRef.current?.focus();
          return;
        }
        submit.mutate({
          doctor,
          speciality: speciality || undefined,
          date,
          timeOfDay: time as TimeOfDay,
          name: name.trim(),
          phone,
          consent: true,
          website,
        });
      }}
      className="border-line shadow-soft-pink rounded-[28px] border bg-white p-5 sm:p-8"
    >
      <h2 className="font-display text-ink text-xl font-extrabold">Book an appointment</h2>
      <p className="text-charcoal mt-1 text-[0.95rem]">
        Choose a day and a time of day. Our team will call you to confirm the exact time.
      </p>

      <p
        ref={errorRef}
        tabIndex={-1}
        aria-live="polite"
        className={cn("text-brand-deep mt-3 text-[0.9rem] font-bold outline-none", !Object.keys(errors).length && "sr-only")}
      >
        {Object.keys(errors).length ? "Please check the highlighted fields." : ""}
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[270px_1fr]">
        {/* Left: where / what / who */}
        <div className="space-y-3">
          <SelectField icon={MapPin} label="Location" id={id("loc")} locked>
            <select id={id("loc")} className={selectClass} value={BRAND.branch.slug} disabled>
              <option value={BRAND.branch.slug}>{BRAND.branch.name}</option>
            </select>
          </SelectField>

          <SelectField icon={Stethoscope} label="Speciality" id={id("spec")}>
            <select
              id={id("spec")}
              className={selectClass}
              value={speciality}
              onChange={(e) => {
                const v = e.target.value;
                setSpeciality(v);
                // Drop a doctor who no longer matches the speciality.
                if (v && current && !current.specialities.some((s) => s.id === v) && !lockDoctor)
                  setDoctor("");
              }}
            >
              <option value="">Any speciality</option>
              {uniqueSpecialities.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </SelectField>

          <SelectField icon={UserRound} label="Doctor" id={id("doc")} locked={lockDoctor}>
            <select
              id={id("doc")}
              className={selectClass}
              value={doctor}
              disabled={lockDoctor}
              aria-invalid={Boolean(errors.doctor)}
              aria-describedby={errors.doctor ? id("doctor-error") : undefined}
              onChange={(e) => setDoctor(e.target.value)}
            >
              <option value="">Select doctor</option>
              {visibleDoctors.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>
          </SelectField>
          {err("doctor")}
        </div>

        {/* Right: when */}
        <div>
          <fieldset>
            <legend className="text-ink text-[0.95rem] font-bold">Preferred day</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {days.length === 0 && (
                <span className="text-charcoal text-[0.9rem]">Loading days…</span>
              )}
              {days.map((d) => (
                <label key={d.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="day"
                    value={d.value}
                    checked={date === d.value}
                    onChange={() => setDate(d.value)}
                    className="peer sr-only"
                  />
                  <span className="border-line peer-checked:bg-brand-strong peer-checked:border-brand-strong peer-focus-visible:outline-ink hover:border-brand-soft block min-w-[84px] rounded-[14px] border bg-white px-3 py-2 text-center text-[0.85rem] leading-tight font-bold outline-offset-2 peer-focus-visible:outline-2">
                    {d.weekday}
                    <span className="block font-normal">{d.label}</span>
                  </span>
                </label>
              ))}
            </div>
            {err("date")}
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-ink text-[0.95rem] font-bold">Preferred time</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {TIMES.map((t) => (
                <label key={t.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="time"
                    value={t.id}
                    checked={time === t.id}
                    onChange={() => setTime(t.id)}
                    className="peer sr-only"
                  />
                  <span className="border-line peer-checked:bg-brand-strong peer-checked:border-brand-strong peer-focus-visible:outline-ink hover:border-brand-soft block rounded-full border bg-white px-5 py-2 text-[0.9rem] font-bold outline-offset-2 peer-focus-visible:outline-2">
                    {t.label}
                  </span>
                </label>
              ))}
            </div>
            {err("time")}
          </fieldset>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={id("name")} className="text-ink block text-[0.9rem] font-bold">
                Full name
              </label>
              <input
                id={id("name")}
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? id("name-error") : undefined}
                className="border-line text-ink focus:border-brand-strong mt-1.5 h-[50px] w-full rounded-[15px] border bg-white px-4 outline-none"
              />
              {err("name")}
            </div>
            <div>
              <label htmlFor={id("phone")} className="text-ink block text-[0.9rem] font-bold">
                Mobile number
              </label>
              <div className="border-line focus-within:border-brand-strong mt-1.5 flex h-[50px] items-center overflow-hidden rounded-[15px] border bg-white">
                <span className="text-charcoal border-line border-r px-3 text-[0.95rem]">+91</span>
                <input
                  id={id("phone")}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                        .replace(/\D/g, "")
                        .replace(/^(?:0|91)(?=\d{10})/, "")
                        .slice(0, 10),
                    )
                  }
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? id("phone-error") : undefined}
                  className="text-ink h-full min-w-0 flex-1 px-3 outline-none"
                />
              </div>
              {err("phone")}
            </div>
          </div>

          {/* Honeypot */}
          <div aria-hidden className="absolute left-[-9999px] h-0 overflow-hidden">
            <label htmlFor={id("website")}>Website</label>
            <input
              id={id("website")}
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div className="mt-5">
            <div className="flex items-start gap-3 text-[0.9rem]">
              <input
                id={id("consent")}
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? id("consent-error") : undefined}
                className="accent-brand-deep mt-0.5 size-4 shrink-0"
              />
              <label htmlFor={id("consent")} className="text-charcoal">
                I agree to be contacted about my appointment. See our{" "}
                <a
                  href="/privacy"
                  className="text-brand-deep font-bold underline underline-offset-4"
                >
                  privacy policy
                </a>
                .
              </label>
            </div>
            {err("consent")}
          </div>

          {submit.isError && (
            <p role="alert" className="text-brand-deep mt-4 text-[0.9rem]">
              {submit.error.message}
            </p>
          )}

          <Button type="submit" size="lg" className="mt-6" disabled={submit.isPending}>
            {submit.isPending ? "Sending…" : "Request appointment"}
          </Button>
        </div>
      </div>
    </form>
  );
}
