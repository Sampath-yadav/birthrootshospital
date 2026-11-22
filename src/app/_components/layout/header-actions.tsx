"use client";

import { Phone, Search, Siren, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { BRAND } from "~/config/brand";
import { cn } from "~/lib/utils";
import { HeaderSearch } from "./header-search";
import { LanguageToggle } from "./language-toggle";

const iconBtn =
  "inline-flex h-10 min-w-10 items-center justify-center gap-2 rounded-full px-2.5 text-sm font-bold text-[color:var(--header-fg)] transition-colors hover:bg-white/60";

/** Minimal right-hand actions: search, helpline, emergency, language. Labels only appear on very wide screens. */
export function HeaderActions() {
  const [searchOpen, setSearchOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const { tel, label } = BRAND.emergency;

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setSearchOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  return (
    <div ref={wrap} className="relative flex items-center gap-0.5">
      <button
        type="button"
        className={iconBtn}
        aria-label={searchOpen ? "Close search" : "Search doctor or speciality"}
        aria-expanded={searchOpen}
        onClick={() => setSearchOpen((o) => !o)}
      >
        {searchOpen ? (
          <X className="size-5" aria-hidden />
        ) : (
          <Search className="size-5" aria-hidden />
        )}
      </button>

      <a
        href={`tel:${BRAND.helpline.tel}`}
        className={iconBtn}
        aria-label={`Helpline ${BRAND.helpline.label}`}
      >
        <Phone className="size-5" aria-hidden />
        <span className="hidden min-[1440px]:inline">
          {BRAND.helpline.label}
        </span>
      </a>

      {tel && (
        <a
          href={`tel:${tel}`}
          className={cn(iconBtn, "text-brand-deep")}
          aria-label={`Emergency ${label}`}
        >
          <Siren className="size-5" aria-hidden />
          <span className="hidden 2xl:inline">{label}</span>
        </a>
      )}

      <LanguageToggle className="ml-1 h-9" />

      {searchOpen && (
        <div className="border-brand-soft absolute top-full right-0 z-50 mt-3 w-[min(24rem,90vw)] rounded-lg border bg-white p-3 shadow-[0_12px_32px_-8px_rgba(30,26,25,0.18)]">
          <HeaderSearch />
        </div>
      )}
    </div>
  );
}
