"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import { useMotionValueEvent, useTime } from "motion/react";
import {
  CAPABILITY_IDS,
  SIGNAL,
  arrive,
  circuitPoint,
  draw,
  type Layout,
  type NodeId,
  type StageId,
} from "@/components/product-intelligence/product-intelligence-timeline";

/**
 * Every wire in the system, and the signal running round it.
 *
 * ── Why the wires are laid rather than faded ────────────────────────────
 * A connector that fades in has no direction. One that draws from its source
 * towards its target says which way the information goes before the arrowhead
 * has even landed — so `pathLength={1}` normalises each path to a single unit
 * and one dash of that length slides into place as `stroke-dashoffset` runs
 * 1 → 0. The whole layer is driven by CSS custom properties written on an
 * ancestor: no motion values, no re-renders, no per-path subscriptions.
 *
 * ── The one dashed edge ─────────────────────────────────────────────────
 * `stroke-dasharray` is already spent on the draw-in, so a genuinely dashed
 * line cannot also be drawn that way. The branch therefore renders twice: a
 * fat invisible stroke in a mask, doing the draw-in, and the real dashed
 * hairline underneath it, revealed as the mask sweeps along the curve. It is
 * worth the extra element — dashing is the drafting convention for a path
 * taken conditionally, and the branch is the part of this diagram that is
 * actually about product design.
 *
 * ── The signal ──────────────────────────────────────────────────────────
 * The one thing here on the animation path. Time-driven, because a system
 * that freezes the moment the reader stops scrolling reads as a diagram being
 * dragged; amplitude gated on scroll, so nothing circulates before there is a
 * circuit; and unmounted entirely off-screen and under reduced motion.
 */

const WIRE = "rgba(20,20,15,0.22)";
const WIRE_LIVE = "#C9871F";
const BRANCH = "rgba(138,90,10,0.55)";

interface IntelligenceEdgesProps {
  layout: Layout;
  width: number;
  height: number;
  /** The stage being emphasised, if any. */
  focus: StageId | null;
  /** False under reduced motion or off-screen — no circulation at all. */
  circulating: boolean;
}

/**
 * Whether an edge is part of what the reader is currently looking at.
 *
 * Emphasising the system emphasises everything it reaches for: the fan out to
 * data, tools and interface and the results coming back are one gesture, not
 * six unrelated wires that happen to touch the same box.
 */
function related(ends: readonly NodeId[], focus: StageId | null): boolean {
  if (!focus) return true;
  if (ends.includes(focus)) return true;
  return (
    focus === "reason" && ends.some((id) => (CAPABILITY_IDS as readonly string[]).includes(id))
  );
}

export function IntelligenceEdges({
  layout,
  width,
  height,
  focus,
  circulating,
}: IntelligenceEdgesProps) {
  // `useId` emits colons, which are legal in a fragment reference but make the
  // id unusable as a CSS selector if anyone ever needs one. Cheaper to strip.
  const uid = useId().replace(/:/g, "");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
      focusable="false"
    >
      {layout.edges.map((edge) => {
        const live = focus !== null && related(edge.ends, focus);
        const dim = focus !== null && !live;
        const stroke = edge.dashed ? BRANCH : live ? WIRE_LIVE : WIRE;
        const maskId = `${uid}-${edge.id}`;

        return (
          <g
            key={edge.id}
            className="transition-opacity duration-fast"
            style={{ opacity: dim ? 0.3 : 1 }}
          >
            {edge.dashed && (
              <mask id={maskId} maskUnits="userSpaceOnUse">
                <path
                  d={edge.d}
                  fill="none"
                  stroke="#fff"
                  strokeWidth={8}
                  pathLength={1}
                  style={draw(edge.step)}
                />
              </mask>
            )}

            <path
              d={edge.d}
              fill="none"
              stroke={stroke}
              strokeWidth={1}
              {...(edge.dashed
                ? { strokeDasharray: "3 4", mask: `url(#${maskId})` }
                : { pathLength: 1, style: draw(edge.step) })}
            />

            {/* The arrowhead lands only once its wire has arrived. Drawn as a
                bare chevron rather than a filled triangle: this is a schematic,
                and a solid head at 1px stroke weight reads as a blob. */}
            <path
              d="M-4.5 -4 L0 0 L-4.5 4"
              fill="none"
              stroke={stroke}
              strokeWidth={1}
              strokeLinecap="round"
              strokeLinejoin="round"
              transform={`translate(${edge.arrow.x.toFixed(1)} ${edge.arrow.y.toFixed(1)}) rotate(${edge.arrow.angle.toFixed(1)})`}
              style={arrive(edge.step)}
            />
          </g>
        );
      })}

      {/* The gate on the way out. One crossbar on the wire between doing
          something and showing it — the schematic mark for a checkpoint, and
          the only thing standing between a decision and a user believing it. */}
      <Gate layout={layout} focus={focus} />

      {circulating && <Signal layout={layout} />}
    </svg>
  );
}

function Gate({ layout, focus }: { layout: Layout; focus: StageId | null }) {
  const { guard } = layout.note;
  const live = focus === "action" || focus === "outcome";
  const dim = focus !== null && !live;
  const span = Math.max(layout.type.label * 0.5, 6);

  return (
    <g
      className="transition-opacity duration-fast"
      style={{ opacity: dim ? 0.3 : 1 }}
      transform={`translate(${layout.box.action.cx.toFixed(1)} ${guard.y.toFixed(1)})`}
    >
      <line
        x1={-span}
        y1={0}
        x2={span}
        y2={0}
        stroke={live ? WIRE_LIVE : BRANCH}
        strokeWidth={1}
        style={arrive("e-guard")}
      />
    </g>
  );
}

/**
 * Two packets, half a lap apart, running the closed loop for as long as the
 * figure is on screen. One dot on a path this long leaves most of the system
 * looking dead between visits; two read as traffic.
 *
 * ── Why the transform is written by hand ────────────────────────────────
 * The obvious spelling is `<motion.g transform={motionValue}>`, and it does
 * not work: this version of Motion does not treat a bare `transform` prop on
 * an SVG group as animatable, so the value is computed every frame and never
 * reaches the DOM. The packets sit at the origin of the stage. (FIG. 01's
 * circulation pulses are written that way and have the same problem.)
 *
 * One subscription writes both groups' `transform` attributes directly, which
 * is the same thing the rest of this figure does with its custom properties
 * and is two attribute writes per frame rather than two motion values, two
 * subscriptions and two re-render paths.
 */
function Signal({ layout }: { layout: Layout }) {
  const time = useTime();
  const packets = useRef<(SVGGElement | null)[]>([]);

  const apply = useCallback(
    (ms: number) => {
      SIGNAL.offsets.forEach((offset, index) => {
        const node = packets.current[index];
        if (!node) return;
        const point = circuitPoint(layout, ms / 1000 / SIGNAL.period + offset);
        node.setAttribute("transform", `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})`);
      });
    },
    [layout],
  );

  useMotionValueEvent(time, "change", apply);

  // Places both packets on the circuit before the first frame fires, and moves
  // them onto the new geometry when the stage is resized.
  useEffect(() => {
    apply(time.get());
  }, [apply, time]);

  return (
    <g style={{ opacity: "var(--ai-loop, 1)" }}>
      {SIGNAL.offsets.map((offset, index) => (
        <g
          key={offset}
          ref={(node) => {
            packets.current[index] = node;
          }}
        >
          <circle r={SIGNAL.radius} fill={WIRE_LIVE} opacity={0.9} />
        </g>
      ))}
    </g>
  );
}
