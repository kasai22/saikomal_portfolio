import { ScaleReveal } from "@/components/animations/ScaleReveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { HomeSection } from "@/features/home/components/home-section";
import { WorkHeading } from "@/features/home/components/work-heading";
import { FeaturedProjectPanel } from "@/features/home/components/featured-project-panel";
import { CaseStudyCard } from "@/features/home/components/case-study-card";
import { STAGGER } from "@/lib/animations/constants";
import { CASE_STUDIES, DECK, SLIDE_INTRO } from "@/features/home/constants/data";

/**
 * Slide 01 — the work leads, as it does on the reference site. Editorial
 * hierarchy rather than a uniform grid: one dominant featured panel, then
 * compact cards, each leading with its outcome figures.
 *
 * This is also where the hero lands. Each card's image slot is numbered
 * (`slot`), and the matching tile in the hero's visual column travels into it
 * as the reader scrolls — same project, same image file, one instance of each.
 * Nothing here is duplicated, wrapped or transformed to make that work: the
 * assembly layer is a sibling that measures these elements and hands over to
 * them. The heading is scrubbed by the same progress for the same reason —
 * see `work-heading.tsx`.
 */
export function SelectedWorkSection() {
  const [featured, ...others] = CASE_STUDIES;

  return (
    <HomeSection id="projects">
      <WorkHeading
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
            <FeaturedProjectPanel project={featured} slot={0} />
          </ScaleReveal>
        )}
        <Stagger step={STAGGER.loose} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {others.map((project, i) => (
            <StaggerItem key={project.title} variant="scale">
              <CaseStudyCard project={project} slot={i + 1} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </HomeSection>
  );
}
