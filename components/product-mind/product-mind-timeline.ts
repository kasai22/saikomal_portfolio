/**
 * FIG. 04's timeline and geometry, in one place.
 *
 * Same contract as the other three figures: nothing in `components/product-mind`
 * declares a window, a coordinate or a size of its own.
 *
 * ── The one figure where things actually move ───────────────────────────
 * FIG. 03 is deliberately static — a fixed system with information passing
 * through it. This one is the opposite, and for a reason: its whole subject is
 * that nine things arrive in no order and somebody has to put them in one. So
 * the nine inputs really do travel, from wherever they landed to the group
 * they belong in, and they straighten up as they go. That migration is the
 * argument; a diagram where the inputs simply faded from one arrangement to
 * another would be making a different, weaker point.
 *
 * Everything downstream of the migration — the brackets, the chain of stages —
 * is drawn rather than moved, so the movement stays the thing the eye is drawn
 * to.
 *
 * ── Cost ────────────────────────────────────────────────────────────────
 * Nine moving tokens is nine transforms per frame, written as nine custom
 * properties from one subscription. Around thirty-five elements in total. No
 * element re-renders while scrolling, and there are no particles: every single
 * mark on this canvas is a named thing.
 */

export type InputId =
  | "user"
  | "problem"
  | "research"
  | "business"
  | "tech"
  | "constraints"
  | "data"
  | "ai"
  | "workflow";

export type ClusterId = "evidence" | "boundary" | "material";
export type StageId = "insight" | "model" | "flow" | "design" | "product";

export const CLUSTER_IDS = ["evidence", "boundary", "material"] as const;
export const STAGE_IDS = ["insight", "model", "flow", "design", "product"] as const;

export type Window = readonly [number, number];

export interface Vec {
  x: number;
  y: number;
}

/* ------------------------------------------------------------------ *
 * Timeline
 * ------------------------------------------------------------------ */

/**
 * The five phases the brief asks for, in figure progress 0-1, with the gaps
 * between them that the last round of pacing work established are what stop a
 * sequence reading as one long slide.
 *
 *   1 · arrive   — nine inputs land, scattered, unconnected and slightly askew
 *   2 · gather   — they travel into three groups and straighten
 *   3 · pattern  — the groups are bracketed and named: this is what they are
 *   4 · build    — insight, then model, flow and design, one at a time
 *   5 · product  — and it resolves into something buildable
 *
 * Each stage of the chain has a wire that arrives just before the box it
 * feeds, then a hold before the next wire starts.
 */
export const STEP = {
  /* 1 — the scatter. Each token has its own slice of this, see `ARRIVAL`. */
  arrive: [0.0, 0.13],

  /* 2 — the migration. The longest single window in the figure, because it
     is the only thing in it that is genuinely a movement. */
  gather: [0.17, 0.4],

  /* 3 — brackets and names. */
  pattern: [0.4, 0.5],

  /* 4 — the chain. */
  "e-insight": [0.5, 0.545],
  insight: [0.535, 0.6],
  "e-model": [0.618, 0.658],
  model: [0.646, 0.706],
  "e-flow": [0.724, 0.764],
  flow: [0.752, 0.812],
  "e-design": [0.83, 0.87],
  design: [0.858, 0.918],

  /* 5 — the product, and the schematic that resolves inside it. */
  "e-product": [0.93, 0.965],
  product: [0.952, 1.0],
  settle: [0.975, 1.0],
} as const satisfies Record<string, Window>;

export type StepId = keyof typeof STEP;

/**
 * When each input lands, inside `STEP.arrive`.
 *
 * Staggered rather than simultaneous, and deliberately not in cluster order —
 * they turn up in the order a real brief hands them to you, which is no order
 * at all. Nine things appearing on the same frame reads as a grid being
 * revealed; nine things appearing over a couple of hundred pixels of scroll
 * reads as a problem accumulating.
 */
const ARRIVAL: InputId[] = [
  "problem",
  "user",
  "business",
  "workflow",
  "data",
  "tech",
  "research",
  "ai",
  "constraints",
];

