import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { localePath, locales } from "@/i18n";
import { getApps, getProjects } from "@/lib/catalog";

/** Every page in both languages, each entry listing its translations. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/apps",
    "/projects",
    "/about",
    "/contact",
    ...getApps("es").map((app) => `/apps/${app.slug}`),
    ...getProjects("es").map((p) => `/projects/${p.slug}`),
  ];

  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${site.url}${localePath(lang, path)}`,
      priority: path === "/" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${site.url}${localePath(l, path)}`])),
      },
    })),
  );
}
