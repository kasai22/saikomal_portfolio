import { FadeIn } from "@/components/animations/FadeIn";
import { Panel } from "@/components/ui/panel";
import { HomeSection } from "@/features/home/components/home-section";
import { SectionHeading } from "@/features/home/components/section-heading";
import { ProcessTrack } from "@/features/home/components/process-track";
import { DECK, DESIGN_PHILOSOPHY_QUOTE, SLIDE_INTRO } from "@/features/home/constants/data";

/**
 * Slide 05 — how the work on slides 01–03 actually gets made. The quote
 * states the position; the five stages below it each end in something
 * concrete enough to hand over.
 */
export function HowIWorkSection() {
  return (
    <HomeSection id="how-i-work" tone="raised">
      <SectionHeading
        chapter={DECK.process.chapter}
        eyebrow={DECK.process.eyebrow}
        title={
          <>
            Most design dies at the <span className="text-brand-ink">handoff</span>.
          </>
        }
        intro={SLIDE_INTRO.process}
      />

      <FadeIn direction="up" className="mb-10">
        <Panel level={3} className="p-6 lg:p-9">
          <span className="mb-2 block text-2xl leading-none text-brand/60" aria-hidden="true">
            &ldquo;
          </span>
          <p className="max-w-3xl text-base font-medium leading-[1.55] text-ink sm:text-lg">
            {DESIGN_PHILOSOPHY_QUOTE}
          </p>
        </Panel>
      </FadeIn>

      {/* Horizontal on desktop, vertical on mobile — one progress rail
          either way, with the current stage derived from scroll position. */}
      <ProcessTrack />

    </HomeSection>
  );
}
