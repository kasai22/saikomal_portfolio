"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { HERO_STAGE, HERO_SYSTEM, QUERY } from "@/lib/animations/constants";
import { SPRING_SCROLL } from "@/lib/animations/springs";
import { ENTER_SLOW, delayed } from "@/lib/animations/transitions";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMotionTier } from "@/hooks/use-motion-tier";
import { ComplexityConnections } from "@/components/hero/complexity-connections";
import { ComplexityNodes } from "@/components/hero/complexity-nodes";
import { ComplexityUIFragments } from "@/components/hero/complexity-ui-fragments";
import {
  DESKTOP_SYSTEM,
  MOBILE_SYSTEM,
  clamp01,
  tierProgress,
  type SystemGeometry,
} from "@/components/hero/complexity-geometry";

/**
 * COMPLEXITY → CLARITY. The hero's scrubbed background sequence.
 *
 * A system of nodes, connections and interface fragments that begins
 * scattered and over-wired, and resolves — under the reader's scroll, never on
 * its own — into a four-tier product structure: user, workflow, system,
 * product. It is a metaphor for the headline above it and nothing more: no
 * figures, no labels that could be read as a claim, no product that exists.
 *
 * ── Where the scroll comes from ─────────────────────────────────────────
 * Nothing here subscribes to scroll. The hero owns the single `useScroll` for
 * the section and hands its progress down, which is the site's standing rule
 * (`useSectionScroll`) and the reason a sequence this large costs one scroll
 * listener. That progress is remapped onto `[0, HERO_SYSTEM.end]` so the
 * system finishes resolving while the hero is still pinned, then spring-
 * smoothed: raw progress welds the transformation to the wheel, and this is
 * exactly the kind of motion that needs to lag the input slightly to read as
 * something with weight being moved.
 *
 * ── Why the stage is measured ───────────────────────────────────────────
 * All geometry is normalised and multiplied by the stage's real pixel size,
 * so the composition fills whatever aspect ratio it is given without
 * distortion or cropping. The measurement also means nothing renders on the
 * server: the hero's `<h1>` is this page's LCP element, and a few hundred SVG
 * nodes in the server HTML ahead of it is the one thing this sequence must
 * not cost.
 *
 * ── Motion, not GSAP ────────────────────────────────────────────────────
 * The brief allows either. Motion wins because the whole site is already
 * built on it — one scroll subscription per section, `MotionConfig
 * reducedMotion="user"`, the spring and easing tokens — and because
 * ScrollTrigger would need a scroller proxy wired to Lenis before it could
 * read scroll at all. GSAP would be a second scroll system to keep in sync
 * with the first, in exchange for a timeline API that `useTransform` windows
 * already cover.
 */

interface ComplexityToClarityProps {
  /** The hero section's own scroll progress. Not a new subscription. */
  progress: MotionValue<number>;
}

interface StageSize {
  width: number;
  height: number;
}

