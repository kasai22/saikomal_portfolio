/**
 * The single source of truth for every number in the motion system.
 *
 * Nothing in `components/animations` or any feature component should declare
 * its own duration, delay, easing curve or travel distance — if a value is
 * needed and isn't here, it gets added here first. Before this file the site
 * had one easing curve declared in `wipe.tsx` and a second, different curve
 * copy-pasted independently into `hero-section.tsx` and `reveal-item.tsx`.
 *
 * The language these numbers encode: restrained and editorial. Travel is
 * short, durations sit under three quarters of a second, and nothing
 * overshoots — the springs below are damped to settle, not to bounce.
 */

/* ------------------------------------------------------------------ *
 * Easing
 * ------------------------------------------------------------------ */

export type Ease = readonly [number, number, number, number];

export const EASE = {
  /**
   * The site's existing curve (previously `EASE_WIPE`). Symmetrical, neutral,
   * used for anything that uncovers rather than arrives — wipes, rules,
   * clip-path reveals.
   */
  standard: [0.4, 0, 0.2, 1],
  /**
   * Fast out of the gate, long settle. The "arrival" curve — entrances,
   * reveals, anything travelling a distance. Previously duplicated as an
   * inline literal in two files.
   */
  out: [0.16, 1, 0.3, 1],
  /** Accelerating. Exits only — content leaving should not linger. */
  in: [0.4, 0, 1, 1],
  /** For opacity-only crossfades where any curve reads as linear anyway. */
  linear: [0, 0, 1, 1],
} as const satisfies Record<string, Ease>;

/* ------------------------------------------------------------------ *
 * Duration (seconds — Motion's unit)
 * ------------------------------------------------------------------ */

export const DURATION = {
  /** Colour and border changes. Below this a transition reads as a glitch. */
  instant: 0.18,
  /** Hover feedback, chips, small state changes. */
  fast: 0.32,
  /** The default entrance. Most reveals should use this. */
  base: 0.55,
  /** Larger elements — a featured panel, a hero image. */
  slow: 0.72,
  /** Reserved for scrubbed/scroll-linked settling. Never for an entrance. */
  slowest: 0.9,
} as const;

/* ------------------------------------------------------------------ *
 * Delay & stagger
 * ------------------------------------------------------------------ */

export const DELAY = {
  none: 0,
  /** Lets a parent land before its children begin. */
  short: 0.08,
  base: 0.16,
  /** Only for a deliberate beat — e.g. the "Cost" line after a reversal. */
  long: 0.32,
} as const;

export const STAGGER = {
  /** Dense lists — chips, metrics, nav items. */
  tight: 0.05,
  /** The default cascade for cards and sections. */
  base: 0.09,
  /** Few, large items where each deserves its own moment. */
  loose: 0.14,
} as const;

/**
 * Per-character/word step for `TextReveal`. Deliberately far below the 40ms
 * the hero previously used: at 40ms an 18-character line took 820ms just to
 * start its last letter, which put the LCP element behind ~1.6s of animation.
 */
export const TEXT_STEP = {
  char: 0.018,
  word: 0.045,
} as const;

/** Hard ceiling for any text reveal, regardless of string length. */
export const TEXT_MAX_TOTAL = 0.45;

/* ------------------------------------------------------------------ *
 * Travel distance (px)
 * ------------------------------------------------------------------ */

export const DISTANCE = {
  /** Barely-there. Hover lifts, active-state nudges. */
  nudge: 8,
  /** The default entrance travel. */
  rise: 24,
  /** Large blocks only. */
  lift: 40,
} as const;

/**
 * Mobile counterparts. 40px of travel on a 390px-wide viewport reads as a
 * jolt rather than a rise, so every distance roughly halves below `md`.
 * Applied by `resolveDistance()` in `./utils`.
 */
export const DISTANCE_MOBILE = {
  nudge: 4,
  rise: 12,
  lift: 18,
} as const;

