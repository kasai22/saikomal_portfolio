/**
 * The two states of the hero system, as data.
 *
 * Every element in the sequence exists in exactly two places: a **scattered**
 * position (the unresolved system) and a **structured** position (the resolved
 * one). Nothing here animates and nothing here reads the DOM — the components
 * lerp between the two sets, and that is the whole transformation. Keeping the
 * geometry as plain data is what makes the sequence tunable: the composition
 * is edited here, the motion is edited in `HERO_SYSTEM`.
 *
 * ── Coordinates ─────────────────────────────────────────────────────────
 * Normalised, 0-1 on both axes, multiplied by the stage's measured pixel size
 * at render. The alternative — a fixed `viewBox` with `preserveAspectRatio` —
 * either distorts the shapes (`none`) or crops the composition out of frame on
 * wide viewports (`slice`); the hero's aspect ratio ranges from roughly 1.2 to
 * 2.5 across the devices this has to work on, which is far too wide a band for
 * either.
 *
 * ── Determinism ─────────────────────────────────────────────────────────
 * The scattered state is generated rather than hand-placed, but from a seeded
 * PRNG evaluated once at module scope. Same numbers on the server and the
 * client, same numbers on every reload — `Math.random()` here would be a
 * hydration mismatch and a system that recomposes itself on every visit.
 */

import { HERO_SYSTEM } from "@/lib/animations/constants";

/* ------------------------------------------------------------------ *
 * Maths
 * ------------------------------------------------------------------ */

export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

export function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

/**
 * The ease applied to every element's local progress.
 *
 * Smoothstep rather than the site's settle curve: this is scrubbed, so the
 * reader is driving it, and what matters is that an element neither lurches
 * the instant its window opens nor stops dead when it closes. Both ends are
 * flat.
 */
export function smoothstep(t: number): number {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

/**
 * An element's own 0-1 progress inside its slice of the master timeline. The
 * windows in `HERO_SYSTEM.tierWindows` overlap, which is what turns four tiers
 * into one wave travelling down the structure rather than four animations.
 */
export function windowProgress(progress: number, start: number, end: number): number {
  return smoothstep((progress - start) / (end - start));
}

/** Mulberry32 — small, fast, and identical everywhere. */
function seeded(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------------------------------------------ *
 * Types
 * ------------------------------------------------------------------ */

export type NodeShape = "dot" | "square" | "block";

export interface SystemNode {
  /** Which tier this node lands in. Drives its timing window and styling. */
  tier: number;
  /** Structured — where it resolves to. Normalised. */
  sx: number;
  sy: number;
  /** Scattered — where it starts. Normalised. */
  cx: number;
  cy: number;
  /** Scattered rotation, in degrees. Resolves to 0. */
  cr: number;
  /** Scattered scale. Resolves to 1. */
  cs: number;
  shape: NodeShape;
  /** Radius (dot), half-edge (square) or half-width (block), in px. */
  size: number;
}

export interface SystemLink {
  from: number;
  to: number;
  /**
   * `pruned` links are the redundant ones — the connections a workflow has
   * before anybody has mapped it. They fade out as the structure resolves
   * rather than tidying themselves into the final diagram.
   */
  kind: "core" | "pruned";
  /** How far the scattered curve bows off its chord. Normalised. */
  bow: number;
}

export type FragmentKind = "toolbar" | "rows" | "tile" | "field" | "rail";

export interface SystemFragment {
  kind: FragmentKind;
  /** Final position and size inside the assembled interface, in px. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Scattered offset from that position, as a fraction of the stage. */
  ox: number;
  oy: number;
  rot: number;
  scale: number;
}

export interface SystemGeometry {
  tiers: { label: string; y: number }[];
  nodes: SystemNode[];
  links: SystemLink[];
  fragments: SystemFragment[];
  /** Size and placement of the assembled interface composition. */
  interface: { w: number; h: number; y: number };
}

/* ------------------------------------------------------------------ *
 * Structured layout
 * ------------------------------------------------------------------ */

/**
 * Four tiers, each narrower than the one above it. The funnel is the argument:
 * many inputs, an organised workflow, a consolidated system, one product.
 * Every row is symmetrical about the centre line, because what the end of the
 * sequence has to communicate is that somebody decided where things go.
 */
const TIER_LABELS = ["User", "Workflow", "System", "Product"] as const;

const DESKTOP_TIER_Y = [0.14, 0.36, 0.58, 0.78];
const DESKTOP_TIER_X = [
  [0.1, 0.26, 0.42, 0.58, 0.74, 0.9],
  [0.16, 0.33, 0.5, 0.67, 0.84],
  [0.245, 0.415, 0.585, 0.755],
  [0.34, 0.5, 0.66],
];

const MOBILE_TIER_Y = [0.16, 0.37, 0.58, 0.76];
const MOBILE_TIER_X = [[0.16, 0.4, 0.64, 0.88], [0.24, 0.5, 0.76], [0.34, 0.66], [0.5]];

/** Tier 0 is people, tiers 1-2 are steps and services, tier 3 is surface. */
const SHAPE: NodeShape[] = ["dot", "square", "square", "block"];
const SIZE = [3.5, 6.5, 8, 13];

/**
 * How the tiers wire together. Deliberately not one-to-one: a couple of nodes
 * in each tier take two inputs, which is what stops the resolved diagram
 * reading as a rigid comb of parallel lines.
 */
const DESKTOP_EDGES: [number, number][][] = [
  [
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 2],
    [4, 3],
    [5, 4],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 1],
    [3, 2],
    [4, 3],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 1],
    [3, 2],
  ],
];

