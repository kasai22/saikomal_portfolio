import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SurfaceCardProps {
  children: ReactNode;
  className?: string;
}

export function SurfaceCard({ children, className }: SurfaceCardProps) {
  return (
    <div className={cn("rounded-sm border border-ink/12 bg-ink/[0.035] p-6 md:p-8", className)}>
      {children}
    </div>
  );
}
