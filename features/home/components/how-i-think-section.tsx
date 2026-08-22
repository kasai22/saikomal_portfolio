import { RevealSection } from "@/components/ui/reveal-section";
import { RevealItem } from "@/components/ui/reveal-item";
import { HowIThinkStep } from "@/features/home/components/how-i-think-step";
import { PROCESS_STEPS } from "@/features/home/constants/data";

export function HowIThinkSection() {
  return (
    <RevealSection id="how-i-think" className="bg-white/[0.02] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <RevealItem className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">Process</span>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            How I <span className="text-brand">Think</span>
          </h2>
        </RevealItem>

        {/* Horizontal flow on desktop, vertical timeline on mobile — same five
            steps, connected by a single line rather than five identical cards. */}
        <div className="relative flex flex-col gap-6 lg:flex-row lg:gap-4">
          <div
            className="absolute left-4 top-0 h-full w-px bg-white/10 lg:left-0 lg:top-9 lg:h-px lg:w-full"
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
