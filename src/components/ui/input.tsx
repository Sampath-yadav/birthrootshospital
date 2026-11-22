import * as React from "react";

import { cn } from "~/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "border-brand-soft text-ink placeholder:text-charcoal flex h-10 w-full rounded-full border bg-white px-4 text-sm",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
