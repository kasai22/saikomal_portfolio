"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import {
  PHASE,
  artifactPoint,
  lerp,
  phase,
  stageScale,
  type DisciplineId,
} from "@/components/product-system/product-system-timeline";

interface FlowArtifactProps {
  label: string;
  discipline: DisciplineId;
  index: number;
  total: number;
  progress: MotionValue<number>;
  width: number;
  height: number;
}

/**
 * One thing a discipline puts into the system — a word, and nothing else.
 *
 * It starts stacked under the discipline it belongs to, travels when the
 * system merges, and lands on the ring around the product experience. The
 * position is resolved through `artifactPoint`, which reads the discipline's
 * *current* position rather than a fixed one, so an artifact stays attached to
 * its own discipline while that discipline is itself still moving. Nothing
 * ever detaches and flies on its own.
 *
 * ── Why it is a word and not a chip ─────────────────────────────────────
 * Twelve bordered chips orbiting a box is a diagram of a diagram. Twelve words
 * arranged on a ring is a system with its parts named — the same information,
 * in the register the rest of the site is set in. It also means the travelling
 * state costs one transform and nothing else: no border to repaint, no
 * background to composite.
 */
export function FlowArtifact({
  label,
  discipline,
  index,
  total,
  progress,
  width,
  height,
}: FlowArtifactProps) {
  const size = stageScale(width);

  const transform = useTransform(progress, (value) => {
    const point = artifactPoint(discipline, index, total, value);
    // Artifacts firm up as they arrive: in the stack they are a quiet list
    // under a name, on the ring they are the system's own vocabulary.
    const settled = phase(value, PHASE.merge);
    const scale = lerp(0.92, 1, settled);
    return `translate(${(point.x * width).toFixed(1)}px, ${(point.y * height).toFixed(1)}px) scale(${scale.toFixed(3)})`;
  });

  return (
    <motion.div style={{ transform }} className="absolute left-0 top-0">
      <p
        style={{ fontSize: size.artifact }}
        className="-translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono uppercase leading-none tracking-[0.1em] text-ink/70"
      >
        {label}
      </p>
    </motion.div>
  );
}
