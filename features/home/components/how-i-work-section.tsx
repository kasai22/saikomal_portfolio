import { RevealItem } from "@/components/ui/reveal-item";
import { Panel } from "@/components/ui/panel";
import { HomeSection } from "@/features/home/components/home-section";
import { SectionHeading } from "@/features/home/components/section-heading";
import { HowIThinkStep } from "@/features/home/components/how-i-think-step";
import { DECK, DESIGN_PHILOSOPHY_QUOTE, PROCESS_STEPS, SLIDE_INTRO } from "@/features/home/constants/data";

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

      <RevealItem className="mb-10">
        <Panel level={3} className="p-6 lg:p-9">
          <span className="mb-2 block text-2xl leading-none text-brand/60" aria-hidden="true">
            &ldquo;
          </span>
          <p className="max-w-3xl text-base font-medium leading-[1.55] text-ink sm:text-lg">
            {DESIGN_PHILOSOPHY_QUOTE}
          </p>
        </Panel>
      </RevealItem>

      {/* Horizontal flow on desktop, vertical timeline on mobile — same five
          steps, connected by a single line rather than five identical cards. */}
      <div className="relative flex flex-col gap-5 lg:flex-row lg:gap-3">
        <div
          className="absolute left-[13px] top-0 h-full w-px bg-gradient-to-b from-brand via-ink/[0.12] to-transparent lg:left-0 lg:top-[13px] lg:h-px lg:w-full lg:bg-gradient-to-r"
          aria-hidden="true"
        />
        {PROCESS_STEPS.map((step, i) => (
          <RevealItem key={step.number} delayMs={i * 90} className="flex-1">
            <HowIThinkStep step={step} />
          </RevealItem>
        ))}
      </div>
    </HomeSection>
  );
}
