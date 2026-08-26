"use client";

import { useRef } from "react";
import { motion, useTransform } from "motion/react";
import { ArrowRightIcon, DownloadIcon, ChevronDownIcon } from "@/components/icons";
import { ActionButton } from "@/components/ui/action-button";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { TextReveal } from "@/components/animations/TextReveal";
import { FadeIn } from "@/components/animations/FadeIn";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { HoverLink } from "@/components/animations/HoverLink";
import { ParallaxLayer } from "@/components/animations/Parallax";
import { ComplexityToClarity } from "@/components/hero/complexity-to-clarity";
import { SocialLinks } from "@/features/home/components/social-links";
import {
  HeroWorkFragmentsDesktop,
  HeroWorkFragmentsMobile,
} from "@/features/home/components/hero-work-fragments";
import {
  HERO_SCROLL,
  HERO_STAGE,
  HERO_SYSTEM,
  PARALLAX,
  POINTER,
  QUERY,
  STAGGER,
} from "@/lib/animations/constants";
import { ENTER_SLOW, HEADLINE, delayed } from "@/lib/animations/transitions";
import { fadeIn } from "@/lib/animations/variants";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMotionTier } from "@/hooks/use-motion-tier";
import { useMouseParallax } from "@/hooks/use-mouse-parallax";
import {
  useParallaxTier,
  usePointerTier,
  useScrollFade,
  useScrollScale,
  useSectionScroll,
  useSmoothProgress,
} from "@/hooks/use-scroll-tier";
import { cn } from "@/lib/utils";
import {
  HERO_EYEBROW,
  HERO_HEADLINE_LINE_1,
  HERO_HEADLINE_LINE_2,
  HERO_LOOP,
  HERO_PROOF,
  HERO_ROLE,
  HERO_SUBCOPY,
  SOCIALS,
} from "@/features/home/constants/data";

