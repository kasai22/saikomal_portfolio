import { RevealSection } from "@/components/ui/reveal-section";
import { RevealItem } from "@/components/ui/reveal-item";
import { SectionDivider } from "@/features/home/components/section-divider";
import { CaseStudyCard } from "@/features/home/components/case-study-card";
import { CodingProjectCard } from "@/features/home/components/coding-project-card";
import { GraphicProjectCard } from "@/features/home/components/graphic-project-card";
import { CASE_STUDIES, CODING_PROJECTS, GRAPHIC_PROJECTS } from "@/features/home/constants/data";

export function ProjectsSection() {
  return (
    <RevealSection id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <RevealItem className="mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand">
            My Work
          </span>
          <h2 className="mt-2 text-4xl font-bold sm:text-5xl">
            Selected <span className="text-brand">Projects</span>
          </h2>
          <p className="mt-4 max-w-xl text-white/60">
            Product design case studies, live websites I&apos;ve built, and graphic design work —
            spanning UX strategy, frontend development, and visual craft.
          </p>
        </RevealItem>

        {/* Product Case Studies */}
        <RevealItem className="mb-6">
          <SectionDivider
            number="01"
            title="Product Case Studies"
            subtitle="End-to-end UX design, research, and product strategy"
          />
        </RevealItem>
        <div className="mb-20 grid grid-cols-1 gap-6">
          {CASE_STUDIES.map((project, i) => (
            <RevealItem key={project.title} delayMs={i * 80}>
              <CaseStudyCard project={project} />
            </RevealItem>
          ))}
        </div>

        {/* Coding Projects */}
        <RevealItem delayMs={100} className="mb-6">
          <SectionDivider
            number="02"
            title="Coding Projects"
            subtitle="Live websites built with Next.js, TypeScript & Tailwind CSS"
          />
        </RevealItem>
        <div className="mb-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          {CODING_PROJECTS.map((project, i) => (
            <RevealItem key={project.title} delayMs={120 + i * 80}>
              <CodingProjectCard project={project} />
            </RevealItem>
          ))}
        </div>

        {/* Graphic Design */}
        <RevealItem delayMs={200} className="mb-6">
          <SectionDivider
            number="03"
            title="Graphic Design"
            subtitle="Brand identity, visual communication, and creative direction"
          />
        </RevealItem>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {GRAPHIC_PROJECTS.map((project, i) => (
            <RevealItem key={project.title} delayMs={220 + i * 80}>
              <GraphicProjectCard project={project} />
            </RevealItem>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
