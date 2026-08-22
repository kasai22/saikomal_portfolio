"use client";

import Image, { type ImageProps } from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useTiltPointer } from "@/components/ui/tilt-card";
import { cn } from "@/lib/utils";

interface ParallaxImageProps extends ImageProps {
  /** Max shift in px at the pointer's extremes. */
  range?: number;
}

/**
 * Wraps a `fill`-mode next/image inside a `TiltCard` — the image shifts a
 * few px opposite the pointer, independent of the card's own tilt, for a
 * small internal-parallax "depth" effect. The immediate parent must already
 * be a sized, `overflow-hidden`, positioned container (as the existing
 * project-card image wrappers are) so the extra scale headroom stays
 * clipped. Falls back to a static image outside a `TiltCard` or when tilt
 * never receives pointer input (touch, reduced motion).
 */
export function ParallaxImage({ range = 10, className, alt, ...imageProps }: ParallaxImageProps) {
  const ctx = useTiltPointer();
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);
  const x = useTransform(ctx?.pointerX ?? fallbackX, [-0.5, 0.5], [range, -range]);
  const y = useTransform(ctx?.pointerY ?? fallbackY, [-0.5, 0.5], [range, -range]);

  return (
    <motion.div style={ctx ? { x, y } : undefined} className="absolute inset-0 scale-110">
      <Image {...imageProps} alt={alt} className={cn("object-cover", className)} />
    </motion.div>
  );
}
