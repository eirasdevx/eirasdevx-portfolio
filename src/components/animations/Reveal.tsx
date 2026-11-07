"use client";

import { stagger } from "@/lib/utils";
import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/** One IntersectionObserver shared by every Reveal on the page. */
let observer: IntersectionObserver | null = null;
function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        }
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  }
  return observer;
}
interface Props {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  id?: string;
}
export function Reveal({ children, as: Tag = "div", className, delay, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);
  return <Tag ref={ref} id={id} data-reveal="" className={className} style={delay ? stagger(delay) : undefined}>{children}</Tag>;
}
