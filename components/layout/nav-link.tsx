"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { NavLink as NavLinkType } from "@/types/navigation";

interface NavLinkProps {
  link: NavLinkType;
  isActive: boolean;
  onNavigate: (link: NavLinkType, event: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  /** Renders the sliding active-state underline. Only the desktop nav list
   * should set this — the mobile menu stays CSS-hidden but mounted, and a
   * duplicate `layoutId` on a hidden element would conflict with the
   * visible one. */
  showActiveIndicator?: boolean;
}

/**
 * A single navigation item. Renders a plain anchor so hash links keep
 * working even before JavaScript hydrates; `onNavigate` progressively
 * enhances it with smooth in-page scrolling.
 */
export function NavLink({ link, isActive, onNavigate, className, showActiveIndicator }: NavLinkProps) {
  return (
    <a
      href={link.href}
      aria-current={isActive ? "true" : undefined}
      onClick={(event) => onNavigate(link, event)}
      className={cn(
        "relative font-body text-sm font-medium text-white/80 transition-colors duration-200 hover:text-brand-light",
        isActive && "text-brand-light",
        className,
      )}
    >
      {link.label}
      {showActiveIndicator && isActive && (
        <motion.span
          layoutId="nav-active-indicator"
          className="absolute -bottom-1 left-0 right-0 h-px bg-brand-light"
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
      )}
    </a>
  );
}
