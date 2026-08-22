"use client";

import type { PointerEvent } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MagneticResult {
  x: MotionValue<number>;
  y: MotionValue<number>;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerLeave: () => void;
}

/**
 * Pulls an element a few px toward the pointer while hovering, capped at
 * `maxPx`, with a spring return to (0,0) on leave — the "magnetic button"
 * micro-interaction. No-ops under `prefers-reduced-motion` or touch, since
 * `onPointerMove` is expected to be wired up conditionally by the caller.
 */
export function useMagnetic(maxPx = 8): MagneticResult {
  const reducedMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 200, damping: 20, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 200, damping: 20, mass: 0.5 });

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType === "touch") return;
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
