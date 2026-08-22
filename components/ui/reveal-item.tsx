"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface RevealItemProps {
  children: ReactNode;
  /** Stagger delay in ms, applied via inline style since Tailwind can't express arbitrary per-item delays */
  delayMs?: number;
  className?: string;
  /** Opt into the richer framer-motion entrance (opacity/y/scale/blur) instead of the default CSS-transition fade. Self-contained — doesn't need a `RevealSection` ancestor. */
  layered?: boolean;
}

/**
 * Marks an element to be animated by the nearest ancestor `<RevealSection>`.
 * Starts hidden/offset; the reveal hook adds the "revealed" classes once
 * the element scrolls into view.
 *
 * With `layered`, renders its own self-contained `whileInView` entrance
 * (opacity/y/scale/blur "coming into focus") instead — used for project
 * cards and case-study chapter markers, where the effect should read as a
 * step up from the site-wide fade.
 */
export function RevealItem({ children, delayMs = 0, className, layered = false }: RevealItemProps) {
  const reducedMotion = useReducedMotion();

  if (layered) {
    return (
      <motion.div
        initial={reducedMotion ? undefined : { opacity: 0, y: 50, scale: 0.97, filter: "blur(8px)" }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, delay: delayMs / 1000, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      data-animate
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={cn("translate-y-8 opacity-0 transition-all duration-700 ease-out", className)}
    >
      {children}
    </div>
  );
}
