/**
 * The product system's timeline and geometry, in one place.
 *
 * Nothing in `components/product-system` declares a window, a coordinate or a
 * size of its own — the components read from here and interpolate. That is the
 * difference between a sequence that can be re-choreographed and one that has
 * to be re-found across five files.
 *
 * ── Coordinates ─────────────────────────────────────────────────────────
 * Normalised 0-1 on both axes, multiplied by the stage's measured pixel size
 * at render, so the composition fills whatever box it is given without
 * distortion. Sizes that must stay legible (type, token padding) are derived
 * from the measured width instead, by `stageScale`.
 *
 * ── The shape of the idea ───────────────────────────────────────────────
 * Three disciplines start far apart, each with its own artifacts stacked
 * underneath it. They draw together and wire to each other — every pair, in
 * both directions, never a chain. Their artifacts then leave home and travel
 * into a single ring, where each discipline keeps its own 72-degree sector but
 * the ring itself is continuous. The product experience resolves at the centre
 * of that ring, and the discipline names — which began at headline scale —
 * shrink to annotation tags on the outside. The hierarchy inverts: that
 * inversion is the argument.
 */

export type DisciplineId = "ux" | "engineering" | "ai";

export interface Vec {
  x: number;
  y: number;
}

/* ------------------------------------------------------------------ *
 * Timeline
 * ------------------------------------------------------------------ */

export type Window = readonly [number, number];

/**
 * Phase windows in system progress, 0-1. They overlap deliberately: a system
 * whose stages start only once the previous one has finished reads as four
 * animations queued up, not as one thing happening.
 *
 * The first fifth of the timeline has no window of its own. That is the point
 * of it — three separate systems, at rest, far apart, with nothing being
 * driven until the reader has had a moment to see that there are three.
 */
export const PHASE = {
  /** 20-40% — UX and Engineering draw together and wire to each other. */
  couple: [0.16, 0.46],
  /** 40-60% — AI joins, and connects to both rather than to the end of a chain. */
  aiJoin: [0.34, 0.58],
  /** 60-80% — artifacts leave their disciplines and travel into the ring. */
  merge: [0.56, 0.86],
  /** 80-100% — the loop closes and the product experience resolves. */
  resolve: [0.74, 1],
} as const satisfies Record<string, Window>;

/**
 * AI is present from the very first frame, quietly.
 *
 * The section opens on *three* separate systems — that is the state the whole
 * sequence departs from — so AI cannot be absent until it joins. What happens
 * at `PHASE.aiJoin` is that it comes to full strength and wires in, which is
 * what "AI enters the system" means here: a capability already in the practice
 * being brought into the loop, not a fourth thing arriving from outside.
 */
export const AI_PRESENCE = { before: 0.35, after: 1 } as const;

/** When each of the three links draws itself. Every pair, both directions. */
export const LINK_WINDOW: Record<string, Window> = {
  "ux-engineering": [0.2, 0.44],
  "engineering-ai": [0.42, 0.62],
  "ai-ux": [0.46, 0.66],
};

/* ------------------------------------------------------------------ *
 * Placement
 * ------------------------------------------------------------------ */

export interface Placement {
  /** Phase 0 — as far apart as the stage allows. */
  apart: Vec;
  /** Phases 2-4 — drawn together and wired. */
  linked: Vec;
  /** Phase 5 — a tag on the rim, outside the ring. */
  rim: Vec;
  /**
   * Centre of this discipline's sector on the ring, in screen degrees
   * (0 is right, 90 is down). UX takes the top, Engineering the lower left,
   * AI the lower right.
   */
  angle: number;
}

export const PLACEMENT: Record<DisciplineId, Placement> = {
  ux: {
    apart: { x: 0.5, y: 0.04 },
    linked: { x: 0.5, y: 0.07 },
    rim: { x: 0.5, y: 0.11 },
    angle: 270,
  },
  engineering: {
    apart: { x: 0.15, y: 0.48 },
    linked: { x: 0.22, y: 0.44 },
    rim: { x: 0.2, y: 0.82 },
    angle: 150,
  },
  ai: {
    apart: { x: 0.85, y: 0.48 },
    linked: { x: 0.78, y: 0.44 },
    rim: { x: 0.8, y: 0.82 },
    angle: 30,
  },
};

/** The centre of the ring, and of the product experience that resolves in it. */
export const CORE: Vec = { x: 0.5, y: 0.52 };

/** Where an artifact sits under its discipline before it joins the ring. */
export const STACK = {
  /** Gap between the discipline label and its first artifact. */
  offset: 0.115,
  /** Gap between artifacts. */
  step: 0.062,
} as const;

/**
 * The ring the artifacts settle onto. Elliptical rather than circular because
 * the stage is wider than it is tall, and a circle inside a 16:9 box leaves
 * the sides empty and crowds the top and bottom.
 */
