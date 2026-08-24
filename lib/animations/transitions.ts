/**
 * Composed `Transition` objects — the tokens in `./constants` assembled into
 * the handful of shapes components actually pass to Motion.
 *
 * A component should import a named transition from here rather than building
 * `{ duration: ..., ease: ... }` inline, so that retiming the whole site is a
 * change in one file.
 */

import type { Transition } from "motion/react";
import { DURATION, EASE } from "./constants";

/** The default entrance. Used by FadeIn, Reveal, ScaleReveal, Stagger items. */
export const ENTER: Transition = {
  duration: DURATION.base,
  ease: EASE.out,
};

/** Larger blocks — a featured panel, a hero image, a full-width figure. */
export const ENTER_SLOW: Transition = {
  duration: DURATION.slow,
  ease: EASE.out,
};

/** Content leaving. Accelerating and shorter than its entrance. */
export const EXIT: Transition = {
  duration: DURATION.fast,
  ease: EASE.in,
};

/** Clip-path wipes and rules drawing themselves. */
export const WIPE: Transition = {
  duration: DURATION.base,
  ease: EASE.standard,
};

/** Hover and focus feedback. */
export const HOVER: Transition = {
  duration: DURATION.fast,
  ease: EASE.standard,
};

/** Colour, border and background changes. */
export const COLOR: Transition = {
  duration: DURATION.instant,
  ease: EASE.standard,
};

/** Per-character / per-word text reveal. */
export const TEXT: Transition = {
  duration: DURATION.fast,
  ease: EASE.out,
};

/**
 * The masked headline reveal.
 *
 * Duration-based rather than a spring, deliberately: the headline is the LCP
 * element, so its total time has to be a number this file can guarantee. A
 * spring's settle time depends on its starting velocity and can't be capped
 * the same way. `EASE.out` is the site's settle curve — fast off the mark,
 * long tail — which is what makes a line look like it comes to rest rather
 * than stopping.
 */
export const HEADLINE: Transition = {
  duration: DURATION.slow,
  ease: EASE.out,
};

/**
 * The reduced-motion transition. Not zero — `duration: 0` can leave Motion
 * without a frame to commit the end state on, which is the bug the old
 * `reveal-item.tsx` and `wipe.tsx` comments describe. A single frame is
 * imperceptible and always resolves.
 */
export const INSTANT: Transition = {
  duration: 0.01,
};

/**
 * Picks the right transition for the current motion preference. Every
 * animated component funnels through this rather than branching inline.
 */
export function withMotionPreference(
  transition: Transition,
  reduced: boolean,
): Transition {
  return reduced ? INSTANT : transition;
}

/** Adds a delay to a transition without mutating the shared object. */
export function delayed(transition: Transition, delay: number): Transition {
  return delay ? { ...transition, delay } : transition;
}
