"use client";

import { motion, type Transition } from "motion/react";
import { Fragment } from "react";
import { TEXT, delayed } from "@/lib/animations/transitions";
import { VIEWPORT } from "@/lib/animations/constants";
import { resolveTextStep } from "@/lib/animations/utils";
import { cn } from "@/lib/utils";

/**
 * How much the text is hidden before it animates. This choice is a
 * performance decision as much as an aesthetic one.
 *
 * - `lift` — opaque, with a short rise. The cheapest option and the safest
 *   above the fold.
 * - `mask` — the unit rises from fully below its own clip box. The cinematic
 *   one, and the right choice for a headline.
 * - `fade` — opacity plus a short rise. **Below the fold only**, see below.
 *
 * ── Why `mask` is opaque ────────────────────────────────────────────────
 * A zero-opacity element is not a paint, so Chrome will not record LCP
 * against it. Large above-the-fold text that starts at `opacity: 0`
 * therefore pushes LCP out to `hydration + delay + duration` — measured on
 * this site at 1.5s on a fast connection and **4.0s on throttled 4G**, which
 * is a failing score.
 *
 * `mask` gets the same visual result without that cost: the unit is fully
 * opaque but sits entirely outside an `overflow: hidden` box, so it is
 * painted (and countable) from the first frame while still being completely
 * invisible until it rises. Dropping `opacity: 0` from this mode changes
 * nothing a viewer can see and moves LCP back to first paint.
 *
 * `fade` keeps `opacity: 0` because below the fold it costs nothing — but it
 * is the mode to avoid in the first viewport.
 */
export type TextRevealMode = "lift" | "fade" | "mask";

const MODE_VARIANTS = {
  lift: {
    hidden: { opacity: 1, y: "0.28em" },
    visible: { opacity: 1, y: "0em" },
  },
  fade: {
    hidden: { opacity: 0, y: "0.4em" },
    visible: { opacity: 1, y: "0em" },
  },
  mask: {
    // Opaque by design — see the note above. The clip box does the hiding.
    hidden: { opacity: 1, y: "100%" },
    visible: { opacity: 1, y: "0%" },
  },
} as const;

export interface TextRevealProps {
  text: string;
  /**
   * Split granularity.
   *
   * `line` treats the whole string as one unit — the right choice for a
   * headline set line by line, where the mask should travel across the full
   * line rather than breaking it into independently moving pieces. Words are
   * cheaper than characters and read as more editorial.
   */
  by?: "word" | "char" | "line";
  mode?: TextRevealMode;
  /** Animate on mount rather than on scroll into view. */
  immediate?: boolean;
  /** Seconds before the first unit begins. */
  delay?: number;
  /** Overrides the default per-unit transition. */
  transition?: Transition;
  className?: string;
  unitClassName?: string;
}

/**
 * Reveals a line one word (or character) at a time.
 *
 * Two things distinguish this from the `SplitText` it replaces:
 *
 * **Timing is capped.** `resolveTextStep` compresses the per-unit step so the
 * whole line always finishes within ~450ms regardless of length. The previous
 * implementation used a fixed 40ms per character, so an 18-character line
 * didn't begin its final letter until 820ms in — with the entire string held
 * off-screen behind `overflow: hidden` until then. On the home page that text
 * is the LCP element, so the animation was setting the LCP number directly.
 *
 * **`lift` is the default.** The text ships opaque and in flow; only the
 * transform animates. Choose `fade` or `mask` only for text below the fold.
 *
 * Accessibility is unchanged from the original: the full string is exposed
 * once as an `aria-label`, the split units are `aria-hidden`, and real spaces
 * are preserved so the line is selectable and scrapeable as normal text.
 */
export function TextReveal({
  text,
  by = "word",
  mode = "lift",
  immediate = false,
  delay = 0,
  transition,
  className,
  unitClassName,
}: TextRevealProps) {
  const animation = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: VIEWPORT.default };

  const variants = MODE_VARIANTS[mode];

  // A single unit: no splitting, no stagger, the mask travels the whole line.
  if (by === "line") {
    return (
      <span
        className={cn("inline-block max-w-full", mode === "mask" && "overflow-hidden pb-[0.08em]")}
        aria-label={text}
      >
        <motion.span
          aria-hidden="true"
          className={cn("inline-block", className, unitClassName)}
          initial="hidden"
          variants={variants}
          transition={delayed(transition ?? TEXT, delay)}
          {...animation}
        >
          {text}
        </motion.span>
      </span>
    );
  }

  const words = text.split(" ");
  const totalUnits =
    by === "word" ? words.length : words.reduce((n, w) => n + [...w].length, 0);
  const step = resolveTextStep(totalUnits, by);

  let index = -1;

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wordIndex) => {
        const units = by === "word" ? [word] : [...word];

        return (
          <Fragment key={`${word}-${wordIndex}`}>
            {/* Each word is its own line box so `mask` can clip a unit rising
                from underneath without it bleeding into the line above. */}
            <span
              className={cn(
                "inline-block align-bottom",
                mode === "mask" && "overflow-hidden",
              )}
              aria-hidden="true"
            >
              {units.map((unit, unitIndex) => {
                index += 1;
                return (
                  <motion.span
                    key={`${unit}-${unitIndex}`}
                    className={cn("inline-block", unitClassName)}
                    initial="hidden"
                    variants={variants}
                    transition={delayed(transition ?? TEXT, delay + index * step)}
                    {...animation}
                  >
                    {unit}
                  </motion.span>
                );
              })}
            </span>
            {wordIndex < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </span>
  );
}
