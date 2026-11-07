import Link from "next/link";
import type { AppAction } from "@/lib/app-meta";
import { cn } from "@/lib/utils";
import { Arrow } from "@/components/ui/Arrow";

interface Props {
  action: AppAction;
  appName: string;
  /** Appended to the accessible name of external links. */
  newTabHint: string;
  className?: string;
}

/** Renders a store action. "Coming Soon" is a disabled label, never a link. */
export function AppActionLink({ action, appName, newTabHint, className }: Props) {
  if (!action.href) {
    return (
      <span aria-disabled="true" className={cn("btn", className)}>
        {action.label}
      </span>
    );
  }
  const label = `${action.label}: ${appName}${action.external ? ` ${newTabHint}` : ""}`;
  const content = (
    <>
      {action.label} <Arrow />
    </>
  );
  return action.external ? (
    <a href={action.href} target="_blank" rel="noopener noreferrer" aria-label={label} className={cn("btn", className)}>
      {content}
    </a>
  ) : (
    <Link href={action.href} aria-label={label} className={cn("btn", className)}>
      {content}
    </Link>
  );
}
