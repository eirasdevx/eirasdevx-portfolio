"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { fmt } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import type { StoreApp } from "@/types/app";
import { Glyph } from "@/components/ui/Glyph";
import { appThemeStyle } from "@/lib/app-theme";

export function ScreenshotGallery({ app, t }: { app: StoreApp; t: Dictionary["app"] }) {
  const shots = app.screenshots;
  const portrait = app.screenshotOrientation === "portrait";
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + shots.length) % shots.length), [shots.length]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dialog.addEventListener("keydown", onKey);
    return () => dialog.removeEventListener("keydown", onKey);
  }, [step]);

  if (shots.length === 0) {
    return (
      <div>
        <ul
          className="snap-row -mx-[clamp(1rem,2.6vw,2.5rem)] flex gap-3 overflow-x-auto px-[clamp(1rem,2.6vw,2.5rem)] pb-3"
          aria-label={fmt(t.galleryLabel, { name: app.name })}
        >
          {[0, 1, 2].map((i) => (
            <li
              key={i}
              className="relative grid aspect-[9/16] w-[62vw] max-w-[260px] shrink-0 place-items-center overflow-hidden rounded-[1.5rem] border border-dashed border-ink/20 bg-card md:aspect-[16/10] md:w-[min(46vw,560px)] md:max-w-none"
            >
              <Glyph name={app.artwork.glyph} className="size-16 text-ink/15" />
              <span className="eyebrow absolute bottom-4 left-4 text-mute">{fmt(t.screen, { n: String(i + 1).padStart(2, "0") })}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-mute">{t.shotsNote}</p>
      </div>
    );
  }

  return (
    <>
      <ul
        className="snap-row -mx-[clamp(1rem,2.6vw,2.5rem)] flex gap-3 overflow-x-auto px-[clamp(1rem,2.6vw,2.5rem)] pb-3"
        aria-label={fmt(t.galleryLabel, { name: app.name })}
      >
        {shots.map((src, i) => (
          <li key={src} className="shrink-0">
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={fmt(t.enlarge, { n: i + 1, total: shots.length })}
              className={
                portrait
                  ? "group relative block aspect-[1/2] w-[62vw] max-w-[280px] overflow-hidden rounded-[1.5rem] bg-card"
                  : "group relative block aspect-[16/10] w-[78vw] overflow-hidden rounded-[1.5rem] bg-card md:w-[min(46vw,560px)]"
              }
            >
              <Image
                src={src}
                alt=""
                fill
                sizes={portrait ? "(min-width: 760px) 280px, 62vw" : "(min-width: 760px) 46vw, 78vw"}
                className="zoom-img object-cover object-top"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        style={appThemeStyle()}
        ref={dialogRef}
        aria-label={fmt(t.galleryLabel, { name: app.name })}
        className={
          portrait
            ? "lightbox m-auto max-h-[96svh] w-[min(92vw,calc((92svh-4rem)/2))] bg-transparent p-0 text-paper"
            : "lightbox m-auto max-h-[92svh] w-[min(92vw,1280px)] bg-transparent p-0 text-paper"
        }
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className={`relative w-full overflow-hidden rounded-[1.25rem] ${portrait ? "aspect-[1/2]" : "aspect-[16/10]"}`}>
          <Image
            src={shots[index]}
            alt={fmt(t.shotAlt, { n: index + 1, name: app.name })}
            fill
            sizes={portrait ? "(min-width: 760px) 460px, 92vw" : "92vw"}
            className="object-contain"
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-sm text-paper/70 tabular-nums">
            {index + 1} / {shots.length}
          </p>
          <div className="flex gap-2">
            {shots.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} className="btn btn-outline-light" aria-label={t.prev}>
                  ←
                </button>
                <button type="button" onClick={() => step(1)} className="btn btn-outline-light" aria-label={t.next}>
                  →
                </button>
              </>
            )}
            <button type="button" onClick={close} className="btn btn-light" autoFocus>
              {t.close}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
