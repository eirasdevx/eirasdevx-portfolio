import { site } from "@/data/site";
import type { Dictionary } from "@/i18n";
import { Arrow } from "@/components/ui/Arrow";

export function TransitionBar({ t, target = "#manifesto" }: { t: Dictionary["bar"]; target?: string }) {
  return (
    <div className="relative bg-black text-paper">
      <div className="shell grid h-[88px] grid-cols-2 items-center md:h-[110px] md:grid-cols-3">
        <p className="eyebrow tracking-[0.24em]">
          <span className="normal-case">{site.name}</span> / EST {site.established}
        </p>
        <a
          href={target}
          className="eyebrow hidden justify-self-center tracking-[0.24em] text-paper/70 transition-colors hover:text-paper md:inline-flex md:gap-2"
        >
          {t.scroll} <Arrow dir="down" />
        </a>
        <p className="eyebrow justify-self-end text-right tracking-[0.24em]">{t.motto}</p>
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-white/15" />
    </div>
  );
}
