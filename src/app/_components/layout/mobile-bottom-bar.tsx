import { CalendarCheck, Phone } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { BRAND } from "~/config/brand";
import { BOOK_HREF } from "~/config/navigation";

/** Fixed bottom bar, mobile/tablet only. The spacer keeps it from covering page content. */
export function MobileBottomBar() {
  return (
    <>
      <div
        aria-hidden
        className="h-[calc(4.5rem+env(safe-area-inset-bottom))] min-[1360px]:hidden"
      />
      <div className="border-brand-soft fixed inset-x-0 bottom-0 z-40 border-t bg-white px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] min-[1360px]:hidden">
        <div className="mx-auto grid max-w-xl grid-cols-2 gap-2">
          <Button asChild variant="helpline" size="lg">
            <a href={`tel:${BRAND.helpline.tel}`}>
              <Phone className="size-5" aria-hidden />
              Call
            </a>
          </Button>
          <Button asChild size="lg">
            <Link href={BOOK_HREF}>
              <CalendarCheck className="size-5" aria-hidden />
              Book Appointment
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
