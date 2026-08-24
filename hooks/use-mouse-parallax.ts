"use client";

import { useEffect, type RefObject } from "react";
import { useMotionValue, useSpring, type MotionValue } from "motion/react";
import { SPRING_POINTER } from "@/lib/animations/springs";
import { useMotionTier } from "@/hooks/use-motion-tier";

interface MouseParallax {
  /** Normalised pointer position within `ref`'s bounds, -0.5…0.5, spring-smoothed. */
  x: MotionValue<number>;
  y: MotionValue<number>;
}

/**
 * Tracks pointer position within a container, normalised and spring-smoothed.
 *
 * Consumers multiply by their own depth factor via `usePointerTier` to get
 * independent parallax speeds per layer off a single listener. Stays at 0 on
 * anything below the `rich` tier and under reduced motion — the listener is
 * never attached, so there is no cost at all on touch.
 */
export function useMouseParallax(ref: RefObject<HTMLElement | null>): MouseParallax {
  const { rich } = useMotionTier();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_POINTER);
  const y = useSpring(rawY, SPRING_POINTER);

  useEffect(() => {
    const el = ref.current;
    if (!el || !rich) return;

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
  }, [ref, rawX, rawY, rich]);

  return { x, y };
}
