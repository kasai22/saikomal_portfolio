/**
 * FIG. 03's timeline and geometry, in one place.
 *
 * Nothing in `components/product-intelligence` declares a window, a
 * coordinate or a size of its own — the components read from here. Same
 * contract as `product-system-timeline` and `product-build-timeline`, for the
 * same reason: re-choreographing a sequence should be editing one object, not
 * hunting through five files.
 *
 * ── Why the geometry is computed once, not per frame ────────────────────
 * Unlike FIG. 01, nothing here *moves*. The diagram is a fixed system; what
 * the scroll drives is how much of it has been drawn. So every path string is
 * derived from the measured stage size and memoised, and the whole sequence
 * runs on sixteen CSS custom properties written from one scroll subscription
 * — the technique FIG. 02 uses. Per-frame DOM work is sixteen `setProperty`
 * calls, and none of the ~90 elements in the drawing re-render.
 *
 * ── Coordinates ─────────────────────────────────────────────────────────
 * Node anchors are normalised 0-1 on both axes and multiplied by the stage's
 * measured pixel size. Box dimensions are *not* — a box scaled with the stage
 * would put 8px type on a tablet — so they are derived from the measured width
 * through `k` and floored at a size that keeps a mono label legible.
 *
 * ── The shape of the idea ───────────────────────────────────────────────
 * A single spine down the middle: intent, context, the system, what it can
 * reach, the action it takes, the outcome the user gets. Then two returns.
 * The right-hand one is feedback closing the loop back into context — the
 * thing that makes it a system rather than a pipeline. The left-hand one is
 * the low-confidence branch: when the system is not sure enough to act, it
 * goes back and asks. Those two edges are the whole argument. A diagram
 * without them is a flowchart of a demo.
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

export type Window = readonly [number, number];

/* ------------------------------------------------------------------ *
 * Timeline
 * ------------------------------------------------------------------ */

/**
 * The sequence, in figure progress 0-1. Every `e-` key is an edge; the rest
 * are nodes. Edges lead their target node by a few points — a connector
 * arriving at nothing and a box appearing with nothing attached to it both
 * read as broken, so the wire is always laid just before the thing it feeds.
 *
 * Windows overlap across every boundary. Stages that wait for the previous
 * one to finish read as eight animations queued up rather than one system
 * coming online.
 */
export const STEP = {
  /** Intent enters. */
  intent: [0.0, 0.09],
  "e-intent": [0.05, 0.16],
  /** Context is assembled around it. */
  context: [0.12, 0.24],
  "e-context": [0.21, 0.32],
  /** The system comes online. */
  reason: [0.29, 0.4],
  /** It reaches for what it can use... */
  "e-fan": [0.38, 0.5],
  caps: [0.44, 0.55],
  /** ...and what comes back is what the decision is made on. */
  "e-converge": [0.52, 0.64],
  /** Not sure enough to act: go back and ask. */
  "e-clarify": [0.48, 0.6],
  /** Something is done. */
  action: [0.62, 0.72],
  /** Checked before it is shown. */
  "e-guard": [0.7, 0.8],
  /** The user gets a result. */
  outcome: [0.78, 0.87],
  "e-return": [0.84, 0.92],
  /** And answers it. */
  feedback: [0.88, 0.95],
  "e-close": [0.92, 1.0],
  /** Amplitude of the circulating signal, once there is a circuit to run. */
  loop: [0.93, 1.0],
} as const satisfies Record<string, Window>;

export type StepId = keyof typeof STEP;

/**
 * The signal that keeps moving once the loop is closed.
 *
 * Time-driven rather than scroll-driven, for the reason FIG. 01's pulses are:
 * a system that stops dead the instant the reader stops scrolling reads as a
 * diagram being dragged, not as something running. Amplitude is still gated
 * on `STEP.loop`, so nothing circulates before there is a circuit, and the
 * layer is unmounted off-screen and under reduced motion.
 *
 * Two packets, half a lap apart. One is a dot on a long path; two read as
 * traffic.
 */
