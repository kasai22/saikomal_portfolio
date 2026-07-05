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
        "rounded-2xl border p-6 md:p-8",
        "border-[color:var(--accent-border,rgba(0,128,128,0.25))] bg-[color:var(--accent-subtle,rgba(0,128,128,0.12))]",
        className,
      )}
    >
      {children}
    </div>
  );
}
