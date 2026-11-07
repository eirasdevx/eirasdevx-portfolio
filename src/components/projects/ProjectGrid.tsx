import type { Dictionary, Locale } from "@/i18n";
import type { ResolvedProject } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/Reveal";
import { ProjectCard } from "./ProjectCard";

const span = {
  wide: "md:col-span-2 lg:col-span-7",
  tall: "lg:col-span-5",
  square: "lg:col-span-6",
};

/** Asymmetric editorial grid: layout and tone come from each project's data. */
export function ProjectGrid({ projects, lang, t }: { projects: ResolvedProject[]; lang: Locale; t: Dictionary }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-12">
      {projects.map((project, i) => (
        <Reveal as="li" key={project.slug} delay={(i % 2) * 100} className={cn(span[project.layout])}>
          <ProjectCard project={project} index={i} lang={lang} t={t} />
        </Reveal>
      ))}
    </ul>
  );
}
