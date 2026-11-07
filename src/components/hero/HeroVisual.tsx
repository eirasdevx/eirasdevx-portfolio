import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { localePath, type Dictionary, type Locale } from "@/i18n";
import { getAppBySlug } from "@/lib/catalog";
import { appThemeStyle } from "@/lib/app-theme";
import { Arrow } from "@/components/ui/Arrow";
import { CardStage } from "@/components/animations/CardStage";

/** Editorial project artwork, not simulated screenshots or customer metrics. */
export function HeroVisual({ lang, t }: { lang: Locale; t: Dictionary }) {
  const fastpass = getAppBySlug("fastpass", lang)!;
  const carretazo = getAppBySlug("carretazo", lang)!;
  const catola = getAppBySlug("cuadrilla-la-catola", lang)!;

  return (
    <div className="hero-showcase load-fade" style={{ "--d": "350ms" } as CSSProperties}>
      <div className="showcase-heading">
        <span className="eyebrow">{t.hero.showcaseLabel}</span>
        <span className="showcase-live"><span />{t.hero.liveProjects}</span>
      </div>
      <CardStage>
        <div className="showcase-grid" aria-hidden="true" />
        <span className="showcase-cross showcase-cross-top" aria-hidden="true">+</span>
        <span className="showcase-cross showcase-cross-bottom" aria-hidden="true">+</span>
        <div className="showcase-slot showcase-fastpass-slot">
          <Link href={localePath(lang, `/projects/${fastpass.slug}`)} style={appThemeStyle(fastpass)} className="showcase-project showcase-fastpass group">
            <div className="showcase-project-top"><span className="showcase-index">01 / {fastpass.subcategory}</span><Arrow /></div>
            <div className="showcase-fastpass-body">
              <div className="showcase-fastpass-copy">
                <h2><Image src={fastpass.logo!} alt={fastpass.name} width={434} height={145} sizes="(min-width: 760px) 22vw, 44vw" className="showcase-fastpass-logo" /></h2>
                <p className="showcase-description">{t.hero.fastpassPitch}</p>
              </div>
              <div className="showcase-ticket" aria-hidden="true">
                <div className="showcase-ticket-main">
                  <span className="showcase-ticket-label">{t.hero.digitalTicket}<span>↗</span></span>
                  <span className="showcase-ticket-title">LIVE<br />PASS<span>✦</span></span>
                  <span className="showcase-ticket-brand">FASTPASS</span>
                </div>
                <div className="showcase-ticket-stub"><i /><span>ADMIT ONE</span></div>
              </div>
            </div>
            <span className="showcase-project-bottom">{t.hero.viewProject}<span>↗</span></span>
          </Link>
        </div>
        <div className="showcase-slot showcase-carretazo-slot">
          <Link href={localePath(lang, `/projects/${carretazo.slug}`)} style={appThemeStyle(carretazo)} className="showcase-project showcase-carretazo group">
            <div className="showcase-project-top"><span className="showcase-index">02 / {carretazo.subcategory}</span><Arrow /></div>
            <div className="showcase-brand-art" aria-hidden="true"><Image src={carretazo.logo!} alt="" fill sizes="(min-width: 760px) 12vw, 24vw" className="object-contain" /></div>
            <div><h2>{carretazo.name}<span>↗</span></h2><p>{t.hero.carretazoPitch}</p></div>
          </Link>
        </div>
        <div className="showcase-slot showcase-catola-slot">
          <Link href={localePath(lang, `/projects/${catola.slug}`)} style={appThemeStyle(catola)} className="showcase-project showcase-catola group">
            <div className="showcase-project-top"><span className="showcase-index">03 / {t.hero.community}</span><Arrow /></div>
            <div className="showcase-brand-art" aria-hidden="true"><Image src={catola.logo!} alt="" fill sizes="(min-width: 760px) 12vw, 24vw" className="object-contain" /></div>
            <div><h2>La Catola<span>↗</span></h2><p>{t.hero.catolaPitch}</p></div>
          </Link>
        </div>
      </CardStage>
      <div className="showcase-caption">
        <span>{t.hero.showcaseCaption}</span>
        <Link href={localePath(lang, "/projects")} className="inline-flex items-center gap-2">{t.hero.viewAll}<Arrow /></Link>
      </div>
    </div>
  );
}
