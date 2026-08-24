"use client";

import { motion } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { SPRING_LAYOUT } from "@/lib/animations/springs";
import { cn } from "@/lib/utils";

export interface SharedElementProps {
  /**
   * Identity shared across mount points. Two elements with the same id that
   * are never mounted simultaneously will animate from one position to the
   * other; two mounted at once will fight, so ids must be unique per visible
   * instance.
   */
  id: string;
  children?: ReactNode;
  as?: ElementType;
  className?: string;
}

/**
 * Animates an element between positions as it moves from one place in the
 * tree to another — the sliding nav underline, a selected-state indicator.
 *
 * This is the only motion in the system that measures layout, so it is the
 * only one that can cause a frame of layout work. Use it for small indicator
 * elements, not for anything containing an image or a block of text.
 *
 * **Caveat for anything hidden with CSS rather than unmounted:** a duplicate
 * id on a `display: none` element still registers, and the two instances will
 * animate against each other. The mobile nav stays mounted while hidden, which
 * is why only the desktop nav list renders an indicator.
 */
export function SharedElement({ id, children, as = "span", className }: SharedElementProps) {
  const MotionTag = motion[as as "span"];

  return (
    <MotionTag layoutId={id} transition={SPRING_LAYOUT} className={cn(className)}>
      {children}
    </MotionTag>
  );
}
