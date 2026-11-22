"use client";

import { CheckCircle2 } from "lucide-react";
import { useId, useRef, useState, type ReactNode } from "react";

import { SPECIALITIES } from "~/config/specialities";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

type Errors = Partial<Record<"name" | "phone" | "message" | "consent", string>>;

const MAX_MESSAGE = 300;

function validate(values: {
  name: string;
  phone: string;
  message: string;
  consent: boolean;
}): Errors {
  const errors: Errors = {};
  const name = values.name.trim();
  if (name.length < 2 || name.length > 60)
    errors.name = "Please enter your name, between 2 and 60 characters.";
  if (!/^[6-9]\d{9}$/.test(values.phone))
    errors.phone =
      "Please enter a 10-digit mobile number starting with 6, 7, 8 or 9.";
  if (values.message.length > MAX_MESSAGE)
    errors.message = `Please keep your message under ${MAX_MESSAGE} characters.`;
  if (!values.consent)
    errors.consent = "Please tick the box so we may call you back.";
  return errors;
}

const fieldClass =
  "border-line text-ink h-[50px] w-full rounded-[15px] border bg-white px-4 outline-none focus:border-brand-strong";

const TIMES = [
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
  { id: "evening", label: "Evening" },
] as const;

export function EnquiryForm({
  showPreferences = false,
  showHeading = true,
  extras,
}: {
  /** Off when the surrounding section already carries the heading. */
  showHeading?: boolean;
  /** Adds "I am enquiring about" and "Best time to call" (used on /contact). */
  showPreferences?: boolean;
  extras?: ReactNode;
} = {}) {
  const base = useId();
  const [values, setValues] = useState({
    name: "",
    phone: "",
    message: "",
    topic: "",
    bestTime: "",
    consent: false,
    website: "", // honeypot
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);
  // Validation reads these, so a fast submit can never use a stale render's values.
  const latest = useRef(values);
  const touchedRef = useRef(touched);

  const submit = api.enquiry.submit.useMutation({
    onSuccess: () => setDone(true),
  });

  const id = (name: string) => `${base}-${name}`;
  const errId = (name: string) => `${base}-${name}-error`;

  const setField = <K extends keyof typeof values>(
    key: K,
    value: (typeof values)[K],
  ) => {
    const next = { ...latest.current, [key]: value };
    latest.current = next;
    setValues(next);
    if (touchedRef.current[key as string]) setErrors(validate(next));
  };

  // Leaving a field only ever shows or clears that field's own error: validating the
  // whole form here would pop messages under fields the visitor has not reached yet
  // (and shift the layout under their cursor).
  const blur = (key: keyof Errors) => {
    touchedRef.current = { ...touchedRef.current, [key]: true };
    setTouched(touchedRef.current);
    const all = validate(latest.current);
    setErrors((prev) => {
      const next = { ...prev };
      if (all[key]) next[key] = all[key];
      else delete next[key];
      return next;
    });
  };

  if (done) {
    return (
      <div className="border-line rounded-[26px] border bg-white p-8 text-center">
        <CheckCircle2 className="text-brand-deep mx-auto size-10" aria-hidden />
        <h3
          className="font-display text-ink mt-3 text-xl font-extrabold"
          // Announce the change for people using a screen reader
          role="status"
        >
          Thank you. We&rsquo;ve received your enquiry.
        </h3>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            latest.current = {
              name: "",
              phone: "",
              message: "",
              topic: "",
              bestTime: "",
              consent: false,
              website: "",
            };
            setValues(latest.current);
            touchedRef.current = {};
            setTouched({});
            setErrors({});
            submit.reset();
          }}
          className="text-brand-deep mt-4 text-[0.95rem] font-bold underline underline-offset-4"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const current = latest.current;
        const found = validate(current);
        setErrors(found);
        touchedRef.current = {
          name: true,
          phone: true,
          message: true,
          consent: true,
        };
        setTouched(touchedRef.current);
        if (Object.keys(found).length > 0) return;
        submit.mutate({
          name: current.name.trim(),
          phone: current.phone,
          message: current.message.trim() || undefined,
          topic: current.topic || undefined,
          bestTime:
            (current.bestTime as "morning" | "afternoon" | "evening") ||
            undefined,
          consent: true,
          website: current.website,
        });
      }}
    >
      {showHeading && (
        <>
          <h3 className="font-display text-ink text-xl font-extrabold">
            Send us an enquiry
          </h3>
          <p className="text-charcoal mt-2 text-[0.95rem]">
            Share your name and number and we&rsquo;ll call you back. Please
            don&rsquo;t include medical details here.
          </p>
        </>
      )}

      <div className="mt-6 space-y-5">
        <div>
          <label
            htmlFor={id("name")}
            className="text-ink block text-[0.9rem] font-bold"
          >
            Full name
          </label>
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
            onBlur={() => blur("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errId("name") : undefined}
            className={cn(
              fieldClass,
              "mt-1.5",
              errors.name && "border-brand-deep",
            )}
          />
          {errors.name && (
            <p id={errId("name")} className="text-brand-deep mt-1 text-[0.85rem]">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={id("phone")}
            className="text-ink block text-[0.9rem] font-bold"
          >
            Mobile number
          </label>
          <div
            className={cn(
              "border-line focus-within:border-brand-strong mt-1.5 flex h-[50px] items-center overflow-hidden rounded-[15px] border bg-white",
              errors.phone && "border-brand-deep",
            )}
          >
            <span className="text-charcoal border-line border-r px-3 text-[0.95rem]">
              +91
            </span>
            <input
              id={id("phone")}
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              value={values.phone}
              onChange={(e) =>
                // Keep digits only, and drop a pasted 0 or 91 country prefix.
                setField(
                  "phone",
                  e.target.value
                    .replace(/\D/g, "")
                    .replace(/^(?:0|91)(?=\d{10})/, "")
                    .slice(0, 10),
                )
              }
              onBlur={() => blur("phone")}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? errId("phone") : undefined}
              className="text-ink h-full min-w-0 flex-1 px-3 outline-none"
            />
          </div>
          {errors.phone && (
            <p
              id={errId("phone")}
              className="text-brand-deep mt-1 text-[0.85rem]"
            >
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={id("message")}
            className="text-ink block text-[0.9rem] font-bold"
          >
            Message{" "}
            <span className="text-charcoal font-normal">(optional)</span>
          </label>
          <textarea
            id={id("message")}
            name="message"
            rows={3}
            maxLength={MAX_MESSAGE}
            value={values.message}
            onChange={(e) => setField("message", e.target.value)}
            onBlur={() => blur("message")}
            className="border-line text-ink focus:border-brand-strong mt-1.5 w-full rounded-[15px] border bg-white p-3 outline-none"
          />
          <p className="text-charcoal mt-1 text-right text-[0.8rem]">
            {values.message.length}/{MAX_MESSAGE}
          </p>
        </div>

        {showPreferences && (
          <>
            <div>
              <label
                htmlFor={id("topic")}
                className="text-ink block text-[0.9rem] font-bold"
              >
                I&rsquo;m enquiring about{" "}
                <span className="text-charcoal font-normal">(optional)</span>
              </label>
              <select
                id={id("topic")}
                value={values.topic}
                onChange={(e) => setField("topic", e.target.value)}
                className={cn(fieldClass, "mt-1.5 cursor-pointer")}
              >
                <option value="">Please choose</option>
                {SPECIALITIES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
                <option value="other">Something else</option>
              </select>
            </div>

            <fieldset>
              <legend className="text-ink text-[0.9rem] font-bold">
                Best time to call{" "}
                <span className="text-charcoal font-normal">(optional)</span>
              </legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {TIMES.map((t) => (
                  <label key={t.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name={id("bestTime")}
                      value={t.id}
                      checked={values.bestTime === t.id}
                      onChange={() => setField("bestTime", t.id)}
                      className="peer sr-only"
                    />
                    <span className="border-line peer-checked:bg-brand-strong peer-checked:border-brand-strong peer-focus-visible:outline-ink block rounded-full border bg-white px-4 py-2 text-[0.9rem] font-bold outline-offset-2 peer-focus-visible:outline-2">
                      {t.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </>
        )}

        {extras}

        {/* Honeypot: hidden from people, irresistible to bots */}
        <div aria-hidden className="absolute left-[-9999px] h-0 overflow-hidden">
          <label htmlFor={id("website")}>Website</label>
          <input
            id={id("website")}
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => setField("website", e.target.value)}
          />
        </div>

        <div>
          {/* The input sits beside the label, not inside it: a link within a label
              swallows clicks aimed at the box itself. */}
          <div className="flex items-start gap-3 text-[0.9rem]">
            <input
              id={id("consent")}
              type="checkbox"
              checked={values.consent}
              onChange={(e) => setField("consent", e.target.checked)}
              onBlur={() => blur("consent")}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? errId("consent") : undefined}
              className="accent-brand-deep mt-0.5 size-4 shrink-0"
            />
            <label htmlFor={id("consent")} className="text-charcoal">
              I agree to be contacted about my enquiry. See our{" "}
              <a
                href="/privacy"
                className="text-brand-deep font-bold underline underline-offset-4"
              >
                privacy policy
              </a>
              .
            </label>
          </div>
          {errors.consent && (
            <p
              id={errId("consent")}
              className="text-brand-deep mt-1 text-[0.85rem]"
            >
              {errors.consent}
            </p>
          )}
        </div>

        {submit.isError && (
          <p role="alert" className="text-brand-deep text-[0.9rem]">
            {submit.error.message}
          </p>
        )}

        <Button type="submit" size="lg" disabled={submit.isPending}>
          {submit.isPending ? "Sending…" : "Send enquiry"}
        </Button>
      </div>

      <p aria-live="polite" className="sr-only">
        {Object.keys(errors).length > 0 && touched.name
          ? "There are problems with the form. Please check the highlighted fields."
          : ""}
      </p>
    </form>
  );
}
