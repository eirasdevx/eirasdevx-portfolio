"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** One observer pauses the CSS timelines without resetting their phase. No pointer loop. */
export function CardStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = ref.current;
    if (!stage || !("IntersectionObserver" in window)) return;
    let visible = false;
    const sync = () => {
      stage.dataset.floatActive = String(visible && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(stage);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return <div ref={ref} className="showcase-stage" data-float-active="false">{children}</div>;
}
