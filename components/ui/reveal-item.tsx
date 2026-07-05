import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealItemProps {
  children: ReactNode;
  /** Stagger delay in ms, applied via inline style since Tailwind can't express arbitrary per-item delays */
  delayMs?: number;
  className?: string;
}

/**
 * Marks an element to be animated by the nearest ancestor `<RevealSection>`.
 * Starts hidden/offset; the reveal hook adds the "revealed" classes once
 * the element scrolls into view.
 */
export function RevealItem({ children, delayMs = 0, className }: RevealItemProps) {
  return (
    <div
      data-animate
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={cn("translate-y-8 opacity-0 transition-all duration-700 ease-out", className)}
    >
      {children}
    </div>
  );
}
