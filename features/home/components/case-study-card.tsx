"use client";

import { motion } from "motion/react";
import { ArrowRightIcon } from "@/components/icons";
import { Panel } from "@/components/ui/panel";
import { TiltCard, GlassHighlight } from "@/components/ui/tilt-card";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { SharedProjectLink } from "@/components/animations/SharedProjectLink";
import { MetricRow } from "@/features/home/components/metric-row";
import { CARD, CARD_STAGE } from "@/lib/animations/constants";
import { ENTER, ENTER_SLOW, delayed } from "@/lib/animations/transitions";
import { fadeMove, imageUnveil } from "@/lib/animations/variants";
import { cssVars } from "@/lib/css-vars";
import type { CaseStudyProject } from "@/features/home/types";

interface CaseStudyCardProps {
  project: CaseStudyProject;
  /**
   * Index of this card's image in the hero → work assembly. The hero's tile
   * for the same project flies into `[data-work-slot]` and hands over there,
   * so the slot must be a plain box with no transform of its own — the
   * unveil moved inside it for exactly that reason. See
   * `components/transitions/hero-work-assembly.tsx`.
   */
  slot?: number;
}

/**
 * Compact secondary/tertiary card — used for every case study other than the
 * featured one, so "Selected Work" reads at a mix of visual scales instead of
 * a repeated grid of identical cards. The outcome figures sit on the card
 * itself; the description is one line.
 *
 * ── Entrance ────────────────────────────────────────────────────────────
 * The card arrives first, then assembles its own contents in reading order:
 * image, title, metadata, supporting detail. Offsets come from `CARD_STAGE`.
 * The card inherits `hidden`/`visible` from the grid's `Stagger`, so cards
 * cascade between themselves *and* internally — the whole grid never flashes
 * in at once.
 *
 * The image is unveiled from its bottom edge with `clip-path` while settling
 * back from a slight overscale, rather than fading. A fade says "this loaded";
 * an unveil says "this is being shown to you", which is the right register for
 * a case study.
 *
 * ── Hover ───────────────────────────────────────────────────────────────
 * Staged, not simultaneous: image scale and drift immediately, metadata warms
 * at 90ms, title and arrow travel at 160ms. All CSS `group-hover`, so a hover
 * costs no React render, and all transform/colour, so none of it touches
 * layout.
 *
 * ── Opening ─────────────────────────────────────────────────────────────
 * `SharedProjectLink` names the image and title (`data-shared`) so the
 * browser can morph them into the case study's hero. The card expands into
 * the page instead of being replaced by it.
 */
export function CaseStudyCard({ project, slot }: CaseStudyCardProps) {
  return (
    <SharedProjectLink
      href={project.slug}
      style={cssVars({ "--accent": project.accentColor })}
      className="group block h-full"
      data-cursor="view"
    >
      <TiltCard maxDeg={CARD.tilt} className="h-full">
        <Panel
          level={2}
          className="relative flex h-full flex-col overflow-hidden transition-colors duration-fast hover:[border-color:var(--accent)]"
        >
          <div data-work-slot={slot} className="relative h-40 shrink-0 overflow-hidden">
            <motion.div
              data-shared="image"
              variants={imageUnveil}
              transition={delayed(ENTER_SLOW, CARD_STAGE.image)}
              className="absolute inset-0 overflow-hidden"
            >
              <ParallaxImage
                src={project.image}
                alt={`${project.title} — interface preview`}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="transition-transform duration-base ease-out group-hover:-translate-y-[3px] group-hover:scale-[1.04]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                aria-hidden="true"
              />
            </motion.div>
          </div>

          <div className="flex flex-1 flex-col gap-3 p-5">
            {/* Metadata warms on hover — second beat, 90ms behind the image. */}
            <motion.div
              variants={fadeMove("up")}
              transition={delayed(ENTER, CARD_STAGE.meta)}
              className="delay-[90ms] flex items-center gap-2 transition-colors duration-fast [&>span:not(:first-child)]:text-ink/60 group-hover:[&>span:not(:first-child)]:text-ink/80"
            >
              <span className="t-eyebrow [color:var(--accent)]">Case Study</span>
              <span className="h-1 w-1 rounded-full bg-ink/[0.10]" aria-hidden="true" />
              <span className="t-eyebrow">{project.year}</span>
              <span className="t-meta ml-auto">{project.readMins} min</span>
            </motion.div>

            {/* Title travels on hover — third beat, with the arrow. The
                travel lives on an inner span, not the heading: Motion writes
                the entrance to the heading's inline `transform`, which wins
                over a Tailwind `translate-x` class, so the two must own
                different elements. */}
            <motion.h3
              data-shared="title"
              variants={fadeMove("up")}
              transition={delayed(ENTER, CARD_STAGE.title)}
              className="t-h3 text-ink"
            >
              <span className="delay-[160ms] inline-block transition-transform duration-fast ease-out group-hover:translate-x-[5px]">
                {project.title}
              </span>
            </motion.h3>

            <motion.div
              variants={fadeMove("up")}
              transition={delayed(ENTER, CARD_STAGE.support)}
              className="flex flex-1 flex-col gap-3"
            >
              <p className="t-meta flex-1 text-ink/60">{project.description}</p>

              <MetricRow metrics={project.metrics} className="border-ink/12 border-t pt-3.5" />

              <ul className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 2).map((tag) => (
                  <li key={tag} className="t-chip">
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="t-action flex items-center gap-1.5 pt-0.5 [color:var(--accent)]">
                Read case study
                <ArrowRightIcon className="delay-[160ms] h-3 w-3 transition-transform duration-fast ease-out group-hover:translate-x-1" />
              </div>
            </motion.div>
          </div>
          <GlassHighlight />
        </Panel>
      </TiltCard>
    </SharedProjectLink>
  );
}
