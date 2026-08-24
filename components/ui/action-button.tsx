"use client";

import { motion } from "motion/react";
import type { ComponentPropsWithoutRef, PointerEvent, ReactNode } from "react";
import { DISTANCE, MAGNETIC, SCALE } from "@/lib/animations/constants";
import { SPRING_PRESS } from "@/lib/animations/springs";
import { useMagnetic } from "@/hooks/use-magnetic";
import { cn } from "@/lib/utils";

const MOTION_TAG = { a: motion.a, button: motion.button } as const;

interface ActionButtonOwnProps {
  as?: keyof typeof MOTION_TAG;
  variant?: "solid" | "outline";
  /** Magnetic pull in px. Keep inside the `MAGNETIC` scale. */
  pull?: number;
  children?: ReactNode;
  className?: string;
}

type ActionButtonProps = ActionButtonOwnProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof ActionButtonOwnProps>;

/**
 * Square, hairline-ruled action. `solid` is the amber fill — it always
 * carries ink-coloured text, because the fill amber is nowhere near readable
 * contrast under white. `outline` is the paper-backed secondary.
 *
 * Four layered responses, each doing a different job:
 *
 * - **Magnetic pull** toward the pointer, capped at `MAGNETIC.base` (10px).
 *   Enough to feel like the control has weight; small enough that the target
 *   never escapes the place the user is already aiming.
 * - **Hover lift** of a few px, which is what actually reads as "this is
 *   pressable" — the magnetic pull alone is too subtle to register as an
 *   affordance.
 * - **Arrow travel**, if the button carries one. A CSS child transform
 *   rather than a Motion child, so an icon passed as an arbitrary child
 *   still gets it without the button needing to know what it wrapped.
 * - **Press feedback** — a spring scale on tap, so the control answers the
 *   finger before the navigation happens.
 *
 * The pull is applied to the interactive element itself rather than a
 * wrapper, so the `inline-flex` layout is untouched, and it is pinned to
 * zero below the `rich` tier and under reduced motion — where the hover
 * lift and press also collapse, via `MotionConfig reducedMotion="user"`.
 * Nothing here is branched on a preference flag.
 */
export function ActionButton({
  as = "a",
  variant = "outline",
  pull = MAGNETIC.base,
  children,
  className,
  ...rest
}: ActionButtonProps) {
  const MotionComponent = MOTION_TAG[as];
  const { x, y, onPointerMove, onPointerLeave } = useMagnetic(pull);

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
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x, y }}
      whileHover={{ y: -DISTANCE.nudge / 4 }}
      whileTap={{ scale: SCALE.tap }}
      transition={SPRING_PRESS}
      className={cn(
        "inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-instant",
        // Arrow travel. Transform only, so it can never shift the label.
        "[&_svg]:transition-transform [&_svg]:duration-instant hover:[&_svg]:translate-x-0.5",
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
