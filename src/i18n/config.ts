export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

/** Spanish is the default and lives at the unprefixed URLs (/, /apps…). */
export const defaultLocale: Locale = "es";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** "/apps" → "/apps" (es) or "/en/apps" (en). */
export function localePath(lang: Locale, path: string) {
  if (lang === defaultLocale) return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

/** Removes any locale prefix: "/en/apps" → "/apps", "/es" → "/". */
export function stripLocale(pathname: string) {
  const match = pathname.match(/^\/(es|en)(?=\/|$)/);
  if (!match) return pathname || "/";
  return pathname.slice(match[0].length) || "/";
}

/** Metadata alternates for a path, shared by every page. */
export function alternates(lang: Locale, path: string) {
  return {
    canonical: localePath(lang, path),
    languages: { es: localePath("es", path), en: localePath("en", path), "x-default": localePath("es", path) },
  };
}

export const dateLocales: Record<Locale, string> = { es: "es-ES", en: "en-GB" };

/** Replaces {placeholders} in dictionary strings. */
export function fmt(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));
}
