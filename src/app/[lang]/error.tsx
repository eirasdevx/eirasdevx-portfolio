"use client";

import { usePathname } from "next/navigation";
import { en } from "@/i18n/dictionaries/en";
import { es } from "@/i18n/dictionaries/es";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = (usePathname().startsWith("/en") ? en : es).error;
  return (
    <section className="flex min-h-svh items-center bg-hero text-ink">
      <div className="shell py-32">
        <p className="eyebrow mb-6 text-mute">{t.label}</p>
        <h1 className="display text-[clamp(3.5rem,12vw,10rem)]">{t.title}</h1>
        <button type="button" onClick={reset} className="btn btn-dark mt-8">
          {t.retry}
        </button>
      </div>
    </section>
  );
}
