import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AccentCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * The accent-tinted variant of SurfaceCard. Relies on the page setting
 * --accent-subtle (~12% opacity) and --accent-border (~25% opacity) once,
 * at the root of each case study, instead of every card computing its own
 * rgba() string.
 */
export function AccentCard({ children, className }: AccentCardProps) {
  return (
    <div
      className={cn(
        "rounded-sm border p-6 md:p-8",
        "border-[color:var(--accent-border,rgba(232,163,61,0.35))] bg-[color:var(--accent-subtle,rgba(232,163,61,0.14))]",
        className,
      )}
    >
      {children}
    </div>
  );
}
