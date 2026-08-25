"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { HomeSection } from "@/features/home/components/home-section";
import { SectionHeading } from "@/features/home/components/section-heading";
import { ProductBuild } from "@/components/product-build/product-build";
import { ProductBuildMobile } from "@/components/product-build/product-build-mobile";
import { CAPTION } from "@/components/product-build/product-build-data";
import {
  LAYERS,
  STAGES,
  clamp01,
  stageEmphasis,
  stageVar,
} from "@/components/product-build/product-build-timeline";
import { DECK, SLIDE_INTRO } from "@/features/home/constants/data";
import { QUERY } from "@/lib/animations/constants";
import { SPRING_SCROLL } from "@/lib/animations/springs";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMotionTier } from "@/hooks/use-motion-tier";
import { useSectionScroll } from "@/hooks/use-scroll-tier";

/**
 * FIG. 02 — an enterprise operations console assembling itself, layer by
 * layer, under the reader's scroll.
 *
 * Placed after slide 04 (How I work). The method has just been described in
 * five stages; this is the same argument made visually, on a real product's
 * information architecture. `FIG. 03` follows it — the interface having been
 * assembled, what it then has to do once there is intelligence behind it.
 *
 * ── The runway ──────────────────────────────────────────────────────────
 * The stage pins while twenty layers are drawn onto it. The runway is an
 * in-flow spacer, **not** padding: a sticky box is constrained by its
 * containing block, which for an in-flow child is the parent's *content* box,
 * and padding would give it nothing to travel through. The stage releases at
 * `runway / (stage + runway)` and `END` sits below that, so the build has
 * always finished before the section starts moving again.
 *
 * ── Responsive ──────────────────────────────────────────────────────────
 * Desktop gets the full console. Tablet keeps it and drops the analytics
 * column, which is the secondary panel and the first thing a narrower
 * workspace would collapse. Below `md` there is no canvas at all: a
 * nine-column operations table on a 390px viewport is unreadable at any size,
 * so the phone gets the mobile form of the same product — app bar, summary
 * tiles, filter chips, trips as cards, status, activity, inspector — under
 * the same stage list.
 *
 * ── Reduced motion ──────────────────────────────────────────────────────
 * The source is pinned to 1: no scrubbing, no scroll-linked transforms, no
 * construction choreography at all. The five stages still read, and the
 * product is complete and legible from the moment it enters the viewport —
 * the drawing's CSS fallbacks already compose into the finished interface, so
 * it is correct before a single value is written.
 */

/** Extra scroll distance below the pinned stage, in `svh`. */
const RUNWAY = { desktop: 140, tablet: 110 };

/** Where the build finishes, in section progress. Below the release point. */
const END = 0.5;

export function ProductBuildSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { progress } = useSectionScroll(ref, ["start start", "end start"]);
  const { reduced } = useMotionTier();
  const large = useMediaQuery(QUERY.lg);
  const roomy = useMediaQuery(QUERY.md);

  const runway = reduced || !roomy ? 0 : large ? RUNWAY.desktop : RUNWAY.tablet;

  const resolved = useMotionValue(1);
  const scrubbed = useTransform(progress, (value) => clamp01(value / END));
  // Spring-smoothed, so the assembly lags the wheel slightly and reads as
  // something being put together rather than a value being dragged.
  const smoothed = useSpring(scrubbed, SPRING_SCROLL);
  const timeline = reduced ? resolved : smoothed;

  return (
    <HomeSection id="build">
      <div ref={ref} className="relative">
        <div className={runway > 0 ? "sticky top-16" : undefined}>
          <SectionHeading
            chapter={DECK.build.chapter}
            eyebrow={DECK.build.eyebrow}
            title={
              <>
                An interface is <span className="text-brand-ink">assembled</span>, not drawn.
              </>
            }
            intro={SLIDE_INTRO.build}
          />

          {roomy ? (
            <ProductBuild progress={timeline} />
          ) : (
            <BuildStagesCompact progress={timeline} />
          )}
        </div>

        {/* The runway. Pure scroll distance for the pinned stage to travel
            through, and none of the page's height when there is no build to
            drive. */}
        {runway > 0 && <div style={{ height: `${runway}svh` }} aria-hidden="true" />}
      </div>
    </HomeSection>
  );
}

/**
 * Below `md`: the five stages, then the product they build. The stage list
 * carries the argument the desktop canvas carries through assembly, and the
 * mobile console underneath is what gets assembled.
 */
function BuildStagesCompact({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<HTMLOListElement>(null);

  // The same five stages, and the only motion the phone gets: each one comes
  // forward as the section passes it. One subscription, five property writes,
  // no transforms and nothing scrubbed — the console below is already built.
  const apply = useCallback((value: number) => {
    const element = ref.current;
    if (!element) return;
    STAGES.forEach((stage, index) => {
      element.style.setProperty(stageVar(index), String(stageEmphasis(value, stage.window)));
    });
  }, []);

  useMotionValueEvent(progress, "change", apply);
  useEffect(() => {
    apply(progress.get());
  }, [apply, progress]);

  return (
    <div className="flex flex-col gap-6">
      <ol ref={ref} className="flex flex-col gap-3">
        {STAGES.map((stage, index) => (
          <li
            key={stage.label}
            className="flex items-baseline gap-2.5 transition-opacity duration-fast"
            style={{ opacity: `var(${stageVar(index)}, 1)` }}
          >
            <span className="t-label shrink-0 tabular-nums text-brand-ink">{`0${index + 1}`}</span>
            <span className="t-label shrink-0 text-ink">{stage.label}</span>
            <span className="min-w-0 flex-1 truncate text-[10px] leading-none text-ink/45">
              {LAYERS.filter((layer) => stage.layers.includes(layer.id))
                .map((layer) => layer.label)
                .join(" · ")}
            </span>
          </li>
        ))}
      </ol>

      <ProductBuildMobile />

      <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-ink/40">
        {CAPTION}
      </p>
    </div>
  );
}
