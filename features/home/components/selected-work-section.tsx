import { ScaleReveal } from "@/components/animations/ScaleReveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { HomeSection } from "@/features/home/components/home-section";
import { WorkHeading } from "@/features/home/components/work-heading";
import { FeaturedProjectPanel } from "@/features/home/components/featured-project-panel";
import { CaseStudyCard } from "@/features/home/components/case-study-card";
import { STAGGER } from "@/lib/animations/constants";
import { CASE_STUDIES, DECK, SLIDE_INTRO, heroSlotFor } from "@/features/home/constants/data";

/**
 * Slide 01 — Selected UX & product experience. All five projects, in résumé
 * order: REX leads as the featured panel, then four compact cards. Editorial
 * hierarchy rather than a uniform grid, and every value on every card comes
 * from `constants/projects.ts` — only Kudra shows figures, because only
 * Kudra has measured outcomes.
 *
 * This is also where the hero lands. Three of these cards — the three with a
 * real product screen, REX, Kudra and ClappIt — carry a numbered image slot
 * (`heroSlotFor`), and the matching tile in the hero's visual column travels
 * into it as the reader scrolls. Same project, same image file, one instance
 * of each. The others simply have no slot, and nothing flies into them. The
 * heading is scrubbed by the same progress for the same reason — see
 * `work-heading.tsx`.
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
            Five products, from AI recommendations to{" "}
            <span className="text-brand-ink">fleet operations</span>.
          </>
        }
        intro={SLIDE_INTRO.work}
      />

      <div className="flex flex-col gap-5">
        {featured && (
          <ScaleReveal>
            <FeaturedProjectPanel project={featured} slot={heroSlotFor(featured)} />
          </ScaleReveal>
        )}
        <Stagger step={STAGGER.loose} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {others.map((project) => (
            <StaggerItem key={project.id} variant="scale">
              <CaseStudyCard project={project} slot={heroSlotFor(project)} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </HomeSection>
  );
}
