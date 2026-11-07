import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "dark" | "light" | "outline-dark" | "outline-light";

interface Props {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function ButtonLink({ href, children, variant = "dark", external, className, ariaLabel }: Props) {
  const classes = cn("btn", `btn-${variant}`, className);
  const isExternal = external ?? /^(https?:|mailto:)/.test(href);

  if (isExternal) {
    const isMail = href.startsWith("mailto:");
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
