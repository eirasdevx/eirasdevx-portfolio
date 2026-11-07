import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { categoryLine, getPrimaryAction } from "@/lib/app-meta";
import { cn } from "@/lib/utils";
import { appThemeStyle } from "@/lib/app-theme";
import type { StoreApp } from "@/types/app";
import { AppIcon } from "@/components/ui/AppIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tag } from "@/components/ui/Tag";
import { AppActionLink } from "./AppActionLink";

/** The dictionary slices a store card needs (kept small for client bundles). */
export type CardDict = Pick<Dictionary, "categoryShort" | "statuses" | "actions" | "common"> & {
  store: Pick<Dictionary["store"], "detailsStatus" | "liveOnWeb">;
};

interface Props {
  app: StoreApp;
  lang: Locale;
  t: CardDict;
  tone?: "light" | "dark";
}

export function AppCard({ app, lang, t, tone = "light" }: Props) {
  const action = getPrimaryAction(app, t.actions, lang);
  const dark = !app.theme && tone === "dark";
  const resolvedTone = dark ? "dark" : "light";

  return (
    <article
      style={appThemeStyle(app)}
      data-app={app.slug}
      className={cn(
        "group lift relative flex h-full flex-col rounded-[1.5rem] border p-5",
        app.theme && "app-themed",
        dark ? "border-white/10 bg-card-dark text-paper hover:border-white/25" : cn("border-ink/[0.07] text-ink hover:border-ink/20", app.theme ? "bg-paper" : "bg-paper/80"),
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <AppIcon app={app} />
        <StatusBadge status={app.status} label={t.statuses[app.status]} tone={resolvedTone} />
      </div>

      <h3 className="mt-6 font-display text-2xl leading-none font-extrabold tracking-[-0.04em]">
        <Link href={localePath(lang, `/apps/${app.slug}`)} className="stretched">
          {app.name}
        </Link>
      </h3>
      <p className={cn("mt-1.5 text-xs", dark ? "text-paper/55" : "text-mute")}>{categoryLine(app, t.categoryShort)}</p>
      <p className={cn("mt-4 text-[0.9375rem] leading-snug", dark ? "text-paper/75" : "text-ink/75")}>{app.tagline}</p>

      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-6">
        {app.platforms.map((p) => (
          <Tag key={p} tone={resolvedTone}>
            {p}
          </Tag>
        ))}
        {app.version && <Tag tone={resolvedTone}>v{app.version}</Tag>}
      </div>

      <div className={cn("mt-5 flex items-center justify-between gap-3 border-t pt-4", dark ? "border-white/10" : "border-ink/10")}>
        <span className={cn("text-xs", dark ? "text-paper/50" : "text-mute")}>
          {action.kind === "details" ? t.store.detailsStatus : action.kind === "open" ? t.store.liveOnWeb : ""}
        </span>
        {/* z-10 keeps the action above the card's stretched link */}
        <AppActionLink
          action={action}
          appName={app.name}
          newTabHint={t.common.opensNewTab}
          className={cn("relative z-10 min-h-10 px-4 text-[0.8125rem]", dark ? "btn-light" : "btn-dark")}
        />
      </div>
    </article>
  );
}
