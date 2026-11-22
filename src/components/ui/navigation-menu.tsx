"use client";

import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import * as React from "react";

import { cn } from "~/lib/utils";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    // No <NavigationMenuViewport/> is rendered, so each panel is positioned under its own trigger
    className={cn("relative flex flex-1 items-center", className)}
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = "NavigationMenu";

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn("flex flex-1 list-none items-center gap-0.5", className)}
    {...props}
  />
));
NavigationMenuList.displayName = "NavigationMenuList";

const NavigationMenuItem = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Item
    ref={ref}
    className={cn("relative", className)}
    {...props}
  />
));
NavigationMenuItem.displayName = "NavigationMenuItem";

const NavigationMenuTrigger = NavigationMenuPrimitive.Trigger;
const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "dropdown-panel border-brand-soft fixed inset-x-0 top-[calc(var(--header-h)-1px)] z-40 border-y bg-white shadow-[0_24px_32px_-16px_rgba(30,26,25,0.15)]",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = "NavigationMenuContent";

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
};
