/**
 * FIG. 03's timeline and geometry, in one place.
 *
 * Nothing in `components/product-intelligence` declares a window, a
 * coordinate or a size of its own — the components read from here. Same
 * contract as `product-system-timeline` and `product-build-timeline`, for the
 * same reason: re-choreographing a sequence should be editing one object, not
 * hunting through five files.
 *
 * ── The system is fixed; what moves is information ──────────────────────
 * Nothing in this diagram ever changes position. Boxes do not slide, the
 * layout does not reflow, and the composition a reader sees at the end is
 * exactly where it was at the start. What the scroll drives is which parts
 * exist yet, which one is working right now, and where the signal is. That is
 * the argument: the system is constant, and intelligence is what moves through
 * it.
 *
 * So every path string is derived once from the measured stage size and
 * memoised, and the whole sequence runs on custom properties written from a
 * single scroll subscription — the technique FIG. 02 uses. None of the ~110
 * elements in the drawing re-render.
 *
 * ── Three things a stage can be ─────────────────────────────────────────
 * `STEP` says when something *arrives* — a box, a wire, a mark. `ACTIVE` says
 * when a node is *working*, which is a different shape: it comes up as the
 * signal reaches it, holds, then settles back to a floor rather than to zero,
 * because a stage that has run is not the same as a stage that has not. Four
 * of the nine nodes have two entries in `ACTIVE`: they run twice, once on the
 * first pass and again when the feedback comes back round.
 *
 * ── Coordinates ─────────────────────────────────────────────────────────
 * Node anchors are normalised 0-1 on both axes and multiplied by the stage's
 * measured pixel size. Box dimensions are *not* — a box scaled with the stage
 * would put 8px type on a tablet — so they are derived from the measured width
 * through `k` and floored at a size that keeps a mono label legible.
 */

export type StageId = "intent" | "context" | "reason" | "action" | "outcome" | "feedback";
export type CapabilityId = "data" | "tools" | "surface";
export type NodeId = StageId | CapabilityId;

export const STAGE_IDS = [
  "intent",
  "context",
  "reason",
  "action",
  "outcome",
  "feedback",
] as const satisfies readonly StageId[];

export const CAPABILITY_IDS = [
  "data",
  "tools",
  "surface",
] as const satisfies readonly CapabilityId[];

const NODE_IDS = [...STAGE_IDS, ...CAPABILITY_IDS] as const;

export function isCapability(id: NodeId): id is CapabilityId {
  return (CAPABILITY_IDS as readonly string[]).includes(id);
}

export type Window = readonly [number, number];

/* ------------------------------------------------------------------ *
 * Timeline
 * ------------------------------------------------------------------ */

/**
 * When each part of the drawing arrives, in figure progress 0-1.
 *
 * ── The bands ───────────────────────────────────────────────────────────
 * The first pass occupies 0 to 0.82 and is laid out on the eight phases the
 * loop actually has, in proportion:
 *
 *   intent 0-12 · context 12-25 · system 25-43 · reach 43-58
 *   action 58-70 · gate 70-80 · outcome 80-88 · feedback 88-100
 *
 * — all scaled into that 0-0.82, because the last fifth belongs to the second
 * pass, which is the part of this figure that is actually about feedback
 * rather than about arrows.
 *
 * ── Read the gaps ───────────────────────────────────────────────────────
 * A wire is always laid slightly before the thing it feeds, and the thing it
 * feeds always settles before the next wire starts. Those gaps are deliberate
 * and they are what stops eight phases reading as one slide. The three
 * capability branches in particular are *sequenced* — data, then tools, then
 * interface — rather than fanning out together, because three arrows appearing
 * at once says "a diagram" and three arrows leaving one after another says "a
 * system reaching for things".
 *
 * The convergence back into the action is the one place where windows overlap
 * heavily, and that is the point of it: three streams arriving together is
 * what convergence looks like.
 */
