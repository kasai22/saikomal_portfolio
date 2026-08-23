"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { EASE_WIPE } from "@/components/ui/wipe";

interface SplitTextProps {
  text: string;
  /** Per-character delay. 40ms matches the reference site's cadence. */
  stepMs?: number;
  delayMs?: number;
  className?: string;
  charClassName?: string;
}

/**
 * Reveals a line one character at a time, each rising into place behind a
 * mask. The whole string is also exposed to assistive tech as a single
 * label, because a per-character DOM would otherwise be read out letter by
 * letter — and the real spaces are preserved so scrapers see the line once,
 * as normal text.
 */
export function SplitText({
  text,
  stepMs = 40,
  delayMs = 0,
  className,
  charClassName,
}: SplitTextProps) {
  const reducedMotion = useReducedMotion();
  const words = text.split(" ");
  let index = -1;

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wordIndex) => (
        <Fragment key={`${word}-${wordIndex}`}>
          {/* Each word is its own overflow-clip line box so characters can
              rise from under it without bleeding into the line above. */}
          <span className="inline-block overflow-hidden align-bottom" aria-hidden="true">
            {[...word].map((char, charIndex) => {
              index += 1;
              return (
                <motion.span
                  key={`${char}-${charIndex}`}
                  className={cn("inline-block", charClassName)}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { duration: 0.6, delay: (delayMs + index * stepMs) / 1000, ease: EASE_WIPE }
                  }
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
          {wordIndex < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
