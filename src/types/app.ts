/**
 * Store catalog model.
 *
 * Optional fields are optional on purpose: anything not verified stays
 * undefined and the UI hides it instead of showing invented values.
 * The shape maps 1:1 to a future `apps` table (Supabase / PostgreSQL).
 */

import type { Locale } from "@/i18n/config";

/** One value per language: { es: "…", en: "…" }. */
export type Localized<T = string> = Record<Locale, T>;

export type AppCategory = "web" | "mobile" | "desktop" | "game" | "tool" | "experiment";

export type AppStatus = "available" | "beta" | "development" | "coming-soon" | "archived";

/** Decorative placeholder used while an app has no real icon / cover. */
export type ArtworkGlyph = "grid" | "rings" | "stripes" | "arc" | "lens" | "ticket" | "blot" | "track";

export interface AppArtwork {
  glyph: ArtworkGlyph;
  tone: "light" | "dark";
}

export interface AppTheme {
  background: string;
  surface: string;
  foreground: string;
  muted: string;
  accent: string;
  accentText: string;
}

/** Future: one row per published version. */
export interface AppRelease {
  version: string;
  date: string;
  notes: string[];
  files?: AppDownloadFile[];
}

/** Future: installable artifacts served from proper storage. */
export interface AppDownloadFile {
  label: string;
  url: string;
  platform: string;
  sizeBytes?: number;
  /** Integrity metadata, e.g. "sha256-..." */
  checksum?: string;
}

/** Future: only real, measured numbers belong here. */
export interface AppStats {
  downloads?: number;
  updatedAt: string;
}

/** Catalog entry as stored (texts in every language). */
export interface StoreAppSource {
  id: string;
  slug: string;
  name: string;
  tagline: Localized;
  description: Localized;
  category: AppCategory;
  /** Free-form niche shown next to the category, e.g. "Management". */
  subcategory?: Localized;
  platforms: string[];
  technologies: string[];
  status: AppStatus;
  featured: boolean;
  /**
   * Kept in the catalog but not published anywhere: store, projects, detail
   * pages, hero, sitemap and counters all skip it. Remove the flag (or set it
   * to false) once the project is public on GitHub.
   */
  hidden?: boolean;

  icon?: string;
  /** The icon image fills its rounded tile edge to edge, so no outline is drawn around it. */
  iconFullBleed?: boolean;
  /** Original brand artwork, kept separate from interface screenshots. */
  logo?: string;
  logoBackground?: string;
  /** Gameiras publishes an HTML/CSS wordmark rather than an image. */
  wordmark?: "gameiras";
  coverImage?: string;
  screenshots: string[];
  /** Phone captures: shown as tall tiles and never used as the 16:10 cover. */
  screenshotOrientation?: "landscape" | "portrait";
  artwork: AppArtwork;
  theme?: AppTheme;

  version?: string;
  releaseDate?: string;
  updatedAt?: string;

  websiteUrl?: string;
  downloadUrl?: string;
  repositoryUrl?: string;

  features: Localized<string[]>;
  requirements?: Localized<string[]>;

  releases?: AppRelease[];
  stats?: AppStats;
}

/** Catalog entry resolved for one language — what components receive. */
export type StoreApp = Omit<StoreAppSource, "tagline" | "description" | "subcategory" | "features" | "requirements"> & {
  tagline: string;
  description: string;
  subcategory?: string;
  features: string[];
  requirements?: string[];
};
