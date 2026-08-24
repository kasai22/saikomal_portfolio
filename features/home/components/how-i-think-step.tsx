"use client";

import { motion } from "motion/react";
import { Panel } from "@/components/ui/panel";
import { HOVER } from "@/lib/animations/transitions";
import { cn } from "@/lib/utils";
import { RECRUITER_SNAPSHOT } from "@/features/home/constants/data";
import type { ProcessStep } from "@/features/home/types";

interface HowIThinkStepProps {
  step: ProcessStep;
  /**
   * Whether this is the stage the reader is currently on. Owned by
   * `ProcessTrack`, which derives it from one scroll subscription — a stage
   * cannot work this out for itself, because on desktop all five sit at the
   * same vertical position.
   */
  isActive: boolean;
}

/** The stage where design becomes a running thing rather than a file. */
const BUILD_STAGE = "Build";

/**
 * One stage of the process.
 *
 * The active stage gains weight — full-strength type, an accent border and
 * number, and its output chip lit — while the others soften to a still
 * perfectly readable state. Inactive is *reduced emphasis, never hidden*:
 * every description and every output stays legible at all times, because
 * the process has to be understandable with the animation off.
 *
 * Scale is deliberately tiny (0.98 → 1). The brief for this section rules
 * out rotations, bounces and large scale, and a process diagram is exactly
 * the wrong place to be playful — it is the part of the page making a claim
 * about rigour.
 *
 * ── Build carries the stack ─────────────────────────────────────────────
 * The Build stage is the one that separates this from a design-only
 * process, so it shows what it is built with, taken verbatim from
 * `RECRUITER_SNAPSHOT.frontEnd`. It renders always, not on activation — it
 * is information, not a reward for scrolling.
 */
export function HowIThinkStep({ step, isActive }: HowIThinkStepProps) {
  const isBuild = step.title === BUILD_STAGE;

  return (
    <div className="relative pl-10 lg:pl-0">
      <div
        className={cn(
          "absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border bg-paper text-[10px] font-bold transition-colors duration-fast lg:relative lg:mb-4",
          isActive ? "border-brand bg-brand/15 text-brand-ink" : "border-ink/16 text-ink/60",
        )}
        aria-hidden="true"
      >
        {step.number}
      </div>
      <motion.div
        animate={{ opacity: isActive ? 1 : 0.62, scale: isActive ? 1 : 0.98 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={HOVER}
      >
        <Panel
          level={isActive ? 2 : 1}
          className={cn(
            "flex h-full flex-col p-4 transition-colors duration-fast lg:min-h-[168px]",
            isActive && "border-brand/40",
          )}
        >
          <h3 className={cn("t-h4 transition-colors duration-fast", isActive ? "text-ink" : "text-ink/80")}>
            {step.title}
          </h3>
          <p className="t-meta mt-1.5 flex-1 text-ink/60">{step.description}</p>

          {isBuild && (
            <p
              className={cn(
                "mt-2.5 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-fast",
                isActive ? "text-brand-ink" : "text-ink/50",
              )}
            >
              {RECRUITER_SNAPSHOT.frontEnd}
            </p>
          )}

          <p
            className={cn(
              "mt-3 border-t pt-2.5 text-[10px] uppercase tracking-[0.1em] transition-colors duration-fast",
              isActive ? "border-brand/25 text-brand/85" : "border-ink/12 text-ink/45",
            )}
          >
            {step.output}
          </p>
        </Panel>
      </motion.div>
    </div>
  );
}
