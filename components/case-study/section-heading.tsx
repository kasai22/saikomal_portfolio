"use client";

import { motion } from "motion/react";
import { STAGGER, VIEWPORT } from "@/lib/animations/constants";
import { ENTER, WIPE } from "@/lib/animations/transitions";
import { drawLine, fadeMove, staggerContainer, wipeIn } from "@/lib/animations/variants";
import { SectionLabel } from "@/components/case-study/section-label";

interface SectionHeadingProps {
  label: string;
  title: string;
  accent: string;
  /** Optional supporting paragraph shown under the title */
  sub?: string;
  className?: string;
}

/**
 * The heading for every case-study section — all 48 of them, across three
 * studies.
 *
 * This one file is why the case studies have a reading rhythm at all. Before
 * it, everything below each hero rendered statically: a reader nineteen
 * sections into Kudra got no signal about where one idea ended and the next
 * began. Animating here reaches every section at once, without touching 48
 * files or restructuring any of them.
 *
 * The sequence is a chapter mark being drawn: the label, then a rule that
 * extends from it, then the title uncovering, then the supporting line. Four
 * beats is the ceiling for a heading — beyond that the reader is waiting for
 * the section to assemble before they can start reading it.
 */
export function SectionHeading({ label, title, accent, sub, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT.default}
      variants={staggerContainer(STAGGER.tight)}
      className={`mb-10 ${className ?? ""}`}
    >
      <motion.div variants={fadeMove("up", 8)} transition={ENTER} className="flex items-center gap-3">
        <SectionLabel text={label} />
        <motion.span
          aria-hidden="true"
          variants={drawLine("x")}
          transition={WIPE}
          className="h-px flex-1 origin-left bg-[color:var(--accent,#008080)]/25"
        />
      </motion.div>

      <motion.h2 variants={wipeIn("left")} transition={WIPE} className="t-h2 mt-2 text-ink">
        {title} <span className="text-[color:var(--accent,#008080)]">{accent}</span>
      </motion.h2>

      {sub && (
        <motion.p
          variants={fadeMove("up", 8)}
          transition={ENTER}
          className="t-body mt-2 max-w-xl text-ink/60"
        >
          {sub}
        </motion.p>
      )}
    </motion.div>
  );
}
