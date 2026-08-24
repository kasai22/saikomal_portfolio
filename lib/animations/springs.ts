/**
 * Spring configurations, one per interaction class.
 *
 * Every spring here is critically or over-damped — `damping` is high relative
 * to `stiffness` in each case, so values settle without overshoot. That is a
 * deliberate constraint: a bouncing portfolio reads as a demo, not a product.
 * If a new interaction needs a spring, add it here rather than inlining one.
 */

import type { Transition } from "motion/react";

/** Pointer-following chrome — the cursor dot. Fast, tight, no wobble. */
export const SPRING_CURSOR: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 40,
  mass: 0.4,
};

/** The magnetic pull on buttons. Softer, so the return reads as elastic. */
export const SPRING_MAGNETIC: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 20,
  mass: 0.5,
};

/** Card tilt and pointer-derived parallax inside a card. */
export const SPRING_TILT: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

/** Pointer position normalised across a large surface — the hero. */
export const SPRING_POINTER: Transition = {
  type: "spring",
  stiffness: 150,
  damping: 20,
  mass: 0.5,
};

/** Press/hover feedback on buttons and links. */
export const SPRING_PRESS: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 25,
};

/** Shared-element / layout transitions. Slightly slower to stay legible. */
export const SPRING_LAYOUT: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 35,
};

/**
 * Scroll-linked scale and fade. Soft and heavily damped: the point is to add
 * a little lag behind the wheel so the transform reads as weight rather than
 * as a value welded directly to the scroll position. Too stiff and it may as
 * well be raw progress; too loose and it drifts after the user has stopped.
 */
export const SPRING_SCROLL: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 30,
  mass: 0.5,
  restDelta: 0.0005,
};

/**
 * The top-of-page progress bar. `restDelta` matters here — without it the
 * spring keeps ticking imperceptibly and never parks.
 */
export const SPRING_PROGRESS: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 40,
  restDelta: 0.001,
};
