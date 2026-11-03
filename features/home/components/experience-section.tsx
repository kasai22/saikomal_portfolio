import { HomeSection } from "@/features/home/components/home-section";
import { SectionHeading } from "@/features/home/components/section-heading";
import { ExperienceTimeline } from "@/features/home/components/experience-timeline";
import { DECK, SLIDE_INTRO } from "@/features/home/constants/data";
import { EXPERIENCE } from "@/constants/profile";

/**
 * Slide 05 — professional experience. Four roles with their exact résumé
 * titles and dates, read from `constants/profile.ts`.
 */
export function ExperienceSection() {
  return (
    <HomeSection
      id="experience"
      tone="raised"
      glowClassName="left-[15%] bottom-0 h-72 w-72 rounded-full bg-brand/[0.12] blur-3xl"
    >
      <SectionHeading
        chapter={DECK.track.chapter}
        eyebrow={DECK.track.eyebrow}
        title={
          <>
            Data, then design, then <span className="text-brand-ink">AI products</span>.
          </>
        }
        intro={SLIDE_INTRO.track}
      />
      <ExperienceTimeline entries={EXPERIENCE} />
    </HomeSection>
  );
}
