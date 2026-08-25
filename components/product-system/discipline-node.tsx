"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import {
  AI_PRESENCE,
  PHASE,
  disciplinePoint,
  lerp,
  phase,
  stageScale,
  type DisciplineId,
} from "@/components/product-system/product-system-timeline";
import { cn } from "@/lib/utils";
import type { SystemDiscipline } from "@/features/home/types";

interface DisciplineNodeProps {
  discipline: SystemDiscipline;
  progress: MotionValue<number>;
  width: number;
  height: number;
  hovered: DisciplineId | null;
  onHover: (id: DisciplineId | null) => void;
}

/**
 * A discipline: its name, and where it came from.
 *
 * ── The hierarchy inverts ───────────────────────────────────────────────
 * The name begins at headline scale, as one of three things competing for the
 * stage, and ends as an annotation tag on the rim of something larger than it.
 * The product experience does the opposite. That inversion is the whole
 * argument — three practices resolving into one system — so it is carried by
 * scale rather than stated in a caption.
 *
 * Set in the mono annotation face at both ends, and rendered at its *largest*
 * size then scaled down: text scaled up from 11px would be soft at 30px, and
 * this is on screen at 30px for most of the sequence.
 *
 * ── No card ─────────────────────────────────────────────────────────────
 * A name, a hairline and one line of provenance. A bordered panel would make
 * three departments out of what has to read as three regions of one field.
 */
export function DisciplineNode({
  discipline,
  progress,
  width,
  height,
  hovered,
  onHover,
}: DisciplineNodeProps) {
  const size = stageScale(width);
  const dimmed = hovered !== null && hovered !== discipline.id;

  const transform = useTransform(progress, (value) => {
    const point = disciplinePoint(discipline.id, value);
    return `translate(${(point.x * width).toFixed(1)}px, ${(point.y * height).toFixed(1)}px)`;
  });

  // Down to `tagScale` as the ring closes — 30px becomes about 11px, which is
  // exactly where the rest of the site sets an annotation label.
  const scale = useTransform(progress, (value) =>
    lerp(1, size.tagScale, phase(value, PHASE.resolve)),
  );

  // AI is quiet until it joins, never absent: "three separate systems" is the
  // state the section opens on, and two of them is a different section.
  const opacity = useTransform(progress, (value) =>
    discipline.id === "ai"
      ? lerp(AI_PRESENCE.before, AI_PRESENCE.after, phase(value, PHASE.aiJoin))
      : 1,
  );

  // The provenance line tucks up under the name as the name shrinks, so the
  // pair stays a pair. It never scales — under reduced motion the resolved
  // state is what the reader gets, and every line of it has to stay legible.
  // The -50% is part of the composed string, not a class: Motion writes
  // `transform` inline, and an inline transform beats `-translate-x-1/2`
  // outright rather than composing with it.
  const detailTransform = useTransform(progress, (value) => {
    // The name scales about its own centre but keeps its full-size layout
    // box, so at `tagScale` its visual bottom is a little past two thirds
    // down that box. The resolved gap has to clear that, not the type size.
    const gap = lerp(size.label * 1.15, size.label * 0.78, phase(value, PHASE.resolve));
    return `translate(-50%, ${gap.toFixed(1)}px)`;
  });

  return (
    <motion.div
      style={{ transform, opacity }}
      className="absolute left-0 top-0"
      onHoverStart={() => onHover(discipline.id)}
      onHoverEnd={() => onHover(null)}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <div
          className={cn(
            "relative flex flex-col items-center transition-opacity duration-fast",
            dimmed ? "opacity-40" : "opacity-100",
          )}
        >
          <motion.h3
            style={{ scale, fontSize: size.label }}
            className="whitespace-nowrap font-mono font-medium uppercase leading-none tracking-[0.14em] text-ink"
          >
            {discipline.label}
          </motion.h3>
          <motion.p
            style={{ transform: detailTransform }}
            className="t-meta absolute left-1/2 top-0 w-max whitespace-nowrap text-center text-ink/50"
          >
            {discipline.detail}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
