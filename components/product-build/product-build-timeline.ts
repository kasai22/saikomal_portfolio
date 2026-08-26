/**
 * FIG. 02's build order, in one place.
 *
 * Twenty layers grouped into the five stages an interface passes through. The
 * layers are what animates; the stages are what is being argued.
 *
 * ── Accumulation, not substitution ──────────────────────────────────────
 * Every layer's resting value is 1 and nothing here ever runs backwards on its
 * own. A layer that has arrived stays arrived: the rail is still there when the
 * header lands, both are still there when the table fills, and all of it is
 * still there when the product becomes interactive. The frame accumulates.
 *
 * The single exception is the grid, which recedes rather than leaves — it
 * drops to roughly a quarter of its drawn weight once the product is complete,
 * because the finished interface has to read as something *built on* the
 * canvas rather than something laid on top of it.
 *
 * ── Construction, not fading ────────────────────────────────────────────
 * A region does not appear, it is drawn. The helpers below scale a surface
 * from the edge it belongs to — the rail grows down from the top of its grid
 * column, the header extends along its alignment, the workspace and the
 * analytics column establish between them. Scale is applied to the *surface*,
 * never to a box with content in it, so nothing is ever rendered squashed.
 *
 * ── Reversibility ───────────────────────────────────────────────────────
 * Every offset is `calc((1 - var(--l-x)) * N)`, so scrolling back up
 * deconstructs the product in the order it was built, with no second code path.
 */

export type LayerId =
  // Idea
  | "idea"
  | "canvas"
  | "grid"
  // Structure
  | "railFrame"
  | "headFrame"
  | "workFrame"
  | "nav"
  // Design
  | "controls"
  | "kpi"
  | "data"
  | "filters"
  | "table"
  // System
  | "status"
  | "split"
  | "chart"
  | "feed"
  // Product
  | "select"
  | "detail"
  | "states"
  | "settle";

export type Window = readonly [number, number];

export interface Layer {
  id: LayerId;
  label: string;
  window: Window;
}

/**
 * When each layer is drawn, in build progress 0-1.
 *
 * ── Read the gaps, not the windows ──────────────────────────────────────
 * Nothing here runs into the next thing. Every layer finishes, and then there
 * is a stretch of progress where *nothing new starts* before the following one
 * begins. Those gaps are the point of this table: a layer that arrives while
 * the previous one is still arriving reads as a page loading, and five stages
 * that run straight into each other read as one long slide rather than as five
 * decisions. The rhythm is meant to be draw, hold, draw, hold.
 *
 * Two sizes of gap:
 *
 *   · ~0.010 *within* a stage — the sidebar lands, holds, then the header
 *     starts. Long enough to register as a separate act.
 *   · ~0.030 *between* stages — roughly three times as long, so the five
 *     stages are legible as five, and the reader gets a beat to take in what
 *     the last one produced before the next begins.
 *
 * The stage bands themselves are 0-18, 18-38, 38-60, 60-82 and 82-100. The
 * `STAGES` windows below overlap those boundaries by a point or two, because
 * the tracker above the frame should cross-fade between two stage names rather
 * than switch on a single frame — the *layers* pause at the boundary, the
 * label does not.
 */
export const LAYERS: Layer[] = [
  { id: "idea", label: "Brief", window: [0.0, 0.028] },
  { id: "canvas", label: "Canvas", window: [0.04, 0.086] },
  { id: "grid", label: "Grid", window: [0.098, 0.148] },

  { id: "railFrame", label: "Sidebar boundary", window: [0.185, 0.223] },
  { id: "headFrame", label: "Header boundary", window: [0.235, 0.273] },
  { id: "workFrame", label: "Workspace", window: [0.285, 0.323] },
  { id: "nav", label: "Navigation", window: [0.335, 0.375] },

  { id: "controls", label: "Header controls", window: [0.4, 0.43] },
  { id: "kpi", label: "Summary cards", window: [0.44, 0.472] },
  { id: "data", label: "Figures", window: [0.482, 0.508] },
  { id: "filters", label: "Filters", window: [0.518, 0.546] },
  { id: "table", label: "Table", window: [0.556, 0.6] },

  { id: "status", label: "Status", window: [0.632, 0.664] },
  // The panel assembles top to bottom. The brief names the derivation order
  // as distribution, then utilisation, then activity — but a viewer scrubbing
  // slowly reads a middle block landing before the one above it as a glitch,
  // and the derivation is already carried by the sequence (table statuses
  // light up first) and by the direction (every block enters from the table
  // side). Physical order wins over semantic order here.
  { id: "chart", label: "Utilisation", window: [0.674, 0.708] },
  { id: "split", label: "Distribution", window: [0.718, 0.75] },
  { id: "feed", label: "Activity", window: [0.76, 0.798] },

  { id: "select", label: "Selection", window: [0.828, 0.86] },
  { id: "detail", label: "Detail panel", window: [0.87, 0.904] },
  { id: "states", label: "Interaction", window: [0.914, 0.944] },
  { id: "settle", label: "Product", window: [0.956, 1.0] },
];

export interface Stage {
  label: string;
  layers: LayerId[];
  window: Window;
}

/**
 * The tracker above the frame. Each window spans its stage's layers and
 * overlaps the next by a point or two, so the emphasis crosses over rather
 * than switching — the pause belongs to the drawing, not to the label.
 */
