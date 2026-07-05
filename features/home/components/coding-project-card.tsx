import Image from "next/image";
import { ExternalLinkIcon } from "@/components/icons";
import { cssVars } from "@/lib/css-vars";
import type { CodingProject } from "@/features/home/types";

interface CodingProjectCardProps {
  project: CodingProject;
}

export function CodingProjectCard({ project }: CodingProjectCardProps) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      style={cssVars({ "--accent": project.accent })}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:[border-color:var(--accent)]"
    >
      <div className="relative h-48 shrink-0 overflow-hidden bg-[#0e0e0e]">
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </>
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background: `radial-gradient(ellipse at center, ${project.accent}18, transparent 70%), #0e0e0e`,
            }}
          >
            <span className="text-5xl font-black opacity-20 [color:var(--accent)]">
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/70 px-3 py-1 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
          <span className="text-xs font-medium text-white/70">Live</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-xs font-semibold uppercase tracking-widest text-white/35">
          {project.year}
        </span>
        <h4 className="text-lg font-bold leading-tight text-white">{project.title}</h4>
        <p className="text-xs italic leading-relaxed text-white/45">{project.tagline}</p>
        <p className="flex-1 text-sm leading-relaxed text-white/60">{project.description}</p>

        <ul className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.map((tech) => (
            <li
              key={tech}
              style={{
                borderColor: project.accent + "44",
                color: project.accent,
                backgroundColor: project.accent + "0f",
              }}
              className="rounded-full border px-2.5 py-1 text-xs font-medium"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 pt-1 text-sm font-semibold transition-all duration-200 [color:var(--accent)] group-hover:gap-3">
          View Live Site
          <ExternalLinkIcon className="h-3.5 w-3.5" />
        </div>
      </div>
    </a>
  );
}
