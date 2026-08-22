import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type GlassLevel = 1 | 2 | 3 | 4;

/**
 * The four Liquid Glass material levels, from barely-there nav chrome to a
 * focused/selected state. Each level is a fixed combination of blur, surface
 * opacity, border and shadow — kept in one place so no page hand-rolls its
 * own blur/opacity mix. See design tokens in app/globals.css.
 *
 * Reserved for nav, controls, and featured/selected cards — NOT for
 * long-form text or dense content sections, which stay on near-solid
 * surfaces for readability.
 */
const LEVEL_CLASSES: Record<GlassLevel, string> = {
  1: "backdrop-blur-md bg-[var(--glass-1-bg)] border border-[color:var(--glass-1-border)]",
  2: "backdrop-blur-lg bg-[var(--glass-2-bg)] border border-[color:var(--glass-2-border)] shadow-lg shadow-black/20",
  3: "backdrop-blur-xl bg-[var(--glass-3-bg)] border border-[color:var(--glass-3-border)] shadow-2xl shadow-black/40",
  4: "backdrop-blur-xl bg-[var(--glass-4-bg)] border border-[color:var(--glass-4-border)] shadow-2xl shadow-black/40",
};

interface GlassSurfaceOwnProps<T extends ElementType> {
  level?: GlassLevel;
  as?: T;
  children?: ReactNode;
  className?: string;
}

type GlassSurfaceProps<T extends ElementType> = GlassSurfaceOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof GlassSurfaceOwnProps<T>>;

export function GlassSurface<T extends ElementType = "div">({
  level = 2,
  as,
  children,
  className,
  ...rest
}: GlassSurfaceProps<T>) {
  const Component = (as ?? "div") as ElementType;

  return (
    <Component className={cn("rounded-2xl transition-colors duration-300", LEVEL_CLASSES[level], className)} {...rest}>
      {children}
    </Component>
  );
}