export function ComplexityToClarity({ progress }: ComplexityToClarityProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<StageSize | null>(null);
  const { reduced } = useMotionTier();
  const large = useMediaQuery(QUERY.lg);
  const roomy = useMediaQuery(QUERY.md);
  const wide = useMediaQuery(QUERY.wide);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect) return;
      const next = { width: Math.round(rect.width), height: Math.round(rect.height) };
      // Re-render only on a real resize. Mobile browsers resize the viewport
      // by a pixel or two as the URL bar collapses, and the whole geometry is
      // rebuilt on every change here.
      setSize((prev) =>
        prev && Math.abs(prev.width - next.width) < 2 && Math.abs(prev.height - next.height) < 2
          ? prev
          : next,
      );
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Reduced motion resolves the system and leaves it there. `MotionConfig`
  // cannot help here — it governs animations, and every value below is a
  // scroll-derived transform, which it does not see. Pinning the source to 1
  // is the honest equivalent: the reader gets the structured final state, the
  // thing the sequence was going to explain.
  const resolved = useMotionValue(1);
  const timelineEnd = roomy ? HERO_SYSTEM.end : HERO_SYSTEM.compactEnd;
  const scrubbed = useTransform(progress, (value) => clamp01(value / timelineEnd));
  const smoothed = useSpring(scrubbed, SPRING_SCROLL);
  const system = reduced ? resolved : smoothed;

  // The viewport phase runs on raw section progress rather than the remapped
  // system value — it begins where the system's own timeline has already
  // ended, so it cannot be expressed in that timeline's coordinates.
  const camera = reduced ? resolved : progress;

  // What is left of the network once the screen has taken over. Not zero: the
  // structure is what built the thing and should still be behind it, but it
  // has to stand down or the screen never becomes the subject.
  const [viewStart, viewEnd] = HERO_SYSTEM.viewport;
  const systemFade = useTransform(camera, [viewStart, viewEnd], [1, 0.26]);

  // The tiles have somewhere to go. They finish their tiling just below where
  // the screen's bottom edge lands, so as the frame opens they travel up into
  // it and settle as the thing on it — rather than being cut in half by an
  // edge that arrived around them, which is what happened when they stayed
  // put. Then they stand down, because the frame's own chrome takes over the
  // job of looking like an interface.
  const tilesY = useTransform(camera, [viewStart, viewEnd], [0, -0.09]);
  const tilesLift = useTransform(tilesY, (value) => `${(value * 100).toFixed(2)}%`);
  const tilesFade = useTransform(camera, [viewStart, viewEnd], [1, 0.4]);

  const geometry: SystemGeometry = roomy ? DESKTOP_SYSTEM : MOBILE_SYSTEM;
  const scatter = reduced
    ? 0
    : large
      ? HERO_SYSTEM.scatter.desktop
      : roomy
        ? HERO_SYSTEM.scatter.tablet
        : HERO_SYSTEM.scatter.mobile;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {size && (
        <motion.div
          key={roomy ? "roomy" : "compact"}
          className="absolute inset-0"
          style={{
            // Keeps the headline and supporting copy on clean paper. The
            // system is dense enough to be a texture, and a texture behind
            // 13px body copy is a contrast problem however faint it is.
            maskImage: large ? MASK_SPLIT : MASK_STACKED,
            WebkitMaskImage: large ? MASK_SPLIT : MASK_STACKED,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={delayed(ENTER_SLOW, HERO_STAGE.visual)}
        >
          <motion.div style={{ opacity: systemFade }} className="absolute inset-0">
            <ComplexityConnections
              progress={system}
              geometry={geometry}
              scatter={scatter}
              width={size.width}
              height={size.height}
              showPruned={large}
            />
            <ComplexityNodes
              progress={system}
              geometry={geometry}
              scatter={scatter}
              width={size.width}
              height={size.height}
            />
            <motion.div style={{ y: tilesLift, opacity: tilesFade }} className="absolute inset-0">
              <ComplexityUIFragments
                progress={system}
                geometry={geometry}
                scatter={scatter}
                width={size.width}
                height={size.height}
                limit={large ? undefined : 3}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* The screen used to be built here, as a box inside this stage. It is
          built by `HeroToWorkScene` now — as a hole in a fixed cover rather
          than a box on the page, because a box anchored in the hero leaves
          with the hero and can never be the thing the next section arrives
          inside. What remains here is the network standing down (`systemFade`)
          and the tiles travelling up (`tilesLift`) to where that opening
          forms, which is the hand-off into it. */}

      {/* The reading. Four words that name what the structure resolves into,
          set in the site's technical annotation face and parked in the
          container's left gutter — which is why they are gated on a viewport
          wide enough to have one. Below that the tiers still resolve; they
          just go unlabelled rather than being stacked onto the headline. */}
      {wide && !!size && <TierLabels progress={system} geometry={geometry} />}
    </div>
  );
}

/**
 * Desktop: an ellipse of clear paper over the left-hand text column, feathered
 * out so the system thins toward the copy rather than stopping at an edge.
 */
const MASK_SPLIT =
  "radial-gradient(ellipse 46% 40% at 27% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 56%, rgba(0,0,0,1) 84%)";

/**
 * Tablet and mobile stack the hero into one column, so the clear band runs
 * across the middle instead: the system reads at the top and bottom of the
 * stage and thins out through the copy.
 */
const MASK_STACKED =
  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 22%, rgba(0,0,0,0.22) 64%, rgba(0,0,0,1) 92%)";

function TierLabels({
  progress,
  geometry,
}: {
  progress: MotionValue<number>;
  geometry: SystemGeometry;
}) {
  return (
    <div className="absolute inset-0">
      <div className="relative mx-auto h-full w-full max-w-6xl">
        {geometry.tiers.map((tier, index) => (
          <TierLabel
            key={tier.label}
            label={tier.label}
            y={tier.y}
            tier={index}
            progress={progress}
          />
        ))}
      </div>
    </div>
  );
}

function TierLabel({
  label,
  y,
  tier,
  progress,
}: {
  label: string;
  y: number;
  tier: number;
  progress: MotionValue<number>;
}) {
  // A label arrives with its own row and not before. Naming a tier that has
  // not assembled yet would be the animation explaining itself in advance.
  const opacity = useTransform(progress, (value) => tierProgress(value, tier));

  return (
    <motion.div
      style={{ opacity, top: `${y * 100}%` }}
      className="absolute right-full mr-4 flex -translate-y-1/2 items-center gap-2 whitespace-nowrap"
    >
      <span className="t-label text-ink/45">{label}</span>
      <span className="h-px w-3 bg-[color:var(--rule-strong)]" aria-hidden="true" />
    </motion.div>
  );
}
