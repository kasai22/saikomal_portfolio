"use client";

import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef, PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMagnetic } from "@/hooks/use-magnetic";

const MOTION_TAG = { a: motion.a, button: motion.button } as const;

interface GlassButtonOwnProps {
  as?: keyof typeof MOTION_TAG;
  variant?: "solid" | "glass";
  children?: ReactNode;
  className?: string;
}

// Every current usage renders an anchor ("Let's Talk", "View My Work",
// "Download resume" — all navigate rather than submit). Typed against
// anchor props; pass `as="button"` for a real button element too, just
// without per-tag prop narrowing.
type GlassButtonProps = GlassButtonOwnProps & Omit<ComponentPropsWithoutRef<"a">, keyof GlassButtonOwnProps>;

/**
 * CTA button on the same glass material as the rest of the interface, with a
 * subtle magnetic hover/press response (framer-motion) — disabled entirely
 * under `prefers-reduced-motion`. `solid` is the brand-filled primary
 * action; `glass` is the level-4 (focus-tier) secondary action.
 */
export function GlassButton({ as = "a", variant = "glass", children, className, ...rest }: GlassButtonProps) {
  const reducedMotion = useReducedMotion();
  const MotionComponent = MOTION_TAG[as];
  const { x, y, onPointerMove, onPointerLeave } = useMagnetic(6);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    onPointerMove(event);
    (rest as { onPointerMove?: (e: PointerEvent<HTMLElement>) => void }).onPointerMove?.(event);
  };
  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    onPointerLeave();
    (rest as { onPointerLeave?: (e: PointerEvent<HTMLElement>) => void }).onPointerLeave?.(event);
  };

  return (
    <MotionComponent
      data-cursor="open"
      onPointerMove={reducedMotion ? undefined : handlePointerMove}
      onPointerLeave={reducedMotion ? undefined : handlePointerLeave}
      style={reducedMotion ? undefined : { x, y }}
      whileHover={reducedMotion ? undefined : { scale: 1.03 }}
      whileTap={reducedMotion ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-[0.01em] transition-colors duration-200",
        variant === "solid" &&
          "bg-brand text-white shadow-[0_8px_30px_rgba(0,128,128,0.35)] hover:bg-brand-dark hover:shadow-[0_10px_40px_rgba(0,179,179,0.5)]",
        variant === "glass" &&
          "border border-[color:var(--glass-4-border)] bg-[var(--glass-4-bg)] text-white backdrop-blur-xl hover:border-brand/50 hover:text-brand-light",
        className,
      )}
      {...(rest as object)}
    >
      {children}
    </MotionComponent>
  );
}
