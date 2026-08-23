import { RevealItem } from "@/components/ui/reveal-item";
import { HomeSection } from "@/features/home/components/home-section";
import { SectionHeading } from "@/features/home/components/section-heading";
import { CodingProjectCard } from "@/features/home/components/coding-project-card";
import { CODING_PROJECTS, DECK, SLIDE_INTRO } from "@/features/home/constants/data";

/** Slide 03 — the development work, separated from the design catalogue. */
export function DevelopmentSection() {
  return (
    <HomeSection id="development">
      <SectionHeading
        chapter={DECK.development.chapter}
        eyebrow={DECK.development.eyebrow}
        title={
          <>
            Three sites I designed <span className="text-brand-ink">and shipped</span>.
          </>
        }
        intro={SLIDE_INTRO.development}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {CODING_PROJECTS.map((project, i) => (
          <RevealItem key={project.title} layered delayMs={i * 100}>
            <CodingProjectCard project={project} />
          </RevealItem>
        ))}
      </div>
    </HomeSection>
  );
}
