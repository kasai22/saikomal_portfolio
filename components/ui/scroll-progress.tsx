"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A thin fixed bar at the very top of the viewport whose width tracks
 * overall page scroll progress. Mounted once in the root layout. Purely
 * decorative — reads native scroll via `useScroll`, never intercepts it.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[90] h-[2px] w-full origin-left bg-gradient-to-r from-brand to-brand-light"
      style={{ scaleX }}
    />
  );
}
