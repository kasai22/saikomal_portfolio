import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PanelLevel = 1 | 2 | 3 | 4;

/**
 * The four surface levels of the paper system, replacing the previous
 * translucent "liquid glass" levels. On a cream page depth reads through
 * paper tone and rule weight rather than blur and glow, so each level is a
 * fixed combination of surface colour, hairline and (sparingly) shadow.
 * Corners are square by design — the technical-drawing look has none.
 *
 * Levels rise with importance: 1 is inert chrome, 3 is a featured card,
 * 4 is a focused/selected state.
 */
const LEVEL_CLASSES: Record<PanelLevel, string> = {
  1: "bg-[var(--panel-1-bg)] border border-[color:var(--panel-1-border)]",
  2: "bg-[var(--panel-2-bg)] border border-[color:var(--panel-2-border)]",
  3: "bg-[var(--panel-3-bg)] border border-[color:var(--panel-3-border)] shadow-[0_1px_0_rgba(20,20,15,0.05)]",
  4: "bg-[var(--panel-4-bg)] border border-[color:var(--panel-4-border)]",
};

interface PanelOwnProps<T extends ElementType> {
  level?: PanelLevel;
  as?: T;
  children?: ReactNode;
  className?: string;
}

type PanelProps<T extends ElementType> = PanelOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof PanelOwnProps<T>>;

export function Panel<T extends ElementType = "div">({
  level = 2,
  as,
  children,
  className,
  ...rest
}: PanelProps<T>) {
  const Component = (as ?? "div") as ElementType;

  return (
    <Component className={cn("rounded-sm transition-colors duration-fast", LEVEL_CLASSES[level], className)} {...rest}>
      {children}
    </Component>
  );
}
