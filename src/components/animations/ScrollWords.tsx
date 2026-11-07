"use client";

import { useEffect, useRef } from "react";

const FROM = 0x6f;
const TO = 0xf4;
const SOFT_EDGE = 3;

export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const spans = Array.from(root.querySelectorAll<HTMLSpanElement>("[data-word]"));
    const last = new Array<number>(spans.length).fill(-1);
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.4;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (rect.height + start - end)));
      const lit = progress * (spans.length + SOFT_EDGE);
      spans.forEach((span, i) => {
        const t = Math.min(1, Math.max(0, (lit - i) / SOFT_EDGE));
        const q = Math.round(t * 100);
        if (q === last[i]) return;
        last[i] = q;
        const c = Math.round(FROM + (TO - FROM) * t);
        span.style.color = `rgb(${c} ${c} ${c})`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    let listening = false;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !listening) {
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        listening = true;
        onScroll();
      } else if (!entry.isIntersecting && listening) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        listening = false;
        update();
      }
    });
    io.observe(root);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return <p ref={ref} className={className}>{words.map((word, i) => <span key={i} data-word="" className="manifesto-word">{word}{i < words.length - 1 ? " " : ""}</span>)}</p>;
}
