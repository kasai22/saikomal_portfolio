"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { VIEWPORT } from "@/lib/animations/constants";
import { ENTER } from "@/lib/animations/transitions";
import { fadeMove } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

interface AccentCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * The accent-tinted variant of `SurfaceCard`. Relies on the page setting
 * `--accent-subtle` and `--accent-border` once, at the root of each case
 * study, instead of every card computing its own rgba() string.
 *
 * Same scroll reveal as `SurfaceCard`, so the two read as one system.
 */
export function AccentCard({ children, className }: AccentCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT.default}
      variants={fadeMove("up")}
      transition={ENTER}
      className={cn(
        "rounded-sm border p-6 md:p-8",
        "border-[color:var(--accent-border,rgba(232,163,61,0.35))] bg-[color:var(--accent-subtle,rgba(232,163,61,0.14))]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
