import { cn } from "@/lib/utils";

const glyphs = { ne: "↗", down: "↓", up: "↑", left: "←", right: "→" } as const;

export function Arrow({ dir = "ne", className }: { dir?: keyof typeof glyphs; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("arrow", dir === "down" && "arrow-down", dir === "up" && "arrow-up", className)}
    >
      {glyphs[dir]}
    </span>
  );
}
