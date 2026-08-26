"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import { useMotionValueEvent, useTime, type MotionValue } from "motion/react";
import {
  CAPABILITY_IDS,
  SIGNAL,
  STEP,
  arrive,
  circuitPoint,
  cubicPoint,
  draw,
  headOpacity,
  passPoint,
  phase,
  reveal,
  smoothstep,
  type Layout,
  type NodeId,
} from "@/components/product-intelligence/product-intelligence-timeline";

/**
 * Every wire in the system, and the signals moving along them.
 *
 * ── Why the wires are laid rather than faded ────────────────────────────
 * A connector that fades in has no direction. One that draws from its source
 * towards its target says which way the information goes before the arrowhead
 * has even landed — so `pathLength={1}` normalises each path to a single unit
 * and one dash of that length slides into place as `stroke-dashoffset` runs
 * 1 → 0. That much is driven by CSS custom properties written on an ancestor:
 * no motion values, no re-renders, no per-path subscriptions.
 *
 * ── The three kinds of signal ───────────────────────────────────────────
 * 1. **Heads.** A dot rides the leading edge of every wire as it is laid, so
 *    the reader is watching something *travel* rather than watching a line
 *    grow. Scroll-driven, so slowing down slows the signal down with you.
 * 2. **The second pass.** One ring, running context → system → action →
 *    outcome again once the feedback has landed. Drawn as an outline rather
 *    than a filled dot: it is the same journey being made again on better
 *    information, not a new one.
 * 3. **Ambient circulation.** Two packets going round the closed loop on a
 *    timer, once everything is drawn, so the system does not freeze solid the
 *    moment the reader stops scrolling.
 *
 * The first two are written from one subscription to the figure's progress;
 * the third from one to a clock. All of them write attributes directly rather
 * than binding motion values, which is what keeps ~110 elements from
 * re-rendering — and is also the only spelling that works: `<motion.g
 * transform={motionValue}>` is silently ignored by this version of Motion.
 *
 * ── The one dashed edge ─────────────────────────────────────────────────
 * `stroke-dasharray` is already spent on the draw-in, so a genuinely dashed
 * line cannot also be drawn that way. The branch therefore renders twice: a
 * fat invisible stroke in a mask, doing the draw-in, and the real dashed
 * hairline underneath it, revealed as the mask sweeps along the curve. Worth
 * the extra element — dashing is the drafting convention for a path taken
 * conditionally, and that branch is the part of this diagram that is actually
 * about product design.
 */

const WIRE = "rgba(20,20,15,0.22)";
const WIRE_LIVE = "#C9871F";
const BRANCH = "rgba(138,90,10,0.55)";

interface IntelligenceEdgesProps {
  layout: Layout;
  width: number;
  height: number;
  /** The figure's own progress, 0-1. Drives both scroll-driven signals. */
  progress: MotionValue<number>;
  /** The node being emphasised, if any. */
  focus: NodeId | null;
  /** False under reduced motion — nothing travels, the loop is simply drawn. */
  live: boolean;
  /** True while the stage is on screen. Gates the ambient circulation only. */
  circulating: boolean;
}

/**
 * Whether an edge is part of what the reader is currently looking at.
 *
 * Emphasising the system emphasises everything it reaches for: the fan out to
 * data, tools and interface and the results coming back are one gesture, not
 * six unrelated wires that happen to touch the same box.
 */
