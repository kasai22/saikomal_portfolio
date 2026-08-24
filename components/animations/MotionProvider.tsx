"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { EASE, DURATION } from "@/lib/animations/constants";

/**
 * Mounted once in the root layout. Two jobs:
 *
 * `reducedMotion="user"` makes Motion itself honour the OS setting — it skips
 * transform and layout animations while still running opacity. That is the
 * correct reading of WCAG 2.3.3 (which targets *movement*, not state changes)
 * and it removes the need for components to branch on a preference flag that
 * resolves after the first render.
 *
 * The default `transition` catches anything animated without an explicit one,
 * so a forgotten transition still lands on the site's curve rather than
 * Motion's default spring.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: DURATION.base, ease: EASE.out }}
    >
      {children}
    </MotionConfig>
  );
}
