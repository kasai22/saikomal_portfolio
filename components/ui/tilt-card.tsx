"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { useTilt } from "@/hooks/use-tilt";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface TiltPointerContextValue {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  isHovering: boolean;
}

const TiltPointerContext = createContext<TiltPointerContextValue | null>(null);

/** Read by `ParallaxImage`/`GlassHighlight` when nested inside a `TiltCard`. Null outside one. */
export function useTiltPointer() {
  return useContext(TiltPointerContext);
}

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxDeg?: number;
}

/**
 * Shared "tactile glass card" wrapper for project/case-study cards: a
 * subtle pointer-tilt (capped at `maxDeg`) plus a small hover elevation.
 * Exposes pointer position via context so a nested `ParallaxImage` and
 * `GlassHighlight` can react to the same pointer independently of the
 * card's own tilt. No-ops under `prefers-reduced-motion` or touch — the
 * underlying `useTilt` hook simply never receives pointer coordinates.
 */
export function TiltCard({ children, className, maxDeg = 4 }: TiltCardProps) {
  const { rotateX, rotateY, pointerX, pointerY, onPointerMove, onPointerLeave } = useTilt(maxDeg);
  const reducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <TiltPointerContext.Provider value={{ pointerX, pointerY, isHovering }}>
      <motion.div
        onPointerMove={onPointerMove}
        onPointerEnter={() => setIsHovering(true)}
        onPointerLeave={() => {
          onPointerLeave();
          setIsHovering(false);
        }}
        style={reducedMotion ? undefined : { rotateX, rotateY, transformPerspective: 800 }}
        whileHover={reducedMotion ? undefined : { y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={className}
      >
        {children}
      </motion.div>
    </TiltPointerContext.Provider>
  );
}

/**
 * A soft, pointer-following light sweep across a glass surface. Place as
 * the last child inside a `Panel` (so it's clipped to the same
 * rounded corners) within a `TiltCard`. Renders nothing outside one.
 */
export function GlassHighlight() {
  const ctx = useTiltPointer();
  if (!ctx) return null;
  return <GlassHighlightInner pointerX={ctx.pointerX} pointerY={ctx.pointerY} isHovering={ctx.isHovering} />;
}

function GlassHighlightInner({
  pointerX,
  pointerY,
  isHovering,
}: {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  isHovering: boolean;
}) {
  const left = useTransform(pointerX, [-0.5, 0.5], ["0%", "100%"]);
  const top = useTransform(pointerY, [-0.5, 0.5], ["0%", "100%"]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      animate={{ opacity: isHovering ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={
        {
          background:
            "radial-gradient(circle at var(--hl-x) var(--hl-y), rgba(255,255,255,0.16), transparent 45%)",
          "--hl-x": left,
          "--hl-y": top,
        } as React.CSSProperties
      }
    />
  );
}
