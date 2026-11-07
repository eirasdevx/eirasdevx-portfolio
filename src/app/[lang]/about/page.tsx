import type { Metadata } from "next";
import { alternates, getDictionary, type Locale } from "@/i18n";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactCTA } from "@/components/layout/ContactCTA";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang).pages.about;
  return { description: t.description, alternates: alternates(lang, "/about") };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  return (
    <>
      <AboutSection lang={lang} t={t} headingLevel="h1" />
      <ContactCTA t={t.contact} />
    </>
  );
}
