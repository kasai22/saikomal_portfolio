"use client";

import { motion, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import { PARALLAX } from "@/lib/animations/constants";
import { useParallaxTier, useSectionScroll } from "@/hooks/use-scroll-tier";
import { cn } from "@/lib/utils";

export interface ParallaxProps {
  children: ReactNode;
  /** Travel in px across the section's full scroll range. */
  distance?: number;
  className?: string;
}

/**
 * A self-contained scroll-linked layer — measures its own bounds and drifts as
 * it crosses the viewport.
 *
 * Use this for a single isolated element. For a section with several depth
 * tiers, declare one `useSectionScroll` at the section root and derive each
 * layer with `useParallaxTier` instead: every scroll-linked effect runs a
 * callback per frame, and this site already has a smooth-scroll loop running
 * alongside them.
 *
 * Pinned to zero below `md` — see `useMotionTier`.
 */
export function Parallax({ children, distance = PARALLAX.base, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { progress, enabled } = useSectionScroll(ref, ["start end", "end start"]);
  const y = useParallaxTier(progress, distance, enabled);

  return (
    <motion.div ref={ref} style={{ y }} className={cn(className)}>
      {children}
    </motion.div>
  );
}

export interface ParallaxLayerProps {
  children: ReactNode;
  /** A motion value from `useParallaxTier` / `usePointerTier`. */
  y?: MotionValue<number>;
  x?: MotionValue<number>;
  /**
   * Marks this layer as one half of a cross-route shared-element pair. Set
   * through a prop rather than a `style` passthrough so it can't collide
   * with the motion values this component owns.
   */
  viewTransitionName?: string;
  className?: string;
}

/**
 * One depth tier inside a section that already owns its scroll progress.
 *
 * Accepts motion values rather than reading scroll itself, so a five-tier hero
 * costs one scroll subscription instead of five. Values that are pinned to
 * zero (reduced motion, small viewport) can be passed unconditionally — they
 * simply never move.
 */
export function ParallaxLayer({ children, y, x, viewTransitionName, className }: ParallaxLayerProps) {
  return (
    <motion.div style={{ y, x, viewTransitionName }} className={cn(className)}>
      {children}
    </motion.div>
  );
}

export { PARALLAX };
