"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import Image from "next/image";
import { useMotionValue, useMotionValueEvent, useScroll, type MotionValue } from "motion/react";
import { ASSEMBLY, QUERY } from "@/lib/animations/constants";
import { clamp01, lerp, smoothstep } from "@/components/hero/complexity-geometry";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMotionTier } from "@/hooks/use-motion-tier";
import { CASE_STUDIES } from "@/features/home/constants/data";

/**
 * The hero's three project tiles, travelling into the three real case-study
 * cards.
 *
 * ── What this replaces, and why ─────────────────────────────────────────
 * The previous attempt built a screen — a hole in a fixed cover — and scrolled
 * the real section up through it. It was continuous, but it was the wrong
 * continuity: it read as *hero, then window, then webpage*. Nothing in the
 * hero became anything. The pieces on screen were never the thing that
 * arrived.
 *
 * This does the opposite and keeps nothing of that architecture. There is no
 * cover, no aperture, no mask and no fixed layer of any kind. The hero's Kudra
 * tile is the Kudra card's image; the REX tile is the REX card's image; the
 * Shipyard tile is the Shipyard card's image. They are the same three files
 * (`CASE_STUDIES[i].image`) in both places, and across the hand-off each one
 * physically travels from where it sits in the hero to where its card's image
 * slot actually is.
 *
 * ── FLIP against live DOM, not against guesses ──────────────────────────
 * Both ends are measured, every frame, from the real elements:
 *
 *   source      `[data-hero-piece="i"]`  — the tile in the hero's visual column
 *   destination `[data-work-slot="i"]`   — the image slot inside the real card
 *
 * The flying tile is placed at `lerp(sourceRect, destRect)` in viewport
 * coordinates, interpolating `x`, `y`, `width` and `height` — width and height
 * because the shapes genuinely differ (a 216px square becoming a 575×398 panel
 * image, or a 549×168 card strip) and a uniform scale cannot get from one to
 * the other without distorting the photograph. `object-fit: cover` re-crops as
 * the box changes shape, which is exactly what the destination is doing to the
 * same image anyway.
 *
 * Measuring live is also what makes the landing seamless *by construction*.
 * The destination's ancestors are still running their own entrance at that
 * moment — a `ScaleReveal` at 0.97, a card in a `Stagger` — so the slot is not
 * where a one-off measurement would have said it was. Because the flying tile
 * reads the slot's rect on the same frame it hands over, the two are in the
 * same place whatever those ancestors happen to be doing. There is nothing to
 * cross-fade and no seam to hide: the tile is switched off on the frame the
 * real image is switched on, at identical geometry.
 *
 * ── Sticky, not fixed ───────────────────────────────────────────────────
 * The pieces have to be visible across a section boundary, so the layer they
 * fly in cannot belong to either section. It is a zero-height `sticky` element
 * at the top of a wrapper spanning the hero *and* the work — pinned to the top
 * of the viewport for exactly as long as that wrapper is on screen, and gone
 * from the layout the moment it is not. It contributes no height, no
 * background and no hit area; it is three images and three hairlines.
 *
 * ── One master progress ─────────────────────────────────────────────────
 * `master` is the whole hand-off, 0 → 1, and it is the only value shared out.
 * The heading below consumes it (`useAssembly`). Everything else — each
 * piece's own progress, the guides, what is hidden and what is shown — is
 * derived from scroll position inside one subscription and written straight to
 * the elements. No React state changes while the reader scrolls.
 *
 * ── Failure is visible content ──────────────────────────────────────────
 * Nothing here is load-bearing for anything the reader needs to read. The
 * source tiles and the destination slots are only ever *hidden* by this code;
 * their resting CSS is fully visible. If the elements cannot be found, if the
 * viewport is too small, or if the reader has asked for reduced motion, the
 * layer never renders, nothing is ever touched, and `master` parks at 1 — the
 * hero is the hero and Selected Work is Selected Work.
 */

