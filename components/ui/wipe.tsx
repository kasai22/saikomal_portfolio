"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** The one easing curve used by every transition on the site. */
export const EASE_WIPE: [number, number, number, number] = [0.4, 0, 0.2, 1];

type Direction = "left" | "right" | "up" | "down";

const HIDDEN_INSET: Record<Direction, string> = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  up: "inset(100% 0 0 0)",
  down: "inset(0 0 100% 0)",
};

interface WipeProps {
  children: ReactNode;
  /** Which edge the content is revealed from. */
  from?: Direction;
  delayMs?: number;
  durationMs?: number;
  as?: ElementType;
  className?: string;
}

/**
 * Reveals content with a `clip-path: inset()` wipe rather than a fade — the
 * content is already laid out and simply gets uncovered, which reads as a
 * drawing being plotted rather than an element floating in.
 *
 * Both `initial` and `whileInView` are always declared and reduced motion is
 * honoured by collapsing the duration to zero. Gating the props on the
 * reduced-motion flag instead would leave content clipped forever, because
 * the flag resolves in an effect and is false on the first render.
 */
export function Wipe({
  children,
  from = "left",
  delayMs = 0,
  durationMs = 620,
  as = "div",
  className,
}: WipeProps) {
  const reducedMotion = useReducedMotion();
  const MotionTag = motion[as as "div"];

  return (
    <MotionTag
      initial={{ clipPath: HIDDEN_INSET[from], opacity: 0 }}
      whileInView={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: durationMs / 1000, delay: delayMs / 1000, ease: EASE_WIPE }
      }
      className={className}
    >
      {children}
    </MotionTag>
  );
}

interface DrawBoxProps {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}

/**
 * Draws a hairline rectangle around its content on entry — the two rules
 * extend from the corners until they meet, the way a drawing gets its crop
 * marks before the content lands.
 */
export function DrawBox({ children, delayMs = 0, className }: DrawBoxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const shown = reducedMotion || inView;
  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.55, delay: delayMs / 1000, ease: EASE_WIPE };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-px bg-[color:var(--rule-strong)]"
        initial={{ width: 0 }}
        animate={{ width: shown ? "100%" : 0 }}
        transition={transition}
      />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-px bg-[color:var(--rule-strong)]"
        initial={{ width: 0 }}
        animate={{ width: shown ? "100%" : 0 }}
        transition={transition}
      />
      {children}
    </div>
  );
}