export const RING = {
  /** Radius of the artifact ring, as a fraction of the stage. */
  artifact: { x: 0.27, y: 0.3 },
  /** Half-width of a discipline's sector, in degrees. Four artifacts inside. */
  sector: 34,
  /** How far the connector bows out between two disciplines, before it closes. */
  bow: 0.14,
} as const;

/* ------------------------------------------------------------------ *
 * Circulation
 * ------------------------------------------------------------------ */

/**
 * The pulses that travel the links once the system is wired.
 *
 * Two per link, launched from opposite ends, because the entire claim is that
 * these disciplines feed each other continuously rather than handing work
 * down a pipeline. A single direction of travel would draw the thing the
 * concept explicitly rules out.
 *
 * They are time-driven rather than scroll-driven — a system that stops dead
 * when the reader stops scrolling does not read as alive — but their
 * amplitude is gated on how far the sequence has assembled, so nothing moves
 * until there is a system for it to move through, and nothing moves at all
 * under reduced motion.
 */
export const PULSE = {
  /** Seconds for one traverse of a link. */
  period: 5.2,
  /** Offsets down the link at t=0, so the pulses are not in lockstep. */
  offsets: [0, 0.5],
  /** Where circulation starts and reaches full strength, in system progress. */
  window: [0.3, 0.66] as Window,
  radius: 2.6,
} as const;

/* ------------------------------------------------------------------ *
 * Sizing
 * ------------------------------------------------------------------ */

/**
 * Type and token sizes are derived from the stage's measured width rather
 * than fixed: a discipline name set at 30px is a quarter of a 1152px stage
 * and half of a 720px one, and at the smaller size it would run off its own
 * anchor. Everything scales together off one number.
 */
export function stageScale(width: number) {
  const k = clamp(width / 1152, 0.62, 1);
  return {
    /** Discipline name, at its *largest*. It only ever scales down from here. */
    label: Math.round(30 * k),
    /** The scale a discipline name lands on once it becomes a rim tag. */
    tagScale: 0.38,
    artifact: Math.round(11 * k),
    core: Math.round(30 * k),
    coreWidth: Math.round(360 * k),
  };
}

/* ------------------------------------------------------------------ *
 * Maths
 * ------------------------------------------------------------------ */

export function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}

export function clamp01(value: number): number {
  return clamp(value, 0, 1);
}

export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

export function lerpVec(from: Vec, to: Vec, t: number): Vec {
  return { x: lerp(from.x, to.x, t), y: lerp(from.y, to.y, t) };
}

/** Flat at both ends — this is scrubbed, so nothing should lurch or stop dead. */
export function smoothstep(t: number): number {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

/** An element's own 0-1 progress inside its window of the master timeline. */
export function phase(progress: number, [start, end]: Window): number {
  return smoothstep((progress - start) / (end - start));
}

/**
 * Where a discipline is at a given progress: apart, drawn in, then out to the
 * rim. Two lerps rather than three keyframes, so the two motions can overlap
 * without either of them snapping.
 */
export function disciplinePoint(id: DisciplineId, progress: number): Vec {
  const place = PLACEMENT[id];
  const gathered = lerpVec(place.apart, place.linked, phase(progress, PHASE.couple));
  return lerpVec(gathered, place.rim, phase(progress, PHASE.resolve));
}

/** A point on the artifact ring, for artifact `index` of a discipline. */
export function ringPoint(id: DisciplineId, index: number, total: number): Vec {
  const { angle } = PLACEMENT[id];
  // Spread the discipline's artifacts evenly across its own sector, so the
  // groups stay legible while the ring itself stays continuous.
  const spread = total > 1 ? (index / (total - 1) - 0.5) * 2 * RING.sector : 0;
  const radians = ((angle + spread) * Math.PI) / 180;
  return {
    x: CORE.x + Math.cos(radians) * RING.artifact.x,
    y: CORE.y + Math.sin(radians) * RING.artifact.y,
  };
}

/**
 * Where an artifact is: stacked under its discipline, travelling, or on the
 * ring. Home is resolved through `disciplinePoint`, so an artifact stays
 * attached to its discipline while the discipline itself is still moving.
 */
export function artifactPoint(
  id: DisciplineId,
  index: number,
  total: number,
  progress: number,
): Vec {
  const home = disciplinePoint(id, progress);
  const stacked = {
    x: home.x,
    y: home.y + STACK.offset + index * STACK.step,
  };
  return lerpVec(stacked, ringPoint(id, index, total), phase(progress, PHASE.merge));
}

/**
 * The three links, as ordered pairs. Every discipline is connected to every
 * other one — there is no first and no last, which is the point.
 */
export const LINKS: [DisciplineId, DisciplineId][] = [
  ["ux", "engineering"],
  ["engineering", "ai"],
  ["ai", "ux"],
];

export function linkKey(from: DisciplineId, to: DisciplineId): string {
  return `${from}-${to}`;
}
