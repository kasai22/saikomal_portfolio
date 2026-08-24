"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useMotionPreference } from "@/hooks/use-motion-preference";

/**
 * Momentum scrolling for the whole document.
 *
 * Pre-existing architecture, retained deliberately: everything scroll-linked
 * on this site — reveals, parallax tiers, the progress bar — was tuned against
 * it, and native scroll makes those read as jumpy. It is not a new dependency.
 *
 * Fully opt-out under `prefers-reduced-motion`: Lenis is never constructed, so
 * the browser's own scrolling is left completely untouched. It also takes over
 * in-page anchor jumps, which is why the CSS `scroll-behavior` is disabled
 * while it runs.
 *
 * The preference now comes from `useMotionPreference` (`useSyncExternalStore`),
 * so it is correct on the very first render — the previous effect-based hook
 * reported "motion allowed" on that render, which meant Lenis was constructed
 * and then immediately destroyed for reduced-motion users.
 */
export function SmoothScroll() {
  const reduced = useMotionPreference();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      // Matches the settle curve used by every reveal on the site.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    document.documentElement.classList.add("lenis-active");

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // In-page nav links must go through Lenis, or the browser's instant jump
    // fights the momentum loop.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href^="#"], a[href^="/#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const id = href.slice(href.indexOf("#") + 1);
      const target = id && document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -72 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("lenis-active");
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
