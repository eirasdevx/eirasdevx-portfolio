import { site, skillGroups } from "@/data/site";
import { localePath, type Dictionary, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/Reveal";
import { Arrow } from "@/components/ui/Arrow";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Logo } from "@/components/ui/Logo";

interface Props {
  lang: Locale;
  t: Dictionary;
  /** Home shows a teaser with a link to the full page. */
  compact?: boolean;
  headingLevel?: "h1" | "h2";
}

export function AboutSection({ lang, t, compact = false, headingLevel = "h2" }: Props) {
  const Heading = headingLevel;
  const a = t.about;
  return (
    <section id="about" aria-labelledby="about-title" className="bg-hero text-ink">
      <div className={cn("shell", compact ? "py-[clamp(5rem,11vw,10rem)]" : "pt-32 pb-[clamp(5rem,11vw,10rem)] md:pt-44")}>
        <Reveal>
          <p className="eyebrow mb-5 flex gap-3 text-mute">
            <span>(04)</span>
            <span>{a.label}</span>
          </p>
          <Heading id="about-title" className="h-section max-w-[14ch]">
            {a.title}
          </Heading>
        </Reveal>

        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-6">
          {/* Identity card */}
          <Reveal className="lg:col-span-4">
            <div className="flex aspect-[4/5] max-h-[560px] w-full flex-col justify-between rounded-[1.75rem] bg-ink p-6 text-paper">
              <div className="flex items-start justify-between">
                <Logo className="size-14 text-paper" />
                <span className="eyebrow text-paper/50">DAM · Est. {site.established}</span>
              </div>
              <div>
                <p className="display text-[clamp(3rem,6vw,5.5rem)]">
                  Serafín
                  <br />
                  Eiras
                </p>
                <p className="eyebrow mt-5 text-paper/55">{t.common.role}</p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="font-display text-[clamp(1.6rem,2.8vw,2.6rem)] leading-[1.05] font-bold tracking-[-0.035em]">{a.lead}</p>
            </Reveal>
            <Reveal delay={100} className="mt-8 grid gap-5 text-lg leading-relaxed text-ink/75 md:grid-cols-2">
              <p>{a.p1}</p>
              <p>{a.p2}</p>
            </Reveal>

            {!compact && (
              <Reveal delay={150} className="mt-8">
                <p className="text-lg leading-relaxed text-ink/75">{a.p3}</p>
              </Reveal>
            )}

            <div className="mt-12 grid gap-3 md:grid-cols-3">
              {skillGroups.map((group, i) => (
                <Reveal key={group.key} delay={i * 80} className="rounded-[1.5rem] border border-ink/10 bg-paper/50 p-5">
                  <h3 className="eyebrow text-mute">{a.groups[group.key]}</h3>
                  <ul className="mt-4 flex flex-col">
                    {group.items.map((item) => (
                      <li key={item} className="border-t border-ink/10 py-2 text-[0.9375rem] first:border-t-0">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            {compact && (
              <Reveal className="mt-10">
                <ButtonLink href={localePath(lang, "/about")} variant="outline-dark">
                  {a.more} <Arrow />
                </ButtonLink>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
