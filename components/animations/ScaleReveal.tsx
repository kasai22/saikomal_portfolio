"use client";

import { motion } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { VIEWPORT } from "@/lib/animations/constants";
import { ENTER_SLOW, delayed } from "@/lib/animations/transitions";
import { scaleReveal, type Direction } from "@/lib/animations/variants";
import { resolveDistance, type DistanceKey } from "@/lib/animations/utils";
import { useMotionTier } from "@/hooks/use-motion-tier";
import { cn } from "@/lib/utils";

export interface ScaleRevealProps {
  children: ReactNode;
  direction?: Direction;
  distance?: DistanceKey;
  delay?: number;
  as?: ElementType;
  className?: string;
  /**
   * Any remaining props are forwarded to the rendered element. These
   * wrappers stand between the caller and real DOM, so dropping unknown
   * props silently swallows `aria-*`, `id` and `data-*` — which is exactly
   * how an `aria-label` on a list can go missing without anything failing.
   */
  [key: string]: unknown;
}

/**
 * The card entrance: opacity, a short rise, and a small scale settle.
 *
 * The scale range is deliberately tiny (0.97 → 1). Anything larger reads as a
 * zoom, and on a card containing a full-bleed image a zoom is also the most
 * expensive thing on the page.
 *
 * Notably this does *not* animate `filter: blur()`, which the version it
 * replaces did. Blur cannot be composited — it forces a repaint of the whole
 * layer on every frame for the duration, and the home page runs seven of these
 * cards, some concurrently.
 */
export function ScaleReveal({
  children,
  direction = "up",
  distance = "rise",
  delay = 0,
  as = "div",
  className,
  ...rest
}: ScaleRevealProps) {
  const { compact } = useMotionTier();
  const MotionTag = motion[as as "div"];

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT.default}
      variants={scaleReveal(direction, resolveDistance(distance, compact))}
      transition={delayed(ENTER_SLOW, delay)}
      className={cn(className)}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
