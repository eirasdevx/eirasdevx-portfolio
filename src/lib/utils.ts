import type { CSSProperties } from "react";

type ClassValue = string | false | null | undefined;

export function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(" ");
}

/** Sets the `--d` delay consumed by the load / reveal animations in globals.css. */
export function stagger(ms: number): CSSProperties {
  return { "--d": `${ms}ms` } as CSSProperties;
}

export function formatDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "short", day: "numeric" }).format(new Date(iso));
}
