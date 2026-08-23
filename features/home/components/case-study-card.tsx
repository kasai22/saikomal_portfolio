import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { GlassSurface } from "@/components/ui/glass-surface";
import { TiltCard, GlassHighlight } from "@/components/ui/tilt-card";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { MetricRow } from "@/features/home/components/metric-row";
import { cssVars } from "@/lib/css-vars";
import type { CaseStudyProject } from "@/features/home/types";

interface CaseStudyCardProps {
  project: CaseStudyProject;
}

/**
 * Compact secondary/tertiary card — used for every case study other than
 * the featured one, so "Selected Work" reads at a mix of visual scales
 * instead of a repeated grid of identical cards. The outcome figures sit
 * on the card itself; the description is one line.
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
          <div className="relative h-40 shrink-0 overflow-hidden">
            <ParallaxImage
              src={project.image}
              alt={`${project.title} — interface preview`}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
          </div>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <div className="flex items-center gap-2">
              <span className="t-eyebrow [color:var(--accent)]">Case Study</span>
              <span className="h-1 w-1 rounded-full bg-white/20" aria-hidden="true" />
              <span className="t-eyebrow text-white/35">{project.year}</span>
              <span className="ml-auto t-meta text-white/30">{project.readMins} min</span>
            </div>

            <h3 className="t-h3 text-white">{project.title}</h3>
            <p className="t-meta flex-1 text-white/50">{project.description}</p>

            <MetricRow metrics={project.metrics} className="border-t border-white/10 pt-3.5" />

            <ul className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 2).map((tag) => (
                <li key={tag} className="t-chip">
                  {tag}
                </li>
              ))}
            </ul>

            <div className="t-action flex items-center gap-1.5 pt-0.5 transition-all duration-200 [color:var(--accent)] group-hover:gap-2.5">
              Read case study
              <ArrowRightIcon className="h-3 w-3" />
            </div>
          </div>
          <GlassHighlight />
        </GlassSurface>
      </TiltCard>
    </Link>
  );
}
