"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMotionValueEvent, type MotionValue } from "motion/react";
import { MindField } from "@/components/product-mind/mind-field";
import { ClusterLabel, InputToken, StageBox } from "@/components/product-mind/mind-node";
import {
  layout as buildLayout,
  mindVars,
  type StepId,
} from "@/components/product-mind/product-mind-timeline";
import { MIND_STAGES, PROBLEM_CLUSTERS, PROBLEM_INPUTS } from "@/features/home/constants/data";

/**
 * The stage — nine loose inputs becoming one buildable structure.
 *
 * ── What the reader scrolls through ─────────────────────────────────────
 * Nine chips land across the canvas, one after another, none of them aligned
 * to anything and none of them connected. Then they travel: every one of them
 * crosses the canvas to the left column and straightens up as it arrives,
 * until what was a scattered field is three stacks of three. Brackets come
 * down beside them and each stack gets a name — evidence, boundary, material —
 * which is the moment nine things become three. The three feed one insight,
 * and from there a chain extends rightwards: a model, a flow, a design, and
 * a product with the beginnings of an interface inside it.
 *
 * ── Why this one moves and FIG. 03 does not ─────────────────────────────
 * FIG. 03 is a fixed system that information passes through, so nothing in it
 * is ever allowed to shift. This figure's subject is the opposite — that a
 * brief arrives in no order and putting it in one is the work — so the
 * migration has to be literal. Nine things genuinely travel. Everything after
 * the migration is drawn rather than moved, which keeps the movement the thing
 * the eye goes to.
 *
 * ── Where the numbers live ──────────────────────────────────────────────
 * Nowhere in this file. Every window, coordinate and size comes from
 * `product-mind-timeline`.
 *
 * ── How little work this does per frame ─────────────────────────────────
 * One subscription writes about forty custom properties onto one node — nine
 * of them whole transform strings for the travelling chips, the rest plain
 * numbers. Around thirty-five elements read them from CSS. Nothing
 * re-renders, and there is not a particle on the canvas: every mark on it is a
 * named thing.
 *
 * ── Why the size is measured ────────────────────────────────────────────
 * Geometry is normalised and multiplied by the stage's real pixel size. A
 * deterministic fallback is used until the first measurement, so the first
 * client render matches the server's — no blank frame and no hydration
 * mismatch — and every chip's fallback transform is its *resolved* position,
 * so an undriven canvas paints the tidy end state rather than the mess.
 */

/** Used for the server render and the first client render. Then measured. */
const FALLBACK = { width: 1100, height: 560 };

interface ProductMindProps {
  /** The section's scroll progress, already remapped and smoothed. */
  progress: MotionValue<number>;
}

export function ProductMind({ progress }: ProductMindProps) {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(FALLBACK);

  useEffect(() => {
    const element = stageRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect || rect.width === 0) return;
      const next = { width: Math.round(rect.width), height: Math.round(rect.height) };
      setSize((prev) =>
        Math.abs(prev.width - next.width) < 2 && Math.abs(prev.height - next.height) < 2
          ? prev
          : next,
      );
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const { width, height } = size;
  const layout = useMemo(() => buildLayout(width, height), [width, height]);

  const apply = useCallback(
    (value: number) => {
      const element = ref.current;
      if (!element) return;
      for (const [property, resolved] of mindVars(value, layout)) {
        element.style.setProperty(property, resolved);
      }
    },
    [layout],
  );

  useMotionValueEvent(progress, "change", apply);

  // Under reduced motion the source is a pinned constant, so `change` never
  // fires. This is also what paints the first driven frame after hydration,
  // and what moves everything onto the new geometry after a resize.
  useEffect(() => {
    apply(progress.get());
  }, [apply, progress]);

  return (
    <div ref={ref}>
      <div
        ref={stageRef}
        // `overflow-hidden` because a chip's scatter position is near the
        // canvas edge and it carries a rotation: without this, one corner of
        // one tilted chip would widen the document and give the whole page a
        // horizontal scrollbar. Safe on the sticky parent — this is a
        // descendant of the sticky box, not an ancestor of it.
        className="relative h-[62svh] max-h-[600px] min-h-[430px] w-full overflow-hidden"
      >
        <MindField layout={layout} width={width} height={height} />

        {PROBLEM_INPUTS.map((input) => (
          <InputToken key={input.id} input={input} layout={layout} />
        ))}

        {PROBLEM_CLUSTERS.map((cluster, index) => {
          const bracket = layout.bracket[index];
          if (!bracket) return null;
          return (
            <ClusterLabel key={cluster.id} cluster={cluster} bracket={bracket} type={layout.type} />
          );
        })}

        {MIND_STAGES.map((stage) => (
          <StageBox key={stage.id} stage={stage} layout={layout} step={stage.id as StepId} />
        ))}
      </div>
    </div>
  );
}
