"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { HERO_SYSTEM } from "@/lib/animations/constants";
import {
  smoothstep,
  type SystemFragment,
  type SystemGeometry,
} from "@/components/hero/complexity-geometry";

interface FragmentsProps {
  progress: MotionValue<number>;
  geometry: SystemGeometry;
  scatter: number;
  width: number;
  height: number;
  /** Tablet keeps the composition but sheds the two smallest pieces. */
  limit?: number;
}

/**
 * The interface fragments — a header bar, a rail, a row list, a metric tile, a
 * labelled field — scattered and tilted across the stage at the start, tiling
 * into one composition at the end.
 *
 * ── Why these are DOM, not SVG ──────────────────────────────────────────
 * They are built from the site's own surface vocabulary: white panels,
 * hairline rules, 1-2px corners, the amber accent used once. Reusing the paper
 * system in markup is what makes them read as *interface* rather than as
 * decorative rectangles, and it costs nothing — each fragment animates on
 * `transform` alone, composited, with a single opacity ramp shared by all of
 * them.
 *
 * ── Why the final positions are pixels ──────────────────────────────────
 * The resolved state is one assembled composition, so the pieces have to meet
 * exactly. They are laid out inside a fixed-size box that is centred in the
 * stage; only the scattered *offsets* scale with the viewport. Proportional
 * placement would leave visible seams drifting at every width.
 */
export function ComplexityUIFragments({
  progress,
  geometry,
  scatter,
  width,
  height,
  limit,
}: FragmentsProps) {
  const { interface: box } = geometry;
  const fragments = geometry.fragments.slice(0, limit ?? geometry.fragments.length);

  // Present from the start — these are part of the complexity, not a reward
  // for reaching the end. They only firm up as they find their places.
  const opacity = useTransform(progress, [0, 0.55, 1], [0.72, 0.8, 1]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity, top: `${box.y * 100}%`, width: box.w, height: box.h }}
      className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      {fragments.map((fragment, index) => (
        <PlacedFragment
          key={fragment.kind}
          fragment={fragment}
          index={index}
          progress={progress}
          scatter={scatter}
          width={width}
          height={height}
        />
      ))}
    </motion.div>
  );
}

interface PlacedFragmentProps {
  progress: MotionValue<number>;
  fragment: SystemFragment;
  index: number;
  scatter: number;
  width: number;
  height: number;
}

function PlacedFragment({
  progress,
  fragment,
  index,
  scatter,
  width,
  height,
}: PlacedFragmentProps) {
  const [start, end] = HERO_SYSTEM.fragmentWindow;

  // One composed transform string per fragment rather than four motion values
  // wired to x, y, rotate and scale separately.
  // The stagger moves the *start* of this fragment's window, so the span has
  // to be measured from the moved start. Dividing by the unstaggered span
  // instead leaves the last piece short of its final position.
  const from = start + index * 0.05;
  const transform = useTransform(progress, (value) => {
    const t = smoothstep((value - from) / (end - from));
    const k = scatter * (1 - t);
    const x = fragment.ox * width * k;
    const y = fragment.oy * height * k;
    const rotate = fragment.rot * k;
    const scale = 1 + (fragment.scale - 1) * k;
    return `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${rotate.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
  });

  return (
    <motion.div
      style={{
        transform,
        left: fragment.x,
        top: fragment.y,
        width: fragment.w,
        height: fragment.h,
      }}
      className="absolute rounded-sm border border-ink/[0.14] bg-paper-panel"
    >
      <FragmentContent fragment={fragment} />
    </motion.div>
  );
}

/** A hairline bar. The only primitive any of these fragments is made of. */
function Bar({ className }: { className: string }) {
  return <span className={`block rounded-[1px] ${className}`} />;
}

/**
 * Deliberately wordless. "UI fragments" here means the *shape* of an
 * interface — a header, a list, a field, a figure — and the moment one of
 * these carries a number or a label it stops being a metaphor and starts
 * making a claim about a product that does not exist.
 */
function FragmentContent({ fragment }: { fragment: SystemFragment }) {
  switch (fragment.kind) {
    case "toolbar":
      return (
        <div className="flex h-full items-center gap-2 px-2.5">
          <Bar className="h-2 w-2 bg-ink/20" />
          <Bar className="bg-ink/12 h-2 w-2" />
          <Bar className="bg-ink/12 h-2 w-2" />
          <span className="mx-1 h-3 w-px bg-ink/10" />
          <Bar className="bg-ink/12 h-1.5 w-16" />
          <Bar className="ml-auto h-2 w-10 bg-brand/40" />
        </div>
      );

    case "rail":
      return (
        <div className="flex h-full flex-col items-center justify-center gap-2.5">
          <Bar className="h-1.5 w-1.5 bg-brand/50" />
          <Bar className="bg-ink/16 h-1.5 w-1.5" />
          <Bar className="bg-ink/16 h-1.5 w-1.5" />
          <Bar className="bg-ink/16 h-1.5 w-1.5" />
        </div>
      );

    case "rows":
      return (
        <div className="flex h-full flex-col justify-center gap-2 px-3">
          <Bar className="bg-ink/14 h-1.5 w-full" />
          <Bar className="h-1.5 w-4/5 bg-ink/10" />
          <Bar className="h-1.5 w-full bg-ink/10" />
          <Bar className="h-1.5 w-3/5 bg-ink/10" />
        </div>
      );

    case "tile":
      return (
        <div className="flex h-full flex-col justify-center gap-2 px-3">
          <Bar className="bg-ink/14 h-1 w-8" />
          <Bar className="h-3 w-full bg-ink/[0.09]" />
          <Bar className="h-1 w-12 bg-brand/45" />
        </div>
      );

    case "field":
    default:
      return (
        <div className="flex h-full flex-col justify-center gap-2 px-3">
          <Bar className="bg-ink/14 h-1 w-10" />
          <Bar className="h-4 w-full border border-ink/10 bg-ink/[0.04]" />
        </div>
      );
  }
}
