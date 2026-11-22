/** Heart + cross logomark (simplified from the logo). TODO(confirm): replace with the exported brand logomark SVG. */
export function Logomark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 72"
      className={className}
      fill="none"
      role="img"
      aria-label="Birth Roots logomark"
    >
      <path
        d="M31 54C14 44 6 33 8 22c2-9 11-13 18-9 3 2 5 4 6 7 1-4 5-9 12-9 9 0 14 8 11 17-3 10-11 18-24 26z"
        fill="var(--brand-logo)"
      />
      <path
        d="M32 52v18M23 62h18"
        stroke="var(--charcoal)"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
