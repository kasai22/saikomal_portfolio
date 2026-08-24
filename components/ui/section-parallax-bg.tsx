"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { PARALLAX } from "@/lib/animations/constants";
import { useParallaxTier, useSectionScroll } from "@/hooks/use-scroll-tier";
import { cn } from "@/lib/utils";

interface SectionParallaxBgProps {
  className: string;
}

/**
 * A slow-drifting decorative glow, scoped to its own section rather than the
 * whole page. The parent section must be `relative` for the positioning to
 * resolve against it.
 *
 * Now gated at `md` rather than `sm`: this is a large blurred layer, and a
 * phone should not be compositing one for an effect that is barely visible at
 * that width. `useParallaxTier` pins the value to zero below the tier, so the
 * element still renders — it just doesn't move.
 */
export function SectionParallaxBg({ className }: SectionParallaxBgProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { progress, enabled } = useSectionScroll(ref, ["start end", "end start"]);
  const y = useParallaxTier(progress, PARALLAX.subtle * 2, enabled);

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute -z-10 hidden rounded-full md:block", className)}
      style={{ y }}
    />
  );
}
