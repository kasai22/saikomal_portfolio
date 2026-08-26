"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { QUERY } from "@/lib/animations/constants";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMotionTier } from "@/hooks/use-motion-tier";

/**
 * The screen the hero builds, turned into something the reader goes through.
 *
 * ── Why the previous attempt could not work ─────────────────────────────
 * It drew the screen as an absolutely-positioned box inside the hero's sticky
 * stage. That stage is scoped to `#home`, so the box left with it. Measured:
 * by the time the work's own frame appeared at `top: 416`, the hero's was at
 * `top: -453` — two boxes eight hundred pixels apart, one going up and out
 * while the other came up from below, with a 140px facts strip between the
 * sections for good measure. No amount of retiming fixes that, because
 * nothing anchored inside a section can outlive the section.
 *
 * ── What this does instead ──────────────────────────────────────────────
 * The frame is not a box on the page. It is a *hole in a cover* over it.
 *
 * Four opaque paper panels sit `fixed` to the viewport and meet to leave a
 * rectangular gap. Everything outside the gap is covered; everything inside it
 * is the real page, scrolling normally underneath. So the screen stays exactly
 * where it is on the display while the document travels behind it — which is
 * the whole illusion, and it is the only version of it that survives a section
 * boundary, because a fixed element has no section to belong to.
 *
 * The reader therefore sees the hero recede behind the cover, then the facts
 * strip, then the real "Three systems, in production." heading and the three
 * real cards, rise up *through* the opening. Then the panels retreat off the
 * edges of the screen and the page is simply the page again.
 *
 * ── What it does not do ─────────────────────────────────────────────────
 * It does not copy, move, re-render or wrap the work. `SelectedWorkSection`
 * is its own untouched self in normal document flow with its own `id`; this
 * component never sees its markup and never transforms it. There is no second
 * copy to keep in sync, nothing hidden from a screen reader, and nothing that
 * has to be handed back to the layout at the end — when the panels go, there
 * is no state to unwind, because the page was never altered.
 *
 * ── One source of truth ─────────────────────────────────────────────────
 * A single `useScroll` on the work section's approach. Every value below is a
 * `useTransform` of that one progress: the aperture's four edges, the frame,
 * the corner brackets, the dissolve. No second subscription, no React state
 * per frame, and every animated property is a transform or an opacity.
 */

interface HeroToWorkSceneProps {
  children: ReactNode;
}

/** Where the opening sits and how big it gets, as fractions of the viewport. */
const HOLE = {
  /** The seed: the small panel the hero's fragments tile into, low and centred. */
  seed: { w: 520, h: 108, y: 0.83 },
  /** The site's content column — the width the work itself is laid out in. */
  maxWidth: 1152,
  gutter: 48,
  height: 0.78,
  centre: 0.5,
} as const;

