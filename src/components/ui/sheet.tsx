"use client";

import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "~/lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetTitle = SheetPrimitive.Title;
const SheetDescription = SheetPrimitive.Description;

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SheetPrimitive.Portal>
    <SheetPrimitive.Overlay className="sheet-overlay bg-ink/40 fixed inset-0 z-[60]" />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        "sheet-content fixed inset-y-0 right-0 z-[70] flex h-full w-[88vw] max-w-[380px] flex-col bg-white shadow-xl",
        className,
      )}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="text-ink hover:bg-brand-tint-1 absolute top-2 right-3 inline-flex size-10 items-center justify-center rounded-full">
        <X className="size-5" aria-hidden />
        <span className="sr-only">Close menu</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
};
