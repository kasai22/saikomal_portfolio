"use client";

import { cn } from "@/lib/utils";
import type { NavLink as NavLinkType } from "@/types/navigation";

interface NavLinkProps {
  link: NavLinkType;
  isActive: boolean;
  onNavigate: (link: NavLinkType, event: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

/**
 * A single navigation item. Renders a plain anchor so hash links keep
 * working even before JavaScript hydrates; `onNavigate` progressively
 * enhances it with smooth in-page scrolling.
 */
export function NavLink({ link, isActive, onNavigate, className }: NavLinkProps) {
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
    </a>
  );
}
