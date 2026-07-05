import type { GraphicProject } from "@/features/home/types";

interface GraphicProjectCardProps {
  project: GraphicProject;
}

export function GraphicProjectCard({ project }: GraphicProjectCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-200 hover:border-white/20">
      <div className="mb-4 text-3xl" style={{ color: project.accent }} aria-hidden="true">
        {project.icon}
      </div>
      <h4 className="mb-2 font-bold text-white">{project.title}</h4>
      <p className="mb-4 text-sm leading-relaxed text-white/55">{project.description}</p>
      <ul className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/50"
          >
            {tag}
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t border-white/[0.08] pt-4">
        <span className="text-xs italic text-white/25">Portfolio pieces available on request</span>
      </div>
    </div>
  );
}
