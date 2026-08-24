"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { HowIThinkStep } from "@/features/home/components/how-i-think-step";
import { SPRING_SCROLL } from "@/lib/animations/springs";
import { WIPE } from "@/lib/animations/transitions";
import { useMotionTier } from "@/hooks/use-motion-tier";
import { PROCESS_STEPS } from "@/features/home/constants/data";

/**
 * The five stages as a system rather than five cards.
 *
 * ── One scroll subscription, one active stage ───────────────────────────
 * Progress through the track drives everything: the connecting line's fill
 * and which stage is current. Both come from a single `useScroll` on the
 * track element.
 *
 * The line is a pure motion value — `scaleX`/`scaleY` straight off the
 * spring-smoothed progress, so it fills every frame without React seeing
 * any of it. The active index *is* React state, but it is written only when
 * the computed index actually changes: five times across the whole track,
 * not once per frame.
 *
 * ── Why the previous approach could not work on desktop ─────────────────
 * Each stage used to decide its own active state from a `useInView` band
 * around the viewport's vertical centre. That works in a vertical stack,
 * but on desktop the five stages sit in a row at the *same* vertical
 * position — so the band activated all five simultaneously and "current
 * stage" meant nothing. Deriving the index from horizontal-agnostic scroll
 * progress fixes it for both orientations.
 *
 * ── Without animation ───────────────────────────────────────────────────
 * Under reduced motion `active` stays `-1`, which every stage reads as "no
 * stage is dimmed". The reader gets all five at full strength with their
 * descriptions and outputs, which is the honest static form of a process
 * list. Nothing is ever hidden behind a scroll position, in any tier.
 */
export function ProcessTrack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionTier();
  // Gated on reduced motion only — not on viewport width. A vertical
  // timeline that highlights where you are is *more* useful on a phone,
  // where the five stages cannot be seen at once, and it costs one scroll
  // subscription plus five state writes. What mobile must not inherit is
  // the horizontal spatial mechanics, and it does not: the rail and the
  // stack both flip to vertical in CSS.
  const enabled = !reduced;
  const { scrollYProgress: progress } = useScroll({
    target: trackRef,
    offset: ["start 0.9", "end 0.35"],
  });
  const smooth = useSpring(progress, SPRING_SCROLL);
  const [active, setActive] = useState(-1);

  // The line fills straight from the motion value. No state, no re-render.
  const fill = useTransform(smooth, [0, 1], [enabled ? 0 : 1, 1]);
  // The return path only draws once the sequence has actually completed.
  const loop = useTransform(smooth, [0.82, 1], [enabled ? 0 : 1, 1]);

  useMotionValueEvent(smooth, "change", (latest) => {
    if (!enabled) return;
    const index = Math.min(
      PROCESS_STEPS.length - 1,
      Math.max(0, Math.floor(latest * PROCESS_STEPS.length)),
    );
    setActive((current) => (current === index ? current : index));
  });

  return (
    <div ref={trackRef} className="relative">
      {/* The rail. Vertical on mobile, horizontal on desktop — the same
          element, so there is one progress line rather than two that can
          disagree. The faint full-length track sits underneath so the
          remaining distance stays visible; only the fill is animated. */}
      <span
        aria-hidden="true"
        className="absolute left-[13px] top-0 h-full w-px bg-ink/[0.10] lg:left-0 lg:top-[13px] lg:h-px lg:w-full"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: fill }}
        className="absolute left-[13px] top-0 h-full w-px origin-top bg-gradient-to-b from-brand to-brand/40 lg:hidden"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleX: fill }}
        className="absolute left-0 top-[13px] hidden h-px w-full origin-left bg-gradient-to-r from-brand to-brand/40 lg:block"
      />

      <ol className="relative flex flex-col gap-5 lg:flex-row lg:gap-3">
        {PROCESS_STEPS.map((step, i) => (
          <li key={step.number} className="flex-1">
            <HowIThinkStep step={step} isActive={active === -1 || active === i} />
          </li>
        ))}
      </ol>

      {/* The return path. Validate feeds back into Discover — the process is
          not a line with an end. Drawn only when the sequence completes, and
          purely visual: the fifth stage's own description ("Real usage
          decides what gets fixed next") carries the same meaning in text. */}
      <div aria-hidden="true" className="pointer-events-none relative mt-4 hidden h-6 lg:block">
        <motion.span
          style={{ scaleX: loop }}
          transition={WIPE}
          className="absolute inset-x-0 bottom-0 h-px origin-right bg-gradient-to-l from-brand/45 to-brand/10"
        />
        <motion.span
          style={{ scaleY: loop }}
          className="absolute bottom-0 right-0 h-6 w-px origin-bottom bg-brand/45"
        />
        <motion.span
          style={{ scaleY: loop }}
          className="absolute bottom-0 left-0 h-6 w-px origin-bottom bg-brand/20"
        />
        <motion.span
          style={{ opacity: loop }}
          className="absolute bottom-[-2px] left-0 h-1.5 w-1.5 -translate-x-[3px] rotate-45 border-b border-l border-brand/45"
        />
      </div>
    </div>
  );
}
