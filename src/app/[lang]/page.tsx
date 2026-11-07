import type { Locale } from "@/i18n";
import { getDictionary, localePath, pickStoreDict } from "@/i18n";
import { getApps, getProjects } from "@/lib/catalog";
import { Hero } from "@/components/hero/Hero";
import { TransitionBar } from "@/components/layout/TransitionBar";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { Manifesto } from "@/components/sections/Manifesto";
import { AboutSection } from "@/components/sections/AboutSection";
import { AppStore } from "@/components/app-store/AppStore";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Arrow } from "@/components/ui/Arrow";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);

  return (
    <>
      <Hero lang={lang} t={t} />
      <TransitionBar t={t.bar} />
      <Manifesto t={t.manifesto} />

      <section id="app-store" aria-labelledby="store-title" className="bg-hero text-ink">
        <div className="shell py-[clamp(5rem,11vw,10rem)]">
          <SectionHeading index="02" label={t.store.label} title={<span id="store-title">{t.store.title}</span>} subtitle={t.store.subtitle} />
          <div className="mt-12 md:mt-16">
            <AppStore apps={getApps(lang)} lang={lang} t={pickStoreDict(t)} />
          </div>
        </div>
      </section>

      <section id="work" aria-labelledby="work-title" className="bg-black text-paper">
        <div className="shell py-[clamp(5rem,11vw,10rem)]">
          <SectionHeading
            index="03"
            label={t.work.label}
            tone="dark"
            title={<span id="work-title">{t.work.title}</span>}
            subtitle={t.work.subtitle}
          />
          <div className="mt-12 md:mt-16">
            <ProjectGrid projects={getProjects(lang)} lang={lang} t={t} />
          </div>
          <div className="mt-10 flex justify-center">
            <ButtonLink href={localePath(lang, "/projects")} variant="outline-light">
              {t.work.all} <Arrow />
            </ButtonLink>
          </div>
        </div>
      </section>

      <AboutSection lang={lang} t={t} compact />
      <ContactCTA t={t.contact} />
    </>
  );
}
