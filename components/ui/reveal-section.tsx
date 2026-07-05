"use client";

import type { ReactNode } from "react";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { cn } from "@/lib/utils";

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Renders a `<section>` and observes its `<RevealItem>` descendants for
 * scroll-triggered reveal. Kept intentionally tiny so everything passed as
 * `children` (including server-rendered content) stays out of the client
 * JS bundle — this is the only client boundary each page section needs.
 */
export function RevealSection({ children, className, id }: RevealSectionProps) {
  const ref = useRevealOnScroll<HTMLElement>();

  return (
    <section ref={ref} id={id} className={cn(className)}>
      {children}
    </section>
  );
}
