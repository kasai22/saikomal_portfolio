import { ExternalLinkIcon } from "@/components/icons";
import { GlassSurface } from "@/components/ui/glass-surface";
import { TiltCard, GlassHighlight } from "@/components/ui/tilt-card";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { cssVars } from "@/lib/css-vars";
import type { CodingProject } from "@/features/home/types";

interface CodingProjectCardProps {
  project: CodingProject;
}

export function CodingProjectCard({ project }: CodingProjectCardProps) {
  return (
    <TiltCard maxDeg={5} className="h-full">
      <GlassSurface
        as="a"
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="view"
        level={2}
        style={cssVars({ "--accent": project.accent })}
        className="group relative flex h-full flex-col overflow-hidden transition-colors duration-300 hover:[border-color:var(--accent)]"
      >
        <div className="relative h-40 shrink-0 overflow-hidden bg-[#0e0e0e]">
          {project.image ? (
            <>
              <ParallaxImage
                src={project.image}
                alt={`${project.title} — live website`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
            </>
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background: `radial-gradient(ellipse at center, ${project.accent}18, transparent 70%), #0e0e0e`,
              }}
              aria-hidden="true"
            >
              <span className="text-3xl font-black opacity-20 [color:var(--accent)]">
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/70 px-2.5 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/70">Live</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2.5 p-5">
          <div className="flex items-baseline gap-2">
            <h3 className="t-h3 text-white">{project.title}</h3>
            <span className="t-eyebrow ml-auto text-white/30">{project.year}</span>
          </div>
          <p className="t-meta [color:var(--accent)]">{project.tagline}</p>
          <p className="t-meta flex-1 text-white/45">{project.description}</p>

          <ul className="flex flex-wrap gap-1.5 pt-0.5">
            {project.tech.map((tech) => (
              <li
                key={tech}
                style={{
                  borderColor: project.accent + "44",
                  color: project.accent,
                  backgroundColor: project.accent + "0f",
                }}
                className="rounded-full border px-2 py-0.5 text-[10px] font-medium leading-normal"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="t-action flex items-center gap-1.5 pt-0.5 transition-all duration-200 [color:var(--accent)] group-hover:gap-2.5">
            Visit site
            <ExternalLinkIcon className="h-3 w-3" />
          </div>
        </div>
        <GlassHighlight />
      </GlassSurface>
    </TiltCard>
  );
}
