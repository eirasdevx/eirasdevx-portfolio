import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/inter-tight/wght.css";
import "../globals.css";
import { site } from "@/data/site";
import { alternates, getDictionary, hasLocale, locales } from "@/i18n";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: site.name,
    authors: [{ name: site.owner, url: site.github }],
    creator: site.owner,
    alternates: alternates(lang, "/"),
    openGraph: {
      type: "website",
      siteName: site.name,
      title: site.name,
      description: t.meta.description,
      locale: t.meta.ogLocale,
    },
    twitter: { card: "summary_large_image", title: site.name, description: t.meta.description },
  };
}

export const viewport: Viewport = {
  themeColor: "#dadada",
  colorScheme: "light",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Lets CSS hide reveal-on-scroll content only when JS will reveal it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {t.common.skip}
        </a>
        <Navbar lang={lang} t={t.nav} />
        <main id="main">{children}</main>
        <Footer lang={lang} t={t} />
      </body>
    </html>
  );
}
