import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

/**
 * The frosted-glass card treatment from the original's `glassCardClassName`
 * constant, extracted into a real component since it's reused for both the
 * hero and mobile preview images in the Visual Design section.
 */
export function PaperPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[40px] p-2",
        "shadow-[0px_8px_16px_#00000099,0px_3px_8px_#0000001f,0px_1px_2px_#0000000a]",
        " backdrop-brightness-100",
        "[background:radial-gradient(50%_50%_at_50%_0%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.02)_100%)]",
        "before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:rounded-[40px] before:p-px before:content-['']",
        "before:[background:linear-gradient(180deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)]",
        "before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude]",
        className,
      )}
    >
      {children}
    </div>
  );
}
