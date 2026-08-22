"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRightIcon, DownloadIcon, ChevronDownIcon } from "@/components/icons";
import { GlassButton } from "@/components/ui/glass-button";
import { SocialLinks } from "@/features/home/components/social-links";
import { HeroWorkFragmentsDesktop, HeroWorkFragmentsMobile } from "@/features/home/components/hero-work-fragments";
import { useMouseParallax } from "@/hooks/use-mouse-parallax";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  HERO_EYEBROW,
  HERO_HEADLINE_LINE_1,
  HERO_HEADLINE_LINE_2,
  HERO_SUBCOPY,
  HERO_TAGS,
  SOCIALS,
} from "@/features/home/constants/data";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Column-level entrance — identity line, headline, skill line, subcopy and
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
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

// The headline reveals one word at a time, then the accent line as a single
// unit — a nested stagger context inside the column's own sequence above.
const HEADLINE_CONTAINER = { hidden: {}, visible: { transition: { staggerChildren: 0.055 } } };
const HEADLINE_WORD = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: EASE } },
};
const HEADLINE_LINE_2 = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
};

const HEADLINE_WORDS_LINE_1 = HERO_HEADLINE_LINE_1.split(" ");

/**
 * Identity-first hero: a real name/role line and a word-by-word headline
 * reveal, real fragments of shipped work standing in for a generic hero
 * illustration, and a five-tier scroll+mouse parallax system (background →
 * ambient glass → work fragments → headline → CTA). Entrance animation
 * plays once on mount; scroll/mouse parallax continues for the section's
 * own height. All motion is a no-op under `prefers-reduced-motion` — the
 * section still reads perfectly, just static.
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
      className="bg-noise relative flex min-h-screen items-center overflow-hidden"
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
                "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(0,128,128,0.15) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 20% 60%, rgba(100,0,200,0.12) 0%, transparent 60%), transparent",
            }}
          />
          {/* The one part of the decorative background that's actually
              hoverable — re-enables pointer events on just this shape so
              the custom cursor can show its "EXPLORE" state over open glass. */}
          <div
            className="pointer-events-auto absolute -right-1/4 top-0 h-[420px] w-[420px] rounded-full bg-brand/25 blur-[110px] animate-pulse-glow"
            data-cursor="explore"
            aria-hidden="true"
          />
          <div
            className="absolute -left-1/4 bottom-0 h-[360px] w-[360px] rounded-full bg-purple-600/15 blur-[110px] animate-pulse-glow [animation-delay:1.8s]"
            aria-hidden="true"
          />
        </motion.div>
        <div
          className="absolute inset-0 opacity-[0.025]"
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
        className="relative z-10 mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 px-6 py-20 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-28"
      >
        {/* TEXT — name/role, headline, skill line, subcopy */}
        <motion.div
          className="flex flex-col gap-4 lg:col-start-1 lg:row-start-1"
          style={reducedMotion ? undefined : { y: headlineScrollY }}
        >
          <motion.div
            className="flex flex-col gap-4"
            style={reducedMotion ? undefined : { x: headlineMouseX, y: headlineMouseY }}
          >
            <motion.div variants={REVEAL_ITEM} className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-sm font-semibold text-white sm:text-base">{HERO_EYEBROW}</p>
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-white/45">
                <span
                  className="h-1 w-1 animate-pulse rounded-full bg-brand-light shadow-[0_0_6px_rgba(0,179,179,0.7)]"
                  aria-hidden="true"
                />
                Open to new roles
              </span>
            </motion.div>

            <motion.h1
              variants={HEADLINE_CONTAINER}
              className="text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {HEADLINE_WORDS_LINE_1.map((word, i) => (
                <motion.span key={`${word}-${i}`} variants={HEADLINE_WORD} className="mr-[0.22em] inline-block">
                  {word}
                </motion.span>
              ))}
              <br />
              <motion.span variants={HEADLINE_LINE_2} className="relative inline-block">
                <span
                  className="absolute inset-0 bg-gradient-to-r from-brand-light to-teal-200 bg-clip-text text-transparent opacity-50 blur-lg"
                  aria-hidden="true"
                >
                  {HERO_HEADLINE_LINE_2}
                </span>
                <span className="relative bg-gradient-to-r from-brand-light to-teal-200 bg-clip-text text-transparent">
                  {HERO_HEADLINE_LINE_2}
                </span>
              </motion.span>
            </motion.h1>

            <motion.p
              variants={REVEAL_ITEM}
              className="flex flex-wrap items-center gap-x-2 text-xs font-medium text-white/40"
            >
              {HERO_TAGS.map((tag, i) => (
                <span key={tag} className="flex items-center gap-2">
                  {i > 0 && (
                    <span className="text-white/20" aria-hidden="true">
                      ·
                    </span>
                  )}
                  {tag}
                </span>
              ))}
            </motion.p>

            <motion.p variants={REVEAL_ITEM} className="max-w-sm text-xs leading-relaxed text-white/50">
              {HERO_SUBCOPY}
            </motion.p>
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
          <motion.div variants={REVEAL_ITEM} className="flex flex-wrap items-center gap-4">
            <GlassButton as="a" href="#projects" variant="solid">
              View My Work
              <ArrowRightIcon className="h-4 w-4" />
            </GlassButton>
            <GlassButton as="a" href="#contact" variant="glass">
              Let&apos;s Talk
            </GlassButton>
            <a
              href="/SaiKomal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="SaiKomal_Resume.pdf"
              data-cursor="open"
              className="flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors duration-200 hover:text-brand-light"
            >
              Resume
              <DownloadIcon className="h-4 w-4" />
            </a>
            <SocialLinks socials={SOCIALS} variant="icon" className="ml-1" />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5">
        <div className="flex h-9 w-9 animate-bounce items-center justify-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md">
          <ChevronDownIcon className="h-4 w-4 text-white/50" />
        </div>
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/30">
          Explore the work
        </span>
      </div>
    </section>
  );
}
