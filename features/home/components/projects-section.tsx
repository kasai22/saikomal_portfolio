import { RevealSection } from "@/components/ui/reveal-section";
import { RevealItem } from "@/components/ui/reveal-item";
import { SectionHeading } from "@/features/home/components/section-heading";
import { SectionDivider } from "@/features/home/components/section-divider";
import { FeaturedProjectPanel } from "@/features/home/components/featured-project-panel";
import { CaseStudyCard } from "@/features/home/components/case-study-card";
import { CodingProjectCard } from "@/features/home/components/coding-project-card";
import { CASE_STUDIES, CODING_PROJECTS } from "@/features/home/constants/data";

export function ProjectsSection() {
  const [featuredCaseStudy, ...otherCaseStudies] = CASE_STUDIES;

  return (
    <RevealSection id="projects" className="px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Work"
          title={
            <>
              Selected <span className="text-brand">work</span>
            </>
          }
          intro="Logistics, SaaS dashboards and operational systems — research through to shipped code."
        />

        {/* Product Case Studies — editorial hierarchy: one dominant featured
            panel, then a compact grid, instead of a repeated card grid. */}
        <RevealItem className="mb-5">
          <SectionDivider number="01" title="Case Studies" subtitle="End to end, research to code" />
        </RevealItem>
        <div className="mb-12 flex flex-col gap-5">
          {featuredCaseStudy && (
            <RevealItem layered>
              <FeaturedProjectPanel project={featuredCaseStudy} />
            </RevealItem>
          )}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {otherCaseStudies.map((project, i) => (
              <RevealItem key={project.title} layered delayMs={i * 100}>
                <CaseStudyCard project={project} />
              </RevealItem>
            ))}
          </div>
        </div>

        {/* Coding Projects */}
        <RevealItem delayMs={100} className="mb-5">
          <SectionDivider number="02" title="Shipped Code" subtitle="Live sites — Next.js, TypeScript, Tailwind" />
        </RevealItem>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
