"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath, locales, stripLocale, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

const names: Record<Locale, string> = { es: "Español", en: "English" };

/** ES / EN pill. Keeps the current page when switching language. */
export function LanguageSwitch({ lang, label, className }: { lang: Locale; label: string; className?: string }) {
  const path = stripLocale(usePathname());

  return (
    <nav aria-label={label} className={cn("flex items-center rounded-full bg-white p-1", className)}>
      {locales.map((locale) => {
        const active = locale === lang;
        return (
          <Link
            key={locale}
            href={localePath(locale, path)}
            hrefLang={locale}
            lang={locale}
            aria-label={names[locale]}
            aria-current={active ? "true" : undefined}
            scroll={false}
            className={cn(
              "grid h-10 min-w-10 place-items-center rounded-full px-2.5 font-display text-xs font-bold tracking-[0.08em] uppercase transition-colors duration-300",
              active ? "bg-ink text-paper" : "text-ink/60 hover:text-ink",
            )}
          >
            {locale}
          </Link>
        );
      })}
    </nav>
  );
}