/** Scale used by `ScaleReveal`. Small — a card should settle, not zoom. */
export const SCALE = {
  from: 0.97,
  to: 1,
  /** Hover lift on interactive surfaces. */
  hover: 1.02,
  /** Press. Always paired with a fast spring. */
  tap: 0.985,
} as const;

/* ------------------------------------------------------------------ *
 * Viewport / scroll triggers
 * ------------------------------------------------------------------ */

export const VIEWPORT = {
  /**
   * The default reveal trigger. `once` everywhere by design: re-animating on
   * scroll-back is the fastest way to make portfolio motion annoying on a
   * second read.
   */
  default: { once: true, margin: "-12% 0px" },
  /** Fires sooner — for content that should already be settled on arrival. */
  early: { once: true, margin: "-5% 0px" },
  /** Fires later — for a deliberate reveal deep in a long page. */
  late: { once: true, margin: "-22% 0px" },
  /**
   * A band around the viewport's vertical centre. Not `once` — used for
   * "which step am I on" emphasis, which must track both directions.
   */
  band: { once: false, margin: "-40% 0px -40% 0px" },
} as const;

/** Scroll-linked parallax travel, in px, at the far end of a section. */
export const PARALLAX = {
  /** Backgrounds, glows. Barely perceptible by design. */
  subtle: 15,
  base: 40,
  /** Foreground only, and never more than one per viewport. */
  strong: 90,
} as const;

/**
 * Maximum pointer-driven travel, in px. The brief for the hero caps this at
 * 8–15px and that ceiling is the point: pointer parallax works when it is
 * felt rather than seen. Anything past ~15px starts reading as a toy.
 */
export const POINTER = {
  /** Background wash and glows. */
  ambient: 6,
  /** Headline block. */
  text: 10,
  /** Nearest foreground tile. Scaled down by each tile's own depth factor. */
  near: 14,
} as const;

/**
 * Magnetic pull on interactive elements, in px — how far a control leans
 * toward the pointer at the extreme edge of its own bounds.
 *
 * The effect should read as weight, not as the element chasing the cursor:
 * the control must never travel far enough to leave the area the user is
 * already aiming at, or clicking it becomes harder rather than more
 * satisfying.
 */
export const MAGNETIC = {
  /** Small controls — icon links, inline actions. */
  subtle: 6,
  /** The default for a CTA button. */
  base: 10,
  /** Large or isolated targets only. */
  strong: 14,
} as const;

/* ------------------------------------------------------------------ *
 * Project cards
 * ------------------------------------------------------------------ */

export const CARD = {
  /**
   * Pointer tilt, in degrees. Deliberately at the bottom of the 1–2° band:
   * enough to register as a surface responding to the pointer, far short of
   * anything that reads as a 3D effect. A portfolio arguing for restraint
   * cannot have cards that swing.
   */
  tilt: 1.5,
  /** Tilt for the small hero fragments, which are further from the reader. */
  tiltFragment: 2,
  /** Image scale on hover. Any more and the crop visibly changes. */
  imageHover: 1.04,
  /** How far the image drifts up on hover, in px. */
  imageShift: 3,
  /** Title travel on hover, in px. */
  titleShift: 5,
  /** Extra scale headroom the entrance unveil starts from. */
  imageUnveilScale: 1.08,
} as const;

/**
 * The card's internal reveal order. The card arrives, then its own contents
 * assemble — image, title, metadata, supporting detail — so a card reads as
 * one object resolving rather than five things appearing at once.
 */
export const CARD_STAGE = {
  image: 0.06,
  title: 0.16,
  meta: 0.24,
  support: 0.32,
} as const;

/* ------------------------------------------------------------------ *
 * Navigation
 * ------------------------------------------------------------------ */

