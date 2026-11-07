import Link from "next/link";
import { heroStack, site } from "@/data/site";
import { localePath, type Dictionary, type Locale } from "@/i18n";
import { getCatalogStats } from "@/lib/catalog";
import { Counter } from "@/components/animations/Counter";
import { Arrow } from "@/components/ui/Arrow";
import { Tag } from "@/components/ui/Tag";

/** Editorial stat cards. Every figure comes from config or the catalog. */
export function StatCards({ lang, t }: { lang: Locale; t: Dictionary }) {
  const { total } = getCatalogStats();
  return (
    <div className="grid gap-2 sm:grid-cols-[1.25fr_1fr]">
      <div className="flex flex-col justify-between rounded-[1.5rem] bg-card p-5">
        <p className="eyebrow text-mute">{t.hero.buildingSince}</p>
        <p className="display mt-6 text-[clamp(3.5rem,6vw,5rem)]">{site.buildingSince}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t.hero.mainTech}>
          {heroStack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>
      </div>

      <Link href={localePath(lang, "/apps")} className="group lift flex flex-col justify-between rounded-[1.5rem] bg-ink p-5 text-paper">
        <span className="flex items-center justify-between">
          <span className="eyebrow text-paper/55">{t.hero.catalog}</span>
          <Arrow className="text-paper/70" />
        </span>
        <span className="display mt-6 block text-[clamp(3.5rem,6vw,5rem)]">
          <Counter value={total} suffix="+" />
        </span>
        <span className="mt-3 block text-sm text-paper/70">{t.hero.appsProjects}</span>
      </Link>
    </div>
  );
}
