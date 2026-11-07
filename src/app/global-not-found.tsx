import type { Metadata } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/inter-tight/wght.css";
import "./globals.css";
import { es } from "@/i18n/dictionaries/es";
import { Arrow } from "@/components/ui/Arrow";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "eiras.devx",
};

/** 404 for URLs that match no route at all (the root layout lives in [lang]). */
export default function GlobalNotFound() {
  const t = es.notFound;
  return (
    <html lang="es">
      <body>
        <main className="flex min-h-svh items-center bg-hero text-ink">
          <div className="shell py-32">
            <p className="eyebrow mb-6 text-mute">{t.label}</p>
            <h1 className="display text-[clamp(4rem,16vw,14rem)]">{t.title}</h1>
            <p className="mt-6 max-w-md text-lg text-ink/70">{t.text}</p>
            <ButtonLink href="/" className="mt-8">
              {t.home} <Arrow />
            </ButtonLink>
          </div>
        </main>
      </body>
    </html>
  );
}
