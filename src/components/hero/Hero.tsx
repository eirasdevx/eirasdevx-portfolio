import { site } from "@/data/site";
import { localePath, type Dictionary, type Locale } from "@/i18n";
import { stagger } from "@/lib/utils";
import { Arrow } from "@/components/ui/Arrow";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HeroVisual } from "./HeroVisual";

export function Hero({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <section aria-label={t.hero.aria} className="relative overflow-hidden bg-hero text-ink">
      <div className="shell pt-28 pb-8 md:pt-36 lg:pt-40">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow load-fade mb-7 flex items-center gap-2 text-mute" style={stagger(150)}>
              <span className="size-1.5 rounded-full bg-ink" aria-hidden="true" />{t.hero.aboutLabel}
            </p>
            <h1 className="display text-[clamp(5rem,23vw,10rem)] md:text-[clamp(5rem,10.5vw,10rem)]">
              <span className="sr-only">{t.hero.srTitle}</span>
              <span aria-hidden="true">
                <span className="mask-line"><span style={stagger(180)}>EIRAS.</span></span>
                <span className="mask-line"><span style={stagger(280)}>DEVX</span></span>
              </span>
            </h1>
            <p className="load-fade mt-8 max-w-[25ch] font-display text-[clamp(1.6rem,2.5vw,2.5rem)] leading-[1.1] font-semibold tracking-[-0.04em]" style={stagger(400)}>{t.hero.intro}</p>
            <p className="load-fade mt-4 max-w-[43ch] text-base leading-relaxed text-ink/65 md:text-lg" style={stagger(450)}>{t.hero.businessDescription}</p>
            <div className="load-fade mt-7 flex flex-wrap gap-2" style={stagger(500)}>
              <ButtonLink href={localePath(lang, "/contact")}>{t.hero.startProject}<Arrow /></ButtonLink>
              <ButtonLink href={localePath(lang, "/projects")} variant="outline-dark">{t.hero.viewProjects}<Arrow /></ButtonLink>
            </div>
            {site.availability.open && (
              <p className="load-fade mt-6 flex items-center gap-2.5 text-sm text-ink/65" style={stagger(550)}>
                <span aria-hidden="true" className="size-1.5 rounded-full bg-[#397454]" />{t.nav.available}
              </p>
            )}
          </div>
          <HeroVisual lang={lang} t={t} />
        </div>
        <div className="hero-services load-fade" style={stagger(650)}>
          <span className="eyebrow text-mute">{t.hero.fromIdea}</span>
          <ul aria-label={t.hero.servicesLabel}>
            {t.hero.services.map((service, i) => <li key={service}><span>0{i + 1}</span>{service}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
