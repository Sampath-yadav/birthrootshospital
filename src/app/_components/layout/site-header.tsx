"use client";

import { Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import { BRAND } from "~/config/brand";
import { BOOK_HREF } from "~/config/navigation";
import { cn } from "~/lib/utils";
import { MainNav } from "./main-nav";
import { MobileDrawer } from "./mobile-drawer";
import { SiteLogo } from "./site-logo";
import { HeaderActions } from "./header-actions";

/** Any scroll beyond this many px turns the header solid white. */
const SOLID_AFTER = 4;

/**
 * Header states
 * - Home, at the very top (no scroll yet): TRANSPARENT, overlays the hero (header is position: fixed).
 * - Home, as soon as the page scrolls, and every other route: solid WHITE.
 * The header is always `fixed`; a spacer keeps non-home pages from sliding under it.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  // Home only: transparent until the page has been scrolled at all; back to transparent at the top.
  useEffect(() => {
    if (!isHome) {
      setScrolled(false);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > SOLID_AFTER);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isHome, pathname]);

  const solid = !isHome || scrolled;

  return (
    <>
      <header
        data-solid={solid}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-200 ease-out",
          solid
            ? "border-brand-soft bg-white shadow-[0_1px_8px_rgba(30,26,25,0.06)]"
            : "border-transparent bg-white/0 shadow-none",
        )}
      >
        <div className="site-container">
          {/* Desktop: one minimal row. Logo | nav | actions | Book */}
          <div className="hidden h-[var(--header-main)] items-center gap-2 min-[1360px]:flex">
            <SiteLogo className="h-12 w-[9rem]" />
            <MainNav />
            <HeaderActions />
            <Button asChild className="shrink-0 ring-2 ring-white">
              <Link href={BOOK_HREF}>Book Appointment</Link>
            </Button>
          </div>

          {/* Mobile / tablet bar */}
          <div className="flex h-[var(--header-main)] items-center gap-2 min-[1360px]:hidden">
            <SiteLogo className="mr-auto h-12 w-[8.75rem]" />
            <Button asChild variant="helpline" size="icon" className="size-10">
              <a href={`tel:${BRAND.helpline.tel}`} aria-label="Call helpline">
                <Phone className="size-5" aria-hidden />
              </a>
            </Button>
            <MobileDrawer />
          </div>
        </div>
      </header>
      {/* Keeps non-home pages from rendering underneath the fixed header. The home hero
          deliberately starts at the top so the transparent header overlays it. */}
      {!isHome && <div aria-hidden className="h-[var(--header-h)]" />}
    </>
  );
}
