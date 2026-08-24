"use client";

import { motion } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { DISTANCE, VIEWPORT } from "@/lib/animations/constants";
import { ENTER, delayed } from "@/lib/animations/transitions";
import { fadeIn, fadeMove, type Direction } from "@/lib/animations/variants";
import { resolveDistance, type DistanceKey } from "@/lib/animations/utils";
import { useMotionTier } from "@/hooks/use-motion-tier";
import { cn } from "@/lib/utils";

export interface FadeInProps {
  children: ReactNode;
  /** Which way the content travels into place. Omit for opacity only. */
  direction?: Direction;
  /** Named travel distance. Halves automatically below `md`. */
  distance?: DistanceKey;
  /** Seconds. Prefer `<Stagger>` over hand-computed delays for lists. */
  delay?: number;
  /**
   * Animate on mount instead of on scroll into view.
   *
   * Required for anything in the first viewport: a `whileInView` element
   * ships hidden in the server HTML, and if that element is the LCP candidate
   * the animation goes straight onto the LCP number.
   */
  immediate?: boolean;
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
 * The workhorse entrance — opacity, optionally with a short directional
 * travel.
 *
 * `initial` is declared unconditionally and reduced motion is handled by
 * `<MotionProvider>` upstream. Never gate `initial` on a preference or
 * viewport flag: those resolve after the first render, and an element whose
 * `initial` was dropped has nothing left to animate *to*, so it stays hidden.
 */
export function FadeIn({
  children,
  direction,
  distance = "rise",
  delay = 0,
  immediate = false,
  as = "div",
  className,
  ...rest
}: FadeInProps) {
  const { compact } = useMotionTier();
  const MotionTag = motion[as as "div"];

  const variants = direction
    ? fadeMove(direction, resolveDistance(distance, compact))
    : fadeIn;

  const animation = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: VIEWPORT.default };

  return (
    <MotionTag
      initial="hidden"
      variants={variants}
      transition={delayed(ENTER, delay)}
      className={cn(className)}
      {...animation}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export { DISTANCE };
