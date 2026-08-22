import { RevealSection } from "@/components/ui/reveal-section";
import { RevealItem } from "@/components/ui/reveal-item";
import { SectionDivider } from "@/features/home/components/section-divider";
import { FeaturedProjectPanel } from "@/features/home/components/featured-project-panel";
import { CaseStudyCard } from "@/features/home/components/case-study-card";
import { CodingProjectCard } from "@/features/home/components/coding-project-card";
import { CASE_STUDIES, CODING_PROJECTS } from "@/features/home/constants/data";

export function ProjectsSection() {
  const [featuredCaseStudy, ...otherCaseStudies] = CASE_STUDIES;

  return (
    <RevealSection id="projects" className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <RevealItem className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            Selected Work
          </span>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            Selected <span className="text-brand">Work</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm text-white/60">
            Products, platforms and experiences designed across logistics, SaaS, dashboards and
            operational systems — spanning research, prototyping, and design-to-code translation.
          </p>
        </RevealItem>

        {/* Product Case Studies — editorial hierarchy: one dominant featured
            panel, then a compact grid, instead of a repeated card grid. */}
        <RevealItem className="mb-6">
          <SectionDivider
            number="01"
            title="Product Case Studies"
            subtitle="End-to-end UX research, prototyping, and design-to-code translation"
          />
        </RevealItem>
        <div className="mb-14 flex flex-col gap-6">
          {featuredCaseStudy && (
            <RevealItem layered>
              <FeaturedProjectPanel project={featuredCaseStudy} />
            </RevealItem>
          )}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {otherCaseStudies.map((project, i) => (
              <RevealItem key={project.title} layered delayMs={i * 100}>
                <CaseStudyCard project={project} />
              </RevealItem>
            ))}
          </div>
        </div>

        {/* Coding Projects */}
        <RevealItem delayMs={100} className="mb-6">
          <SectionDivider
            number="02"
            title="Coding Projects"
            subtitle="Live websites built with Next.js, TypeScript & Tailwind CSS"
          />
        </RevealItem>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {CODING_PROJECTS.map((project, i) => (
            <RevealItem key={project.title} layered delayMs={i * 100}>
              <CodingProjectCard project={project} />
            </RevealItem>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
