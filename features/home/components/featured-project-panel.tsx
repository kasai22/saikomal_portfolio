import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { Panel } from "@/components/ui/panel";
import { TiltCard, GlassHighlight } from "@/components/ui/tilt-card";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { MetricRow } from "@/features/home/components/metric-row";
import { cssVars } from "@/lib/css-vars";
import type { CaseStudyProject } from "@/features/home/types";

interface FeaturedProjectPanelProps {
  project: CaseStudyProject;
}

/**
 * The large, dominant panel for the top case study — visually distinct from
 * the compact cards below it, so "Selected Work" reads as an editorial
 * composition rather than a repeated grid. Glass is the frame; the real
 * product screenshot stays the focal point, and the outcome figures carry
 * the weight the description paragraph used to.
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
        <Panel
          level={3}
          className="relative overflow-hidden transition-colors duration-300 hover:[border-color:var(--accent)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative order-2 h-64 overflow-hidden lg:order-1 lg:h-full lg:min-h-[380px]">
              <ParallaxImage
                src={project.image}
                alt={`${project.title} — dashboard interface`}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r"
                aria-hidden="true"
              />
            </div>

            <div className="order-1 flex flex-col justify-center gap-4 p-6 lg:order-2 lg:p-9">
              <div className="flex items-center gap-2.5">
                <span className="t-eyebrow rounded-full border border-[color:var(--accent)] px-2.5 py-1 [color:var(--accent)]">
                  Featured
                </span>
                <span className="t-eyebrow text-ink/60">{project.year}</span>
                <span className="ml-auto t-meta text-ink/60">{project.readMins} min read</span>
              </div>

              <h3 className="text-lg font-semibold leading-snug tracking-[-0.01em] text-ink lg:text-xl">
                {project.title}
              </h3>
              <p className="t-body text-ink/62">{project.description}</p>

              <MetricRow metrics={project.metrics} className="border-y border-ink/12 py-4" />

              <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                <div>
                  <dt className="t-eyebrow text-ink/60">Role</dt>
                  <dd className="t-meta mt-1 text-ink/75">{project.role}</dd>
                </div>
                <div>
                  <dt className="t-eyebrow text-ink/60">Timeline</dt>
                  <dd className="t-meta mt-1 text-ink/75">{project.timeline}</dd>
                </div>
              </dl>

              <ul className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <li key={tag} className="t-chip">
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="t-action flex items-center gap-1.5 transition-all duration-200 [color:var(--accent)] group-hover:gap-3">
                Read case study
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
          <GlassHighlight />
        </Panel>
      </TiltCard>
    </Link>
  );
}
