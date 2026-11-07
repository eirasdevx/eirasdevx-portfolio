import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { alternates, dateLocales, getDictionary, localePath, locales, pickStoreDict, type Locale } from "@/i18n";
import { getAppBySlug, getApps, getProjectForApp, getRelatedApps } from "@/lib/catalog";
import { getAppActions } from "@/lib/app-meta";
import { appThemeStyle } from "@/lib/app-theme";
import { formatDate, stagger } from "@/lib/utils";
import { AppActionLink } from "@/components/app-store/AppActionLink";
import { AppCard } from "@/components/app-store/AppCard";
import { ScreenshotGallery } from "@/components/app-store/ScreenshotGallery";
import { Reveal } from "@/components/animations/Reveal";
import { AppIcon } from "@/components/ui/AppIcon";
import { Arrow } from "@/components/ui/Arrow";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tag } from "@/components/ui/Tag";

type Props = PageProps<"/[lang]/apps/[slug]">;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => getApps(lang).map((app) => ({ lang, slug: app.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: l, slug } = await params;
  const lang = l as Locale;
  const app = getAppBySlug(slug, lang);
  if (!app) return {};
  return {
    description: app.description,
    alternates: alternates(lang, `/apps/${app.slug}`),
    openGraph: { title: app.name, description: app.tagline },
  };
}

export default async function AppPage({ params }: Props) {
  const { lang: l, slug } = await params;
  const lang = l as Locale;
  const t = getDictionary(lang);
  const app = getAppBySlug(slug, lang);
  if (!app) notFound();

  const actions = getAppActions(app, t.actions);
  const related = getRelatedApps(app, lang);
  const caseStudy = getProjectForApp(app.slug, lang);

  const info: [string, ReactNode][] = [
    [t.app.category, app.subcategory ? `${t.categories[app.category]} · ${app.subcategory}` : t.categories[app.category]],
    [t.app.platform, app.platforms.join(", ")],
    [t.app.status, t.statuses[app.status]],
  ];
  if (app.version) info.push([t.app.version, app.version]);
  if (app.releaseDate) info.push([t.app.released, formatDate(app.releaseDate, dateLocales[lang])]);
  if (app.updatedAt) info.push([t.app.updated, formatDate(app.updatedAt, dateLocales[lang])]);

  return (
    <div className={app.theme ? "app-themed" : undefined} style={appThemeStyle(app)} data-app={app.slug}>
      {/* Header */}
      <section className="bg-hero text-ink">
        <div className="shell pt-28 pb-12 md:pt-40 md:pb-16">
          <nav aria-label={t.common.breadcrumb} className="load-fade mb-10 text-sm text-mute" style={stagger(150)}>
            <ol className="flex items-center gap-2">
              <li>
                <Link href={localePath(lang, "/apps")} className="hover:text-ink">
                  App Store
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                {app.name}
              </li>
            </ol>
          </nav>

          <div className="grid gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:items-end md:gap-10">
            <div className="load-photo" style={stagger(200)}>
              <AppIcon app={app} size="lg" />
            </div>
            <div className="min-w-0">
              <div className="load-fade flex flex-wrap items-center gap-2" style={stagger(300)}>
                <StatusBadge status={app.status} label={t.statuses[app.status]} />
                {app.platforms.map((p) => (
                  <Tag key={p}>{p}</Tag>
                ))}
                {app.version && <Tag>v{app.version}</Tag>}
              </div>
              <h1 className="display mt-5 text-[clamp(3.25rem,10vw,9rem)] break-words">
                <span className="mask-line">
                  <span style={stagger(320)}>{app.name}</span>
                </span>
              </h1>
              <p className="load-fade mt-5 max-w-2xl text-xl leading-snug text-ink/70 md:text-2xl" style={stagger(450)}>
                {app.tagline}
              </p>
            </div>
          </div>

          <div className="load-fade mt-10 flex flex-wrap items-center gap-3" style={stagger(550)}>
            {actions.length > 0 ? (
              actions.map((action, i) => (
                <AppActionLink
                  key={action.kind}
                  action={action}
                  appName={app.name}
                  newTabHint={t.common.opensNewTab}
                  className={i === 0 ? "btn-dark" : "btn-outline-dark"}
                />
              ))
            ) : (
              <p className="inline-flex min-h-12 items-center gap-2 rounded-full border border-dashed border-ink/25 px-5 text-sm text-ink/70">
                {app.status === "coming-soon" ? t.actions.soon : t.app.noBuild}
              </p>
            )}
            {caseStudy && (
              <ButtonLink href={localePath(lang, `/projects/${caseStudy.slug}`)} variant="outline-dark">
                {t.app.caseStudy} <Arrow />
              </ButtonLink>
            )}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section aria-labelledby="gallery-title" className="bg-hero text-ink">
        <div className="shell pb-16 md:pb-24">
          <h2 id="gallery-title" className="eyebrow mb-5 text-mute">
            {t.app.screenshots}
          </h2>
          <ScreenshotGallery app={app} t={t.app} />
        </div>
      </section>

      {/* Information */}
      <section aria-label={t.app.information} className="bg-paper text-ink">
        <div className="shell grid gap-14 py-[clamp(4rem,9vw,8rem)] lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="eyebrow mb-5 text-mute">{t.app.about}</h2>
              <p className="font-display text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.1] font-bold tracking-[-0.035em]">{app.description}</p>
            </Reveal>

            {app.features.length > 0 && (
              <Reveal className="mt-14">
                <h2 className="eyebrow mb-5 text-mute">{t.app.features}</h2>
                <ol className="border-t border-ink/10">
                  {app.features.map((feature, i) => (
                    <li key={feature} className="flex items-baseline gap-5 border-b border-ink/10 py-4 text-lg">
                      <span className="eyebrow w-6 text-mute tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      {feature}
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}

            {app.requirements && app.requirements.length > 0 && (
              <Reveal className="mt-14">
                <h2 className="eyebrow mb-5 text-mute">{t.app.requirements}</h2>
                <ul className="list-disc space-y-2 pl-5 text-lg">
                  {app.requirements.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal className="rounded-[1.5rem] bg-hero p-6 lg:sticky lg:top-28">
              <h2 className="eyebrow mb-4 text-mute">{t.app.information}</h2>
              <dl>
                {info.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-6 border-t border-ink/10 py-3 text-sm first:border-t-0">
                    <dt className="text-mute">{label}</dt>
                    <dd className="text-right font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
              <h3 className="eyebrow mt-6 mb-3 text-mute">{t.app.technologies}</h3>
              {app.technologies.length > 0 ? (
                <ul className="flex flex-wrap gap-1.5">
                  {app.technologies.map((tech) => (
                    <li key={tech}>
                      <Tag>{tech}</Tag>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-mute">{t.app.stackSoon}</p>
              )}
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Related — with nothing else published, only the way back remains. */}
      <section aria-labelledby={related.length ? "related-title" : undefined} className="bg-hero text-ink">
        <div className={related.length ? "shell py-[clamp(4rem,9vw,8rem)]" : "shell flex justify-center py-[clamp(3rem,6vw,5rem)]"}>
          {related.length ? (
            <>
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <h2 id="related-title" className="h-section text-[clamp(2.25rem,5vw,4.5rem)]">
                  {t.app.related}
                </h2>
                <ButtonLink href={localePath(lang, "/apps")} variant="outline-dark">
                  <Arrow dir="left" /> {t.app.back}
                </ButtonLink>
              </div>
              <ul className="grid gap-3 min-[560px]:grid-cols-2 lg:grid-cols-3">
                {related.map((a, i) => (
                  <Reveal as="li" key={a.id} delay={i * 80}>
                    <AppCard app={a} lang={lang} t={pickStoreDict(t)} />
                  </Reveal>
                ))}
              </ul>
            </>
          ) : (
            <ButtonLink href={localePath(lang, "/apps")} variant="outline-dark">
              <Arrow dir="left" /> {t.app.back}
            </ButtonLink>
          )}
        </div>
      </section>
    </div>
  );
}
