import { apps as allApps } from "@/data/apps";
import { projects as allProjects } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { StoreApp, StoreAppSource } from "@/types/app";
import type { CaseStudy, Project } from "@/types/project";

/**
 * Data access layer. Components never import from /data directly, so moving
 * the catalog to Supabase / PostgreSQL only means rewriting these functions
 * (they can become async without touching the visual components' props).
 * Every getter resolves texts for one language.
 *
 * Hidden apps are filtered out HERE and only here, so no page, card, search,
 * sitemap entry or counter can show them. A project is published only while
 * its app is.
 */
const apps = allApps.filter((app) => !app.hidden);
const visibleSlugs = new Set(apps.map((app) => app.slug));
const projects = allProjects.filter((p) => !p.appSlug || visibleSlugs.has(p.appSlug));

function resolveApp(app: StoreAppSource, lang: Locale): StoreApp {
  return {
    ...app,
    tagline: app.tagline[lang],
    description: app.description[lang],
    subcategory: app.subcategory?.[lang],
    features: app.features[lang],
    requirements: app.requirements?.[lang],
  };
}

export function getApps(lang: Locale): StoreApp[] {
  return apps.map((app) => resolveApp(app, lang));
}

export function getAppBySlug(slug: string, lang: Locale): StoreApp | undefined {
  const app = apps.find((a) => a.slug === slug);
  return app ? resolveApp(app, lang) : undefined;
}

export function getFeaturedApps(lang: Locale): StoreApp[] {
  return getApps(lang).filter((app) => app.featured);
}

/** Same category first, then anything else, never the app itself. */
export function getRelatedApps(app: StoreApp, lang: Locale, limit = 3): StoreApp[] {
  const others = getApps(lang).filter((a) => a.id !== app.id);
  const same = others.filter((a) => a.category === app.category);
  const rest = others.filter((a) => a.category !== app.category);
  return [...same, ...rest].slice(0, limit);
}

export function getCatalogStats() {
  return {
    total: apps.length,
    available: apps.filter((a) => a.status === "available").length,
    categories: new Set(apps.map((a) => a.category)).size,
  };
}

// ── Projects ────────────────────────────────────────────────────────────────

export type ResolvedProject = Omit<Project, "type" | "summary" | "caseStudy"> & {
  name: string;
  type: string;
  summary: string;
  caseStudy: CaseStudy;
  app?: StoreApp;
  technologies: string[];
};

function resolveProject(project: Project, lang: Locale): ResolvedProject {
  const app = project.appSlug ? getAppBySlug(project.appSlug, lang) : undefined;
  return {
    ...project,
    type: project.type[lang],
    summary: project.summary[lang],
    caseStudy: project.caseStudy[lang],
    app,
    name: project.name ?? app?.name ?? project.slug,
    technologies: app?.technologies ?? [],
  };
}

export function getProjects(lang: Locale): ResolvedProject[] {
  return projects.map((p) => resolveProject(p, lang));
}

export function getProjectBySlug(slug: string, lang: Locale): ResolvedProject | undefined {
  const project = projects.find((p) => p.slug === slug);
  return project ? resolveProject(project, lang) : undefined;
}

export function getProjectForApp(appSlug: string, lang: Locale): ResolvedProject | undefined {
  const project = projects.find((p) => p.appSlug === appSlug);
  return project ? resolveProject(project, lang) : undefined;
}