export function HeroToWorkScene({ children }: HeroToWorkSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionTier();
  const roomy = useMediaQuery(QUERY.md);
  const [view, setView] = useState({ w: 0, h: 0 });

  // The panels are viewport-anchored, so their geometry is viewport geometry.
  useEffect(() => {
    const read = () => setView({ w: window.innerWidth, h: window.innerHeight });
    read();
    window.addEventListener("resize", read, { passive: true });
    return () => window.removeEventListener("resize", read);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    // Begins while the hero is still pinned — the frame has to assemble before
    // the hero leaves — and finishes once the work's heading is near the top,
    // by which point the cover is gone and the page is ordinary again.
    offset: ["start 165%", "start 5%"],
  });

  const { w, h } = view;
  const holeW = Math.min(HOLE.maxWidth, Math.max(w - HOLE.gutter, 0));
  const holeH = h * HOLE.height;

  // Seed rect → full rect → past the edges of the screen. Three keyframes on
  // one progress: assemble, hold open while the work travels through, retreat.
  const left = useTransform(
    scrollYProgress,
    [0, 0.34, 0.84, 1],
    [(w - HOLE.seed.w) / 2, (w - holeW) / 2, (w - holeW) / 2, 0],
  );
  const right = useTransform(
    scrollYProgress,
    [0, 0.34, 0.84, 1],
    [(w + HOLE.seed.w) / 2, (w + holeW) / 2, (w + holeW) / 2, w],
  );
  const top = useTransform(
    scrollYProgress,
    [0, 0.34, 0.84, 1],
    [
      h * HOLE.seed.y - HOLE.seed.h / 2,
      h * HOLE.centre - holeH / 2,
      h * HOLE.centre - holeH / 2,
      0,
    ],
  );
  const bottom = useTransform(
    scrollYProgress,
    [0, 0.34, 0.84, 1],
    [
      h * HOLE.seed.y + HOLE.seed.h / 2,
      h * HOLE.centre + holeH / 2,
      h * HOLE.centre + holeH / 2,
      h,
    ],
  );

  // The cover itself. Present only while there is something to cover: it
  // arrives as the hero's own screen hands over and is gone by the time the
  // reader is reading.
  const cover = useTransform(scrollYProgress, [0, 0.06, 0.88, 0.99], [0, 1, 1, 0]);
  const chrome = useTransform(scrollYProgress, [0.04, 0.3, 0.8, 0.94], [0, 1, 1, 0]);

  // Panels are moved, never resized: each is a full viewport slab translated
  // so that its inner edge lands on the opening.
  const topY = useTransform(top, (v) => v - h);
  const bottomY = bottom;
  const leftX = useTransform(left, (v) => v - w);
  const rightX = right;

  // Below `md` there is no runway in the hero for a screen to be built in, so
  // there is nothing here to continue. Reduced motion gets the page outright.
  // Both render the children exactly as they are, with no cover at all.
  if (!roomy || reduced || w === 0) {
    return (
      <div ref={ref} className="relative">
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      {/* The cover. `z-30` deliberately: under the navigation, which must stay
          reachable, and over everything else, which is the point. */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: cover }}
        className="pointer-events-none fixed inset-0 z-30"
      >
        <motion.div style={{ y: topY }} className="absolute inset-x-0 top-0 h-screen bg-paper" />
        <motion.div style={{ y: bottomY }} className="absolute inset-x-0 top-0 h-screen bg-paper" />
        <motion.div style={{ x: leftX }} className="absolute inset-y-0 left-0 w-screen bg-paper" />
        <motion.div style={{ x: rightX }} className="absolute inset-y-0 left-0 w-screen bg-paper" />

        <Chrome left={left} right={right} top={top} bottom={bottom} opacity={chrome} />
      </motion.div>

      {children}
    </div>
  );
}

/**
 * The hairlines and corner brackets that make the opening read as a built
 * screen rather than a cut-out. Same construction as everywhere else on the
 * site: one-pixel rules and 12px right-angle ticks, never a scaled border.
 */
function Chrome({
  left,
  right,
  top,
  bottom,
  opacity,
}: {
  left: MotionValue<number>;
  right: MotionValue<number>;
  top: MotionValue<number>;
  bottom: MotionValue<number>;
  opacity: MotionValue<number>;
}) {
  const width = useTransform([left, right] as const, ([l, r]: number[]) => (r ?? 0) - (l ?? 0));
  const height = useTransform([top, bottom] as const, ([t, b]: number[]) => (b ?? 0) - (t ?? 0));

  return (
    <motion.div
      style={{ x: left, y: top, width, height, opacity }}
      className="absolute left-0 top-0"
    >
      <span className="absolute inset-x-0 top-0 h-px bg-[color:var(--rule-strong)]" />
      <span className="absolute inset-x-0 bottom-0 h-px bg-[color:var(--rule-strong)]" />
      <span className="absolute inset-y-0 left-0 w-px bg-[color:var(--rule-strong)]" />
      <span className="absolute inset-y-0 right-0 w-px bg-[color:var(--rule-strong)]" />
      {CORNERS.map((corner) => (
        <span
          key={corner.key}
          className={`absolute h-3 w-3 border-brand-ink/70 ${corner.className}`}
        />
      ))}
    </motion.div>
  );
}

const CORNERS = [
  { key: "tl", className: "left-0 top-0 border-l border-t" },
  { key: "tr", className: "right-0 top-0 border-r border-t" },
  { key: "bl", className: "bottom-0 left-0 border-b border-l" },
  { key: "br", className: "bottom-0 right-0 border-b border-r" },
] as const;
