"use client";

import type { CSSProperties } from "react";
import {
  active,
  reveal,
  type Box,
  type CapabilityId,
  type Layout,
  type NodeId,
  type StepId,
} from "@/components/product-intelligence/product-intelligence-timeline";
import { cn } from "@/lib/utils";
import type { IntelligenceCapability, IntelligenceStage } from "@/features/home/types";

/**
 * One node of the loop: what it is, whether it has run, and whether it is
 * running right now.
 *
 * ── Two ways of being drawn, for one reason ─────────────────────────────
 * Four of the six stages belong to the system and are drawn as boxes with the
 * site's technical corner ticks. Two — the intent going in and the feedback
 * coming back — belong to the person, and are drawn as a label on a rule in
 * the accent colour, with no box at all. That is not variety. A diagram that
 * boxes the human the same way it boxes the retrieval step is a diagram of a
 * pipeline, and this one is arguing the opposite.
 *
 * ── Activity, and why nothing moves ─────────────────────────────────────
 * A node never changes size or position. What changes is a hairline accent
 * border laid exactly over its resting one, whose opacity is that node's
 * activity — up as the signal arrives, held while it works, settled back to a
 * floor once it has run. So a glance at the diagram at any scroll position
 * says which stages have happened, which one is happening, and which have not
 * started, without a single pixel of layout having moved. That restraint is
 * the point: the system is constant, and the intelligence is what travels
 * through it.
 *
 * No glow anywhere. An accent border and a small change in how present the
 * label is are the entire vocabulary.
 *
 * ── Why it is a button ──────────────────────────────────────────────────
 * Emphasis is on pointer *and* on focus *and* on click. Hover alone would put
 * the supporting detail behind an interaction a keyboard user and a tablet
 * user cannot perform. Click-to-open is what makes the tablet tier work, and
 * it costs one handler.
 *
 * The detail region is a proper disclosure — `aria-expanded` on the control,
 * `aria-hidden` on the region while it is closed. Nothing is lost by hiding
 * it: below `md` the whole diagram is replaced by a vertical flow that lists
 * every one of these lines in the page's own HTML, so this is the second copy
 * rather than the only one.
 */

/** The label's presence, floor to full, as its node comes up and settles. */
function labelPresence(id: NodeId): string {
  return `calc(0.74 + ${active(id)} * 0.26)`;
}

interface IntelligenceNodeProps {
  stage: IntelligenceStage;
  box: Box;
  type: Layout["type"];
  panel: Layout["panel"];
  /** The timeline step that brings this node in. */
  step: StepId;
  emphasised: boolean;
  dimmed: boolean;
  onFocus: (id: NodeId | null) => void;
  onToggle: (id: NodeId) => void;
}

