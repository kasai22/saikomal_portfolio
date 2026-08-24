"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { MAGNETIC } from "@/lib/animations/constants";
import { useMagnetic } from "@/hooks/use-magnetic";
import { cn } from "@/lib/utils";

export interface MagneticProps {
  children: ReactNode;
  /** Maximum pull toward the pointer, in px. Keep inside the `MAGNETIC` scale. */
  strength?: number;
  className?: string;
}

/**
 * Wraps arbitrary content in the magnetic-hover micro-interaction.
 *
 * Desktop-with-a-real-pointer only — there is nothing to be magnetic to on
 * touch — and inert under reduced motion. The gating lives in `useMagnetic`,
 * which returns motion values pinned to zero rather than swapping the handlers
 * out, so the element's shape never changes across the tier flip.
 *
 * For a button or link, prefer `ActionButton`, which applies the same pull to
 * the interactive element itself instead of adding a wrapper.
 */
export function Magnetic({ children, strength = MAGNETIC.base, className }: MagneticProps) {
  const { x, y, onPointerMove, onPointerLeave } = useMagnetic(strength);

  return (
    <motion.div
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ x, y }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}