interface Assembly {
  /** The hand-off, 0 → 1. Pinned at 1 when there is no assembly to run. */
  progress: MotionValue<number>;
  /** Whether that progress is actually being driven by scroll. */
  active: boolean;
}

const AssemblyContext = createContext<Assembly | null>(null);

/** The hand-off progress, for anything inside the wrapper that resolves with it. */
export function useAssembly(): Assembly | null {
  return useContext(AssemblyContext);
}

/** Scroll anchors, in document pixels. Re-measured on resize, not per frame. */
interface Anchors {
  start: number;
  span: number;
  depart: number[];
  land: number[];
}

/** The elements at both ends of each flight, resolved once per measurement. */
interface Ends {
  source: HTMLElement;
  slot: HTMLElement;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function HeroWorkAssembly({ children }: { children: ReactNode }) {
  const { reduced } = useMotionTier();
  const roomy = useMediaQuery(QUERY.md);

  // The heading resolves with the scroll on every viewport — it is one CSS
  // variable's worth of work and it is what makes the words read as the label
  // of something being assembled. The flight is desktop-only: below `md` the
  // hero has no runway to depart from and the two columns are one column, so
  // there is no spatial journey to make.
  const active = !reduced;
  const flying = active && roomy;

  const master = useMotionValue(active ? 0 : 1);
  const value = useMemo<Assembly>(() => ({ progress: master, active }), [master, active]);

  return (
    <AssemblyContext.Provider value={value}>
      <div className="relative">
        {flying && <FlightLayer master={master} />}
        {!flying && <MasterOnly master={master} active={active} />}
        {children}
      </div>
    </AssemblyContext.Provider>
  );
}

/* ------------------------------------------------------------------ *
 * Measurement
 * ------------------------------------------------------------------ */

const PIECES = CASE_STUDIES.slice(0, 3);

/**
 * The pair of elements at each end of a flight.
 *
 * A piece can be marked in the hero twice — once in the scattered column that
 * only exists from `lg` up, once in the compact row that replaces it below
 * that. Exactly one of the two has a box at any given width, so the source is
 * the first candidate that actually measures: between `md` and `lg` that is
 * the compact row, and the tablet hand-off flies from there.
 */
function ends(): Ends[] | null {
  const found: Ends[] = [];
  for (let i = 0; i < PIECES.length; i += 1) {
    const slot = document.querySelector<HTMLElement>(`[data-work-slot="${i}"]`);
    const source = [...document.querySelectorAll<HTMLElement>(`[data-hero-piece="${i}"]`)].find(
      (candidate) => candidate.getBoundingClientRect().width > 0,
    );
    if (!slot || !source) return null;
    found.push({ source, slot });
  }
  return found;
}

/**
 * Where each piece leaves and lands, in document pixels.
 *
 * Landing is derived from the destination rather than declared: a piece lands
 * at the scroll position that puts its own slot `landAt` down the screen. That
 * is the only formulation that survives a rewrap, a different breakpoint or a
 * font that loads late — all three move the slot, and all three should move
 * the landing with it.
 */
function anchorsFor(slots: HTMLElement[]): Anchors | null {
  const vh = window.innerHeight;
  if (vh === 0) return null;

  const land = slots.map((slot, i) => {
    const rect = slot.getBoundingClientRect();
    if (rect.height === 0) return NaN;
    const centre = rect.top + window.scrollY + rect.height / 2;
    return centre - vh * (ASSEMBLY.landAt - (ASSEMBLY.landNudge[i] ?? 0));
  });
  if (land.some((y) => !Number.isFinite(y))) return null;

  const depart = land.map((y, i) => y - vh * (ASSEMBLY.travel[i] ?? 1.4));
  const start = Math.min(...depart) - vh * ASSEMBLY.lead;
  const span = Math.max(...land) - start;
  return span > 1 ? { start, span, depart, land } : null;
}

/* ------------------------------------------------------------------ *
 * The progress-only case — mobile, and anything that cannot fly
 * ------------------------------------------------------------------ */

/**
 * The approach, where nothing flies — measured from the heading itself.
 *
 * See `ASSEMBLY.compact` for why the heading and not a card: stacked into one
 * column the featured image sits seven hundred pixels below the words, and
 * pacing them against it leaves them masked long after the reader has gone
 * past.
 */
function approachAnchors(heading: HTMLElement): Anchors | null {
  const vh = window.innerHeight;
  const rect = heading.getBoundingClientRect();
  if (vh === 0 || rect.height === 0) return null;
  const top = rect.top + window.scrollY;

  // Solve the master range backwards from where the heading should be on
  // screen at the two ends of its own slice of it. Derived rather than
  // declared, so retiming `ASSEMBLY.heading` cannot silently push the words
  // off the top of the phone: the slice always lands on the same two
  // positions, whatever fractions of the master it happens to occupy.
  const [from, to] = ASSEMBLY.heading;
  const opens = top - vh * ASSEMBLY.compact.enter;
  const closes = top - vh * ASSEMBLY.compact.settle;
  const span = (closes - opens) / Math.max(to - from, 0.01);
  return span > 1 ? { start: opens - span * from, span, depart: [], land: [] } : null;
}

/**
 * Below `md` the pieces do not travel, but the hand-off still has a shape: the
 * heading resolves as the section arrives instead of appearing when a
 * threshold is crossed. That needs the same master value and none of the rest,
 * so this drives it and renders nothing.
 */
function MasterOnly({ master, active }: { master: MotionValue<number>; active: boolean }) {
  const { scrollY } = useScroll();
  const anchors = useRef<Anchors | null>(null);

  // `active` is read here as well as in the effect, and that is load-bearing.
  // The reduced-motion preference resolves one render *after* hydration, so
  // this component can measure once believing motion is allowed and then be
  // told otherwise. Without the check the scroll handler would keep scrubbing
  // against those measurements for the rest of the session.
  const update = useCallback(() => {
    const a = anchors.current;
    if (!active || !a) {
      master.set(1);
      return;
    }
    master.set(clamp01((window.scrollY - a.start) / a.span));
  }, [master, active]);

  useEffect(() => {
    if (!active) {
      anchors.current = null;
      master.set(1);
      return;
    }
    const remeasure = () => {
      const heading = document.querySelector<HTMLElement>("[data-work-heading]");
      anchors.current = heading ? approachAnchors(heading) : null;
      update();
    };
    remeasure();

    const observer = new ResizeObserver(remeasure);
    observer.observe(document.body);
    window.addEventListener("resize", remeasure, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", remeasure);
    };
  }, [active, master, update]);

  useMotionValueEvent(scrollY, "change", update);
  return null;
}

/* ------------------------------------------------------------------ *
 * The flight
 * ------------------------------------------------------------------ */

function FlightLayer({ master }: { master: MotionValue<number> }) {
  const { scrollY } = useScroll();
  const tiles = useRef<(HTMLDivElement | null)[]>([]);
  const guides = useRef<(SVGPathElement | null)[]>([]);
  const anchors = useRef<Anchors | null>(null);
  const pair = useRef<Ends[] | null>(null);
  const origin = useRef<HTMLElement | null>(null);
  // Whether the reader got here without scrolling through the run — see the
  // `settled` block in `update`.
  const settled = useRef<boolean | null>(null);
  const lastY = useRef(0);

  const update = useCallback(() => {
    const a = anchors.current;
    const parts = pair.current;
    if (!a || !parts) {
      master.set(1);
      return;
    }

    const y = window.scrollY;

    // ── Arriving without scrolling ──────────────────────────────────────
    // The last piece settles some way *past* the top of the work section,
    // because a piece lands when its own destination is on screen and the
    // bottom two are six hundred pixels into it. That is right for a reader
    // scrolling — and it means any jump straight to `#projects` lands short
    // of the finish. The page's own "See the work" button does exactly that,
    // and so does a deep link, a refresh, or a restored scroll position;
    // without this the reader is handed a frozen mid-flight frame with two
    // images hanging over two empty cards.
    //
    // So: a reader who did not scroll through the run is given its result.
    // The flag is set the first time this runs below the start, and by any
    // in-page link aimed past it. It clears only on an *upward* move back
    // above the start — checking direction matters, because the jump being
    // compensated for begins above the start and passes down through it.
    if (settled.current === null) settled.current = y > a.start;
    if (settled.current && y < a.start && y < lastY.current) settled.current = false;
    lastY.current = y;
    const skip = settled.current;

    master.set(skip ? 1 : clamp01((y - a.start) / a.span));

    // ── Read pass. Every measurement happens before any write, so the
    // browser flushes layout at most once for the whole frame rather than
    // once per element. Rects are only taken for pieces actually in flight;
    // outside the window this loop reads nothing at all.
    const eased: number[] = [];
    const from: (Rect | null)[] = [];
    const to: (Rect | null)[] = [];

    for (let i = 0; i < parts.length; i += 1) {
      const depart = a.depart[i] ?? 0;
      const land = a.land[i] ?? 1;
      const p = skip ? 1 : clamp01((y - depart) / Math.max(land - depart, 1));
      eased.push(p);

      const part = parts[i];
      if (p <= 0 || p >= 1 || !part) {
        from.push(null);
        to.push(null);
        continue;
      }
      const s = part.source.getBoundingClientRect();
      const d = part.slot.getBoundingClientRect();
      from.push({ x: s.left, y: s.top, w: s.width, h: s.height });
      to.push({ x: d.left, y: d.top, w: d.width, h: d.height });
    }

    const originRect = origin.current?.getBoundingClientRect() ?? null;

    // ── Write pass.
    for (let i = 0; i < parts.length; i += 1) {
      const part = parts[i];
      const tile = tiles.current[i];
      const guide = guides.current[i];
      const p = eased[i] ?? 0;
      if (!part || !tile) continue;

      // Landed, or not yet gone. Either way the flying copy is off and one of
      // the two real elements is carrying the image.
      if (p <= 0 || p >= 1) {
        const home = p <= 0;
        tile.style.opacity = "0";
        tile.style.visibility = "hidden";
        part.source.style.opacity = home ? "" : "0";
        part.source.style.pointerEvents = home ? "" : "none";
        part.slot.style.opacity = home ? "0" : "";
        if (guide) guide.style.opacity = "0";
        continue;
      }

      const s = from[i];
      const d = to[i];
      if (!s || !d) continue;

      // Down first, then along. `drop` splits the flight into two overlapping
      // halves: the piece falls to the row its destination is on while it is
      // still small and still to the right, then slides left and grows into
      // the slot. The last `drop` of the flight is a pure horizontal lock-in.
      const span = 1 - ASSEMBLY.drop;
      const ey = smoothstep(clamp01(p / span));
      const ex = smoothstep(clamp01((p - ASSEMBLY.drop) / span));

      const x = lerp(s.x, d.x, ex);
      const top = lerp(s.y, d.y, ey);
      const w = lerp(s.w, d.w, ex);
      const h = lerp(s.h, d.h, ex);

      tile.style.transform = `translate3d(${x.toFixed(1)}px, ${top.toFixed(1)}px, 0)`;
      tile.style.width = `${w.toFixed(1)}px`;
      tile.style.height = `${h.toFixed(1)}px`;
      tile.style.visibility = "visible";
      tile.style.opacity = "1";
      // Depth order follows commitment: the piece furthest into its flight is
      // the one in front. In the hero the REX tile overlaps Kudra; once Kudra
      // has left and grown it has to be the one on top, or the largest piece
      // travels behind the smallest.
      tile.style.zIndex = String(1 + Math.round(p * 8));
      // The tile leaves the hero as a bordered fragment and arrives as the
      // image inside a card, where the card's own border is the edge. So the
      // border it brought with it is handed over rather than kept.
      tile.style.setProperty("--edge", (1 - smoothstep(clamp01((p - 0.55) / 0.4))).toFixed(3));

      part.source.style.opacity = "0";
      part.source.style.pointerEvents = "none";
      part.slot.style.opacity = "0";

      // The guide. A line from this piece's node in the hero's SYSTEM tier to
      // the piece itself — the structure above still holding on to what it is
      // sending down. It draws as the piece commits and lets go before it
      // lands, so what settles into the card is the work, not the diagram.
      if (guide && originRect) {
        const ox = originRect.left + originRect.width * (ASSEMBLY.guideFrom[i] ?? 0.5);
        const oy = originRect.top + originRect.height * ASSEMBLY.guideRow;
        const tx = x + w / 2;
        const ty = top;
        const bend = Math.max((ty - oy) * 0.42, 48);
        guide.setAttribute(
          "d",
          `M ${ox.toFixed(1)} ${oy.toFixed(1)} C ${ox.toFixed(1)} ${(oy + bend).toFixed(1)}, ${tx.toFixed(1)} ${(ty - bend).toFixed(1)}, ${tx.toFixed(1)} ${ty.toFixed(1)}`,
        );
        const [drawIn, drawn, holdTo, out] = ASSEMBLY.guide;
        const on = smoothstep(clamp01((p - drawIn) / (drawn - drawIn)));
        const off = 1 - smoothstep(clamp01((p - holdTo) / (out - holdTo)));
        guide.style.opacity = (on * off).toFixed(3);
      }
    }
  }, [master]);

  useEffect(() => {
    const remeasure = () => {
      const found = ends();
      pair.current = found;
      anchors.current = found ? anchorsFor(found.map((e) => e.slot)) : null;
      origin.current = document.querySelector<HTMLElement>("[data-assembly-origin]");
      update();
    };
    remeasure();

    // An in-page link aimed at or below the run is a request to skip it; one
    // aimed above (the logo, "back to top") re-arms it. Capture phase, so the
    // decision is made before the smooth-scroll handler starts moving.
    const onAnchor = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.('a[href*="#"]');
      const a = anchors.current;
      if (!link || !a) return;
      const href = link.getAttribute("href") ?? "";
      const target = document.getElementById(href.slice(href.indexOf("#") + 1));
      if (!target) return;
      settled.current = target.getBoundingClientRect().top + window.scrollY >= a.start;
    };

    const observer = new ResizeObserver(remeasure);
    observer.observe(document.body);
    window.addEventListener("resize", remeasure, { passive: true });
    document.addEventListener("click", onAnchor, true);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", remeasure);
      document.removeEventListener("click", onAnchor, true);
      // Hand everything back exactly as it was found. This layer only ever
      // hides things, so unwinding is deleting what it wrote.
      for (const part of pair.current ?? []) {
        part.source.style.opacity = "";
        part.source.style.pointerEvents = "";
        part.slot.style.opacity = "";
      }
    };
  }, [update]);

  useMotionValueEvent(scrollY, "change", update);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none sticky top-0 z-20 h-0 w-full overflow-visible"
    >
      <svg className="absolute left-0 top-0 h-screen w-full" fill="none">
        {PIECES.map((piece, i) => (
          <path
            key={piece.slug}
            ref={(node) => {
              guides.current[i] = node;
            }}
            stroke="var(--rule-strong)"
            strokeWidth="1"
            style={{ opacity: 0 }}
          />
        ))}
      </svg>

      {PIECES.map((piece, i) => (
        <div
          key={piece.slug}
          ref={(node) => {
            tiles.current[i] = node;
          }}
          className="absolute left-0 top-0 origin-top-left overflow-hidden bg-paper will-change-transform"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          <Image
            src={piece.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 620px, 100vw"
            className="object-cover"
          />
          {/* The fragment's own edge, handed over as it becomes card content. */}
          <span
            className="absolute inset-0 border border-[color:var(--panel-3-border)]"
            style={{ opacity: "var(--edge, 1)" }}
          />
        </div>
      ))}
    </div>
  );
}
