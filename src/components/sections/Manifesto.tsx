import type { Dictionary } from "@/i18n";
import { ScrollWords } from "@/components/animations/ScrollWords";
import { Reveal } from "@/components/animations/Reveal";

export function Manifesto({ t }: { t: Dictionary["manifesto"] }) {
  const [closing1, closing2] = t.closing;
  return (
    <section id="manifesto" aria-labelledby="manifesto-label" className="bg-black text-paper">
      <div className="shell py-[clamp(6rem,16vw,14rem)]">
        <p id="manifesto-label" className="eyebrow mb-10 text-center text-paper/50">
          {t.label}
        </p>
        <ScrollWords
          text={t.text}
          className="mx-auto max-w-[22ch] text-center font-display text-[1.75rem] leading-[1.18] font-bold tracking-[-0.035em] md:max-w-[24ch] md:text-[clamp(2.5rem,4.6vw,4.75rem)] md:leading-[1.04]"
        />
        <Reveal className="mt-14 text-center md:mt-20">
          <p className="font-display text-xl leading-tight font-semibold tracking-[-0.02em] text-mute md:text-2xl">
            {closing1}
            <br />
            {closing2}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
