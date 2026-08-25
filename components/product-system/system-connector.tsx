"use client";

import { motion, useTime, useTransform, type MotionValue } from "motion/react";
import {
  CORE,
  LINKS,
  LINK_WINDOW,
  PHASE,
  PULSE,
  RING,
  disciplinePoint,
  lerp,
  linkKey,
  phase,
  type DisciplineId,
  type Vec,
} from "@/components/product-system/product-system-timeline";
import { cn } from "@/lib/utils";

/**
 * The links between the disciplines, and the information travelling along
 * them.
 *
 * ── Why the links morph rather than being redrawn ───────────────────────
 * Each link starts as a bowed chord between two disciplines standing apart
 * and ends as one third of the closed ring around the product experience.
 * Both endpoints and the control point are interpolated together, so the
 * triangle *bends* into a circle — the loop visibly closing is the moment the
 * section exists to deliver, and a crossfade between two shapes would throw
 * it away.
 *
 * ── Why the pulses run on time, not scroll ──────────────────────────────
 * Everything else here is scrubbed. The pulses are not, because a system that
 * stops dead the instant the reader stops scrolling does not read as a system
 * — it reads as a diagram being dragged. Their amplitude is still gated on
 * scroll (`PULSE.window`), so nothing circulates before there is a circuit,
 * and the whole layer is unmounted off-screen and under reduced motion, so
 * the frame loop only runs while there is something to see.
 *
 * Two pulses per link, launched from opposite ends. A single direction of
 * travel would draw a pipeline, which is the one thing the concept rules out.
 */

interface SystemConnectorProps {
  /** System progress, 0-1. One subscription, shared by the whole stage. */
  progress: MotionValue<number>;
  width: number;
  height: number;
  hovered: DisciplineId | null;
  /** False under reduced motion or off-screen — no circulation at all. */
  circulating: boolean;
}

/**
 * Where each link lands on the ring: the two sector edges either side of the
 * gap between its disciplines. Derived from `PLACEMENT` angles and
 * `RING.sector`, written out so the relationship is inspectable.
 */
const RING_EDGE: Record<string, [number, number]> = {
  "ux-engineering": [236, 184],
  "engineering-ai": [116, 64],
  "ai-ux": [356, 304],
};

