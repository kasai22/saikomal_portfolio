"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInView, useMotionValueEvent, type MotionValue } from "motion/react";
import { IntelligenceEdges } from "@/components/product-intelligence/intelligence-edges";
import {
  CapabilityNode,
  IntelligenceNode,
} from "@/components/product-intelligence/intelligence-node";
import {
  intelligenceVars,
  isCapability,
  layout as buildLayout,
  reveal,
  type Layout,
  type NodeId,
  type StepId,
} from "@/components/product-intelligence/product-intelligence-timeline";
import { AI_BRANCH, AI_CAPABILITIES, AI_LOOP } from "@/features/home/constants/data";
import { useMotionTier } from "@/hooks/use-motion-tier";
import { cn } from "@/lib/utils";

/**
 * The stage — one turn of an intelligent product's loop, drawn as a system and
 * then run through twice.
 *
 * ── What the reader scrolls through ─────────────────────────────────────
 * An intent enters at the top and a signal carries it into context. Context
 * comes alive and hands on to the system, which lights three marks as it
 * reasons and puts out a dashed branch saying it would rather ask than guess.
 * It then reaches, one at a time, for data, for tools, for the surface it can
 * act on — and those three converge into an action. The action goes as far as
 * a gate and stops; the gate checks; only then does the wire continue to an
 * outcome. The outcome's answer runs back round the outside into context.
 *
 * And then it happens again. Context, the system, the action and the outcome
 * each come up a second time while a second signal travels between them, and
 * the low-confidence branch fades back — because with the feedback in context
 * the system no longer has to ask. That last part is the figure's actual
 * argument, and it is why the sequence does not simply stop when the arrow
 * gets home.
 *
 * ── Nothing moves ───────────────────────────────────────────────────────
 * Not one box changes position, size or colour across the whole sequence. What
 * changes is which parts exist, which one is working, and where the signal is.
 * A reader who scrolls back and forth is moving information through a fixed
 * system rather than replaying an animation.
 *
 * ── Where the numbers live ──────────────────────────────────────────────
 * Nowhere in this file. Every window, coordinate and size comes from
 * `product-intelligence-timeline`.
 *
 * ── How little work this does per frame ─────────────────────────────────
 * One subscription to the section's scroll value writes about forty CSS custom
 * properties onto one node, and ~110 elements read them from CSS without
 * re-rendering. The geometry is memoised against the measured size. The
 * travelling signals cost one more subscription, in the edges layer, which
 * writes transforms straight onto a handful of groups.
 *
 * ── No pointer parallax, deliberately ───────────────────────────────────
 * FIG. 01 tiers its layers off the pointer for depth. That cannot work here:
 * the wires are drawn to the boxes' exact coordinates, so a layer moving even
 * three pixels relative to another would visibly detach every connector from
 * what it connects. In a schematic the geometry *is* the content.
 *
 * ── Why the size is measured ────────────────────────────────────────────
 * Geometry is normalised and multiplied by the stage's real pixel size. A
 * deterministic fallback is used until the first measurement, so the first
 * client render matches the server's — no blank frame, no hydration mismatch,
 * and the measurement only ever corrects the layout.
 */

/** Used for the server render and the first client render. Then measured. */
const FALLBACK = { width: 1100, height: 600 };

interface ProductIntelligenceProps {
  /** The section's scroll progress, already remapped and smoothed. */
  progress: MotionValue<number>;
}

