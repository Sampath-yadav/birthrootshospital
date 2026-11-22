"use client";

import { Search } from "lucide-react";
import { useId } from "react";

import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

/** UI only. */
export function HeaderSearch({ className }: { className?: string }) {
  const id = useId();

  return (
    <form
      role="search"
      className={cn("relative w-full", className)}
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: wire to tRPC doctor/specialty search
      }}
    >
      <label htmlFor={id} className="sr-only">
        Search doctor or speciality
      </label>
      <Input
        id={id}
        type="search"
        name="q"
        autoComplete="off"
        placeholder="Search doctor, speciality"
        className="pr-12"
      />
      <button
        type="submit"
        aria-label="Search"
        className="bg-brand-strong text-ink hover:bg-brand-soft absolute top-1 right-1 inline-flex size-8 items-center justify-center rounded-full transition-colors"
      >
        <Search className="size-4" aria-hidden />
      </button>
    </form>
  );
}