export const NAV = {
  /** Scroll depth at which the bar switches from transparent to solid. */
  solidAt: 20,
  /**
   * How far the user must scroll in one direction before the bar commits to
   * hiding or showing. Without a threshold the bar flickers on trackpad
   * jitter and on the rubber-band at the top of the page.
   */
  directionThreshold: 8,
  /**
   * The bar only starts auto-hiding below this depth, so it never retracts
   * while the hero is still on screen — hiding it there would look like a
   * glitch rather than a behaviour.
   */
  hideAfter: 320,
  /** Bar height, used as the hidden offset. */
  height: 60,
} as const;

/**
 * How the hero resolves as it scrolls away, rather than simply sliding off.
 * Every value here is deliberately shallow — the hero should hand over to
 * Selected Work, not perform an exit.
 */
export const HERO_SCROLL = {
  /** Headline settles back very slightly, as if receding. */
  headlineScale: 0.94,
  /** Supporting copy softens but never fully disappears while in frame. */
  supportFade: 0.35,
  /** The whole hero column dims as the next section takes over. */
  handoffFade: 0.55,
} as const;

/* ------------------------------------------------------------------ *
 * Hero entrance sequence
 * ------------------------------------------------------------------ */

/**
 * The hero's load choreography, as one readable timeline in seconds.
 *
 * Keeping the stage offsets in a single object is what makes the entrance
 * an orchestrated sequence rather than eight components each guessing a
 * delay. To retime the whole thing, change the numbers here — the ordering
 * relationships stay intact because every element references a stage rather
 * than a literal.
 *
 * Stages map to the hero's real elements, top to bottom, so the cascade
 * reads down the page as it plays:
 *
 *   status    → the "Open to roles" pill
 *   identity  → the name and role line
 *   headline  → line one, then line two, masked
 *   support   → the positioning sentence
 *   labels    → the design-to-ship track
 *   proof     → the three outcome figures
 *   cta       → buttons, resume, socials
 *   visual    → the work fragments settling in
 *
 * `visual` starts early and runs long: the fragments should already be
 * arriving while the text is still assembling, so the two columns feel like
 * one composition rather than two sequential animations.
 */
export const HERO_STAGE = {
  status: 0.05,
  identity: 0.12,
  headlineLine1: 0.22,
  headlineLine2: 0.34,
  support: 0.52,
  labels: 0.62,
  proof: 0.72,
  cta: 0.84,
  visual: 0.3,
} as const;

/* ------------------------------------------------------------------ *
 * Hero system — "complexity to clarity"
 * ------------------------------------------------------------------ */

/**
 * The scrubbed hero sequence: a scattered, over-connected system that
 * resolves into a four-tier product structure as the reader scrolls.
 *
 * ── Why the hero grows a runway ─────────────────────────────────────────
 * The transformation has to be *driven*, not played. That needs scroll
 * distance the hero did not previously have, so the section becomes a
 * runway with the hero itself pinned (`position: sticky`) at the top of it.
 * `runway` is that extra distance in `svh`, on top of the hero's own
 * `92svh`. Nothing is scroll-jacked: the page scrolls at its normal rate
 * and the reader can leave at any point.
 *
 * ── Why the numbers are what they are ───────────────────────────────────
 * The runway is the section's bottom padding, so the stage stays whatever
 * height its own content needs and the pinned phase is always exactly
 * `runway` long. The stage releases at progress `runway / (stage + runway)`
 * — 0.649 on desktop and 0.604 on tablet at the usual `92svh` stage, and
 * still 0.548 on desktop if a short viewport forces the stage to `140svh`.
 * `end` sits below the worst of those, so the system has always finished
 * resolving before the hero starts moving again. `exitStart` then hands the
 * remaining scroll to the hero's own parallax and handoff fade, which is the
 * behaviour the section had before this sequence existed.
 */