export const SIGNAL = {
  /** Seconds for one lap of the closed loop. */
  period: 11,
  offsets: [0, 0.5],
  radius: 3,
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

/* ------------------------------------------------------------------ *
 * CSS plumbing
 * ------------------------------------------------------------------ */

export function stepVar(step: StepId): string {
  return `--ai-${step}`;
}

/**
 * Every reference carries a fallback of 1, and the fallbacks compose into the
 * *resolved* diagram — every wire drawn, every box present, the loop closed.
 * So the frame between mount and the first write paints the finished system
 * rather than an empty stage, and reduced motion — where the source is a
 * pinned constant — needs no second code path.
 */
function v(step: StepId): string {
  return `var(${stepVar(step)}, 1)`;
}

/** A box, a label, an annotation: present in proportion to its step. */
export function reveal(step: StepId): { opacity: string } {
  return { opacity: v(step) };
}

/**
 * A wire being *laid*, not faded in. `pathLength={1}` normalises the path to
 * one unit, so a single dash of length 1 slides into place as the offset runs
 * 1 → 0, whatever the path's real length is.
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

/** The sixteen properties one scroll subscription writes onto the stage. */
export function intelligenceVars(progress: number): [string, string][] {
  return (Object.keys(STEP) as StepId[]).map((step) => [
    stepVar(step),
    phase(progress, STEP[step]).toFixed(4),
  ]);
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
  /** Which side this node's emphasis panel opens on. */
  open: "below" | "above" | "right";
  /** Top-left of that panel, as an offset from the node's own top-left. */
  panel: Point;
}

/**
 * Where each node sits, and where its emphasis panel opens.
 *
 * The `open` directions are not a style choice — they are the answer to "what
 * is in the way", and specifically to what must stay visible while that node
 * is the one being read. Emphasising the system emphasises the three things it
 * reaches for, so its panel cannot open downwards over them; emphasising the
 * action lights the gate below it, so that one opens sideways too. Down the
 * bottom of the spine there is simply no room below at all.
 *
 * Whatever the direction says, `panelSpot` still clamps the result inside the
 * stage — a panel opening off the bottom edge on a short viewport would be
 * clipped by the stage's own `overflow-hidden`.
 */
const ANCHOR: Record<NodeId, { x: number; y: number; open: Box["open"] }> = {
  intent: { x: 0.5, y: 0.055, open: "right" },
  context: { x: 0.5, y: 0.195, open: "right" },
  reason: { x: 0.5, y: 0.415, open: "right" },
  data: { x: 0.3, y: 0.63, open: "below" },
  tools: { x: 0.5, y: 0.63, open: "below" },
  surface: { x: 0.7, y: 0.63, open: "below" },
  action: { x: 0.5, y: 0.8, open: "right" },
  outcome: { x: 0.5, y: 0.945, open: "right" },
  feedback: { x: 0.885, y: 0.56, open: "above" },
};

/**
 * Box dimensions at a full-width stage, and the floor below which they stop
 * shrinking. The floors are what a mono label at its own minimum size needs;
 * past that the box would be narrower than the word inside it.
 */
const SIZE: Record<NodeId, { w: number; h: number; minW: number; minH: number }> = {
  intent: { w: 200, h: 40, minW: 150, minH: 34 },
  context: { w: 220, h: 46, minW: 152, minH: 38 },
  reason: { w: 288, h: 56, minW: 200, minH: 46 },
  data: { w: 146, h: 46, minW: 112, minH: 40 },
  tools: { w: 146, h: 46, minW: 112, minH: 40 },
  surface: { w: 146, h: 46, minW: 112, minH: 40 },
  action: { w: 220, h: 46, minW: 152, minH: 38 },
  outcome: { w: 220, h: 46, minW: 152, minH: 38 },
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

interface Cubic {
  a: Point;
  c1: Point;
  c2: Point;
  b: Point;
}

export interface EdgeShape {
  id: string;
  step: StepId;
  d: string;
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

/** One leg of the circuit, carrying its own length so the signal can pace itself. */
interface Leg {
  curve: Cubic;
  length: number;
}

export interface Layout {
  box: Record<NodeId, Box>;
  edges: EdgeShape[];
  /**
   * Where the two branch annotations sit, in stage pixels, and which edge of
   * the label that point is. The gate's note hangs to the *left* of the spine
   * because the right of it is the column every emphasis panel opens into.
   */
  note: Record<"clarify" | "guard", Point & { align: "left" | "right" }>;
  /** The closed circuit the signal travels, in travel order. */
  circuit: Leg[];
  perimeter: number;
  type: ReturnType<typeof typeScale>;
  /** Width of an emphasis panel, how far it clears its node, and its assumed height. */
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
 * Chord-sum length. Eight samples is plenty: this exists only to keep the
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
  return { id, step, d: path(curve), arrow: { x: curve.b.x, y: curve.b.y, angle }, ends, dashed };
}

/**
 * Where a node's emphasis panel lands, as an offset from that node's own
 * top-left corner.
 *
 * `height` is an over-estimate — the panel's real height depends on whether
 * its one line of prose wraps, which only the browser knows — and that is the
 * safe direction to be wrong in: the clamp then keeps a panel further from the
 * stage edge than it strictly needs to be, rather than letting a taller one
 * get clipped.
 */
function panelSpot(box: Box, w: number, h: number, gap: number, stage: Point): Point {
  let left: number;
  let top: number;

  if (box.open === "right") {
    left = box.cx + box.w / 2 + gap;
    top = box.cy - h / 2;
  } else if (box.open === "above") {
    left = box.cx - w / 2;
    top = box.cy - box.h / 2 - gap - h;
  } else {
    left = box.cx - w / 2;
    top = box.cy + box.h / 2 + gap;
  }

  return {
    x: clamp(left, 4, Math.max(4, stage.x - w - 4)) - (box.cx - box.w / 2),
    y: clamp(top, 4, Math.max(4, stage.y - h - 4)) - (box.cy - box.h / 2),
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
    w: Math.max(Math.round(232 * k), 176),
    gap: Math.round(10 * k),
    /** Over-estimated on purpose — see `panelSpot`. */
    h: Math.max(Math.round(92 * k), 76),
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

  const clarify = bracket(leftOf(box.reason), leftOf(box.context), -sweep);
  const toContext = down(bottom(box.intent), top(box.context));
  const toReason = down(bottom(box.context), top(box.reason));
  const toTools = down(bottom(box.reason), top(box.tools));
  const toAction = down(bottom(box.tools), top(box.action));
  const toOutcome = down(bottom(box.action), top(box.outcome));
  const toFeedback = elbow(rightOf(box.outcome), bottom(box.feedback), reach, reach);
  const closeLoop = elbowBack(top(box.feedback), rightOf(box.context), -reach, reach);

  const edges: EdgeShape[] = [
    edge("intent-context", "e-intent", toContext, ["intent", "context"]),
    edge("context-reason", "e-context", toReason, ["context", "reason"]),

    edge("reason-data", "e-fan", down(bottom(box.reason, -spread), top(box.data)), [
      "reason",
      "data",
    ]),
    edge("reason-tools", "e-fan", toTools, ["reason", "tools"]),
    edge("reason-surface", "e-fan", down(bottom(box.reason, spread), top(box.surface)), [
      "reason",
      "surface",
    ]),

    edge("data-action", "e-converge", down(bottom(box.data), top(box.action, -converge)), [
      "data",
      "action",
    ]),
    edge("tools-action", "e-converge", toAction, ["tools", "action"]),
    edge("surface-action", "e-converge", down(bottom(box.surface), top(box.action, converge)), [
      "surface",
      "action",
    ]),

    edge("action-outcome", "e-guard", toOutcome, ["action", "outcome"]),
    edge("outcome-feedback", "e-return", toFeedback, ["outcome", "feedback"]),
    edge("feedback-context", "e-close", closeLoop, ["feedback", "context"]),

    // The branch. Dashed, on the opposite side to the feedback loop, and
    // pointing back at context rather than at the user: a clarifying question
    // is the system going back for more context, not an error state.
    edge("reason-context", "e-clarify", clarify, ["reason", "context"], true),
  ];

  // The closed loop, in travel order. Intent is deliberately not on it — it is
  // where a lap starts, not something the system circulates.
  const circuit = [toReason, toTools, toAction, toOutcome, toFeedback, closeLoop].map((curve) => ({
    curve,
    length: lengthOf(curve),
  }));
  const apex = cubicPoint(clarify, 0.5);

  return {
    box,
    edges,
    note: {
      clarify: { x: apex.x + Math.round(14 * k), y: apex.y, align: "left" },
      guard: {
        x: box.action.cx - Math.round(14 * k),
        y: (bottom(box.action).y + top(box.outcome).y) / 2,
        align: "right",
      },
    },
    circuit,
    perimeter: circuit.reduce((sum, leg) => sum + leg.length, 0),
    type: typeScale(k),
    panel,
  };
}

/** Where the signal is, `t` laps around the closed circuit. */
export function circuitPoint({ circuit, perimeter }: Layout, t: number): Point {
  const start = circuit[0];
  if (!start) return { x: 0, y: 0 };

  let travelled = (((t % 1) + 1) % 1) * perimeter;
  for (const leg of circuit) {
    if (travelled <= leg.length) {
      return cubicPoint(leg.curve, clamp01(travelled / (leg.length || 1)));
    }
    travelled -= leg.length;
  }
  // Only reachable on a floating-point overshoot at the very end of a lap,
  // where the start of the next one is the right answer anyway.
  return cubicPoint(start.curve, 0);
}