export function IntelligenceNode({
  stage,
  box,
  type,
  panel,
  step,
  emphasised,
  dimmed,
  onFocus,
  onToggle,
}: IntelligenceNodeProps) {
  const human = stage.side === "human";
  const panelId = `ai-stage-${stage.id}`;

  return (
    <div
      style={{ left: box.cx, top: box.cy, ...reveal(step) }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className={cn(
          "relative transition-opacity duration-fast",
          dimmed ? "opacity-45" : "opacity-100",
          emphasised && "z-30",
        )}
      >
        <button
          type="button"
          aria-expanded={emphasised}
          aria-controls={panelId}
          onPointerEnter={() => onFocus(stage.id)}
          onPointerLeave={() => onFocus(null)}
          onFocus={() => onFocus(stage.id)}
          onBlur={() => onFocus(null)}
          onClick={() => onToggle(stage.id)}
          style={{ width: box.w, height: box.h }}
          className={cn(
            "relative flex flex-col items-center justify-center text-center transition-colors duration-fast",
            "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-brand-ink",
            human
              ? cn("border-b", emphasised ? "border-brand-ink" : "border-brand/45")
              : cn(
                  "corner-ticks border bg-paper-panel",
                  emphasised ? "border-ink/40" : "border-ink/15",
                ),
          )}
        >
          {/* The activity mark. Laid exactly over the resting border so the
              box changes colour without changing size — for the system nodes
              that is the whole border, for the human ones the rule they sit
              on. Nothing else in the node responds. */}
          <span
            aria-hidden="true"
            style={{ opacity: active(stage.id) }}
            className={cn(
              "pointer-events-none absolute",
              human ? "inset-x-0 bottom-0 h-px bg-brand-ink" : "inset-0 border border-brand",
            )}
          />

          <span
            style={{ fontSize: type.label, opacity: labelPresence(stage.id) }}
            className={cn(
              "relative whitespace-nowrap font-mono font-medium uppercase leading-none tracking-[0.14em]",
              human ? "text-brand-ink" : "text-ink",
            )}
          >
            {stage.label}
          </span>

          {/* The system is the only node with anything inside it besides a
              name: three marks that light in order while it works. Interpret,
              weigh, commit — the shape of a decision, drawn as a readout
              rather than said in a caption. */}
          {stage.id === "reason" && <SystemReadout width={box.w} />}
        </button>

        <div
          id={panelId}
          aria-hidden={!emphasised}
          style={{ width: panel.w, ...openFrom(box) }}
          className={cn(
            "pointer-events-none absolute border-l border-brand/70 bg-paper-panel py-2 pl-3 pr-2.5 text-left",
            "transition-opacity duration-fast",
            emphasised ? "opacity-100" : "opacity-0",
          )}
        >
          <p style={{ fontSize: type.note }} className="leading-snug text-ink/70">
            {stage.note}
          </p>
          <ul className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-1">
            {stage.detail.map((item, index) => (
              <li
                key={item}
                style={{ fontSize: type.detail }}
                className="font-mono uppercase leading-none tracking-[0.1em] text-ink/55"
              >
                {item}
                {/* Trailing, not leading. Three of these do not always fit on
                    one line, and a wrapped line that opens with a separator
                    reads as a typo. */}
                {index < stage.detail.length - 1 && (
                  <span className="ml-1.5 text-brand" aria-hidden="true">
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * Three marks inside the system box, lighting one after another as it works.
 *
 * Driven off a single monotonic property with three different thresholds
 * rather than three properties, which is why they light in order and then stay
 * lit: a decision that has been reached does not un-reach itself. `opacity`
 * clamps its own input, so the thresholds need no `clamp()`.
 *
 * This is the internal state the system needs to have. It is three one-pixel
 * rules. Anything more literal — a spinner, a waveform, a pulsing core — would
 * be exactly the AI graphic this figure exists to avoid.
 */
function SystemReadout({ width }: { width: number }) {
  const tick = Math.max(Math.round(width * 0.075), 12);

  return (
    <span aria-hidden="true" className="relative mt-2 flex items-center gap-1.5">
      {[0, 0.34, 0.68].map((from) => (
        <span
          key={from}
          style={{
            width: tick,
            opacity: `calc((var(--ai-reason-work, 1) - ${from}) * 3.2)`,
          }}
          className="h-px bg-brand-ink"
        />
      ))}
    </span>
  );
}

/**
 * Where a node's detail opens. The decision — which side, and how it is kept
 * inside the stage — belongs to the layout, so all this does is read the
 * offset the layout already resolved.
 *
 * `position` is declared here rather than left to the `absolute` class, and
 * that is not belt-and-braces. The site's own `.corner-ticks` utility declares
 * `position: relative`, and the two are the same specificity in the same
 * cascade layer, so which one wins is decided by the order Tailwind happens to
 * emit them in. It lost: the note laid out in flow, doubled its node's height,
 * and `-translate-y-1/2` then hoisted every box in the diagram half a note
 * above its own anchor — leaving wires connected to nothing and the first
 * stage clipped off the top. An inline declaration is not in the cascade layer
 * at all, so the question cannot be reopened.
 */
function openFrom(box: Box): CSSProperties {
  return { position: "absolute", left: box.panel.x, top: box.panel.y };
}

/* ------------------------------------------------------------------ *
 * Capabilities
 * ------------------------------------------------------------------ */

interface CapabilityNodeProps {
  capability: IntelligenceCapability;
  box: Box;
  type: Layout["type"];
  emphasised: boolean;
  dimmed: boolean;
  onFocus: (id: NodeId | null) => void;
  onToggle: (id: NodeId) => void;
}

/**
 * One of the three things the system can reach for.
 *
 * These are not stages of the loop — they are what the system has to hand
 * inside one of them — so they carry no disclosure of their own. What each one
 * *is* is already printed underneath its name, which means emphasis here is
 * genuinely just emphasis: the border takes the accent and the supporting line
 * comes up out of grey. They also light whenever the system does, because
 * reaching for them is what the system is doing.
 */
export function CapabilityNode({
  capability,
  box,
  type,
  emphasised,
  dimmed,
  onFocus,
  onToggle,
}: CapabilityNodeProps) {
  const id: CapabilityId = capability.id;

  return (
    <div
      style={{ left: box.cx, top: box.cy, ...reveal(id) }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <button
        type="button"
        onPointerEnter={() => onFocus(id)}
        onPointerLeave={() => onFocus(null)}
        onFocus={() => onFocus(id)}
        onBlur={() => onFocus(null)}
        onClick={() => onToggle(id)}
        style={{ width: box.w, height: box.h }}
        className={cn(
          "relative flex flex-col items-center justify-center border border-dashed bg-paper-panel/60 px-2 text-center transition-opacity duration-fast",
          "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-brand-ink",
          emphasised ? "border-ink/35" : "border-ink/20",
          dimmed ? "opacity-45" : "opacity-100",
        )}
      >
        <span
          aria-hidden="true"
          style={{ opacity: active(id) }}
          className="pointer-events-none absolute inset-0 border border-dashed border-brand"
        />
        <span
          style={{ fontSize: type.detail, opacity: labelPresence(id) }}
          className="relative whitespace-nowrap font-mono font-medium uppercase leading-none tracking-[0.12em] text-ink"
        >
          {capability.label}
        </span>
        <span
          style={{ fontSize: type.detail }}
          className={cn(
            "relative mt-1 whitespace-nowrap leading-none transition-colors duration-fast",
            emphasised ? "text-ink/75" : "text-ink/45",
          )}
        >
          {capability.note}
        </span>
      </button>
    </div>
  );
}
