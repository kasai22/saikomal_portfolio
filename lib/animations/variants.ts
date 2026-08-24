/**
 * Named variant factories.
 *
 * Two rules govern everything in this file:
 *
 * 1. **Transform and opacity only.** No `filter`, no `width`/`height`, no
 *    `top`/`left`. `clip-path: inset()` is the single exception — it
 *    composites, and it's what gives the wipe its "plotted" character. The
 *    previous card reveal animated `blur(8px) → blur(0)`, which forces a
 *    repaint of a layer containing a full-bleed image on every frame.
 *
 * 2. **`initial` is always declared, never conditionally omitted.** Reduced
 *    motion is honoured by collapsing the *transition*, not by dropping the
 *    variant. Gating `initial` on a preference flag that resolves after the
 *    first render leaves elements stuck in their hidden state forever.
 */

import type { Variants } from "motion/react";
import { CARD, DISTANCE, SCALE, STAGGER } from "./constants";

type Axis = "x" | "y";
export type Direction = "up" | "down" | "left" | "right";

const AXIS: Record<Direction, Axis> = {
  up: "y",
  down: "y",
  left: "x",
  right: "x",
};

/** `up` means "travels upward into place", so it starts below. */
const SIGN: Record<Direction, number> = { up: 1, down: -1, left: 1, right: -1 };

/* ------------------------------------------------------------------ *
 * Entrances
 * ------------------------------------------------------------------ */

/**
 * Opacity only. The one entrance that is safe above the fold, because the
 * element is already in its final position in the server HTML — only its
 * opacity changes.
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/** Opacity plus a short directional travel. The default below-fold entrance. */
export function fadeMove(direction: Direction = "up", distance: number = DISTANCE.rise): Variants {
  const axis = AXIS[direction];
  const offset = distance * SIGN[direction];
  return {
    hidden: { opacity: 0, [axis]: offset },
    visible: { opacity: 1, [axis]: 0 },
  };
}

/** Opacity + travel + a small scale settle. For cards and panels. */
export function scaleReveal(direction: Direction = "up", distance: number = DISTANCE.rise): Variants {
  const axis = AXIS[direction];
  const offset = distance * SIGN[direction];
  return {
    hidden: { opacity: 0, scale: SCALE.from, [axis]: offset },
    visible: { opacity: 1, scale: SCALE.to, [axis]: 0 },
  };
}

/* ------------------------------------------------------------------ *
 * Wipes
 * ------------------------------------------------------------------ */

const HIDDEN_INSET: Record<Direction, string> = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  up: "inset(100% 0 0 0)",
  down: "inset(0 0 100% 0)",
};

/**
 * Uncovers content that is already laid out, rather than moving it in — it
 * reads as a drawing being plotted. Preserved from the existing `Wipe`
 * component because it is the most characteristic motion on the site.
 */
export function wipeIn(from: Direction = "left"): Variants {
  return {
    hidden: { clipPath: HIDDEN_INSET[from], opacity: 0 },
    visible: { clipPath: "inset(0 0 0 0)", opacity: 1 },
  };
}

/** A rule drawing itself along its own length. */
export function drawLine(axis: Axis = "x"): Variants {
  const key = axis === "x" ? "scaleX" : "scaleY";
  return {
    hidden: { [key]: 0 },
    visible: { [key]: 1 },
  };
}

/* ------------------------------------------------------------------ *
 * Project card imagery
 *
 * The two entrances below are the main device separating the site's two
 * kinds of work, and the difference is intentional rather than decorative:
 *
 *   `imageUnveil`  — case studies. The frame lifts from the bottom edge
 *                    while the image settles back from a slight overscale.
 *                    Editorial: something is being *shown* to you.
 *   `imageRender`  — coding projects. A hard left-to-right pass, no scale.
 *                    Technical: something is being *drawn*, the way a render
 *                    or a build fills in.
 * ------------------------------------------------------------------ */

/** Case-study imagery. Unveiled from the bottom edge. */
export const imageUnveil: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", scale: CARD.imageUnveilScale, opacity: 0 },
  visible: { clipPath: "inset(0 0 0% 0)", scale: 1, opacity: 1 },
};

/** Coding-project imagery. A single technical pass, left to right. */
export const imageRender: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  visible: { clipPath: "inset(0 0% 0 0)", opacity: 1 },
};

/* ------------------------------------------------------------------ *
 * Staggering
 * ------------------------------------------------------------------ */

/**
 * A container whose `visible` state cascades to descendants. Children that
 * declare no `initial`/`animate` of their own inherit the named states, so a
 * list needs no per-item index arithmetic — which is what the repeated
 * `delayMs={i * 100}` call sites were doing by hand.
 */
export function staggerContainer(step: number = STAGGER.base, delayChildren: number = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: step, delayChildren },
    },
  };
}

/** The default child of a `staggerContainer`. */
export const staggerItem: Variants = fadeMove("up", DISTANCE.rise);

/* ------------------------------------------------------------------ *
 * Text
 * ------------------------------------------------------------------ */

/**
 * A single character or word rising into place behind its own clip box.
 *
 * Deliberately starts at `opacity: 0` with a *small* offset rather than the
 * previous full `y: 110%`. At 110% the glyph sits entirely outside its
 * overflow-hidden box, which means the text is invisible in the server HTML —
 * fine below the fold, fatal for a headline. `TextReveal` pairs this with an
 * `immediate` mode for above-the-fold use.
 */
export const textUnit: Variants = {
  hidden: { opacity: 0, y: "0.35em" },
  visible: { opacity: 1, y: "0em" },
};

/** The taller version, for text that is safely below the fold. */
export const textUnitDeep: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: { opacity: 1, y: "0%" },
};

/* ------------------------------------------------------------------ *
 * Composites
 * ------------------------------------------------------------------ */

/**
 * The chapter mark — number, rule, eyebrow — used by both the home and
 * case-study section headings. Grouped here because it's the one motif that
 * has to read identically across two components that don't share a file.
 */
export const chapterMark: Variants = staggerContainer(STAGGER.tight);