/** That input's own arrival window, carved out of `STEP.arrive`. */
export function arrivalWindow(id: InputId): Window {
  const index = Math.max(ARRIVAL.indexOf(id), 0);
  const [start, end] = STEP.arrive;
  const each = (end - start) / ARRIVAL.length;
  // Overlapping by half a slot: they should feel like they are piling up, not
  // queueing politely.
  return [start + index * each, start + index * each + each * 1.8];
}

/**
 * When each group's bracket is drawn, inside `STEP.pattern`. Top to bottom, so
 * the three of them read as one gesture down the page rather than three marks
 * appearing at once.
 */
export function bracketWindow(id: ClusterId): Window {
  const index = Math.max((CLUSTER_IDS as readonly string[]).indexOf(id), 0);
  const [start, end] = STEP.pattern;
  const each = (end - start) / 3;
  return [start + index * each, start + index * each + each * 1.6];
}

/**
 * When each group's wire into the insight is drawn, inside `STEP["e-insight"]`.
 * Also top to bottom, so the convergence has a direction.
 */
export function feedWindow(id: ClusterId): Window {
  const index = Math.max((CLUSTER_IDS as readonly string[]).indexOf(id), 0);
  const [start, end] = STEP["e-insight"];
  const each = (end - start) / 3;
  return [start + index * each * 0.7, end];
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

/** Flat at both ends — this is scrubbed, so nothing should lurch or stop dead. */
export function smoothstep(t: number): number {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

export function phase(progress: number, [start, end]: Window): number {
  return smoothstep((progress - start) / (end - start));
}

export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/* ------------------------------------------------------------------ *
 * CSS plumbing
 * ------------------------------------------------------------------ */

export function stepVar(step: StepId): string {
  return `--m-${step}`;
}

export function inputVar(id: InputId): string {
  return `--m-t-${id}`;
}

function v(step: StepId): string {
  return `var(${stepVar(step)}, 1)`;
}

/**
 * Every reference carries a fallback of 1, and the fallbacks compose into the
 * *resolved* drawing — every group formed, every bracket drawn, the chain
 * complete. So the frame between mount and the first write paints the finished
 * figure rather than an empty canvas, and reduced motion, where the source is
 * a pinned constant, needs no second code path.
 *
 * The nine token transforms are the exception: their resolved value depends on
 * the measured stage, so their fallback is written into the markup at render
 * time instead — see `restingTransform`.
 */
export function reveal(step: StepId): { opacity: string } {
  return { opacity: v(step) };
}

/**
 * A box being uncovered from its left edge rather than faded in. The chain
 * builds rightwards, and a stage that wipes in the direction the structure is
 * growing reads as an extension of it; one that fades reads as a new thing
 * arriving from nowhere.
 */
export function wipe(step: StepId): { clipPath: string; opacity: string } {
  return { clipPath: `inset(0 calc((1 - ${v(step)}) * 100%) 0 0)`, opacity: v(step) };
}

/** A wire being laid. `pathLength={1}` normalises the path to a single unit. */
export function draw(step: StepId): { strokeDasharray: string; strokeDashoffset: string } {
  return { strokeDasharray: "1", strokeDashoffset: `calc(1 - ${v(step)})` };
}

/** The arrowhead, which lands only once its wire has arrived. */
export function arrive(step: StepId): { opacity: string } {
  return { opacity: `calc((${v(step)} - 0.72) * 3.6)` };
}

/* ------------------------------------------------------------------ *
 * Placement
 * ------------------------------------------------------------------ */

interface InputPlacement {
  cluster: ClusterId;
  /** Where it lands, before anyone has organised anything. Normalised. */
  scatter: Vec;
  /** How far out of true it sits while it is still loose, in degrees. */
  tilt: number;
  /** Which of the three rows of its group it ends up in. */
  slot: number;
}

/**
 * The scatter positions are hand-placed rather than generated. Random ones
 * clump and leave holes, and a field that is *evenly* disordered reads as
 * deliberate noise; what this needs is the specific kind of mess a real brief
 * arrives in — spread across the whole canvas, none of it aligned to anything,
 * but with nothing overlapping and nothing stranded in a corner.
 *
 * The tilts are small and all different. Nine identical angles would read as a
 * style; nine different ones read as nothing having been straightened yet.
 */
const INPUTS: Record<InputId, InputPlacement> = {
  user: { cluster: "evidence", scatter: { x: 0.15, y: 0.17 }, tilt: -5, slot: 0 },
  problem: { cluster: "evidence", scatter: { x: 0.52, y: 0.09 }, tilt: 3.5, slot: 1 },
  research: { cluster: "evidence", scatter: { x: 0.12, y: 0.73 }, tilt: 4.5, slot: 2 },
  business: { cluster: "boundary", scatter: { x: 0.3, y: 0.45 }, tilt: 2.5, slot: 0 },
  tech: { cluster: "boundary", scatter: { x: 0.69, y: 0.4 }, tilt: -3, slot: 1 },
  constraints: { cluster: "boundary", scatter: { x: 0.88, y: 0.62 }, tilt: 5, slot: 2 },
  data: { cluster: "material", scatter: { x: 0.83, y: 0.19 }, tilt: -4, slot: 0 },
  ai: { cluster: "material", scatter: { x: 0.46, y: 0.84 }, tilt: 2, slot: 1 },
  workflow: { cluster: "material", scatter: { x: 0.75, y: 0.88 }, tilt: -2.5, slot: 2 },
};

/** Centre of each group's three-row stack, once everything has been sorted. */
const CLUSTER_Y: Record<ClusterId, number> = {
  evidence: 0.215,
  boundary: 0.5,
  material: 0.785,
};

/**
 * Where the sorted column stands, how far apart its rows want to be as a
 * fraction of the stage, and the smallest gap that may ever be left between
 * two of them.
 *
 * The floor is not belt-and-braces. Row spacing is a fraction of the stage's
 * *height* and a chip's height is derived from its *width*, so on a short wide
 * viewport — a 1366x768 screen leaves about 430px here — the spacing shrinks
 * below the chip and three rows of a group overlap into what looks like one
 * box with lines through it. The floor keeps them separate at any aspect the
 * stage can be given.
 */
const COLUMN = { x: 0.085, step: 0.062, minGap: 6 } as const;

/**
 * How far the chain starts from the sorted column, as a fraction of the stage.
 *
 * The chain's *x* positions are not in this file, and that is a correction
 * rather than an omission. They used to be five fixed fractions tuned against
 * a 1152px stage, which is fine there and wrong everywhere else: box widths
 * stop shrinking at their floors while the fractions keep scaling, so by 768px
 * the design and product boxes overlapped each other and the product's caption
 * ran off the edge. The chain is now laid out from the width that is actually
 * left over — see `layout` — so the gaps are whatever the stage can afford and
 * never less than nothing.
 */
const CHAIN_LEAD = 0.052;

const SIZE = {
  token: { w: 116, h: 28, minW: 92, minH: 24 },
  stage: { w: 130, h: 46, minW: 92, minH: 40 },
  product: { w: 150, h: 70, minW: 104, minH: 58 },
  /** How far the group bracket stands off the left edge of the column. */
  bracket: 11,
} as const;

function typeScale(k: number) {
  return {
    token: Math.max(Math.round(10 * k), 9),
    stage: Math.max(Math.round(13 * k), 11),
    note: Math.max(Math.round(9.5 * k), 9),
  };
}

/* ------------------------------------------------------------------ *
 * Geometry
 * ------------------------------------------------------------------ */

export interface Box {
  cx: number;
  cy: number;
  w: number;
  h: number;
  /** Width allowed to the artefact caption under it. Wider than the box where
   *  the stage can spare it, so a short artefact stays on one line. */
  caption: number;
}

interface Cubic {
  a: Vec;
  c1: Vec;
  c2: Vec;
  b: Vec;
}

export interface EdgeShape {
  id: string;
  d: string;
  arrow: { x: number; y: number; angle: number };
}

export interface Bracket {
  id: ClusterId;
  d: string;
  /** Where the group's name sits, above its top row. */
  label: Vec;
}

export interface Layout {
  /** Where each input ends up once it has been sorted, in stage pixels. */
  resting: Record<InputId, Vec>;
  /** Vertical distance between two rows of a group, in stage pixels. */
  rowStep: number;
  /** Where each input lands before anyone sorts anything, in stage pixels. */
  loose: Record<InputId, Vec>;
  token: { w: number; h: number };
  stage: Record<StageId, Box>;
  bracket: Bracket[];
  /** One wire per group into the insight. */
  feed: Record<ClusterId, EdgeShape>;
  /** The four wires along the chain, keyed by the stage each one feeds. */
  chain: { step: StepId; edge: EdgeShape }[];
  type: ReturnType<typeof typeScale>;
}

function path({ a, c1, c2, b }: Cubic): string {
  const f = (n: number) => n.toFixed(1);
  return `M${f(a.x)} ${f(a.y)}C${f(c1.x)} ${f(c1.y)} ${f(c2.x)} ${f(c2.y)} ${f(b.x)} ${f(b.y)}`;
}

/** Leaves sideways, arrives sideways — every wire in this figure is horizontal. */
function across(a: Vec, b: Vec): EdgeShape {
  const bend = Math.max((b.x - a.x) * 0.45, 12);
  const curve: Cubic = { a, c1: { x: a.x + bend, y: a.y }, c2: { x: b.x - bend, y: b.y }, b };
  const angle = (Math.atan2(b.y - curve.c2.y, b.x - curve.c2.x) * 180) / Math.PI;
  return { id: "", d: path(curve), arrow: { x: b.x, y: b.y, angle } };
}

export function layout(width: number, height: number): Layout {
  const k = clamp(width / 1152, 0.62, 1);
  const px = (n: number, min: number) => Math.max(Math.round(n * k), min);

  const token = { w: px(SIZE.token.w, SIZE.token.minW), h: px(SIZE.token.h, SIZE.token.minH) };
  const columnX = COLUMN.x * width;
  const rowStep = Math.max(COLUMN.step * height, token.h + COLUMN.minGap);

  const resting = {} as Record<InputId, Vec>;
  const loose = {} as Record<InputId, Vec>;
  for (const id of Object.keys(INPUTS) as InputId[]) {
    const place = INPUTS[id];
    resting[id] = {
      x: columnX,
      y: CLUSTER_Y[place.cluster] * height + (place.slot - 1) * rowStep,
    };
    loose[id] = { x: place.scatter.x * width, y: place.scatter.y * height };
  }

  // Lay the chain into whatever is left of the stage once the sorted column
  // and its wires have taken their share. Five boxes and five gaps — one
  // leading gap for the converging wires, then one between each pair.
  const widths = STAGE_IDS.map((id) =>
    id === "product" ? px(SIZE.product.w, SIZE.product.minW) : px(SIZE.stage.w, SIZE.stage.minW),
  );
  const chainStart = columnX + token.w / 2 + CHAIN_LEAD * width;
  const spare = width - 8 - chainStart - widths.reduce((sum, w) => sum + w, 0);
  const gap = Math.max(spare / widths.length, 10);

  const stage = {} as Record<StageId, Box>;
  let cursor = chainStart + gap;
  STAGE_IDS.forEach((id, index) => {
    const size = id === "product" ? SIZE.product : SIZE.stage;
    const w = widths[index] ?? px(size.w, size.minW);
    const cx = cursor + w / 2;
    stage[id] = {
      cx,
      cy: 0.5 * height,
      w,
      h: px(size.h, size.minH),
      // A caption spills into four fifths of the gap either side, which keeps
      // a short artefact on one line wherever the stage can afford it. The
      // remaining fifth is what stops two neighbouring captions touching.
      //
      // The second term is what stops the *last* caption running off the edge,
      // and it is not redundant with the first: the gap only reserves room
      // between boxes, and there is no sixth box beyond the product to reserve
      // room against. Without it the product's caption overhangs the stage by
      // half a gap at every width and gets cut off by `overflow-hidden`.
      caption: Math.round(Math.min(w + gap * 0.8, 2 * Math.min(cx - 4, width - 4 - cx))),
    };
    cursor += w + gap;
  });

  const standoff = Math.round(SIZE.bracket * k);
  const bracketX = columnX - token.w / 2 - standoff;
  const tick = Math.round(6 * k);

  const bracket: Bracket[] = CLUSTER_IDS.map((id) => {
    const centre = CLUSTER_Y[id] * height;
    const top = centre - rowStep - token.h / 2;
    const foot = centre + rowStep + token.h / 2;
    const f = (n: number) => n.toFixed(1);
    return {
      id,
      // A rule with a tick turning in at each end — the drafting mark for
      // "these belong together", and the whole of what "a pattern emerged"
      // looks like when it is drawn rather than said.
      d: `M${f(bracketX + tick)} ${f(top)}H${f(bracketX)}V${f(foot)}H${f(bracketX + tick)}`,
      label: { x: bracketX, y: top - Math.round(11 * k) },
    };
  });

  const insight = stage.insight;
  const feed = {} as Record<ClusterId, EdgeShape>;
  for (const id of CLUSTER_IDS) {
    feed[id] = across(
      { x: columnX + token.w / 2, y: CLUSTER_Y[id] * height },
      { x: insight.cx - insight.w / 2, y: insight.cy },
    );
  }

  const chainOrder: [StageId, StageId, StepId][] = [
    ["insight", "model", "e-model"],
    ["model", "flow", "e-flow"],
    ["flow", "design", "e-design"],
    ["design", "product", "e-product"],
  ];
  const chain = chainOrder.map(([from, to, step]) => ({
    step,
    edge: across(
      { x: stage[from].cx + stage[from].w / 2, y: stage[from].cy },
      { x: stage[to].cx - stage[to].w / 2, y: stage[to].cy },
    ),
  }));

  return { resting, rowStep, loose, token, stage, bracket, feed, chain, type: typeScale(k) };
}

/* ------------------------------------------------------------------ *
 * The migration
 * ------------------------------------------------------------------ */

/**
 * Where one input is, and how straight it is sitting, at a given progress.
 *
 * Returned as a whole transform string so the stage can write nine of them as
 * nine custom properties — one `setProperty` per token per frame, and no
 * element re-rendering.
 */
export function inputTransform(id: InputId, progress: number, layout: Layout): string {
  const sorted = smoothstep((progress - STEP.gather[0]) / (STEP.gather[1] - STEP.gather[0]));
  const from = layout.loose[id];
  const to = layout.resting[id];
  const tilt = lerp(INPUTS[id].tilt, 0, sorted);
  const x = lerp(from.x, to.x, sorted);
  const y = lerp(from.y, to.y, sorted);
  return `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%) rotate(${tilt.toFixed(2)}deg)`;
}

/** What a token's transform should be when nothing is driving it. */
export function restingTransform(id: InputId, layout: Layout): string {
  const to = layout.resting[id];
  return `translate(${to.x.toFixed(1)}px, ${to.y.toFixed(1)}px) translate(-50%, -50%) rotate(0deg)`;
}

/** Every property one scroll subscription writes onto the stage. */
export function mindVars(progress: number, layout: Layout): [string, string][] {
  const entries: [string, string][] = [];

  for (const step of Object.keys(STEP) as StepId[]) {
    entries.push([stepVar(step), phase(progress, STEP[step]).toFixed(4)]);
  }
  for (const id of Object.keys(INPUTS) as InputId[]) {
    entries.push([`--m-in-${id}`, phase(progress, arrivalWindow(id)).toFixed(4)]);
    entries.push([inputVar(id), inputTransform(id, progress, layout)]);
  }
  for (const id of CLUSTER_IDS) {
    entries.push([`--m-br-${id}`, phase(progress, bracketWindow(id)).toFixed(4)]);
    entries.push([`--m-fd-${id}`, phase(progress, feedWindow(id)).toFixed(4)]);
  }

  return entries;
}
