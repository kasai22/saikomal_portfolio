import { SectionHeading } from "@/components/case-study/section-heading";
import { AccentCard } from "@/components/case-study/accent-card";
import { SOLUTION_INTRO, SOLUTION_PILLARS } from "@/features/case-study-rex/constants/data";

export function SolutionSection() {
  return (
    <section>
      <SectionHeading
        label="Solution"
        title="An Agentic Engine"
        accent="Behind a Human Experience"
        sub="Every conversational or Wizard interaction is backed by a governed, multi-agent architecture — designed so customers feel a stylist's intuition while the business retains full control."
      />
      <AccentCard className="mb-8">
        <p className="text-[15px] leading-relaxed text-ink/80">{SOLUTION_INTRO}</p>
      </AccentCard>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SOLUTION_PILLARS.map((s) => (
          <div key={s.title} className="rounded-sm border border-ink/12 bg-ink/[0.033] p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-sm border border-[color:var(--accent-border)] bg-[color:var(--accent-subtle)] text-base">
              {s.icon}
            </div>
            <h3 className="t-h4 mb-2 text-ink">{s.title}</h3>
            <p className="text-[13px] leading-relaxed text-ink/62">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
