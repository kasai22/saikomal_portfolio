"use client";

import { cn } from "@/lib/utils";

interface MenuToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
  controlsId: string;
}

/**
 * Three-line hamburger icon that morphs into an X. Purely presentational;
 * all open/close state lives in the parent Navbar.
 */
export function MenuToggleButton({ isOpen, onClick, controlsId }: MenuToggleButtonProps) {
  return (
    <button
      type="button"
      className="p-2 text-white md:hidden"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={controlsId}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
      <div className="space-y-1.5" aria-hidden="true">
        <span
          className={cn(
            "block h-0.5 w-6 bg-white transition-transform duration-300",
            isOpen && "translate-y-2 rotate-45",
          )}
        />
        <span
          className={cn(
            "block h-0.5 w-6 bg-white transition-opacity duration-300",
            isOpen && "opacity-0",
          )}
        />
        <span
          className={cn(
            "block h-0.5 w-6 bg-white transition-transform duration-300",
            isOpen && "-translate-y-2 -rotate-45",
          )}
        />
      </div>
    </button>
  );
}