export function ProductIntelligence({ progress }: ProductIntelligenceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(FALLBACK);
  const { reduced } = useMotionTier();
  const inView = useInView(stageRef, { margin: "0px 0px -10% 0px" });

  // Emphasis has two sources. Pointer and keyboard focus are transient; a
  // click pins, which is the only way the tablet tier — real viewport, no
  // hover — can read any of this.
  const [hovered, setHovered] = useState<NodeId | null>(null);
  const [pinned, setPinned] = useState<NodeId | null>(null);
  const focus = hovered ?? pinned;

  const togglePinned = useCallback((id: NodeId) => {
    setPinned((current) => (current === id ? null : id));
  }, []);

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

  const apply = useCallback((value: number) => {
    const element = ref.current;
    if (!element) return;
    for (const [property, resolved] of intelligenceVars(value)) {
      element.style.setProperty(property, resolved);
    }
  }, []);

  useMotionValueEvent(progress, "change", apply);

  // Under reduced motion the source is a pinned constant, so `change` never
  // fires. This is also what paints the first driven frame after hydration.
  useEffect(() => {
    apply(progress.get());
  }, [apply, progress]);

  return (
    <div ref={ref}>
      <div
        ref={stageRef}
        // `overflow-hidden` because everything inside is absolutely
        // positioned: an emphasis note reaching past the right edge on a
        // narrow desktop would widen the document and give the whole page a
        // horizontal scrollbar. Safe on the sticky parent — this is a
        // descendant of the sticky box, not an ancestor of it.
        //
        // The floor is 448 rather than a rounder number because of what has to
        // fit above it: while the stage is pinned it sits under 64px of offset
        // and about 150px of section heading, and a 1366x768 screen — still one
        // of the commonest there is — leaves roughly 660px of viewport. Any
        // taller and the bottom of the loop spends the whole pinned phase below
        // the fold.
        className="relative h-[68svh] max-h-[640px] min-h-[448px] w-full overflow-hidden"
        onPointerLeave={() => setHovered(null)}
      >
        <IntelligenceEdges
          layout={layout}
          width={width}
          height={height}
          progress={progress}
          focus={focus}
          live={!reduced}
          circulating={inView && !reduced}
        />

        {/* The two branches, named. Without these the drawing is a flowchart
            of a demo: something goes in, something comes out, and nothing ever
            declines to answer or gets checked on the way.

            Drawn before the nodes so that an emphasis note opening over one of
            them wins on paint order alone, without depending on a z-index
            holding up against a stacking context somewhere above it. */}
        <Branch
          note={layout.note.clarify}
          size={layout.type.detail}
          label={AI_BRANCH.clarify.label}
          detail={AI_BRANCH.clarify.note}
          labelStep="clarify"
          detailStep="clarify"
          standsDown
          dimmed={focus !== null && focus !== "reason" && focus !== "context"}
        />
        {/* Two beats, matching the gate itself: the checkpoint is named as the
            signal reaches it, and what it did is said once it has passed. */}
        <Branch
          note={layout.note.guard}
          size={layout.type.detail}
          label={AI_BRANCH.guard.label}
          detail={AI_BRANCH.guard.note}
          labelStep="guard"
          detailStep="guard-pass"
          inline
          dimmed={focus !== null && focus !== "action" && focus !== "outcome"}
        />

        {AI_LOOP.map((stage) => (
          <IntelligenceNode
            key={stage.id}
            stage={stage}
            box={layout.box[stage.id]}
            type={layout.type}
            panel={layout.panel}
            step={stage.id}
            emphasised={focus === stage.id}
            dimmed={dimmedFor(stage.id, focus)}
            onFocus={setHovered}
            onToggle={togglePinned}
          />
        ))}

        {AI_CAPABILITIES.map((capability) => (
          <CapabilityNode
            key={capability.id}
            capability={capability}
            box={layout.box[capability.id]}
            type={layout.type}
            emphasised={focus === capability.id}
            dimmed={dimmedFor(capability.id, focus)}
            onFocus={setHovered}
            onToggle={togglePinned}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Whether a node should stand back while another is being read.
 *
 * The system and the three things it reaches for are one gesture, not four
 * separate boxes: emphasising the system keeps all four up, and emphasising
 * one of the three keeps the system it belongs to up with it. Everything else
 * softens — to 45%, not out of sight. This is emphasis, not isolation.
 */
function dimmedFor(id: NodeId, focus: NodeId | null): boolean {
  if (focus === null || focus === id) return false;
  if (focus === "reason" && isCapability(id)) return false;
  if (isCapability(focus) && id === "reason") return false;
  return true;
}

interface BranchProps {
  note: Layout["note"]["clarify"];
  size: number;
  label: string;
  detail: string;
  /** The two halves can arrive on different beats — see the gate. */
  labelStep: StepId;
  detailStep: StepId;
  /** Set on the branch that has to fit in the gap between two boxes. */
  inline?: boolean;
  /** Set on the branch that gets quieter once the feedback has landed. */
  standsDown?: boolean;
  dimmed: boolean;
}

/**
 * A named branch off the main line. Set in the annotation face at annotation
 * size, in the accent, because that is how this site marks every other thing
 * it wants read as a note on a drawing rather than as part of it.
 *
 * `align` says which edge of the label the anchor point is, so a note can hang
 * off either side of what it annotates without the layout having to know how
 * wide the words turned out to be.
 */
function Branch({
  note,
  size,
  label,
  detail,
  labelStep,
  detailStep,
  inline,
  standsDown,
  dimmed,
}: BranchProps) {
  return (
    <div
      style={{
        left: note.x,
        top: note.y,
        transform: `translate(${note.align === "right" ? "-100%" : "0"}, -50%)`,
        // The clarifying branch fades with the wire it labels once the second
        // pass has been through. Same expression, so they stay in step.
        opacity: standsDown ? "calc(1 - var(--ai-settled, 1) * 0.45)" : 1,
      }}
      className="pointer-events-none absolute"
    >
      <div
        className={cn(
          "flex whitespace-nowrap transition-opacity duration-fast",
          inline ? "items-baseline gap-1.5" : "flex-col gap-1",
          note.align === "right" && !inline && "items-end",
          dimmed ? "opacity-30" : "opacity-100",
        )}
      >
        <span
          style={{ fontSize: size, ...reveal(labelStep) }}
          className="font-mono font-medium uppercase leading-none tracking-[0.12em] text-brand-ink"
        >
          {label}
        </span>
        <span
          style={{ fontSize: size, ...reveal(detailStep) }}
          className="leading-none text-ink/45"
        >
          {detail}
        </span>
      </div>
    </div>
  );
}
