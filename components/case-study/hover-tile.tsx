"use client";

import { motion } from "motion/react";
import { VIEWPORT } from "@/lib/animations/constants";
import { ENTER } from "@/lib/animations/transitions";
import { fadeMove } from "@/lib/animations/variants";

interface HoverTileProps {
  icon: string;
  title: string;
  description: string;
}

/**
 * Used for Information Architecture modules and Future Scope items.
 *
 * Reveals on scroll; hover stays a static Tailwind state driven by the
 * `--accent-border` / `--accent-subtle` variables, so hovering a grid of
 * these costs nothing.
 */
export function HoverTile({ icon, title, description }: HoverTileProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT.default}
      variants={fadeMove("up")}
      transition={ENTER}
      className="cursor-default rounded-sm border border-ink/12 bg-ink/[0.035] p-5 transition-colors duration-instant hover:border-[color:var(--accent-border,rgba(232,163,61,0.35))] hover:bg-[color:var(--accent-subtle,rgba(232,163,61,0.14))]"
    >
      <div className="mb-3 text-lg" aria-hidden="true">
        {icon}
      </div>
      <h3 className="t-h4 mb-2 text-ink">{title}</h3>
      <p className="text-[11px] leading-relaxed text-ink/60">{description}</p>
    </motion.div>
  );
}
