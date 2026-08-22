import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { GlassSurface } from "@/components/ui/glass-surface";
import { TiltCard, GlassHighlight } from "@/components/ui/tilt-card";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { cssVars } from "@/lib/css-vars";
import type { CaseStudyProject } from "@/features/home/types";

interface FeaturedProjectPanelProps {
  project: CaseStudyProject;
}

/**
 * The large, dominant panel for the top case study — visually distinct from
 * the compact cards below it, so "Selected Work" reads as an editorial
 * composition rather than a repeated grid. Glass is the frame; the real
 * product screenshot stays the focal point.
 */
export function FeaturedProjectPanel({ project }: FeaturedProjectPanelProps) {
  return (
    <Link
      href={project.slug}
      style={cssVars({ "--accent": project.accentColor })}
      className="group block"
      data-cursor="view"
    >
      <TiltCard maxDeg={2.5}>
        <GlassSurface
          level={3}
          className="relative overflow-hidden transition-colors duration-300 hover:[border-color:var(--accent)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative order-2 h-72 overflow-hidden lg:order-1 lg:h-full lg:min-h-[420px]">
              <ParallaxImage
                src={project.image}
                alt={project.title}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r" />
            </div>

          <div className="order-1 flex flex-col justify-center gap-5 p-6 lg:order-2 lg:p-10">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-[color:var(--accent)] px-3 py-1 text-xs font-semibold uppercase tracking-widest [color:var(--accent)]">
                Featured Case Study
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                {project.year}
              </span>
            </div>

            <h3 className="text-xl font-bold leading-tight text-white lg:text-2xl">{project.title}</h3>
            <p className="text-sm leading-relaxed text-white/60">{project.description}</p>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-y border-white/10 py-4 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-xs uppercase tracking-widest text-white/40">Role</dt>
                <dd className="mt-1 text-white/80">{project.role}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-white/40">Timeline</dt>
                <dd className="mt-1 text-white/80">{project.timeline}</dd>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <dt className="text-xs uppercase tracking-widest text-white/40">Goal</dt>
                <dd className="mt-1 text-white/80">{project.businessGoal}</dd>
              </div>
            </dl>

            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                  {tag}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 [color:var(--accent)] group-hover:gap-4">
              View Case Study
              <ArrowRightIcon className="h-4 w-4" />
            </div>
          </div>
          </div>
          <GlassHighlight />
        </GlassSurface>
      </TiltCard>
    </Link>
  );
}
