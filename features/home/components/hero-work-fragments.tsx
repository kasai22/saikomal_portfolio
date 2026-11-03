"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { type MotionValue } from "motion/react";
import { Panel } from "@/components/ui/panel";
import { TiltCard, GlassHighlight } from "@/components/ui/tilt-card";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { ParallaxLayer } from "@/components/animations/Parallax";
import { CARD, PARALLAX, POINTER } from "@/lib/animations/constants";
import { useParallaxTier, usePointerTier } from "@/hooks/use-scroll-tier";
import { cssVars } from "@/lib/css-vars";
import { HERO_PIECES } from "@/features/home/constants/data";

type HeroPiece = (typeof HERO_PIECES)[number];

interface FragmentConfig {
  project: HeroPiece;
  size: number;
  depth: number;
  positionClassName: string;
  /**
   * This tile's index in the hero → work assembly. The tile is the *source*
   * of the flight that ends inside the matching case-study card, and is found
   * by `[data-hero-piece]` rather than by a ref, because the layer that flies
   * it is a sibling of the hero rather than a child of it.
   */
  index: number;
}

// Same projects, same order as the cards they fly into in "Selected Work"
// below — REX (the featured case study) is the largest, nearest tile here
// too, so the hero and the work section read as the same object at two
// scales. Only projects with a real product screen are pieces.
const FRAGMENTS: FragmentConfig[] = HERO_PIECES.map((project, i) => ({
  project,
  index: i,
  size: [216, 168, 132][i] ?? 132,
  depth: [1, 0.72, 0.5][i] ?? 0.5,
  positionClassName:
    [
      "right-0 top-0 rotate-[-2deg]",
      "right-[188px] top-[150px] z-10 rotate-[3deg]",
      "right-4 top-[250px] rotate-[-4deg]",
    ][i] ?? "",
}));

interface HeroWorkFragmentsDesktopProps {
  /** The hero section's own scroll progress — not a new subscription. */
  progress: MotionValue<number>;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  enabled: boolean;
}

/**
 * Real fragments of the work (REX / Kudra / ClappIt), scattered across the
 * hero's visual column instead of one abstract dashboard mockup.
 *
 * Each tile gets its own depth tier derived from the hero's single scroll
 * subscription and single pointer listener — three tiles, three depths, one
 * of each listener. Each also carries the shared tactile hover (tilt, glass
 * highlight) and links straight to its case study.
 *
 * These three tiles are also the pieces the hand-off is made of. Each carries
 * `data-hero-piece`, and as the reader scrolls it travels out of here and into
 * the matching card in Selected Work — the same image file, arriving at the
 * slot it was always going to fill. While a tile is in flight this one is held
 * at `opacity: 0` and made unclickable by the assembly layer, so there is
 * never a second copy of it on screen.
 */
export function HeroWorkFragmentsDesktop({
  progress,
  mouseX,
  mouseY,
  enabled,
}: HeroWorkFragmentsDesktopProps) {
  return (
    <div className="relative hidden h-[400px] w-[420px] shrink-0 lg:block">
      {FRAGMENTS.map((fragment) => (
        <FragmentTile
          key={fragment.project.slug + fragment.project.title}
          {...fragment}
          progress={progress}
          mouseX={mouseX}
          mouseY={mouseY}
          enabled={enabled}
        />
      ))}
    </div>
  );
}

/**
 * Compact static row for small/touch screens — the same real fragments, no
 * absolute scatter and no pointer parallax, sitting between the copy and the
 * CTA row.
 *
 * These carry `data-hero-piece` as well, and that is not redundant. Between
 * `md` and `lg` the assembly runs but the scattered column above is
 * `display: none`, so this row is the only source that has a box on screen —
 * the tablet hand-off flies from here instead, three small tiles in a line
 * rather than a scattered stack. The assembly picks whichever pair actually
 * has a rect; see `ends()` in `hero-work-assembly.tsx`.
 */
export function HeroWorkFragmentsMobile() {
  return (
    <div className="flex w-full gap-3 lg:hidden">
      {HERO_PIECES.map((project, i) => (
        <FragmentCard
          key={project.slug + project.title}
          project={project}
          slot={i}
          className="h-24 flex-1"
        />
      ))}
    </div>
  );
}

function FragmentTile({
  project,
  size,
  depth,
  positionClassName,
  index,
  progress,
  mouseX,
  mouseY,
  enabled,
}: FragmentConfig & HeroWorkFragmentsDesktopProps) {
  const y = useParallaxTier(progress, PARALLAX.base * 1.75 * depth, enabled);
  // Capped at POINTER.near so even the front tile stays inside the
  // 8-15px band the hero brief sets; the rest scale down by depth.
  const mx = usePointerTier(mouseX, POINTER.near * depth, enabled);
  const my = usePointerTier(mouseY, POINTER.near * depth, enabled);

  return (
    <ParallaxLayer y={y} className={`absolute ${positionClassName}`}>
      <ParallaxLayer x={mx} y={my}>
        <FragmentCard project={project} slot={index} style={{ width: size, height: size }} />
      </ParallaxLayer>
    </ParallaxLayer>
  );
}

function FragmentCard({
  project,
  className,
  style,
  slot,
}: {
  project: HeroPiece;
  className?: string;
  style?: CSSProperties;
  slot?: number;
}) {
  return (
    <Link
      href={project.slug}
      data-cursor="view"
      data-hero-piece={slot}
      style={{ ...cssVars({ "--accent": project.accentColor }), ...style }}
      className={`group block ${className ?? ""}`}
    >
      <TiltCard maxDeg={CARD.tiltFragment} className="h-full w-full">
        <Panel
          level={3}
          className="relative h-full w-full overflow-hidden transition-colors duration-fast hover:[border-color:var(--accent)]"
        >
          <ParallaxImage
            src={project.image}
            alt={project.imageAlt}
            fill
            range={8}
            sizes="(min-width: 1024px) 260px, 33vw"
            className="object-cover"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/75 to-transparent opacity-0 transition-opacity duration-fast group-hover:opacity-100"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 translate-y-1.5 p-3 opacity-0 transition-all duration-fast group-hover:translate-y-0 group-hover:opacity-100">
            <p className="line-clamp-1 text-xs font-semibold text-paper">{project.name}</p>
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider [color:var(--accent)]">
              {project.tags[0]}
            </p>
          </div>
          <GlassHighlight />
        </Panel>
      </TiltCard>
    </Link>
  );
}
