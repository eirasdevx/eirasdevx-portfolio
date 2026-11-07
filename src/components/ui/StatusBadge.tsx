import { cn } from "@/lib/utils";
import type { AppStatus } from "@/types/app";

/** Monochrome status language: filled = live, ring = in progress, dashed = later. */
const dot: Record<AppStatus, string> = {
  available: "bg-current",
  beta: "bg-current opacity-60",
  development: "border border-current",
  "coming-soon": "border border-dashed border-current",
  archived: "bg-current opacity-30",
};

interface Props {
  status: AppStatus;
  label: string;
  tone?: "light" | "dark";
  className?: string;
}

export function StatusBadge({ status, label, tone = "light", className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-[0.6875rem] font-medium whitespace-nowrap",
        tone === "light" ? "bg-ink/[0.06] text-ink" : "bg-white/10 text-paper",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", dot[status])} />
      {label}
    </span>
  );
}