export const HERO_SYSTEM = {
  /** Extra scroll distance below the pinned hero, in `svh`. */
  runway: { desktop: 215, tablet: 175 },
  /**
   * Where the system finishes resolving, in section-progress.
   *
   * Earlier than it used to be. The sequence no longer ends when the tiers
   * resolve — resolving is now the *first* of three acts, and the two after it
   * (the viewport assembling, then the hero handing over to the work) need the
   * back half of the runway.
   */
  end: 0.4,
  /**
   * The same thing below `md`, where the section has no runway and the whole
   * timeline rides the hero's own exit. Later than `end` because there is no
   * pinned phase to finish inside: at 0.75 the resolved bottom of the system
   * — the product tier and the assembled interface — is still on screen as
   * the hero leaves, which is the only moment mobile gets to see it.
   */
  compactEnd: 0.62,
  /**
   * Where the network stands down, in section progress.
   *
   * The tiers finish resolving at `end`. Across this window the diagram that
   * explained the hero stops being the subject: it dims back to a ground the
   * three project pieces are leaving *from*, and the interface tiles collapse
   * into it. Nothing is hidden — the structure is what built the work and
   * should still be legible behind it — but it has to yield, or the pieces
   * travelling out of it have nowhere to be seen against.
   */
  standDown: [0.4, 0.72] as const,

  /**
   * Where the hero itself starts leaving.
   *
   * Earlier than the end of `standDown`, and that overlap is the point: the
   * copy begins to yield while the first piece is already committing to its
   * destination, so the two read as one move — the hero handing over — rather
   * than the hero finishing and the next thing starting.
   */
  exitStart: 0.58,
  /**
   * Per-tier windows in *system* progress (0-1 after remapping through
   * `end`). Overlapping by design: the tiers resolve as a wave down the
   * structure — complexity, understanding, structure, product — rather
   * than four separate animations.
   */
  tierWindows: [
    [0.0, 0.4],
    [0.12, 0.54],
    [0.26, 0.7],
    [0.4, 0.84],
  ],
  /** When the UI fragments assemble into the resolved composition. */
  fragmentWindow: [0.46, 0.96],
  /** When the redundant cross-links are pruned away. */
  pruneWindow: [0.08, 0.44],
  /** How far the scattered state travels, as a fraction of the stage. */
  scatter: { desktop: 1, tablet: 0.78, mobile: 0.5 },
  /** Scroll depth at which the "Scroll" affordance has done its job. */
  cueFade: 0.06,
} as const;

/* ------------------------------------------------------------------ *
 * Hero → Selected Work assembly
 * ------------------------------------------------------------------ */

/**
 * The hand-off, as an assembly rather than a transition.
 *
 * The three project tiles in the hero are not decoration standing in for the
 * work — they are the same three images the case-study cards below are built
 * from. So the hero does not finish and give way to Selected Work; its pieces
 * travel down the document and become it.
 *
 * ── Why every number here is a multiple of the viewport ─────────────────
 * The destinations are real DOM: the image slot inside the featured Kudra
 * panel and the two card slots under it. Their document positions depend on
 * the copy, the breakpoint and the font metrics, so nothing about the
 * choreography can be a fixed scroll depth. Instead each piece's landing is
 * derived from where its own destination actually is — it lands at the scroll
 * position that puts that destination `landAt` down the screen — and its
 * departure is `travel` viewports before that. The master range is then simply
 * the first departure to the last landing.
 *
 * That is what makes the pieces land *on* something the reader can see. A
 * hand-tuned scroll depth would drift the moment a line of copy rewrapped.
 */
