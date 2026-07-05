"use client";

import { useEffect, useRef } from "react";

/**
 * Attach the returned ref to a container. Any descendant marked with
 * `data-animate` will fade + slide into place the first time it enters
 * the viewport. Mirrors the original per-section implementation, just
 * de-duplicated into a single shared hook.
 */
export function useRevealOnScroll<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 },
    );

    const targets = container.querySelectorAll("[data-animate]");
    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return ref;
}
