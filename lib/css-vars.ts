import type { CSSProperties } from "react";

/**
 * Lets us pass CSS custom properties (e.g. "--accent") through React's
 * `style` prop with proper typing, so components can drive Tailwind's
 * arbitrary-property hover states (`hover:[border-color:var(--accent)]`)
 * from per-item data instead of inline onMouseEnter/onMouseLeave handlers.
 */
export function cssVars(vars: Record<`--${string}`, string>): CSSProperties {
  return vars as CSSProperties;
}
