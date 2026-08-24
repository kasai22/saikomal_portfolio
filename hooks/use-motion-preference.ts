"use client";

import { QUERY } from "@/lib/animations/constants";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * Whether the user has asked the OS for reduced motion.
 *
 * Replaces the old `useReducedMotion`, which set state inside an effect and
 * therefore returned `false` on the first client render — every consumer
 * written as `style={reduced ? undefined : { y }}` applied the motion style
 * for one frame before flipping, and consumers written the other way round
 * left content stuck in its hidden state permanently.
 *
 * Most components should not need this at all: `<MotionProvider>` sets
 * `MotionConfig reducedMotion="user"`, which makes Motion itself skip
 * transform and layout animations while still running opacity. Reach for this
 * hook only for imperative motion Motion can't see — a `requestAnimationFrame`
 * loop, a pointer listener, the custom cursor.
 */
export function useMotionPreference(): boolean {
  return useMediaQuery(QUERY.reducedMotion);
}
