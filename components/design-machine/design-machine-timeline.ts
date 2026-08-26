/**
 * FIG. 05's timeline, camera and geometry, in one place.
 *
 * Same contract as the other four figures: nothing in `components/design-machine`
 * declares a window, a coordinate or a size of its own.
 *
 * ── The camera ──────────────────────────────────────────────────────────
 * This is the only figure with one. The machine is laid out end to end across
 * a plane nearly three times wider than the stage that shows it, and what the
 * scroll drives is where along that plane the reader is standing. It is a
 * dolly, not a zoom: the plane slides, three layers of it slide at three
 * different rates, and the piece being worked on stays put in the middle of
 * frame while the apparatus travels past it. That last inversion is what makes
 * it read as travelling *through* a machine rather than watching one scroll
 * by.
 *
 * No 3D, no perspective transform and no WebGL. Depth here is three translate
 * rates and nothing else, which is all a side-on dolly can actually show — a
 * real perspective camera moving parallel to a flat assembly would produce
 * exactly this and no more.
 *
 * ── Dwell, then travel ──────────────────────────────────────────────────
 * The camera does not slide at a constant rate. Each station gets a third of
 * its segment standing still — long enough to read the part, the step and what
 * it puts out — and then the camera moves on. That hold is the difference
 * between a tour and a pan.
 */

export type StationId = "input" | "filter" | "form" | "construct" | "test" | "output";

export const STATION_IDS = [
  "input",
  "filter",
  "form",
  "construct",
  "test",
  "output",
] as const satisfies readonly StationId[];

export type Window = readonly [number, number];

/* ------------------------------------------------------------------ *
 * The plane
 * ------------------------------------------------------------------ */

/**
 * How much wider the machine is than the stage it is seen through, and where
 * along the stage the camera holds each station.
 *
 * `FOCUS` is left of centre on purpose. The piece being worked sits there, and
 * the room to its right is what the next station occupies as it arrives — so a
 * reader can always see what is coming before it becomes the subject.
 */
export const PLANE = { width: 2.85, focus: 0.42 } as const;

/**
 * Where each station's centre sits along the plane, 0-1.
 *
 * Exported because the camera and the layout have to agree on it exactly: the
 * camera aims at these, the stations are drawn at these, and the frame's
 * mounting ticks are dropped under these. Three readers, one list.
 */
export const STATION_X: Record<StationId, number> = {
  input: 0.075,
  filter: 0.235,
  form: 0.395,
  construct: 0.555,
  test: 0.712,
  output: 0.895,
};

/**
 * How the three depth planes move relative to the camera.
 *
 * The structure behind the machine moves slower because it is further away;
 * the index numerals move faster because they are nearer. Two numbers either
 * side of 1 is the whole of the depth system, and it is enough — anything
 * more elaborate on a side-on dolly reads as drift rather than distance.
 */
export const DEPTH = { back: 0.62, mid: 1, fore: 1.16 } as const;

/* ------------------------------------------------------------------ *
 * Timeline
 * ------------------------------------------------------------------ */

/**
 * The eight beats the brief asks for, mapped onto six stations.
 *
 * Progress is divided into five equal segments, one per gap between stations,
 * so `t = progress * 5` is a station index with a fraction. Everything below
 * is expressed against that rather than against raw progress, which is what
 * keeps the dwell even however many stations there are.
 */
export const SEGMENTS = STATION_IDS.length - 1;

/** The fraction of each segment the camera spends standing still. */
const DWELL = 0.36;

/** Where the problem enters, and where the finished thing is handed over. */
export const EDGE = {
  /** The problem arriving at the intake, before the camera has moved at all. */
  arrive: [0.0, 0.055] as Window,
  /** The real screen resolving inside the output frame. */
  deliver: [0.88, 0.985] as Window,
  /** Everything settling once the machine has finished running. */
  settle: [0.95, 1.0] as Window,
} as const;

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

/**
 * Where the camera is along the plane at `progress`, as a fraction of the
 * plane's own width.
 *
 * Holds at a station for `DWELL` of the segment, then travels to the next on a
 * smoothstep so it eases out of one and into the other rather than snapping
 * between them.
 */
export function cameraAt(progress: number): number {
  const t = clamp01(progress) * SEGMENTS;
  const index = Math.min(Math.floor(t), SEGMENTS - 1);
  const within = t - index;

  const from = STATION_X[STATION_IDS[index] ?? "input"];
  const to = STATION_X[STATION_IDS[index + 1] ?? "output"];
  return lerp(from, to, smoothstep((within - DWELL) / (1 - DWELL)));
}

/**
 * How strongly a station is the subject at `progress`.
 *
 * Peaks across its own dwell and falls away either side. Used for the label
 * block coming forward and for the apparatus taking the accent — never for
 * moving anything, because the machine is a fixed object and only the camera
 * is allowed to move.
 */
