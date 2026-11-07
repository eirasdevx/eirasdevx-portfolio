import { site } from "@/data/site";
import type { Dictionary } from "@/i18n";
import { Arrow } from "@/components/ui/Arrow";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/animations/Reveal";

export function ContactCTA({ t, headingLevel = "h2" }: { t: Dictionary["contact"]; headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-black text-paper">
      <div className="shell py-[clamp(5rem,12vw,11rem)]">
        <Reveal>
          <p className="eyebrow mb-8 flex gap-3 text-paper/55">
            <span>(05)</span>
            <span>{t.label}</span>
          </p>
          <Heading id="contact-title" className="display text-[clamp(2.25rem,11vw,12rem)]">
            {t.title1}
            <br />
            <span className="text-mute">{t.title2}</span>
          </Heading>
        </Reveal>

        <Reveal delay={120} className="mt-12 flex flex-col gap-8 border-t border-white/15 pt-8 md:mt-16 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-xl leading-snug text-paper/70">{t.text}</p>
          <div className="flex flex-wrap gap-3">
            {site.email && (
              <ButtonLink href={`mailto:${site.email}`} variant="light">
                {t.contactMe} <Arrow />
              </ButtonLink>
            )}
            <ButtonLink href={site.github} variant={site.email ? "outline-light" : "light"}>
              GitHub <Arrow />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