export const STEP = {
  /* ── Phase 1 · the intent (0-12%) ──────────────────────────────── */
  intent: [0.0, 0.045],
  "e-intent": [0.055, 0.1],

  /* ── Phase 2 · context (12-25%) ────────────────────────────────── */
  context: [0.1, 0.145],
  "e-context": [0.165, 0.215],

  /* ── Phase 3 · the system, and the branch off it (25-43%) ──────── */
  reason: [0.205, 0.25],
  /** The three internal marks, lighting in order. Monotonic: they stay lit. */
  "reason-work": [0.245, 0.345],
  "e-clarify": [0.3, 0.353],
  clarify: [0.318, 0.362],

  /* ── Phase 4 · what it reaches for (43-58%). One at a time. ────── */
  "e-fan-data": [0.353, 0.388],
  data: [0.374, 0.402],
  "e-fan-tools": [0.394, 0.429],
  tools: [0.415, 0.443],
  "e-fan-surface": [0.435, 0.47],
  surface: [0.456, 0.484],

  /* ── Phase 5 · the action (58-70%). Three streams, converging. ─── */
  "e-conv-data": [0.484, 0.522],
  "e-conv-tools": [0.5, 0.538],
  "e-conv-surface": [0.516, 0.554],
  action: [0.53, 0.568],

  /* ── Phase 6 · the gate (70-80%) ───────────────────────────────── */
  /** Action down to the gate — and no further, until it has passed. */
  "e-guard": [0.578, 0.612],
  /** The crossbar itself. */
  guard: [0.6, 0.63],
  /** The check that strokes in beside it. This is the validation. */
  "guard-pass": [0.63, 0.658],

  /* ── Phase 7 · the outcome (80-88%) ────────────────────────────── */
  "e-outcome": [0.662, 0.694],
  outcome: [0.678, 0.714],

  /* ── Phase 8 · the loop closing (88-100%) ──────────────────────── */
  "e-return": [0.724, 0.768],
  feedback: [0.752, 0.788],
  "e-close": [0.782, 0.822],

  /* ── Phase 9 · the second pass ─────────────────────────────────── */
  /** One signal, running the forward legs again on what feedback changed. */
  second: [0.83, 0.985],
  /**
   * The low-confidence branch standing down. On the first pass the system had
   * to ask; with the feedback in context it does not. This is the only thing
   * in the drawing that gets *quieter* as the sequence finishes, and it is the
   * clearest statement the figure makes about what feedback is actually for.
   */
  settled: [0.862, 0.96],
  /** Amplitude of the ambient circulation, once there is a closed circuit. */
  loop: [0.95, 1.0],
} as const satisfies Record<string, Window>;

export type StepId = keyof typeof STEP;

/**
 * When each node is *working*, which is not the same as when it arrives.
 *
 * Two windows means the node runs twice. Context, the system, the action and
 * the outcome all do: the feedback lands, context changes, and everything
 * downstream of it re-runs on the new context. Nothing moves and nothing is
 * redrawn — the same four boxes simply come up a second time, in order, while
 * a second signal travels between them. That is the whole of Phase 9, and it
 * is the difference between a loop that is drawn and a loop that runs.
 */
export const ACTIVE: Record<NodeId, Window[]> = {
  intent: [[0.02, 0.09]],
  context: [
    [0.125, 0.2],
    [0.83, 0.872],
  ],
  reason: [
    [0.235, 0.35],
    [0.872, 0.912],
  ],
  data: [[0.386, 0.44]],
  tools: [[0.427, 0.48]],
  surface: [[0.468, 0.52]],
  action: [
    [0.548, 0.605],
    [0.915, 0.952],
  ],
  outcome: [
    [0.696, 0.75],
    [0.948, 0.99],
  ],
  feedback: [[0.768, 0.822]],
};

/**
 * Where a node's activity settles once it has run. Not zero — a stage that has
 * already done its work still reads as part of a live system, just not as the
 * one in hand. It is also the value every node holds under reduced motion,
 * where the whole loop is shown at rest.
 */
export const ACTIVITY_FLOOR = 0.34;

