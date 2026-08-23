"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealItem } from "@/components/ui/reveal-item";
import { Panel } from "@/components/ui/panel";
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
 * Engineering + UX = Product, shown as a row inside About. As it scrolls
 * through the viewport, the Engineering and UX columns drift toward the center and the
 * Product panel gains emphasis: a spatial cue that the two combine into the
 * third, not three static cards side by side. Inert under
 * `prefers-reduced-motion`.
 */
export function EngineeringUxTriad() {
  const rowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ["start 0.85", "start 0.35"] });

  const engineeringX = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const uxX = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const productScale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const productOpacity = useTransform(scrollYProgress, [0, 1], [0.7, 1]);

  const columnX = [engineeringX, uxX];

  return (
    <>
      <div ref={rowRef} className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
        {COLUMNS.map((column, i) => (
          <div
            key={column.label}
            className="flex flex-1 flex-col items-stretch gap-3 lg:flex-row lg:items-center"
          >
            <RevealItem delayMs={i * 120} className="flex-1">
              <motion.div style={reducedMotion ? undefined : { x: columnX[i] }} className="h-full">
                <Panel level={2} className="h-full p-5">
                  <h3 className="t-h3 text-ink">{column.label}</h3>
                  <p className="t-meta mb-4 mt-1 text-ink/60">{column.detail}</p>
                  <ul className="space-y-2">
                    {column.points.map((point) => (
                      <li key={point} className="t-meta flex items-center gap-2.5 text-ink/70">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Panel>
              </motion.div>
            </RevealItem>
            <span className="text-lg font-light text-ink/60 lg:shrink-0" aria-hidden="true">
              +
            </span>
          </div>
        ))}

        <RevealItem delayMs={260} className="flex-1">
          <motion.div
            style={reducedMotion ? undefined : { scale: productScale, opacity: productOpacity }}
            className="h-full"
          >
            <Panel level={3} className="h-full border-brand/30 p-5">
              <h3 className="t-h3 text-brand-ink">Product</h3>
              <p className="t-meta mb-4 mt-1 text-ink/60">What actually ships</p>
              <ul className="space-y-2">
                {PRODUCT_POINTS.map((point) => (
                  <li key={point} className="t-meta flex items-center gap-2.5 text-ink/80">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-brand-light" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </Panel>
          </motion.div>
        </RevealItem>
      </div>
    </>
  );
}
