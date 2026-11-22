"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { isActive, NAV_ITEMS } from "~/config/navigation";
import { NavDropdown, navItemClass } from "./nav-dropdown";

/** Desktop main row. Hover opens after a 120ms intent delay; click/Enter/Space also toggle; Esc closes. */
export function MainNav() {
  const pathname = usePathname();
  // Tracked so the page behind an open panel can be dimmed with a scrim.
  const [open, setOpen] = useState("");

  return (
    <>
      {open && (
        <div
          aria-hidden
          onClick={() => setOpen("")}
          className="fixed inset-x-0 top-[var(--header-h)] bottom-0 z-30 bg-[rgba(30,26,25,0.35)]"
        />
      )}
      <NavigationMenu
        value={open}
        onValueChange={setOpen}
        delayDuration={120}
        skipDelayDuration={250}
        aria-label="Primary"
        className="min-w-0"
      >
        <NavigationMenuList>
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <NavDropdown key={item.label} item={item} />
            ) : (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuLink asChild active={isActive(item, pathname)}>
                  <Link
                    href={item.href}
                    className={navItemClass}
                    data-active={isActive(item, pathname)}
                    aria-current={isActive(item, pathname) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ),
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
