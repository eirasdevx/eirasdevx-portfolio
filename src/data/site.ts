/**
 * Site-wide configuration. Everything personal and editable lives here.
 * Visible texts live in src/i18n/dictionaries.
 */

const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

export const site = {
  name: "eiras.devx",
  owner: "Serafín Eiras",
  established: 2026,
  buildingSince: 2024,
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  /** Undefined hides every email action across the site. */
  email: email || undefined,
  github: "https://github.com/eirasdevx",
  availability: { open: true },
  /**
   * Monochrome logo with a transparent background. It is used as a mask, so
   * it takes the text colour of wherever it is placed (black or white).
   */
  logo: { src: "/brand/logo.png" as string | undefined },
  /** Project shown in the hero "Discover Project" card. */
  heroProjectSlug: "dead-ink",
} as const;

export const navLinks = [
  { href: "/", key: "home" },
  { href: "/apps", key: "apps" },
  { href: "/projects", key: "projects" },
  { href: "/about", key: "about" },
] as const;

export const heroStack = ["TypeScript", "Next.js", "C#", "SQL", "Unity", "Python"];

/** Edit freely: only list technologies you actually work with. Titles come from the dictionary. */
export const skillGroups = [
  { key: "frontend", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { key: "backend", items: ["C#", "SQL", "PostgreSQL", "Prisma", "Supabase"] },
  { key: "tools", items: ["Git", "GitHub", "Docker", "Unity", "Android Studio"] },
] as const;
