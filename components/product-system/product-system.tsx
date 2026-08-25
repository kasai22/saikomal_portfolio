"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useTransform, type MotionValue } from "motion/react";
import { ParallaxLayer } from "@/components/animations/Parallax";
import { usePointerTier } from "@/hooks/use-scroll-tier";
import { useMouseParallax } from "@/hooks/use-mouse-parallax";
import { useMotionTier } from "@/hooks/use-motion-tier";
import { cn } from "@/lib/utils";
import { DisciplineNode } from "@/components/product-system/discipline-node";
import { FlowArtifact } from "@/components/product-system/flow-artifact";
import { SystemConnector } from "@/components/product-system/system-connector";
import {
  AI_PRESENCE,
  CORE,
  PHASE,
  lerp,
  phase,
  stageScale,
  type DisciplineId,
} from "@/components/product-system/product-system-timeline";
import { PRODUCT_SYSTEM, SYSTEM_CORE } from "@/features/home/constants/data";

/**
 * The spatial stage — three disciplines circulating information into one
 * product experience.
 *
 * ── What the reader sees ────────────────────────────────────────────────
 * Three names at headline scale, far apart, each with its own words stacked
 * underneath. They draw together and wire to each other — every pair, both
 * directions, no chain. Information starts moving along those links. The
 * stacked words then leave home and travel onto a ring, each discipline
 * keeping its own sector of it, and the ring closes. The product experience
 * resolves in the middle of it while the three names shrink to tags on the
 * outside.
 *
 * ── Where the numbers live ──────────────────────────────────────────────
 * Nowhere in this file. Every window, coordinate and size comes from
 * `product-system-timeline`, so re-choreographing the sequence is editing one
 * object rather than hunting through five components.
 *
 * ── Pointer ─────────────────────────────────────────────────────────────
 * Three depth tiers off one listener, capped at 8px. Applied to *layers*
 * rather than to elements: fifteen elements each following the pointer would
 * be fifteen more values per frame for an effect that is only supposed to
 * register as slight depth. Desktop-with-a-real-pointer only, via
 * `useMouseParallax`.
 *
 * ── Why the size is measured ────────────────────────────────────────────
 * Geometry is normalised and multiplied by the stage's real pixel size, so
 * the composition fills whatever box it is given. A deterministic fallback is
 * used until the first measurement, which means the words are in the server
 * HTML and the first client render matches it — no blank frame, no hydration
 * mismatch, and the measurement only ever corrects the layout.
 */

/** Used for the server render and the first client render. Then measured. */
const FALLBACK = { width: 1100, height: 560 };

interface ProductSystemProps {
  /** The section's scroll progress, already remapped and smoothed. */
  progress: MotionValue<number>;
}

