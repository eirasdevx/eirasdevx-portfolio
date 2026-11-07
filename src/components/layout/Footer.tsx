import Link from "next/link";
import { navLinks, site } from "@/data/site";
import { fmt, localePath, type Dictionary, type Locale } from "@/i18n";
import { Arrow } from "@/components/ui/Arrow";
import { Logo } from "@/components/ui/Logo";

export function Footer({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <footer aria-label={t.footer.aria} className="bg-black text-paper">
      <div className="shell border-t border-white/15 py-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <Logo className="size-14 shrink-0 text-paper md:size-16" />
              <p className="display text-[clamp(2.5rem,6vw,5rem)]">{site.name}</p>
            </div>
            <p className="mt-4 max-w-xs text-sm text-paper/55">{t.meta.concept}</p>
          </div>

          <nav aria-label={t.footer.aria} className="md:col-span-4">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(lang, link.href)}
                    className="inline-flex min-h-10 items-center text-paper/70 transition-colors hover:text-paper"
                  >
                    {t.nav[link.key]}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-1.5 text-paper/70 transition-colors hover:text-paper"
                >
                  GitHub <Arrow />
                </a>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-3 md:justify-self-end">
            <a href="#top" className="btn btn-outline-light">
              {t.footer.backToTop} <Arrow dir="up" />
            </a>
          </div>
        </div>

        <div className="eyebrow mt-14 flex flex-col gap-2 border-t border-white/15 pt-6 text-paper/45 md:flex-row md:justify-between">
          <p>
            © {site.established} {site.name}
          </p>
          <p>{fmt(t.footer.designed, { owner: site.owner })}</p>
        </div>
      </div>
    </footer>
  );
}
