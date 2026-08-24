"use client";

import { motion } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { STAGGER, VIEWPORT } from "@/lib/animations/constants";
import { ENTER } from "@/lib/animations/transitions";
import { fadeMove, scaleReveal, staggerContainer, type Direction } from "@/lib/animations/variants";
import { resolveDistance, type DistanceKey } from "@/lib/animations/utils";
import { useMotionTier } from "@/hooks/use-motion-tier";
import { cn } from "@/lib/utils";

export interface StaggerProps {
  children: ReactNode;
  /** Seconds between children. */
  step?: number;
  /** Seconds before the first child begins. */
  delay?: number;
  /** Animate on mount rather than on scroll into view. */
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
 * A container whose entrance cascades to its `<StaggerItem>` children.
 *
 * This replaces the `delayMs={i * 100}` pattern that was repeated across six
 * call sites: the parent owns the rhythm, so adding or reordering an item
 * needs no index arithmetic and can't drift out of sync with its neighbours.
 *
 * Motion's variant propagation reaches any descendant that doesn't declare its
 * own `initial`/`animate`, however deep — so `<StaggerItem>` doesn't have to
 * be a direct child.
 */
export function Stagger({
  children,
  step = STAGGER.base,
  delay = 0,
  immediate = false,
  as = "div",
  className,
  ...rest
}: StaggerProps) {
  const MotionTag = motion[as as "div"];

  const animation = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: VIEWPORT.default };

  return (
    <MotionTag
      initial="hidden"
      variants={staggerContainer(step, delay)}
      className={cn(className)}
      {...animation}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export interface StaggerItemProps {
  children: ReactNode;
  direction?: Direction;
  distance?: DistanceKey;
  /**
   * `fade` travels and fades; `scale` adds a small settle on top, for cards
   * and panels. Use `scale` sparingly — it reads as more weight, so it only
   * works when the item genuinely has more.
   */
  variant?: "fade" | "scale";
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
 * One item in a `<Stagger>`. Declares no `initial`/`animate` of its own — it
 * inherits the parent's named states and only supplies the variant defining
 * what "hidden" and "visible" look like for it.
 *
 * `as` matters for more than styling: a stagger inside an `<ol>` must render
 * its items as `<li>`, or the wrapper element sits between the list and its
 * items and the list stops being a list to assistive tech.
 */
export function StaggerItem({
  children,
  direction = "up",
  distance = "rise",
  variant = "fade",
  as = "div",
  className,
  ...rest
}: StaggerItemProps) {
  const { compact } = useMotionTier();
  const MotionTag = motion[as as "div"];
  const resolved = resolveDistance(distance, compact);

  return (
    <MotionTag
      variants={variant === "scale" ? scaleReveal(direction, resolved) : fadeMove(direction, resolved)}
      transition={ENTER}
      className={cn(className)}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
