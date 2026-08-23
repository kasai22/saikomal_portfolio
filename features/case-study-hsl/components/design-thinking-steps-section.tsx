import { SectionHeading } from "@/components/case-study/section-heading";
import { SurfaceCard } from "@/components/case-study/surface-card";
import {
  DESIGN_THINKING_INTRO,
  DESIGN_THINKING_STEPS,
} from "@/features/case-study-hsl/constants/data";

export function DesignThinkingStepsSection() {
  return (
    <section>
      <SectionHeading
        label="Process"
        title="Design Thinking"
        accent="Process"
        sub={DESIGN_THINKING_INTRO}
      />

      <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {DESIGN_THINKING_STEPS.map((step, index) => (
          <li key={step.title}>
            <SurfaceCard className="h-full p-5 md:p-5">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)] text-[11px] font-bold text-[color:var(--accent)]">
                  {index + 1}
                </span>
                <h3 className="text-[13px] font-bold text-ink">{step.title}</h3>
              </div>
              <ul className="space-y-2">
                {step.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[11px] leading-relaxed text-ink/62"
                  >
                    <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-[color:var(--accent)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </SurfaceCard>
          </li>
        ))}
      </ol>
    </section>
  );
}
