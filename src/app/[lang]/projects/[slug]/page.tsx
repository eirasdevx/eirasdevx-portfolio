import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { alternates, getDictionary, localePath, locales, type Locale } from "@/i18n";
import { getProjectBySlug, getProjects } from "@/lib/catalog";
import { stagger } from "@/lib/utils";
import { appThemeStyle } from "@/lib/app-theme";
import { ScreenshotGallery } from "@/components/app-store/ScreenshotGallery";
import { Reveal } from "@/components/animations/Reveal";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { Arrow } from "@/components/ui/Arrow";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Cover } from "@/components/ui/Cover";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tag } from "@/components/ui/Tag";

type Props = PageProps<"/[lang]/projects/[slug]">;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => getProjects(lang).map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: l, slug } = await params;
  const lang = l as Locale;
  const project = getProjectBySlug(slug, lang);
  if (!project) return {};
  const title = `${project.name} — ${getDictionary(lang).pages.caseStudySuffix}`;
  return {
    description: project.summary,
    alternates: alternates(lang, `/projects/${project.slug}`),
    openGraph: { title, description: project.summary },
    ...(project.app?.icon && { icons: { icon: project.app.icon, apple: project.app.icon } }),
  };
}

function Pending({ text }: { text: string }) {
  return <p className="text-mute">{text}</p>;
}

function List({ items, pending }: { items?: string[]; pending: string }) {
  if (!items?.length) return <Pending text={pending} />;
  return (
    <ul className="border-t border-ink/10">
      {items.map((item) => (
        <li key={item} className="border-b border-ink/10 py-3">
          {item}
        </li>
      ))}
    </ul>
  );
}

function Block({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <Reveal as="section" className="grid gap-4 border-t border-ink/15 py-10 md:grid-cols-12 md:gap-6 md:py-14">
      <h2 className="flex gap-4 font-display text-2xl font-extrabold tracking-[-0.035em] md:col-span-4 md:text-3xl">
        <span className="eyebrow pt-2 text-mute tabular-nums">{String(n).padStart(2, "0")}</span>
        {title}
      </h2>
      <div className="min-w-0 text-lg leading-relaxed text-ink/80 md:col-span-7 md:col-start-6">{children}</div>
    </Reveal>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { lang: l, slug } = await params;
  const lang = l as Locale;
  const t = getDictionary(lang);
  const project = getProjectBySlug(slug, lang);
  if (!project) notFound();

  const { app, caseStudy: cs } = project;
  const finished = app?.status === "available";
  const p = t.project;
  const b = p.blocks;

  return (
    <>
      <div className={app?.theme ? "app-themed" : undefined} style={appThemeStyle(app)} data-app={app?.slug}>
      <section className="bg-hero text-ink">
        <div className="shell pt-28 pb-10 md:pt-40">
          <nav aria-label={t.common.breadcrumb} className="load-fade mb-10 text-sm text-mute" style={stagger(150)}>
            <ol className="flex items-center gap-2">
              <li>
                <Link href={localePath(lang, "/projects")} className="hover:text-ink">
                  {t.nav.projects}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                {project.name}
              </li>
            </ol>
          </nav>
          <p className="eyebrow load-fade mb-5 text-mute" style={stagger(220)}>
            {p.caseStudy} · {project.type}
            {project.year ? ` · ${project.year}` : ""}
          </p>
          <h1 className="display text-[clamp(3.25rem,11vw,10rem)] break-words">
            <span className="mask-line">
              <span style={stagger(300)}>{project.name}</span>
            </span>
          </h1>
          <div className="load-fade mt-8 grid gap-6 md:grid-cols-12" style={stagger(450)}>
            <p className="text-xl leading-snug text-ink/70 md:col-span-7 md:text-2xl">{project.summary}</p>
            <div className="flex flex-wrap items-start gap-2 md:col-span-4 md:col-start-9 md:justify-end">
              {app && <StatusBadge status={app.status} label={t.statuses[app.status]} className="h-10 px-4" />}
              {app?.websiteUrl && (
                <ButtonLink
                  href={app.websiteUrl}
                  className="min-h-10 px-4 text-[0.8125rem]"
                  ariaLabel={`${t.actions.website}: ${app.name} ${t.common.opensNewTab}`}
                >
                  {t.actions.website} <Arrow />
                </ButtonLink>
              )}
              {app && (
                <ButtonLink href={localePath(lang, `/apps/${app.slug}`)} variant="outline-dark" className="min-h-10 px-4 text-[0.8125rem]">
                  {p.appStorePage} <Arrow />
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
        {app && (
          <div className="shell pb-6">
            <div className="load-photo" style={stagger(400)}>
              <Cover app={app} preferLogo={app.caseStudyLogo} className="h-[clamp(260px,46vw,640px)] rounded-[1.75rem]" sizes="100vw" />
            </div>
          </div>
        )}
      </section>

      <article className="bg-hero text-ink">
        <div className="shell pt-10 pb-[clamp(4rem,9vw,8rem)]">
          {!finished && (
            <p className="mb-10 rounded-[1.25rem] border border-dashed border-ink/25 px-5 py-4 text-sm text-ink/75">{p.inProgress}</p>
          )}

          <Block n={1} title={b.problem}>
            {cs.problem ? <p>{cs.problem}</p> : <Pending text={p.pending} />}
          </Block>
          <Block n={2} title={b.goals}>
            <List items={cs.goals} pending={p.pending} />
          </Block>
          <Block n={3} title={b.technologies}>
            {project.technologies.length ? (
              <ul className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>
            ) : (
              <Pending text={p.pending} />
            )}
          </Block>
          <Block n={4} title={b.architecture}>
            {cs.architecture ? <p>{cs.architecture}</p> : <Pending text={p.pending} />}
          </Block>
          <Block n={5} title={b.features}>
            <List items={app?.features} pending={p.pending} />
          </Block>
          <Block n={6} title={b.decisions}>
            <List items={cs.decisions} pending={p.pending} />
          </Block>
          <Block n={7} title={b.screenshots}>
            {app ? <ScreenshotGallery app={app} t={t.app} /> : <Pending text={p.pending} />}
          </Block>
          <Block n={8} title={b.challenges}>
            <List items={cs.challenges} pending={p.pending} />
          </Block>
          <Block n={9} title={b.next}>
            {app && (
              <p className="mb-4">
                {p.currentStatus} <strong className="font-semibold">{t.statuses[app.status]}</strong>.
              </p>
            )}
            <List items={cs.nextSteps} pending={p.pending} />
          </Block>

          <div className="mt-6 flex flex-wrap gap-3 border-t border-ink/15 pt-10">
            <ButtonLink href={localePath(lang, "/projects")} variant="outline-dark">
              <Arrow dir="left" /> {p.allProjects}
            </ButtonLink>
            <ButtonLink href={localePath(lang, "/apps")} variant="outline-dark">
              {p.appStore} <Arrow />
            </ButtonLink>
          </div>
        </div>
      </article>
      </div>
      <ContactCTA t={t.contact} />
    </>
  );
}
