import { ScaleReveal } from "@/components/animations/ScaleReveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { HomeSection } from "@/features/home/components/home-section";
import { SectionHeading } from "@/features/home/components/section-heading";
import { FeaturedProjectPanel } from "@/features/home/components/featured-project-panel";
import { CaseStudyCard } from "@/features/home/components/case-study-card";
import { STAGGER } from "@/lib/animations/constants";
import { CASE_STUDIES, DECK, SLIDE_INTRO } from "@/features/home/constants/data";

/**
 * Slide 01 — the work leads, as it does on the reference site. Editorial
 * hierarchy rather than a uniform grid: one dominant featured panel, then
 * compact cards, each leading with its outcome figures.
 */
export function SelectedWorkSection() {
  const [featured, ...others] = CASE_STUDIES;

  return (
    <HomeSection id="projects">
      <SectionHeading
        chapter={DECK.work.chapter}
        eyebrow={DECK.work.eyebrow}
        title={
          <>
            Three systems, <span className="text-brand-ink">in production</span>.
          </>
        }
        intro={SLIDE_INTRO.work}
      />

      <div className="flex flex-col gap-5">
        {featured && (
          <ScaleReveal>
            <FeaturedProjectPanel project={featured} />
          </ScaleReveal>
        )}
        <Stagger step={STAGGER.loose} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {others.map((project) => (
            <StaggerItem key={project.title} variant="scale">
              <CaseStudyCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </HomeSection>
  );
}