/**
 * The ambient circulation, once the sequence has finished and the reader is
 * simply looking at the thing.
 *
 * Time-driven rather than scroll-driven, because a system that freezes the
 * instant the reader stops scrolling reads as a diagram being dragged. Its
 * amplitude is gated on `STEP.loop`, so nothing circulates before there is a
 * circuit, and the layer is unmounted off-screen and under reduced motion.
 */
export const SIGNAL = {
  /** Seconds for one lap of the closed loop. */
  period: 13,
  offsets: [0, 0.5],
  radius: 3,
  /** Radius of the scroll-driven heads that ride each wire as it is laid. */
  head: 3.4,
} as const;

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

/**
 * A node's activity across every window it has: up as the signal arrives, a
 * hold while it works, then a settle back to `ACTIVITY_FLOOR`. The rise takes
 * the first third of a window and the settle the last fifth, which leaves
 * roughly half of it at full strength — long enough, at this scroll distance,
 * to actually be seen.
 */
export function activity(progress: number, windows: Window[]): number {
  let strongest = 0;
  for (const [start, end] of windows) {
    const span = Math.max(end - start, 0.001);
    const rise = smoothstep((progress - start) / (span * 0.34));
    const settle = smoothstep((progress - (end - span * 0.2)) / (span * 0.2));
    strongest = Math.max(strongest, rise * (1 - (1 - ACTIVITY_FLOOR) * settle));
  }
  return strongest;
}

/**
 * How present the head of a travelling signal is at `p` along its wire. Snaps
 * on, then hands over to the arrowhead across the last quarter rather than
 * piling up on top of it.
 */
export function headOpacity(p: number): number {
  if (p <= 0 || p >= 1) return 0;
  return Math.min(p * 8, 1) * (1 - smoothstep((p - 0.75) / 0.25));
}

/* ------------------------------------------------------------------ *
 * CSS plumbing
 * ------------------------------------------------------------------ */

export function stepVar(step: StepId): string {
  return `--ai-${step}`;
}

export function activeVar(id: NodeId): string {
  return `--ai-${id}-on`;
}

/**
 * Every reference carries a fallback, and the fallbacks compose into the
 * *resolved* diagram — every wire drawn, every box present, the loop closed,
 * every node settled at its floor. So the frame between mount and the first
 * write paints the finished system rather than an empty stage, and reduced
 * motion — where the source is a pinned constant — needs no second code path.
 */
function v(step: StepId): string {
  return `var(${stepVar(step)}, 1)`;
}

/** A box, a label, a mark: present in proportion to its step. */
export function reveal(step: StepId): { opacity: string } {
  return { opacity: v(step) };
}

/** How hard a node is working, 0 to 1, resting at the floor. */
export function active(id: NodeId): string {
  return `var(${activeVar(id)}, ${ACTIVITY_FLOOR})`;
}

/**
 * A wire being *laid*, not faded in. `pathLength={1}` normalises the path to
 * one unit, so a single dash of that length slides into place as the offset
 * runs 1 → 0, whatever the path's real length is.
 */
export function draw(step: StepId): { strokeDasharray: string; strokeDashoffset: string } {
  return { strokeDasharray: "1", strokeDashoffset: `calc(1 - ${v(step)})` };
}

/**
 * The arrowhead, which lands only once its wire has arrived. Values outside
 * 0-1 are clamped by `opacity` itself, so the remap needs no `clamp()`.
 */
export function arrive(step: StepId): { opacity: string } {
  return { opacity: `calc((${v(step)} - 0.72) * 3.6)` };
}

/** Every property one scroll subscription writes onto the stage. */
export function intelligenceVars(progress: number): [string, string][] {
  const entries: [string, string][] = [];

  for (const step of Object.keys(STEP) as StepId[]) {
    entries.push([stepVar(step), phase(progress, STEP[step]).toFixed(4)]);
  }
  for (const id of NODE_IDS) {
    entries.push([activeVar(id), activity(progress, ACTIVE[id]).toFixed(4)]);
  }

  return entries;
}

