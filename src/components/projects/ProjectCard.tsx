import Link from "next/link";
import { localePath, type Dictionary, type Locale } from "@/i18n";
import type { ResolvedProject } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { appThemeStyle } from "@/lib/app-theme";
import { Arrow } from "@/components/ui/Arrow";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Cover } from "@/components/ui/Cover";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tag } from "@/components/ui/Tag";

const imageHeight = {
  wide: "h-[clamp(240px,34vw,540px)]",
  tall: "h-[clamp(240px,34vw,540px)] lg:h-[clamp(240px,46vw,700px)]",
  square: "h-[clamp(240px,30vw,460px)]",
};

interface Props {
  project: ResolvedProject;
  index: number;
  lang: Locale;
  t: Dictionary;
}

export function ProjectCard({ project, index, lang, t }: Props) {
  const dark = !project.app?.theme && project.tone === "dark";
  const tone = dark ? "dark" : "light";

  return (
    <article
      style={appThemeStyle(project.app)}
      data-app={project.app?.slug}
      className={cn("group lift relative flex h-full flex-col rounded-[1.75rem] p-2", project.app?.theme && "app-themed", dark ? "bg-card-dark text-paper" : "bg-card text-ink")}
    >
      {project.app && (
        <Cover
          app={project.app}
          tone={dark ? "light" : "dark"}
          className={cn("rounded-[1.35rem]", imageHeight[project.layout])}
          sizes="(min-width: 1080px) 58vw, 100vw"
        />
      )}

      <div className="flex flex-1 flex-col gap-5 p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className={cn("eyebrow", dark ? "text-paper/50" : "text-mute")}>
            ({String(index + 1).padStart(2, "0")}) {project.type}
            {project.year ? ` · ${project.year}` : ""}
          </span>
          {project.app && (
            <StatusBadge status={project.app.status} label={t.statuses[project.app.status]} tone={tone} className="ml-auto" />
          )}
        </div>

        <div>
          <h3 className="font-display text-[clamp(2rem,3.6vw,3.25rem)] leading-[0.9] font-extrabold tracking-[-0.05em]">
            <Link href={localePath(lang, `/projects/${project.slug}`)} className="stretched">
              {project.name}
            </Link>
          </h3>
          <p className={cn("mt-3 max-w-[48ch] leading-snug", dark ? "text-paper/70" : "text-ink/70")}>{project.summary}</p>
        </div>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-4">
          {project.technologies.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5" aria-label={t.work.stack}>
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Tag tone={tone}>{tech}</Tag>
                </li>
              ))}
            </ul>
          ) : (
            <span />
          )}
          <div className="flex flex-wrap items-center gap-4">
            {project.app?.websiteUrl && (
              <ButtonLink
                href={project.app.websiteUrl}
                variant={dark ? "outline-light" : "outline-dark"}
                className="relative z-10 min-h-10 px-4 text-sm"
                ariaLabel={`${t.actions.website}: ${project.name} ${t.common.opensNewTab}`}
              >
                {t.actions.website} <Arrow />
              </ButtonLink>
            )}
            <span className="inline-flex items-center gap-1.5 text-sm font-medium">
              {t.work.caseStudy} <Arrow />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
