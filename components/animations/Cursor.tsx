"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { SPRING_CURSOR, SPRING_PRESS } from "@/lib/animations/springs";
import { useMotionTier } from "@/hooks/use-motion-tier";

/**
 * Elements that are interactive on their own account. Hovering one expands
 * the dot slightly — an affordance, not an announcement. Only elements that
 * opt in via `data-cursor` get a worded pill.
 */
const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea, select, summary, label";

/** Controls where a floating cursor would get in the way of real input. */
const TEXT_INPUT_SELECTOR = "input, textarea, select, [contenteditable='true']";

type CursorLabel = "view" | "open" | "drag" | "explore";
type CursorState = "idle" | "interactive" | CursorLabel;

const LABELLED: readonly CursorState[] = ["view", "open", "drag", "explore"];

/**
 * Desktop-only pointer companion with two forms: a small dot that follows
 * the pointer, and a labelled pill for elements that declare an intent.
 *
 * ── States ──────────────────────────────────────────────────────────────
 *   idle          10px dot
 *   interactive   the same dot at 1.6× — any link, button or control
 *   data-cursor   the dot gives way to a pill: VIEW (a case study),
 *                 OPEN (leaves the site or opens a new tab), DRAG
 *                 (draggable content), EXPLORE (the hero's open glass)
 *
 * Generic controls deliberately get the expanded dot rather than a word.
 * Labelling every button "OPEN" turns an affordance into narration, and the
 * pill stops meaning anything once it is always on screen.
 *
 * ── Staying out of the way ──────────────────────────────────────────────
 * `pointer-events: none` throughout, so it can never intercept a click. It
 * hides over text fields and contenteditable regions, where the caret and
 * I-beam are the real affordance, and it hides while the pointer is down so
 * it never trails a text selection or a drag. It is `aria-hidden` and is
 * never mounted at all on touch devices or under reduced motion — so it
 * cannot affect assistive tech, focus order or native link behaviour.
 *
 * ── Cost ────────────────────────────────────────────────────────────────
 * Position lives on motion values, so pointer movement never renders. React
 * state changes only when the hovered *kind* of element changes, which is
 * orders of magnitude less often than the pointer moves.
 */
export function Cursor() {
  const { rich } = useMotionTier();
  const [state, setState] = useState<CursorState>("idle");
  const [visible, setVisible] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CURSOR);
  const y = useSpring(rawY, SPRING_CURSOR);

  useEffect(() => {
    if (!rich) return;

    const handleMove = (event: PointerEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);

      const target = event.target as Element | null;

      // Over a text field or a text selection, the real caret and I-beam are
      // what the user needs to see. Stand down entirely.
      if (target?.closest(TEXT_INPUT_SELECTOR)) {
        setVisible(false);
        return;
      }
      setVisible(true);

      const opted = target?.closest<HTMLElement>("[data-cursor]");
      if (opted?.dataset.cursor) {
        setState(opted.dataset.cursor as CursorLabel);
        return;
      }
      setState(target?.closest(INTERACTIVE_SELECTOR) ? "interactive" : "idle");
    };

    const handleLeave = () => setVisible(false);
    // A drag of any kind means the pointer is busy doing something real.
    const handleDown = () => setVisible(false);
    const handleUp = () => setVisible(true);

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown, { passive: true });
    window.addEventListener("pointerup", handleUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
    };
  }, [rich, rawX, rawY]);

  if (!rich) return null;

  const labelled = LABELLED.includes(state);
  const label = labelled ? state : null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x, y }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={SPRING_PRESS}
    >
      {/* The dot. Idle it is 10px; over anything interactive it grows to
          16px — "expand slightly", not a second cursor. It only disappears
          once a labelled pill takes over. */}
      <motion.span
        className="absolute block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/35 bg-ink/[0.06]"
        animate={{
          scale: labelled ? 0 : state === "interactive" ? 1.6 : 1,
          opacity: labelled ? 0 : 1,
        }}
        transition={SPRING_PRESS}
      />
      {/* The labelled pill. Content-sized by CSS so only transform and
          opacity animate — no width or padding on the compositor's critical
          path. */}
      <motion.span
        className="absolute flex h-[52px] min-w-[52px] -translate-x-1/2 -translate-y-1/2 items-center justify-center whitespace-nowrap rounded-full border border-ink/35 bg-ink/[0.06] px-3.5 text-[9px] font-semibold uppercase tracking-widest text-ink"
        animate={{ scale: labelled ? 1 : 0.2, opacity: labelled ? 1 : 0 }}
        transition={SPRING_PRESS}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
