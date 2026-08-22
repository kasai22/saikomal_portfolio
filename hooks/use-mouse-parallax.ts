"use client";

import { useEffect, type RefObject } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MouseParallax {
  /** Normalized pointer position within `ref`'s bounds, -0.5…0.5, spring-smoothed. */
  x: MotionValue<number>;
  y: MotionValue<number>;
}

/**
 * Tracks pointer position within a container, normalized to -0.5…0.5 and
 * spring-smoothed. Consumers multiply by their own depth factor (via
 * `useTransform`) to get independent parallax speeds per layer. No-ops
 * (stays at 0) on touch devices or under `prefers-reduced-motion`.
 */
export function useMouseParallax(ref: RefObject<HTMLElement | null>): MouseParallax {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 150, damping: 20, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 150, damping: 20, mass: 0.5 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      rawX.set((event.clientX - rect.left) / rect.width - 0.5);
      rawY.set((event.clientY - rect.top) / rect.height - 0.5);
    };
    const handleLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    el.addEventListener("pointermove", handleMove, { passive: true });
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [ref, rawX, rawY, reducedMotion]);

  return { x, y };
}
