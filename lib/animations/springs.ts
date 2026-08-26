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
 * The two long scrubbed figures — FIG. 02's assembly and FIG. 03's loop.
 *
 * Those figures now run over three to four screens of scroll each, which
 * changes what the spring is for. The value they chase moves very little per
 * pixel, so during deliberate scrolling this is effectively locked to the
 * hand; what it buys is the tail — a flicked scroll arrives as a glide rather
 * than a jump.
 *
 * ── Why these numbers ───────────────────────────────────────────────────
 * Tuned against a measurement rather than by feel: after an instant scroll
 * jump, how long does the figure keep animating? That tail is the thing that
 * reads as "detached" when it runs long. Measured in a real browser to the
 * point where every one of FIG. 03's properties stops moving at all, which is
 * a stricter bar than the eye — the visible settle is roughly half of it:
 *
 *   100 / 28 / 0.55  →  1.4-1.7s. Properly cinematic and much too far behind
 *                       the hand; a flick was still resolving a second and a
 *                       half later, which reads as the page lagging.
 *   190 / 27 / 0.45  →  0.66-0.92s. Enough weight that a flick arrives as a
 *                       glide, short enough that the drawing has caught up by
 *                       the time the reader has finished the gesture.
 *
 * Still over-damped (ζ ≈ 1.46): it settles, it never overshoots.
 */
export const SPRING_FIGURE: Transition = {
  type: "spring",
  stiffness: 190,
  damping: 27,
  mass: 0.45,
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
