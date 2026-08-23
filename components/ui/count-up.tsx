"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface CountUpProps {
  /** The finished string, e.g. "30%", "3+", "12 wks", "Live". */
  value: string;
  className?: string;
}

/**
 * Counts the numeric part of a metric up to its final value when it scrolls
 * into view, preserving any prefix/suffix ("30%" counts to 30 and keeps the
 * %). Values with no digits at all ("Live") are rendered as-is.
 *
 * The element always ends on the real value: reduced motion and the no-digit
 * case both short-circuit to it immediately, so a metric can never be left
 * showing a placeholder number.
 */
export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/s);
  const digits = match?.[2];
  const target = digits ? parseFloat(digits) : null;
  const [shown, setShown] = useState<number | null>(target === null ? null : 0);

  useEffect(() => {
    if (target === null) return;
    if (reducedMotion) {
      setShown(target);
      return;
    }
    if (!inView) return;

    const duration = 900;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo — fast out of the gate, settles onto the number.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setShown(target * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reducedMotion, target]);

  if (!match || target === null || !digits) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  const decimals = (digits.split(".")[1] ?? "").length;
  const display = (shown ?? target).toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {/* Screen readers get the settled value, never the ticking one. */}
      <span aria-hidden="true">{`${match[1] ?? ""}${display}${match[3] ?? ""}`}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
