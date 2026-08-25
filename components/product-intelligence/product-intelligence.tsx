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
  layout as buildLayout,
  reveal,
  type Layout,
  type StageId,
} from "@/components/product-intelligence/product-intelligence-timeline";
import { AI_BRANCH, AI_CAPABILITIES, AI_LOOP } from "@/features/home/constants/data";
import { useMotionTier } from "@/hooks/use-motion-tier";
import { cn } from "@/lib/utils";

/**
 * The stage — one turn of an intelligent product's loop, drawn as a system.
 *
 * ── What the reader sees ────────────────────────────────────────────────
 * An intent enters at the top. Context assembles around it. The system comes
 * online, reaches out to what it can use, and what comes back is what the
 * decision is made on. It acts, the result passes a gate before anyone sees
 * it, and the user's answer to that result runs back round the outside into
 * context. Off the left-hand side, a dashed branch: when the system is not
 * confident enough to act, it goes back and asks instead.
 *
 * ── Where the numbers live ──────────────────────────────────────────────
 * Nowhere in this file. Every window, coordinate and size comes from
 * `product-intelligence-timeline`.
 *
 * ── How little work this does per frame ─────────────────────────────────
 * One subscription to the section's scroll value writes sixteen CSS custom
 * properties onto one node. Roughly ninety elements read those properties from
 * CSS and none of them re-render. The geometry itself is memoised against the
 * measured size, because unlike FIG. 01 nothing in this diagram *moves* — the
 * scroll drives how much of a fixed system has been drawn, not where any of it
 * is. The only thing on the animation path is the circulating signal.
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

  // Emphasis has two sources. Pointer and keyboard focus are transient;
  // a click pins, which is the only way the tablet tier — real viewport, no
  // hover — can read any of this.
  const [hovered, setHovered] = useState<StageId | null>(null);
  const [pinned, setPinned] = useState<StageId | null>(null);
  const focus = hovered ?? pinned;

  const togglePinned = useCallback((id: StageId) => {
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

  const capsDimmed = focus !== null && focus !== "reason";

  return (
    <div ref={ref}>
      <div
        ref={stageRef}
        // `overflow-hidden` because everything inside is absolutely
        // positioned: an emphasis panel reaching past the right edge on a
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
          focus={focus}
          circulating={inView && !reduced}
        />

        {/* The two branches, named. Without these the drawing is a flowchart
            of a demo: something goes in, something comes out, and nothing
            ever declines to answer or gets checked on the way.

            Drawn before the nodes so that an emphasis panel opening over one
            of them wins on paint order alone, without depending on a z-index
            holding up against a stacking context somewhere above it. */}
        <Branch
          note={layout.note.clarify}
          size={layout.type.detail}
          label={AI_BRANCH.clarify.label}
          detail={AI_BRANCH.clarify.note}
          dimmed={focus !== null && focus !== "reason" && focus !== "context"}
        />
        <Branch
          note={layout.note.guard}
          size={layout.type.detail}
          label={AI_BRANCH.guard.label}
          detail={AI_BRANCH.guard.note}
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
            active={focus === stage.id}
            dimmed={focus !== null && focus !== stage.id}
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
            dimmed={capsDimmed}
          />
        ))}
      </div>
    </div>
  );
}

interface BranchProps {
  note: Layout["note"]["clarify"];
  size: number;
  label: string;
  detail: string;
  /** Set on the branch that has to fit in the gap between two boxes. */
  inline?: boolean;
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
function Branch({ note, size, label, detail, inline, dimmed }: BranchProps) {
  return (
    <div
      style={{
        left: note.x,
        top: note.y,
        transform: `translate(${note.align === "right" ? "-100%" : "0"}, -50%)`,
        ...reveal(inline ? "e-guard" : "e-clarify"),
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
          style={{ fontSize: size }}
          className="font-mono font-medium uppercase leading-none tracking-[0.12em] text-brand-ink"
        >
          {label}
        </span>
        <span style={{ fontSize: size }} className="leading-none text-ink/45">
          {detail}
        </span>
      </div>
    </div>
  );
}
