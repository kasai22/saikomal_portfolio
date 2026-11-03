import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { HomeSection } from "@/features/home/components/home-section";
import { SectionHeading } from "@/features/home/components/section-heading";
import { EngineeringProjectCard } from "@/features/home/components/engineering-project-card";
import { STAGGER } from "@/lib/animations/constants";
import { DECK, SLIDE_INTRO } from "@/features/home/constants/data";
import { ENGINEERING_PROJECTS } from "@/constants/projects";

/**
 * Slide 02 — Independent engineering projects: products taken from an idea
 * to a working, deployed web application. Each card opens an evidence page
 * (`/engineering/[slug]`) that separates what was designed, implemented,
 * integrated and AI-assisted, and links the live product and — where there
 * is one — the public repository.
 *
 * Two columns of smaller cards rather than the case studies' featured panel,
 * so the engineering work complements the UX work instead of competing with it.
 */
export function EngineeringSection() {
  return (
    <HomeSection id="engineering">
      <SectionHeading
        chapter={DECK.engineering.chapter}
        eyebrow={DECK.engineering.eyebrow}
        title={
          <>
            Products I design, build, <span className="text-brand-ink">and ship</span>.
          </>
        }
        intro={SLIDE_INTRO.engineering}
      />

      <Stagger step={STAGGER.loose} className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {ENGINEERING_PROJECTS.map((project) => (
          <StaggerItem key={project.id} variant="scale">
            <EngineeringProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </HomeSection>
  );
}
