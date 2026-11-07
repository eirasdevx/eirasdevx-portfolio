import Link from "next/link";
import { localePath, type Dictionary, type Locale } from "@/i18n";
import type { ResolvedProject } from "@/lib/catalog";
import { Arrow } from "@/components/ui/Arrow";
import { Cover } from "@/components/ui/Cover";

export function DiscoverCard({ project, lang, t }: { project: ResolvedProject; lang: Locale; t: Dictionary }) {
  return (
    <article className="group lift relative flex items-center gap-4 rounded-[1.5rem] bg-ink p-2 pr-5 text-paper">
      {project.app && (
        <Cover app={project.app} tone="dark" wordmark={false} className="aspect-square w-24 shrink-0 rounded-[1.1rem]" sizes="96px" />
      )}
      <div className="min-w-0">
        <p className="eyebrow text-paper/55">{t.hero.selectedProject}</p>
        <h2 className="mt-1.5 truncate font-display text-xl font-extrabold tracking-[-0.03em]">{project.name}</h2>
        <Link
          href={localePath(lang, `/projects/${project.slug}`)}
          className="stretched mt-1.5 inline-flex items-center gap-1.5 text-sm text-paper/75 group-hover:text-paper"
        >
          {t.hero.discover} <Arrow />
        </Link>
      </div>
    </article>
  );
}