export function stationFocus(progress: number, id: StationId): number {
  const index = STATION_IDS.indexOf(id);
  const t = clamp01(progress) * SEGMENTS;
  const distance = Math.abs(t - index);
  // Full strength within a third of a segment, gone by one whole segment.
  return 1 - smoothstep((distance - 0.33) / 0.67);
}

/**
 * Which form the piece being worked has taken by `progress`, as a crossfade
 * weight for form `index`.
 *
 * Six forms, one per station, each strongest as its own station passes the
 * focus point. The piece is the only thing in the figure that changes shape,
 * and it changes it exactly once per station — which is the argument: a
 * machine is a sequence of transformations on one thing, not six things.
 */
export function formWeight(progress: number, index: number): number {
  const t = clamp01(progress) * SEGMENTS;
  // The last form has to hold to the end rather than fading out past its own
  // station, because there is no seventh station to hand over to.
  if (index === SEGMENTS) return smoothstep(t - index + 1);
  return clamp01(1 - Math.abs(t - index));
}

/* ------------------------------------------------------------------ *
 * CSS plumbing
 * ------------------------------------------------------------------ */

/**
 * Every property one scroll subscription writes onto the stage.
 *
 * The camera is three translations; the rest are plain 0-1 numbers that the
 * markup reads through `var()`. Every one carries a fallback that composes
 * into the *finished* machine — the run complete, the product delivered — so
 * the frame between mount and the first write paints something coherent, and
 * a client that never runs the scroll driver at all still shows a resolved
 * drawing rather than an empty plane.
 */
export function machineVars(progress: number, stageWidth: number): [string, string][] {
  const planeWidth = stageWidth * PLANE.width;
  const camera = cameraAt(progress);

  // Where the plane has to sit for the camera's point of interest to land on
  // the focus mark. Clamped so the plane never pulls away from either end of
  // itself and leaves the stage half empty.
  const ideal = PLANE.focus * stageWidth - camera * planeWidth;
  const x = clamp(ideal, stageWidth - planeWidth, 0);

  const entries: [string, string][] = [
    ["--dm-back", `${(x * DEPTH.back).toFixed(1)}px`],
    ["--dm-mid", `${x.toFixed(1)}px`],
    ["--dm-fore", `${(x * DEPTH.fore).toFixed(1)}px`],
    ["--dm-arrive", phase(progress, EDGE.arrive).toFixed(4)],
    ["--dm-deliver", phase(progress, EDGE.deliver).toFixed(4)],
    ["--dm-settle", phase(progress, EDGE.settle).toFixed(4)],
  ];

  for (const id of STATION_IDS) {
    entries.push([`--dm-s-${id}`, stationFocus(progress, id).toFixed(4)]);
  }
  for (let index = 0; index <= SEGMENTS; index += 1) {
    entries.push([`--dm-f-${index}`, formWeight(progress, index).toFixed(4)]);
  }

  return entries;
}

/** What the plane's transform should be when nothing is driving it. */
export function restingCamera(stageWidth: number): { back: string; mid: string; fore: string } {
  const planeWidth = stageWidth * PLANE.width;
  const x = clamp(
    PLANE.focus * stageWidth - STATION_X.output * planeWidth,
    stageWidth - planeWidth,
    0,
  );
  return {
    back: `${(x * DEPTH.back).toFixed(1)}px`,
    mid: `${x.toFixed(1)}px`,
    fore: `${(x * DEPTH.fore).toFixed(1)}px`,
  };
}

/** A station's own strength, floored so a station off-camera is dim, not gone. */
export function focusVar(id: StationId): string {
  return `var(--dm-s-${id}, 1)`;
}

/** How present something is, driven by one of the edge windows. */
export function reveal(name: "arrive" | "deliver" | "settle"): { opacity: string } {
  return { opacity: `var(--dm-${name}, 1)` };
}

/* ------------------------------------------------------------------ *
 * Sizing
 * ------------------------------------------------------------------ */

/**
 * Type and part sizes are derived from the measured stage width. The machine
 * is drawn at the same scale whatever the viewport, so a narrow stage simply
 * sees less of it at once — which is the correct behaviour for a camera and
 * the reason nothing here is squeezed to fit.
 */
export function machineScale(width: number) {
  const k = clamp(width / 1152, 0.72, 1);
  return {
    k,
    part: Math.max(Math.round(11 * k), 10),
    title: Math.max(Math.round(19 * k), 15),
    body: Math.max(Math.round(11 * k), 10),
    note: Math.max(Math.round(9.5 * k), 9),
    numeral: Math.max(Math.round(58 * k), 40),
    /** Width of one station's label column. */
    column: Math.max(Math.round(210 * k), 168),
    /** The apparatus glyph above it. */
    glyph: Math.max(Math.round(96 * k), 74),
  };
}
