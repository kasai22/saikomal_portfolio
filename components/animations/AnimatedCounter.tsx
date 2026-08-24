"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { DURATION, EASE, VIEWPORT } from "@/lib/animations/constants";
import { useMotionPreference } from "@/hooks/use-motion-preference";

export interface AnimatedCounterProps {
  /** The finished string, e.g. "26", "3+", "40%", "3×", "12 wks", "Live". */
  value: string;
  /** Seconds. Used to stagger a row of metrics. */
  delay?: number;
  className?: string;
}

/**
 * Counts the numeric part of a metric up to its final value when it scrolls
 * into view, preserving any prefix or suffix — "40%" counts to 40 and keeps
 * the sign, "3+" keeps the plus. Values containing no digits at all ("Live")
 * render as-is.
 *
 * ── Why it counts at all ────────────────────────────────────────────────
 * These are credibility signals, so the animation has one job: draw the eye
 * to the figure and then get out of the way. That rules out the usual
 * counter tricks — no overshoot past the target, no bouncing settle, no
 * per-digit odometer roll. It is a single `EASE.out` ramp over
 * `DURATION.slow`, which decelerates into the number and stops. A figure
 * that behaves theatrically invites you to discount it.
 *
 * The label never animates. Only the number moves, so the number is what
 * you look at.
 *
 * ── Cost ────────────────────────────────────────────────────────────────
 * The count runs entirely on a motion value: `useTransform` formats it and
 * Motion renders the resulting string directly as a child, so the ~45
 * frames of a count produce **zero React renders**. The version this
 * replaced called `setState` on every frame.
 *
 * ── Always ends on the truth ────────────────────────────────────────────
 * Reduced motion and the no-digit case both short-circuit straight to the
 * real value, so a metric can never be left showing a placeholder number.
 * Screen readers are given the settled value only — never the ticking one.
 */
export function AnimatedCounter({ value, delay = 0, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useMotionPreference();
  const inView = useInView(ref, VIEWPORT.early);

  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/s);
  const digits = match?.[2];
  const target = digits ? parseFloat(digits) : 0;
  const decimals = (digits?.split(".")[1] ?? "").length;
  const prefix = match?.[1] ?? "";
  const suffix = match?.[3] ?? "";

  const count = useMotionValue(0);
  const display = useTransform(
    count,
    (latest) => `${prefix}${latest.toFixed(decimals)}${suffix}`,
  );

  useEffect(() => {
    if (!digits) return;
    if (reduced) {
      count.set(target);
      return;
    }
    if (!inView) return;

    const controls = animate(count, target, {
      duration: DURATION.slow,
      ease: EASE.out,
      delay,
    });
    return () => controls.stop();
  }, [count, delay, digits, inView, reduced, target]);

  if (!digits) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      <motion.span aria-hidden="true">{display}</motion.span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
