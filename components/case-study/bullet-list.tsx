"use client";

import { motion } from "motion/react";
import { STAGGER, VIEWPORT } from "@/lib/animations/constants";
import { ENTER } from "@/lib/animations/transitions";
import { fadeMove, staggerContainer } from "@/lib/animations/variants";

export function BulletDot() {
  return (
    <span
      className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent,#008080)]"
      aria-hidden="true"
    />
  );
}

interface BulletListProps {
  items: string[];
}

/**
 * Findings, decisions and requirements, revealed one at a time.
 *
 * The stagger is doing real work here rather than decorating: these lists are
 * arguments — research findings, design decisions — and revealing them in
 * order makes them read as a sequence of points rather than a block of text
 * arriving at once. Each item travels a very short distance, because the list
 * items are close together and a longer rise would read as a ripple.
 */
export function BulletList({ items }: BulletListProps) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT.default}
      variants={staggerContainer(STAGGER.tight)}
      className="space-y-2"
    >
      {items.map((item) => (
        <motion.li
          key={item}
          variants={fadeMove("up", 8)}
          transition={ENTER}
          className="flex items-start gap-3 text-[13px] leading-relaxed text-ink/70"
        >
          <BulletDot /> {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}
