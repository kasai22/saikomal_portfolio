"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealSection } from "@/components/ui/reveal-section";
import { RevealItem } from "@/components/ui/reveal-item";
import { GlassSurface } from "@/components/ui/glass-surface";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const COLUMNS = [
  {
    label: "Engineering",
    detail: "B.Tech, Mechanical Engineering — VIT Vellore",
    points: ["Systems thinking", "Technical constraints", "Structured problem solving", "Feasibility"],
  },
  {
    label: "UX",
    detail: "4+ years across logistics, DevOps & fashion-tech products",
    points: ["Research", "Information architecture", "Interaction design", "Usability testing"],
  },
];

/**
 * As the row scrolls through the viewport, the Engineering and UX columns
 * drift a few px toward the center and the Product panel gains emphasis —
 * a small spatial cue that the two combine into the third, not just three
 * static cards side by side. Inert under `prefers-reduced-motion`.
 */
export function EngineeringUxSection() {
  const rowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ["start 0.85", "start 0.35"] });

  const engineeringX = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const uxX = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const productScale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const productOpacity = useTransform(scrollYProgress, [0, 1], [0.7, 1]);

  const columnX = [engineeringX, uxX];

  return (
    <RevealSection className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <RevealItem className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            The differentiator
          </span>
          <h2 className="mt-2 text-xl font-bold leading-tight sm:text-2xl">
            Engineering thinking + UX thinking
            <br className="hidden sm:block" /> = <span className="text-brand">Product thinking</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-white/50">
            I started in mechanical engineering, not design school. That&apos;s the lens I still
            bring — a product isn&apos;t finished until the system underneath it holds together.
          </p>
        </RevealItem>

        <div ref={rowRef} className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
          {COLUMNS.map((column, i) => (
            <div key={column.label} className="flex flex-1 flex-col items-stretch gap-4 lg:flex-row lg:items-center">
              <RevealItem delayMs={i * 120} className="flex-1">
                <motion.div style={reducedMotion ? undefined : { x: columnX[i] }} className="h-full">
                  <GlassSurface level={2} className="h-full p-7">
                    <h3 className="mb-1 text-lg font-bold text-white">{column.label}</h3>
                    <p className="mb-5 text-xs text-white/40">{column.detail}</p>
                    <ul className="space-y-2.5">
                      {column.points.map((point) => (
                        <li key={point} className="flex items-center gap-2.5 text-sm text-white/70">
                          <span className="h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </GlassSurface>
                </motion.div>
              </RevealItem>
              <span className="text-2xl font-light text-white/30 lg:shrink-0" aria-hidden="true">
                +
              </span>
            </div>
          ))}

          <RevealItem delayMs={260} className="flex-1">
            <motion.div
              style={reducedMotion ? undefined : { scale: productScale, opacity: productOpacity }}
              className="h-full"
            >
              <GlassSurface level={3} className="h-full border-brand/30 p-7">
                <h3 className="mb-1 text-lg font-bold text-brand-light">Product</h3>
                <p className="mb-5 text-xs text-white/40">What actually ships</p>
                <ul className="space-y-2.5">
                  {["Business goals", "User needs", "Technical feasibility", "Usability"].map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-sm text-white/80">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-brand-light" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </GlassSurface>
            </motion.div>
          </RevealItem>
        </div>
      </div>
    </RevealSection>
  );
}
