import type { Metadata } from "next";
import { alternates, getDictionary, type Locale } from "@/i18n";
import { getProjects } from "@/lib/catalog";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export async function generateMetadata({ params }: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang).pages.projects;
  return { description: t.description, alternates: alternates(lang, "/projects") };
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/projects">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);

  return (
    <>
      <PageHeader label={`(03) ${t.work.label}`} title={t.work.title} intro={<p>{t.work.pageIntro}</p>} />
      <section aria-label={t.work.projectsAria} className="bg-black text-paper">
        <div className="shell py-[clamp(4rem,9vw,8rem)]">
          <ProjectGrid projects={getProjects(lang)} lang={lang} t={t} />
        </div>
      </section>
      <ContactCTA t={t.contact} />
    </>
  );
}