const MOBILE_EDGES: [number, number][][] = [
  [
    [0, 0],
    [1, 1],
    [2, 1],
    [3, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 1],
  ],
  [
    [0, 0],
    [1, 0],
  ],
];

/**
 * The redundant links, addressed as [tier, index] pairs. Long diagonals that
 * skip a tier — the shape of a process nobody has drawn yet.
 */
const DESKTOP_PRUNED: [[number, number], [number, number]][] = [
  [
    [0, 0],
    [2, 3],
  ],
  [
    [0, 5],
    [2, 0],
  ],
  [
    [1, 0],
    [3, 2],
  ],
];

/* ------------------------------------------------------------------ *
 * The assembled interface
 * ------------------------------------------------------------------ */

/**
 * Where the UI fragments end up: a header bar, a rail, a row list, a metric
 * tile and a labelled field, tiled into one composition. Positions are px
 * inside that box rather than normalised, because the whole point of the final
 * state is that these pieces meet exactly — proportional placement would leave
 * the seams drifting by a few px at every viewport width.
 *
 * `y` places the box low in the stage, below the hero's own content and below
 * the ellipse that keeps the copy legible, so the payoff lands in clear space.
 */
const DESKTOP_INTERFACE = { w: 520, h: 100, y: 0.87 };
const DESKTOP_FRAGMENTS: SystemFragment[] = [
  { kind: "toolbar", x: 0, y: 0, w: 520, h: 26, ox: -0.3, oy: -0.46, rot: -9, scale: 0.82 },
  { kind: "rail", x: 0, y: 34, w: 54, h: 66, ox: -0.36, oy: 0.02, rot: 11, scale: 1.15 },
  { kind: "rows", x: 62, y: 34, w: 208, h: 66, ox: 0.26, oy: -0.5, rot: 7, scale: 0.9 },
  { kind: "tile", x: 278, y: 34, w: 106, h: 66, ox: 0.34, oy: 0.06, rot: -12, scale: 1.2 },
  { kind: "field", x: 392, y: 34, w: 128, h: 66, ox: 0.12, oy: -0.62, rot: 6, scale: 0.86 },
];

const MOBILE_INTERFACE = { w: 232, h: 76, y: 0.9 };
const MOBILE_FRAGMENTS: SystemFragment[] = [
  { kind: "toolbar", x: 0, y: 0, w: 232, h: 20, ox: -0.22, oy: -0.34, rot: -8, scale: 0.86 },
  { kind: "rows", x: 0, y: 28, w: 138, h: 48, ox: 0.2, oy: -0.4, rot: 6, scale: 0.9 },
  { kind: "tile", x: 146, y: 28, w: 86, h: 48, ox: 0.24, oy: 0.08, rot: -9, scale: 1.1 },
];

/* ------------------------------------------------------------------ *
 * Assembly
 * ------------------------------------------------------------------ */

function buildGeometry(
  tierY: number[],
  tierX: number[][],
  edges: [number, number][][],
  pruned: [[number, number], [number, number]][],
  spread: { x: number; y: number },
  seed: number,
): Omit<SystemGeometry, "fragments" | "interface"> {
  const random = seeded(seed);
  const nodes: SystemNode[] = [];
  /** tier -> index within tier -> index into `nodes`. */
  const lookup: number[][] = [];

  tierX.forEach((row, tier) => {
    const inTier: number[] = [];
    row.forEach((sx) => {
      const sy = tierY[tier] ?? 0.5;
      // The scattered position keeps a faint memory of where the node ends
      // up: it is the same system unresolved, not a different one.
      const cx = clamp01(sx + (random() - 0.5) * 2 * spread.x);
      const cy = clamp01(sy + (random() - 0.5) * 2 * spread.y);
      inTier.push(nodes.length);
      nodes.push({
        tier,
        sx,
        sy,
        // Inset from the stage edges so nothing starts half-cropped.
        cx: lerp(0.05, 0.95, cx),
        cy: lerp(0.08, 0.92, cy),
        cr: (random() - 0.5) * 32,
        cs: 0.72 + random() * 0.62,
        shape: SHAPE[tier] ?? "square",
        size: SIZE[tier] ?? 6,
      });
    });
    lookup[tier] = inTier;
  });

  const links: SystemLink[] = [];
  const push = (
    a: number | undefined,
    b: number | undefined,
    kind: SystemLink["kind"],
    base: number,
  ) => {
    if (a === undefined || b === undefined) return;
    links.push({ from: a, to: b, kind, bow: (random() < 0.5 ? -1 : 1) * (base + random() * 0.18) });
  };

  edges.forEach((pairs, tier) => {
    pairs.forEach(([from, to]) => push(lookup[tier]?.[from], lookup[tier + 1]?.[to], "core", 0.1));
  });
  pruned.forEach(([[fromTier, fromIndex], [toTier, toIndex]]) =>
    push(lookup[fromTier]?.[fromIndex], lookup[toTier]?.[toIndex], "pruned", 0.16),
  );

  return { tiers: tierY.map((y, i) => ({ label: TIER_LABELS[i] ?? "", y })), nodes, links };
}

