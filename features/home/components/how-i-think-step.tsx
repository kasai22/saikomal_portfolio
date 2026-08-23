"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlassSurface } from "@/components/ui/glass-surface";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/features/home/types";

interface HowIThinkStepProps {
  step: ProcessStep;
}

/**
 * A single "How I Think" stage. As it crosses the vertical center of the
 * viewport it becomes the emphasized/active stage — full opacity, slight
 * scale-up, accent border — while stages outside that band soften. Static
 * (always fully visible) under `prefers-reduced-motion`. The `output` line
 * names the artefact the stage produces, so the process reads as things
 * handed over rather than adjectives.
 */
export function HowIThinkStep({ step }: HowIThinkStepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isActive = useInView(ref, { margin: "-40% 0px -40% 0px" });

  return (
    <div ref={ref} className="relative flex-1 pl-10 lg:pl-0">
      <div
        className={cn(
          "absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border bg-background text-[10px] font-bold transition-colors duration-300 lg:relative lg:mb-4",
          isActive ? "border-brand bg-brand/15 text-brand-light" : "border-white/15 text-white/40",
        )}
        aria-hidden="true"
      >
        {step.number}
      </div>
      <motion.div
        animate={reducedMotion ? undefined : { opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.97 }}
        whileHover={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <GlassSurface
          level={isActive ? 2 : 1}
          className={cn(
            "flex flex-col p-4 transition-colors duration-300 lg:min-h-[150px]",
            isActive && "border-brand/40",
          )}
        >
          <h3 className="t-h4 text-white">{step.title}</h3>
          <p className="t-meta mt-1.5 flex-1 text-white/50">{step.description}</p>
          <p className="mt-3 border-t border-white/10 pt-2.5 text-[10px] uppercase tracking-[0.1em] text-brand/70">
            {step.output}
          </p>
        </GlassSurface>
      </motion.div>
    </div>
  );
}