/* ------------------------------------------------------------------ *
 * Placement
 * ------------------------------------------------------------------ */

export interface Point {
  x: number;
  y: number;
}

export interface Box {
  /** Centre, in stage pixels. */
  cx: number;
  cy: number;
  w: number;
  h: number;
  /** Which side this node's emphasis note opens on. */
  open: "below" | "above" | "right";
  /** Top-left of that note, as an offset from the node's own top-left. */
  panel: Point;
}

/**
 * Where each node sits, and where its emphasis note opens.
 *
 * The `open` directions are not a style choice — they are the answer to "what
 * is in the way", and specifically to what must stay visible while that node
 * is the one being read. Emphasising the system emphasises the three things it
 * reaches for, so its note cannot open downwards over them; emphasising the
 * action lights the gate below it, so that one opens sideways too. Down the
 * bottom of the spine there is no room below at all.
 *
 * Whatever the direction says, `panelSpot` still clamps the result inside the
 * stage — a note opening off the bottom edge on a short viewport would be
 * clipped by the stage's own `overflow-hidden`.
 */
const ANCHOR: Record<NodeId, { x: number; y: number; open: Box["open"] }> = {
  intent: { x: 0.5, y: 0.055, open: "right" },
  context: { x: 0.5, y: 0.195, open: "right" },
  reason: { x: 0.5, y: 0.415, open: "right" },
  data: { x: 0.3, y: 0.63, open: "below" },
  tools: { x: 0.5, y: 0.63, open: "below" },
  surface: { x: 0.7, y: 0.63, open: "below" },
  action: { x: 0.5, y: 0.785, open: "right" },
  outcome: { x: 0.5, y: 0.94, open: "right" },
  feedback: { x: 0.885, y: 0.56, open: "above" },
};

/**
 * Box dimensions at a full-width stage, and the floor below which they stop
 * shrinking. The floors are what a mono label at its own minimum size needs;
 * past that the box would be narrower than the word inside it.
 *
 * The system box is the tallest because it is the only one with anything in it
 * besides a name — three marks that light in order while it works.
 */
const SIZE: Record<NodeId, { w: number; h: number; minW: number; minH: number }> = {
  intent: { w: 200, h: 40, minW: 150, minH: 34 },
  context: { w: 220, h: 50, minW: 152, minH: 42 },
  reason: { w: 288, h: 66, minW: 200, minH: 50 },
  data: { w: 146, h: 46, minW: 112, minH: 40 },
  tools: { w: 146, h: 46, minW: 112, minH: 40 },
  surface: { w: 146, h: 46, minW: 112, minH: 40 },
  action: { w: 220, h: 50, minW: 152, minH: 42 },
  outcome: { w: 220, h: 50, minW: 152, minH: 42 },
  feedback: { w: 160, h: 42, minW: 120, minH: 36 },
};

/**
 * Type sizes are derived from the measured width rather than fixed — a label
 * set at 14px is a reasonable mark on a 1152px stage and a shout on a 700px
 * one — but every one of them is floored, because a diagram whose annotations
 * fall below 9px is a diagram nobody reads.
 */
function typeScale(k: number) {
  return {
    label: Math.max(Math.round(14 * k), 11),
    note: Math.max(Math.round(10 * k), 9),
    detail: Math.max(Math.round(9.5 * k), 9),
  };
}

/* ------------------------------------------------------------------ *
 * Geometry
 * ------------------------------------------------------------------ */

export interface Cubic {
  a: Point;
  c1: Point;
  c2: Point;
  b: Point;
}

export interface EdgeShape {
  id: string;
  step: StepId;
  d: string;
  /** The curve itself, so a signal head can ride it as it is laid. */
  curve: Cubic;
  /** Tip of the arrowhead, and the direction the wire is travelling there. */
  arrow: { x: number; y: number; angle: number };
  /** The nodes this edge joins. Hover emphasis reads this and nothing else. */
  ends: readonly NodeId[];
  /**
   * Dashed edges are the branches — the paths a system takes when it is not
   * simply proceeding. Drafting convention, and it keeps the spine readable
   * as the main line at a glance.
   */
  dashed: boolean;
}

