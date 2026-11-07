"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { navLinks, site } from "@/data/site";
import { localePath, stripLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { cn } from "@/lib/utils";
import { Arrow } from "@/components/ui/Arrow";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitch } from "./LanguageSwitch";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar({ lang, t }: { lang: Locale; t: Dictionary["nav"] }) {
  const pathname = stripLocale(usePathname());
  const activeIndex = navLinks.findIndex((l) => isActive(pathname, l.href));
  const [hovered, setHovered] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const target = hovered ?? (activeIndex >= 0 ? activeIndex : null);

  const placeIndicator = useCallback(() => {
    const indicator = indicatorRef.current;
    if (!indicator) return;
    const link = target === null ? null : linkRefs.current[target];
    if (!link) {
      indicator.style.opacity = "0";
      return;
    }
    indicator.style.opacity = "1";
    indicator.style.width = `${link.offsetWidth}px`;
    indicator.style.transform = `translateX(${link.offsetLeft}px)`;
  }, [target]);

  useLayoutEffect(placeIndicator, [placeIndicator]);

  useEffect(() => {
    window.addEventListener("resize", placeIndicator);
    // Fonts change link widths once they finish loading.
    document.fonts?.ready.then(placeIndicator);
    return () => window.removeEventListener("resize", placeIndicator);
  }, [placeIndicator]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !menuButtonRef.current?.contains(t)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    menuRef.current?.querySelector("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "load-nav pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between gap-3 transition-[padding] duration-500",
        "px-[clamp(0.75rem,2.6vw,2.5rem)]",
        scrolled ? "pt-3" : "pt-4 md:pt-6",
      )}
    >
      {/* Desktop pill */}
      <nav
        aria-label={t.main}
        className={cn(
          "pointer-events-auto relative hidden items-center rounded-full bg-white p-1 transition-shadow duration-500 md:flex",
          scrolled && "shadow-[0_6px_24px_-12px_rgb(0_0_0/0.35)]",
        )}
        onMouseLeave={() => setHovered(null)}
      >
        <Link href={localePath(lang, "/")} aria-label={t.homeAria} className="mr-1 grid size-10 place-items-center rounded-full text-ink">
          <Logo className="size-5" />
        </Link>
        <div className="relative flex items-center">
          <span
            ref={indicatorRef}
            aria-hidden="true"
            className="absolute top-0 left-0 h-full rounded-full bg-ink opacity-0 transition-[transform,width,opacity] duration-500 ease-out-expo"
          />
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={localePath(lang, link.href)}
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              aria-current={i === activeIndex ? "page" : undefined}
              onMouseEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              className={cn(
                "relative z-10 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:outline-offset-0",
                target === i ? "text-paper" : "text-ink/70 hover:text-ink",
              )}
            >
              {t[link.key]}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile pill */}
      <div className="pointer-events-auto relative md:hidden">
        <div className="flex items-center gap-1 rounded-full bg-white p-1">
          <Link href={localePath(lang, "/")} aria-label={t.homeAria} className="flex h-10 items-center gap-2 rounded-full pr-2 pl-3 text-ink">
            <Logo className="size-4" />
            <span className="font-display text-sm font-extrabold tracking-[-0.03em]">{site.name}</span>
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-paper"
          >
            <span>{menuOpen ? t.close : t.menu}</span>
            <span aria-hidden="true" className="relative block h-2 w-3.5">
              <span className={cn("absolute left-0 h-px w-full bg-current transition-transform duration-300", menuOpen ? "top-1 rotate-45" : "top-0")} />
              <span className={cn("absolute left-0 h-px w-full bg-current transition-transform duration-300", menuOpen ? "top-1 -rotate-45" : "top-2")} />
            </span>
          </button>
        </div>

        <div
          id="mobile-menu"
          ref={menuRef}
          hidden={!menuOpen}
          className="absolute top-[calc(100%+0.5rem)] left-0 w-[min(20rem,calc(100vw-1.5rem))] rounded-[1.75rem] bg-white p-2"
        >
          <nav aria-label={t.main}>
            <ul>
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <Link
                    href={localePath(lang, link.href)}
                    aria-current={i === activeIndex ? "page" : undefined}
                    className={cn(
                      "flex min-h-12 items-center justify-between rounded-[1.25rem] px-4 font-display text-2xl font-bold tracking-[-0.04em]",
                      i === activeIndex ? "bg-ink text-paper" : "text-ink",
                    )}
                  >
                    {t[link.key]}
                    <Arrow className="text-base" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-2 flex items-center justify-between border-t border-ink/10 px-2 pt-2">
            <span className="eyebrow text-mute">{t.language}</span>
            <LanguageSwitch lang={lang} label={t.language} className="bg-hero" />
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="pointer-events-auto flex items-center gap-2">
        {site.availability.open && (
          // Shown once the hero (which has its own availability pill) scrolls away.
          <p
            className={cn(
              "hidden h-12 items-center gap-2 rounded-full bg-white px-4 text-sm text-ink transition-opacity duration-500 lg:flex",
              scrolled ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <span aria-hidden="true" className="dot-live size-2 rounded-full bg-ink" />
            {t.available}
          </p>
        )}
        <LanguageSwitch lang={lang} label={t.language} className="hidden md:flex" />
        <Link href={localePath(lang, "/contact")} className="btn btn-dark hidden md:inline-flex">
          {t.contact} <Arrow />
        </Link>
        <Link href={localePath(lang, "/contact")} aria-label={t.contact} className="grid size-12 place-items-center rounded-[14px] bg-ink text-lg text-paper md:hidden">
          <Arrow />
        </Link>
      </div>
    </header>
  );
}
