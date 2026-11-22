"use client";

import { useState } from "react";

import { cn } from "~/lib/utils";

const OPTIONS = [
  { code: "en", label: "EN", full: "English" },
  { code: "te", label: "తెలుగు", full: "Telugu" },
] as const;

/** UI-only segmented control. TODO: wire to real i18n when it exists. */
export function LanguageToggle({ className }: { className?: string }) {
  const [lang, setLang] = useState<(typeof OPTIONS)[number]["code"]>("en");

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "border-brand-soft inline-flex h-10 shrink-0 items-center rounded-full border bg-white p-0.5",
        className,
      )}
    >
      {OPTIONS.map((o) => {
        const active = lang === o.code;
        return (
          <button
            key={o.code}
            type="button"
            lang={o.code}
            aria-pressed={active}
            aria-label={o.full}
            onClick={() => setLang(o.code)}
            className={cn(
              "h-7 rounded-full px-2.5 text-xs font-bold transition-colors",
              active
                ? "bg-brand-strong text-ink"
                : "text-charcoal hover:bg-brand-tint-1",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