/** One leg of the circuit, carrying its own length so a signal can pace itself. */
interface Leg {
  curve: Cubic;
  length: number;
}

export interface Layout {
  box: Record<NodeId, Box>;
  edges: EdgeShape[];
  /** Where the two branch annotations sit, in stage pixels. */
  note: Record<"clarify" | "guard", Point & { align: "left" | "right" }>;
  /** Where the validation crossbar crosses the wire out of the action. */
  gate: Point;
  /** The closed circuit, in travel order. */
  circuit: Leg[];
  perimeter: number;
  /**
   * How many of those legs the second pass runs: context through to outcome,
   * and not the return — feedback has already come back, that is what started
   * the second pass.
   */
  forward: { legs: number; length: number };
  type: ReturnType<typeof typeScale>;
  /** Width of an emphasis note, and how far it clears its node. */
  panel: { w: number; gap: number; h: number };
}

const bottom = (b: Box, dx = 0): Point => ({ x: b.cx + dx, y: b.cy + b.h / 2 });
const top = (b: Box, dx = 0): Point => ({ x: b.cx + dx, y: b.cy - b.h / 2 });
const leftOf = (b: Box): Point => ({ x: b.cx - b.w / 2, y: b.cy });
const rightOf = (b: Box): Point => ({ x: b.cx + b.w / 2, y: b.cy });

/** Leaves downward, arrives downward — the spine, and the fan either side of it. */
function down(a: Point, b: Point): Cubic {
  const bend = Math.max((b.y - a.y) * 0.45, 10);
  return { a, c1: { x: a.x, y: a.y + bend }, c2: { x: b.x, y: b.y - bend }, b };
}

/** Leaves sideways, arrives sideways — a bracket around the outside. */
function bracket(a: Point, b: Point, reach: number): Cubic {
  return { a, c1: { x: a.x + reach, y: a.y }, c2: { x: b.x + reach, y: b.y }, b };
}

/** Leaves sideways, arrives vertically. Half of a return loop. */
function elbow(a: Point, b: Point, reach: number, rise: number): Cubic {
  return { a, c1: { x: a.x + reach, y: a.y }, c2: { x: b.x, y: b.y + rise }, b };
}

/** Leaves vertically, arrives sideways. The other half. */
function elbowBack(a: Point, b: Point, rise: number, reach: number): Cubic {
  return { a, c1: { x: a.x, y: a.y + rise }, c2: { x: b.x + reach, y: b.y }, b };
}

function path({ a, c1, c2, b }: Cubic): string {
  const f = (n: number) => n.toFixed(1);
  return `M${f(a.x)} ${f(a.y)}C${f(c1.x)} ${f(c1.y)} ${f(c2.x)} ${f(c2.y)} ${f(b.x)} ${f(b.y)}`;
}

export function cubicPoint({ a, c1, c2, b }: Cubic, t: number): Point {
  const m = 1 - t;
  const w0 = m * m * m;
  const w1 = 3 * m * m * t;
  const w2 = 3 * m * t * t;
  const w3 = t * t * t;
  return {
    x: w0 * a.x + w1 * c1.x + w2 * c2.x + w3 * b.x,
    y: w0 * a.y + w1 * c1.y + w2 * c2.y + w3 * b.y,
  };
}

/**
 * Chord-sum length. Eight samples is plenty: this exists only to keep a
 * signal's speed roughly even between a 40px connector and a 500px return
 * loop, and nobody can see a five-percent error in a dot's velocity.
 */
function lengthOf(curve: Cubic): number {
  let total = 0;
  let previous = curve.a;
  for (let i = 1; i <= 8; i += 1) {
    const point = cubicPoint(curve, i / 8);
    total += Math.hypot(point.x - previous.x, point.y - previous.y);
    previous = point;
  }
  return total;
}

