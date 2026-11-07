import { cn } from "@/lib/utils";

/** Original Gameiras CSS wordmark; compact is a derived avatar, not a fetched icon. */
export function GameirasWordmark({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <span className={cn("gameiras-wordmark", className)} aria-hidden="true">
      g{!compact && <span>ameiras</span>}<i />
    </span>
  );
}
