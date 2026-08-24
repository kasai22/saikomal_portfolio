"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { SPRING_PROGRESS } from "@/lib/animations/springs";

/**
 * A hairline at the very top of the viewport whose width tracks page scroll.
 * Mounted once in the root layout.
 *
 * Deliberately set at 1px in flat brand, not a 2px gradient bar: this site's
 * visual language is hairline rules and square corners — `--rule` and
 * `--rule-strong` set that vocabulary — and a gradient bar reads as chrome
 * borrowed from a different design system. It sits on a faint track so the
 * indicator still has a frame of reference at 2% progress.
 *
 * Reads native scroll via `useScroll` and never intercepts it, and animates
 * `scaleX` rather than `width` so it stays on the compositor. Decorative,
 * hence `aria-hidden` — progress through a document is already conveyed by
 * the scrollbar.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, SPRING_PROGRESS);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-px bg-[color:var(--rule)]"
    >
      <motion.div className="h-full w-full origin-left bg-brand" style={{ scaleX }} />
    </div>
  );
}
