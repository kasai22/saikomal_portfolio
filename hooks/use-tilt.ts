"use client";

import type { PointerEvent } from "react";
import { useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface TiltResult {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  /** Spring-smoothed normalized pointer position, -0.5…0.5 — shared with `ParallaxImage`/`GlassHighlight`. */
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerLeave: () => void;
}

/**
 * Pointer-driven 3D tilt, capped at `maxDeg`. Ignores touch pointer events
 * (tilt requires a hovering pointer, not a finger) and does nothing
 * meaningful under `prefers-reduced-motion` since the values it derives
 * from just never move.
 */
export function useTilt(maxDeg = 5): TiltResult {
  const reducedMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 300, damping: 30 });
  const pointerY = useSpring(rawY, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(pointerY, [-0.5, 0.5], [maxDeg, -maxDeg]);
  const rotateY = useTransform(pointerX, [-0.5, 0.5], [-maxDeg, maxDeg]);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType === "touch") return;
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
