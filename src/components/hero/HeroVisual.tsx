import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { localePath, type Dictionary, type Locale } from "@/i18n";
import { getApps, getFeaturedApps } from "@/lib/catalog";
import { appThemeStyle } from "@/lib/app-theme";
import type { StoreApp } from "@/types/app";
import { Arrow } from "@/components/ui/Arrow";
import { GameirasWordmark } from "@/components/ui/GameirasWordmark";
import { CardStage } from "@/components/animations/CardStage";

/**
 * Editorial showcase of published projects, never simulated screenshots or
 * customer metrics. It is built from the catalog: the visible featured apps
 * (up to three) fill the stage, so hiding or publishing an app in
 * `src/data/apps.ts` updates the hero with no changes here.
 *
 *   1 app  → one large card with the real phone capture when there is one
 *   2 apps → a large card and a wide one below
 *   3 apps → the original layout: one large card and two small ones
 */
type Slot = "solo" | "lead" | "wide" | "left" | "right";
const LAYOUTS: Record<number, Slot[]> = { 1: ["solo"], 2: ["lead", "wide"], 3: ["lead", "left", "right"] };

/** Short pitches written for the hero; any other app uses its tagline. */
function pitchFor(app: StoreApp, t: Dictionary): string {
  if (app.slug === "fastpass") return t.hero.fastpassPitch;
  if (app.slug === "carretazo") return t.hero.carretazoPitch;
  if (app.slug === "cuadrilla-la-catola") return t.hero.catolaPitch;
  return app.tagline;
}

const SHORT_NAMES: Record<string, string> = { "cuadrilla-la-catola": "La Catola" };

export function HeroVisual({ lang, t }: { lang: Locale; t: Dictionary }) {
  const featured = getFeaturedApps(lang);
  const apps = (featured.length ? featured : getApps(lang)).slice(0, 3);
  if (!apps.length) return null;
  const slots = LAYOUTS[apps.length];

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
        {apps.map((app, i) => (
          <div key={app.id} className={`showcase-slot showcase-slot-${slots[i]}`}>
            <ShowcaseCard app={app} slot={slots[i]} index={i + 1} lang={lang} t={t} />
          </div>
        ))}
      </CardStage>
      <div className="showcase-caption">
        <span>{t.hero.showcaseCaption}</span>
        <Link href={localePath(lang, "/projects")} className="inline-flex items-center gap-2">{t.hero.viewAll}<Arrow /></Link>
      </div>
    </div>
  );
}

function ShowcaseCard({ app, slot, index, lang, t }: { app: StoreApp; slot: Slot; index: number; lang: Locale; t: Dictionary }) {
  const href = localePath(lang, `/projects/${app.slug}`);
  const label = `${String(index).padStart(2, "0")} / ${app.subcategory ?? t.hero.community}`;
  const large = slot === "solo" || slot === "lead";

  // FastPass keeps its own ticket artwork whenever it takes the large card.
  if (large && app.slug === "fastpass" && app.logo) return <FastPassCard app={app} href={href} label={label} t={t} />;

  if (large) {
    const phone = app.screenshotOrientation === "portrait" ? app.screenshots[0] : undefined;
    return (
      <Link href={href} style={appThemeStyle(app)} className={`showcase-project showcase-lead showcase-lead-${slot} group`}>
        <div className="showcase-project-top"><span className="showcase-index">{label}</span><Arrow /></div>
        <div className="showcase-lead-body">
          <div className="showcase-lead-copy">
            <BrandMark app={app} className="showcase-lead-mark" />
            <h2>{app.name}<span>↗</span></h2>
            <p>{pitchFor(app, t)}</p>
          </div>
          {phone ? (
            <div className="showcase-phone" aria-hidden="true">
              <Image src={phone} alt="" fill sizes="(min-width: 760px) 18vw, 40vw" className="object-cover object-top" />
            </div>
          ) : (
            <div className="showcase-brand-art" aria-hidden="true"><BrandArt app={app} /></div>
          )}
        </div>
        <span className="showcase-project-bottom showcase-lead-bottom">{t.hero.viewProject}<span>↗</span></span>
      </Link>
    );
  }

  return (
    <Link href={href} style={appThemeStyle(app)} className="showcase-project showcase-brand group">
      <div className="showcase-project-top"><span className="showcase-index">{label}</span><Arrow /></div>
      <div className="showcase-brand-art" aria-hidden="true"><BrandArt app={app} /></div>
      <div><h2>{SHORT_NAMES[app.slug] ?? app.name}<span>↗</span></h2><p>{pitchFor(app, t)}</p></div>
    </Link>
  );
}

/** The app's original artwork: logo, else icon, else the Gameiras wordmark. */
function BrandArt({ app }: { app: StoreApp }) {
  const src = app.logo ?? app.icon;
  if (src) return <Image src={src} alt="" fill sizes="(min-width: 760px) 12vw, 24vw" className="object-contain" />;
  if (app.wordmark === "gameiras") return <GameirasWordmark className="text-[6cqw]" />;
  return null;
}

/** Small rounded tile with the app icon, shown next to the name. */
function BrandMark({ app, className }: { app: StoreApp; className: string }) {
  const src = app.icon ?? app.logo;
  if (!src) return null;
  return (
    <span className={className} aria-hidden="true">
      <Image src={src} alt="" fill sizes="96px" className={app.iconFullBleed ? "object-cover" : "object-contain p-[12%]"} />
    </span>
  );
}

function FastPassCard({ app, href, label, t }: { app: StoreApp; href: string; label: string; t: Dictionary }) {
  return (
    <Link href={href} style={appThemeStyle(app)} className="showcase-project showcase-fastpass group">
      <div className="showcase-project-top"><span className="showcase-index">{label}</span><Arrow /></div>
      <div className="showcase-fastpass-body">
        <div className="showcase-fastpass-copy">
          <h2><Image src={app.logo!} alt={app.name} width={434} height={145} sizes="(min-width: 760px) 22vw, 44vw" className="showcase-fastpass-logo" /></h2>
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
  );
}