/* ------------------------------------------------------------------ *
 * The two systems
 * ------------------------------------------------------------------ */

/**
 * Desktop and tablet share one composition. Tablet drops the pruned links and
 * dampens the travel (`HERO_SYSTEM.scatter`) rather than running a different
 * layout, so the two read as the same object at two intensities.
 */
export const DESKTOP_SYSTEM: SystemGeometry = {
  ...buildGeometry(
    DESKTOP_TIER_Y,
    DESKTOP_TIER_X,
    DESKTOP_EDGES,
    DESKTOP_PRUNED,
    { x: 0.3, y: 0.32 },
    20240817,
  ),
  fragments: DESKTOP_FRAGMENTS,
  interface: DESKTOP_INTERFACE,
};

/**
 * Mobile is a smaller system, not a scaled one: ten nodes, nine links, no
 * pruned diagonals, half the travel, three fragments. Reproducing the desktop
 * field on a 390px viewport would be illegible at best.
 */
export const MOBILE_SYSTEM: SystemGeometry = {
  ...buildGeometry(MOBILE_TIER_Y, MOBILE_TIER_X, MOBILE_EDGES, [], { x: 0.22, y: 0.2 }, 909112),
  fragments: MOBILE_FRAGMENTS,
  interface: MOBILE_INTERFACE,
};

/* ------------------------------------------------------------------ *
 * Resolution
 * ------------------------------------------------------------------ */

/** A tier's own 0-1 progress. Tiers past the last window ride the last one. */
export function tierProgress(progress: number, tier: number): number {
  const windows = HERO_SYSTEM.tierWindows;
  const window = windows[Math.min(tier, windows.length - 1)] ?? [0, 1];
  return windowProgress(progress, window[0], window[1]);
}

export interface Point {
  x: number;
  y: number;
  /** This point's tier progress, so callers do not recompute it. */
  t: number;
}

/**
 * Where a node is, in stage pixels, at a given system progress.
 *
 * `scatter` scales the whole scattered state toward the structured one, which
 * is how the tablet and mobile tiers get "less movement" without a second set
 * of coordinates. Both the nodes and the connections resolve their endpoints
 * through this one function — that is what guarantees a line never detaches
 * from the node it is drawn to.
 */
export function nodePoint(
  node: SystemNode,
  progress: number,
  scatter: number,
  width: number,
  height: number,
): Point {
  const t = tierProgress(progress, node.tier);
  const k = scatter * (1 - t);
  return {
    x: (node.sx + (node.cx - node.sx) * k) * width,
    y: (node.sy + (node.cy - node.sy) * k) * height,
    t,
  };
}

/**
 * One connection as an SVG cubic, morphing from a bowed chord between two
 * scattered nodes to a squared-off vertical link between two structured ones.
 *
 * Both endpoints and both control pairs are interpolated, so the curve
 * straightens continuously rather than snapping between two shapes. The bow
 * fades on its own as well as being interpolated away, which is what keeps
 * the mid-sequence state readable instead of merely "less curved".
 */
export function linkPath(link: SystemLink, from: Point, to: Point, scatter: number): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  const tc = (from.t + to.t) / 2;

  // Perpendicular bow — the tangle. Scaled by how far either end still has
  // to travel, so a resolved pair is joined by a resolved line.
  const bow = link.bow * length * scatter * (1 - tc);
  const nx = (-dy / length) * bow;
  const ny = (dx / length) * bow;

  const c1x = lerp(from.x + dx * 0.28 + nx, from.x, tc);
  const c1y = lerp(from.y + dy * 0.28 + ny, from.y + dy * 0.42, tc);
  const c2x = lerp(from.x + dx * 0.72 + nx * 0.6, to.x, tc);
  const c2y = lerp(from.y + dy * 0.72 + ny * 0.6, to.y - dy * 0.42, tc);

  return `M${from.x.toFixed(1)} ${from.y.toFixed(1)}C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
}
