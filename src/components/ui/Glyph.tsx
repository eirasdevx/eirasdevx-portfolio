import type { ReactNode } from "react";
import type { ArtworkGlyph } from "@/types/app";

/**
 * Abstract monochrome marks used as placeholder artwork until real icons,
 * covers and screenshots exist. Purely decorative.
 */
export function Glyph({ name, className }: { name: ArtworkGlyph; className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {shapes[name]}
    </svg>
  );
}

const shapes: Record<ArtworkGlyph, ReactNode> = {
  grid: (
    <>
      {[0, 1, 2].flatMap((r) =>
        [0, 1, 2].map((c) => (
          <rect
            key={`${r}${c}`}
            x={18 + c * 23}
            y={18 + r * 23}
            width="18"
            height="18"
            rx="3"
            fill={r === 0 && c === 2 ? "currentColor" : "none"}
          />
        )),
      )}
    </>
  ),
  rings: (
    <>
      <circle cx="50" cy="62" r="22" />
      <circle cx="34" cy="30" r="8" />
      <circle cx="60" cy="24" r="5" fill="currentColor" />
      <circle cx="72" cy="40" r="3" />
    </>
  ),
  stripes: (
    <>
      <path d="M18 26h64" />
      <path d="M18 42h40" />
      <path d="M18 58h56" />
      <path d="M18 74h28" />
      <circle cx="74" cy="74" r="6" fill="currentColor" />
    </>
  ),
  arc: (
    <>
      <path d="M16 72a34 34 0 0 1 68 0" />
      <path d="M30 72a20 20 0 0 1 40 0" />
      <path d="M50 18v10M24 30l6 6M76 30l-6 6" />
      <path d="M12 82h76" />
    </>
  ),
  lens: (
    <>
      <circle cx="50" cy="50" r="32" />
      <circle cx="50" cy="50" r="14" fill="currentColor" />
      <path d="M50 18l12 22M82 50l-22 12M50 82l-12-22M18 50l22-12" />
    </>
  ),
  ticket: (
    <>
      <path d="M16 30h68v12a8 8 0 0 0 0 16v12H16V58a8 8 0 0 0 0-16z" />
      <path d="M62 32v36" strokeDasharray="3 5" />
      <path d="M28 46h22M28 56h14" />
    </>
  ),
  blot: (
    <>
      <path
        d="M50 18c10 0 12 10 20 12s14 8 10 18 4 14-4 20-14 4-22 10-16-2-20-10-16-8-12-18 2-16 10-22 8-10 18-10z"
        fill="currentColor"
        stroke="none"
      />
      <circle cx="80" cy="22" r="4" fill="currentColor" stroke="none" />
      <circle cx="20" cy="84" r="3" fill="currentColor" stroke="none" />
      <path d="M40 78v10M58 80v6" />
    </>
  ),
  track: (
    <>
      <path d="M14 80C30 80 30 56 50 56s22-30 38-30" />
      <path d="M14 66C26 66 28 42 46 42s20-24 36-24" strokeDasharray="4 6" />
      <circle cx="84" cy="22" r="5" fill="currentColor" />
    </>
  ),
};
