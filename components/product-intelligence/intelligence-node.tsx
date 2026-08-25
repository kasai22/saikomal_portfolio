"use client";

import type { CSSProperties } from "react";
import {
  reveal,
  type Box,
  type Layout,
  type StageId,
  type StepId,
} from "@/components/product-intelligence/product-intelligence-timeline";
import { cn } from "@/lib/utils";
import type { IntelligenceCapability, IntelligenceStage } from "@/features/home/types";

/**
 * One stage of the loop, and the detail that opens off it.
 *
 * ── Two ways of being drawn, for one reason ─────────────────────────────
 * Four of these six stages belong to the system and are drawn as boxes with
 * the site's technical corner ticks. Two — the intent going in and the
 * feedback coming back — belong to the person, and are drawn as a label on a
 * rule in the accent colour, with no box at all. That is not variety. A
 * diagram that boxes the human the same way it boxes the retrieval step is a
 * diagram of a pipeline, and this one is arguing the opposite.
 *
 * ── Why it is a button ──────────────────────────────────────────────────
 * Emphasis is on pointer *and* on focus *and* on click. Hover alone would put
 * two thirds of this figure's content behind an interaction a keyboard user
 * and a tablet user cannot perform. Click-to-open is what makes the tablet
 * tier work, and it costs one handler.
 *
 * The detail region is a proper disclosure — `aria-expanded` on the control,
 * `aria-hidden` on the region while it is closed. Nothing is lost by hiding
 * it: below `md` the whole diagram is replaced by a vertical flow that lists
 * every one of these lines in the page's own HTML, so this is the second copy
 * rather than the only one.
 */

interface IntelligenceNodeProps {
  stage: IntelligenceStage;
  box: Box;
  type: Layout["type"];
  panel: Layout["panel"];
  /** The timeline step that brings this node in. */
  step: StepId;
  active: boolean;
  dimmed: boolean;
  onFocus: (id: StageId | null) => void;
  onToggle: (id: StageId) => void;
}

export function IntelligenceNode({
  stage,
  box,
  type,
  panel,
  step,
  active,
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
          dimmed ? "opacity-35" : "opacity-100",
          active && "z-30",
        )}
      >
        <button
          type="button"
          aria-expanded={active}
          aria-controls={panelId}
          onPointerEnter={() => onFocus(stage.id)}
          onPointerLeave={() => onFocus(null)}
          onFocus={() => onFocus(stage.id)}
          onBlur={() => onFocus(null)}
          onClick={() => onToggle(stage.id)}
          style={{ width: box.w, height: box.h }}
          className={cn(
            "flex items-center justify-center text-center transition-colors duration-fast",
            "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-brand-ink",
            human
              ? cn("border-b", active ? "border-brand-ink" : "border-brand/45")
              : cn(
                  "corner-ticks border bg-paper-panel",
                  active ? "border-ink/40" : "border-ink/15",
                ),
          )}
        >
          <span
            style={{ fontSize: type.label }}
            className={cn(
              "whitespace-nowrap font-mono font-medium uppercase leading-none tracking-[0.14em]",
              human ? "text-brand-ink" : active ? "text-ink" : "text-ink/85",
            )}
          >
            {stage.label}
          </span>
        </button>

        <div
          id={panelId}
          aria-hidden={!active}
          style={{ width: panel.w, ...openFrom(box) }}
          className={cn(
            "corner-ticks pointer-events-none absolute border border-ink/15 bg-paper-panel px-3 py-2.5 text-left",
            "transition-opacity duration-fast",
            active ? "opacity-100" : "opacity-0",
          )}
        >
          <p style={{ fontSize: type.note }} className="leading-snug text-ink/70">
            {stage.note}
          </p>
          <ul className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1">
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
 * Where a node's detail opens. The decision — which side, and how it is kept
 * inside the stage — belongs to the layout, so all this does is read the
 * offset the layout already resolved.
 *
 * `position` is declared here rather than left to the `absolute` class, and
 * that is not belt-and-braces. The site's own `.corner-ticks` utility declares
 * `position: relative`, and the two are the same specificity in the same
 * cascade layer, so which one wins is decided by the order Tailwind happens to
 * emit them in. It lost: the panel laid out in flow, doubled its node's
 * height, and `-translate-y-1/2` then hoisted every box in the diagram half a
 * panel above its own anchor — leaving wires connected to nothing and the
 * first stage clipped off the top. An inline declaration is not in the cascade
 * layer at all, so the question cannot be reopened.
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
  dimmed: boolean;
}

/**
 * One of the three things the system can reach for.
 *
 * Not interactive, and deliberately so: these are not stages of the loop,
 * they are what the system has to hand inside one of them. They light up when
 * the system does, because reaching for them *is* what the system is doing.
 */
export function CapabilityNode({ capability, box, type, dimmed }: CapabilityNodeProps) {
  return (
    <div
      style={{ left: box.cx, top: box.cy, ...reveal("caps") }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <div
        style={{ width: box.w, height: box.h }}
        className={cn(
          "flex flex-col items-center justify-center border border-dashed border-ink/20 bg-paper-panel/60 px-2 text-center transition-opacity duration-fast",
          dimmed ? "opacity-35" : "opacity-100",
        )}
      >
        <span
          style={{ fontSize: type.detail }}
          className="whitespace-nowrap font-mono font-medium uppercase leading-none tracking-[0.12em] text-ink/80"
        >
          {capability.label}
        </span>
        <span
          style={{ fontSize: type.detail }}
          className="mt-1 whitespace-nowrap leading-none text-ink/45"
        >
          {capability.note}
        </span>
      </div>
    </div>
  );
}
