"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { VIEWPORT } from "@/lib/animations/constants";
import { ENTER } from "@/lib/animations/transitions";
import { fadeMove } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

interface SurfaceCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * The neutral content panel used throughout the case studies. Reveals on
 * scroll rather than sitting static — animating the shared surfaces is what
 * gives all 48 sections a reading rhythm without editing 48 files.
 */
export function SurfaceCard({ children, className }: SurfaceCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT.default}
      variants={fadeMove("up")}
      transition={ENTER}
      className={cn("rounded-sm border border-ink/12 bg-ink/[0.035] p-6 md:p-8", className)}
    >
      {children}
    </motion.div>
  );
}
