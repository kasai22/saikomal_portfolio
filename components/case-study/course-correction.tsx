"use client";

import { motion } from "motion/react";
import { DELAY, STAGGER, VIEWPORT } from "@/lib/animations/constants";
import { ENTER, WIPE, delayed } from "@/lib/animations/transitions";
import { drawLine, fadeMove, staggerContainer } from "@/lib/animations/variants";

interface CourseCorrectionProps {
  /** What I believed going in. */
  firstTake: string;
  /** The thing that proved it wrong. */
  whatChangedIt: string;
  /** What I did about it. */
  whatIDid: string;
  /** What it cost — time lost, work thrown away. Optional but better with it. */
  cost?: string;
}

/**
 * One honest reversal per case study. A portfolio that only contains
 * decisions that worked reads as a highlight reel; the useful signal for a
 * hiring team is what someone does when they find out they were wrong.
 *
 * Deliberately visually distinct from the outcome sections — it is not a
 * win, and it should not be dressed as one.
 *
 * ── Why the reveal runs left to right ───────────────────────────────────
 * The three columns are a causal chain: a belief, the evidence that broke
 * it, the response. Revealing them in order makes the reader follow the
 * argument in the order it happened rather than taking the panel in at a
 * glance — this is the one place where the reveal order *is* the content.
 * The cost line then lands after a deliberate beat, because it is the
 * consequence, not a fourth step.
 */
export function CourseCorrection({ firstTake, whatChangedIt, whatIDid, cost }: CourseCorrectionProps) {
  const rows = [
    { label: "First take", body: firstTake },
    { label: "What changed it", body: whatChangedIt },
    { label: "What I did", body: whatIDid },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT.default}
      variants={staggerContainer(STAGGER.loose)}
      className="border-l-2 border-brand bg-brand/[0.07] p-6 md:p-8"
    >
      <motion.p variants={fadeMove("up", 8)} transition={ENTER} className="t-eyebrow text-brand-ink">
        Course correction
      </motion.p>
      <motion.h2 variants={fadeMove("up", 8)} transition={ENTER} className="t-h3 mt-2 text-ink">
        What I got wrong
      </motion.h2>

      <dl className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        {rows.map((row) => (
          <motion.div key={row.label} variants={fadeMove("left", 16)} transition={ENTER}>
            <dt className="t-eyebrow border-b border-ink/20 pb-2 text-ink/60">{row.label}</dt>
            <dd className="t-body mt-3 text-ink/80">{row.body}</dd>
          </motion.div>
        ))}
      </dl>

      {cost && (
        <motion.p
          variants={fadeMove("up", 8)}
          transition={delayed(ENTER, DELAY.long)}
          className="t-meta relative mt-6 pt-4 text-ink/65"
        >
          <motion.span
            aria-hidden="true"
            variants={drawLine("x")}
            transition={delayed(WIPE, DELAY.long)}
            className="absolute inset-x-0 top-0 h-px origin-left bg-ink/[0.14]"
          />
          <span className="t-eyebrow mr-2 text-ink/60">Cost</span>
          {cost}
        </motion.p>
      )}
    </motion.section>
  );
}
