"use client";

import type { PointerEvent } from "react";
import { useMotionValue, useSpring, type MotionValue } from "motion/react";
import { MAGNETIC } from "@/lib/animations/constants";
import { SPRING_MAGNETIC } from "@/lib/animations/springs";
import { useMotionTier } from "@/hooks/use-motion-tier";

interface MagneticResult {
  x: MotionValue<number>;
  y: MotionValue<number>;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerLeave: () => void;
}

/**
 * Pulls an element a few px toward the pointer while hovering, capped at
 * `maxPx`, with a spring return to (0,0) on leave.
 *
 * Shared by the `<Magnetic>` wrapper and by `ActionButton`, which applies the
 * pull to the anchor itself rather than to a wrapper element so the button's
 * `inline-flex` layout is untouched.
 *
 * Returns motion values that never move when the tier doesn't support pointer
 * motion, so callers pass them to `style` unconditionally — no branching on a
 * flag, which is what used to leave a one-frame window of applied motion.
 */
export function useMagnetic(maxPx: number = MAGNETIC.base): MagneticResult {
  const { rich } = useMotionTier();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_MAGNETIC);
  const y = useSpring(rawY, SPRING_MAGNETIC);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!rich || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rawX.set(px * maxPx * 2);
    rawY.set(py * maxPx * 2);
  };

  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return { x, y, onPointerMove, onPointerLeave };
}
