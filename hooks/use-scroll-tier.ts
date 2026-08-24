"use client";

import { useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import type { RefObject } from "react";
import { SPRING_SCROLL } from "@/lib/animations/springs";
import { useMotionTier } from "@/hooks/use-motion-tier";

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

interface SectionScrollResult {
  /** 0 → 1 as the section travels through the viewport. */
  progress: MotionValue<number>;
  /** Whether scroll-linked motion should run at all on this client. */
  enabled: boolean;
}

/**
 * One `useScroll` per *section*.
 *
 * Every scroll-linked effect runs a callback per frame, and this site already
 * has a smooth-scroll loop running alongside them — so the pattern to avoid is
 * a `useScroll` per animated element. Declare this once at the top of a
 * section, then derive each depth layer from `progress` with
 * `useParallaxTier`. The hero already did this by hand; this centralises it,
 * including the responsive gate, which previously stopped parallax only below
 * `sm` rather than below `md`.
 */
export function useSectionScroll(
  ref: RefObject<HTMLElement | null>,
  offset: ScrollOffset = ["start start", "end start"],
): SectionScrollResult {
  const { roomy } = useMotionTier();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  return { progress: scrollYProgress, enabled: roomy };
}

/**
 * One parallax layer derived from a section's progress. Negative `distance`
 * travels upward, which is the usual direction for a foreground tier.
 *
 * When disabled the returned value is pinned to 0 rather than being swapped
 * for `undefined`, so callers can hand it to `style` unconditionally. That
 * matters: branching `style` on a preference flag is what used to produce a
 * one-frame flash before the flag resolved.
 */
export function useParallaxTier(
  progress: MotionValue<number>,
  distance: number,
  enabled: boolean,
): MotionValue<number> {
  return useTransform(progress, [0, 1], [0, enabled ? -distance : 0]);
}

/**
 * A pointer-derived layer, normalised -0.5…0.5 in, ±`distance` px out.
 * Same pinning behaviour as `useParallaxTier`.
 */
export function usePointerTier(
  pointer: MotionValue<number>,
  distance: number,
  enabled: boolean,
): MotionValue<number> {
  const range = enabled ? distance : 0;
  return useTransform(pointer, [-0.5, 0.5], [-range, range]);
}

/**
 * Spring-smooths a section's scroll progress.
 *
 * Raw `scrollYProgress` tracks the wheel exactly, which makes scroll-linked
 * transforms feel mechanically welded to the input. A light spring adds the
 * lag that reads as weight — the same reason the site runs momentum
 * scrolling. Use it for scale and fade, which are noticeable when they snap;
 * leave translation on the raw value so parallax layers stay locked to each
 * other.
 */
export function useSmoothProgress(progress: MotionValue<number>): MotionValue<number> {
  return useSpring(progress, SPRING_SCROLL);
}

/**
 * Scales an element down as its section scrolls away — the headline settling
 * back rather than sliding off. Pinned to 1 when scroll motion is disabled.
 */
export function useScrollScale(
  progress: MotionValue<number>,
  to: number,
  enabled: boolean,
): MotionValue<number> {
  return useTransform(progress, [0, 1], [1, enabled ? to : 1]);
}

/**
 * Fades an element as its section scrolls away.
 *
 * `to` is the floor, not zero: supporting copy should soften as the next
 * section takes over, not vanish while it is still on screen. Pinned to 1
 * when scroll motion is disabled.
 */
export function useScrollFade(
  progress: MotionValue<number>,
  to: number,
  enabled: boolean,
): MotionValue<number> {
  return useTransform(progress, [0, 1], [1, enabled ? to : 1]);
}
