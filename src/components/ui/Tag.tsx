import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tag({ children, tone = "light", className }: { children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full border px-2.5 text-[0.6875rem] font-medium tracking-[0.01em] whitespace-nowrap",
        tone === "light" ? "border-ink/15 text-ink/75" : "border-white/20 text-paper/75",
        className,
      )}
    >
      {children}
    </span>
  );
}
