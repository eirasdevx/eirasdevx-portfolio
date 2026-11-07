import Image from "next/image";
import { cn } from "@/lib/utils";
import { appThemeStyle } from "@/lib/app-theme";
import type { StoreApp } from "@/types/app";
import { Glyph } from "./Glyph";
import { GameirasWordmark } from "./GameirasWordmark";

const sizes = {
  sm: "size-11 rounded-[12px]",
  md: "size-14 rounded-[16px]",
  lg: "size-24 rounded-[26px] md:size-32 md:rounded-[34px]",
};

export function AppIcon({ app, size = "md", className }: { app: StoreApp; size?: keyof typeof sizes; className?: string }) {
  const dark = !app.theme && app.artwork.tone === "dark";
  return (
    <span
      style={{ ...appThemeStyle(app), backgroundColor: app.logoBackground ?? app.theme?.background }}
      className={cn(
        "app-icon relative inline-grid shrink-0 place-items-center overflow-hidden",
        !(app.icon && app.iconFullBleed) && "border",
        dark ? "border-white/10 bg-ink text-paper" : "border-ink/10 bg-paper text-ink",
        sizes[size],
        className,
      )}
    >
      {app.icon ? (
        <Image src={app.icon} alt="" fill sizes="128px" className="object-contain" />
      ) : app.wordmark === "gameiras" ? (
        <GameirasWordmark compact className={size === "lg" ? "text-7xl" : "text-3xl"} />
      ) : (
        <Glyph name={app.artwork.glyph} className="size-[62%]" />
      )}
    </span>
  );
}
