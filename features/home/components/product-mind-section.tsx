"use client";

import { useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "motion/react";
import { HomeSection } from "@/features/home/components/home-section";
import { SectionHeading } from "@/features/home/components/section-heading";
import { ProductMind } from "@/components/product-mind/product-mind";
import { ProductMindMobile } from "@/components/product-mind/product-mind-mobile";
import { clamp01 } from "@/components/product-mind/product-mind-timeline";
import { DECK, MIND_CAPTION, SLIDE_INTRO } from "@/features/home/constants/data";
import { QUERY } from "@/lib/animations/constants";
import { SPRING_FIGURE } from "@/lib/animations/springs";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMotionTier } from "@/hooks/use-motion-tier";
import { useSectionScroll } from "@/hooks/use-scroll-tier";

/**
 * FIG. 04 — a problem arriving as nine unsorted things, and being put in order.
 *
 * Placed last of the four figures, immediately before About, and that is the
 * right slot for it rather than a leftover one: the other three are about
 * products — how the disciplines combine, how an interface is assembled, what
 * it does once there is intelligence behind it. This one is about the person
 * doing it. It hands over to "A designer with an engineering mindset" on the
 * next screen, which is the same subject continued in prose.
 *
 * ── What it argues ──────────────────────────────────────────────────────
 * That the interesting part of the job is not any single stage of the method
 * but the bit before the method starts — when nine unrelated things are on the
 * table and somebody has to decide which three belong together. The figure
 * spends nearly half its scroll on that sort, and the whole five-stage chain
 * on the other half, deliberately: the chain is the easy part.
 *
 * ── The runway ──────────────────────────────────────────────────────────
 * The stage pins while the sort happens and the chain builds. The runway is an
 * in-flow spacer, **not** padding on the section: a sticky box is constrained
 * by its containing block, which for an in-flow child is the parent's *content*
 * box, and padding would give it nothing to travel through. The stage releases
 * at `runway / (stage + runway)` — around 0.75 on desktop — and `END` sits
 * below that, so the product has resolved and held before the section starts
 * moving again.
 *
 * ── Below `md`, and under reduced motion ────────────────────────────────
 * No runway, no pinning, no scrubbing. Mobile gets three plain blocks — the
 * nine loose, the three groups, the chain — because the desktop canvas is
 * built entirely around distance to travel and a phone has none. Reduced
 * motion gets the canvas resolved and static: every chip already sorted and
 * straight, every bracket drawn, the chain complete. The drawing's fallbacks
 * compose into exactly that, so it is correct before a single value is
 * written.
 */

/**
 * Extra scroll distance below the pinned stage, in `svh`.
 *
 * Matched to the other two long figures. The migration alone gets about a
 * quarter of the timeline, which at this distance is some four hundred and
 * fifty pixels of scroll for nine chips to cross the canvas — slow enough to
 * watch a specific one and see where it ends up, which is the only way the
 * sorting reads as a decision rather than a shuffle.
 */
const RUNWAY = { desktop: 260, tablet: 210 };

/**
 * Where the sequence finishes, in section progress. Below the release point,
 * so the resolved chain holds still for the last four hundred-odd pixels of
 * the pin before the section hands over to About.
 */
const END = 0.62;

export function ProductMindSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { progress } = useSectionScroll(ref, ["start start", "end start"]);
  const { reduced } = useMotionTier();
  const large = useMediaQuery(QUERY.lg);
  const roomy = useMediaQuery(QUERY.md);

  const runway = reduced || !roomy ? 0 : large ? RUNWAY.desktop : RUNWAY.tablet;

  // Reduced motion resolves the drawing and leaves it there. `MotionConfig`
  // cannot help — it governs animations, and everything below is a
  // scroll-derived value, which it does not see.
  const resolved = useMotionValue(1);
  const scrubbed = useTransform(progress, (value) => clamp01(value / END));
  // Spring-smoothed. It matters more here than in the other figures: this is
  // the one whose elements genuinely travel, and raw scroll progress would
  // make nine chips cross the canvas welded to the wheel rather than carrying
  // any weight at all.
  const smoothed = useSpring(scrubbed, SPRING_FIGURE);
  const timeline = reduced ? resolved : smoothed;

  return (
    <HomeSection id="mind">
      <div ref={ref} className="relative">
        <div className={runway > 0 ? "sticky top-16" : undefined}>
          <SectionHeading
            chapter={DECK.mind.chapter}
            eyebrow={DECK.mind.eyebrow}
            title={
              <>
                Nothing arrives <span className="text-brand-ink">in order</span>.
              </>
            }
            intro={SLIDE_INTRO.mind}
          />

          {/* Chosen in JS rather than by CSS. Rendering both and hiding one
              would leave a phone driving nine transforms through a canvas it
              will never see. The server renders the simplified flow, so every
              word is in the HTML either way; desktop swaps to the canvas on
              the first client render. */}
          <figure>
            {roomy ? <ProductMind progress={timeline} /> : <ProductMindMobile />}

            <figcaption className="mt-3 max-w-3xl font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-ink/40">
              {MIND_CAPTION}
            </figcaption>
          </figure>
        </div>

        {/* The runway. Pure scroll distance for the pinned stage to travel
            through — and none of the page's height when there is no sequence
            to drive. */}
        {runway > 0 && <div style={{ height: `${runway}svh` }} aria-hidden="true" />}
      </div>
    </HomeSection>
  );
}
