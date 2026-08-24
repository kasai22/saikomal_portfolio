"use client";

import { motion } from "motion/react";
import { SharedElement } from "@/components/animations/SharedElement";
import { HOVER } from "@/lib/animations/transitions";
import { cn } from "@/lib/utils";
import type { NavLink as NavLinkType } from "@/types/navigation";

interface NavLinkProps {
  link: NavLinkType;
  isActive: boolean;
  onNavigate: (link: NavLinkType, event: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  /**
   * Renders the sliding active-state indicator. Only the desktop nav list
   * should set this — two elements sharing one `layoutId` animate against
   * each other, so the mobile menu deliberately shows a static state instead.
   */
  showActiveIndicator?: boolean;
}

/**
 * A single navigation item.
 *
 * Renders a plain anchor, so hash links keep working before JavaScript
 * hydrates; `onNavigate` progressively enhances it with smooth in-page
 * scrolling.
 *
 * Two indicators, deliberately distinct:
 *
 * - **Active** — a `layoutId` rule that travels between items. Because every
 *   item renders the same shared id, Motion treats it as one object moving
 *   rather than one fading out and another fading in, so the indicator
 *   physically slides from the old section to the new one.
 * - **Hover** — a separate rule that scales in under whichever item the
 *   pointer is on. It is absolutely positioned and animates `scaleX`, so it
 *   never contributes to layout and can't shift the row.
 */
export function NavLink({ link, isActive, onNavigate, className, showActiveIndicator }: NavLinkProps) {
  return (
    <motion.a
      href={link.href}
      aria-current={isActive ? "true" : undefined}
      onClick={(event) => onNavigate(link, event)}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      animate="rest"
      className={cn(
        "relative inline-block font-body text-xs font-medium text-ink/80 transition-colors duration-instant hover:text-brand-ink",
        isActive && "text-brand-ink",
        className,
      )}
    >
      {link.label}

      {/* Hover rule. Sits below the active rule and is hidden on the active
          item, so the two never stack on the same link. */}
      {!isActive && (
        <motion.span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 right-0 h-px origin-left bg-ink/25"
          variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
          transition={HOVER}
        />
      )}

      {showActiveIndicator && isActive && (
        <SharedElement
          id="nav-active-indicator"
          className="absolute -bottom-1 left-0 right-0 h-px bg-brand"
        />
      )}
    </motion.a>
  );
}
