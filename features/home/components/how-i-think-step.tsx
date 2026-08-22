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
 * (always fully visible) under `prefers-reduced-motion`.
 */
export function HowIThinkStep({ step }: HowIThinkStepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isActive = useInView(ref, { margin: "-40% 0px -40% 0px" });

  return (
    <div ref={ref} className="relative flex-1 pl-12 lg:pl-0">
      <div
        className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-brand/40 bg-background text-xs font-bold text-brand lg:relative lg:mb-5"
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
          className={cn("p-5 transition-colors duration-300 lg:min-h-[168px]", isActive && "border-brand/40")}
        >
          <h3 className="mb-2 text-base font-bold text-white">{step.title}</h3>
          <p className="text-sm leading-relaxed text-white/55">{step.description}</p>
        </GlassSurface>
      </motion.div>
    </div>
  );
}
