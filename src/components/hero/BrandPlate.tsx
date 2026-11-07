import { site } from "@/data/site";
import { cn, stagger } from "@/lib/utils";
import { TwoLines } from "@/components/ui/BrandMark";
import { Logo } from "@/components/ui/Logo";

/** Dark translucent glass plate floating over the hero visual. */
export function BrandPlate({ role, className }: { role: string; className?: string }) {
  return (
    <div
      className={cn(
        "plate load-fade flex items-center gap-3 rounded-[1.25rem] border border-white/20 bg-black/40 p-2 pr-4 text-paper backdrop-blur-xl backdrop-saturate-50",
        className,
      )}
      style={stagger(900)}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-[0.9rem] bg-paper text-ink">
        <Logo className="size-7" />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block font-display text-base font-extrabold tracking-[-0.03em]">{site.name}</span>
        <span className="eyebrow block text-[0.625rem] text-paper/60">{role}</span>
      </span>
      <TwoLines className="ml-auto size-4 shrink-0 text-paper/70" />
    </div>
  );
}