export function ProductSystem({ progress }: ProductSystemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(FALLBACK);
  const { reduced } = useMotionTier();
  const { x: pointerX, y: pointerY } = useMouseParallax(ref);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect || rect.width === 0) return;
      const next = { width: Math.round(rect.width), height: Math.round(rect.height) };
      setSize((prev) =>
        Math.abs(prev.width - next.width) < 2 && Math.abs(prev.height - next.height) < 2
          ? prev
          : next,
      );
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const [hovered, setHovered] = useState<DisciplineId | null>(null);
  const { width, height } = size;

  // Three depth tiers, one listener. Nearest layer moves furthest, and even
  // that is 8px — this is meant to be felt rather than seen.
  const artifactsX = usePointerTier(pointerX, 5, !reduced);
  const artifactsY = usePointerTier(pointerY, 5, !reduced);
  const namesX = usePointerTier(pointerX, 8, !reduced);
  const namesY = usePointerTier(pointerY, 8, !reduced);
  const coreX = usePointerTier(pointerX, 3, !reduced);
  const coreY = usePointerTier(pointerY, 3, !reduced);

  return (
    <div
      ref={ref}
      // `overflow-hidden` because everything in here is absolutely positioned
      // and nothing above it clips: one label reaching past the left edge on a
      // narrow desktop would widen the document and give the whole page a
      // horizontal scrollbar. Safe on the sticky parent — it is a descendant
      // of the sticky box, not an ancestor of it.
      className="relative h-[58svh] min-h-[420px] w-full overflow-hidden lg:h-[62svh] lg:max-h-[660px]"
    >
      {/* Links and information — the layer the whole argument rides on. */}
      <ParallaxLayer x={artifactsX} y={artifactsY} className="absolute inset-0">
        <SystemConnector
          progress={progress}
          width={width}
          height={height}
          hovered={hovered}
          circulating={inView && !reduced}
        />

        {PRODUCT_SYSTEM.map((discipline) => (
          <ArtifactGroup
            key={discipline.id}
            id={discipline.id}
            artifacts={discipline.artifacts}
            progress={progress}
            width={width}
            height={height}
            dimmed={hovered !== null && hovered !== discipline.id}
          />
        ))}
      </ParallaxLayer>

      {/* The names. Nearest to the reader, so they carry the most pointer. */}
      <ParallaxLayer x={namesX} y={namesY} className="absolute inset-0">
        {PRODUCT_SYSTEM.map((discipline) => (
          <DisciplineNode
            key={discipline.id}
            discipline={discipline}
            progress={progress}
            width={width}
            height={height}
            hovered={hovered}
            onHover={setHovered}
          />
        ))}
      </ParallaxLayer>

      {/* What the three of them produce. Furthest back — it is the thing the
          system is built around, not a card sitting on top of it. */}
      <ParallaxLayer x={coreX} y={coreY} className="pointer-events-none absolute inset-0">
        <ProductCore progress={progress} width={width} height={height} />
      </ParallaxLayer>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Groups
 * ------------------------------------------------------------------ */

interface ArtifactGroupProps {
  id: DisciplineId;
  artifacts: string[];
  progress: MotionValue<number>;
  width: number;
  height: number;
  dimmed: boolean;
}

/**
 * A discipline's four artifacts share one opacity and one emphasis state.
 * Four independent fades would cost four values a frame to say the thing one
 * value already says: this discipline is present, or this discipline is the
 * one being looked at.
 */
function ArtifactGroup({ id, artifacts, progress, width, height, dimmed }: ArtifactGroupProps) {
  const opacity = useTransform(progress, (value) =>
    id === "ai" ? lerp(AI_PRESENCE.before, AI_PRESENCE.after, phase(value, PHASE.aiJoin)) : 1,
  );

  return (
    <motion.div
      style={{ opacity }}
      className={cn(
        "absolute inset-0 transition-opacity duration-fast",
        dimmed ? "opacity-40" : "opacity-100",
      )}
    >
      {artifacts.map((label, index) => (
        <FlowArtifact
          key={label}
          label={label}
          discipline={id}
          index={index}
          total={artifacts.length}
          progress={progress}
          width={width}
          height={height}
        />
      ))}
    </motion.div>
  );
}

/**
 * The product experience. Absent while there are three systems, present once
 * there is one — the inverse of what the discipline names do, which is the
 * point of the whole sequence.
 */
function ProductCore({
  progress,
  width,
  height,
}: {
  progress: MotionValue<number>;
  width: number;
  height: number;
}) {
  const size = stageScale(width);

  const transform = useTransform(progress, (value) => {
    const resolved = phase(value, PHASE.resolve);
    return `translate(${(CORE.x * width).toFixed(1)}px, ${(CORE.y * height).toFixed(1)}px) scale(${lerp(0.94, 1, resolved).toFixed(3)})`;
  });
  const opacity = useTransform(progress, (value) => phase(value, PHASE.resolve));

  return (
    <motion.div style={{ transform, opacity }} className="absolute left-0 top-0">
      <div
        style={{ width: size.coreWidth }}
        className="corner-ticks border-ink/12 -translate-x-1/2 -translate-y-1/2 border bg-paper-panel px-6 py-5 text-center"
      >
        <h3
          style={{ fontSize: size.core }}
          className="font-medium leading-[1.05] tracking-[-0.03em] text-ink"
        >
          {SYSTEM_CORE.label}
        </h3>
        <p className="t-meta mt-2 text-ink/60">{SYSTEM_CORE.detail}</p>
      </div>
    </motion.div>
  );
}
