import type { Metadata } from "next";
import { alternates, getDictionary, type Locale } from "@/i18n";
import { ContactCTA } from "@/components/layout/ContactCTA";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang).pages.contact;
  return { description: t.description, alternates: alternates(lang, "/contact") };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  return (
    <div className="flex min-h-svh flex-col justify-center bg-black pt-16">
      <ContactCTA t={t.contact} headingLevel="h1" />
    </div>
  );
}
