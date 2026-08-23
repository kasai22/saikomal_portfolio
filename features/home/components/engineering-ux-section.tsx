"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealSection } from "@/components/ui/reveal-section";
import { RevealItem } from "@/components/ui/reveal-item";
import { GlassSurface } from "@/components/ui/glass-surface";
import { SectionHeading } from "@/features/home/components/section-heading";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const COLUMNS = [
  {
    label: "Engineering",
    detail: "B.Tech Mechanical — VIT Vellore",
    points: ["Systems thinking", "Technical constraints", "Structured problem solving", "Feasibility"],
  },
  {
    label: "UX",
    detail: "3+ years — logistics, DevOps, fashion-tech",
    points: ["Research", "Information architecture", "Interaction design", "Usability testing"],
  },
];

const PRODUCT_POINTS = ["Business goals", "User needs", "Technical feasibility", "Usability"];

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
    <RevealSection className="px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The differentiator"
          align="center"
          title={
            <>
              Engineering + UX = <span className="text-brand">product thinking</span>
            </>
          }
          intro="I started in mechanical engineering, not design school. It shows in the work."
        />

        <div ref={rowRef} className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
          {COLUMNS.map((column, i) => (
            <div
              key={column.label}
              className="flex flex-1 flex-col items-stretch gap-3 lg:flex-row lg:items-center"
            >
              <RevealItem delayMs={i * 120} className="flex-1">
                <motion.div style={reducedMotion ? undefined : { x: columnX[i] }} className="h-full">
                  <GlassSurface level={2} className="h-full p-5">
                    <h3 className="t-h3 text-white">{column.label}</h3>
                    <p className="t-meta mb-4 mt-1 text-white/35">{column.detail}</p>
                    <ul className="space-y-2">
                      {column.points.map((point) => (
                        <li key={point} className="t-meta flex items-center gap-2.5 text-white/65">
                          <span className="h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </GlassSurface>
                </motion.div>
              </RevealItem>
              <span className="text-lg font-light text-white/25 lg:shrink-0" aria-hidden="true">
                +
              </span>
            </div>
          ))}

          <RevealItem delayMs={260} className="flex-1">
            <motion.div
              style={reducedMotion ? undefined : { scale: productScale, opacity: productOpacity }}
              className="h-full"
            >
              <GlassSurface level={3} className="h-full border-brand/30 p-5">
                <h3 className="t-h3 text-brand-light">Product</h3>
                <p className="t-meta mb-4 mt-1 text-white/35">What actually ships</p>
                <ul className="space-y-2">
                  {PRODUCT_POINTS.map((point) => (
                    <li key={point} className="t-meta flex items-center gap-2.5 text-white/80">
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
