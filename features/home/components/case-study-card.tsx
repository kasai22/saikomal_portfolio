import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { cssVars } from "@/lib/css-vars";
import type { CaseStudyProject } from "@/features/home/types";

interface CaseStudyCardProps {
  project: CaseStudyProject;
}

export function CaseStudyCard({ project }: CaseStudyCardProps) {
  return (
    <Link
      href={project.slug}
      style={cssVars({ "--accent": project.accentColor })}
      className="group block overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-colors duration-300 hover:[border-color:var(--accent)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative h-64 overflow-hidden bg-[#0e0e0e] lg:h-full lg:min-h-[320px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center gap-5 p-8 lg:p-12">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
              {project.year}
            </span>
            <span className="h-1 w-1 rounded-full bg-white/20" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest [color:var(--accent)]">
              Case Study
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white lg:text-3xl">{project.title}</h3>
          <p className="leading-relaxed text-white/60">{project.description}</p>
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
              >
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
    </Link>
  );
}
