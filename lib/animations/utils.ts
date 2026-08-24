/**
 * Shared helpers for the motion system — media-query subscription plumbing,
 * responsive value resolution, and the text-reveal timing calculation.
 */

import { DISTANCE, DISTANCE_MOBILE, TEXT_MAX_TOTAL, TEXT_STEP } from "./constants";

/* ------------------------------------------------------------------ *
 * Media query store
 *
 * Backs `useMediaQuery` / `useMotionPreference` via `useSyncExternalStore`.
 * The old `useReducedMotion` read `matchMedia` inside an effect, so it
 * returned `false` on the first client render and every consumer applied
 * motion styles for one frame before flipping. `useSyncExternalStore` reads
 * the real value during render instead, which removes that whole class of
 * bug — and gives a defined server snapshot rather than a guess.
 * ------------------------------------------------------------------ */

const queryCache = new Map<string, MediaQueryList>();

function getQuery(query: string): MediaQueryList | null {
  if (typeof window === "undefined" || !window.matchMedia) return null;
  let mql = queryCache.get(query);
  if (!mql) {
    mql = window.matchMedia(query);
    queryCache.set(query, mql);
  }
  return mql;
}

export function subscribeToQuery(query: string) {
  return (onChange: () => void) => {
    const mql = getQuery(query);
    if (!mql) return () => {};
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };
}

export function getQuerySnapshot(query: string) {
  return () => getQuery(query)?.matches ?? false;
}

/**
 * What the server assumes: `false` for every query.
 *
 * Read against the queries in `constants.ts` that resolves to **full motion,
 * smallest tier** — reduced-motion is off, and `md` / `richPointer` are not
 * matched. That combination is the safe one to ship in HTML: the markup
 * carries short mobile travel distances and no pointer-driven chrome, and the
 * client scales *up* on its first render if the device warrants it. Assuming
 * desktop instead would put the custom cursor and full-size parallax offsets
 * into the server HTML, then tear them out on every phone.
 *
 * React hydrates with this snapshot and re-renders immediately afterwards, so
 * the difference is a scheduled update rather than a hydration mismatch.
 */
export function getServerQuerySnapshot() {
  return false;
}

/* ------------------------------------------------------------------ *
 * Responsive values
 * ------------------------------------------------------------------ */

export type DistanceKey = keyof typeof DISTANCE;

/**
 * Resolves a travel distance for the current tier. Below `md` every distance
 * roughly halves — the same 40px rise that reads as editorial on a 1440px
 * viewport reads as a jolt on a 390px one.
 */
export function resolveDistance(key: DistanceKey, isCompact: boolean): number {
  return isCompact ? DISTANCE_MOBILE[key] : DISTANCE[key];
}

/* ------------------------------------------------------------------ *
 * Text reveal timing
 * ------------------------------------------------------------------ */

/**
 * Per-unit delay for a text reveal, compressed so the whole line finishes
 * within `TEXT_MAX_TOTAL` no matter how long it is.
 *
 * This is the guard that keeps a headline reveal off the critical path. The
 * previous implementation used a fixed 40ms step, so an 18-character line
 * didn't start animating its last letter until 820ms in — with the whole
 * string held off-screen behind `overflow: hidden` until then.
 */
export function resolveTextStep(count: number, mode: "char" | "word"): number {
  if (count <= 1) return 0;
  const preferred = TEXT_STEP[mode];
  const maxStep = TEXT_MAX_TOTAL / (count - 1);
  return Math.min(preferred, maxStep);
}

/** Clamps a number into a range. Used when deriving parallax tiers. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
