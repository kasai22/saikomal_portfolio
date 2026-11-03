"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRightIcon, ExternalLinkIcon, GithubIcon } from "@/components/icons";
import { Panel } from "@/components/ui/panel";
import { TiltCard, GlassHighlight } from "@/components/ui/tilt-card";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { CARD, CARD_STAGE, STAGGER } from "@/lib/animations/constants";
import { ENTER, WIPE, delayed } from "@/lib/animations/transitions";
import { fadeMove, imageRender, staggerContainer } from "@/lib/animations/variants";
import { cssVars } from "@/lib/css-vars";
import type { EngineeringProject } from "@/constants/projects";

interface EngineeringProjectCardProps {
  project: EngineeringProject;
}

/** Secondary exits sit above the card's stretched link, so they stay clickable. */
const EXIT_CLASS =
  "relative z-10 inline-flex items-center gap-1.5 text-ink/62 transition-colors duration-instant hover:text-ink";

/**
 * One independent engineering project — GITAM Marketplace, Reality 3D,
 * HotelFirst, this portfolio.
 *
 * ── A different interaction language, on purpose ─────────────────────────
 * These cards must not read like the case studies above them. A case study
 * is a story being *unveiled*; a build is something *assembled*. So where
 * `CaseStudyCard` lifts a curtain from the bottom edge and settles back from
 * an overscale, this card renders in a single hard left-to-right pass with
 * no scale — the way a build fills in rather than the way a photograph is
 * revealed. The stack chips then assemble one at a time, and the "Live"
 * badge lands last: design → code → shipped, stated as a sequence.
 *
 * ── Three exits, no nested links ────────────────────────────────────────
 * The whole card opens the evidence page on this site (one link stretched
 * over the panel). The live product and the public repository are separate,
 * smaller links layered above it — an anchor inside an anchor is invalid
 * HTML and unreachable by keyboard, so they are siblings, not children.
 *
 * Independent projects carry no dates: the résumé gives none.
 */
export function EngineeringProjectCard({ project }: EngineeringProjectCardProps) {
  return (
    <TiltCard maxDeg={CARD.tilt} className="h-full">
      <Panel
        as="article"
        level={2}
        data-cursor="view"
        style={cssVars({ "--accent": project.accent })}
        className="group relative flex h-full flex-col overflow-hidden transition-colors duration-fast hover:[border-color:var(--accent)]"
      >
        <motion.div
          variants={imageRender}
          transition={delayed(WIPE, CARD_STAGE.image)}
          className="relative h-44 shrink-0 overflow-hidden bg-paper-sunk sm:h-52"
        >
          <ParallaxImage
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
            className="object-top transition-transform duration-base ease-out group-hover:-translate-y-[3px] group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" aria-hidden="true" />

          {/* Shipped — the last link in the chain, so it lands last. */}
          <motion.div
            variants={fadeMove("down", 6)}
            transition={delayed(ENTER, CARD_STAGE.support + 0.14)}
            className="absolute left-3 top-3 flex items-center gap-1.5 rounded-sm border border-paper/25 bg-ink/85 px-2.5 py-1 transition-colors delay-[260ms] duration-fast group-hover:border-emerald-400/60"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-paper">
              Live
            </span>
          </motion.div>
        </motion.div>

        <div className="flex flex-1 flex-col gap-2.5 p-5">
          <motion.p
            variants={fadeMove("up")}
            transition={delayed(ENTER, CARD_STAGE.meta)}
            className="t-eyebrow [color:var(--accent)]"
          >
            {project.category.replace(" | ", " · ")}
          </motion.p>

          <motion.h3
            variants={fadeMove("up")}
            transition={delayed(ENTER, CARD_STAGE.title)}
            className="t-h3 text-ink"
          >
            <span
              id={`${project.id}-title`}
              className="inline-block transition-transform delay-[160ms] duration-fast ease-out group-hover:translate-x-[5px]"
            >
              {project.name}
            </span>
          </motion.h3>

          <motion.p
            variants={fadeMove("up")}
            transition={delayed(ENTER, CARD_STAGE.meta)}
            className="t-meta flex-1 text-ink/62"
          >
            {project.description}
          </motion.p>

          {/* The stack, assembled one piece at a time. */}
          <motion.ul
            aria-label="Technology stack"
            variants={staggerContainer(STAGGER.tight, CARD_STAGE.support)}
            className="flex flex-wrap gap-1.5 pt-0.5"
          >
            {project.stack.slice(0, 5).map((tech, i) => (
              <motion.li
                key={tech}
                variants={fadeMove("up", 6)}
                transition={ENTER}
                style={{
                  borderColor: project.accent + "44",
                  color: project.accent,
                  backgroundColor: project.accent + "0f",
                  // Hover re-runs the same left-to-right chain across the stack.
                  transitionDelay: `${i * 60}ms`,
                }}
                className="rounded-full border px-2 py-0.5 text-[10px] font-medium leading-normal transition-colors duration-fast group-hover:[background-color:var(--accent)] group-hover:[border-color:var(--accent)] group-hover:text-paper"
              >
                {tech}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            variants={fadeMove("up")}
            transition={delayed(ENTER, CARD_STAGE.support + 0.2)}
            className="t-action mt-1 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[color:var(--rule)] pt-3.5"
          >
            <span className="flex items-center gap-1.5 [color:var(--accent)]" aria-hidden="true">
              How it was built
              <ArrowRightIcon className="h-3 w-3 transition-transform delay-[160ms] duration-fast ease-out group-hover:translate-x-1" />
            </span>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className={EXIT_CLASS}>
              {project.urlDisplay}
              <ExternalLinkIcon className="h-3 w-3" />
              <span className="sr-only">(live site, opens in a new tab)</span>
            </a>
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className={EXIT_CLASS}>
                <GithubIcon className="h-3 w-3" />
                Code
                <span className="sr-only">for {project.name} on GitHub (opens in a new tab)</span>
              </a>
            )}
          </motion.div>
        </div>
        {/* The card's main exit, stretched over the whole panel. A direct
            child of the panel rather than of the animated title: Motion
            leaves a transform on the title, which would make *it* the
            containing block and shrink the hit area to one line. */}
        <Link
          href={project.href}
          aria-labelledby={`${project.id}-title`}
          aria-describedby={`${project.id}-evidence`}
          className="absolute inset-0 z-0 focus-visible:outline-offset-[-2px]"
        />
        <span id={`${project.id}-evidence`} className="sr-only">
          How it was built
        </span>
        <GlassHighlight />
      </Panel>
    </TiltCard>
  );
}