function edge(
  id: string,
  step: StepId,
  curve: Cubic,
  ends: readonly NodeId[],
  dashed = false,
): EdgeShape {
  const angle = (Math.atan2(curve.b.y - curve.c2.y, curve.b.x - curve.c2.x) * 180) / Math.PI;
  return {
    id,
    step,
    d: path(curve),
    curve,
    arrow: { x: curve.b.x, y: curve.b.y, angle },
    ends,
    dashed,
  };
}

/**
 * Where a node's emphasis note lands, as an offset from that node's own
 * top-left corner.
 *
 * `h` is an over-estimate — the note's real height depends on whether its one
 * line of prose wraps, which only the browser knows — and that is the safe
 * direction to be wrong in: the clamp then keeps a note further from the stage
 * edge than it strictly needs to be, rather than letting a taller one get
 * clipped.
 */
function panelSpot(box: Box, w: number, h: number, gap: number, stage: Point): Point {
  let left: number;
  let above: number;

  if (box.open === "right") {
    left = box.cx + box.w / 2 + gap;
    above = box.cy - h / 2;
  } else if (box.open === "above") {
    left = box.cx - w / 2;
    above = box.cy - box.h / 2 - gap - h;
  } else {
    left = box.cx - w / 2;
    above = box.cy + box.h / 2 + gap;
  }

  return {
    x: clamp(left, 4, Math.max(4, stage.x - w - 4)) - (box.cx - box.w / 2),
    y: clamp(above, 4, Math.max(4, stage.y - h - 4)) - (box.cy - box.h / 2),
  };
}

/**
 * The whole drawing, resolved against a measured stage.
 *
 * Called once per size change and memoised by the caller — nothing in here is
 * on the animation path.
 */
