"use client";

import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { isActive, NAV_ITEMS } from "~/config/navigation";
import { cn } from "~/lib/utils";
import { EmergencyButton, HelplineButton } from "./contact-buttons";
import { HeaderSearch } from "./header-search";
import { LanguageToggle } from "./language-toggle";

const rowClass =
  "flex min-h-12 w-full items-center justify-between rounded-lg px-3 text-left text-base font-bold text-ink hover:bg-brand-tint-1";

export function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const baseId = useId();

  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="size-6" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent aria-describedby={undefined}>
        <div className="border-brand-soft border-b px-4 py-3">
          <SheetTitle className="font-display text-base font-extrabold">
            Menu
          </SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation and contact options
          </SheetDescription>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4">
          <HeaderSearch />

          <nav aria-label="Mobile">
            <ul className="space-y-0.5">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item, pathname);
                if (!item.children) {
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={close}
                        aria-current={active ? "page" : undefined}
                        className={cn(rowClass, active && "bg-brand-tint-1")}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                const isOpen = expanded === item.label;
                const panelId = `${baseId}-${item.label.replace(/\W+/g, "-")}`;
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      className={cn(rowClass, active && "bg-brand-tint-1")}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "size-5 transition-transform duration-200",
                          isOpen && "rotate-180",
                        )}
                        aria-hidden
                      />
                    </button>
                    <ul
                      id={panelId}
                      hidden={!isOpen}
                      className="border-brand-soft mt-0.5 mb-1 ml-3 space-y-0.5 border-l-2 pl-2"
                    >
                      {item.children.map((leaf) => (
                        <li key={leaf.href}>
                          <Link
                            href={leaf.href}
                            onClick={close}
                            className="text-ink hover:bg-brand-tint-1 flex min-h-11 items-center justify-between gap-3 rounded-lg px-3 text-[15px] font-semibold"
                          >
                            {leaf.label}
                            {leaf.badge && (
                              <span className="bg-brand-strong text-ink rounded-full px-2 py-0.5 text-[11px] leading-none font-bold">
                                {leaf.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="border-brand-soft space-y-3 border-t px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <LanguageToggle className="w-full justify-center [&>button]:flex-1" />
          <HelplineButton className="h-11 w-full" />
          <EmergencyButton className="h-11 w-full" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
