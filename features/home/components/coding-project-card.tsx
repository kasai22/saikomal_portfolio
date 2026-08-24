"use client";

import { motion } from "motion/react";
import { ExternalLinkIcon } from "@/components/icons";
import { Panel } from "@/components/ui/panel";
import { TiltCard, GlassHighlight } from "@/components/ui/tilt-card";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { CARD, CARD_STAGE, STAGGER } from "@/lib/animations/constants";
import { ENTER, WIPE, delayed } from "@/lib/animations/transitions";
import { fadeMove, imageRender, staggerContainer } from "@/lib/animations/variants";
import { cssVars } from "@/lib/css-vars";
import type { CodingProject } from "@/features/home/types";

interface CodingProjectCardProps {
  project: CodingProject;
}

/**
 * A shipped front-end build — ONDL, ONDL Enterprise, HotelFirst.
 *
 * ── A different interaction language, on purpose ─────────────────────────
 * These cards must not read like the case studies above them. A case study
 * is a story being *unveiled*; a build is something *assembled*. So where
 * `CaseStudyCard` lifts a curtain from the bottom edge and settles back from
 * an overscale, this card renders in a single hard left-to-right pass with
 * no scale — the way a build fills in rather than the way a photograph is
 * revealed.
 *
 * The stack chips then assemble one at a time, and the "Live" badge lands
 * last. That order is the argument the section makes: the design decisions,
 * the code that implements them, and the thing actually in production —
 * design → code → shipped — stated as a sequence rather than a caption.
 * Every element in it is existing content; nothing was invented to carry it.
 *
 * On hover the same chain re-runs as a colour sweep across the chips, ending
 * on the Live badge — a restatement of the same idea, not a new effect.
 *
 * The cursor reads OPEN rather than VIEW: these links leave the site for the
 * running product, which is a different promise from opening a case study.
 */
export function CodingProjectCard({ project }: CodingProjectCardProps) {
  return (
    <TiltCard maxDeg={CARD.tilt} className="h-full">
      <Panel
        as="a"
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="open"
        level={2}
        style={cssVars({ "--accent": project.accent })}
        className="group relative flex h-full flex-col overflow-hidden transition-colors duration-fast hover:[border-color:var(--accent)]"
      >
        <motion.div
          variants={imageRender}
          transition={delayed(WIPE, CARD_STAGE.image)}
          className="relative h-40 shrink-0 overflow-hidden bg-paper-sunk"
        >
          {project.image ? (
            <>
              <ParallaxImage
                src={project.image}
                alt={`${project.title} — live website`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-top transition-transform duration-base ease-out group-hover:-translate-y-[3px] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
            </>
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background: `radial-gradient(ellipse at center, ${project.accent}1f, transparent 70%), #EFEADC`,
              }}
              aria-hidden="true"
            >
              <span className="text-3xl font-medium opacity-30 [color:var(--accent)]">
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Shipped — the last link in the chain, so it lands last. */}
          <motion.div
            variants={fadeMove("down", 6)}
            transition={delayed(ENTER, CARD_STAGE.support + 0.14)}
            className="absolute left-3 top-3 flex items-center gap-1.5 rounded-sm border border-paper/25 bg-ink/85 px-2.5 py-1 transition-colors delay-[260ms] duration-fast group-hover:border-emerald-400/60"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-paper">Live</span>
          </motion.div>
        </motion.div>

        <div className="flex flex-1 flex-col gap-2.5 p-5">
          <motion.div
            variants={fadeMove("up")}
            transition={delayed(ENTER, CARD_STAGE.title)}
            className="flex items-baseline gap-2"
          >
            <h3 className="t-h3 text-ink">
              <span className="inline-block transition-transform delay-[160ms] duration-fast ease-out group-hover:translate-x-[5px]">
                {project.title}
              </span>
            </h3>
            <span className="t-eyebrow ml-auto text-ink/60 transition-colors delay-[90ms] duration-fast group-hover:text-ink/80">
              {project.year}
            </span>
          </motion.div>

          <motion.div
            variants={fadeMove("up")}
            transition={delayed(ENTER, CARD_STAGE.meta)}
            className="flex flex-1 flex-col gap-2.5"
          >
            <p className="t-meta [color:var(--accent)]">{project.tagline}</p>
            <p className="t-meta flex-1 text-ink/60">{project.description}</p>
          </motion.div>

          {/* The stack, assembled one piece at a time. */}
          <motion.ul
            variants={staggerContainer(STAGGER.tight, CARD_STAGE.support)}
            className="flex flex-wrap gap-1.5 pt-0.5"
          >
            {project.tech.map((tech, i) => (
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
            className="t-action flex items-center gap-1.5 pt-0.5 [color:var(--accent)]"
          >
            Visit site
            <ExternalLinkIcon className="h-3 w-3 transition-transform delay-[160ms] duration-fast ease-out group-hover:translate-x-1" />
          </motion.div>
        </div>
        <GlassHighlight />
      </Panel>
    </TiltCard>
  );
}
