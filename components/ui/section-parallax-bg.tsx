"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface SectionParallaxBgProps {
  className: string;
}

/**
 * A slow-drifting decorative glow, scoped to its own section (not the whole
 * page) via a scroll-linked `useTransform`. Sits behind the section's real
 * content (`-z-10`) — the parent section must be `relative` for the
 * positioning to resolve against it. Skipped below `sm:` to keep small/
 * low-power devices from paying for a blur layer that's barely visible on
 * a narrow viewport anyway, and inert under `prefers-reduced-motion`.
 */
export function SectionParallaxBg({ className }: SectionParallaxBgProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute -z-10 hidden rounded-full sm:block", className)}
      style={reducedMotion ? undefined : { y }}
    />
  );
}
