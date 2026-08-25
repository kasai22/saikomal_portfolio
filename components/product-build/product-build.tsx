"use client";

import { useCallback, useEffect, useRef } from "react";
import { useMotionValueEvent, type MotionValue } from "motion/react";
import { BuildCanvas } from "@/components/product-build/build-canvas";
import { BuildManifest } from "@/components/product-build/build-manifest";
import { CAPTION } from "@/components/product-build/product-build-data";
import { buildVars } from "@/components/product-build/product-build-timeline";

/**
 * FIG. 02 — the interface that assembles itself.
 *
 * ── Why this file is so small ───────────────────────────────────────────
 * Because the drawing is not made of motion components. One subscription to
 * the section's scroll value writes twenty-six CSS custom properties onto one
 * node, and `BuildCanvas` and `BuildManifest` — static markup with no hooks and
 * no state — read those properties from CSS. Roughly two hundred and sixty elements
 * animate, none of them re-render, and the only per-frame DOM work is
 * twenty-six `setProperty` calls.
 *
 * Writing them imperatively rather than binding twenty-six derived motion
 * values is not a micro-optimisation: it is the difference between one
 * subscription and twenty-six, and it keeps the timeline as data rather than
 * as twenty-six hand-written hook calls that have to be kept in step by hand.
 *
 * It is also why nothing here animates width, height, top or left. A filling
 * tick is `scaleX`, a chart column is `scaleY` from a bottom origin, a table
 * filling row by row is one `clip-path: inset()`, a panel arriving is
 * `translateX`, and the inspector docking is `translateY(110%)`.
 *
 * ── Scrubbing both ways ─────────────────────────────────────────────────
 * Every offset is `calc((1 - var(--l-x)) * N)`, so scrolling back up runs the
 * assembly in reverse without a second code path: the product deconstructs
 * layer by layer in the order it was built.
 *
 * ── What happens when nothing drives it ─────────────────────────────────
 * Every `var()` in the drawing carries a fallback, and the fallbacks compose
 * into the finished product with the scaffolding already gone. So the frame
 * between mount and the first write paints the completed interface rather than
 * an empty canvas, and reduced motion needs no branch of its own.
 */

interface ProductBuildProps {
  /** The section's scroll progress, already remapped and smoothed. */
  progress: MotionValue<number>;
}

export function ProductBuild({ progress }: ProductBuildProps) {
  const ref = useRef<HTMLDivElement>(null);

  const apply = useCallback((value: number) => {
    const element = ref.current;
    if (!element) return;
    for (const [property, resolved] of buildVars(value)) {
      element.style.setProperty(property, resolved);
    }
  }, []);

  useMotionValueEvent(progress, "change", apply);

  // Under reduced motion the source is a pinned constant, so `change` never
  // fires. This is also what paints the first driven frame after hydration.
  useEffect(() => {
    apply(progress.get());
  }, [apply, progress]);

  return (
    <div ref={ref}>
      <BuildManifest />

      <figure className="mt-5">
        <BuildCanvas />
        {/* Named for what it is. The frame reconstructs a real product's
            information architecture and fills it with sample values, and
            saying both out loud is the difference between a demonstration and
            a claim. */}
        <figcaption
          className="mt-3 max-w-3xl font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-ink/40"
          style={{ opacity: "var(--l-settle, 1)" }}
        >
          {CAPTION}
        </figcaption>
      </figure>
    </div>
  );
}