/**
 * Identity-first hero: a status pill, a name and role line, a two-line
 * headline, one sentence of positioning, the design-to-ship track, and three
 * proof numbers. Real fragments of shipped work stand in for a generic hero
 * illustration.
 *
 * ── Entrance ────────────────────────────────────────────────────────────
 * An orchestrated load sequence rather than one blanket fade. Every element
 * reads its offset from `HERO_STAGE`, so the choreography is legible in one
 * place and retiming it is a change to that object rather than to eight
 * components. The cascade runs top to bottom — status, identity, headline
 * line one, headline line two, positioning, track, proof, CTA — while the
 * work fragments start early and run long underneath it, so the two columns
 * arrive as one composition instead of two sequential animations.
 *
 * ── The headline, and what it costs ─────────────────────────────────────
 * Each line is masked: it starts fully below its own clip box at `opacity:
 * 0` and rises into place. That is the most cinematic option available and
 * it is also the only one that genuinely hides the text first — which means
 * the headline is not painted until it animates, and the headline is this
 * page's LCP element. The cost is bounded deliberately: line one starts at
 * 220ms, line two at 340ms, each running `HEADLINE` (720ms). Nothing here
 * waits on a scroll trigger, and no per-character stagger stretches it.
 *
 * ── Scroll: a runway, then the handoff ──────────────────────────────────
 * The section is taller than the hero. Its bottom padding is a scroll runway
 * (`HERO_SYSTEM.runway`) that the hero is pinned to the top of, and across
 * that distance `ComplexityToClarity` resolves a scattered system into a
 * four-tier product structure behind the copy. Nothing is scroll-jacked: the
 * page scrolls at its own rate and the reader can leave at any point.
 *
 * The hero's own motion is then remapped onto the *tail* of that runway via
 * `exit`. Every tier below reads `exit` rather than `progress`, so the hero
 * holds perfectly still while the sequence plays and then leaves exactly as
 * it always did — same distances, same curve, same handoff — instead of
 * having its parallax smeared across two and a half viewports. Below `md`
 * and under reduced motion the runway is zero and `exit` is the identity, so
 * the section behaves precisely as it did before any of this existed.
 *
 * `exitStart` sits deliberately inside the window where the first project
 * piece is already leaving for Selected Work: the copy begins to yield while
 * the assembly is under way, so the two read as one move rather than as the
 * hero finishing and something else starting. The three tiles in the visual
 * column are that assembly's sources — see `hero-work-fragments.tsx`.
 *
 * Four translation tiers plus a scale and two fades, all derived from one
 * `useScroll` subscription — the sequence included, which takes the same
 * progress value as a prop rather than opening a second subscription.
 * Translation runs off raw progress so the layers stay locked to each other;
 * scale and fade run off a spring-smoothed copy, because those are the two
 * that read as mechanical when they track the wheel exactly. The whole column
 * dims toward `handoffFade` as it leaves, so the hero hands over to Selected
 * Work rather than sliding out from under it.
 *
 * ── Tiers ───────────────────────────────────────────────────────────────
 * Pointer motion is desktop-with-a-real-pointer only and capped at
 * `POINTER.near` (14px). Scroll motion stops below `md`. Under reduced
 * motion every tier pins to its resting value and the masked reveals
 * collapse to opacity, via `MotionConfig reducedMotion="user"`. None of that
 * is branched on here — the values simply stop moving, which is why `style`
 * is passed unconditionally throughout.
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { progress, enabled } = useSectionScroll(sectionRef);
  const { reduced } = useMotionTier();
  const large = useMediaQuery(QUERY.lg);
  const roomy = useMediaQuery(QUERY.md);

  // How much scroll the pinned sequence gets, in `svh`, on top of the hero's
  // own height. Zero on mobile and under reduced motion, where the section
  // stays exactly the height it has always been.
  const runway = reduced
    ? 0
    : large
      ? HERO_SYSTEM.runway.desktop
      : roomy
        ? HERO_SYSTEM.runway.tablet
        : 0;

  // The hero's own motion is remapped onto the *tail* of the runway. While
  // the system is resolving the hero is pinned and completely still; only
  // once the sequence has finished does the section start behaving the way it
  // did before the runway existed — same tiers, same distances, same handoff,
  // just deferred. Without this every existing tier would be stretched over
  // 2.6 viewports and the parallax would read as nothing at all.
  const exit = useTransform(progress, [runway > 0 ? HERO_SYSTEM.exitStart : 0, 1], [0, 1]);
  const smooth = useSmoothProgress(exit);
  const { x: mouseX, y: mouseY } = useMouseParallax(stageRef);

  // Translation tiers — raw progress, so the layers stay locked together.
  const bgScrollY = useParallaxTier(exit, PARALLAX.subtle, enabled);
  const visualScrollY = useParallaxTier(exit, PARALLAX.base + 10, enabled);
  const headlineScrollY = useParallaxTier(exit, PARALLAX.strong, enabled);
  const ctaScrollY = useParallaxTier(exit, PARALLAX.strong + 40, enabled);

  // The scroll affordance has to clear the stage before the sequence starts,
  // not linger at 35% over it — so it fades on raw section progress rather
  // than on the deferred exit tier.
  const cueOpacity = useTransform(progress, [0, HERO_SYSTEM.cueFade], [1, 0]);

  // Scale and fade — spring-smoothed, so they lag the wheel very slightly.
  const headlineScale = useScrollScale(smooth, HERO_SCROLL.headlineScale, enabled);
  const supportOpacity = useScrollFade(smooth, HERO_SCROLL.supportFade, enabled);
  const handoffOpacity = useScrollFade(smooth, HERO_SCROLL.handoffFade, enabled);

  // Pointer tiers — same depth order, a fraction of the magnitude.
  const bgMouseX = usePointerTier(mouseX, POINTER.ambient, enabled);
  const bgMouseY = usePointerTier(mouseY, POINTER.ambient, enabled);
  const headlineMouseX = usePointerTier(mouseX, POINTER.text, enabled);
  const headlineMouseY = usePointerTier(mouseY, POINTER.text * 0.5, enabled);

  return (
    <section ref={sectionRef} id="home" className="bg-grid relative">
      {/* The pinned stage. The section above is a scroll runway; this is the
          hero itself, held at the top of it while the reader drives the
          sequence behind the copy. It is `sticky`, not fixed and not
          scroll-jacked — the page scrolls at its normal rate throughout and
          the reader can leave at any point. With no runway (mobile, reduced
          motion) it is an ordinary block and the section is exactly the
          height it has always been.

          The runway is a spacer element below this one — *not* padding on
          the section, and not a fixed height on it. A sticky box is
          constrained by its containing block, which for an in-flow child is
          the parent's *content* box: padding extends the padding box and
          gives sticky nothing to travel through. `padding-bottom` here
          silently produced a hero that never pinned at all, and 1.7
          viewports of empty page above Selected Work. An in-flow sibling is
          part of the content box, so the stage travels exactly the spacer's
          height whatever the stage's own height turns out to be on a given
          viewport. The blueprint grid sits on the section so it runs
          unbroken through the runway rather than stopping at a seam under
          the stage. */}
      <div
        ref={stageRef}
        // The frame the assembly's guide lines are drawn from. Each guide
        // starts at this stage's SYSTEM row — the tier the three project
        // pieces are being sent down from — and ends on the piece itself.
        data-assembly-origin=""
        className={cn(
          "relative flex min-h-[92svh] items-center overflow-hidden",
          runway > 0 && "sticky top-0",
        )}
      >
        {/* STAGE 0 — the ground the sequence plays on. Already painted; it
          drifts on scroll and pointer but never animates in. */}
        <ParallaxLayer y={bgScrollY} className="pointer-events-none absolute inset-0 z-0">
          <ParallaxLayer x={bgMouseX} y={bgMouseY} className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 55% at 78% 42%, rgba(232,163,61,0.16) 0%, transparent 68%), radial-gradient(ellipse 55% 70% at 12% 72%, rgba(20,20,15,0.035) 0%, transparent 62%), transparent",
              }}
            />
            {/* The one part of the decorative background that's actually
              hoverable — re-enables pointer events on just this shape so the
              custom cursor can show its "EXPLORE" state over open glass. */}
            <div
              className="pointer-events-auto absolute -right-1/4 top-0 h-[420px] w-[420px] rounded-full bg-brand/20 blur-[130px]"
              data-cursor="explore"
              aria-hidden="true"
            />
            <div
              className="absolute -left-1/4 bottom-0 h-[360px] w-[360px] rounded-full bg-brand/10 blur-[130px]"
              aria-hidden="true"
            />
          </ParallaxLayer>
        </ParallaxLayer>

        {/* STAGE 0.5 — the sequence. Sits above the ambient wash and below the
          copy, driven by the section's existing scroll progress rather than a
          subscription of its own. */}
        <ComplexityToClarity progress={progress} />

        <motion.div
          style={{ opacity: handoffOpacity }}
          className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16 lg:py-20"
        >
          {/* ── TEXT COLUMN ─────────────────────────────────────────────── */}
          <ParallaxLayer y={headlineScrollY} className="lg:col-start-1 lg:row-start-1">
            <ParallaxLayer x={headlineMouseX} y={headlineMouseY}>
              <div className="flex flex-col gap-5">
                {/* STAGES 1–2 — the status pill lands first, then the name and
                  role. The pill sits last in the row, so this is sequenced
                  with explicit per-element delays rather than a `Stagger`,
                  which would have to follow DOM order: the existing layout
                  stays exactly as it was and only the timing is authored. */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <FadeIn direction="up" distance="nudge" immediate delay={HERO_STAGE.identity}>
                    <p className="t-h4 text-ink">{HERO_EYEBROW}</p>
                  </FadeIn>
                  <FadeIn
                    direction="up"
                    distance="nudge"
                    immediate
                    delay={HERO_STAGE.identity + 0.06}
                    className="flex items-center gap-3"
                  >
                    <span className="h-3 w-px bg-ink/[0.10]" aria-hidden="true" />
                    <p className="t-meta text-ink/60">{HERO_ROLE}</p>
                  </FadeIn>
                  <FadeIn immediate delay={HERO_STAGE.status}>
                    <span className="flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand/10 px-2 py-0.5 text-[10px] font-medium text-brand-ink">
                      <span
                        className="h-1 w-1 animate-pulse rounded-full bg-brand-light shadow-[0_0_6px_rgba(138,90,10,0.55)]"
                        aria-hidden="true"
                      />
                      Open to roles
                    </span>
                  </FadeIn>
                </div>

                {/* STAGES 3–4 — the headline, one masked line at a time. Each
                  line rises from behind its own clip box; `scale` settles it
                  back as the section scrolls away. */}
                <motion.h1
                  className="t-display origin-left text-ink"
                  style={{ scale: headlineScale }}
                >
                  <TextReveal
                    text={HERO_HEADLINE_LINE_1}
                    by="line"
                    mode="mask"
                    immediate
                    delay={HERO_STAGE.headlineLine1}
                    transition={HEADLINE}
                  />{" "}
                  <br />
                  <TextReveal
                    text={HERO_HEADLINE_LINE_2}
                    by="line"
                    mode="mask"
                    immediate
                    delay={HERO_STAGE.headlineLine2}
                    transition={HEADLINE}
                    className="text-ink/40"
                  />
                </motion.h1>

                {/* STAGES 5–7 — positioning, the design-to-ship track, proof.
                  All three soften together as the hero scrolls out. */}
                <motion.div style={{ opacity: supportOpacity }} className="flex flex-col gap-5">
                  {/* Slides rather than fades. It is the second-largest block
                    of text in the first viewport, so an `opacity: 0` start
                    would make it the LCP element and push LCP out by the
                    length of its own entrance — measured at +1.1s here. An
                    opaque lift is visually the same gesture at no cost. */}
                  <p className="t-body text-ink/62 max-w-xs">
                    <TextReveal
                      text={HERO_SUBCOPY}
                      by="line"
                      mode="lift"
                      immediate
                      delay={HERO_STAGE.support}
                    />
                  </p>

                  <Stagger
                    as="ul"
                    immediate
                    step={STAGGER.tight}
                    delay={HERO_STAGE.labels}
                    aria-label="How I work"
                    className="flex flex-wrap items-center gap-x-2 gap-y-1.5"
                  >
                    {HERO_LOOP.map((stage, i) => (
                      <StaggerItem
                        as="li"
                        key={stage}
                        distance="nudge"
                        className="flex items-center gap-2"
                      >
                        {i > 0 && (
                          <span
                            className="h-px w-4 bg-gradient-to-r from-brand/50 to-brand/20"
                            aria-hidden="true"
                          />
                        )}
                        <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-ink/60">
                          <span className="h-1 w-1 rounded-full bg-brand" aria-hidden="true" />
                          {stage}
                        </span>
                      </StaggerItem>
                    ))}
                  </Stagger>

                  <Stagger
                    as="dl"
                    immediate
                    step={STAGGER.tight}
                    delay={HERO_STAGE.proof}
                    className="flex flex-wrap gap-x-7 gap-y-3"
                  >
                    {HERO_PROOF.map((proof, i) => (
                      <StaggerItem key={proof.label} distance="nudge">
                        <dt className="sr-only">{proof.label}</dt>
                        <dd className="t-metric text-brand-ink">
                          <AnimatedCounter value={proof.value} delay={i * STAGGER.tight} />
                        </dd>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-ink/60">
                          {proof.label}
                        </p>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </motion.div>
              </div>
            </ParallaxLayer>
          </ParallaxLayer>

          {/* ── VISUAL COLUMN ───────────────────────────────────────────────
            Starts at STAGE `visual` (300ms) and runs long, so the fragments
            are still settling while the text column finishes assembling. */}
          <motion.div
            className="flex items-center justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1"
            style={{ y: visualScrollY }}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={delayed(ENTER_SLOW, HERO_STAGE.visual)}
          >
            <HeroWorkFragmentsDesktop
              progress={exit}
              mouseX={mouseX}
              mouseY={mouseY}
              enabled={enabled}
            />
            <HeroWorkFragmentsMobile />
          </motion.div>

          {/* ── STAGE 8 — CTA ─────────────────────────────────────────────── */}
          <ParallaxLayer y={ctaScrollY} className="lg:col-start-1 lg:row-start-2">
            <Stagger
              immediate
              step={STAGGER.tight}
              delay={HERO_STAGE.cta}
              className="flex flex-wrap items-center gap-3"
            >
              <StaggerItem distance="nudge">
                <ActionButton as="a" href="#projects" variant="solid">
                  See the work
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </ActionButton>
              </StaggerItem>
              <StaggerItem distance="nudge">
                <ActionButton as="a" href="#contact" variant="outline">
                  Let&apos;s talk
                </ActionButton>
              </StaggerItem>
              <StaggerItem distance="nudge">
                <HoverLink
                  href="/SaiKomal_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="SaiKomal_Resume.pdf"
                  data-cursor="open"
                  className="t-meta font-semibold text-ink/65 transition-colors duration-instant hover:text-brand-ink"
                >
                  Resume
                  <DownloadIcon className="h-3.5 w-3.5" />
                </HoverLink>
              </StaggerItem>
              <StaggerItem distance="nudge">
                <SocialLinks socials={SOCIALS} variant="icon" className="ml-1" />
              </StaggerItem>
            </Stagger>
          </ParallaxLayer>
        </motion.div>

        {/* Scroll affordance. Fades out as soon as the user takes the hint.

          No bounce. A perpetually bouncing chevron is the single most
          template-looking element on a portfolio, and it animates forever to
          say one thing the arrow already says. The affordance is the arrow
          and the word; the motion here is the fade that removes it once the
          reader has clearly started scrolling. */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <div className="border-ink/12 flex h-8 w-8 items-center justify-center rounded-full border bg-ink/[0.044]">
            <ChevronDownIcon className="h-3.5 w-3.5 text-ink/60" />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-ink/60">
            Scroll
          </span>
        </motion.div>
      </div>

      {/* The runway. Pure scroll distance for the pinned stage above to
          travel through — no content, and none of the page's height at all
          when there is no sequence to drive. */}
      {runway > 0 && <div style={{ height: `${runway}svh` }} aria-hidden="true" />}
    </section>
  );
}
