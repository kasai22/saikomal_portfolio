"use client";

import { createContext, useContext, type ReactNode } from "react";
import { motion, useMotionValue, useTransform, type MotionValue } from "motion/react";
import { DISTANCE } from "@/lib/animations/constants";
import { SPRING_TILT } from "@/lib/animations/springs";
import { HOVER } from "@/lib/animations/transitions";
import { useTilt } from "@/hooks/use-tilt";

interface TiltPointerContextValue {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  /** 0 → 1. A motion value, not state — see the note in `TiltCard`. */
  hover: MotionValue<number>;
}

const TiltPointerContext = createContext<TiltPointerContextValue | null>(null);

/** Read by `ParallaxImage` and `GlassHighlight` when nested inside a `TiltCard`. Null outside one. */
export function useTiltPointer() {
  return useContext(TiltPointerContext);
}

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxDeg?: number;
}

/**
 * The tactile card wrapper: a small pointer-tilt plus a hover lift.
 *
 * Exposes pointer position through context so a nested `ParallaxImage` and
 * `GlassHighlight` can react to the same pointer independently of the card's
 * own tilt — one listener, three effects.
 *
 * Hover state is a **motion value**, not React state. The previous version
 * kept `isHovering` in state and passed it through context, so entering or
 * leaving a card re-rendered the whole subtree: the panel, the image, the
 * metrics and every chip inside it. Nothing about a hover needs to reach
 * React, so nothing does.
 *
 * Inert below the `rich` tier and under reduced motion — `useTilt` pins its
 * output to zero, so this becomes a plain `div` in behaviour.
 */
export function TiltCard({ children, className, maxDeg = 4 }: TiltCardProps) {
  const { rotateX, rotateY, pointerX, pointerY, onPointerMove, onPointerLeave } = useTilt(maxDeg);
  const hover = useMotionValue(0);

  return (
    <TiltPointerContext.Provider value={{ pointerX, pointerY, hover }}>
      <motion.div
        onPointerMove={onPointerMove}
        onPointerEnter={() => hover.set(1)}
        onPointerLeave={() => {
          onPointerLeave();
          hover.set(0);
        }}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
        whileHover={{ y: -DISTANCE.nudge / 2 }}
        transition={SPRING_TILT}
        className={className}
      >
        {children}
      </motion.div>
    </TiltPointerContext.Provider>
  );
}

/**
 * A soft, pointer-following light sweep across the card surface. Place as the
 * last child inside a `Panel` so it is clipped to the same corners. Renders
 * nothing outside a `TiltCard`.
 */
export function GlassHighlight() {
  const ctx = useTiltPointer();
  if (!ctx) return null;
  return <GlassHighlightInner {...ctx} />;
}

function GlassHighlightInner({ pointerX, pointerY, hover }: TiltPointerContextValue) {
  const left = useTransform(pointerX, [-0.5, 0.5], ["0%", "100%"]);
  const top = useTransform(pointerY, [-0.5, 0.5], ["0%", "100%"]);
  // Driving opacity from the hover motion value keeps the whole interaction
  // off the React render path.
  const opacity = useTransform(hover, [0, 1], [0, 1]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      transition={HOVER}
      style={
        {
          opacity,
          background:
            "radial-gradient(circle at var(--hl-x) var(--hl-y), rgba(255,255,255,0.16), transparent 45%)",
          "--hl-x": left,
          "--hl-y": top,
        } as unknown as React.CSSProperties
      }
    />
  );
}
