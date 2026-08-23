"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea, summary";

type CursorLabel = "view" | "open" | "drag" | "explore" | null;

/**
 * A small glass dot that follows the pointer, grows over interactive
 * elements, and shows a short label (VIEW / OPEN / DRAG / EXPLORE) when the
 * hovered element opts in via `data-cursor`. Position is tracked with
 * framer-motion motion values (not React state), so pointer movement never
 * triggers a re-render — only the infrequent hover-target change does.
 * Desktop-only garnish: never intercepts clicks (pointer-events: none), and
 * gets out of the way entirely on touch devices or under
 * `prefers-reduced-motion`, so it never interferes with text selection or
 * normal navigation.
 */
export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<CursorLabel>(null);
  const [visible, setVisible] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 500, damping: 40, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setEnabled(!isTouch && !reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event: PointerEvent) => {
      setVisible(true);
      rawX.set(event.clientX);
      rawY.set(event.clientY);
      const target = event.target as Element | null;
      const cursorTarget = target?.closest<HTMLElement>("[data-cursor]");
      if (cursorTarget) {
        setLabel(cursorTarget.dataset.cursor as CursorLabel);
      } else {
        setLabel(target?.closest(INTERACTIVE_SELECTOR) ? "open" : null);
      }
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;

  const hovering = label !== null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden items-center justify-center whitespace-nowrap rounded-full border border-ink/35 bg-ink/[0.06] px-0 text-[9px] font-semibold uppercase tracking-widest text-ink transition-[width,height,padding,opacity] duration-200 ease-out md:flex"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        width: hovering ? "auto" : 10,
        minWidth: hovering ? 52 : 10,
        height: hovering ? 52 : 10,
        paddingLeft: hovering ? 14 : 0,
        paddingRight: hovering ? 14 : 0,
        opacity: visible ? 1 : 0,
      }}
    >
      {hovering && label}
    </motion.div>
  );
}
