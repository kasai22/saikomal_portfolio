/**
 * Cross-route shared-element transitions.
 *
 * ── Why not Motion's `layoutId` ─────────────────────────────────────────
 * `layoutId` morphs an element between two positions *inside one React
 * tree* — `AnimatePresence` keeps the outgoing element mounted long enough
 * for Motion to measure both. A Next.js App Router navigation is not that:
 * the home page's tree unmounts and the case study's tree mounts as a
 * separate render, so there is never a frame where both the card image and
 * the hero image exist for Motion to measure. `layoutId` is the right tool
 * *within* a page — it drives the nav's active indicator — but it cannot
 * bridge a route change here.
 *
 * React's own `<ViewTransition>` would, and Next 16 has the flag for it,
 * but it needs React 19.2+; this project is on 19.0.0.
 *
 * ── What this does instead ──────────────────────────────────────────────
 * The browser's native View Transitions API, which is built for exactly
 * this: it snapshots the old page, snapshots the new one, and morphs
 * between any elements that share a `view-transition-name`. It works across
 * a full route change, needs no dependency, and degrades to an ordinary
 * navigation where it isn't supported — Firefox included.
 *
 * ── The one hard constraint ─────────────────────────────────────────────
 * A `view-transition-name` must be unique in the document at capture time.
 * Three project cards cannot all be `project-image` — the transition is
 * simply abandoned if two elements share a name. So names are assigned
 * imperatively to the card the user actually clicked, immediately before
 * navigating, and cleared afterwards.
 */

export const VT = {
  image: "project-image",
  title: "project-title",
} as const;

/** Elements tagged for the current transition, so they can be released after. */
let tagged: HTMLElement[] = [];

export function isViewTransitionSupported(): boolean {
  return (
    typeof document !== "undefined" &&
    typeof (document as Document & { startViewTransition?: unknown }).startViewTransition ===
      "function"
  );
}

/**
 * Names the clicked card's image and title so the browser can pair them with
 * their counterparts on the case-study page.
 */
export function tagSharedElements(root: HTMLElement | null): void {
  releaseSharedElements();
  if (!root) return;

  for (const [name, selector] of [
    [VT.image, "[data-shared='image']"],
    [VT.title, "[data-shared='title']"],
  ] as const) {
    const el = root.querySelector<HTMLElement>(selector);
    if (!el) continue;
    el.style.viewTransitionName = name;
    tagged.push(el);
  }
}

/**
 * Clears the names again. Required, not tidiness: a name left on a card
 * would collide with the next card the user clicks, and the transition
 * after that would silently do nothing.
 */
export function releaseSharedElements(): void {
  for (const el of tagged) el.style.viewTransitionName = "";
  tagged = [];
}
