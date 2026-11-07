import type { ReactNode } from "react";
import { stagger } from "@/lib/utils";

interface Props {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}

/** Light editorial header for inner pages; matches the hero palette. */
export function PageHeader({ label, title, intro, children }: Props) {
  return (
    <section className="bg-hero text-ink">
      <div className="shell pt-32 pb-12 md:pt-44 md:pb-16">
        <p className="eyebrow load-fade mb-6 text-mute" style={stagger(200)}>
          {label}
        </p>
        <h1 className="display text-[clamp(3.25rem,12vw,11rem)]">
          <span className="mask-line">
            <span style={stagger(250)}>{title}</span>
          </span>
        </h1>
        {intro && (
          <div className="load-fade mt-8 max-w-xl text-lg leading-snug text-ink/70 md:text-xl" style={stagger(450)}>
            {intro}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
