"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { fmt, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { cn } from "@/lib/utils";
import type { AppCategory, AppStatus, StoreApp } from "@/types/app";
import { Reveal } from "@/components/animations/Reveal";
import { Arrow } from "@/components/ui/Arrow";
import { AppCard, type CardDict } from "./AppCard";

type Sort = keyof Dictionary["store"]["sort"];

interface Filters {
  q: string;
  category: AppCategory | "all";
  platform: string;
  status: AppStatus | "all";
  sort: Sort;
}

const DEFAULTS: Filters = { q: "", category: "all", platform: "all", status: "all", sort: "name-asc" };

export type StoreDict = CardDict & Pick<Dictionary, "store" | "categories">;

function appDate(app: StoreApp) {
  const iso = app.updatedAt ?? app.releaseDate;
  return iso ? Date.parse(iso) : null;
}

function normalize(s: string) {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

function applyFilters(apps: StoreApp[], f: Filters, t: StoreDict, lang: Locale) {
  const q = normalize(f.q.trim());
  const result = apps.filter((app) => {
    if (f.category !== "all" && app.category !== f.category) return false;
    if (f.platform !== "all" && !app.platforms.includes(f.platform)) return false;
    if (f.status !== "all" && app.status !== f.status) return false;
    if (!q) return true;
    const haystack = normalize(
      [app.name, app.tagline, app.description, app.subcategory, t.categories[app.category], ...app.technologies, ...app.platforms].join(" "),
    );
    return haystack.includes(q);
  });

  if (f.sort === "name-asc") result.sort((a, b) => a.name.localeCompare(b.name, lang));
  if (f.sort === "name-desc") result.sort((a, b) => b.name.localeCompare(a.name, lang));
  if (f.sort === "newest" || f.sort === "oldest") {
    const dir = f.sort === "newest" ? -1 : 1;
    // Apps without a known date always go last.
    result.sort((a, b) => {
      const da = appDate(a);
      const db = appDate(b);
      if (da === null && db === null) return 0;
      if (da === null) return 1;
      if (db === null) return -1;
      return (da - db) * dir;
    });
  }
  return result;
}

interface Props {
  apps: StoreApp[];
  lang: Locale;
  t: StoreDict;
  pageSize?: number;
  /** Mirror filters in the query string so a filtered view can be shared. */
  syncUrl?: boolean;
  showFeatured?: boolean;
}

export function AppStore({ apps, lang, t, pageSize = 6, syncUrl = false, showFeatured = true }: Props) {
  const s = t.store;
  const [filters, setFilters] = useState<Filters>(DEFAULTS);
  const [pages, setPages] = useState(1);
  const ids = useId();

  // Read initial filters from the URL once mounted.
  useEffect(() => {
    if (!syncUrl) return;
    const params = new URLSearchParams(window.location.search);
    const next: Filters = {
      q: params.get("q") ?? "",
      category: (params.get("category") as Filters["category"]) ?? "all",
      platform: params.get("platform") ?? "all",
      status: (params.get("status") as Filters["status"]) ?? "all",
      sort: (params.get("sort") as Sort) ?? DEFAULTS.sort,
    };
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from the URL
    setFilters(next);
  }, [syncUrl]);

  useEffect(() => {
    if (!syncUrl) return;
    const params = new URLSearchParams();
    (Object.keys(filters) as (keyof Filters)[]).forEach((key) => {
      if (filters[key] !== DEFAULTS[key]) params.set(key, filters[key]);
    });
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [filters, syncUrl]);

  const update = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((f) => ({ ...f, [key]: value }));
    setPages(1);
  };

  const platforms = useMemo(() => Array.from(new Set(apps.flatMap((a) => a.platforms))).sort(), [apps]);
  const categoryCounts = useMemo(() => {
    const counts = {} as Record<AppCategory, number>;
    for (const key of Object.keys(t.categories) as AppCategory[]) counts[key] = apps.filter((a) => a.category === key).length;
    return counts;
  }, [apps, t.categories]);

  const results = useMemo(() => applyFilters(apps, filters, t, lang), [apps, filters, t, lang]);
  const featured = useMemo(() => apps.filter((a) => a.featured), [apps]);
  const isFiltered = (Object.keys(filters) as (keyof Filters)[]).some((k) => filters[k] !== DEFAULTS[k]);
  const visible = results.slice(0, pages * pageSize);

  return (
    <div>
      {/* Controls */}
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
        <label htmlFor={`${ids}-q`} className="sr-only">
          {s.searchLabel}
        </label>
        <div className="relative">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-mute" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="9" cy="9" r="6" />
            <path d="M13.5 13.5L18 18" strokeLinecap="round" />
          </svg>
          <input
            id={`${ids}-q`}
            type="search"
            value={filters.q}
            onChange={(e) => update("q", e.target.value)}
            placeholder={s.searchPlaceholder}
            autoComplete="off"
            className="field w-full pl-11"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <div>
            <label htmlFor={`${ids}-platform`} className="sr-only">
              {s.platform}
            </label>
            <select id={`${ids}-platform`} value={filters.platform} onChange={(e) => update("platform", e.target.value)} className="field w-full">
              <option value="all">{s.allPlatforms}</option>
              {platforms.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={`${ids}-status`} className="sr-only">
              {s.status}
            </label>
            <select
              id={`${ids}-status`}
              value={filters.status}
              onChange={(e) => update("status", e.target.value as Filters["status"])}
              className="field w-full"
            >
              <option value="all">{s.anyStatus}</option>
              {(Object.keys(t.statuses) as AppStatus[]).map((st) => (
                <option key={st} value={st}>
                  {t.statuses[st]}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor={`${ids}-sort`} className="sr-only">
              {s.sortBy}
            </label>
            <select id={`${ids}-sort`} value={filters.sort} onChange={(e) => update("sort", e.target.value as Sort)} className="field w-full">
              {(Object.keys(s.sort) as Sort[]).map((key) => (
                <option key={key} value={key}>
                  {s.sort[key]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category chips */}
      <div role="group" aria-label={s.categoryGroup} className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {/* Empty categories are left out: a "0" chip only advertises what isn't there. */}
        {(["all", ...Object.keys(t.categories)] as (AppCategory | "all")[])
          .filter((key) => key === "all" || key === filters.category || categoryCounts[key] > 0)
          .map((key) => {
          const active = filters.category === key;
          const count = key === "all" ? apps.length : categoryCounts[key];
          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => update("category", key)}
              className={cn(
                "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-200",
                active ? "border-ink bg-ink text-paper" : "border-ink/15 text-ink/75 hover:border-ink/40 hover:text-ink",
              )}
            >
              {key === "all" ? s.all : t.categories[key]}
              <span className={cn("text-xs tabular-nums", active ? "text-paper/60" : "text-mute")}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Featured */}
      {showFeatured && !isFiltered && featured.length > 0 && (
        <div className="mt-12">
          <h3 className="eyebrow mb-4 flex items-center gap-3 text-mute">
            <span>{s.featured}</span>
            <span aria-hidden="true" className="h-px flex-1 bg-ink/10" />
          </h3>
          <ul className="grid gap-3 min-[560px]:grid-cols-2 lg:grid-cols-3">
            {featured.map((app, i) => (
              <Reveal as="li" key={app.id} delay={i * 80}>
                <AppCard app={app} lang={lang} t={t} tone="dark" />
              </Reveal>
            ))}
          </ul>
        </div>
      )}

      {/* Results */}
      <div className="mt-12">
        <div className="mb-4 flex items-center gap-3">
          <h3 className="eyebrow text-mute">{isFiltered ? s.results : s.allApps}</h3>
          <span aria-hidden="true" className="h-px flex-1 bg-ink/10" />
          <p aria-live="polite" className="text-xs text-mute tabular-nums">
            {fmt(results.length === 1 ? s.countOne : s.countMany, { n: results.length })}
          </p>
          {isFiltered && (
            <button
              type="button"
              onClick={() => {
                setFilters(DEFAULTS);
                setPages(1);
              }}
              className="text-xs font-medium underline underline-offset-4 hover:no-underline"
            >
              {s.reset}
            </button>
          )}
        </div>

        {visible.length > 0 ? (
          <ul className="grid gap-3 min-[560px]:grid-cols-2 lg:grid-cols-3">
            {visible.map((app, i) => (
              <Reveal as="li" key={app.id} delay={(i % 3) * 80}>
                <AppCard app={app} lang={lang} t={t} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-ink/20 px-6 py-16 text-center">
            <p className="font-display text-2xl font-extrabold tracking-[-0.03em]">{s.emptyTitle}</p>
            <p className="mt-2 text-sm text-mute">{s.emptyText}</p>
          </div>
        )}

        {results.length > visible.length && (
          <div className="mt-8 flex justify-center">
            <button type="button" onClick={() => setPages((p) => p + 1)} className="btn btn-outline-dark">
              {s.loadMore} <Arrow dir="down" />
              <span className="text-xs text-mute tabular-nums">
                {visible.length}/{results.length}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