export function layout(width: number, height: number): Layout {
  const k = clamp(width / 1152, 0.62, 1);

  const panel = {
    w: Math.max(Math.round(212 * k), 168),
    gap: Math.round(12 * k),
    /** Over-estimated on purpose — see `panelSpot`. */
    h: Math.max(Math.round(84 * k), 70),
  };

  const box = {} as Record<NodeId, Box>;
  for (const id of NODE_IDS) {
    const anchor = ANCHOR[id];
    const size = SIZE[id];
    const resolved: Box = {
      cx: anchor.x * width,
      cy: anchor.y * height,
      w: Math.max(Math.round(size.w * k), size.minW),
      h: Math.max(Math.round(size.h * k), size.minH),
      open: anchor.open,
      panel: { x: 0, y: 0 },
    };
    resolved.panel = panelSpot(resolved, panel.w, panel.h, panel.gap, { x: width, y: height });
    box[id] = resolved;
  }

  // How far the two return brackets swing clear of the spine, and how wide the
  // fan spreads across the bottom of the system box.
  const reach = Math.round(96 * k);
  const sweep = Math.round(190 * k);
  const spread = box.reason.w * 0.3;
  const converge = box.action.w * 0.3;

  // The gate sits on the wire between doing something and showing it. The wire
  // is split there rather than drawn through it, so the signal genuinely stops
  // at the checkpoint and only continues once it has passed.
  const gate: Point = {
    x: box.action.cx,
    y: (bottom(box.action).y + top(box.outcome).y) / 2,
  };

  const clarify = bracket(leftOf(box.reason), leftOf(box.context), -sweep);
  const toContext = down(bottom(box.intent), top(box.context));
  const toReason = down(bottom(box.context), top(box.reason));
  const toTools = down(bottom(box.reason), top(box.tools));
  const toAction = down(bottom(box.tools), top(box.action));
  const toGate = down(bottom(box.action), gate);
  const toOutcome = down(gate, top(box.outcome));
  const toFeedback = elbow(rightOf(box.outcome), bottom(box.feedback), reach, reach);
  const closeLoop = elbowBack(top(box.feedback), rightOf(box.context), -reach, reach);

  const edges: EdgeShape[] = [
    edge("intent-context", "e-intent", toContext, ["intent", "context"]),
    edge("context-reason", "e-context", toReason, ["context", "reason"]),

    // Sequenced, not fanned. Each carries its own step.
    edge("reason-data", "e-fan-data", down(bottom(box.reason, -spread), top(box.data)), [
      "reason",
      "data",
    ]),
    edge("reason-tools", "e-fan-tools", toTools, ["reason", "tools"]),
    edge("reason-surface", "e-fan-surface", down(bottom(box.reason, spread), top(box.surface)), [
      "reason",
      "surface",
    ]),

    edge("data-action", "e-conv-data", down(bottom(box.data), top(box.action, -converge)), [
      "data",
      "action",
    ]),
    edge("tools-action", "e-conv-tools", toAction, ["tools", "action"]),
    edge("surface-action", "e-conv-surface", down(bottom(box.surface), top(box.action, converge)), [
      "surface",
      "action",
    ]),

    edge("action-gate", "e-guard", toGate, ["action", "outcome"]),
    edge("gate-outcome", "e-outcome", toOutcome, ["action", "outcome"]),
    edge("outcome-feedback", "e-return", toFeedback, ["outcome", "feedback"]),
    edge("feedback-context", "e-close", closeLoop, ["feedback", "context"]),

    // The branch. Dashed, on the opposite side to the feedback loop, and
    // pointing back at context rather than at the user: a clarifying question
    // is the system going back for more context, not an error state.
    edge("reason-context", "e-clarify", clarify, ["reason", "context"], true),
  ];

  // The circuit, in travel order. Intent is deliberately not on it — it is
  // where a lap starts, not something the system circulates. The first five
  // legs are the forward run, which is what the second pass repeats.
  const circuit = [toReason, toTools, toAction, toGate, toOutcome, toFeedback, closeLoop].map(
    (curve) => ({ curve, length: lengthOf(curve) }),
  );
  const forwardLegs = 5;
  const apex = cubicPoint(clarify, 0.5);

  return {
    box,
    edges,
    note: {
      clarify: { x: apex.x + Math.round(14 * k), y: apex.y, align: "left" },
      guard: { x: box.action.cx - Math.round(16 * k), y: gate.y, align: "right" },
    },
    gate,
    circuit,
    perimeter: circuit.reduce((sum, leg) => sum + leg.length, 0),
    forward: {
      legs: forwardLegs,
      length: circuit.slice(0, forwardLegs).reduce((sum, leg) => sum + leg.length, 0),
    },
    type: typeScale(k),
    panel,
  };
}

/** Walks `legs` of the circuit and returns the point `travelled` px along them. */
function walk(circuit: Leg[], legs: number, travelled: number): Point | null {
  let left = travelled;
  for (let i = 0; i < legs; i += 1) {
    const leg = circuit[i];
    if (!leg) break;
    if (left <= leg.length) return cubicPoint(leg.curve, clamp01(left / (leg.length || 1)));
    left -= leg.length;
  }
  return null;
}

/** Where the ambient signal is, `t` laps around the closed circuit. */
export function circuitPoint(layout: Layout, t: number): Point {
  const start = layout.circuit[0];
  if (!start) return { x: 0, y: 0 };
  const travelled = (((t % 1) + 1) % 1) * layout.perimeter;
  // `walk` only comes back empty on a floating-point overshoot at the very end
  // of a lap, where the start of the next one is the right answer anyway.
  return walk(layout.circuit, layout.circuit.length, travelled) ?? cubicPoint(start.curve, 0);
}

/** Where the second-pass signal is, `t` from 0 to 1 across the forward legs. */
export function passPoint(layout: Layout, t: number): Point {
  const start = layout.circuit[0];
  if (!start) return { x: 0, y: 0 };
  const last = layout.circuit[layout.forward.legs - 1] ?? start;
  const travelled = clamp01(t) * layout.forward.length;
  return walk(layout.circuit, layout.forward.legs, travelled) ?? cubicPoint(last.curve, 1);
}
