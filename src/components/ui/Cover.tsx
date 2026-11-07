import Image from "next/image";
import { cn } from "@/lib/utils";
import { appThemeStyle } from "@/lib/app-theme";
import type { StoreApp } from "@/types/app";
import { Glyph } from "./Glyph";
import { GameirasWordmark } from "./GameirasWordmark";

interface Props {
  app: StoreApp;
  tone?: "light" | "dark";
  className?: string;
  sizes?: string;
  /** Show the oversized wordmark on generated covers. */
  wordmark?: boolean;
  /** Show the brand logo when the app has one, ahead of the icon or screenshots. */
  preferLogo?: boolean;
}

/**
 * Real cover image when the app has one; otherwise an editorial composition
 * (oversized glyph + cropped wordmark). Never pretends to be a screenshot.
 */
export function Cover({ app, tone, className, sizes = "(min-width: 1080px) 50vw, 100vw", wordmark = true, preferLogo = false }: Props) {
  const dark = !app.theme && (tone ?? app.artwork.tone) === "dark";

  if (preferLogo && app.logo) {
    return (
      <div className={cn("relative overflow-hidden", className)} style={{ ...appThemeStyle(app), backgroundColor: app.logoBackground }}>
        <div className="absolute inset-[12%]">
          <Image src={app.logo} alt={app.name} fill sizes={sizes} className="zoom-img object-contain" />
        </div>
      </div>
    );
  }

  if (app.coverIcon && app.icon) {
    return (
      <div className={cn("relative overflow-hidden", className)} style={{ ...appThemeStyle(app), backgroundColor: app.logoBackground }}>
        <Image src={app.icon} alt={app.name} fill sizes={sizes} className="zoom-img object-contain" />
      </div>
    );
  }

  const coverImage = app.coverImage ?? (app.screenshotOrientation === "portrait" ? undefined : app.screenshots[0]);

  if (coverImage) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image src={coverImage} alt={app.name} fill sizes={sizes} className="zoom-img object-cover object-top" />
      </div>
    );
  }

  if (app.logo || app.wordmark) {
    return (
      <div className={cn("relative overflow-hidden [container-type:inline-size]", className)} style={{ ...appThemeStyle(app), backgroundColor: app.logoBackground }}>
        <div className="absolute inset-[15%] flex items-center justify-center" aria-hidden="true">
          {app.logo ? (
            <Image src={app.logo} alt="" fill sizes={sizes} className="zoom-img object-contain" />
          ) : (
            <GameirasWordmark className="text-[clamp(1rem,14cqw,6rem)]" />
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={appThemeStyle(app)}
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden",
        dark ? "bg-card-dark text-paper" : "bg-card text-ink",
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <Glyph name={app.artwork.glyph} className="zoom-img absolute -right-[8%] -bottom-[12%] h-[92%] w-auto opacity-90" />
      {wordmark && (
        <span className="display absolute -bottom-[0.12em] left-[0.04em] text-[clamp(3rem,9vw,8rem)] whitespace-nowrap opacity-[0.12]">
          {app.name}
        </span>
      )}
    </div>
  );
}
