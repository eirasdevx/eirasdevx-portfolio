import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/Reveal";

interface Props {
  index: string;
  label: string;
  title: ReactNode;
  subtitle?: string;
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
  children?: ReactNode;
}

export function SectionHeading({ index, label, title, subtitle, tone = "light", as: Tag = "h2", className, children }: Props) {
  const muted = tone === "light" ? "text-mute" : "text-paper/55";
  return (
    <header className={cn("grid gap-6 md:grid-cols-12 md:items-end", className)}>
      <Reveal className="md:col-span-8">
        <p className={cn("eyebrow mb-5 flex gap-3", muted)}>
          <span>({index})</span>
          <span>{label}</span>
        </p>
        <Tag className="h-section">{title}</Tag>
      </Reveal>
      {(subtitle || children) && (
        <Reveal className="md:col-span-4 md:pb-2" delay={120}>
          {subtitle && <p className={cn("max-w-sm text-lg leading-snug md:ml-auto md:text-right", muted)}>{subtitle}</p>}
          {children}
        </Reveal>
      )}
    </header>
  );
}
