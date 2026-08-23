import { RevealSection } from "@/components/ui/reveal-section";
import { RevealItem } from "@/components/ui/reveal-item";
import { SectionHeading } from "@/features/home/components/section-heading";
import { HowIThinkStep } from "@/features/home/components/how-i-think-step";
import { PROCESS_STEPS } from "@/features/home/constants/data";

export function HowIThinkSection() {
  return (
    <RevealSection id="how-i-think" className="bg-white/[0.02] px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Process"
          title={
            <>
              How I <span className="text-brand">think</span>
            </>
          }
          intro="Five stages, each with something real to hand over at the end of it."
        />

        {/* Horizontal flow on desktop, vertical timeline on mobile — same five
            steps, connected by a single line rather than five identical cards. */}
        <div className="relative flex flex-col gap-5 lg:flex-row lg:gap-3">
          <div
            className="absolute left-[13px] top-0 h-full w-px bg-gradient-to-b from-brand/40 via-white/10 to-transparent lg:left-0 lg:top-[13px] lg:h-px lg:w-full lg:bg-gradient-to-r"
            aria-hidden="true"
          />
          {PROCESS_STEPS.map((step, i) => (
            <RevealItem key={step.number} delayMs={i * 90} className="flex-1">
              <HowIThinkStep step={step} />
            </RevealItem>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
