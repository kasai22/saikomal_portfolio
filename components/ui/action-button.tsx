"use client";

import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef, PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMagnetic } from "@/hooks/use-magnetic";

const MOTION_TAG = { a: motion.a, button: motion.button } as const;

interface ActionButtonOwnProps {
  as?: keyof typeof MOTION_TAG;
  variant?: "solid" | "outline";
  children?: ReactNode;
  className?: string;
}

type ActionButtonProps = ActionButtonOwnProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof ActionButtonOwnProps>;

/**
 * Square, hairline-ruled action. `solid` is the amber fill — it always
 * carries ink-coloured text, because the fill amber is nowhere near
 * readable contrast under white. `outline` is the paper-backed secondary.
 * Keeps the subtle magnetic hover, disabled under `prefers-reduced-motion`.
 */
export function ActionButton({
  as = "a",
  variant = "outline",
  children,
  className,
  ...rest
}: ActionButtonProps) {
  const reducedMotion = useReducedMotion();
  const MotionComponent = MOTION_TAG[as];
  const { x, y, onPointerMove, onPointerLeave } = useMagnetic(4);

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
      whileTap={reducedMotion ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-200",
        variant === "solid" && "bg-brand text-ink hover:bg-brand-dark",
        variant === "outline" && "border border-ink/20 bg-paper-panel text-ink hover:border-ink/45",
        className,
      )}
      {...(rest as object)}
    >
      {children}
    </MotionComponent>
  );
}
