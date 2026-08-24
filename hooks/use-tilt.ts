"use client";

import type { PointerEvent } from "react";
import { useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { SPRING_TILT } from "@/lib/animations/springs";
import { useMotionTier } from "@/hooks/use-motion-tier";

interface TiltResult {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  /** Spring-smoothed normalised pointer position, -0.5…0.5 — shared with `ParallaxImage` and `GlassHighlight`. */
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerLeave: () => void;
}

/**
 * Pointer-driven 3D tilt, capped at `maxDeg`.
 *
 * The cap is deliberately tiny (2.5–6° at the call sites) — enough to read as
 * a tactile surface, not enough to read as a 3D effect. Ignores touch pointers
 * and is pinned flat below the `rich` tier and under reduced motion, so the
 * derived values simply never move.
 */
export function useTilt(maxDeg = 5): TiltResult {
  const { rich } = useMotionTier();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, SPRING_TILT);
  const pointerY = useSpring(rawY, SPRING_TILT);

  const deg = rich ? maxDeg : 0;
  const rotateX = useTransform(pointerY, [-0.5, 0.5], [deg, -deg]);
  const rotateY = useTransform(pointerX, [-0.5, 0.5], [-deg, deg]);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!rich || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - rect.left) / rect.width - 0.5);
    rawY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return { rotateX, rotateY, pointerX, pointerY, onPointerMove, onPointerLeave };
}
