"use client";

import { useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "motion/react";
import { HomeSection } from "@/features/home/components/home-section";
import { SectionHeading } from "@/features/home/components/section-heading";
import { ProductIntelligence } from "@/components/product-intelligence/product-intelligence";
import { ProductIntelligenceMobile } from "@/components/product-intelligence/product-intelligence-mobile";
import { clamp01 } from "@/components/product-intelligence/product-intelligence-timeline";
import { AI_LOOP_CAPTION, DECK, SLIDE_INTRO } from "@/features/home/constants/data";
import { QUERY } from "@/lib/animations/constants";
import { SPRING_SCROLL } from "@/lib/animations/springs";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMotionTier } from "@/hooks/use-motion-tier";
import { useSectionScroll } from "@/hooks/use-scroll-tier";

/**
 * FIG. 03 — one turn of an intelligent product's loop, drawn as a system
 * diagram and assembled under the reader's scroll.
 *
 * Placed after FIG. 02, and the last thing before the page turns to
 * background and track record. The order the three figures run in is an
 * argument in itself: FIG. 01 says AI is one of three disciplines in the
 * practice, FIG. 02 shows an interface being put together, and this one shows
 * what that interface has to *do* once there is intelligence behind it —
 * where the decision comes from, what it is allowed to act on, and what
 * happens to the answer the user gives back.
 *
 * It is a UX diagram, not a model one. There is no architecture here, no
 * layers, no weights and nothing about how a model works. What it draws is
 * where a product designer's decisions actually sit in a system like this:
 * what context is gathered before anything is inferred, what the system is
 * allowed to reach for, whether it acts or asks when it is unsure, what is
 * checked before a user sees it, and whether the user's response is kept.
 *
 * ── The runway ──────────────────────────────────────────────────────────
 * The stage needs scroll distance to be driven through, so the section is a
 * runway with the stage pinned at the top of it. The runway is an in-flow
 * spacer, **not** padding on the section: a sticky box is constrained by its
 * containing block, which for an in-flow child is the parent's *content* box,
 * and padding would give it nothing to travel through. The stage releases at
 * `runway / (stage + runway)` and `END` sits below that, so the system has
 * always closed its loop before the section starts moving again.
 *
 * ── Below `md`, and under reduced motion ────────────────────────────────
 * No runway, no pinning, no scrubbing. Mobile gets a vertical flow with every
 * line of every stage written out, since there is no hover to hide it behind.
 * Reduced motion gets the diagram complete and static from the moment it
 * enters the viewport — the drawing's CSS fallbacks already compose into the
 * resolved system, so it is correct before a single value is written — with
 * emphasis still available on hover, focus and click.
 */

/** Extra scroll distance below the pinned stage, in `svh`. */
const RUNWAY = { desktop: 135, tablet: 110 };

/**
 * Where the sequence finishes, in section progress.
 *
 * Deliberately lower than the 0.5 the other two figures use. This one ends on
 * a loop closing, and a loop that closes on the last frame before the stage
 * unpins is a loop nobody gets to look at. Finishing at 0.42 leaves roughly
 * 350px of scroll where the whole system is drawn, pinned and circulating
 * before the section starts moving again.
 */
const END = 0.42;

export function ProductIntelligenceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { progress } = useSectionScroll(ref, ["start start", "end start"]);
  const { reduced } = useMotionTier();
  const large = useMediaQuery(QUERY.lg);
  const roomy = useMediaQuery(QUERY.md);

  const runway = reduced || !roomy ? 0 : large ? RUNWAY.desktop : RUNWAY.tablet;

  // Reduced motion resolves the system and leaves it there. `MotionConfig`
  // cannot help — it governs animations, and everything below is a
  // scroll-derived value, which it does not see.
  const resolved = useMotionValue(1);
  const scrubbed = useTransform(progress, (value) => clamp01(value / END));
  // Spring-smoothed, so the wires lag the wheel slightly and read as being
  // laid rather than as a value being dragged.
  const smoothed = useSpring(scrubbed, SPRING_SCROLL);
  const timeline = reduced ? resolved : smoothed;

  return (
    <HomeSection id="intelligence" tone="raised">
      <div ref={ref} className="relative">
        <div className={runway > 0 ? "sticky top-16" : undefined}>
          <SectionHeading
            chapter={DECK.intelligence.chapter}
            eyebrow={DECK.intelligence.eyebrow}
            title={
              <>
                Intelligence is a <span className="text-brand-ink">loop</span>, not a feature.
              </>
            }
            intro={SLIDE_INTRO.intelligence}
          />

          {/* Chosen in JS rather than by CSS. Rendering both and hiding one
              would leave a phone mounting a schematic it will never see, and
              a desktop carrying a second full copy of every line of it. The
              server renders the vertical flow, so every word is in the HTML
              either way; desktop swaps to the stage on the first client
              render. */}
          <figure>
            {roomy ? <ProductIntelligence progress={timeline} /> : <ProductIntelligenceMobile />}

            <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5">
              <span className="max-w-3xl font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-ink/40">
                {AI_LOOP_CAPTION}
              </span>
              {roomy && (
                <span className="shrink-0 font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-ink/40">
                  Hover or select a stage
                </span>
              )}
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
