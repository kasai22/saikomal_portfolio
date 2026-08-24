"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ElementType, type ReactNode } from "react";
import { VIEWPORT } from "@/lib/animations/constants";
import { WIPE, delayed } from "@/lib/animations/transitions";
import { drawLine, wipeIn, type Direction } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

export interface RevealProps {
  children: ReactNode;
  /** Which edge the content is uncovered from. */
  from?: Direction;
  /** Seconds. */
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
 * Uncovers content with a `clip-path: inset()` wipe rather than moving it in.
 * The content is already laid out and simply gets revealed, which reads as a
 * drawing being plotted — the most characteristic motion on this site, kept
 * from the original `Wipe`.
 *
 * `clip-path` is the one non-transform property this system animates. It
 * composites, unlike `filter` or `width`.
 */
export function Reveal({
  children,
  from = "left",
  delay = 0,
  as = "div",
  className,
  ...rest
}: RevealProps) {
  const MotionTag = motion[as as "div"];

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT.default}
      variants={wipeIn(from)}
      transition={delayed(WIPE, delay)}
      className={cn(className)}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export interface DrawBoxProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Draws a hairline rule above and below its content on entry — the way a
 * technical drawing gets its crop marks before the content lands.
 *
 * Uses `scaleX` rather than the original's animated `width`, so the rules stay
 * on the compositor instead of triggering layout on every frame.
 */
export function DrawBox({ children, delay = 0, className }: DrawBoxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VIEWPORT.default);

  const rule = (origin: "left" | "right", position: string) => (
    <motion.span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute h-px w-full bg-[color:var(--rule-strong)]",
        position,
      )}
      style={{ originX: origin === "left" ? 0 : 1 }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={drawLine("x")}
      transition={delayed(WIPE, delay)}
    />
  );

  return (
    <div ref={ref} className={cn("relative", className)}>
      {rule("left", "left-0 top-0")}
      {rule("right", "bottom-0 right-0")}
      {children}
    </div>
  );
}
