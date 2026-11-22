import Image from "next/image";
import Link from "next/link";

import { BRAND } from "~/config/brand";
import { cn } from "~/lib/utils";

/**
 * The logo file has transparent padding around the artwork, so the image is rendered slightly
 * larger than its box and cropped by the wrapper (overflow hidden). Size the wrapper via className.
 */
export function SiteLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "relative block h-14 w-[10.25rem] shrink-0 overflow-hidden",
        className,
      )}
    >
      <Image
        src={BRAND.logo.src}
        alt={BRAND.logo.alt}
        width={BRAND.logo.width}
        height={BRAND.logo.height}
        priority
        sizes="200px"
        className="absolute top-1/2 left-1/2 h-[115%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2"
      />
    </Link>
  );
}