export const ASSEMBLY = {
  /**
   * Where a destination sits on screen at the moment its piece lands, as a
   * fraction of the viewport height. Just above centre: high enough that the
   * "Three systems, in production." heading is still in frame when the
   * featured panel is filled, low enough that nothing lands under the nav.
   */
  landAt: 0.55,
  /**
   * Extra delay per piece, in viewport heights. Kudra's destination is far
   * enough up the section to stagger itself; the two cards below share a row,
   * so the second of them is held back to stop the pair snapping home in
   * lockstep — left card first, then right, in reading order.
   *
   * It is subtracted from `landAt`: a piece that lands with its destination
   * *higher* on screen is a piece that lands *later*.
   */
  landNudge: [0, 0, 0.08],
  /**
   * How far ahead of its landing each piece commits, in viewport heights.
   * Long: this is the whole back half of the hero's runway, and a piece that
   * crosses two and a half screens has to leave early enough that the reader
   * sees it decide to go.
   */
  travel: [1.45, 1.4, 1.32],
  /**
   * Quiet beat before the first piece commits, in viewport heights — the
   * tiles square up and take their labels while the network stands down.
   */
  lead: 0.34,
  /**
   * How far the vertical leads the horizontal, as a fraction of a piece's own
   * flight.
   *
   * A straight interpolation between the two rects sends every piece diagonally
   * across the frame, and the diagonal from the hero's Kudra tile passes
   * directly over "Three systems, in production." at the moment those words are
   * being uncovered. Dropping first and sliding second avoids that, and it is
   * the better gesture anyway: the piece descends into the row it belongs to,
   * then travels along that row into its slot. Assembly, rather than a card
   * flying across a page.
   */
  drop: 0.15,
  /**
   * The heading's window, in master progress. It opens while the first piece
   * is still travelling and closes as that piece lands, so the words arrive
   * as the label of something being built rather than as the next section
   * announcing itself.
   */
  heading: [0.4, 0.76] as const,
  /**
   * The same hand-off where nothing flies — below `md`, and anywhere the
   * pieces cannot travel.
   *
   * With no flight to pace against, the only thing the master range has to get
   * right is the heading, so it is measured off the heading itself: these are
   * where the heading sits on screen, as fractions of the viewport height,
   * when its own slice of the master range opens and closes. `enter` is the
   * moment it clears the bottom edge; `settle` is just above centre, where it
   * should already be finished and readable.
   *
   * Anchoring to a card instead — which is what the desktop flight does — is
   * wrong here and not merely different. Stacked into one column, the featured
   * card's image sits some seven hundred pixels below the heading on a phone;
   * pace the words against that and they are still masked long after the
   * reader has scrolled past them.
   */
  compact: { enter: 0.92, settle: 0.42 },
  /**
   * Where the guide line from the hero's SYSTEM tier to a piece draws in and
   * retires, in that piece's own progress.
   */
  guide: [0.04, 0.34, 0.7, 0.94] as const,
  /**
   * Which SYSTEM-tier node each piece is drawn from, as a fraction of the
   * hero stage's width. These are three of the four x positions in
   * `DESKTOP_TIER_X[2]`, chosen right of centre so the guides never cross the
   * headline. The y is that tier's own row.
   */
  guideFrom: [0.415, 0.585, 0.755],
  guideRow: 0.58,
} as const;

/* ------------------------------------------------------------------ *
 * Responsive gates
 * ------------------------------------------------------------------ */

/**
 * Media queries used to tier the interaction system. These mirror Tailwind's
 * default breakpoints so a component's motion tier and its layout tier can
 * never disagree.
 */
export const QUERY = {
  /** Tablet and up. */
  md: "(min-width: 768px)",
  /** Desktop. */
  lg: "(min-width: 1024px)",
  /** A real hovering pointer — excludes touch, stylus and TV remotes. */
  finePointer: "(pointer: fine)",
  /** The full desktop interaction system: cursor, magnetic, tilt, parallax. */
  richPointer: "(min-width: 1024px) and (pointer: fine)",
  /**
   * Wide enough that the `max-w-6xl` container has a real gutter either side
   * — 144px at this width. The hero system's tier labels live in that gutter,
   * so below it they are not rendered at all rather than being crushed
   * against the headline.
   */
  wide: "(min-width: 1440px)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
} as const;

/**
 * Budget, enforced by convention rather than code: never more than this many
 * scroll-linked effects animating in a single viewport at once. Every
 * scroll-linked effect runs a callback per frame, and this site already has a
 * smooth-scroll loop running alongside them.
 */
export const MAX_CONCURRENT_SCROLL_EFFECTS = 2;
