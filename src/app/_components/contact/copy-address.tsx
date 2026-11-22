"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";

/** Copies the address, with a fallback for browsers without the clipboard API. */
export function CopyAddress({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(address);
      } else {
        const field = document.createElement("textarea");
        field.value = address;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.left = "-9999px";
        document.body.appendChild(field);
        field.select();
        document.execCommand("copy");
        document.body.removeChild(field);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button variant="outline" size="lg" onClick={copy} type="button">
      {copied ? (
        <Check className="size-5" aria-hidden />
      ) : (
        <Copy className="size-5" aria-hidden />
      )}
      {copied ? "Address copied" : "Copy address"}
      <span aria-live="polite" className="sr-only">
        {copied ? "Address copied to the clipboard" : ""}
      </span>
    </Button>
  );
}