export function SystemConnector({
  progress,
  width,
  height,
  hovered,
  circulating,
}: SystemConnectorProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
      focusable="false"
    >
      {LINKS.map(([from, to]) => (
        <Link
          key={linkKey(from, to)}
          from={from}
          to={to}
          progress={progress}
          width={width}
          height={height}
          dimmed={hovered !== null && hovered !== from && hovered !== to}
        />
      ))}

      {circulating && (
        <Circulation progress={progress} width={width} height={height} hovered={hovered} />
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Geometry
 * ------------------------------------------------------------------ */

interface Curve {
  a: Vec;
  b: Vec;
  c: Vec;
}

function polar(angle: number, radius: Vec): Vec {
  const radians = (angle * Math.PI) / 180;
  return {
    x: CORE.x + Math.cos(radians) * radius.x,
    y: CORE.y + Math.sin(radians) * radius.y,
  };
}

/**
 * The link's current shape, in stage pixels.
 *
 * Linked: a chord between the two disciplines, bowed away from the centre so
 * the three of them read as a circuit rather than a triangle of rulers.
 * Resolved: the arc of the ring spanning the gap between their two sectors —
 * the control point pushed out by `1 / cos(half the arc)`, which is where the
 * tangents meet and therefore what makes a quadratic sit on an ellipse.
 */
function linkCurve(
  from: DisciplineId,
  to: DisciplineId,
  p: number,
  width: number,
  height: number,
): Curve {
  const resolved = phase(p, PHASE.resolve);
  const scale = (v: Vec): Vec => ({ x: v.x * width, y: v.y * height });

  const a0 = disciplinePoint(from, p);
  const b0 = disciplinePoint(to, p);
  const mid = { x: (a0.x + b0.x) / 2, y: (a0.y + b0.y) / 2 };
  // Push the control point directly away from the core, so every link bows
  // outward and the three of them enclose the space the core resolves into.
  const away = { x: mid.x - CORE.x, y: mid.y - CORE.y };
  const length = Math.hypot(away.x, away.y) || 1;
  const c0 = {
    x: mid.x + (away.x / length) * RING.bow,
    y: mid.y + (away.y / length) * RING.bow,
  };

  const edges = RING_EDGE[linkKey(from, to)] ?? [0, 0];
  const a1 = polar(edges[0], RING.artifact);
  const b1 = polar(edges[1], RING.artifact);
  const half = Math.abs(edges[0] - edges[1]) / 2;
  const bulge = 1 / Math.cos((half * Math.PI) / 180);
  const c1 = polar((edges[0] + edges[1]) / 2, {
    x: RING.artifact.x * bulge,
    y: RING.artifact.y * bulge,
  });

  return {
    a: scale({ x: lerp(a0.x, a1.x, resolved), y: lerp(a0.y, a1.y, resolved) }),
    b: scale({ x: lerp(b0.x, b1.x, resolved), y: lerp(b0.y, b1.y, resolved) }),
    c: scale({ x: lerp(c0.x, c1.x, resolved), y: lerp(c0.y, c1.y, resolved) }),
  };
}

/** A point at `t` along a quadratic bezier. */
function curvePoint({ a, b, c }: Curve, t: number): Vec {
  const inv = 1 - t;
  return {
    x: inv * inv * a.x + 2 * inv * t * c.x + t * t * b.x,
    y: inv * inv * a.y + 2 * inv * t * c.y + t * t * b.y,
  };
}

/* ------------------------------------------------------------------ *
 * Elements
 * ------------------------------------------------------------------ */

interface LinkProps {
  from: DisciplineId;
  to: DisciplineId;
  progress: MotionValue<number>;
  width: number;
  height: number;
  dimmed: boolean;
}

function Link({ from, to, progress, width, height, dimmed }: LinkProps) {
  const window = LINK_WINDOW[linkKey(from, to)] ?? [0, 1];

  const d = useTransform(progress, (value) => {
    const { a, b, c } = linkCurve(from, to, value, width, height);
    return `M${a.x.toFixed(1)} ${a.y.toFixed(1)}Q${c.x.toFixed(1)} ${c.y.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  });
  const pathLength = useTransform(progress, (value) => phase(value, window));

  return (
    <motion.path
      d={d}
      fill="none"
      stroke="rgba(20,20,15,0.22)"
      strokeWidth={1}
      style={{ pathLength }}
      className={cn("transition-opacity duration-fast", dimmed ? "opacity-35" : "opacity-100")}
    />
  );
}

interface CirculationProps {
  progress: MotionValue<number>;
  width: number;
  height: number;
  hovered: DisciplineId | null;
}

function Circulation({ progress, width, height, hovered }: CirculationProps) {
  const time = useTime();

  return (
    <>
      {LINKS.map(([from, to]) => (
        <LinkCirculation
          key={linkKey(from, to)}
          from={from}
          to={to}
          time={time}
          progress={progress}
          width={width}
          height={height}
          dimmed={hovered !== null && hovered !== from && hovered !== to}
        />
      ))}
    </>
  );
}

interface LinkCirculationProps {
  from: DisciplineId;
  to: DisciplineId;
  time: MotionValue<number>;
  progress: MotionValue<number>;
  width: number;
  height: number;
  dimmed: boolean;
}

/**
 * The two pulses on one link, gated on that link's *own* draw progress as
 * well as on the global circulation window. Without the first term a pulse
 * would run the full length of a wire that is still being drawn, and be
 * visible out past the end of it — traffic on a road that is not built yet.
 */
function LinkCirculation({
  from,
  to,
  time,
  progress,
  width,
  height,
  dimmed,
}: LinkCirculationProps) {
  const window = LINK_WINDOW[linkKey(from, to)] ?? [0, 1];
  const opacity = useTransform(
    progress,
    (value) => phase(value, PULSE.window) * phase(value, window),
  );

  return (
    <motion.g style={{ opacity }}>
      {PULSE.offsets.map((offset, index) => (
        <Pulse
          key={index}
          from={from}
          to={to}
          offset={offset}
          // The second pulse runs the other way. Both disciplines are feeding
          // each other, continuously, which is the claim.
          reverse={index % 2 === 1}
          time={time}
          progress={progress}
          width={width}
          height={height}
          dimmed={dimmed}
        />
      ))}
    </motion.g>
  );
}

interface PulseProps {
  from: DisciplineId;
  to: DisciplineId;
  offset: number;
  reverse: boolean;
  time: MotionValue<number>;
  progress: MotionValue<number>;
  width: number;
  height: number;
  dimmed: boolean;
}

function Pulse({ from, to, offset, reverse, time, progress, width, height, dimmed }: PulseProps) {
  const transform = useTransform([time, progress], ([ms, value]: number[]) => {
    const cycle = ((((ms ?? 0) / 1000 / PULSE.period + offset) % 1) + 1) % 1;
    const t = reverse ? 1 - cycle : cycle;
    const point = curvePoint(linkCurve(from, to, value ?? 0, width, height), t);
    return `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})`;
  });

  return (
    <motion.g transform={transform}>
      <circle
        r={PULSE.radius}
        fill="#C9871F"
        className={cn("transition-opacity duration-fast", dimmed ? "opacity-30" : "opacity-90")}
      />
    </motion.g>
  );
}