export const STAGES: Stage[] = [
  { label: "Idea", layers: ["idea", "canvas", "grid"], window: [0.0, 0.175] },
  {
    label: "Structure",
    layers: ["railFrame", "headFrame", "workFrame", "nav"],
    window: [0.165, 0.388],
  },
  {
    label: "Design",
    layers: ["controls", "kpi", "data", "filters", "table"],
    window: [0.378, 0.615],
  },
  { label: "System", layers: ["status", "chart", "split", "feed"], window: [0.605, 0.812] },
  { label: "Product", layers: ["select", "detail", "states", "settle"], window: [0.802, 1.0] },
];

/* ------------------------------------------------------------------ *
 * Maths
 * ------------------------------------------------------------------ */

export function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

/** Flat at both ends — this is scrubbed, so nothing should lurch. */
export function smoothstep(t: number): number {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

export function phase(progress: number, [start, end]: Window): number {
  return smoothstep((progress - start) / (end - start));
}

/**
 * A stage's emphasis: rises as the stage opens, holds while its layers are
 * being drawn, settles back once the next one takes over. The floor is 0.3
 * rather than 0 — a stage that has already happened is still part of the
 * reading, it is just no longer the one in hand.
 */
export function stageEmphasis(progress: number, [start, end]: Window): number {
  const rising = smoothstep((progress - start) / 0.05);
  const falling = smoothstep((progress - end) / 0.05);
  return 0.3 + 0.7 * clamp01(rising - falling);
}

export function windowOf(id: LayerId): Window {
  return LAYERS.find((layer) => layer.id === id)?.window ?? [0, 1];
}

/* ------------------------------------------------------------------ *
 * CSS plumbing
 * ------------------------------------------------------------------ */

export function layerVar(id: LayerId): string {
  return `--l-${id}`;
}

export function stageVar(index: number): string {
  return `--st-${index}`;
}

/**
 * Every reference carries a fallback, and the fallbacks compose into the
 * *finished* product. Between mount and the first write the drawing paints as
 * the completed interface rather than as an empty frame that pops, and under
 * reduced motion — where the source is a pinned constant — the resolved state
 * is already correct before a single value is written.
 */
function v(id: LayerId): string {
  return `var(${layerVar(id)}, 1)`;
}

export function reveal(id: LayerId): { opacity: string } {
  return { opacity: v(id) };
}

type Edge = "top" | "left" | "right" | "bottom";

/**
 * A surface being *drawn* from the edge it belongs to, rather than fading in
 * from nowhere: the rail grows down its grid column, the header extends along
 * its alignment, the analytics column establishes inward from the right.
 *
 * Only ever applied to a bare surface — a border and a background with nothing
 * inside it. Scaling a box that has content in it renders the content squashed
 * for the length of the animation, which is the giveaway that something is
 * being stretched rather than built.
 */
export function drawFrom(
  id: LayerId,
  edge: Edge,
): {
  transform: string;
  transformOrigin: Edge;
} {
  const axis = edge === "top" || edge === "bottom" ? "scaleY" : "scaleX";
  return { transform: `${axis}(${v(id)})`, transformOrigin: edge };
}

/** Arrives upward into place. Cards, rows, panels. */
export function rise(id: LayerId, distance = 10): { opacity: string; transform: string } {
  return {
    opacity: v(id),
    transform: `translateY(calc((1 - ${v(id)}) * ${distance}px))`,
  };
}

/** Arrives from the side. A negative distance travels in from the left. */
export function slideX(id: LayerId, distance: number): { opacity: string; transform: string } {
  return {
    opacity: v(id),
    transform: `translateX(calc((1 - ${v(id)}) * ${distance}px))`,
  };
}

/** Slides up from under its own edge — the inspector docking into place. */
export function dock(id: LayerId): { transform: string } {
  return { transform: `translateY(calc((1 - ${v(id)}) * 110%))` };
}

/** Wipe in from the left — a rule being drawn, or cards dividing a workspace. */
export function wipeX(id: LayerId): { clipPath: string } {
  return { clipPath: `inset(0 calc((1 - ${v(id)}) * 100%) 0 0)` };
}

/** Wipe in from the top — rows filling a table, items filling a rail. */
export function wipeY(id: LayerId): { clipPath: string } {
  return { clipPath: `inset(0 0 calc((1 - ${v(id)}) * 100%) 0)` };
}

/** Grows from its own baseline. Chart columns and progress rules. */
export function grow(
  id: LayerId,
  axis: "x" | "y" = "y",
): { transform: string; transformOrigin: string } {
  return {
    transform: axis === "y" ? `scaleY(${v(id)})` : `scaleX(${v(id)})`,
    transformOrigin: axis === "y" ? "bottom" : "left",
  };
}

/**
 * How far the grid recedes once the product is complete. Not to zero: the
 * finished interface has to look like it was constructed *on* the canvas.
 */
const GRID_RECESSION = 0.72;

/**
 * Every property the stage drives, resolved for one scroll position.
 *
 * Returned as plain entries so the stage can write them all from a single
 * subscription — twenty-six `setProperty` calls on one node, rather than
 * twenty-six derived motion values each binding their own style.
 */
export function buildVars(progress: number): [string, string][] {
  const settled = phase(progress, windowOf("settle"));
  const entries: [string, string][] = [];

  for (const layer of LAYERS) {
    entries.push([layerVar(layer.id), String(phase(progress, layer.window))]);
  }
  STAGES.forEach((stage, index) => {
    entries.push([stageVar(index), String(stageEmphasis(progress, stage.window))]);
  });

  // The grid is drawn, and then it steps back. It never leaves.
  entries.push([
    "--l-grid",
    String(phase(progress, windowOf("grid")) * (1 - GRID_RECESSION * settled)),
  ]);

  return entries;
}
