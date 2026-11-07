"use client";

import { usePathname } from "next/navigation";
import { localePath, type Locale } from "@/i18n/config";
import { en } from "@/i18n/dictionaries/en";
import { es } from "@/i18n/dictionaries/es";
import { Arrow } from "@/components/ui/Arrow";
import { ButtonLink } from "@/components/ui/ButtonLink";

/** not-found.js receives no params, so the language comes from the URL. */
export default function NotFound() {
  const lang: Locale = usePathname().startsWith("/en") ? "en" : "es";
  const t = (lang === "en" ? en : es).notFound;

  return (
    <section className="flex min-h-svh items-center bg-hero text-ink">
      <div className="shell py-32">
        <p className="eyebrow mb-6 text-mute">{t.label}</p>
        <h1 className="display text-[clamp(4rem,16vw,14rem)]">{t.title}</h1>
        <p className="mt-6 max-w-md text-lg text-ink/70">{t.text}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          <ButtonLink href={localePath(lang, "/")}>
            {t.home} <Arrow />
          </ButtonLink>
          <ButtonLink href={localePath(lang, "/apps")} variant="outline-dark">
            App Store <Arrow />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
