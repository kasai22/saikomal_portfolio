"use client";

import { motion } from "motion/react";
import { SPRING_PRESS } from "@/lib/animations/springs";
import { SCALE } from "@/lib/animations/constants";

interface MenuToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
  controlsId: string;
}

/**
 * Three-line hamburger that morphs into an X.
 *
 * The two outer bars rotate and converge while the middle one fades — a
 * single continuous gesture rather than one icon being swapped for another,
 * so the control reads as the same object in two states. Spring-driven, so
 * tapping it mid-transition reverses smoothly instead of restarting.
 *
 * Purely presentational; all open/close state lives in the parent `Navbar`.
 */
export function MenuToggleButton({ isOpen, onClick, controlsId }: MenuToggleButtonProps) {
  const bar = "block h-0.5 w-6 origin-center rounded-full bg-ink";

  return (
    <motion.button
      type="button"
      className="-mr-2 p-2 text-ink md:hidden"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={controlsId}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      whileTap={{ scale: SCALE.tap }}
      transition={SPRING_PRESS}
    >
      <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
      <span className="flex flex-col items-center gap-1.5" aria-hidden="true">
        <motion.span
          className={bar}
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={SPRING_PRESS}
        />
        <motion.span
          className={bar}
          animate={isOpen ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
          transition={SPRING_PRESS}
        />
        <motion.span
          className={bar}
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          transition={SPRING_PRESS}
        />
      </span>
    </motion.button>
  );
}
