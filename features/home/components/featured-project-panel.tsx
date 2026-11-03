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

interface FeaturedProjectPanelProps {
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
 * The large, dominant panel for the top case study (it must have a product
 * screen — `SelectedWorkSection` only features one that does) — visually distinct from
 * the compact cards below it, so "Selected Work" reads as an editorial
 * composition rather than a repeated grid. The real product screenshot stays
 * the focal point, and the outcome figures carry the weight the description
 * paragraph used to.
 *
 * Same entrance grammar and hover choreography as `CaseStudyCard`, at a
 * larger scale — see that file for the reasoning. The tilt is the same 1.5°:
 * a bigger surface swinging further would be more noticeable, not more
 * tactile.
 */
export function FeaturedProjectPanel({ project, slot }: FeaturedProjectPanelProps) {
  return (
    <SharedProjectLink
      href={project.slug}
      style={cssVars({ "--accent": project.accentColor })}
      className="group block"
      data-cursor="view"
    >
      <TiltCard maxDeg={CARD.tilt}>
        <Panel
          level={3}
          className="relative overflow-hidden transition-colors duration-fast hover:[border-color:var(--accent)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div
              data-work-slot={slot}
              className="relative order-2 h-64 overflow-hidden lg:order-1 lg:h-full lg:min-h-[380px]"
            >
              <motion.div
                data-shared="image"
                variants={imageUnveil}
                transition={delayed(ENTER_SLOW, CARD_STAGE.image)}
                className="absolute inset-0 overflow-hidden"
              >
                <ParallaxImage
                  src={project.image ?? ""}
                  alt={project.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="transition-transform duration-base ease-out group-hover:-translate-y-[3px] group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r"
                  aria-hidden="true"
                />
              </motion.div>
            </div>

            <div className="order-1 flex flex-col justify-center gap-4 p-6 lg:order-2 lg:p-9">
              {/* Metadata warms on hover — second beat, 90ms behind the image. */}
              <motion.div
                variants={fadeMove("up")}
                transition={delayed(ENTER, CARD_STAGE.meta)}
                className="delay-[90ms] flex items-center gap-2.5 transition-colors duration-fast [&>span:not(:first-child)]:text-ink/60 group-hover:[&>span:not(:first-child)]:text-ink/80"
              >
                <span className="t-eyebrow rounded-full border border-[color:var(--accent)] px-2.5 py-1 [color:var(--accent)]">
                  Featured
                </span>
                <span className="t-eyebrow">{project.timeline}</span>
                <span className="t-meta ml-auto">{project.readMins} min read</span>
              </motion.div>

              {/* Title travels on hover — third beat, with the arrow. The
                  travel is on an inner span because Motion owns the heading's
                  inline `transform` for the entrance. */}
              <motion.h3
                data-shared="title"
                variants={fadeMove("up")}
                transition={delayed(ENTER, CARD_STAGE.title)}
                className="text-lg font-semibold leading-snug tracking-[-0.01em] text-ink lg:text-xl"
              >
                <span className="delay-[160ms] inline-block transition-transform duration-fast ease-out group-hover:translate-x-[6px]">
                  {project.title}
                </span>
              </motion.h3>

              <motion.div
                variants={fadeMove("up")}
                transition={delayed(ENTER, CARD_STAGE.support)}
                className="flex flex-col gap-4"
              >
                <p className="t-body text-ink/62">{project.description}</p>

                {project.metrics.length > 0 && (
                  <MetricRow metrics={project.metrics} className="border-ink/12 border-y py-4" />
                )}

                <dl className="border-ink/12 grid grid-cols-2 gap-x-4 gap-y-2.5 border-t pt-4 sm:grid-cols-3">
                  <div>
                    <dt className="t-eyebrow text-ink/60">Role</dt>
                    <dd className="t-meta mt-1 text-ink/75">{project.role}</dd>
                  </div>
                  <div>
                    <dt className="t-eyebrow text-ink/60">Timeline</dt>
                    <dd className="t-meta mt-1 text-ink/75">{project.timeline}</dd>
                  </div>
                  {project.context && (
                    <div>
                      <dt className="t-eyebrow text-ink/60">At</dt>
                      <dd className="t-meta mt-1 text-ink/75">{project.context}</dd>
                    </div>
                  )}
                </dl>

                <ul className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <li key={tag} className="t-chip">
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="t-action flex items-center gap-1.5 [color:var(--accent)]">
                  Read case study
                  <ArrowRightIcon className="delay-[160ms] h-3.5 w-3.5 transition-transform duration-fast ease-out group-hover:translate-x-1.5" />
                </div>
              </motion.div>
            </div>
          </div>
          <GlassHighlight />
        </Panel>
      </TiltCard>
    </SharedProjectLink>
  );
}
