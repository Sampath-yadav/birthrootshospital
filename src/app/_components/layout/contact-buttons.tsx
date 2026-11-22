import { Phone, Siren } from "lucide-react";

import { Button } from "~/components/ui/button";
import { BRAND } from "~/config/brand";
import { cn } from "~/lib/utils";

export function HelplineButton({ className }: { className?: string }) {
  return (
    <Button asChild variant="helpline" className={cn("gap-2", className)}>
      <a href={`tel:${BRAND.helpline.tel}`}>
        <Phone className="size-4" aria-hidden />
        <span className="font-semibold">Helpline</span>
        <span>{BRAND.helpline.label}</span>
      </a>
    </Button>
  );
}

/** Number comes from NEXT_PUBLIC_EMERGENCY_PHONE; a visible placeholder is shown until it is set. */
export function EmergencyButton({ className }: { className?: string }) {
  const { tel, label } = BRAND.emergency;
  const content = (
    <>
      <Siren className="size-4" aria-hidden />
      <span className="font-semibold">Emergency</span>
      <span>{label}</span>
    </>
  );

  if (!tel) return null; // only show verified contact details

  return (
    <Button asChild variant="emergency" className={cn("gap-2", className)}>
      <a href={`tel:${tel}`}>{content}</a>
    </Button>
  );
}
