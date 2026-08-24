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
import { CASE_STUDIES } from "@/features/home/constants/data";
import type { CaseStudyProject } from "@/features/home/types";

interface FragmentConfig {
  project: CaseStudyProject;
  size: number;
  depth: number;
  positionClassName: string;
}

// Same projects, same order as the featured panel in "Selected Work" below —
// Kudra (the featured case study) stays the largest, nearest tile here too,
// so the hero and the work section read as the same object at two scales.
const FRAGMENTS: FragmentConfig[] = CASE_STUDIES.map((project, i) => ({
  project,
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
 * Real fragments of shipped work (Kudra / REX / HSL), scattered across the
 * hero's visual column instead of one abstract dashboard mockup.
 *
 * Each tile gets its own depth tier derived from the hero's single scroll
 * subscription and single pointer listener — three tiles, three depths, one
 * of each listener. Each also carries the shared tactile hover (tilt, glass
 * highlight) and links straight to its case study.
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
 */
export function HeroWorkFragmentsMobile() {
  return (
    <div className="flex w-full gap-3 lg:hidden">
      {CASE_STUDIES.map((project) => (
        <FragmentCard key={project.slug + project.title} project={project} className="h-24 flex-1" />
      ))}
    </div>
  );
}

function FragmentTile({
  project,
  size,
  depth,
  positionClassName,
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
        <FragmentCard project={project} style={{ width: size, height: size }} />
      </ParallaxLayer>
    </ParallaxLayer>
  );
}

function FragmentCard({
  project,
  className,
  style,
}: {
  project: CaseStudyProject;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Link
      href={project.slug}
      data-cursor="view"
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
            alt={project.title}
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
            <p className="line-clamp-1 text-xs font-semibold text-paper">{project.title}</p>
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
