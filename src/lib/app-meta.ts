import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import type { StoreApp } from "@/types/app";

/** Pure helpers shared by server and client components (no catalog import). */

export function categoryLine(app: StoreApp, categoryShort: Dictionary["categoryShort"]) {
  const short = categoryShort[app.category];
  return app.subcategory ? `${short} / ${app.subcategory}` : short;
}

export type AppAction = {
  kind: "open" | "download" | "source" | "website" | "details" | "soon";
  label: string;
  href?: string;
  external: boolean;
};

/**
 * The one action a card shows. Download / Open only exist when a real URL does.
 */
export function getPrimaryAction(app: StoreApp, t: Dictionary["actions"], lang: Locale): AppAction {
  if (app.status === "coming-soon") return { kind: "soon", label: t.soon, external: false };
  if (app.status !== "archived") {
    if (app.websiteUrl) return { kind: "open", label: t.open, href: app.websiteUrl, external: true };
    if (app.downloadUrl) return { kind: "download", label: t.download, href: app.downloadUrl, external: true };
  }
  return { kind: "details", label: t.details, href: localePath(lang, `/apps/${app.slug}`), external: false };
}

/** Every external action the detail page may show — only those with URLs. */
export function getAppActions(app: StoreApp, t: Dictionary["actions"]): AppAction[] {
  const actions: AppAction[] = [];
  const isWebApp = app.category === "web";
  if (app.websiteUrl)
    actions.push({ kind: isWebApp ? "open" : "website", label: isWebApp ? t.open : t.website, href: app.websiteUrl, external: true });
  if (app.downloadUrl) actions.push({ kind: "download", label: t.download, href: app.downloadUrl, external: true });
  if (app.repositoryUrl) actions.push({ kind: "source", label: t.source, href: app.repositoryUrl, external: true });
  return actions;
}
