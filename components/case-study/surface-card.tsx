import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SurfaceCardProps {
  children: ReactNode;
  className?: string;
}

export function SurfaceCard({ children, className }: SurfaceCardProps) {
  return (
    <div className={cn("rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8", className)}>
      {children}
    </div>
  );
}
