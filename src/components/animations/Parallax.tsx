"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Parallax({ children, speed = 0.12, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const desktop = window.matchMedia("(min-width: 760px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let active = false;
    const update = () => {
      frame = 0;
      const offset = Math.min(window.scrollY, window.innerHeight * 1.2) * speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([entry]) => {
      const shouldRun = entry.isIntersecting && desktop.matches;
      if (shouldRun && !active) window.addEventListener("scroll", onScroll, { passive: true });
      if (!shouldRun && active) window.removeEventListener("scroll", onScroll);
      active = shouldRun;
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [speed]);
  return <div ref={ref} className={className} style={{ willChange: "transform" }}>{children}</div>;
}
