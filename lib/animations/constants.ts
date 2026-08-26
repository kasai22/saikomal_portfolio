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
   * Where the assembled interface stops being a panel and becomes a screen.
   *
   * The tiles finish their tiling at `end`; across this window the composition
   * they made turns into a large product viewport — the frame draws itself
   * around them, they travel out into its chrome, and the mask that has been
   * protecting the headline lifts, because by then the headline is going.
   *
   * This is the hinge of the whole sequence. Before it the reader is looking
   * *at* a system; after it they are looking *through* a screen the system
   * built, and the next section is what is on the other side of it.
   */
  viewport: [0.38, 0.7] as const,

  /**
   * Where the hero itself starts leaving. Deliberately equal to the end of
   * `viewport`: the copy holds still until the screen it is standing in front
   * of has finished assembling, and only then gets out of its way.
   */
  exitStart: 0.7,
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
