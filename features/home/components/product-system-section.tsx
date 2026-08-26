"use client";

import { useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "motion/react";
import { HomeSection } from "@/features/home/components/home-section";
import { SectionHeading } from "@/features/home/components/section-heading";
import { ProductSystem } from "@/components/product-system/product-system";
import { PRODUCT_SYSTEM, SYSTEM_CORE, DECK, SLIDE_INTRO } from "@/features/home/constants/data";
import { QUERY } from "@/lib/animations/constants";
import { SPRING_SCROLL } from "@/lib/animations/springs";
import { clamp01 } from "@/components/product-system/product-system-timeline";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMotionTier } from "@/hooks/use-motion-tier";
import { useSectionScroll } from "@/hooks/use-scroll-tier";

/**
 * FIG. 01 — the one diagram on the home page, and the only section on it that
 * takes more than a screen.
 *
 * Placed straight after slide 02 (Development), where
 * the reader has just seen design case studies *and* shipped front-ends and
 * has the obvious question: how do those two go together? Not a numbered
 * slide — the numbered deck is the running order of the pitch and a figure
 * is not a stop on it, so this carries a `FIG.` mark in the same annotation
 * face the case studies use for their own figures.
 *
 * ── The runway ──────────────────────────────────────────────────────────
 * The stage needs scroll distance to be driven through, so the section is a
 * runway with the stage pinned at the top of it. The runway is an in-flow
 * spacer, **not** padding on the section: a sticky box is constrained by its
 * containing block, which for an in-flow child is the parent's *content* box,
 * and padding would give it nothing to travel through.
 *
 * The stage releases at `runway / (stage + runway)` — about 0.61 on desktop
 * and 0.55 on tablet — and `END` sits below both, so the sequence has always
 * resolved before the section starts moving again. Total height lands around
 * 180svh on desktop and 155svh on tablet.
 *
 * ── Below `md`, and under reduced motion ────────────────────────────────
 * No runway, no pinning, no scrubbing. Mobile gets a vertical flow instead of
 * the spatial stage, and reduced motion gets the spatial stage pinned to its
 * resolved state — the loop closed, the ring populated, the product
 * experience present — with every line of text at full size. Nothing is
 * behind a trigger in either case.
 */

/** Extra scroll distance below the pinned stage, in `svh`. */
const RUNWAY = { desktop: 110, tablet: 85 };

/** Where the sequence finishes, in section progress. Below both release points. */
const END = 0.5;

export function ProductSystemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { progress } = useSectionScroll(ref, ["start start", "end start"]);
  const { reduced } = useMotionTier();
  const large = useMediaQuery(QUERY.lg);
  const roomy = useMediaQuery(QUERY.md);

  const runway = reduced || !roomy ? 0 : large ? RUNWAY.desktop : RUNWAY.tablet;

  // Reduced motion resolves the system and leaves it there. `MotionConfig`
  // cannot help — it governs animations, and everything below is a
  // scroll-derived transform, which it does not see.
  const resolved = useMotionValue(1);
  const scrubbed = useTransform(progress, (value) => clamp01(value / END));
  // Spring-smoothed: raw progress welds the transformation to the wheel, and a
  // system being assembled should lag the input slightly, the way something
  // with weight does.
  const smoothed = useSpring(scrubbed, SPRING_SCROLL);
  const timeline = reduced ? resolved : smoothed;

  return (
    <HomeSection id="system" tone="raised">
      <div ref={ref} className="relative">
        <div className={runway > 0 ? "sticky top-16" : undefined}>
          <SectionHeading
            chapter={DECK.system.chapter}
            eyebrow={DECK.system.eyebrow}
            title={
              <>
                Three disciplines, <span className="text-brand-ink">one system</span>.
              </>
            }
            intro={SLIDE_INTRO.system}
          />

          {/* Chosen in JS rather than by CSS. Rendering both and hiding one
              would leave a phone driving forty-odd motion values through a
              `display: none` composition it will never see. The server
              renders the vertical flow, so every word is in the HTML either
              way; desktop swaps to the stage on the first client render. */}
          {roomy ? <ProductSystem progress={timeline} /> : <SystemFlowMobile />}
        </div>

        {/* The runway. Pure scroll distance for the pinned stage to travel
            through — and none of the page's height when there is no sequence
            to drive. */}
        {runway > 0 && <div style={{ height: `${runway}svh` }} aria-hidden="true" />}
      </div>
    </HomeSection>
  );
}

/**
 * Below `md`: the same system as a vertical flow.
 *
 * The spatial version is a ring, and a ring has nowhere to go on a 390px
 * viewport. What has to survive the translation is the one thing the section
 * is for — that these three feed *each other* — so the connector between each
 * pair points both ways, and the product experience sits at the end as
 * something the loop produces rather than something it hands off to.
 */
function SystemFlowMobile() {
  return (
    <div className="flex flex-col">
      {PRODUCT_SYSTEM.map((discipline, index) => (
        <div key={discipline.id}>
          {index > 0 && <Exchange />}
          <div>
            <h3 className="font-mono text-[19px] font-medium uppercase leading-none tracking-[0.14em] text-ink">
              {discipline.label}
            </h3>
            <p className="t-meta mt-1.5 text-ink/50">{discipline.detail}</p>
            <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5">
              {discipline.artifacts.map((artifact) => (
                <li
                  key={artifact}
                  className="font-mono text-[10px] uppercase leading-none tracking-[0.1em] text-ink/70"
                >
                  <span className="mr-2 text-brand" aria-hidden="true">
                    ·
                  </span>
                  {artifact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <Exchange />

      <div className="corner-ticks border-ink/12 border bg-paper-panel px-5 py-4">
        <h3 className="t-h3 text-ink">{SYSTEM_CORE.label}</h3>
        <p className="t-meta mt-1 text-ink/60">{SYSTEM_CORE.detail}</p>
      </div>
    </div>
  );
}

/**
 * The marker between two disciplines. Points both ways on purpose: an arrow
 * with one head is the pipeline this section exists to argue against.
 */
function Exchange() {
  return (
    <div className="flex items-center gap-2 py-4" aria-hidden="true">
      <svg width="9" height="26" viewBox="0 0 9 26" fill="none" className="shrink-0">
        <path d="M4.5 0v26" stroke="rgba(20,20,15,0.2)" strokeWidth="1" />
        <path d="M1 3.5 4.5.5 8 3.5M1 22.5 4.5 25.5 8 22.5" stroke="#C9871F" strokeWidth="1" />
      </svg>
      <span className="h-px flex-1 bg-ink/[0.08]" />
    </div>
  );
}
