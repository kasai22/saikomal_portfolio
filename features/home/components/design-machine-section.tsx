"use client";

import { useRef } from "react";
import { HomeSection } from "@/features/home/components/home-section";
import { SectionHeading } from "@/features/home/components/section-heading";
import { DesignMachine } from "@/components/design-machine/design-machine";
import { DesignMachineStory } from "@/components/design-machine/design-machine-story";
import { DECK, MACHINE_CAPTION, SLIDE_INTRO } from "@/features/home/constants/data";
import { QUERY } from "@/lib/animations/constants";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMotionTier } from "@/hooks/use-motion-tier";

/**
 * Slide 03, "My approach" — the whole method as one machine, seen from the
 * side, with a camera that travels its length. Discover → Define → Design →
 * Build → Validate, one station per step.
 *
 * This *is* the approach slide, not a figure next to one: stating the five
 * steps as a list and then drawing them again would say the same thing twice.
 * Every station's step, description and artefact is written out in the
 * server HTML (and in full below `md` and under reduced motion), so the
 * method is readable as text as well as watchable as a drawing.
 *
 * Placed after the four figures. The other four
 * are each about one part of the work — how the disciplines combine, how an
 * interface is assembled, what it does once intelligence is behind it, how a
 * problem gets ordered. This one is the object all four are parts of, which is
 * why it comes after them rather than before: it reads as a summation, and a
 * summation that arrives first is just an index.
 *
 * ── What makes it different from the other four ─────────────────────────
 * A camera. Every other figure on this site is a fixed frame with things
 * happening inside it; this one is a fixed *object* with a viewpoint moving
 * along it, and the piece being worked stays in the middle of the frame while
 * the apparatus travels past. That inversion is the whole experience, and it
 * is the reason this is the one figure driven by a GSAP timeline — a scrubbed
 * dolly with real weight behind it is what ScrollTrigger is for.
 *
 * ── The runway ──────────────────────────────────────────────────────────
 * The stage pins while the camera travels. The runway is an in-flow spacer,
 * **not** padding on the section: a sticky box is constrained by its
 * containing block, which for an in-flow child is the parent's *content* box,
 * and padding would give it nothing to travel through. The stage releases at
 * `runway / (stage + runway)` — around 0.76 on desktop — and `END` sits below
 * that, so the machine has finished its run and delivered before the section
 * starts moving again.
 *
 * ── Below `md`, and under reduced motion ────────────────────────────────
 * No runway, no pinning, no scrubbing, and GSAP is never fetched at all. Both
 * get the same vertical sequence, with every station's part, step, description
 * and artefact written out and the real screen still at the end. A camera is
 * not information; the machine is, and the machine survives the translation
 * intact.
 */

/**
 * Extra scroll distance below the pinned stage, in `svh`.
 *
 * The largest on the site, because it is the only figure where the scroll is
 * buying *distance travelled* rather than steps completed: six stations across
 * a plane nearly three times the width of the frame, with a hold at each one
 * long enough to read it. Less than this and the camera never stops moving.
 */
const RUNWAY = { desktop: 320, tablet: 250 };

/**
 * Where the run finishes, as a fraction of the runway's own height — handed to
 * ScrollTrigger as its `end`. Comfortably below the release point, so the
 * delivered product holds still, pinned, before the section hands over to
 * About.
 */
const END = 0.64;

export function DesignMachineSection() {
  const runway = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionTier();
  const large = useMediaQuery(QUERY.lg);
  const roomy = useMediaQuery(QUERY.md);

  const driven = roomy && !reduced;
  const svh = reduced || !roomy ? 0 : large ? RUNWAY.desktop : RUNWAY.tablet;

  return (
    <HomeSection id="approach" tone="raised">
      <div ref={runway} className="relative">
        <div className={svh > 0 ? "sticky top-16" : undefined}>
          <SectionHeading
            chapter={DECK.approach.chapter}
            eyebrow={DECK.approach.eyebrow}
            title={
              <>
                A problem goes in. A <span className="text-brand-ink">working product</span>{" "}
                comes out.
              </>
            }
            intro={SLIDE_INTRO.approach}
          />

          {/* Chosen in JS rather than by CSS. Rendering both and hiding one
              would put a three-screen-wide plane and 118 KB of ScrollTrigger
              on a phone that will never see either. The server renders the
              vertical sequence, so every word is in the HTML either way; a
              wide viewport swaps to the camera on the first client render. */}
          <figure>
            {driven ? (
              <DesignMachine runway={runway} end={END} driven={driven} />
            ) : (
              <DesignMachineStory />
            )}

            <figcaption className="mt-3 max-w-3xl font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-ink/40">
              {MACHINE_CAPTION}
            </figcaption>
          </figure>
        </div>

        {/* The runway. Pure scroll distance for the camera to travel through —
            and none of the page's height when there is no camera. */}
        {svh > 0 && <div style={{ height: `${svh}svh` }} aria-hidden="true" />}
      </div>
    </HomeSection>
  );
}
