"use client";

import { motion, useTransform, useMotionValue, type MotionValue } from "motion/react";
import { ASSEMBLY } from "@/lib/animations/constants";
import { useAssembly } from "@/components/transitions/hero-work-assembly";

/**
 * "01 — SELECTED WORK / Three systems, in production." as the label of
 * something being built, rather than the title of the next section.
 *
 * ── Why this heading is not `SectionHeading` ────────────────────────────
 * Every other slide's heading arrives on a viewport trigger: it crosses a
 * threshold and plays its entrance. That is the correct grammar for a section
 * that begins — and the wrong grammar for this one, because this one does not
 * begin. The three pieces travelling down out of the hero are still in the air
 * when these words are needed; the heading has to be part of the same
 * continuous move, driven by the same scroll, resolving *while* the featured
 * panel is being filled rather than announcing itself once it has been.
 *
 * So it takes the assembly's master progress and scrubs, in five overlapping
 * beats read top to bottom:
 *
 *   the index mark and its rule draw    — the part is numbered
 *   the eyebrow arrives                 — and named
 *   the title lifts through a mask      — and labelled
 *   the structural rule draws across    — and the structure it labels appears
 *   the supporting line settles         — and can be read
 *
 * The title is uncovered rather than faded. A fade says "this loaded"; a mask
 * lifting off says the words were already there under the thing being
 * assembled, which is the whole claim the hand-off is making.
 *
 * ── When there is no assembly ───────────────────────────────────────────
 * Under reduced motion the shared progress is pinned to 1, so every value
 * below is already at rest and this renders as a plain, complete heading with
 * no motion of any kind — not a faster animation, none. Below `md` the pieces
 * do not fly but the progress is still driven, so the heading still resolves
 * with the scroll: it is one variable's worth of work and it is what keeps the
 * concept intact on a phone.
 */

interface WorkHeadingProps {
  chapter: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
}

/**
 * Sub-beats, in the heading's own 0-1 progress. Overlapping by design — the
 * five parts of the label resolve as one wave, not as five reveals.
 *
 * Mutable tuples rather than `as const`: Motion's `useTransform` takes a
 * mutable `InputRange`, and copying a frozen one at every call site is noise.
 */
type BeatRange = [number, number];

const BEAT: Record<"mark" | "eyebrow" | "title" | "rule" | "intro", BeatRange> = {
  mark: [0, 0.28],
  eyebrow: [0.1, 0.45],
  title: [0.14, 0.7],
  rule: [0.42, 1],
  intro: [0.66, 1],
};

export function WorkHeading({ chapter, eyebrow, title, intro }: WorkHeadingProps) {
  const assembly = useAssembly();
  // A stable fallback so the hooks below always have one source. Only reached
  // if this is ever rendered outside the wrapper, in which case the heading
  // should simply be finished.
  const settled = useMotionValue(1);
  const master = assembly?.progress ?? settled;

  const [from, to] = ASSEMBLY.heading;
  const progress = useTransform(master, [from, to], [0, 1], { clamp: true });

  return (
    // The anchor the compact hand-off is paced against — see `approachAnchors`.
    <div data-work-heading="" className="mb-10">
      <div className="flex items-center gap-3">
        <Beat progress={progress} beat={BEAT.mark}>
          <span className="t-eyebrow tabular-nums text-brand-ink">{chapter}</span>
        </Beat>
        <Rule progress={progress} beat={BEAT.mark} className="h-px w-6 bg-brand/60" />
        <Beat progress={progress} beat={BEAT.eyebrow}>
          <span className="t-eyebrow text-ink/60">{eyebrow}</span>
        </Beat>
      </div>

      <Title progress={progress}>{title}</Title>

      {/* The structure's own top edge, drawn across the content column at the
          moment the pieces below it commit to their places. This is the line
          the three cards hang from — the reason the words above it read as a
          label rather than a headline. */}
      <Rule
        progress={progress}
        beat={BEAT.rule}
        className="mt-5 h-px w-full bg-[color:var(--rule-strong)]"
      />

      {intro && (
        <Beat progress={progress} beat={BEAT.intro} lift>
          <p className="t-body mt-4 max-w-lg text-ink/60">{intro}</p>
        </Beat>
      )}
    </div>
  );
}

/** One element fading up on its own slice of the heading's progress. */
function Beat({
  progress,
  beat,
  lift,
  children,
}: {
  progress: MotionValue<number>;
  beat: BeatRange;
  lift?: boolean;
  children: React.ReactNode;
}) {
  const opacity = useTransform(progress, beat, [0, 1], { clamp: true });
  const y = useTransform(progress, beat, [lift ? 8 : 4, 0], { clamp: true });
  return <motion.div style={{ opacity, y }}>{children}</motion.div>;
}

/** A hairline drawing from its left edge. */
function Rule({
  progress,
  beat,
  className,
}: {
  progress: MotionValue<number>;
  beat: BeatRange;
  className: string;
}) {
  const scaleX = useTransform(progress, beat, [0, 1], { clamp: true });
  return (
    <motion.span
      aria-hidden="true"
      style={{ scaleX, transformOrigin: "left" }}
      className={className}
    />
  );
}

/**
 * The claim itself, uncovered from below rather than faded in. `clip-path`
 * over `overflow: hidden` on a wrapper because the descenders and the tracking
 * on `t-h2` need the box to stay exactly where it is while the mask moves.
 */
function Title({
  progress,
  children,
}: {
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const clipPath = useTransform(
    progress,
    BEAT.title,
    ["inset(0% 0% 105% 0%)", "inset(0% 0% 0% 0%)"],
    {
      clamp: true,
    },
  );
  const y = useTransform(progress, BEAT.title, [14, 0], { clamp: true });

  return (
    <motion.h2 style={{ clipPath, y }} className="t-h2 mt-3 max-w-2xl text-ink">
      {children}
    </motion.h2>
  );
}
