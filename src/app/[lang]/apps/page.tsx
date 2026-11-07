import type { Metadata } from "next";
import { alternates, fmt, getDictionary, pickStoreDict, type Locale } from "@/i18n";
import { getApps, getCatalogStats } from "@/lib/catalog";
import { AppStore } from "@/components/app-store/AppStore";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactCTA } from "@/components/layout/ContactCTA";

export async function generateMetadata({ params }: PageProps<"/[lang]/apps">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang).pages.apps;
  return { description: t.description, alternates: alternates(lang, "/apps") };
}

export default async function AppsPage({ params }: PageProps<"/[lang]/apps">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  const { total, available } = getCatalogStats();

  return (
    <>
      <PageHeader label={`(02) ${t.store.label}`} title={t.store.title} intro={<p>{fmt(t.store.pageIntro, { total, available })}</p>} />
      <section aria-label={t.store.catalogAria} className="bg-hero text-ink">
        <div className="shell pb-[clamp(5rem,11vw,10rem)]">
          <AppStore apps={getApps(lang)} lang={lang} t={pickStoreDict(t)} syncUrl pageSize={9} />
        </div>
      </section>
      <ContactCTA t={t.contact} />
    </>
  );
}