function related(ends: readonly NodeId[], focus: NodeId | null): boolean {
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
  progress,
  focus,
  live,
  circulating,
}: IntelligenceEdgesProps) {
  // `useId` emits colons, which are legal in a fragment reference but make the
  // id unusable as a CSS selector if anyone ever needs one. Cheaper to strip.
  const uid = useId().replace(/:/g, "");

  const heads = useRef<(SVGGElement | null)[]>([]);
  const second = useRef<SVGGElement | null>(null);

  const apply = useCallback(
    (value: number) => {
      layout.edges.forEach((edge, index) => {
        const node = heads.current[index];
        if (!node) return;
        const t = phase(value, STEP[edge.step]);
        const shown = headOpacity(t);
        node.style.opacity = shown.toFixed(3);
        // Nothing to place while it is invisible, and skipping the maths for
        // the ten or so wires that are not currently being laid is most of the
        // per-frame cost of this layer.
        if (shown > 0.001) {
          const point = cubicPoint(edge.curve, t);
          node.setAttribute("transform", `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})`);
        }
      });

      const node = second.current;
      if (node) {
        const t = phase(value, STEP.second);
        const shown = Math.min(t * 12, 1) * (1 - smoothstep((t - 0.88) / 0.12));
        node.style.opacity = shown.toFixed(3);
        if (shown > 0.001) {
          const point = passPoint(layout, t);
          node.setAttribute("transform", `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})`);
        }
      }
    },
    [layout],
  );

  useMotionValueEvent(progress, "change", apply);

  // Places every signal before the first frame fires, and moves them onto the
  // new geometry when the stage is resized.
  useEffect(() => {
    apply(progress.get());
  }, [apply, progress]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
      focusable="false"
    >
      {layout.edges.map((edge, index) => {
        const lit = focus !== null && related(edge.ends, focus);
        const dim = focus !== null && !lit;
        const stroke = edge.dashed ? BRANCH : lit ? WIRE_LIVE : WIRE;
        const maskId = `${uid}-${edge.id}`;

        return (
          <g
            key={edge.id}
            className="transition-opacity duration-fast"
            // The branch stands down on the second pass: with the feedback in
            // context the system no longer has to ask. It is the one line here
            // that ends quieter than it started, and that is the point of it.
            style={{
              opacity: dim ? 0.3 : edge.dashed ? "calc(1 - var(--ai-settled, 1) * 0.45)" : 1,
            }}
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

            {/* The head of the signal, riding the end of the wire as it is
                laid. Placed and faded imperatively — see `apply`. */}
            {live && (
              <g
                ref={(node) => {
                  heads.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <circle r={SIGNAL.head} fill={WIRE_LIVE} />
              </g>
            )}
          </g>
        );
      })}

      <Gate layout={layout} focus={focus} />

      {/* The second pass. An outline rather than a filled dot: the same
          journey being made again on what the feedback changed. */}
      {live && (
        <g ref={second} style={{ opacity: 0 }} className="transition-opacity duration-fast">
          <circle r={SIGNAL.head + 1.6} fill="none" stroke={WIRE_LIVE} strokeWidth={1.2} />
        </g>
      )}

      {circulating && <Ambient layout={layout} />}
    </svg>
  );
}

/**
 * The gate on the way out — the mark between doing something and showing it.
 *
 * Two beats, not one. The crossbar arrives first and stops the wire dead: the
 * signal reaches it and goes no further, because the wire out of the action is
 * genuinely cut in two here rather than drawn straight through. Then the check
 * strokes in beside it, and only after that does the second half of the wire
 * lay itself down towards the outcome.
 *
 * That sequence is the whole argument of this annotation. An AI product that
 * generates and displays in one motion is a demo; one that generates, checks
 * and *then* displays is a product. It is a checkpoint, not a spinner.
 */
function Gate({ layout, focus }: { layout: Layout; focus: NodeId | null }) {
  const { gate } = layout;
  const lit = focus === "action" || focus === "outcome";
  const dim = focus !== null && !lit;
  const span = Math.max(layout.type.label * 0.55, 7);
  const stroke = lit ? WIRE_LIVE : BRANCH;

  return (
    <g
      className="transition-opacity duration-fast"
      style={{ opacity: dim ? 0.3 : 1 }}
      transform={`translate(${gate.x.toFixed(1)} ${gate.y.toFixed(1)})`}
    >
      {/* The bar itself, laid across the wire the same way every other line
          in this figure is laid — a CSS transform would not do here, because
          `transform-origin` on an SVG element resolves against the viewBox
          rather than the element, so `center` would scale it about the middle
          of the whole stage. */}
      <line
        x1={-span}
        y1={0}
        x2={span}
        y2={0}
        stroke={stroke}
        strokeWidth={1}
        pathLength={1}
        style={draw("guard")}
      />
      {/* Passed. A tick, stroked in the way every other line here is. */}
      <path
        d="M-4 0.2 L-1.2 3 L4 -3.2"
        fill="none"
        stroke={stroke}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        transform={`translate(${(span + 8).toFixed(1)} 0)`}
        style={draw("guard-pass")}
      />
    </g>
  );
}

/**
 * Two packets, half a lap apart, running the closed loop for as long as the
 * figure is on screen. One dot on a path this long leaves most of the system
 * looking dead between visits; two read as traffic.
 */
function Ambient({ layout }: { layout: Layout }) {
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

  useEffect(() => {
    apply(time.get());
  }, [apply, time]);

  return (
    <g style={reveal("loop")}>
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
