"use client";

import Image, { type ImageProps } from "next/image";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useTiltPointer } from "@/components/ui/tilt-card";
import { cn } from "@/lib/utils";

interface ParallaxImageProps extends ImageProps {
  /** Max shift in px at the pointer's extremes. */
  range?: number;
}

/**
 * A `fill`-mode image that shifts a few px opposite the pointer, independent
 * of its `TiltCard` parent's own tilt — a small internal-parallax depth cue.
 *
 * Reads pointer position from the card's context rather than attaching its own
 * listener, so a card with an image, a tilt and a highlight still costs one
 * listener. The immediate parent must be a sized, positioned,
 * `overflow-hidden` container so the `scale-110` headroom stays clipped.
 * Outside a `TiltCard`, or on any tier where tilt is pinned flat, the values
 * never move and this renders as a static image.
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
