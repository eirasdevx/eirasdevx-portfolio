import type { CSSProperties } from "react";
import type { StoreApp } from "@/types/app";

/** Every app establishes its own scope, including related cards on another app's page. */
export function appThemeStyle(app?: StoreApp): CSSProperties {
  const theme = app?.theme;
  return {
    "--color-hero": theme?.background ?? "#dadada",
    "--color-paper": theme?.surface ?? "#f4f4f4",
    "--color-ink": theme?.foreground ?? "#111111",
    "--color-mute": theme?.muted ?? "#6f6f6f",
    "--color-card": theme?.surface ?? "#d6d6d6",
    "--color-card-dark": theme?.surface ?? "#262626",
    "--app-accent": theme?.accent ?? "#111111",
    "--app-accent-text": theme?.accentText ?? "#f4f4f4",
    "--app-logo-background": app?.logoBackground ?? theme?.background ?? "#dadada",
  } as CSSProperties;
}
