"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRightIcon, DownloadIcon, ChevronDownIcon } from "@/components/icons";
import { ActionButton } from "@/components/ui/action-button";
import { SplitText } from "@/components/ui/split-text";
import { SocialLinks } from "@/features/home/components/social-links";
import { HeroWorkFragmentsDesktop, HeroWorkFragmentsMobile } from "@/features/home/components/hero-work-fragments";
import { useMouseParallax } from "@/hooks/use-mouse-parallax";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
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

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Column-level entrance — identity line, headline, subcopy, proof row and
// the CTA row each reveal once on mount, in sequence (not on scroll).
// `visible`'s stagger is inherited by every matching descendant, however
// deep, that doesn't define its own initial/animate — see the headline's
// own nested stagger below.
const REVEAL_CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const REVEAL_ITEM = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

/**
 * Identity-first hero, kept deliberately short: a name/role line, a two-line
 * headline, one sentence, then evidence — three proof numbers and the
 * design-to-ship loop drawn as a track. Real fragments of shipped work stand
 * in for a generic hero illustration, over a five-tier scroll+mouse parallax
 * system (background → ambient glass → work fragments → headline → CTA).
 * Entrance animation plays once on mount; scroll/mouse parallax continues for
 * the section's own height. All motion is a no-op under
 * `prefers-reduced-motion` — the section still reads perfectly, just static.
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const { x: mouseX, y: mouseY } = useMouseParallax(sectionRef);

  // Scroll-linked depth tiers — very slow background through fast foreground.
  const bgScrollY = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const visualScrollY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const headlineScrollY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const ctaScrollY = useTransform(scrollYProgress, [0, 1], [0, -130]);

  // Pointer-linked nudges — same tiers, much smaller magnitude, desktop-only.
  const bgMouseX = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);
  const bgMouseY = useTransform(mouseY, [-0.5, 0.5], [-5, 5]);
  const headlineMouseX = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const headlineMouseY = useTransform(mouseY, [-0.5, 0.5], [-4, 4]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="bg-grid relative flex min-h-[92vh] items-center overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={reducedMotion ? undefined : { y: bgScrollY }}
      >
        <motion.div
          className="absolute inset-0"
          style={reducedMotion ? undefined : { x: bgMouseX, y: bgMouseY }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 78% 42%, rgba(232,163,61,0.16) 0%, transparent 68%), radial-gradient(ellipse 55% 70% at 12% 72%, rgba(20,20,15,0.035) 0%, transparent 62%), transparent",
            }}
          />
          {/* The one part of the decorative background that's actually
              hoverable — re-enables pointer events on just this shape so
              the custom cursor can show its "EXPLORE" state over open glass. */}
          <div
            className="pointer-events-auto absolute -right-1/4 top-0 h-[420px] w-[420px] rounded-full bg-brand/20 blur-[130px]"
            data-cursor="explore"
            aria-hidden="true"
          />
          <div
            className="absolute -left-1/4 bottom-0 h-[360px] w-[360px] rounded-full bg-brand/10 blur-[130px]"
            aria-hidden="true"
          />
        </motion.div>
        <div
          className="absolute inset-0 opacity-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
          aria-hidden="true"
        />
      </motion.div>

      <motion.div
        initial={reducedMotion ? false : "hidden"}
        animate="visible"
        variants={REVEAL_CONTAINER}
        className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16 lg:py-20"
      >
        {/* TEXT — name/role, headline, one line of copy, proof */}
        <motion.div
          className="flex flex-col gap-5 lg:col-start-1 lg:row-start-1"
          style={reducedMotion ? undefined : { y: headlineScrollY }}
        >
          <motion.div
            className="flex flex-col gap-5"
            style={reducedMotion ? undefined : { x: headlineMouseX, y: headlineMouseY }}
          >
            <motion.div variants={REVEAL_ITEM} className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="t-h4 text-ink">{HERO_EYEBROW}</p>
              <span className="h-3 w-px bg-ink/[0.10]" aria-hidden="true" />
              <p className="t-meta text-ink/60">{HERO_ROLE}</p>
              <span className="flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand/10 px-2 py-0.5 text-[10px] font-medium text-brand-ink">
                <span
                  className="h-1 w-1 animate-pulse rounded-full bg-brand-light shadow-[0_0_6px_rgba(138,90,10,0.55)]"
                  aria-hidden="true"
                />
                Open to roles
              </span>
            </motion.div>

            {/* Character-level stagger at a 40ms step: each letter rises
                from behind its own line box. The full string is still one
                accessible label, so nothing is read out letter by letter. */}
            <h1 className="t-display text-ink">
              <SplitText text={HERO_HEADLINE_LINE_1} delayMs={140} />{" "}
              <br />
              <SplitText text={HERO_HEADLINE_LINE_2} delayMs={480} className="text-ink/40" />
            </h1>

            <motion.p variants={REVEAL_ITEM} className="t-body max-w-xs text-ink/62">
              {HERO_SUBCOPY}
            </motion.p>

            {/* The design-to-ship loop as a track — the process claim, drawn
                rather than described. */}
            <motion.ul
              variants={REVEAL_ITEM}
              aria-label="How I work"
              className="flex flex-wrap items-center gap-x-2 gap-y-1.5"
            >
              {HERO_LOOP.map((stage, i) => (
                <li key={stage} className="flex items-center gap-2">
                  {i > 0 && (
                    <span className="h-px w-4 bg-gradient-to-r from-brand/50 to-brand/20" aria-hidden="true" />
                  )}
                  <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-ink/60">
                    <span className="h-1 w-1 rounded-full bg-brand" aria-hidden="true" />
                    {stage}
                  </span>
                </li>
              ))}
            </motion.ul>

            {/* Proof — three numbers instead of a paragraph of claims. */}
            <motion.dl variants={REVEAL_ITEM} className="flex flex-wrap gap-x-7 gap-y-3">
              {HERO_PROOF.map((proof) => (
                <div key={proof.label}>
                  <dt className="sr-only">{proof.label}</dt>
                  <dd className="t-metric text-brand-ink">{proof.value}</dd>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-ink/60">
                    {proof.label}
                  </p>
                </div>
              ))}
            </motion.dl>
          </motion.div>
        </motion.div>

        {/* VISUAL — real work fragments, spans both text rows on desktop */}
        <motion.div
          className="flex items-center justify-center lg:col-start-2 lg:row-start-1 lg:row-span-2"
          style={reducedMotion ? undefined : { y: visualScrollY }}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <HeroWorkFragmentsDesktop scrollYProgress={scrollYProgress} mouseX={mouseX} mouseY={mouseY} />
          <HeroWorkFragmentsMobile />
        </motion.div>

        {/* CTA — sits under the text column on desktop, after the visual on mobile */}
        <motion.div
          className="lg:col-start-1 lg:row-start-2"
          style={reducedMotion ? undefined : { y: ctaScrollY }}
        >
          <motion.div variants={REVEAL_ITEM} className="flex flex-wrap items-center gap-3">
            <ActionButton as="a" href="#projects" variant="solid">
              See the work
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </ActionButton>
            <ActionButton as="a" href="#contact" variant="outline">
              Let&apos;s talk
            </ActionButton>
            <a
              href="/SaiKomal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="SaiKomal_Resume.pdf"
              data-cursor="open"
              className="t-meta flex items-center gap-1.5 font-semibold text-ink/65 transition-colors duration-200 hover:text-brand-ink"
            >
              Resume
              <DownloadIcon className="h-3.5 w-3.5" />
            </a>
            <SocialLinks socials={SOCIALS} variant="icon" className="ml-1" />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <div className="flex h-8 w-8 animate-bounce items-center justify-center rounded-full border border-ink/12 bg-ink/[0.044]">
          <ChevronDownIcon className="h-3.5 w-3.5 text-ink/60" />
        </div>
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-ink/60">Scroll</span>
      </div>
    </section>
  );
}
