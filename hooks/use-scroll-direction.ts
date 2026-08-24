"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { NAV } from "@/lib/animations/constants";

export interface ScrollDirectionState {
  /** True once the page has scrolled past `NAV.solidAt`. */
  scrolled: boolean;
  /** True when the bar should retract out of the way. */
  hidden: boolean;
}

/**
 * Drives the scroll-aware navigation: solid once the page moves, retracted
 * while the reader is heading down the page, back immediately on any upward
 * intent.
 *
 * Three things keep this from feeling twitchy, which is the usual failure
 * mode for a hide-on-scroll bar:
 *
 * 1. **A direction threshold.** Movement under `NAV.directionThreshold`
 *    doesn't count as a direction at all, so trackpad jitter, momentum
 *    settling and the rubber-band at the top of the document can't toggle it.
 * 2. **A floor.** The bar never retracts above `NAV.hideAfter`, so it stays
 *    put for the whole hero — a nav that vanishes on the first flick of the
 *    wheel reads as a bug.
 * 3. **State only changes on a decision.** `useMotionValueEvent` reads scroll
 *    on Motion's frame loop rather than through a React `scroll` listener,
 *    and `setState` runs only when `scrolled` or `hidden` actually flips —
 *    not on every frame.
 */
export function useScrollDirection(): ScrollDirectionState {
  const { scrollY } = useScroll();
  const [state, setState] = useState<ScrollDirectionState>({ scrolled: false, hidden: false });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const delta = latest - previous;

    const scrolled = latest > NAV.solidAt;

    let hidden = state.hidden;
    if (Math.abs(delta) >= NAV.directionThreshold) {
      // Heading down, and far enough in that retracting reads as intentional.
      hidden = delta > 0 && latest > NAV.hideAfter;
    }
    // Any return to the top always restores the bar, whatever the last
    // direction was — including a programmatic jump to an anchor.
    if (latest <= NAV.hideAfter) hidden = false;

    if (scrolled !== state.scrolled || hidden !== state.hidden) {
      setState({ scrolled, hidden });
    }
  });

  return state;
}
