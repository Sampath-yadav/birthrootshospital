"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { isActive, type NavItem, type NavLeaf } from "~/config/navigation";
import { cn } from "~/lib/utils";

// Only the current page carries the underline. An open dropdown just turns pink,
// so two underlines can never show at once.
export const navItemClass =
  "relative inline-flex h-[var(--header-main)] items-center gap-1 px-3 text-[15px] font-medium whitespace-nowrap text-[color:var(--header-fg)] transition-colors hover:text-brand-deep data-[state=open]:text-brand-deep " +
  "after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand-strong after:transition-transform data-[active=true]:after:scale-x-100";

function isLeafActive(leaf: NavLeaf, pathname: string) {
  return pathname === leaf.href || pathname.startsWith(`${leaf.href}/`);
}

export function NavDropdown({
  item,
}: {
  item: Extract<NavItem, { children: NavLeaf[] }>;
}) {
  const pathname = usePathname();
  const active = isActive(item, pathname);

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(navItemClass, "group")}
        data-active={active}
      >
        {item.label}
        <ChevronDown
          className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="site-container py-8">
          <ul className="grid max-w-3xl gap-x-16 gap-y-1 sm:grid-cols-2">
            {item.children.map((leaf) => (
              <li key={leaf.href}>
                <NavigationMenuLink
                  asChild
                  active={isLeafActive(leaf, pathname)}
                >
                  <Link
                    href={leaf.href}
                    className="text-ink hover:text-brand-deep data-[active]:text-brand-deep flex w-fit items-center gap-3 py-2.5 text-lg transition-colors"
                  >
                    {leaf.label}
                    {leaf.badge && (
                      <span className="bg-brand-tint-1 text-brand-deep rounded px-1.5 py-0.5 text-[11px] leading-none font-bold">
                        {leaf.badge}
                      </span>
                    )}
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
