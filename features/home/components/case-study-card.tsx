import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { GlassSurface } from "@/components/ui/glass-surface";
import { TiltCard, GlassHighlight } from "@/components/ui/tilt-card";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { cssVars } from "@/lib/css-vars";
import type { CaseStudyProject } from "@/features/home/types";

interface CaseStudyCardProps {
  project: CaseStudyProject;
}

/**
 * Compact secondary/tertiary card — used for every case study other than
 * the featured one, so "Selected Work" reads at a mix of visual scales
 * instead of a repeated grid of identical cards.
 */
export function CaseStudyCard({ project }: CaseStudyCardProps) {
  return (
    <Link
      href={project.slug}
      style={cssVars({ "--accent": project.accentColor })}
      className="group block h-full"
      data-cursor="view"
    >
      <TiltCard maxDeg={5} className="h-full">
        <GlassSurface
          level={2}
          className="relative flex h-full flex-col overflow-hidden transition-colors duration-300 hover:[border-color:var(--accent)]"
        >
          <div className="relative h-44 shrink-0 overflow-hidden">
            <ParallaxImage
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="transition-transform duration-500 group-hover:scale-105"
            />
          </div>

        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest [color:var(--accent)]">
              Case Study
            </span>
            <span className="h-1 w-1 rounded-full bg-white/20" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest text-white/40">{project.year}</span>
          </div>
          <h3 className="text-lg font-bold leading-tight text-white">{project.title}</h3>
          <p className="flex-1 text-sm leading-relaxed text-white/55">{project.role}</p>
          <ul className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 2).map((tag) => (
              <li key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/55">
                {tag}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 pt-1 text-sm font-semibold transition-all duration-200 [color:var(--accent)] group-hover:gap-3">
            View Case Study
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </div>
        </div>
          <GlassHighlight />
        </GlassSurface>
      </TiltCard>
    </Link>
  );
}
