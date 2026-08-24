"use client";

import { QUERY } from "@/lib/animations/constants";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMotionPreference } from "@/hooks/use-motion-preference";

export interface MotionTier {
  /** OS-level reduced-motion request. Overrides everything below. */
  reduced: boolean;
  /**
   * Desktop viewport with a real hovering pointer. Gates the full interaction
   * system: custom cursor, magnetic buttons, card tilt, pointer parallax.
   */
  rich: boolean;
  /** Tablet and up. Scroll-linked parallax is allowed from here. */
  roomy: boolean;
  /** Below `md`. Entrance and navigation animation only. */
  compact: boolean;
  /**
   * The single question most components actually want: should this element
   * animate at all beyond a fade?
   */
  animate: boolean;
}

/**
 * Resolves which tier of the interaction system this client gets.
 *
 * Desktop gets everything. Tablet keeps entrances and scroll-linked effects
 * but loses pointer-driven motion, which has nothing to drive it. Mobile keeps
 * entrances and navigation only. Reduced motion collapses all three to the
 * simplest case.
 *
 * Pointer-driven motion was already correctly inert on touch in the previous
 * implementation — this centralises that check so it isn't re-derived with
 * a slightly different query in five separate files.
 */
export function useMotionTier(): MotionTier {
  const reduced = useMotionPreference();
  const rich = useMediaQuery(QUERY.richPointer);
  const roomy = useMediaQuery(QUERY.md);

  return {
    reduced,
    rich: rich && !reduced,
    roomy: roomy && !reduced,
    compact: !roomy,
    animate: !reduced,
  };
}
