import type { CSSProperties } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";

/**
 * The site logo. The configured file is used as a mask filled with
 * `currentColor`, so the same monochrome PNG/SVG renders black on light
 * surfaces and white on dark ones — set the colour with a `text-*` class.
 */
export function Logo({ className, label }: { className?: string; label?: string }) {
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true as const };

  if (site.logo.src) {
    const mask = `url("${site.logo.src}") center / contain no-repeat`;
    const style: CSSProperties = { WebkitMask: mask, mask };
    return <span {...a11y} className={cn("inline-block bg-current", className)} style={style} />;
  }
  return <BrandMark className={className} title={label} />;
}
