"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { HOVER } from "@/lib/animations/transitions";
import { cn } from "@/lib/utils";

// Based on Motion's own anchor props rather than React's: `motion.a`
// redefines `onAnimationStart`, `onDrag` and friends with animation
// signatures, so the plain DOM prop types are not assignable to it.
export interface HoverLinkProps extends Omit<HTMLMotionProps<"a">, "children"> {
  children?: ReactNode;
  /** Where the rule grows from. `center` reads as more deliberate; `left` as more editorial. */
  origin?: "left" | "center";
  className?: string;
}

/**
 * An anchor with a rule that draws itself under the label on hover or
 * keyboard focus.
 *
 * The rule is absolutely positioned and animates `scaleX` from 0. That
 * matters more than it sounds: the common implementations — toggling
 * `text-decoration`, animating a `border-bottom`, or growing a `width` —
 * either change the element's box or force layout on every frame, so a row
 * of links visibly reflows as the pointer crosses it. Nothing here
 * participates in layout at all.
 *
 * `whileFocus` mirrors `whileHover` so the affordance is identical for
 * keyboard users, on top of (not instead of) the global focus ring.
 */
export function HoverLink({ children, origin = "left", className, ...rest }: HoverLinkProps) {
  return (
    <motion.a
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      className={cn("relative inline-flex items-center gap-1.5", className)}
      {...rest}
    >
      {children}
      <motion.span
        aria-hidden="true"
        className={cn(
          "absolute -bottom-0.5 left-0 right-0 h-px bg-current",
          origin === "left" ? "origin-left" : "origin-center",
        )}
        variants={{ rest: { scaleX: 0, opacity: 0 }, hover: { scaleX: 1, opacity: 0.5 } }}
        transition={HOVER}
      />
    </motion.a>
  );
}
