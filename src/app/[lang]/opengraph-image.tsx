import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { getDictionary, hasLocale, locales } from "@/i18n";

export const alt = `${site.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(hasLocale(lang) ? lang : "es");
  const logo = await readFile(path.join(process.cwd(), "public/brand/logo-black-bg.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#dadada",
          color: "#111",
          padding: 64,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, letterSpacing: 4 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img */}
          <img src={logoSrc} width={88} height={88} alt="" style={{ borderRadius: 20 }} />
          <span>EST. {site.established}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 190, fontWeight: 800, lineHeight: 0.85, letterSpacing: -10 }}>
          <span>EIRAS.</span>
          <span>DEVX</span>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#6f6f6f" }}>{t.meta.concept}</div>
      </div>
    ),
    size,
  );
}
