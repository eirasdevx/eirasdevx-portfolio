import Link from "next/link";
import { localePath, type Dictionary, type Locale } from "@/i18n";
import { categoryLine } from "@/lib/app-meta";
import type { StoreApp } from "@/types/app";
import { Arrow } from "@/components/ui/Arrow";
import { Cover } from "@/components/ui/Cover";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface Props {
  app: StoreApp;
  index: number;
  total: number;
  lang: Locale;
  t: Dictionary;
}

export function FeaturedAppCard({ app, index, total, lang, t }: Props) {
  return (
    <article className="group lift relative rounded-[1.5rem] bg-card p-2">
      <Cover app={app} className="aspect-[16/10] rounded-[1.1rem]" sizes="(min-width: 1080px) 24vw, 100vw" wordmark={false} />

      <div className="flex items-start gap-3 px-3 pt-4 pb-3">
        <div className="min-w-0 flex-1">
          <p className="eyebrow mb-2 text-mute">{t.hero.featuredApp}</p>
          <h2 className="font-display text-2xl leading-none font-extrabold tracking-[-0.04em]">
            <Link href={localePath(lang, `/apps/${app.slug}`)} className="stretched focus-visible:outline-none">
              {app.name}
            </Link>
          </h2>
          <p className="mt-2 text-sm text-mute">{categoryLine(app, t.categoryShort)}</p>
        </div>
        <span
          aria-hidden="true"
          className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover:scale-105"
        >
          <Arrow />
        </span>
      </div>

      <div className="flex items-center gap-3 px-3 pb-2">
        <StatusBadge status={app.status} label={t.statuses[app.status]} />
        <div aria-hidden="true" className="ml-auto flex items-center gap-2 text-[0.6875rem] text-mute tabular-nums">
          <span>{String(index).padStart(2, "0")}</span>
          <span className="relative block h-px w-14 overflow-hidden bg-ink/15">
            <span
              className="absolute inset-y-0 left-0 origin-left bg-ink"
              style={{ width: `${(index / total) * 100}%`, animation: "progress 1.6s var(--ease-out-expo) both 900ms" }}
            />
          </span>
          <span>{String(total).padStart(2, "0")}</span>
        </div>
      </div>
    </article>
  );
}
