"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { HERO_SYSTEM } from "@/lib/animations/constants";
import {
  linkPath,
  nodePoint,
  windowProgress,
  type SystemGeometry,
  type SystemLink,
  type SystemNode,
} from "@/components/hero/complexity-geometry";

interface ConnectionsProps {
  /** System progress, 0-1. One subscription, shared by the whole stage. */
  progress: MotionValue<number>;
  geometry: SystemGeometry;
  scatter: number;
  width: number;
  height: number;
  /** Tablet drops the redundant diagonals rather than animating them away. */
  showPruned: boolean;
}

/**
 * The connective tissue: bowed, crossing chords between scattered nodes that
 * straighten into a squared-off vertical spine as the system resolves.
 *
 * ── One value per line ──────────────────────────────────────────────────
 * Each path derives its whole `d` attribute from a single `useTransform` off
 * the shared progress value — endpoints and both control pairs computed
 * together in one function rather than as six separate motion values wired to
 * six attributes. Fifteen to eighteen lines therefore cost fifteen to eighteen
 * subscriptions, all fed by the hero's single `useScroll`.
 *
 * ── Why paths and not lines ─────────────────────────────────────────────
 * The tangle *is* the first state. Straight segments between scattered points
 * read as a constellation; bowed ones read as wiring that nobody has traced.
 * The morph from one to the other is the sequence's central gesture, so it is
 * worth the geometry: `d` is a paint, not a layout, and these are hairlines
 * with no filter, stroke gradient or dash on them.
 */
export function ComplexityConnections({
  progress,
  geometry,
  scatter,
  width,
  height,
  showPruned,
}: ConnectionsProps) {
  const { nodes, links } = geometry;

  // Connections recede as the structure appears. The resolved diagram should
  // read through its alignment; the wiring is what carried the meaning while
  // there was no alignment to read.
  const coreOpacity = useTransform(progress, [0, 1], [1, 0.7]);
  const accentOpacity = useTransform(progress, [0.3, 1], [0, 1]);
  const prunedOpacity = useTransform(progress, (value) =>
    showPruned
      ? 1 - windowProgress(value, HERO_SYSTEM.pruneWindow[0], HERO_SYSTEM.pruneWindow[1])
      : 0,
  );

  const shared = { progress, nodes, scatter, width, height };
  const lastTier = geometry.tiers.length - 1;
  const isAccent = (link: SystemLink) => nodes[link.to]?.tier === lastTier;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="absolute inset-0"
      aria-hidden="true"
      focusable="false"
    >
      {/* Ink spine — the bulk of the system. */}
      <motion.g
        fill="none"
        stroke="rgba(20,20,15,0.2)"
        strokeWidth={1}
        style={{ opacity: coreOpacity }}
      >
        {links.map((link, i) =>
          link.kind === "core" && !isAccent(link) ? (
            <Connection key={`core-${i}`} link={link} {...shared} />
          ) : null,
        )}
      </motion.g>

      {/* The last hop into the product tier, in the site's one accent. It
          arrives late and only once the tier below it has somewhere to land —
          the single warm mark in an otherwise ink drawing. */}
      <motion.g fill="none" stroke="#C9871F" strokeWidth={1} style={{ opacity: accentOpacity }}>
        {links.map((link, i) =>
          link.kind === "core" && isAccent(link) ? (
            <Connection key={`accent-${i}`} link={link} {...shared} />
          ) : null,
        )}
      </motion.g>

      {/* The redundant diagonals. These do not tidy up — they are removed,
          which is the honest version of what simplifying a workflow does. */}
      <motion.g
        fill="none"
        stroke="rgba(20,20,15,0.16)"
        strokeWidth={1}
        strokeDasharray="2 4"
        style={{ opacity: prunedOpacity }}
      >
        {showPruned &&
          links.map((link, i) =>
            link.kind === "pruned" ? (
              <Connection key={`pruned-${i}`} link={link} {...shared} />
            ) : null,
          )}
      </motion.g>
    </svg>
  );
}

interface ConnectionProps {
  progress: MotionValue<number>;
  link: SystemLink;
  nodes: SystemNode[];
  scatter: number;
  width: number;
  height: number;
}

/**
 * A component per line rather than a hook inside `.map`. The stage swaps its
 * whole geometry between the mobile and desktop systems on resize, which
 * changes how many links exist — hooks called in a loop would change count
 * between renders.
 */
function Connection({ progress, link, nodes, scatter, width, height }: ConnectionProps) {
  const from = nodes[link.from];
  const to = nodes[link.to];

  const d = useTransform(progress, (value) => {
    if (!from || !to) return "";
    return linkPath(
      link,
      nodePoint(from, value, scatter, width, height),
      nodePoint(to, value, scatter, width, height),
      scatter,
    );
  });

  if (!from || !to) return null;
  // A motion value handed to an SVG attribute prop is bound as that attribute
  // — no React re-render per frame, and no `style` round-trip for geometry
  // that is not a CSS property in the first place.
  return <motion.path d={d} />;
}
